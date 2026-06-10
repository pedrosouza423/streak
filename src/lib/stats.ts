import { bestStreak, currentStreak, todayKey, type Habit } from './habits'

export function totalHabits(habits: Habit[]) {
  return habits.length
}

export function totalChecks(habits: Habit[]) {
  return habits.reduce((sum, h) => sum + h.completions.length, 0)
}

export function bestStreakOverall(habits: Habit[]) {
  return habits.reduce((max, h) => Math.max(max, bestStreak(h)), 0)
}

export function activeStreakOverall(habits: Habit[]) {
  const today = todayKey()
  return habits.reduce((max, h) => Math.max(max, currentStreak(h, today)), 0)
}
