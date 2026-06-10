import { StyleSheet, Text, View } from 'react-native'

import { fonts, palette, radius, spacing, typeScale } from '@/constants/theme'
import type { MockFriend } from '@/lib/mock'

type Props = {
  friend: MockFriend
  rank: number
  isMe?: boolean
}

const RANK_MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export function FriendRow({ friend, rank, isMe }: Props) {
  return (
    <View style={[styles.row, isMe && styles.rowMe]}>
      <View style={styles.rankWrap}>
        {rank <= 3 ? (
          <Text style={styles.medal}>{RANK_MEDALS[rank]}</Text>
        ) : (
          <Text style={styles.rankNum}>{rank}</Text>
        )}
      </View>

      <View style={styles.avatar}>
        <Text style={styles.avatarEmoji}>{friend.avatar}</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, isMe && styles.nameMe]}>
          {isMe ? 'Você' : friend.name}
        </Text>
        <Text style={styles.activity}>{friend.lastActivity}</Text>
      </View>

      <View style={[styles.streakPill, isMe && styles.streakPillMe]}>
        <Text style={[styles.streakText, isMe && styles.streakTextMe]}>
          🔥 {friend.streak}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: palette.border,
  },
  rowMe: {
    borderColor: '#ff6b1a',
    backgroundColor: '#ff6b1a10',
  },
  rankWrap: {
    width: 28,
    alignItems: 'center',
  },
  medal: {
    fontSize: 22,
  },
  rankNum: {
    fontSize: typeScale.body,
    fontFamily: fonts.black,
    color: palette.textFaint,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: palette.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: typeScale.body,
    fontFamily: fonts.extraBold,
    color: palette.text,
  },
  nameMe: {
    color: '#ff6b1a',
  },
  activity: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: palette.textMuted,
  },
  streakPill: {
    backgroundColor: palette.surfaceRaised,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  streakPillMe: {
    backgroundColor: '#ff6b1a20',
  },
  streakText: {
    fontSize: typeScale.caption,
    fontFamily: fonts.black,
    color: palette.textMuted,
  },
  streakTextMe: {
    color: '#ff6b1a',
  },
})
