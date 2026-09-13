import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  className?: string;
  autoPlay?: boolean;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  label = 'Dengar Arahan',
  className = '',
  autoPlay = false
}) => {
  const { speakText, settings, triggerTap } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (autoPlay && settings.autoReadQuestion && settings.speech) {
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        speakText(text, () => setIsSpeaking(false));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [text, autoPlay, settings.autoReadQuestion, settings.speech]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerTap();
    if (isSpeaking) {
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(text, () => setIsSpeaking(false), () => setIsSpeaking(true));
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs gap-1.5 rounded-xl',
    md: 'px-3.5 py-2 text-sm gap-2 rounded-xl font-bold',
    lg: 'px-5 py-2.5 text-base gap-2.5 rounded-2xl font-black',
    xl: 'px-6 py-3.5 text-lg gap-3 rounded-2xl font-black'
  };

  const iconSizes = {
    sm: 15,
    md: 18,
    lg: 22,
    xl: 26
  };

  if (!settings.speech) {
    return (
      <button
        type="button"
        disabled
        className="opacity-40 inline-flex items-center rounded-xl bg-slate-200 text-slate-500 px-3 py-1.5 text-xs cursor-not-allowed"
        title="Suara dimatikan dalam tetapan"
      >
        <VolumeX size={16} />
        <span>Suara Mati</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`inline-flex items-center justify-center font-black transition-all cursor-pointer select-none active:scale-95 shadow-sm ${
        isSpeaking
          ? 'bg-[#1BAE9D] text-white ring-4 ring-[#9FD7D0] scale-102 animate-pulse speaking'
          : 'bg-[#F1FBF9] text-[#168F83] border border-[#B9E2DC] hover:bg-[#DFF4F0]'
      } ${sizeClasses[size]} ${className}`}
    >
      <Volume2 size={iconSizes[size]} className={isSpeaking ? 'animate-bounce' : ''} />
      {label && <span>{isSpeaking ? 'Sedang Membaca...' : label}</span>}
    </button>
  );
};
