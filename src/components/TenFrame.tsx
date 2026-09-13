import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { playCountSound } from '../utils/sound';

interface TenFrameProps {
  initialCount?: number;
  interactive?: boolean;
  color?: 'blue' | 'amber' | 'emerald' | 'rose';
  onChange?: (newCount: number) => void;
}

export const TenFrame: React.FC<TenFrameProps> = ({
  initialCount = 5,
  interactive = false,
  color = 'blue',
  onChange
}) => {
  const { settings, speakText } = useApp();
  const [count, setCount] = useState(initialCount);

  const handleCellClick = (index: number) => {
    if (!interactive) return;
    const newCount = index + 1 === count ? index : index + 1;
    setCount(newCount);
    if (settings.soundFx) playCountSound(newCount || 1);
    speakText(`${newCount}`);
    if (onChange) onChange(newCount);
  };

  const colorStyles = {
    blue: {
      filled: 'bg-[#1BAE9D] border-[#159989] text-white shadow-[#1BAE9D]/30',
      badge: 'bg-[#E7F8F4] text-[#168F83] border-[#B9E2DC]',
    },
    amber: {
      filled: 'bg-[#F8C84E] border-[#D78E15] text-[#18364D] shadow-[#F8C84E]/30',
      badge: 'bg-[#FFF5D7] text-[#9A6B0F] border-[#F2DA91]',
    },
    emerald: {
      filled: 'bg-[#10B981] border-[#059669] text-white shadow-[#10B981]/30',
      badge: 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]',
    },
    rose: {
      filled: 'bg-[#F47E69] border-[#D86552] text-white shadow-[#F47E69]/30',
      badge: 'bg-[#FFEBE4] text-[#D86552] border-[#F9C3B8]',
    }
  };

  const style = colorStyles[color];

  return (
    <div className="flex flex-col items-center gap-2.5 my-2">
      <div className="bg-[#FFF8E9] p-3 sm:p-4 rounded-3xl border-3 border-[#F8C84E] shadow-inner max-w-md w-full">
        {/* Baris 1 (1 hingga 5) */}
        <div className="grid grid-cols-5 gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
          {[0, 1, 2, 3, 4].map(idx => {
            const isFilled = idx < count;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleCellClick(idx)}
                disabled={!interactive}
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  isFilled
                    ? `${style.filled} scale-100 shadow-md font-black text-base sm:text-xl`
                    : 'bg-white/80 border-dashed border-[#E3ECEC] hover:border-[#9FD7D0]'
                } ${interactive ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
              >
                {isFilled ? idx + 1 : ''}
              </button>
            );
          })}
        </div>

        {/* Garisan pembahagi tengah */}
        <div className="h-1 bg-[#F8C84E]/50 rounded-full my-1"></div>

        {/* Baris 2 (6 hingga 10) */}
        <div className="grid grid-cols-5 gap-2 sm:gap-2.5 mt-2 sm:mt-2.5">
          {[5, 6, 7, 8, 9].map(idx => {
            const isFilled = idx < count;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleCellClick(idx)}
                disabled={!interactive}
                className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  isFilled
                    ? `${style.filled} scale-100 shadow-md font-black text-base sm:text-xl`
                    : 'bg-white/80 border-dashed border-[#E3ECEC] hover:border-[#9FD7D0]'
                } ${interactive ? 'cursor-pointer active:scale-95' : 'cursor-default'}`}
              >
                {isFilled ? idx + 1 : ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-xs sm:text-sm font-black px-3.5 py-1 rounded-full border ${style.badge}`}>
          Bilangan: <span className="text-base font-black">{count}</span> / 10
        </span>
        {interactive && (
          <span className="text-[11px] text-[#8CA5A8] font-bold">
            (Sentuh petak untuk tambah atau tolak)
          </span>
        )}
      </div>
    </div>
  );
};
