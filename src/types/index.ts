export type MascotId = 'owl' | 'kancil' | 'oyen' | 'panda' | 'bobo';

export interface MascotInfo {
  id: MascotId;
  name: string;
  title: string;
  avatar: string;
  image?: string;
  description: string;
  color: string;
  accentColor: string;
}

export type ModuleCategory =
  | 'counting'      // 1. Kenal & Bilang Angka (1-20)
  | 'addition'      // 2. Tambah Ceria (+)
  | 'subtraction'   // 3. Tolak Mudah (-)
  | 'money'         // 4. Wang Saku Ceria (RM & Sen)
  | 'time'          // 5. Jam & Waktu Kita
  | 'shapes'        // 6. Bentuk & Corak
  | 'adventure';    // 7. Pulau Pengembaraan (Cabaran Gabungan)

export interface ModuleInfo {
  id: ModuleCategory;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  themeColor: string;
  bgGradient: string;
  totalQuestions: number;
  description: string;
}

export interface UserProgress {
  stars: number;
  coins: number;
  completedLevels: Record<string, number>; // e.g. { 'counting': 25, 'addition': 20 }
  unlockedStickers: string[];
  activeMascot: MascotId;
  userName: string;
  schoolName: string;
  avatar: string;
  lastPlayedDate: string;
}

export interface AppSettings {
  soundFx: boolean;
  speech: boolean;
  speechRate: number; // default 0.85 for PPKI
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'huge';
  sensoryFriendly: boolean;
  autoReadQuestion: boolean;
}

export interface QuestionChoice {
  id: 'A' | 'B' | 'C';
  label: string; // "Pilihan A", "Pilihan B", "Pilihan C"
  text: string;
  subText?: string;
  emoji?: string;
  isCorrect: boolean;
  audioText: string;
}

export interface QuizQuestion {
  id: string;
  number: number;
  prompt: string;
  subPrompt?: string;
  audioText: string;
  clue?: string;
  visualType?:
    | 'emoji-grid'
    | 'ten-frame'
    | 'addition-visual'
    | 'subtraction-visual'
    | 'money-display'
    | 'clock-display'
    | 'shape-display'
    | 'pattern-display'
    | 'sequence-display';
  visualData?: any;
  choices: QuestionChoice[];
  correctAnswer: 'A' | 'B' | 'C';
  hint: string;
  explanation: string;
}

export interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  category: 'haiwan' | 'kenderaan' | 'makanan' | 'piala';
  cost: number;
  description: string;
}

export interface MoneyItem {
  id: string;
  type: 'coin' | 'note';
  value: number;
  label: string;
  color: string;
  features: string;
  frontVisual: string;
  motif: string;
}

export interface ShapeItem {
  id: string;
  name: string;
  english: string;
  color: string;
  textColor: string;
  borderColor: string;
  sides: string;
  examples: string[];
}
