import { StyleSheet, Text, View } from 'react-native'

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🌱</Text>
      <Text style={styles.title}>Nenhum hábito ainda</Text>
      <Text style={styles.hint}>Toque no + para criar seu primeiro hábito</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
    gap: 8,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  hint: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
})
