import { useFocusEffect } from 'expo-router'
import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import { EmptyState } from '@/components/EmptyState'
import { HabitCard } from '@/components/HabitCard'
import { isCompletedOn, todayKey, toggleCompletion, type Habit } from '@/lib/habits'
import { loadHabits, saveHabits } from '@/lib/storage'

function todayLabel() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.date}>{dateLabel}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{doneCount} de {habits.length} ✓</Text>
          </View>
        </View>

        {habits.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={habits}
            keyExtractor={h => h.id}
            renderItem={({ item }) => (
              <HabitCard
                habit={item}
                onToggle={handleToggle}
                onPress={id => router.push(`/habit/${id}`)}
              />
            )}
            contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>

      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + 16 }]}
        activeOpacity={0.8}
        onPress={() => router.push('/new')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f14',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#4b5563',
  },
  badge: {
    backgroundColor: '#1a1a24',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    color: '#6b7280',
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 30,
  },
})
