import { LinearGradient } from 'expo-linear-gradient'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { EmptyState } from '@/components/EmptyState'
import { HabitCard } from '@/components/HabitCard'
import { HeroCard } from '@/components/HeroCard'
import { PressableScale } from '@/components/PressableScale'
import { fonts, gradients, glow, palette, radius, spacing, typeScale } from '@/constants/theme'
import { currentStreak, isCompletedOn, todayKey, toggleCompletion, type Habit } from '@/lib/habits'
import { loadHabits, saveHabits } from '@/lib/storage'

const MOCK_NAME = 'Pedro'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return `Bom dia, ${MOCK_NAME}!`
  if (h < 18) return `Boa tarde, ${MOCK_NAME}!`
  return `Boa noite, ${MOCK_NAME}!`
}

function todayLabel() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const greeting = useMemo(() => getGreeting(), [])
  const dateLabel = useMemo(() => todayLabel(), [])
  const [habits, setHabits] = useState<Habit[]>([])

  useFocusEffect(
    useCallback(() => {
      loadHabits().then(setHabits)
    }, [])
  )

  async function handleToggle(id: string) {
    const today = todayKey()
    const updated = habits.map(h =>
      h.id === id ? toggleCompletion(h, today) : h
    )
    setHabits(updated)
    await saveHabits(updated)
  }

  const today = todayKey()
  const doneCount = habits.filter(h => isCompletedOn(h, today)).length
  const topStreak = habits.reduce((max, h) => Math.max(max, currentStreak(h, today)), 0)
  const TAB_BAR_H = insets.bottom + 88

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.date}>{dateLabel}</Text>
          </View>
        </View>

        {habits.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={habits}
            keyExtractor={h => h.id}
            ListHeaderComponent={
              <View style={styles.heroWrap}>
                <HeroCard topStreak={topStreak} done={doneCount} total={habits.length} />
              </View>
            }
            renderItem={({ item }) => (
              <HabitCard
                habit={item}
                onToggle={handleToggle}
                onPress={id => router.push(`/habit/${id}` as never)}
              />
            )}
            contentContainerStyle={{ paddingBottom: TAB_BAR_H }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>

      <PressableScale
        onPress={() => router.push('/new')}
        style={[styles.fabWrap, { bottom: TAB_BAR_H - 52 }]}
      >
        <LinearGradient
          colors={gradients.fire}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.fab, glow('#ff6b1a')]}
        >
          <Text style={styles.fabIcon}>+</Text>
        </LinearGradient>
      </PressableScale>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: typeScale.display,
    fontFamily: fonts.black,
    color: palette.text,
    marginBottom: 3,
  },
  date: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: palette.textMuted,
    textTransform: 'capitalize',
  },
  heroWrap: {
    marginBottom: spacing.lg,
  },
  fabWrap: {
    position: 'absolute',
    right: spacing.xl,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabIcon: {
    color: '#fff',
    fontSize: 32,
    fontFamily: fonts.black,
    lineHeight: 34,
  },
})
