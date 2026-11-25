import { StyleSheet, View } from 'react-native';
import { DailyCounter } from '../components/DailyCounter';
import { ModeSelector } from '../components/ModeSelector';
import { TimerControls } from '../components/TimerControls';
import { TimerDisplay } from '../components/TimerDisplay';
import { useSharedPomodoro } from './_layout';

export default function TimerScreen() {
  const {
    mode,
    phase,
    isRunning,
    completedCycles,
    formattedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
  } = useSharedPomodoro();

  return (
    <View style={styles.screen}>
      <ModeSelector currentMode={mode} onSelectMode={changeMode} />
      <TimerDisplay formattedTime={formattedTime} phase={phase} isRunning={isRunning} />
      <TimerControls
        isRunning={isRunning}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
      />
      <DailyCounter completedCycles={completedCycles} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});