import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { FriendRow } from '@/components/FriendRow'
import { fonts, palette, radius, spacing, typeScale } from '@/constants/theme'
import { currentStreak, todayKey, type Habit } from '@/lib/habits'
import { MOCK_FRIENDS, MOCK_PROFILE } from '@/lib/mock'
import { loadHabits } from '@/lib/storage'

export default function FriendsScreen() {
  const insets = useSafeAreaInsets()
  const [habits, setHabits] = useState<Habit[]>([])

  useFocusEffect(
    useCallback(() => {
      loadHabits().then(setHabits)
    }, [])
  )

  const today = todayKey()
  const myStreak = habits.reduce((max, h) => Math.max(max, currentStreak(h, today)), 0)

  const meEntry = { id: 'me', name: MOCK_PROFILE.name, avatar: MOCK_PROFILE.avatar, streak: myStreak, lastActivity: 'você está aqui!' }
  const allFriends = [...MOCK_FRIENDS, meEntry].sort((a, b) => b.streak - a.streak)

  const TAB_BAR_H = insets.bottom + 88

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Amigos</Text>
          <Text style={styles.subtitle}>Leaderboard semanal 🏆</Text>
        </View>

        <FlatList
          data={allFriends}
          keyExtractor={f => f.id}
          renderItem={({ item, index }) => (
            <FriendRow friend={item} rank={index + 1} isMe={item.id === 'me'} />
          )}
          ListFooterComponent={
            <View style={styles.banner}>
              <Text style={styles.bannerEmoji}>🔗</Text>
              <Text style={styles.bannerText}>Em breve: conecte-se com amigos de verdade</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: TAB_BAR_H }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
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
    paddingTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typeScale.display,
    fontFamily: fonts.black,
    color: palette.text,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: palette.textMuted,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: palette.border,
    marginTop: spacing.sm,
  },
  bannerEmoji: {
    fontSize: 20,
  },
  bannerText: {
    flex: 1,
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: palette.textMuted,
  },
})
