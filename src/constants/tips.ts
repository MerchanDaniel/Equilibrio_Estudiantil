// src/constants/tips.ts
import { WellnessTip } from '../types/pomodoro';

export const WELLNESS_TIPS: WellnessTip[] = [
  {
    title: 'Regla 20-20-20 para la vista',
    desc: 'Mira un objeto a 6 metros durante 20 segundos para relajar el enfoque ocular.',
    minBreakMinutes: 5,
  },
  {
    title: 'Estiramiento de cuello y hombros',
    desc: 'Ponte de pie, gira suavemente los hombros atrás y estira el cuello 30 segundos.',
    minBreakMinutes: 5,
  },
  {
    title: 'Hidratación consciente',
    desc: 'Toma un vaso de agua completo antes de volver a concentrarte.',
    minBreakMinutes: 5,
  },
  {
    title: 'Caminata corta y aire fresco',
    desc: 'Camina 5-8 minutos lejos del escritorio o asómate a tomar aire para resetear la mente.',
    minBreakMinutes: 15,
  },
];