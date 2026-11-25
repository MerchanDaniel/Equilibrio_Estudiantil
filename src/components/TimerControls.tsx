import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const TimerControls = ({ isRunning, onStart, onPause, onReset }: TimerControlsProps) => (
  <View style={styles.row}>
    {!isRunning ? (
      <Pressable onPress={onStart} style={[styles.mainBtn, styles.startBtn]}>
        <Text style={styles.startText}>Iniciar</Text>
      </Pressable>
    ) : (
      <Pressable onPress={onPause} style={[styles.mainBtn, styles.pauseBtn]}>
        <Text style={styles.pauseText}>Pausar</Text>
      </Pressable>
    )}
    <Pressable onPress={onReset} style={styles.resetBtn}>
      <Text style={styles.resetText}>Reiniciar</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 16, width: '100%', justifyContent: 'center', marginTop: 16 },
  mainBtn: { flex: 1, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  startBtn: { backgroundColor: '#059669' },
  pauseBtn: { backgroundColor: '#f59e0b' },
  startText: { color: '#ffffff', fontWeight: '700', fontSize: 18 },
  pauseText: { color: '#020617', fontWeight: '700', fontSize: 18 },
  resetBtn: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 16,
    justifyContent: 'center',
  },
  resetText: { color: '#e2e8f0', fontWeight: '600', fontSize: 17 },
});