import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MODES } from '../constants/modes';
import { WELLNESS_TIPS } from '../constants/tips';
import { loadDailyStats, saveDailyStats } from '../services/storageService';
import { EnergyLevel, StudyMode, TimerPhase, WellnessTip } from '../types/pomodoro';

export const usePomodoro = () => {
  const [mode, setMode] = useState<StudyMode>('repaso');
  const [phase, setPhase] = useState<TimerPhase>('focus');
  const [secondsLeft, setSecondsLeft] = useState<number>(MODES.repaso.focusMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [energy, setEnergy] = useState<EnergyLevel>('media');
  const [distractionFree, setDistractionFree] = useState<boolean>(false);
  const [activeChallenge, setActiveChallenge] = useState<WellnessTip>(WELLNESS_TIPS[0]);

  const endTimeRef = useRef<number | null>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    loadDailyStats().then((d) => {
      setCompletedCycles(d.count);
      setStreak(d.streak);
      setEnergy(d.lastEnergy);
    });
  }, []);

  const pickChallenge = (breakMins: number, currentEnergy: EnergyLevel) => {
    const pool =
      currentEnergy === 'agotado' || breakMins >= 15
        ? WELLNESS_TIPS
        : WELLNESS_TIPS.filter((t) => t.minBreakMinutes <= breakMins);
    const list = pool.length ? pool : WELLNESS_TIPS;
    setActiveChallenge(list[Math.floor(Math.random() * list.length)]);
  };

  const handlePhaseComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsRunning(false);
    endTimeRef.current = null;
    if (phase === 'focus') {
      setCompletedCycles((prev) => {
        const next = prev + 1;
        saveDailyStats(next, streak, energy);
        return next;
      });
      const breakMins = MODES[mode].breakMinutes;
      pickChallenge(breakMins, energy);
      setPhase('break');
      setSecondsLeft(breakMins * 60);
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
      const rem = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setSecondsLeft(rem);
      if (rem === 0) {
        clearInterval(interval);
        handlePhaseComplete();
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isRunning, phase, mode, energy]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (appState.current.match(/inactive|background/) && next === 'active' && isRunning && endTimeRef.current) {
        const rem = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
        setSecondsLeft(rem);
        if (rem === 0) handlePhaseComplete();
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, [isRunning, phase, mode]);

  const setEnergyLevel = (level: EnergyLevel) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setEnergy(level);
    saveDailyStats(completedCycles, streak, level);
    if (level === 'agotado' && phase === 'focus') {
      setMode('repaso');
      setSecondsLeft(MODES.repaso.focusMinutes * 60);
    }
  };

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
      saveDailyStats(next, streak, energy);
      return next;
    });
  };

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`;

  return {
    mode, phase, isRunning, completedCycles, streak, energy, distractionFree,
    activeChallenge, formattedTime, startTimer, pauseTimer, resetTimer,
    changeMode, setEnergyLevel, setDistractionFree, simulateCycle, pickChallenge,
  };
};