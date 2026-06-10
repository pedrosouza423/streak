import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { BadgeTile } from '@/components/BadgeTile'
import { fonts, gradients, palette, radius, spacing, typeScale } from '@/constants/theme'
import { type Habit } from '@/lib/habits'
import { MOCK_BADGES, MOCK_PROFILE } from '@/lib/mock'
import { loadHabits } from '@/lib/storage'
import { activeStreakOverall, bestStreakOverall, totalChecks, totalHabits } from '@/lib/stats'

type StatItem = { label: string; value: number; emoji: string }

export default function ProfileScreen() {
  const insets = useSafeAreaInsets()
  const [habits, setHabits] = useState<Habit[]>([])

  useFocusEffect(
    useCallback(() => {
      loadHabits().then(setHabits)
    }, [])
  )

  const statsItems: StatItem[] = [
    { label: 'Hábitos', value: totalHabits(habits), emoji: '📋' },
    { label: 'Total checks', value: totalChecks(habits), emoji: '✅' },
    { label: 'Melhor streak', value: bestStreakOverall(habits), emoji: '🏆' },
    { label: 'Streak ativo', value: activeStreakOverall(habits), emoji: '🔥' },
  ]

  const badges = MOCK_BADGES.map(b => {
    if (b.id === 'first') return { ...b, unlocked: totalHabits(habits) >= 1 }
    if (b.id === 'week') return { ...b, unlocked: bestStreakOverall(habits) >= 7 }
    if (b.id === 'checks50') return { ...b, unlocked: totalChecks(habits) >= 50 }
    return b
  })

  const joinedDate = new Date(MOCK_PROFILE.joinedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const TAB_BAR_H = insets.bottom + 88

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: TAB_BAR_H }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.avatarSection}>
            <LinearGradient
              colors={gradients.fire}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarRing}
            >
              <View style={styles.avatarInner}>
                <Text style={styles.avatarEmoji}>{MOCK_PROFILE.avatar}</Text>
              </View>
            </LinearGradient>
            <Text style={styles.name}>{MOCK_PROFILE.name}</Text>
            <Text style={styles.since}>desde {joinedDate}</Text>
          </View>

          <View style={styles.statsGrid}>
            {statsItems.map(s => (
              <View key={s.label} style={styles.statCard}>
                <Text style={styles.statEmoji}>{s.emoji}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Conquistas</Text>
          <View style={styles.badgesGrid}>
            {badges.map(b => (
              <BadgeTile key={b.id} badge={b} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    gap: spacing.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: radius.full,
    backgroundColor: palette.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 48,
  },
  name: {
    fontSize: typeScale.title,
    fontFamily: fonts.black,
    color: palette.text,
  },
  since: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: palette.textMuted,
    textTransform: 'capitalize',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: palette.border,
  },
  statEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: typeScale.title,
    fontFamily: fonts.black,
    color: palette.text,
  },
  statLabel: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: palette.textMuted,
  },
  sectionTitle: {
    fontSize: typeScale.heading,
    fontFamily: fonts.black,
    color: palette.text,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
})
