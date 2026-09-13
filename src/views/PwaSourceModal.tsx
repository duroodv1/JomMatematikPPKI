import { useEffect, useRef, useState } from 'react';
import { Check, ExternalLink, RefreshCw, Smartphone, WifiOff, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SourceDownload } from '../components/SourceDownload';
import { GitHubGuide } from '../components/GitHubGuide';
import { applyPwaUpdate, checkPwaUpdate, installPwa, pwaAssetUrl, usePwaState } from '../pwa/client';

const offlineLabels = {
  development: 'Mod pembangunan. Uji luar talian menggunakan keluaran npm run preview.',
  checking: 'Sedang menyediakan aplikasi untuk kegunaan luar talian...',
  ready: 'Sedia untuk digunakan di luar talian.',
  unavailable: 'PWA memerlukan HTTPS atau localhost dan pelayar yang menyokong Service Worker.',
  error: 'Cache belum lengkap. Sambungkan internet, tutup tab lama dan buka semula aplikasi.',
};

export function PwaSourceModal() {
  const { setActiveModal, stopAllSpeech } = useApp();
  const pwa = usePwaState();
  const stopSpeechOnOpen = useRef(stopAllSpeech);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [feedback, setFeedback] = useState('');
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    stopSpeechOnOpen.current();
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveModal(null);
      if (event.key !== 'Tab') return;
      const focusable = dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
      else document.querySelector<HTMLElement>('[aria-label="Tetapan"]')?.focus();
    };
  }, [setActiveModal]);

  const onInstall = async () => {
    setInstalling(true);
    setFeedback('');
    try {
      const result = await installPwa();
      setFeedback(result === 'accepted' ? 'Permintaan pemasangan diterima oleh pelayar.' : 'Anda boleh memasang aplikasi kemudian melalui menu pelayar.');
    } catch {
      setFeedback('Pemasangan tidak dapat dibuka. Gunakan menu pemasangan pelayar.');
    } finally {
      setInstalling(false);
    }
  };

  const onCheckUpdate = async () => {
    setFeedback('');
    try {
      await checkPwaUpdate();
      setFeedback('Semakan selesai. Jika versi baharu tersedia, pilihan kemas kini akan dipaparkan.');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Semakan tidak berjaya. Sila cuba lagi.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102838]/65 p-3 backdrop-blur-sm sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveModal(null); }}>
      <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="pwa-title" className="pwa-dialog flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white text-[#18364D] shadow-xl">
        <header className="flex items-center justify-between gap-4 bg-[#18364D] px-5 py-5 text-white sm:px-7">
          <div>
            <p className="mb-1 text-xs font-bold text-[#9FD7D0]">Jom Matematik PPKI</p>
            <h2 id="pwa-title" className="text-xl font-bold sm:text-2xl">PWA dan Kod Sumber</h2>
          </div>
          <button ref={closeButton} onClick={() => setActiveModal(null)} aria-label="Tutup panel PWA" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20"><X size={22} /></button>
        </header>

        <div className="overflow-y-auto px-5 py-6 sm:px-7">
          <SourceDownload />
          <GitHubGuide />

          <details className="border-b border-[#E2EDED] py-5">
            <summary className="cursor-pointer text-base font-bold">Jalankan pada komputer sendiri</summary>
            <ol className="mt-3 list-decimal space-y-2.5 pl-5 text-sm leading-relaxed text-[#526b75]">
              <li>Nyahmampatkan ZIP. Pasang Node.js 22.12 atau lebih baharu.</li>
              <li>Dalam folder projek, jalankan <code className="font-semibold text-[#18364D]">npm ci</code>, kemudian <code className="font-semibold text-[#18364D]">npm run dev</code>.</li>
              <li>Untuk PWA, jalankan <code className="font-semibold text-[#18364D]">npm run build</code>. Uji melalui <code className="font-semibold text-[#18364D]">npm run preview</code>.</li>
              <li>Muat naik semua kandungan <code>dist/</code> ke pengehosan HTTPS. Jangan buka melalui <code>file://</code>.</li>
            </ol>
          </details>

          <section className="pt-5" aria-labelledby="pwa-install-title">
            <div className="flex items-center gap-2"><Smartphone size={20} className="text-[#168F83]" /><h3 id="pwa-install-title" className="text-base font-bold">Pasang sebagai aplikasi</h3></div>
            <div className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-[#526b75]" role="status">
              {pwa.offline === 'ready' ? <Check size={18} className="mt-0.5 shrink-0 text-[#168F83]" /> : <WifiOff size={18} className="mt-0.5 shrink-0" />}
              <span>{offlineLabels[pwa.offline]}{!pwa.online && ' Peranti sedang di luar talian.'}</span>
            </div>

            {pwa.installed ? <p className="mt-3 text-sm font-bold text-[#168F83]">PWA telah dipasang pada peranti ini.</p> : pwa.canInstall ? (
              <button onClick={() => { void onInstall(); }} disabled={installing} className="mt-4 flex min-h-12 items-center gap-2 rounded-xl border border-[#B9E2DC] bg-[#F1FBF9] px-4 font-bold text-[#168F83] transition hover:bg-[#DFF4F0]"><Smartphone size={18} />{installing ? 'Membuka pemasangan...' : 'Pasang Aplikasi'}</button>
            ) : (
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#526b75]">
                <p><strong className="text-[#18364D]">Android / komputer:</strong> buka menu Chrome atau Edge dan pilih Install app atau Add to Home screen jika tersedia.</p>
                <p><strong className="text-[#18364D]">iPhone / iPad:</strong> buka dalam Safari, pilih Share, kemudian Add to Home Screen.</p>
              </div>
            )}

            {(pwa.offline === 'ready' || pwa.offline === 'error') && (
              <button onClick={() => { void onCheckUpdate(); }} disabled={!pwa.online || pwa.checkingUpdate} className="mt-4 flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-bold text-[#168F83] hover:underline disabled:opacity-50"><RefreshCw size={16} className={pwa.checkingUpdate ? 'animate-spin' : ''} />{pwa.checkingUpdate ? 'Menyemak kemas kini...' : 'Semak Kemas Kini'}</button>
            )}
            {pwa.updateAvailable && <div className="mt-3 border-l-4 border-[#F8C84E] pl-4"><p className="text-sm leading-relaxed text-[#526b75]">Versi baharu tersedia. Selesaikan soalan semasa sebelum memuat semula.</p><button onClick={applyPwaUpdate} className="mt-2 min-h-11 rounded-lg bg-[#18364D] px-4 text-sm font-bold text-white">Gunakan Kemas Kini</button></div>}
            {feedback && <p className="mt-3 text-sm text-[#526b75]" aria-live="polite">{feedback}</p>}

            <p className="mt-4 text-xs leading-relaxed text-[#607982]">Suara luar talian memerlukan data suara Bahasa Melayu pada peranti. Jika pratonton menyekat muat turun atau pemasangan, buka aplikasi dalam tab berasingan.</p>
            <a href={pwaAssetUrl('./')} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#168F83] underline underline-offset-4">Buka dalam tab baharu <ExternalLink size={14} /></a>
          </section>
        </div>
      </div>
    </div>
  );
}