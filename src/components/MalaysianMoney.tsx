import React from 'react';

interface MoneyProps {
  id?: string;
  type?: 'coin' | 'note';
  value?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
}

export const MalaysianMoney: React.FC<MoneyProps> = ({
  id = 'note-rm1',
  type,
  value,
  label,
  size = 'md',
  selected = false,
  onClick
}) => {
  const isCoin = type === 'coin' || id.startsWith('coin');

  const sizeClasses = {
    coin: {
      sm: 'w-14 h-14 text-sm',
      md: 'w-20 h-20 text-lg',
      lg: 'w-26 h-26 text-2xl'
    },
    note: {
      sm: 'w-28 h-14 text-xs',
      md: 'w-44 h-22 text-base',
      lg: 'w-56 h-28 text-xl'
    }
  };

  // Duit Syiling Malaysia
  if (isCoin) {
    const isGold = id.includes('20sen') || id.includes('50sen') || (value && value >= 20);
    const coinValue = value || (id.includes('5sen') ? 5 : id.includes('10sen') ? 10 : id.includes('20sen') ? 20 : 50);

    return (
      <button
        type="button"
        onClick={onClick}
        className={`rounded-full flex flex-col items-center justify-center font-black transition-all shadow-md relative select-none ${
          isGold
            ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-4 border-amber-600 text-amber-950 shadow-amber-300/50'
            : 'bg-gradient-to-tr from-slate-300 via-gray-100 to-slate-400 border-4 border-slate-500 text-slate-800 shadow-slate-300/50'
        } ${sizeClasses.coin[size]} ${
          selected ? 'ring-4 ring-[#1BAE9D] scale-105 shadow-lg' : 'hover:scale-102 active:scale-95'
        } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        title={`Duit Syiling ${coinValue} Sen`}
      >
        <span className="text-[9px] uppercase tracking-wider font-black opacity-80 leading-none">BANK NEGARA</span>
        <span className="leading-tight my-0.5">{coinValue}¢</span>
        <span className="text-[9px] font-black opacity-75 leading-none">SEN</span>
        <span className="text-xs absolute bottom-1 right-2 opacity-40">🌺</span>
      </button>
    );
  }

  // Wang Kertas Malaysia
  const noteStyles: Record<string, { bg: string; border: string; motif: string; sub: string }> = {
    'note-rm1': {
      bg: 'bg-gradient-to-r from-blue-600 to-indigo-700',
      border: 'border-blue-800',
      motif: '🪁',
      sub: 'Wau Bulan'
    },
    'note-rm5': {
      bg: 'bg-gradient-to-r from-emerald-600 to-teal-700',
      border: 'border-emerald-800',
      motif: '🦜',
      sub: 'Burung Enggang'
    },
    'note-rm10': {
      bg: 'bg-gradient-to-r from-red-600 to-rose-700',
      border: 'border-red-800',
      motif: '🌺',
      sub: 'Bunga Rafflesia'
    },
    'note-rm20': {
      bg: 'bg-gradient-to-r from-orange-500 to-amber-600',
      border: 'border-orange-700',
      motif: '🐢',
      sub: 'Penyu Karah'
    },
    'note-rm50': {
      bg: 'bg-gradient-to-r from-teal-700 to-cyan-800',
      border: 'border-teal-900',
      motif: '🌴',
      sub: 'Kelapa Sawit'
    }
  };

  const noteKey = id in noteStyles ? id : (value === 5 ? 'note-rm5' : value === 10 ? 'note-rm10' : value === 20 ? 'note-rm20' : value === 50 ? 'note-rm50' : 'note-rm1');
  const style = noteStyles[noteKey] || noteStyles['note-rm1'];
  const displayLabel = label || (value ? `RM ${value}` : noteKey.replace('note-rm', 'RM '));

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl p-2.5 flex flex-col justify-between border-3 font-black text-white shadow-md transition-all relative overflow-hidden select-none ${
        style.bg
      } ${style.border} ${sizeClasses.note[size]} ${
        selected ? 'ring-4 ring-yellow-400 scale-105 shadow-xl' : 'hover:scale-102 active:scale-95'
      } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      title={`Wang Kertas ${displayLabel}`}
    >
      <div className="flex justify-between items-start w-full">
        <span className="text-[9px] tracking-wider uppercase font-extrabold opacity-90">
          BANK NEGARA MALAYSIA
        </span>
        <span className="text-sm opacity-90">{style.motif}</span>
      </div>

      <div className="flex items-baseline justify-between w-full my-auto">
        <span className="text-xl sm:text-2xl font-black tracking-tight">{displayLabel}</span>
        <span className="text-[10px] font-bold opacity-80">{style.sub}</span>
      </div>

      <div className="flex justify-between items-center text-[9px] opacity-80 w-full border-t border-white/20 pt-0.5">
        <span>RINGGIT MALAYSIA</span>
        <span className="font-mono text-[8px]">AGONG 👑</span>
      </div>
    </button>
  );
};
