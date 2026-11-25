import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { WELLNESS_TIPS } from '../constants/tips';

export default function TipsScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.heading}>Bienestar Estudiantil</Text>
      <Text style={styles.subheading}>
        Recomendaciones rápidas para tus bloques de descanso.
      </Text>
      {WELLNESS_TIPS.map((tip, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.desc}>{tip.desc}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#020617', paddingHorizontal: 24, paddingTop: 28 },
  heading: { fontSize: 24, fontWeight: '700', color: '#ffffff', marginBottom: 6 },
  subheading: { color: '#94a3b8', fontSize: 14, marginBottom: 24 },
  card: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 16 },
  title: { color: '#818cf8', fontWeight: '700', fontSize: 16, marginBottom: 6 },
  desc: { color: '#cbd5e1', fontSize: 14, lineHeight: 20 },
});