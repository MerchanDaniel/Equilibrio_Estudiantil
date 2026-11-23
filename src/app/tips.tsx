import { ScrollView, StyleSheet, Text, View } from 'react-native';

const TIPS = [
  {
    title: 'Regla 20-20-20 para la vista',
    desc: 'Cada 20 minutos frente al código o pantalla, mira un objeto a 6 metros de distancia durante 20 segundos.',
  },
  {
    title: 'Estiramiento en pausas cortas',
    desc: 'Aprovecha los 5 minutos de descanso para levantarte, estirar cuello y espalda, y activar la circulación.',
  },
  {
    title: 'Hidratación constante',
    desc: 'Ten una botella de agua cerca. La deshidratación leve reduce la concentración y aumenta la fatiga mental.',
  },
];

export default function TipsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Bienestar Estudiantil</Text>
      <Text style={styles.subheading}>
        Recomendaciones rápidas para tus bloques de descanso.
      </Text>

      {TIPS.map((tip, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{tip.title}</Text>
          <Text style={styles.cardDesc}>{tip.desc}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
  },
  subheading: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#818cf8',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
  },
  cardDesc: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
});