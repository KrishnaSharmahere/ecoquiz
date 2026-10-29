import { UserStats, LeaderboardEntry, QuizSettings } from '../types';

export const STORAGE_PREFIX = 'ecoquiz:v1';

export const STORAGE_KEYS = {
  STATS: `${STORAGE_PREFIX}:stats`,
  LEADERBOARD: `${STORAGE_PREFIX}:leaderboard`,
  SETTINGS: `${STORAGE_PREFIX}:settings`
};

export const DEFAULT_STATS: UserStats = {
  totalPoints: 0,
  roundsPlayed: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastPlayedDate: null,
  dailyCompletedDates: [],
  topicStats: {
    Waste: { totalAnswered: 0, correctAnswered: 0 },
    Water: { totalAnswered: 0, correctAnswered: 0 },
    Energy: { totalAnswered: 0, correctAnswered: 0 },
    Climate: { totalAnswered: 0, correctAnswered: 0 },
    Biodiversity: { totalAnswered: 0, correctAnswered: 0 }
  },
  unlockedBadgeIds: [],
  factsExplored: [],
  bestScore: 0
};

export const DEFAULT_SETTINGS: QuizSettings = {
  soundEnabled: false, // Soft tones off by default
  reducedMotion: false,
  theme: 'dark', // Editorial cinematic dark default
  playerName: 'Eco Explorer'
};

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      topicStats: {
        ...DEFAULT_STATS.topicStats,
        ...(parsed.topicStats || {})
      }
    };
  } catch (e) {
    console.warn('Failed to read EcoQuiz stats from localStorage, falling back to defaults', e);
    return DEFAULT_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save EcoQuiz stats to localStorage', e);
  }
}

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.warn('Failed to load local leaderboard', e);
    return [];
  }
}

export function saveLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
  try {
    const current = loadLeaderboard();
    const updated = [...current, entry]
      .sort((a, b) => b.score - a.score || b.accuracy - a.accuracy)
      .slice(0, 20); // Top 20 device-only records
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save leaderboard entry', e);
    return [];
  }
}

export function loadSettings(): QuizSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: QuizSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function calculateNewStreak(
  stats: UserStats,
  todayStr: string
): { currentStreak: number; bestStreak: number } {
  if (!stats.lastPlayedDate) {
    return { currentStreak: 1, bestStreak: Math.max(1, stats.bestStreak || 0) };
  }

  if (stats.lastPlayedDate === todayStr) {
    return { currentStreak: stats.currentStreak || 1, bestStreak: stats.bestStreak || 1 };
  }

  const lastDate = new Date(stats.lastPlayedDate);
  const currentDate = new Date(todayStr);
  const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    const newStreak = (stats.currentStreak || 0) + 1;
    return { currentStreak: newStreak, bestStreak: Math.max(newStreak, stats.bestStreak || 0) };
  } else {
    return { currentStreak: 1, bestStreak: Math.max(1, stats.bestStreak || 0) };
  }
}

export function exportDataAsJSON(): string {
  const exportPayload = {
    formatVersion: 'ecoquiz:v1',
    appName: 'EcoQuiz',
    exportedAt: new Date().toISOString(),
    stats: loadUserStats(),
    leaderboard: loadLeaderboard(),
    settings: loadSettings()
  };
  return JSON.stringify(exportPayload, null, 2);
}

export function importDataFromJSON(
  jsonString: string
): { success: boolean; message: string; data?: { stats: UserStats; settings: QuizSettings; leaderboard: LeaderboardEntry[] } } {
  try {
    if (!jsonString || typeof jsonString !== 'string') {
      return { success: false, message: 'Rejection error: File is empty or not valid text.' };
    }

    const data = JSON.parse(jsonString);

    if (!data || typeof data !== 'object') {
      return { success: false, message: 'Rejection error: JSON root must be a valid object.' };
    }

    // Validate format compatibility
    if (data.formatVersion && !data.formatVersion.startsWith('ecoquiz:')) {
      return { success: false, message: 'Rejection error: Incompatible backup file version.' };
    }

    if (!data.stats && !data.leaderboard && !data.settings) {
      return { success: false, message: 'Rejection error: Missing required EcoQuiz data fields in backup.' };
    }

    const importedStats: UserStats = {
      ...DEFAULT_STATS,
      ...(data.stats || {}),
      topicStats: {
        ...DEFAULT_STATS.topicStats,
        ...(data.stats?.topicStats || {})
      }
    };

    const importedSettings: QuizSettings = {
      ...DEFAULT_SETTINGS,
      ...(data.settings || {})
    };

    const importedLeaderboard: LeaderboardEntry[] = Array.isArray(data.leaderboard)
      ? data.leaderboard.slice(0, 20)
      : [];

    saveUserStats(importedStats);
    saveSettings(importedSettings);
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(importedLeaderboard));

    return {
      success: true,
      message: 'EcoQuiz progress successfully restored!',
      data: {
        stats: importedStats,
        settings: importedSettings,
        leaderboard: importedLeaderboard
      }
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown parsing error';
    return {
      success: false,
      message: `Rejection error: Failed to parse JSON file (${errorMsg}). Please provide an authentic EcoQuiz backup.`
    };
  }
}

export function resetAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  } catch (e) {
    console.error('Failed to reset localStorage', e);
  }
}
