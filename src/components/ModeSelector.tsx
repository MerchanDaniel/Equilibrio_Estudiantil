import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MODES, StudyMode } from '../hook/UsePomodoro';

interface ModeSelectorProps {
  currentMode: StudyMode;
  onSelectMode: (mode: StudyMode) => void;
}

export const ModeSelector = ({ currentMode, onSelectMode }: ModeSelectorProps) => {
  return (
    <View style={styles.container}>
      {(Object.keys(MODES) as StudyMode[]).map((key) => {
        const isSelected = currentMode === key;
        return (
          <Pressable
            key={key}
            onPress={() => onSelectMode(key)}
            style={[
              styles.button,
              isSelected ? styles.buttonSelected : styles.buttonDefault,
            ]}
          >
            <Text style={[styles.text, isSelected ? styles.textSelected : styles.textDefault]}>
              {MODES[key].label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#4f46e5',
    borderColor: '#6366f1',
  },
  buttonDefault: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  text: {
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },
  textSelected: {
    color: '#ffffff',
  },
  textDefault: {
    color: '#cbd5e1',
  },
});