import { StyleSheet, Text, View } from 'react-native';
import { MODES } from '../hook/UsePomodoro';
import { useSharedPomodoro } from './_layout';

export default function StatsScreen() {
  const { completedCycles, mode } = useSharedPomodoro();
  const estimatedMinutes = completedCycles * MODES[mode].focusMinutes;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Resumen Diario</Text>
      <Text style={styles.subheading}>
        Tu progreso se guarda automáticamente y se reinicia cada día.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Ciclos completados hoy</Text>
        <Text style={styles.cyclesValue}>{completedCycles}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Tiempo enfocado estimado</Text>
        <Text style={styles.minutesValue}>{estimatedMinutes} min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  subheading: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  cardLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  cyclesValue: {
    fontSize: 48,
    fontWeight: '800',
    color: '#818cf8',
    marginTop: 8,
  },
  minutesValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#34d399',
    marginTop: 8,
  },
});