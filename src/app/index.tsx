import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DailyCounter } from '../components/DailyCounter';
import { EnergyCheck } from '../components/EnergyCheck';
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
    energy,
    distractionFree,
    activeChallenge,
    formattedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
    setEnergyLevel,
    setDistractionFree,
  } = useSharedPomodoro();

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => setDistractionFree(!distractionFree)}
          style={[styles.deepBtn, distractionFree && styles.deepBtnActive]}
        >
          <Ionicons
            name={distractionFree ? 'eye-outline' : 'moon-outline'}
            size={15}
            color={distractionFree ? '#fde68a' : '#f59e0b'}
          />
          <Text style={[styles.deepText, distractionFree && styles.deepTextActive]}>
            {distractionFree ? 'Salir de concentración profunda' : 'Concentración profunda'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {!distractionFree && <ModeSelector currentMode={mode} onSelectMode={changeMode} />}

        <TimerDisplay
          formattedTime={formattedTime}
          phase={phase}
          isRunning={isRunning}
          challenge={activeChallenge}
        />

        <TimerControls
          isRunning={isRunning}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
        />

        {!distractionFree && (
          <>
            <EnergyCheck energy={energy} onSelectEnergy={setEnergyLevel} />
            <DailyCounter completedCycles={completedCycles} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#090d16',
    paddingHorizontal: 22,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 4,
  },
  deepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  deepBtnActive: {
    backgroundColor: '#271c0c',
    borderColor: '#fbbf24',
  },
  deepText: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '700',
  },
  deepTextActive: {
    color: '#fef3c7',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});