import React from 'react';
import { useApp } from '../context/AppContext';
import { MASCOTS, MASCOT_PRAISES } from '../data/mascots';
import { Volume2, Sparkles } from 'lucide-react';

interface MascotHelperProps {
  message?: string;
  mood?: 'happy' | 'thinking' | 'cheering' | 'celebrating';
  onTap?: () => void;
  compact?: boolean;
}

export const MascotHelper: React.FC<MascotHelperProps> = ({
  message,
  mood = 'happy',
  onTap,
  compact = false
}) => {
  const { progress, speakText, triggerTap, setActiveModal } = useApp();
  const currentMascot = MASCOTS.find(m => m.id === progress.activeMascot) || MASCOTS[0];

  const defaultMsg = mood === 'celebrating'
    ? MASCOT_PRAISES[Math.floor(Math.random() * MASCOT_PRAISES.length)]
    : `Hai ${progress.userName}! Saya ${currentMascot.name}. Mari kita belajar matematik bersama-sama! 🚀`;

  const displayText = message || defaultMsg;

  const handleMascotClick = () => {
    triggerTap();
    speakText(displayText);
    if (onTap) onTap();
  };

  const handleChangeMascot = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerTap();
    setActiveModal('mascot-selector');
  };

  if (compact) {
    return (
      <div 
        onClick={handleMascotClick}
        className="flex items-center gap-2.5 bg-white/95 rounded-2xl p-2.5 shadow-sm border border-[#E0ECEC] cursor-pointer hover:bg-[#F1FBF9] active:scale-95 transition-all"
        title="Ketuk untuk dengar suara maskot"
      >
        {currentMascot.image ? (
          <img src={currentMascot.image} alt={currentMascot.name} className="w-9 h-9 rounded-xl object-cover shadow-sm shrink-0" />
        ) : (
          <span className="text-2xl select-none">{currentMascot.avatar}</span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-black text-[#1BAE9D] truncate">{currentMascot.name}</p>
          <p className="text-xs font-bold text-[#18364D] line-clamp-1">{displayText}</p>
        </div>
        <Volume2 size={16} className="text-[#1BAE9D] flex-shrink-0" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3.5 p-4 bg-white/95 rounded-3xl shadow-sm border border-[#E0ECEC] max-w-2xl mx-auto my-3 relative overflow-hidden">
      <div className="absolute top-2.5 right-3 flex items-center gap-1.5">
        <button
          onClick={handleChangeMascot}
          className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#F1F8F7] hover:bg-[#E1F3F0] text-[#168F83] rounded-full border border-[#B9E2DC] transition-colors"
          title="Tukar Kawan Maskot"
        >
          Tukar Maskot 🔄
        </button>
      </div>

      <div 
        onClick={handleMascotClick}
        className="relative group cursor-pointer flex-shrink-0"
      >
        <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-[#E7F8F4] border-2 border-[#1BAE9D]/30 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
          {currentMascot.image ? (
            <img src={currentMascot.image} alt={currentMascot.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl sm:text-5xl select-none">{currentMascot.avatar}</span>
          )}
        </div>
        <span className="absolute -bottom-1 -right-1 bg-[#1BAE9D] text-white rounded-full p-1 shadow">
          <Volume2 size={12} />
        </span>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
          <Sparkles size={14} className="text-[#F8C84E]" />
          <span className="font-black text-xs text-[#1BAE9D] tracking-wide uppercase">
            {currentMascot.name}
          </span>
          <span className="text-[10px] bg-[#FFF5D7] text-[#9A6B0F] font-black px-2 py-0.5 rounded-full">
            {currentMascot.title}
          </span>
        </div>
        <p 
          onClick={handleMascotClick}
          className="text-[#18364D] font-extrabold text-sm sm:text-base cursor-pointer hover:text-[#1BAE9D] leading-snug"
        >
          "{displayText}"
        </p>
        <p className="text-[11px] text-[#8CA5A8] font-bold mt-1">
          💡 Ketuk maskot untuk dengar kata-kata semangat dalam Bahasa Melayu Standard!
        </p>
      </div>
    </div>
  );
};
