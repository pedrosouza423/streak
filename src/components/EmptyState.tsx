import { StyleSheet, Text, View } from 'react-native'

import { fonts, palette, radius, typeScale } from '@/constants/theme'

export function EmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.emoji}>🌱</Text>
      </View>
      <Text style={styles.title}>Nenhum hábito ainda</Text>
      <Text style={styles.hint}>Toque no + para criar seu{'\n'}primeiro hábito</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
    gap: 10,
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: palette.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 40,
  },
  title: {
    fontSize: typeScale.heading,
    fontFamily: fonts.black,
    color: palette.text,
  },
  hint: {
    fontSize: typeScale.body,
    fontFamily: fonts.bold,
    color: palette.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
})
