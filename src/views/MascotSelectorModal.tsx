import React from 'react';
import { useApp } from '../context/AppContext';
import { MASCOTS } from '../data/mascots';
import { MascotId } from '../types';
import { X, Check } from 'lucide-react';

export const MascotSelectorModal: React.FC = () => {
  const { 
    setActiveModal, 
    progress, 
    changeMascot, 
    triggerTap, 
    speakText 
  } = useApp();

  const handleChoose = (id: MascotId, name: string) => {
    triggerTap();
    changeMascot(id);
    speakText(`Hai! Saya ${name}, kawan belajar baharu adik! Jom kita mengira bersama!`);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E2EDED] shadow-2xl max-w-xl w-full flex flex-col overflow-hidden">
        {/* Pengepala */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#18364D] to-[#1E455F] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦉</span>
            <h2 className="text-lg sm:text-xl font-black">
              Pilih Kawan Maskot Adik
            </h2>
          </div>

          <button
            onClick={() => { triggerTap(); setActiveModal(null); }}
            className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Senarai Maskot */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
          {MASCOTS.map((mascot) => {
            const isSelected = progress.activeMascot === mascot.id;

            return (
              <div
                key={mascot.id}
                onClick={() => handleChoose(mascot.id, mascot.name)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center cursor-pointer transition-all hover:scale-102 ${
                  isSelected
                    ? 'bg-[#E7F8F4] border-[#1BAE9D] ring-2 ring-[#9FD7D0]'
                    : 'bg-white border-[#E2EDED] hover:border-[#1BAE9D]'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-4xl mb-2 relative overflow-hidden shadow-sm">
                  {mascot.image ? (
                    <img src={mascot.image} alt={mascot.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{mascot.avatar}</span>
                  )}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 bg-[#1BAE9D] text-white p-1 rounded-full shadow">
                      <Check size={14} />
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-black text-[#18364D] leading-snug">
                  {mascot.name}
                </h3>
                <span className="text-[10px] font-bold text-[#168F83] mb-1">
                  {mascot.title}
                </span>

                <p className="text-[11px] text-[#8CA5A8] font-semibold line-clamp-2 mt-0.5">
                  {mascot.description}
                </p>

                <button
                  type="button"
                  className={`mt-2.5 w-full py-1.5 rounded-xl text-xs font-black transition-colors ${
                    isSelected
                      ? 'bg-[#1BAE9D] text-white'
                      : 'bg-slate-100 hover:bg-[#E7F8F4] text-[#18364D]'
                  }`}
                >
                  {isSelected ? 'Maskot Semasa ✓' : 'Pilih Maskot Ini'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
