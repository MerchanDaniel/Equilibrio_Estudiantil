import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MODES } from '../constants/modes';
import { WELLNESS_TIPS } from '../constants/tips';
import { useSharedPomodoro } from './_layout';

export default function TipsScreen() {
  const { activeChallenge, pickChallenge, mode, energy } = useSharedPomodoro();

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.heading}>Bienestar y Descanso Activo</Text>
      <Text style={styles.subheading}>Micro-retos para cuidar tu vista y evitar el cansancio.</Text>

      <View style={styles.featured}>
        <Text style={styles.badge}>RETO SUGERIDO AHORA</Text>
        <Text style={styles.featuredTitle}>{activeChallenge.title}</Text>
        <Text style={styles.desc}>{activeChallenge.desc}</Text>
        <Pressable
          onPress={() => pickChallenge(MODES[mode].breakMinutes, energy)}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Sortear otro micro-reto</Text>
        </Pressable>
      </View>

      {WELLNESS_TIPS.map((tip, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.desc}>{tip.desc}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#090d16', paddingHorizontal: 22, paddingTop: 24 },
  heading: { fontSize: 22, fontWeight: '700', color: '#f9fafb', marginBottom: 4 },
  subheading: { color: '#9ca3af', fontSize: 13, marginBottom: 18 },
  featured: { backgroundColor: '#111827', borderWidth: 1, borderColor: '#14b8a6', borderRadius: 16, padding: 18, marginBottom: 18 },
  badge: { color: '#2dd4bf', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  featuredTitle: { color: '#ffffff', fontSize: 17, fontWeight: '700', marginBottom: 6 },
  btn: { marginTop: 12, backgroundColor: '#0f766e', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#f0fdfa', fontWeight: '700', fontSize: 13 },
  card: { backgroundColor: '#111827', borderWidth: 1, borderColor: '#1f2937', borderRadius: 14, padding: 16, marginBottom: 12 },
  title: { color: '#fbbf24', fontWeight: '700', fontSize: 15, marginBottom: 4 },
  desc: { color: '#d1d5db', fontSize: 13, lineHeight: 19 },
});