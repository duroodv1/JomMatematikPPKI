import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, CheckCircle2, ExternalLink, FileArchive, FolderDown, LoaderCircle, Share2 } from 'lucide-react';
import { prepareBundledSource, type PreparedSource } from '../pwa/source-bundle';
import { SOURCE_ZIP_NAME } from '../pwa/source-archive.mjs';
import { pwaAssetUrl } from '../pwa/client';

interface SaveFileHandle {
  createWritable(): Promise<{
    write(data: Blob): Promise<void>;
    close(): Promise<void>;
    abort(): Promise<void>;
  }>;
}

type SavePickerWindow = Window & {
  showSaveFilePicker?: (options: {
    suggestedName: string;
    types: { description: string; accept: Record<string, string[]> }[];
  }) => Promise<SaveFileHandle>;
};

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(2)} MB` : `${Math.ceil(bytes / 1024)} KB`;
}

export function SourceDownload() {
  const [preparing, setPreparing] = useState(false);
  const [percent, setPercent] = useState(0);
  const [prepared, setPrepared] = useState<(PreparedSource & { url: string }) | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const mounted = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const urls = useRef<string[]>([]);
  const picker = (window as SavePickerWindow).showSaveFilePicker;
  const canPickLocation = typeof picker === 'function' && window.isSecureContext && window.top === window.self;
  const newTabUrl = new URL(pwaAssetUrl('./'));
  newTabUrl.searchParams.set('pwa-source', '1');

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      controller.current?.abort();
      const oldUrls = [...urls.current];
      // Give the browser time to finish an initiated save after the modal closes.
      window.setTimeout(() => oldUrls.forEach((url) => URL.revokeObjectURL(url)), 120_000);
    };
  }, []);

  const prepare = async () => {
    if (controller.current || preparing) return;
    const pending = new AbortController();
    controller.current = pending;
    setPreparing(true);
    setPrepared(null);
    setPercent(0);
    setError('');
    setMessage('');
    try {
      const archive = await prepareBundledSource((value) => {
        if (mounted.current && !pending.signal.aborted) setPercent(value);
      }, pending.signal);
      if (!mounted.current || pending.signal.aborted) return;
      const url = URL.createObjectURL(archive.blob);
      urls.current.push(url);
      setPrepared({ ...archive, url });
    } catch (cause) {
      if (mounted.current && !pending.signal.aborted) {
        setError(cause instanceof Error ? cause.message : 'ZIP tidak dapat disediakan. Sila cuba lagi.');
      }
    } finally {
      if (controller.current === pending) controller.current = null;
      if (mounted.current && !pending.signal.aborted) setPreparing(false);
    }
  };

  const saveToLocation = async () => {
    if (!prepared || !picker || saving) return;
    setSaving(true);
    setError('');
    let writer: Awaited<ReturnType<SaveFileHandle['createWritable']>> | undefined;
    try {
      // This runs directly in a click handler, before any asynchronous ZIP generation.
      const file = await picker.call(window, {
        suggestedName: prepared.name,
        types: [{ description: 'Arkib ZIP', accept: { 'application/zip': ['.zip'] } }],
      });
      writer = await file.createWritable();
      await writer.write(prepared.blob);
      await writer.close();
      writer = undefined;
      if (mounted.current) setMessage('Fail telah disimpan di lokasi yang anda pilih. Nyahmampatkan ZIP, kemudian muat naik kandungan folder projek ke GitHub.');
    } catch (cause) {
      if (writer) await writer.abort().catch(() => {});
      if (mounted.current) {
        if (cause instanceof Error && cause.name === 'AbortError') setMessage('Simpanan dibatalkan. Fail masih tersedia untuk disimpan semula.');
        else setError('Pelayar tidak membenarkan pemilihan folder. Gunakan Simpan ZIP atau buka panel dalam tab baharu.');
      }
    } finally {
      if (mounted.current) setSaving(false);
    }
  };

  let canShareFile = false;
  if (prepared && typeof navigator.canShare === 'function' && typeof navigator.share === 'function') {
    try {
      canShareFile = navigator.canShare({ files: [new File([prepared.blob], prepared.name, { type: 'application/zip' })] });
    } catch {
      canShareFile = false;
    }
  }

  const shareFile = async () => {
    if (!prepared || saving) return;
    setSaving(true);
    setError('');
    try {
      await navigator.share({ files: [new File([prepared.blob], prepared.name, { type: 'application/zip' })], title: 'Kod Sumber Jom Matematik PPKI' });
      if (mounted.current) setMessage('Fail diserahkan kepada pilihan perkongsian peranti. Semak aplikasi destinasi anda.');
    } catch (cause) {
      if (mounted.current) {
        setMessage(cause instanceof Error && cause.name === 'AbortError' ? 'Perkongsian dibatalkan. Anda masih boleh menyimpan ZIP.' : 'Perkongsian tidak tersedia. Gunakan Simpan ZIP atau tab baharu.');
      }
    } finally {
      if (mounted.current) setSaving(false);
    }
  };

  return (
    <section aria-labelledby="pwa-source-title">
      <div className="flex items-start gap-3">
        <FileArchive size={27} className="mt-1 shrink-0 text-[#168F83]" />
        <div>
          <h3 id="pwa-source-title" className="text-lg font-bold">Pakej kod sumber untuk GitHub</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#526b75]">Semua modul, fail projek dan aliran kerja GitHub Pages dalam satu ZIP yang disemak.</p>
        </div>
      </div>
      <p className="my-4 break-all text-sm font-semibold text-[#526b75]"><code>{SOURCE_ZIP_NAME}</code></p>

      {!prepared && (
        <button type="button" onClick={() => { void prepare(); }} disabled={preparing} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168F83] px-4 py-3 text-base font-bold text-white transition hover:bg-[#12776d] disabled:cursor-wait disabled:opacity-70">
          {preparing ? <LoaderCircle size={20} className="animate-spin" /> : <FileArchive size={20} />}
          {preparing ? 'Sedang menyediakan dan menyemak ZIP...' : error ? 'Cuba Sediakan ZIP Semula' : '1. Sediakan ZIP GitHub'}
        </button>
      )}
      {preparing && <div className="mt-3" aria-busy="true"><progress aria-label="Kemajuan penyediaan ZIP" value={percent} max={100} className="h-2 w-full accent-[#168F83]" /><p className="mt-1 text-xs text-[#526b75]">{percent}% - Semakan semua fail sebelum simpan.</p></div>}

      {prepared && (
        <div>
          <p className="mb-3 flex items-start gap-2 text-sm leading-relaxed text-[#168F83]" role="status"><CheckCircle2 size={20} className="mt-0.5 shrink-0" /><span><strong>Semakan ZIP lulus.</strong> {prepared.fileCount} fail, {formatSize(prepared.size)}. CRC32 dan kandungan setiap fail telah disemak. Fail belum disimpan pada peranti.</span></p>
          <a href={prepared.url} download={prepared.name} onClick={() => setMessage('Permintaan muat turun dihantar kepada pelayar. Semak folder Downloads / Muat Turun. Jika tiada fail, gunakan pilihan di bawah.')} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168F83] px-4 py-3 text-base font-bold text-white transition hover:bg-[#12776d]">
            <ArrowDownToLine size={20} />2. Simpan ZIP GitHub
          </a>
          <div className="mt-2 flex flex-wrap gap-2">
            {canPickLocation && <button type="button" onClick={() => { void saveToLocation(); }} disabled={saving} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#B9E2DC] px-3 text-sm font-bold text-[#168F83] hover:bg-[#F1FBF9] disabled:opacity-50"><FolderDown size={17} />Pilih Lokasi Simpan</button>}
            {canShareFile && <button type="button" onClick={() => { void shareFile(); }} disabled={saving} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#B9E2DC] px-3 text-sm font-bold text-[#168F83] hover:bg-[#F1FBF9] disabled:opacity-50"><Share2 size={17} />Simpan melalui Perkongsian</button>}
          </div>
        </div>
      )}

      <div aria-live="polite">
        {error && <p className="mt-3 text-sm leading-relaxed text-[#b13e32]" role="alert">{error}</p>}
        {message && <p className="mt-3 text-sm leading-relaxed text-[#526b75]">{message}</p>}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-[#607982]">ZIP dijana terus dalam aplikasi. Data murid dan token GitHub tidak disertakan. Nyahmampatkan ZIP sebelum memuat naik; GitHub tidak menyahmampatkan fail ZIP secara automatik.</p>
      <div className="mt-4 border-l-4 border-[#F8C84E] pl-3">
        <p className="text-sm font-semibold text-[#18364D]">Muat turun disekat dalam pratonton?</p>
        <p className="mt-1 text-xs leading-relaxed text-[#607982]">Buka panel dalam tab pelayar biasa, kemudian ulang langkah Sediakan ZIP dan Simpan ZIP. Pada iPhone/iPad, semak Files &gt; Downloads atau iCloud Drive &gt; Downloads.</p>
        <a href={newTabUrl.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#168F83] underline underline-offset-4">Buka Panel dalam Tab Baharu <ExternalLink size={14} /></a>
      </div>

      <details className="mt-4 border-b border-[#E2EDED] pb-5">
        <summary className="cursor-pointer py-2 text-sm font-bold">Apakah yang disertakan?</summary>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[#526b75]">
          <li>Kod React dan TypeScript, komponen serta data soalan tujuh modul.</li>
          <li>Manifest, Service Worker dan logik pemasangan PWA.</li>
          <li>Logo, ikon PNG sebenar dan konfigurasi fon tempatan.</li>
          <li>Konfigurasi npm dan Vite, ujian serta panduan README.md.</li>
          <li><code>.github/workflows/deploy-pages.yml</code>, <code>.nvmrc</code>, <code>.gitignore</code> dan <code>PANDUAN-GITHUB.md</code>.</li>
        </ul>
      </details>
    </section>
  );
}