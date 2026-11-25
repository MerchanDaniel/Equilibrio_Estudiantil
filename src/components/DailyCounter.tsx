import { StyleSheet, Text, View } from 'react-native';

interface DailyCounterProps {
  completedCycles: number;
}

export const DailyCounter = ({ completedCycles }: DailyCounterProps) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.subtitle}>Progreso de hoy</Text>
      <Text style={styles.title}>Bloques completados</Text>
    </View>
    <View style={styles.badge}>
      <Text style={styles.count}>{completedCycles}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16,
    padding: 16,
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: { color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', fontWeight: '600' },
  title: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginTop: 2 },
  badge: {
    backgroundColor: 'rgba(79, 70, 229, 0.25)',
    borderWidth: 1,
    borderColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  count: { color: '#a5b4fc', fontWeight: '800', fontSize: 20 },
});