import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { MonthCalendar } from '@/components/MonthCalendar'
import { StatCard } from '@/components/StatCard'
import { bestStreak, countInMonth, currentStreak, todayKey, type Habit } from '@/lib/habits'
import { loadHabits, saveHabits } from '@/lib/storage'

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const [habit, setHabit] = useState<Habit | null>(null)
  const now = new Date()
  const [calYear, setCalYear] = useState(now.getFullYear())
  const [calMonth, setCalMonth] = useState(now.getMonth() + 1)

  useFocusEffect(
    useCallback(() => {
      loadHabits().then(habits => {
        const found = habits.find(h => h.id === id)
        if (!found) { router.back(); return }
        setHabit(found)
      })
    }, [id])
  )

  useEffect(() => {
    if (habit) {
      navigation.setOptions({ title: `${habit.emoji}  ${habit.name}` })
    }
  }, [habit, navigation])

  function prevMonth() {
    if (calMonth === 1) { setCalYear(y => y - 1); setCalMonth(12) }
    else setCalMonth(m => m - 1)
  }

  function nextMonth() {
    if (calMonth === 12) { setCalYear(y => y + 1); setCalMonth(1) }
    else setCalMonth(m => m + 1)
  }

  async function handleDelete() {
    Alert.alert(
      'Excluir hábito',
      `Tem certeza que deseja excluir "${habit?.name}"? O histórico será perdido.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const habits = await loadHabits()
            await saveHabits(habits.filter(h => h.id !== id))
            router.back()
          },
        },
      ]
    )
  }

  if (!habit) return null

  const today = todayKey()
  const streak = currentStreak(habit, today)
  const best = bestStreak(habit)
  const monthCount = countInMonth(habit, calYear, calMonth)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.statsRow}>
        <StatCard icon="🔥" value={streak} label="Streak atual" color={habit.color} />
        <StatCard icon="🏆" value={best} label="Melhor streak" color="#f59e0b" />
        <StatCard icon="📅" value={monthCount} label="Este mês" color="#6b7280" />
      </View>

      <MonthCalendar
        habit={habit}
        year={calYear}
        month={calMonth}
        color={habit.color}
        onPrev={prevMonth}
        onNext={nextMonth}
      />

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.7}>
        <Text style={styles.deleteBtnText}>Excluir hábito</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f14',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  deleteBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ef444460',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#ef4444',
    fontSize: 15,
    fontWeight: '600',
  },
})
