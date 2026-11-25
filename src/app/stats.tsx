import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MODES } from '../constants/modes';
import { useSharedPomodoro } from './_layout';

const DAILY_GOAL = 6;

export default function StatsScreen() {
  const { completedCycles, mode, streak, simulateCycle } = useSharedPomodoro();
  const minutes = completedCycles * MODES[mode].focusMinutes;
  const progress = Math.min(100, Math.round((completedCycles / DAILY_GOAL) * 100));

  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Resumen Diario</Text>
      <Text style={styles.subheading}>Meta sugerida: {DAILY_GOAL} bloques al día.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Ciclos completados ({progress}%)</Text>
        <Text style={styles.cycles}>{completedCycles} / {DAILY_GOAL}</Text>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, styles.half]}>
          <Text style={styles.label}>Tiempo enfocado</Text>
          <Text style={styles.minutes}>{minutes} min</Text>
        </View>
        <View style={[styles.card, styles.half]}>
          <Text style={styles.label}>Racha activa</Text>
          <Text style={styles.streak}>{streak} {streak === 1 ? 'día' : 'días'}</Text>
        </View>
      </View>

      <Pressable onPress={simulateCycle} style={styles.simBtn}>
        <Text style={styles.simText}>+ Simular bloque completado</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#020617', paddingHorizontal: 24, paddingTop: 28 },
  heading: { fontSize: 24, fontWeight: '700', color: '#ffffff', marginBottom: 4 },
  subheading: { color: '#94a3b8', fontSize: 14, marginBottom: 20 },
  card: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', borderRadius: 16, padding: 18, marginBottom: 14 },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  label: { color: '#94a3b8', fontSize: 13 },
  cycles: { fontSize: 40, fontWeight: '800', color: '#818cf8', marginTop: 6 },
  minutes: { fontSize: 24, fontWeight: '700', color: '#34d399', marginTop: 6 },
  streak: { fontSize: 24, fontWeight: '700', color: '#f59e0b', marginTop: 6 },
  barBg: { height: 10, backgroundColor: '#1e293b', borderRadius: 999, marginTop: 12, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#6366f1', borderRadius: 999 },
  simBtn: { marginTop: 6, backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#4f46e5', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  simText: { color: '#a5b4fc', fontWeight: '700', fontSize: 14 },
});