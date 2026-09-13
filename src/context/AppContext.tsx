import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, AppSettings, MascotId } from '../types';
import {
  playTapSound,
  playCorrectSound,
  playWrongSound,
  playFanfareSound,
  playCoinSound,
  playStarSound
} from '../utils/sound';
import { sebutTeksBM, sebutPilihan, hentikanSuara } from '../utils/speech';
import { loadProgress, loadSettings, PROGRESS_KEY, SETTINGS_KEY } from '../utils/saved-state';

interface AppContextType {
  activeView: string;
  setActiveView: (view: string) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  progress: UserProgress;
  settings: AppSettings;
  addStars: (amount: number) => void;
  addCoins: (amount: number) => void;
  completeQuestion: (moduleKey: string, questionIndex: number, starsEarned?: number, coinsEarned?: number) => void;
  buySticker: (stickerId: string, cost: number) => boolean;
  changeMascot: (mascotId: MascotId) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  updateUserProfile: (name: string, school: string, avatar: string) => void;
  resetProgress: () => void;
  // Kesan bunyi
  triggerTap: () => void;
  triggerCorrect: () => void;
  triggerWrong: () => void;
  triggerFanfare: () => void;
  triggerStar: () => void;
  triggerCoin: () => void;
  // Suara Bahasa Melayu Standard
  speakText: (text: string, onEnd?: () => void, onStart?: () => void) => void;
  speakOption: (label: 'A' | 'B' | 'C', answerText: string, onEnd?: () => void, onStart?: () => void) => void;
  stopAllSpeech: () => void;
}

const STORAGE_KEY_PROGRESS = PROGRESS_KEY;
const STORAGE_KEY_SETTINGS = SETTINGS_KEY;

const defaultProgress: UserProgress = {
  stars: 15,
  coins: 40,
  completedLevels: {
    'counting': 5,
    'addition': 4,
    'subtraction': 3,
    'money': 2,
    'time': 2,
    'shapes': 2,
    'adventure': 1
  },
  unlockedStickers: ['stk-owl', 'stk-cat', 'stk-apple'],
  activeMascot: 'owl',
  userName: 'Murid Bijak',
  schoolName: 'PPKI SK Dengkil',
  avatar: '🧒',
  lastPlayedDate: new Date().toISOString()
};

const defaultSettings: AppSettings = {
  soundFx: true,
  speech: true,
  speechRate: 0.85, // Kadar sebutan standard PPKI
  highContrast: false,
  fontSize: 'large',
  sensoryFriendly: false,
  autoReadQuestion: true
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<string>('home');
  const [activeModal, setActiveModal] = useState<string | null>(() =>
    new URLSearchParams(window.location.search).get('pwa-source') === '1' ? 'pwa-source' : null
  );

  const [progress, setProgress] = useState<UserProgress>(() => loadProgress(defaultProgress));
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings(defaultSettings));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {
      // Gagal simpan
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch {
      // Gagal simpan
    }
  }, [settings]);

  // Audio Triggers
  const triggerTap = () => {
    if (settings.soundFx) playTapSound();
  };

  const triggerCorrect = () => {
    if (settings.soundFx) playCorrectSound();
  };

  const triggerWrong = () => {
    if (settings.soundFx) playWrongSound();
  };

  const triggerFanfare = () => {
    if (settings.soundFx) playFanfareSound();
  };

  const triggerStar = () => {
    if (settings.soundFx) playStarSound();
  };

  const triggerCoin = () => {
    if (settings.soundFx) playCoinSound();
  };

  // Suara BM
  const speakText = (text: string, onEnd?: () => void, onStart?: () => void) => {
    if (!settings.speech) return;
    sebutTeksBM(text, settings.speechRate, onEnd, onStart);
  };

  const speakOption = (label: 'A' | 'B' | 'C', answerText: string, onEnd?: () => void, onStart?: () => void) => {
    if (!settings.speech) return;
    sebutPilihan(label, answerText, settings.speechRate, onEnd, onStart);
  };

  const stopAllSpeech = () => {
    hentikanSuara();
  };

  const addStars = (amount: number) => {
    triggerStar();
    setProgress(prev => ({
      ...prev,
      stars: prev.stars + amount,
      lastPlayedDate: new Date().toISOString()
    }));
  };

  const addCoins = (amount: number) => {
    triggerCoin();
    setProgress(prev => ({
      ...prev,
      coins: prev.coins + amount,
      lastPlayedDate: new Date().toISOString()
    }));
  };

  const completeQuestion = (
    moduleKey: string,
    questionIndex: number,
    starsEarned: number = 1,
    coinsEarned: number = 2
  ) => {
    triggerCorrect();
    setProgress(prev => {
      const currentCompleted = prev.completedLevels[moduleKey] || 0;
      const newCompleted = Math.max(currentCompleted, questionIndex + 1);

      return {
        ...prev,
        stars: prev.stars + starsEarned,
        coins: prev.coins + coinsEarned,
        completedLevels: {
          ...prev.completedLevels,
          [moduleKey]: newCompleted
        },
        lastPlayedDate: new Date().toISOString()
      };
    });
  };

  const buySticker = (stickerId: string, cost: number): boolean => {
    if (progress.coins < cost || progress.unlockedStickers.includes(stickerId)) {
      return false;
    }
    triggerCoin();
    setProgress(prev => ({
      ...prev,
      coins: prev.coins - cost,
      unlockedStickers: [...prev.unlockedStickers, stickerId]
    }));
    return true;
  };

  const changeMascot = (mascotId: MascotId) => {
    triggerTap();
    setProgress(prev => ({ ...prev, activeMascot: mascotId }));
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateUserProfile = (name: string, school: string, avatar: string) => {
    triggerTap();
    setProgress(prev => ({
      ...prev,
      userName: name.trim() || 'Aiman',
      schoolName: school.trim() || 'PPKI Malaysia',
      avatar: avatar || '🧒'
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        activeModal,
        setActiveModal,
        progress,
        settings,
        addStars,
        addCoins,
        completeQuestion,
        buySticker,
        changeMascot,
        updateSettings,
        updateUserProfile,
        resetProgress,
        triggerTap,
        triggerCorrect,
        triggerWrong,
        triggerFanfare,
        triggerStar,
        triggerCoin,
        speakText,
        speakOption,
        stopAllSpeech
      }}
    >
      <div
        className={`min-h-screen transition-colors duration-200 ${
          settings.highContrast
            ? 'bg-slate-950 text-yellow-300 font-bold'
            : 'bg-[#F7FAFA] text-[#18364D]'
        } ${settings.sensoryFriendly ? 'sensory-friendly' : ''} ${
          settings.fontSize === 'huge'
            ? 'text-xl'
            : settings.fontSize === 'large'
            ? 'text-lg'
            : 'text-base'
        }`}
      >
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp mesti digunakan di dalam AppProvider');
  }
  return context;
};
