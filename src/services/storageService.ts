import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@equilibrio_estudiantil_stats';

export interface DailyStats {
  date: string;
  count: number;
  streak: number;
}

export const getTodayDate = (): string => new Date().toISOString().split('T')[0];

export const loadDailyStats = async (): Promise<DailyStats> => {
  const today = getTodayDate();
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: DailyStats = JSON.parse(raw);
      if (parsed.date === today) return parsed;
      const nextStreak = parsed.count > 0 ? (parsed.streak || 0) + 1 : 0;
      const resetStats = { date: today, count: 0, streak: nextStreak };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(resetStats));
      return resetStats;
    }
  } catch {}
  const initial = { date: today, count: 0, streak: 1 };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

export const saveDailyStats = async (count: number, streak: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: getTodayDate(), count, streak })
    );
  } catch (error) {
    console.error('Error guardando estadísticas:', error);
  }
};