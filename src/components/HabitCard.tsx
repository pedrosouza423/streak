import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { currentStreak, isCompletedOn, todayKey, type Habit } from '@/lib/habits'

type Props = {
  habit: Habit
  onToggle: (id: string) => void
  onPress: (id: string) => void
}

export function HabitCard({ habit, onToggle, onPress }: Props) {
  const today = todayKey()
  const done = isCompletedOn(habit, today)
  const streak = currentStreak(habit, today)

  return (
    <TouchableOpacity
      style={[styles.card, done && styles.cardDone]}
      onPress={() => onPress(habit.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: habit.color + '20' }]}>
        <Text style={styles.emoji}>{habit.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, done && styles.nameDone]}>{habit.name}</Text>
        <Text style={[styles.streak, { color: habit.color }]}>
          🔥 {streak} dias
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.checkbox,
          done
            ? { backgroundColor: habit.color, borderWidth: 0 }
            : styles.checkboxEmpty,
        ]}
        onPress={() => onToggle(habit.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {done && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a24',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  cardDone: {
    opacity: 0.55,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  nameDone: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  streak: {
    fontSize: 12,
    fontWeight: '700',
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxEmpty: {
    borderWidth: 2,
    borderColor: '#374151',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
})
