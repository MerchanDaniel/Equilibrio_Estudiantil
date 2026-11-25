import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MODES } from '../constants/modes';
import { StudyMode, TimerPhase } from '../types/pomodoro';

const STATS_KEY = '@equilibrio_estudiantil_stats';
const getToday = () => new Date().toISOString().split('T')[0];

export const usePomodoro = () => {
  const [mode, setMode] = useState<StudyMode>('repaso');
  const [phase, setPhase] = useState<TimerPhase>('focus');
  const [secondsLeft, setSecondsLeft] = useState<number>(MODES.repaso.focusMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);

  const endTimeRef = useRef<number | null>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const persistStats = async (count: number, currentStreak: number) => {
    try {
      await AsyncStorage.setItem(STATS_KEY, JSON.stringify({ date: getToday(), count, streak: currentStreak }));
    } catch {}
  };

  useEffect(() => {
    (async () => {
      const today = getToday();
      try {
        const raw = await AsyncStorage.getItem(STATS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.date === today) {
            setCompletedCycles(parsed.count || 0);
            setStreak(parsed.streak || 1);
            return;
          }
          const nextStreak = parsed.count > 0 ? (parsed.streak || 0) + 1 : 0;
          setCompletedCycles(0);
          setStreak(nextStreak);
          await persistStats(0, nextStreak);
          return;
        }
      } catch {}
      await persistStats(0, 1);
    })();
  }, []);

  const handlePhaseComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsRunning(false);
    endTimeRef.current = null;
    if (phase === 'focus') {
      setCompletedCycles((prev) => {
        const next = prev + 1;
        persistStats(next, streak);
        return next;
      });
      setPhase('break');
      setSecondsLeft(MODES[mode].breakMinutes * 60);
    } else {
      setPhase('focus');
      setSecondsLeft(MODES[mode].focusMinutes * 60);
    }
  };

  useEffect(() => {
    if (!isRunning) return;
    if (!endTimeRef.current) endTimeRef.current = Date.now() + secondsLeft * 1000;
    const interval = setInterval(() => {
      if (!endTimeRef.current) return;
      const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        handlePhaseComplete();
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isRunning, phase, mode]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (appState.current.match(/inactive|background/) && next === 'active' && isRunning && endTimeRef.current) {
        const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
        setSecondsLeft(remaining);
        if (remaining === 0) handlePhaseComplete();
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, [isRunning, phase, mode]);

  const startTimer = () => {
    if (isRunning) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    endTimeRef.current = Date.now() + secondsLeft * 1000;
    setIsRunning(true);
  };

  const pauseTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsRunning(false);
    endTimeRef.current = null;
  };

  const resetTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRunning(false);
    endTimeRef.current = null;
    setSecondsLeft((phase === 'focus' ? MODES[mode].focusMinutes : MODES[mode].breakMinutes) * 60);
  };

  const changeMode = (newMode: StudyMode) => {
    setIsRunning(false);
    endTimeRef.current = null;
    setMode(newMode);
    setPhase('focus');
    setSecondsLeft(MODES[newMode].focusMinutes * 60);
  };

  const simulateCycle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCompletedCycles((prev) => {
      const next = prev + 1;
      persistStats(next, streak);
      return next;
    });
  };

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

  return { mode, phase, isRunning, completedCycles, streak, formattedTime, startTimer, pauseTimer, resetTimer, changeMode, simulateCycle };
};