import { StyleSheet, Text, View } from 'react-native'

import { fonts, palette, radius, typeScale } from '@/constants/theme'

type Props = {
  icon: string
  value: number
  label: string
  color?: string
}

export function StatCard({ icon, value, label, color = '#ff6b1a' }: Props) {
  return (
    <View style={[styles.card, { borderColor: color + '30' }]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: 16,
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
  },
  value: {
    fontSize: 30,
    fontFamily: fonts.black,
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: palette.textMuted,
    textAlign: 'center',
  },
})
