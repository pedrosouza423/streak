import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HabitCard } from '@/components/HabitCard'
import { MOCK_HABITS, type Habit } from '@/lib/habits'

function todayLabel() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })
}

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS)

  function toggleHabit(id: string) {
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, completedToday: !h.completedToday } : h)
    )
  }

  const doneCount = habits.filter(h => h.completedToday).length

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.date}>{todayLabel()}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{doneCount} de {habits.length} ✓</Text>
          </View>
        </View>

        <FlatList
          data={habits}
          keyExtractor={h => h.id}
          renderItem={({ item }) => (
            <HabitCard habit={item} onToggle={toggleHabit} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
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
  list: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
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
