// Modul Suara Bahasa Melayu Standard (ms-MY) khas untuk murid PPKI
// Disesuaikan untuk sebutan perlahan, jelas dan mesra pembelajaran

const NOMBOR_BM: Record<string, string> = {
  '0': 'sifar',
  '1': 'satu',
  '2': 'dua',
  '3': 'tiga',
  '4': 'empat',
  '5': 'lima',
  '6': 'enam',
  '7': 'tujuh',
  '8': 'lapan',
  '9': 'sembilan',
  '10': 'sepuluh',
  '11': 'sebelas',
  '12': 'dua belas',
  '13': 'tiga belas',
  '14': 'empat belas',
  '15': 'lima belas',
  '16': 'enam belas',
  '17': 'tujuh belas',
  '18': 'lapan belas',
  '19': 'sembilan belas',
  '20': 'dua puluh',
};

export const nomborKeBM = (nilai: string | number): string => {
  const teks = String(nilai).trim();
  if (NOMBOR_BM[teks]) return NOMBOR_BM[teks];

  const num = parseInt(teks, 10);
  if (!isNaN(num) && num >= 0 && num <= 99) {
    const puluh = Math.floor(num / 10);
    const sa = num % 10;
    const puluhKata: Record<number, string> = {
      2: 'dua puluh',
      3: 'tiga puluh',
      4: 'empat puluh',
      5: 'lima puluh',
      6: 'enam puluh',
      7: 'tujuh puluh',
      8: 'lapan puluh',
      9: 'sembilan puluh'
    };
    if (puluh >= 2) {
      if (sa === 0) return puluhKata[puluh];
      return `${puluhKata[puluh]} ${NOMBOR_BM[String(sa)] || sa}`;
    }
  }
  return teks;
};

export const bersihkanTeksUntukBM = (teks: string): string => {
  return teks
    .replace(/\+/g, ' tambah ')
    .replace(/-/g, ' tolak ')
    .replace(/×|x|\*/gi, ' darab ')
    .replace(/÷|\//g, ' bahagi ')
    .replace(/=/g, ' sama dengan ')
    .replace(/RM\s*(\d+)/gi, (_, n) => `${nomborKeBM(n)} ringgit`)
    .replace(/(\d+)\s*sen/gi, (_, n) => `${nomborKeBM(n)} sen`)
    .replace(/(\d+)\s*¢/gi, (_, n) => `${nomborKeBM(n)} sen`)
    .replace(/(\d+):00/g, (_, h) => `pukul ${nomborKeBM(h)} tepat`)
    .replace(/(\d+):30/g, (_, h) => `pukul ${nomborKeBM(h)} setengah`)
    .replace(/Pilihan\s*A/gi, 'Pilihan A')
    .replace(/Pilihan\s*B/gi, 'Pilihan B')
    .replace(/Pilihan\s*C/gi, 'Pilihan C')
    .replace(/\s+/g, ' ')
    .trim();
};

export const cariSuaraMelayu = (): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const senarai = window.speechSynthesis.getVoices();
  if (!senarai || senarai.length === 0) return null;

  // 1. Keutamaan suara ms-MY tepat
  const tepat = senarai.find(v => v.lang.toLowerCase() === 'ms-my');
  if (tepat) return tepat;

  // 2. Mana-mana kod ms
  const ms = senarai.find(v => v.lang.toLowerCase().startsWith('ms'));
  if (ms) return ms;

  // 3. Nama mengandungi Malay/Melayu/Malaysia
  const melayu = senarai.find(v => /malay|melayu|malaysia|ms-my/i.test(`${v.name} ${v.lang}`));
  if (melayu) return melayu;

  // 4. Sandaran serantau id-ID jika tiada ms
  const id = senarai.find(v => v.lang.toLowerCase().startsWith('id'));
  if (id) return id;

  return null;
};

let ujaranSemasa: SpeechSynthesisUtterance | null = null;

// Sembunyikan antara muka Jambatan Android (disediakan oleh MainActivity.kt)
declare global {
  interface Window {
    AndroidTTS?: {
      speak: (teks: string) => void;
      stop: () => void;
      isReady: () => boolean;
    };
  }
}

export const adaSuaraAndroid = (): boolean => {
  return typeof window !== 'undefined' && !!window.AndroidTTS;
};

export const sebutTeksBM = (
  teks: string,
  kadar: number = 0.85,
  onTamat?: () => void,
  onMula?: () => void
): boolean => {
  if (typeof window === 'undefined') return false;

  // KEUTAMAAN 1: Gunakan enjin suara Android TTS asli (mod APK)
  // Sebutan lebih tepat kerana menggunakan suara Bahasa Melayu peranti
  if (window.AndroidTTS) {
    try {
      window.AndroidTTS.stop();
      window.setTimeout(() => {
        if (onMula) onMula();
        window.AndroidTTS?.speak(bersihkanTeksUntukBM(teks));
        if (onTamat) window.setTimeout(onTamat, Math.max(1200, teks.length * 70));
      }, 60);
      return true;
    } catch {
      // Teruskan ke pelayar jika jambatan gagal
    }
  }

  if (!('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    const teksBersih = bersihkanTeksUntukBM(teks);
    const utterance = new SpeechSynthesisUtterance(teksBersih);
    utterance.lang = 'ms-MY';
    utterance.rate = kadar; // 0.85 ideal untuk murid PPKI
    utterance.pitch = 1.05; // Nada mesra dan ceria
    utterance.volume = 1.0;

    const suara = cariSuaraMelayu();
    if (suara) {
      utterance.voice = suara;
      utterance.lang = suara.lang;
    }

    if (onMula) utterance.onstart = onMula;

    utterance.onend = () => {
      ujaranSemasa = null;
      if (onTamat) onTamat();
    };

    utterance.onerror = () => {
      ujaranSemasa = null;
      if (onTamat) onTamat();
    };

    ujaranSemasa = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.warn('Ralat sintesis suara:', error);
    return false;
  }
};

export const hentikanSuara = (): void => {
  if (typeof window === 'undefined') return;

  // Hentikan suara Android (mod APK)
  if (window.AndroidTTS) {
    try {
      window.AndroidTTS.stop();
    } catch {
      // Abaikan ralat
    }
  }

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      ujaranSemasa = null;
    } catch {
      // Abaikan ralat
    }
  }
};

export const sedangBersuaraAktif = (): boolean => {
  return ujaranSemasa !== null && typeof window !== 'undefined' && !!window.speechSynthesis && window.speechSynthesis.speaking;
};

// Sebutan khas untuk Pilihan A, B, C
export const sebutPilihan = (
  pilihan: 'A' | 'B' | 'C',
  jawapan: string,
  kadar: number = 0.85,
  onTamat?: () => void,
  onMula?: () => void
): void => {
  const teksSebutan = `Pilihan ${pilihan}. Jawapannya ialah ${nomborKeBM(jawapan)}.`;
  sebutTeksBM(teksSebutan, kadar, onTamat, onMula);
};
