import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EnergyLevel } from '../types/pomodoro';

interface EnergyCheckProps {
  energy: EnergyLevel;
  onSelectEnergy: (level: EnergyLevel) => void;
}

const LEVELS: { key: EnergyLevel; label: string; color: string }[] = [
  { key: 'alta', label: 'Alta', color: '#10b981' },
  { key: 'media', label: 'Media', color: '#f59e0b' },
  { key: 'agotado', label: 'Agotado', color: '#f43f5e' },
];

export const EnergyCheck = ({ energy, onSelectEnergy }: EnergyCheckProps) => (
  <View style={styles.box}>
    <Text style={styles.title}>¿Cómo sientes tu energía hoy?</Text>
    <View style={styles.row}>
      {LEVELS.map((item) => {
        const active = energy === item.key;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelectEnergy(item.key)}
            style={[
              styles.pill,
              active && { borderColor: item.color, backgroundColor: '#1e293b' },
            ]}
          >
            <Text style={[styles.pillText, active && { color: item.color }]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
    {energy === 'agotado' && (
      <Text style={styles.hint}>Modo Repaso (25/5) sugerido para evitar sobrecarga.</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  box: { width: '100%', backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', borderRadius: 16, padding: 14, marginTop: 18 },
  title: { color: '#cbd5e1', fontSize: 12, fontWeight: '600', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8 },
  pill: { flex: 1, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#334155', alignItems: 'center' },
  pillText: { color: '#94a3b8', fontSize: 12, fontWeight: '700' },
  hint: { color: '#fda4af', fontSize: 11, marginTop: 8 },
});