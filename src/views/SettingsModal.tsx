import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Volume2, VolumeX, Sparkles, Sliders, FileArchive, ChevronRight } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { 
    setActiveModal, 
    settings, 
    updateSettings, 
    triggerTap, 
    speakText 
  } = useApp();

  const toggleSoundFx = () => {
    triggerTap();
    updateSettings({ soundFx: !settings.soundFx });
  };

  const toggleSpeech = () => {
    triggerTap();
    const newSpeech = !settings.speech;
    updateSettings({ speech: newSpeech });
    if (newSpeech) {
      speakText('Suara sebutan Bahasa Melayu Standard dihidupkan.');
    }
  };

  const toggleAutoRead = () => {
    triggerTap();
    updateSettings({ autoReadQuestion: !settings.autoReadQuestion });
  };

  const toggleHighContrast = () => {
    triggerTap();
    updateSettings({ highContrast: !settings.highContrast });
  };

  const toggleSensoryFriendly = () => {
    triggerTap();
    updateSettings({ sensoryFriendly: !settings.sensoryFriendly });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E2EDED] shadow-2xl max-w-lg w-full flex flex-col overflow-hidden">
        {/* Pengepala */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#18364D] to-[#1E455F] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders size={20} />
            <h2 className="text-lg font-black">
              Tetapan Pantas &amp; Suara
            </h2>
          </div>

          <button
            onClick={() => { triggerTap(); setActiveModal(null); }}
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Kandungan */}
        <div className="p-4 sm:p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          <button
            onClick={() => { triggerTap(); setActiveModal('pwa-source'); }}
            className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-[#B9E2DC] bg-[#F1FBF9] p-3 text-left transition hover:bg-[#DFF4F0]"
          >
            <FileArchive size={24} className="shrink-0 text-[#168F83]" />
            <span className="flex-1">
              <strong className="block text-sm font-bold text-[#18364D]">PWA dan Kod Sumber</strong>
              <span className="mt-1 block text-xs text-[#526b75]">Pasang PWA atau sediakan ZIP untuk GitHub.</span>
            </span>
            <ChevronRight size={18} className="shrink-0 text-[#168F83]" />
          </button>

          {/* Kesan Bunyi */}
          <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {settings.soundFx ? <Volume2 className="text-[#168F83]" size={18} /> : <VolumeX className="text-[#D86552]" size={18} />}
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Kesan Bunyi (Sound FX)</h4>
                <p className="text-[11px] text-[#8CA5A8]">Bunyi ketuk, nada mengira dan syiling</p>
              </div>
            </div>

            <button
              onClick={toggleSoundFx}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                settings.soundFx ? 'bg-[#1BAE9D]' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${
                settings.soundFx ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Suara Bahasa Melayu Standard */}
          <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🗣️</span>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Suara Bahasa Melayu Standard</h4>
                <p className="text-[11px] text-[#8CA5A8]">Membaca soalan dan Pilihan A, B, C secara lisan</p>
              </div>
            </div>

            <button
              onClick={toggleSpeech}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                settings.speech ? 'bg-[#1BAE9D]' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${
                settings.speech ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Baca Soalan Automatik */}
          <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] flex items-center justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Baca Soalan Automatik</h4>
              <p className="text-[11px] text-[#8CA5A8]">Sebutan suara bermula terus bila soalan baru dibuka</p>
            </div>

            <button
              onClick={toggleAutoRead}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                settings.autoReadQuestion ? 'bg-[#1BAE9D]' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${
                settings.autoReadQuestion ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Mod Kontras Tinggi */}
          <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] flex items-center justify-between">
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Mod Kontras Tinggi</h4>
              <p className="text-[11px] text-[#8CA5A8]">Latar belakang gelap dengan tulisan kuning jelas</p>
            </div>

            <button
              onClick={toggleHighContrast}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                settings.highContrast ? 'bg-[#1BAE9D]' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${
                settings.highContrast ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Mod Sensori Mesra */}
          <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#F8C84E]" />
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Mod Sensori Mesra</h4>
                <p className="text-[11px] text-[#8CA5A8]">Mengurangkan animasi bergerak</p>
              </div>
            </div>

            <button
              onClick={toggleSensoryFriendly}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                settings.sensoryFriendly ? 'bg-[#1BAE9D]' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${
                settings.sensoryFriendly ? 'left-6' : 'left-1'
              }`} />
            </button>
          </div>

          {/* Saiz Tulisan */}
          <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] space-y-1.5">
            <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Saiz Tulisan:</h4>
            <div className="flex gap-2">
              {(['normal', 'large', 'huge'] as const).map(fs => (
                <button
                  key={fs}
                  onClick={() => { triggerTap(); updateSettings({ fontSize: fs }); }}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                    settings.fontSize === fs
                      ? 'bg-[#1BAE9D] text-white shadow-sm'
                      : 'bg-white text-[#18364D] border border-slate-300'
                  }`}
                >
                  {fs === 'normal' ? 'Sederhana' : fs === 'large' ? 'Besar' : 'Sangat Besar'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#F7FAFA] border-t border-[#E2EDED] text-center">
          <button
            onClick={() => { triggerTap(); setActiveModal(null); }}
            className="w-full py-2 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs sm:text-sm rounded-xl cursor-pointer"
          >
            Tutup Tetapan
          </button>
        </div>
      </div>
    </div>
  );
};
