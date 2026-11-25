export type StudyMode = 'repaso' | 'proyecto';
export type TimerPhase = 'focus' | 'break';

export interface ModeConfig {
  label: string;
  focusMinutes: number;
  breakMinutes: number;
}

export interface WellnessTip {
  title: string;
  desc: string;
}