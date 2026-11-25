import AsyncStorage from '@react-native-async-storage/async-storage';
import { EnergyLevel } from '../types/pomodoro';

const STORAGE_KEY = '@equilibrio_estudiantil_stats';

export interface DailyStats {
  date: string;
  count: number;
  streak: number;
  lastEnergy: EnergyLevel;
}

export const getTodayDate = (): string => new Date().toISOString().split('T')[0];

export const loadDailyStats = async (): Promise<DailyStats> => {
  const today = getTodayDate();
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: DailyStats = JSON.parse(raw);
      if (parsed.date === today) {
        return { ...parsed, lastEnergy: parsed.lastEnergy || 'media' };
      }
      const nextStreak = parsed.count > 0 ? (parsed.streak || 0) + 1 : 0;
      const reset: DailyStats = { date: today, count: 0, streak: nextStreak, lastEnergy: 'media' };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
      return reset;
    }
  } catch {}
  const initial: DailyStats = { date: today, count: 0, streak: 1, lastEnergy: 'media' };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

export const saveDailyStats = async (
  count: number,
  streak: number,
  lastEnergy: EnergyLevel
): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: getTodayDate(), count, streak, lastEnergy })
    );
  } catch (error) {
    console.error('Error guardando estadísticas:', error);
  }
};