import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export type StudyMode = 'repaso' | 'proyecto';
export type TimerPhase = 'focus' | 'break';

interface ModeConfig {
  label: string;
  focusMinutes: number;
  breakMinutes: number;
}

export const MODES: Record<StudyMode, ModeConfig> = {
  repaso: { label: 'Repaso Corto (25/5)', focusMinutes: 25, breakMinutes: 5 },
  proyecto: { label: 'Modo Código (45/15)', focusMinutes: 45, breakMinutes: 15 },
};

const STORAGE_KEY = '@equilibrio_estudiantil_stats';

export const usePomodoro = () => {
  const [mode, setMode] = useState<StudyMode>('repaso');
  const [phase, setPhase] = useState<TimerPhase>('focus');
  const [secondsLeft, setSecondsLeft] = useState<number>(MODES.repaso.focusMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  const endTimeRef = useRef<number | null>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  // Obtener fecha actual en formato YYYY-MM-DD
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // Cargar y validar persistencia diaria al abrir la app
  useEffect(() => {
    const loadStats = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const today = getTodayDate();
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.date === today) {
            setCompletedCycles(parsed.count || 0);
          } else {
            // Reinicio automático al detectar cambio de fecha
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }));
            setCompletedCycles(0);
          }
        } else {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }));
        }
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      }
    };
    loadStats();
  }, []);

  // Guardar incremento en AsyncStorage
  const incrementCycles = async () => {
    const today = getTodayDate();
    setCompletedCycles((prev) => {
      const nextCount = prev + 1;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: nextCount })).catch(
        console.error
      );
      return nextCount;
    });
  };

  // Manejar cambio de fase cuando llega a 00:00
  const handlePhaseComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsRunning(false);
    endTimeRef.current = null;

    if (phase === 'focus') {
      incrementCycles();
      setPhase('break');
      setSecondsLeft(MODES[mode].breakMinutes * 60);
    } else {
      setPhase('focus');
      setSecondsLeft(MODES[mode].focusMinutes * 60);
    }
  };

  // Intervalo preciso basado en Date.now()
  useEffect(() => {
    if (!isRunning) return;

    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + secondsLeft * 1000;
    }

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

  // Sincronizar al volver de segundo plano
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        if (isRunning && endTimeRef.current) {
          const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
          setSecondsLeft(remaining);
          if (remaining === 0) {
            handlePhaseComplete();
          }
        }
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
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
    const mins = phase === 'focus' ? MODES[mode].focusMinutes : MODES[mode].breakMinutes;
    setSecondsLeft(mins * 60);
  };

  const changeMode = (newMode: StudyMode) => {
    setIsRunning(false);
    endTimeRef.current = null;
    setMode(newMode);
    setPhase('focus');
    setSecondsLeft(MODES[newMode].focusMinutes * 60);
  };

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    mode,
    phase,
    isRunning,
    completedCycles,
    formattedTime: formatTime(),
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
  };
};