import { StyleSheet, Text, View } from 'react-native';
import { TimerPhase } from '../types/pomodoro';

interface TimerDisplayProps {
  formattedTime: string;
  phase: TimerPhase;
  isRunning: boolean;
}

export const TimerDisplay = ({ formattedTime, phase, isRunning }: TimerDisplayProps) => {
  const isFocus = phase === 'focus';
  return (
    <View style={[styles.circle, isFocus ? styles.focusBorder : styles.breakBorder]}>
      <Text style={[styles.label, isFocus ? styles.focusText : styles.breakText]}>
        {isFocus ? 'En Concentración' : 'Tiempo de Descanso'}
      </Text>
      <Text style={styles.time}>{formattedTime}</Text>
      <Text style={styles.status}>{isRunning ? 'Sesión activa' : 'En pausa'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 270,
    height: 270,
    borderRadius: 135,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    backgroundColor: '#0f172a',
    marginVertical: 20,
  },
  focusBorder: { borderColor: '#6366f1' },
  breakBorder: { borderColor: '#10b981' },
  label: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  focusText: { color: '#818cf8' },
  breakText: { color: '#34d399' },
  time: { fontSize: 56, fontWeight: '800', color: '#ffffff' },
  status: { fontSize: 12, color: '#94a3b8', marginTop: 10 },
});