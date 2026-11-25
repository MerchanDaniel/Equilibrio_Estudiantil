// src/constants/modes.ts
import { ModeConfig, StudyMode } from '../types/pomodoro';

export const MODES: Record<StudyMode, ModeConfig> = {
  repaso: { label: 'Repaso Corto (25/5)', focusMinutes: 25, breakMinutes: 5 },
  proyecto: { label: 'Modo Código (45/15)', focusMinutes: 45, breakMinutes: 15 },
};