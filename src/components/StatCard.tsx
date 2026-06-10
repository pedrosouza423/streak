import { StyleSheet, Text, View } from 'react-native'

type Props = {
  icon: string
  value: number
  label: string
  color?: string
}

export function StatCard({ icon, value, label, color = '#f97316' }: Props) {
  return (
    <View style={styles.card}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#1a1a24',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 2,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
  },
})
