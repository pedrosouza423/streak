import { StyleSheet, Text, View } from 'react-native'

import { fonts, palette, radius, typeScale } from '@/constants/theme'
import type { MockBadge } from '@/lib/mock'

type Props = {
  badge: MockBadge
}

export function BadgeTile({ badge }: Props) {
  return (
    <View style={[styles.tile, !badge.unlocked && styles.tileLocked]}>
      <Text style={[styles.emoji, !badge.unlocked && styles.emojiLocked]}>
        {badge.unlocked ? badge.emoji : '🔒'}
      </Text>
      <Text style={[styles.title, !badge.unlocked && styles.titleLocked]} numberOfLines={1}>
        {badge.title}
      </Text>
      <Text style={styles.desc} numberOfLines={2}>
        {badge.description}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#ff6b1a40',
  },
  tileLocked: {
    borderColor: palette.border,
    opacity: 0.5,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 2,
  },
  emojiLocked: {
    opacity: 0.6,
  },
  title: {
    fontSize: typeScale.caption,
    fontFamily: fonts.black,
    color: palette.text,
    textAlign: 'center',
  },
  titleLocked: {
    color: palette.textFaint,
  },
  desc: {
    fontSize: 10,
    fontFamily: fonts.bold,
    color: palette.textMuted,
    textAlign: 'center',
    lineHeight: 13,
  },
})
