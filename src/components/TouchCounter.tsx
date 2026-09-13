import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { playCountSound } from '../utils/sound';
import { RotateCcw, CheckCircle } from 'lucide-react';

interface TouchCounterProps {
  emoji: string;
  totalCount: number;
  itemName?: string;
  onAllCounted?: () => void;
}

export const TouchCounter: React.FC<TouchCounterProps> = ({
  emoji,
  totalCount,
  itemName = 'objek',
  onAllCounted
}) => {
  const { settings, speakText, triggerTap } = useApp();
  const [countedIndices, setCountedIndices] = useState<number[]>([]);

  const handleTap = (index: number) => {
    if (countedIndices.includes(index)) {
      triggerTap();
      setCountedIndices(prev => prev.filter(i => i !== index));
    } else {
      const newCount = countedIndices.length + 1;
      setCountedIndices(prev => [...prev, index]);
      if (settings.soundFx) playCountSound(newCount);
      speakText(`${newCount}`);

      if (newCount === totalCount && onAllCounted) {
        onAllCounted();
      }
    }
  };

  const handleReset = () => {
    triggerTap();
    setCountedIndices([]);
  };

  const allCounted = countedIndices.length === totalCount;

  return (
    <div className="flex flex-col items-center gap-2.5 my-2 w-full max-w-xl mx-auto">
      <div className="flex items-center justify-between w-full px-2 text-xs sm:text-sm font-bold text-[#476571]">
        <span className="flex items-center gap-1.5">
          👆 <span className="text-[#168F83] font-black">Sentuh setiap {itemName} untuk mengira:</span>
        </span>
        {countedIndices.length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-xl font-bold cursor-pointer"
          >
            <RotateCcw size={13} />
            Mula Semula
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 p-4 sm:p-5 bg-[#FFF8E9] rounded-3xl border-2 border-[#F8C84E]/50 shadow-inner min-h-[130px] w-full">
        {Array.from({ length: totalCount }).map((_, idx) => {
          const isTapped = countedIndices.includes(idx);
          const tapOrder = countedIndices.indexOf(idx) + 1;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleTap(idx)}
              className={`relative w-14 h-14 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center transition-all select-none cursor-pointer ${
                isTapped
                  ? 'bg-[#FFF0BD] border-3 border-[#D78E15] scale-105 shadow-md ring-4 ring-[#F8C84E]/40'
                  : 'bg-white hover:bg-amber-50 border-2 border-dashed border-[#E3ECEC] shadow-sm active:scale-90'
              }`}
              title={`Sentuh untuk kira ${itemName}`}
            >
              <span className="text-3xl sm:text-4xl">{emoji}</span>
              {isTapped && (
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#18364D] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                  {tapOrder}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between w-full px-3.5 py-2 bg-white rounded-2xl border border-[#E0ECEC] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#8CA5A8]">Sudah dikira:</span>
          <span className="text-lg sm:text-xl font-black text-[#1BAE9D]">
            {countedIndices.length} / {totalCount}
          </span>
        </div>

        {allCounted ? (
          <div className="flex items-center gap-1.5 text-[#168F83] font-black text-xs sm:text-sm">
            <CheckCircle size={17} className="text-[#1BAE9D]" />
            <span>Semua siap dikira! 🎉</span>
          </div>
        ) : (
          <span className="text-[11px] font-bold text-[#D47843]">
            Ketuk semua objek satu persatu!
          </span>
        )}
      </div>
    </div>
  );
};
