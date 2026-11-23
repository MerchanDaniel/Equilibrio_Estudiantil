import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const TimerControls = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) => {
  return (
    <View style={styles.container}>
      {!isRunning ? (
        <Pressable onPress={onStart} style={[styles.mainButton, styles.startButton]}>
          <Text style={styles.startText}>Iniciar</Text>
        </Pressable>
      ) : (
        <Pressable onPress={onPause} style={[styles.mainButton, styles.pauseButton]}>
          <Text style={styles.pauseText}>Pausar</Text>
        </Pressable>
      )}

      <Pressable onPress={onReset} style={styles.resetButton}>
        <Text style={styles.resetText}>Reiniciar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
    marginTop: 16,
  },
  mainButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#059669',
  },
  pauseButton: {
    backgroundColor: '#f59e0b',
  },
  startText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
  },
  pauseText: {
    color: '#020617',
    fontWeight: '700',
    fontSize: 18,
  },
  resetButton: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetText: {
    color: '#e2e8f0',
    fontWeight: '600',
    fontSize: 17,
  },
});