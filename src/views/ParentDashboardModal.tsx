import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MODULES_LIST } from '../data/modulesData';
import { 
  X, 
  ShieldCheck, 
  Award, 
  User, 
  CheckCircle2, 
  Sliders, 
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const ParentDashboardModal: React.FC = () => {
  const { 
    setActiveModal, 
    progress, 
    settings, 
    updateSettings, 
    updateUserProfile, 
    resetProgress, 
    triggerTap, 
    speakText 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'progress' | 'profile' | 'accessibility' | 'pedagogy'>('progress');
  const [name, setName] = useState(progress.userName);
  const [school, setSchool] = useState(progress.schoolName);
  const [avatar, setAvatar] = useState(progress.avatar);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const avatars = ['🧒', '👧', '👦', '🦉', '⭐', '🦁', '🐱', '🚀'];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    triggerTap();
    updateUserProfile(name, school, avatar);
    setSavedSuccess(true);
    speakText('Profil murid berjaya dikemaskini.');
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    triggerTap();
    if (window.confirm('Adakah anda pasti ingin menetapkan semula semua kemajuan murid? Tindakan ini tidak boleh diundur.')) {
      resetProgress();
      speakText('Markah murid telah ditetapkan semula.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E2EDED] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Pengepala */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#18364D] to-[#1E455F] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-2xl">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                Portal Guru &amp; Ibu Bapa PPKI
              </h2>
              <p className="text-xs text-[#9FD7D0] font-bold">
                Pantau perkembangan 7 modul matematik murid berkeperluan khas
              </p>
            </div>
          </div>

          <button
            onClick={() => { triggerTap(); setActiveModal(null); }}
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigasi */}
        <div className="flex items-center gap-2 p-2.5 bg-[#F7FAFA] border-b border-[#E2EDED] overflow-x-auto no-scrollbar">
          <button
            onClick={() => { triggerTap(); setActiveTab('progress'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'progress'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white'
            }`}
          >
            <Award size={15} />
            <span>Kemajuan 7 Modul</span>
          </button>

          <button
            onClick={() => { triggerTap(); setActiveTab('profile'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white'
            }`}
          >
            <User size={15} />
            <span>Profil Murid</span>
          </button>

          <button
            onClick={() => { triggerTap(); setActiveTab('accessibility'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'accessibility'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white'
            }`}
          >
            <Sliders size={15} />
            <span>Aksesibiliti Khas</span>
          </button>

          <button
            onClick={() => { triggerTap(); setActiveTab('pedagogy'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pedagogy'
                ? 'bg-[#1BAE9D] text-white shadow-sm'
                : 'text-[#476571] hover:bg-white'
            }`}
          >
            <BookOpen size={15} />
            <span>Prinsip PPKI</span>
          </button>
        </div>

        {/* TAB 1: KEMAJUAN 7 MODUL */}
        {activeTab === 'progress' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#FFF8E9] rounded-2xl border border-[#F8C84E] text-center">
                <span className="text-[10px] font-black text-[#8CA5A8] uppercase">Jumlah Bintang</span>
                <p className="text-2xl font-black text-[#18364D] mt-0.5">{progress.stars} ⭐</p>
              </div>

              <div className="p-3.5 bg-[#FFF8E9] rounded-2xl border border-[#F8C84E] text-center">
                <span className="text-[10px] font-black text-[#8CA5A8] uppercase">Syiling Terkumpul</span>
                <p className="text-2xl font-black text-[#18364D] mt-0.5">{progress.coins} 🪙</p>
              </div>

              <div className="p-3.5 bg-[#E7F8F4] rounded-2xl border border-[#B9E2DC] text-center">
                <span className="text-[10px] font-black text-[#168F83] uppercase">Pelekat Dibuka</span>
                <p className="text-2xl font-black text-[#168F83] mt-0.5">{progress.unlockedStickers.length} Pelekat</p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <h3 className="text-xs font-black uppercase text-[#8CA5A8]">
                Status Penguasaan 7 Modul (25 Soalan Setiap Modul):
              </h3>

              <div className="space-y-2">
                {MODULES_LIST.map(mod => {
                  const completed = progress.completedLevels[mod.id] || 0;
                  const isDone = completed >= 25;

                  return (
                    <div
                      key={mod.id}
                      className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{mod.icon}</span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-[#18364D]">{mod.title}</h4>
                          <span className="text-[11px] text-[#8CA5A8] font-bold">
                            {completed} / 25 soalan selesai
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300">
                            <CheckCircle2 size={13} />
                            <span>Menguasai (25/25)</span>
                          </span>
                        ) : completed > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-300">
                            <span>Sedang Belajar ({completed}/25)</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2.5 py-1 rounded-full">
                            Belum Mula
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROFIL MURID */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[60vh]">
            {savedSuccess && (
              <div className="p-3 bg-[#E7F8F4] border border-[#B9E2DC] text-[#168F83] font-bold text-xs rounded-xl text-center">
                ✓ Profil murid berjaya dikemaskini!
              </div>
            )}

            <div>
              <label className="text-xs font-black text-[#476571] block mb-1">
                Nama Murid:
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold focus:border-[#1BAE9D] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#476571] block mb-1">
                Nama Sekolah / Kelas PPKI:
              </label>
              <input
                type="text"
                required
                value={school}
                onChange={e => setSchool(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold focus:border-[#1BAE9D] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#476571] block mb-2">
                Pilih Ikon Avatar Murid:
              </label>
              <div className="flex flex-wrap gap-2">
                {avatars.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-11 h-11 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                      avatar === av
                        ? 'bg-[#1BAE9D] text-white shadow-sm scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-sm rounded-xl shadow-sm cursor-pointer transition-colors"
              >
                Simpan Profil Murid
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: AKSESIBILITI KHAS */}
        {activeTab === 'accessibility' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 max-h-[60vh]">
            <p className="text-xs font-semibold text-[#8CA5A8]">
              Sesuaikan tetapan mengikut keperluan khas murid (Slow Learner, Autisme, Masalah Penglihatan):
            </p>

            <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Mod Kontras Tinggi</h4>
                <p className="text-[11px] text-[#8CA5A8]">Latar belakang gelap dengan teks kuning jelas</p>
              </div>
              <button
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                  settings.highContrast ? 'bg-[#1BAE9D]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${
                  settings.highContrast ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Mod Sensori Mesra</h4>
                <p className="text-[11px] text-[#8CA5A8]">Mengurangkan animasi bergerak untuk murid autisme</p>
              </div>
              <button
                onClick={() => updateSettings({ sensoryFriendly: !settings.sensoryFriendly })}
                className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                  settings.sensoryFriendly ? 'bg-[#1BAE9D]' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-transform ${
                  settings.sensoryFriendly ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            <div className="p-3 bg-[#F7FAFA] rounded-2xl border border-[#E2EDED] space-y-2">
              <h4 className="text-xs sm:text-sm font-black text-[#18364D]">Saiz Tulisan:</h4>
              <div className="flex items-center gap-2">
                {(['normal', 'large', 'huge'] as const).map(fs => (
                  <button
                    key={fs}
                    onClick={() => updateSettings({ fontSize: fs })}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      settings.fontSize === fs
                        ? 'bg-[#1BAE9D] text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-[#18364D] border border-slate-300'
                    }`}
                  >
                    {fs === 'normal' ? 'Sederhana' : fs === 'large' ? 'Besar' : 'Sangat Besar'}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                <span>Tetapkan Semula Semua Markah (Reset)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PRINSIP PEDAGOGI PPKI */}
        {activeTab === 'pedagogy' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3 max-h-[60vh] text-xs text-[#476571] leading-relaxed">
            <div className="p-3.5 bg-[#E7F8F4] rounded-2xl border border-[#B9E2DC] space-y-2">
              <h3 className="font-black text-[#168F83] text-sm flex items-center gap-1.5">
                <span>🎯 Prinsip Pengajaran Matematik PPKI</span>
              </h3>
              <p>
                <strong>1. Konkrit ke Abstrak:</strong> Gunakan sentuhan objek nyata (TouchCounter dan Ten-Frame) sebelum murid diminta membaca nombor angka.
              </p>
              <p>
                <strong>2. Satu-Demi-Satu (One-to-One Correspondence):</strong> Murid menyentuh objek sambil nota muzik dimainkan supaya tiada nombor yang dilangkau.
              </p>
              <p>
                <strong>3. Pengukuhan Positif:</strong> Tiada kegagalan atau "Game Over". Murid sentiasa dibimbing dengan kata motivasi dan petunjuk visual.
              </p>
              <p>
                <strong>4. Relevan dengan Kehidupan:</strong> Kemahiran seperti mengenal wang saku Malaysia dan membaca waktu diaplikasikan terus ke aktiviti harian murid.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
