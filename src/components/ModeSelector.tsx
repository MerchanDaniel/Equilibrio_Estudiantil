import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MODES } from '../constants/modes';
import { StudyMode } from '../types/pomodoro';

interface ModeSelectorProps {
  currentMode: StudyMode;
  onSelectMode: (mode: StudyMode) => void;
}

export const ModeSelector = ({ currentMode, onSelectMode }: ModeSelectorProps) => (
  <View style={styles.row}>
    {(Object.keys(MODES) as StudyMode[]).map((key) => {
      const active = currentMode === key;
      return (
        <Pressable
          key={key}
          onPress={() => onSelectMode(key)}
          style={[styles.btn, active ? styles.activeBtn : styles.inactiveBtn]}
        >
          <Text style={[styles.text, active ? styles.activeText : styles.inactiveText]}>
            {MODES[key].label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, width: '100%', marginBottom: 24 },
  btn: { flex: 1, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, alignItems: 'center' },
  activeBtn: { backgroundColor: '#4f46e5', borderColor: '#6366f1' },
  inactiveBtn: { backgroundColor: '#1e293b', borderColor: '#334155' },
  text: { fontWeight: '600', fontSize: 13, textAlign: 'center' },
  activeText: { color: '#ffffff' },
  inactiveText: { color: '#cbd5e1' },
});