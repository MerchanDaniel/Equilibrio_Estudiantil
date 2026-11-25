export type StudyMode = 'repaso' | 'proyecto';
export type TimerPhase = 'focus' | 'break';
export type EnergyLevel = 'alta' | 'media' | 'agotado';

export interface ModeConfig {
  label: string;
  focusMinutes: number;
  breakMinutes: number;
}

export interface WellnessTip {
  title: string;
  desc: string;
  minBreakMinutes: number;
}