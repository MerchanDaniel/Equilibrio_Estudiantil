import { StyleSheet, Text, View } from 'react-native';
import { TimerPhase, WellnessTip } from '../types/pomodoro';

interface TimerDisplayProps {
  formattedTime: string;
  phase: TimerPhase;
  isRunning: boolean;
  challenge: WellnessTip;
}

export const TimerDisplay = ({ formattedTime, phase, isRunning, challenge }: TimerDisplayProps) => {
  const isFocus = phase === 'focus';
  return (
    <View style={styles.wrapper}>
      <View style={[styles.circle, isFocus ? styles.focusRing : styles.breakRing]}>
        <Text style={[styles.phase, isFocus ? styles.focusText : styles.breakText]}>
          {isFocus ? 'Enfoque Activo' : 'Descanso Activo'}
        </Text>
        <Text style={styles.time}>{formattedTime}</Text>
        <Text style={styles.status}>{isRunning ? 'Corriendo' : 'Pausado'}</Text>
      </View>

      {!isFocus && (
        <View style={styles.challengeCard}>
          <Text style={styles.challengeTag}>Micro-reto: {challenge.title}</Text>
          <Text style={styles.challengeDesc}>{challenge.desc}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', width: '100%' },
  circle: {
    width: 256,
    height: 256,
    borderRadius: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    backgroundColor: '#111827',
    marginVertical: 14,
  },
  focusRing: { borderColor: '#f59e0b' },
  breakRing: { borderColor: '#14b8a6' },
  phase: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 },
  focusText: { color: '#fbbf24' },
  breakText: { color: '#2dd4bf' },
  time: { fontSize: 54, fontWeight: '800', color: '#f9fafb' },
  status: { fontSize: 12, color: '#9ca3af', marginTop: 8 },
  challengeCard: { width: '100%', backgroundColor: '#132a2e', borderWidth: 1, borderColor: '#14b8a6', borderRadius: 14, padding: 12, marginTop: 6 },
  challengeTag: { color: '#5eead4', fontWeight: '700', fontSize: 13, marginBottom: 3 },
  challengeDesc: { color: '#ccfbf1', fontSize: 12, lineHeight: 17 },
});