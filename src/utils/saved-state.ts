import type { AppSettings, MascotId, UserProgress } from '../types';

export const PROGRESS_KEY = 'jom_matematik_ppki_progress_v2';
export const SETTINGS_KEY = 'jom_matematik_ppki_settings_v2';

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};
}

function nonNegative(value: unknown, fallback: number, maximum = Number.MAX_SAFE_INTEGER) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.min(Math.floor(value), maximum)
    : fallback;
}

function text(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 200) : fallback;
}

function readStored<T>(key: string, normalize: (value: unknown) => T): T {
  let raw: string | null = null;
  let value: unknown;
  try {
    raw = localStorage.getItem(key);
    value = raw ? JSON.parse(raw) : undefined;
  } catch {
    value = undefined;
  }
  const result = normalize(value);
  if (raw && JSON.stringify(value) !== JSON.stringify(result)) {
    // Keep the first original value before repairing an older or malformed schema.
    try {
      const backupKey = `${key}_recovery_backup`;
      if (localStorage.getItem(backupKey) === null) localStorage.setItem(backupKey, raw);
    } catch {
      // Learning still works when a browser denies persistent storage.
    }
  }
  return result;
}

export function loadProgress(defaults: UserProgress): UserProgress {
  return readStored(PROGRESS_KEY, (value) => {
    const saved = record(value);
    const levels = record(saved.completedLevels);
    const mascots: MascotId[] = ['owl', 'kancil', 'oyen', 'panda', 'bobo'];
    return {
      stars: nonNegative(saved.stars, defaults.stars),
      coins: nonNegative(saved.coins, defaults.coins),
      completedLevels: Object.fromEntries(Object.entries(defaults.completedLevels).map(([key, fallback]) => [key, nonNegative(levels[key], fallback, 25)])),
      unlockedStickers: Array.isArray(saved.unlockedStickers)
        ? [...new Set(saved.unlockedStickers.filter((item): item is string => typeof item === 'string' && item.startsWith('stk-')))]
        : [...defaults.unlockedStickers],
      activeMascot: mascots.includes(saved.activeMascot as MascotId) ? saved.activeMascot as MascotId : defaults.activeMascot,
      userName: text(saved.userName, defaults.userName),
      schoolName: text(saved.schoolName, defaults.schoolName),
      avatar: text(saved.avatar, defaults.avatar),
      lastPlayedDate: typeof saved.lastPlayedDate === 'string' && Number.isFinite(Date.parse(saved.lastPlayedDate))
        ? saved.lastPlayedDate
        : defaults.lastPlayedDate,
    };
  });
}

export function loadSettings(defaults: AppSettings): AppSettings {
  return readStored(SETTINGS_KEY, (value) => {
    const saved = record(value);
    const boolean = (key: keyof AppSettings) => typeof saved[key] === 'boolean' ? saved[key] as boolean : defaults[key] as boolean;
    return {
      soundFx: boolean('soundFx'),
      speech: boolean('speech'),
      autoReadQuestion: boolean('autoReadQuestion'),
      highContrast: boolean('highContrast'),
      sensoryFriendly: boolean('sensoryFriendly'),
      fontSize: ['normal', 'large', 'huge'].includes(String(saved.fontSize)) ? saved.fontSize as AppSettings['fontSize'] : defaults.fontSize,
      speechRate: typeof saved.speechRate === 'number' && Number.isFinite(saved.speechRate)
        ? Math.max(0.5, Math.min(1.5, saved.speechRate))
        : defaults.speechRate,
    };
  });
}