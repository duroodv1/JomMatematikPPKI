import React from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_LIST } from '../data/modulesData';
import { MASCOTS } from '../data/mascots';
import { MascotHelper } from '../components/MascotHelper';
import { AudioButton } from '../components/AudioButton';
import { 
  Sparkles, 
  Play, 
  Award, 
  CheckCircle2, 
  Compass, 
  BookOpen
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveView, progress, triggerTap, setActiveModal } = useApp();
  const currentMascot = MASCOTS.find(m => m.id === progress.activeMascot) || MASCOTS[0];

  const handleSelectModule = (moduleId: string) => {
    triggerTap();
    setActiveView(`module-${moduleId}`);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      {/* Hero Banner Selamat Datang */}
      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#18364D] via-[#1E455F] to-[#156D65] text-white p-6 sm:p-8 shadow-md mb-6 border border-white/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles size={15} className="text-[#F8C84E] fill-[#F8C84E]" />
              <span>Pendidikan Khas PPKI • 7 Modul Lengkap</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-2">
              Hai, {progress.userName}! 👋
            </h1>

            <p className="text-base sm:text-lg font-bold text-[#9FD7D0] mb-4">
              Selamat Datang ke Pengembaraan Dunia Angka!
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <AudioButton 
                text={`Selamat datang ${progress.userName}! Mari kita belajar matematik bersama ${currentMascot.name}. Terdapat tujuh modul lengkap dengan sekurang-kurangnya dua puluh lima soalan setiap modul. Pilih modul yang kamu suka di bawah.`}
                size="md"
                label="Dengar Pengenalan"
                className="bg-[#F8C84E] hover:bg-[#E2B237] text-[#18364D] border-none font-black"
              />

              <button
                onClick={() => { triggerTap(); setActiveModal('certificate'); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-black border border-white/30 shadow-sm cursor-pointer active:scale-95 transition-all text-xs sm:text-sm"
              >
                <Award size={18} className="text-[#F8C84E]" />
                <span>Lihat Sijil &amp; Lencana</span>
              </button>
            </div>
          </div>

          {/* Kad Maskot Semasa */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 flex flex-col items-center text-center shadow-sm min-w-[210px]">
            <div 
              onClick={() => { triggerTap(); setActiveModal('mascot-selector'); }}
              className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-[#F8C84E] flex items-center justify-center text-5xl shadow-inner mb-2 cursor-pointer hover:scale-105 transition-transform overflow-hidden"
              title="Ketuk untuk tukar maskot"
            >
              {currentMascot.image ? (
                <img src={currentMascot.image} alt={currentMascot.name} className="w-full h-full object-cover" />
              ) : (
                currentMascot.avatar
              )}
            </div>
            <span className="font-black text-base text-[#F8C84E]">{currentMascot.name}</span>
            <span className="text-[11px] text-white/80 font-bold mb-2.5">{currentMascot.title}</span>
            
            <button
              onClick={() => { triggerTap(); setActiveModal('mascot-selector'); }}
              className="text-[11px] font-black bg-white text-[#18364D] hover:bg-[#FFF5D7] px-3 py-1 rounded-full shadow-sm transition-colors cursor-pointer"
            >
              Tukar Kawan 🔄
            </button>
          </div>
        </div>
      </section>

      {/* Pembantu Maskot */}
      <MascotHelper
        message={`Mari kita kumpul lebih banyak bintang! Setiap daripada 7 modul mempunyai 25 soalan interaktif. Sila tekan modul di bawah.`}
      />

      {/* Grid 7 Modul PPKI */}
      <section className="my-7">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#18364D] flex items-center gap-2">
              <span>📚 7 Modul Kurikulum PPKI Lengkap</span>
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[#8CA5A8]">
              Setiap modul mempunyai sekurang-kurangnya 25 soalan lengkap dengan suara Bahasa Melayu Standard:
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-black text-[#168F83] bg-[#E7F8F4] px-3 py-1.5 rounded-full border border-[#B9E2DC]">
            <span>✨ 175+ Soalan Tersedia</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {MODULES_LIST.map((mod) => {
            const completedCount = progress.completedLevels[mod.id] || 0;
            const isFinished = completedCount >= 25;

            return (
              <div
                key={mod.id}
                onClick={() => handleSelectModule(mod.id)}
                className={`group relative rounded-3xl p-5 border-2 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                  mod.bgGradient
                } active:scale-98`}
              >
                {/* Badge Atas */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-white text-[#18364D] shadow-sm border border-slate-200 uppercase tracking-wide">
                    {mod.badge}
                  </span>

                  <div className="flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full border border-[#F8C84E] shadow-sm">
                    <Sparkles size={14} className="text-[#D78E15] fill-[#F8C84E]" />
                    <span className="text-xs font-black text-[#18364D]">
                      {completedCount} / 25 Selesai
                    </span>
                  </div>
                </div>

                {/* Kandungan Modul */}
                <div className="flex items-start gap-3 my-2">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-slate-200 group-hover:scale-105 transition-transform flex-shrink-0">
                    {mod.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-[#18364D] group-hover:text-[#1BAE9D] transition-colors leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-xs font-bold text-[#6D7777] line-clamp-2 mt-0.5">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                {/* Penerangan ringkas */}
                <p className="text-[11px] text-[#6D7777] font-medium my-2 line-clamp-2 bg-white/70 p-2 rounded-xl">
                  {mod.description}
                </p>

                {/* Bar Kemajuan & Butang Mula */}
                <div className="mt-2 pt-2.5 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-[11px] font-black text-[#168F83] flex items-center gap-1">
                    <BookOpen size={14} />
                    <span>25 Soalan Kuiz</span>
                  </span>

                  <button className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs shadow-sm transition-colors">
                    <span>Mula</span>
                    <Play size={12} className="fill-white" />
                  </button>
                </div>

                {isFinished && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow border-2 border-white">
                    <CheckCircle2 size={18} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Sorotan Khas Pulau Pengembaraan */}
      <section 
        onClick={() => handleSelectModule('adventure')}
        className="my-6 rounded-3xl bg-gradient-to-r from-[#FFF5D7] via-[#FFEBE4] to-[#E7F8F4] p-5 sm:p-7 shadow-sm border-2 border-[#F8C84E] text-[#18364D] flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer hover:shadow-md transition-all active:scale-98"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-sm border border-[#F8C84E] shrink-0">
            🏝️
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-[#18364D]/10 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase mb-1">
              <Compass size={13} />
              <span>Cabaran Kemuncak 5 Pulau</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              Pulau Pengembaraan Angka (25 Soalan)
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#476571] max-w-xl">
              Jelajah Pulau Bilang, Gua Tambah, Sungai Tolak, Pasar Wang dan Puncak Jam untuk membuka Peti Harta Karun Emas!
            </p>
          </div>
        </div>

        <button className="px-5 py-3 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-sm rounded-xl shadow border-none flex items-center gap-2 shrink-0 active:scale-95 transition-transform">
          <span>Main Pengembaraan</span>
          <Play size={16} className="fill-white" />
        </button>
      </section>
    </main>
  );
};
