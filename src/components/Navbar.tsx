import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Sparkles, 
  Coins, 
  Award, 
  ShoppingBag, 
  Settings, 
  ShieldCheck,
  Volume2,
  VolumeX
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    setActiveModal, 
    progress, 
    settings, 
    updateSettings, 
    triggerTap 
  } = useApp();

  const handleGoHome = () => {
    triggerTap();
    setActiveView('home');
  };

  const toggleSound = () => {
    triggerTap();
    const newSound = !settings.soundFx;
    updateSettings({ soundFx: newSound, speech: newSound });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6EEEE] shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Logo / Kembali ke Menu */}
        <div className="flex items-center gap-2">
          {activeView !== 'home' ? (
            <button
              onClick={handleGoHome}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black rounded-2xl shadow-sm active:scale-95 transition-all text-xs sm:text-sm cursor-pointer"
              title="Kembali ke Menu Utama"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Menu Utama</span>
              <span className="sm:hidden">Balik</span>
            </button>
          ) : (
            <div 
              onClick={() => setActiveModal('mascot-selector')}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="Ketuk untuk tukar maskot"
            >
              <img
                src="./icon-app.png"
                alt="Ikon Jom Matematik PPKI"
                className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-lg text-[#18364D] tracking-tight leading-tight">
                    JOM MATEMATIK
                  </span>
                  <span className="text-[10px] bg-[#E7F8F4] text-[#168F83] font-black px-1.5 py-0.5 rounded-md hidden md:inline">
                    PPKI
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#8CA5A8]">
                  Belajar • Main • Bijak
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Skor: Bintang & Syiling Emas */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div 
            onClick={() => { triggerTap(); setActiveModal('trophies'); }}
            className="flex items-center gap-1.5 bg-[#FFF8E9] hover:bg-[#FFF0BD] border border-[#F8C84E] px-2.5 sm:px-3.5 py-1.5 rounded-2xl cursor-pointer shadow-sm active:scale-95 transition-all"
            title="Bintang Terkumpul"
          >
            <Sparkles size={18} className="text-[#D78E15] fill-[#F8C84E]" />
            <span className="font-black text-[#18364D] text-sm sm:text-base">
              {progress.stars}
            </span>
            <span className="text-[11px] font-bold text-[#8CA5A8] hidden lg:inline">Bintang</span>
          </div>

          <div 
            onClick={() => { triggerTap(); setActiveModal('sticker-shop'); }}
            className="flex items-center gap-1.5 bg-[#FFF8E9] hover:bg-[#FFF0BD] border border-[#F8C84E] px-2.5 sm:px-3.5 py-1.5 rounded-2xl cursor-pointer shadow-sm active:scale-95 transition-all"
            title="Syiling Emas"
          >
            <Coins size={18} className="text-[#D78E15] fill-[#F8C84E]" />
            <span className="font-black text-[#18364D] text-sm sm:text-base">
              {progress.coins}
            </span>
            <span className="text-[11px] font-bold text-[#8CA5A8] hidden lg:inline">Syiling</span>
          </div>
        </div>

        {/* Butang Tindakan Kanan */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Suara Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-2xl border transition-all cursor-pointer ${
              settings.soundFx || settings.speech
                ? 'bg-[#E7F8F4] border-[#B9E2DC] text-[#168F83] hover:bg-[#DFF4F0]'
                : 'bg-[#FFEBE4] border-[#F9C3B8] text-[#D86552] hover:bg-[#FFDFD6]'
            }`}
            title={settings.soundFx ? 'Bunyi & Suara Aktif' : 'Bunyi & Suara Senyap'}
            aria-label="Kawalan Bunyi"
          >
            {settings.soundFx || settings.speech ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Kedai Pelekat */}
          <button
            onClick={() => { triggerTap(); setActiveModal('sticker-shop'); }}
            className="p-2 sm:px-3 sm:py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
            title="Kedai Pelekat Ceria"
          >
            <ShoppingBag size={18} className="text-purple-600" />
            <span className="text-xs font-black hidden xl:inline">Pelekat</span>
          </button>

          {/* Sijil Murid */}
          <button
            onClick={() => { triggerTap(); setActiveModal('certificate'); }}
            className="p-2 sm:px-3 sm:py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
            title="Sijil Pencapaian PPKI"
          >
            <Award size={18} className="text-blue-600" />
            <span className="text-xs font-black hidden xl:inline">Sijil</span>
          </button>

          {/* Portal Guru / Waris */}
          <button
            onClick={() => { triggerTap(); setActiveModal('parent-dashboard'); }}
            className="p-2 sm:px-3 sm:py-2 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
            title="Portal Guru & Waris PPKI"
          >
            <ShieldCheck size={18} className="text-teal-600" />
            <span className="text-xs font-black hidden md:inline">Guru / Waris</span>
          </button>

          {/* Tetapan */}
          <button
            onClick={() => { triggerTap(); setActiveModal('settings'); }}
            className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-2xl transition-all cursor-pointer"
            title="Tetapan Pantas"
            aria-label="Tetapan"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
