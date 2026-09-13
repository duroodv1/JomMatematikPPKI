import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trophy, Sparkles, Award } from 'lucide-react';

export const TrophiesModal: React.FC = () => {
  const { 
    setActiveModal, 
    progress, 
    triggerTap 
  } = useApp();

  const achievements = [
    {
      id: 'ach-1',
      title: 'Langkah Pertama PPKI',
      desc: 'Selesaikan soalan pertama',
      icon: '🌟',
      isUnlocked: progress.stars >= 1
    },
    {
      id: 'ach-2',
      title: 'Bintang Emas 10',
      desc: 'Kumpul 10 bintang pertama',
      icon: '⭐',
      isUnlocked: progress.stars >= 10
    },
    {
      id: 'ach-3',
      title: 'Bintang Permata 25',
      desc: 'Kumpul 25 bintang matematik',
      icon: '💎',
      isUnlocked: progress.stars >= 25
    },
    {
      id: 'ach-4',
      title: 'Jutawan Kecil 50 Syiling',
      desc: 'Kumpul 50 syiling emas di kedai',
      icon: '🪙',
      isUnlocked: progress.coins >= 50
    },
    {
      id: 'ach-5',
      title: 'Pakar Duit Malaysia',
      desc: 'Kuasai modul wang saku',
      icon: '💵',
      isUnlocked: (progress.completedLevels['money'] || 0) >= 10
    },
    {
      id: 'ach-6',
      title: 'Juara Pulau Pengembaraan',
      desc: 'Selesaikan cabaran Pulau Pengembaraan',
      icon: '👑',
      isUnlocked: (progress.completedLevels['adventure'] || 0) >= 25
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E2EDED] shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden">
        {/* Pengepala */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#18364D] to-[#1E455F] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy size={22} className="text-[#F8C84E]" />
            <h2 className="text-lg sm:text-xl font-black">
              Bilik Trofi &amp; Kejayaan Adik
            </h2>
          </div>

          <button
            onClick={() => { triggerTap(); setActiveModal(null); }}
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Ringkasan Skor */}
        <div className="p-4 bg-[#F7FAFA] border-b border-[#E2EDED] flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <span className="text-[10px] font-black uppercase text-[#8CA5A8]">Bintang:</span>
            <div className="flex items-center justify-center gap-1 text-2xl font-black text-[#18364D] mt-0.5">
              <Sparkles className="text-[#D78E15] fill-[#F8C84E]" size={20} />
              <span>{progress.stars} ⭐</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-[#8CA5A8]">Syiling Emas:</span>
            <div className="flex items-center justify-center gap-1 text-2xl font-black text-[#18364D] mt-0.5">
              <span>🪙 {progress.coins}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-[#8CA5A8]">Trofi Dibuka:</span>
            <div className="flex items-center justify-center gap-1 text-2xl font-black text-[#168F83] mt-0.5">
              <Award className="text-[#1BAE9D]" size={20} />
              <span>{achievements.filter(a => a.isUnlocked).length} / {achievements.length}</span>
            </div>
          </div>
        </div>

        {/* Senarai Lencana */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                ach.isUnlocked
                  ? 'bg-[#E7F8F4] border-[#B9E2DC] shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                ach.isUnlocked ? 'bg-white' : 'bg-slate-200'
              }`}>
                {ach.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-black text-[#18364D] truncate">{ach.title}</h4>
                  {ach.isUnlocked && (
                    <span className="text-[9px] font-black bg-[#1BAE9D] text-white px-1.5 py-0.5 rounded">
                      DIBUKA ✓
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[#8CA5A8] font-bold mt-0.5">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 sm:p-4 bg-[#F7FAFA] border-t border-[#E2EDED] flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold text-[#8CA5A8] hidden sm:block">
            Terus belajar dan bermain untuk membuka semua trofi emas!
          </p>

          <button
            onClick={() => { triggerTap(); setActiveModal('certificate'); }}
            className="w-full sm:w-auto px-4 py-2 bg-[#1BAE9D] hover:bg-[#159989] text-white font-black text-xs sm:text-sm rounded-xl shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <Award size={16} />
            <span>Lihat Sijil Murid PPKI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
