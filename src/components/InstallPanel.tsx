import { useState } from 'react';
import { Check, RefreshCw, Smartphone, WifiOff } from 'lucide-react';
import { applyPwaUpdate, checkPwaUpdate, installPwa, usePwaState } from '../pwa/client';

const offlineLabels = {
  development: 'Mod pembangunan. Uji luar talian menggunakan keluaran binaan.',
  checking: 'Sedang menyediakan aplikasi untuk kegunaan luar talian...',
  ready: 'Sedia untuk digunakan di luar talian.',
  unavailable: 'Pemasangan memerlukan HTTPS dan pelayar yang menyokongnya.',
  error: 'Cache belum lengkap. Sambungkan internet, tutup tab lama dan buka semula aplikasi.',
};

export function InstallPanel() {
  const pwa = usePwaState();
  const [feedback, setFeedback] = useState('');
  const [installing, setInstalling] = useState(false);

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
    <section className="rounded-2xl border border-[#E2EDED] bg-[#F7FAFA] p-3" aria-labelledby="install-title">
      <div className="flex items-center gap-2">
        <Smartphone size={20} className="text-[#168F83]" />
        <h3 id="install-title" className="text-sm sm:text-base font-black text-[#18364D]">Pasang sebagai aplikasi</h3>
      </div>

      <div className="mt-2 flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-[#526b75]" role="status">
        {pwa.offline === 'ready'
          ? <Check size={18} className="mt-0.5 shrink-0 text-[#168F83]" />
          : <WifiOff size={18} className="mt-0.5 shrink-0" />}
        <span>{offlineLabels[pwa.offline]}{!pwa.online && ' Peranti sedang di luar talian.'}</span>
      </div>

      {pwa.installed ? (
        <p className="mt-3 text-sm font-bold text-[#168F83]">Aplikasi telah dipasang pada peranti ini.</p>
      ) : pwa.canInstall ? (
        <button
          onClick={() => { void onInstall(); }}
          disabled={installing}
          className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168F83] px-4 font-bold text-white transition hover:bg-[#12776d] disabled:opacity-60"
        >
          <Smartphone size={18} />
          {installing ? 'Membuka pemasangan...' : 'Pasang Aplikasi'}
        </button>
      ) : (
        <div className="mt-3 space-y-2 text-xs sm:text-sm leading-relaxed text-[#526b75]">
          <p><strong className="text-[#18364D]">Android / komputer:</strong> buka menu Chrome atau Edge dan pilih Install app atau Add to Home screen.</p>
          <p><strong className="text-[#18364D]">iPhone / iPad:</strong> buka dalam Safari, pilih Share, kemudian Add to Home Screen.</p>
        </div>
      )}

      {(pwa.offline === 'ready' || pwa.offline === 'error') && (
        <button
          onClick={() => { void onCheckUpdate(); }}
          disabled={!pwa.online || pwa.checkingUpdate}
          className="mt-3 flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-bold text-[#168F83] hover:underline disabled:opacity-50"
        >
          <RefreshCw size={16} className={pwa.checkingUpdate ? 'animate-spin' : ''} />
          {pwa.checkingUpdate ? 'Menyemak kemas kini...' : 'Semak Kemas Kini'}
        </button>
      )}

      {pwa.updateAvailable && (
        <div className="mt-3 border-l-4 border-[#F8C84E] pl-3">
          <p className="text-sm leading-relaxed text-[#526b75]">Versi baharu tersedia. Selesaikan soalan semasa sebelum memuat semula.</p>
          <button onClick={applyPwaUpdate} className="mt-2 min-h-11 rounded-lg bg-[#18364D] px-4 text-sm font-bold text-white">Gunakan Kemas Kini</button>
        </div>
      )}

      {feedback && <p className="mt-3 text-sm text-[#526b75]" aria-live="polite">{feedback}</p>}

      <p className="mt-3 text-[11px] leading-relaxed text-[#607982]">Suara luar talian memerlukan data suara Bahasa Melayu pada peranti.</p>
    </section>
  );
}

