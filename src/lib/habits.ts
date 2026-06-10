export type Habit = {
  id: string
  name: string
  emoji: string
  color: string
  createdAt: string
  completions: string[] // 'YYYY-MM-DD' local dates, no duplicates
}

export function todayKey(): string {
  return toDateKey(new Date())
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function isCompletedOn(habit: Habit, dateKey: string): boolean {
  return habit.completions.includes(dateKey)
}

export function toggleCompletion(habit: Habit, dateKey: string): Habit {
  const has = habit.completions.includes(dateKey)
  return {
    ...habit,
    completions: has
      ? habit.completions.filter(d => d !== dateKey)
      : [...habit.completions, dateKey],
  }
}

export function currentStreak(habit: Habit, today: string): number {
  const set = new Set(habit.completions)
  // if today is not done, start counting from yesterday
  const startKey = set.has(today) ? today : _prevDay(today)
  if (!set.has(startKey)) return 0

  let streak = 0
  let cursor = startKey
  while (set.has(cursor)) {
    streak++
    cursor = _prevDay(cursor)
  }
  return streak
}

export function bestStreak(habit: Habit): number {
  if (habit.completions.length === 0) return 0
  const sorted = [...habit.completions].sort()
  let best = 1
  let current = 1
  for (let i = 1; i < sorted.length; i++) {
    if (_isNextDay(sorted[i - 1], sorted[i])) {
      current++
      if (current > best) best = current
    } else {
      current = 1
    }
  }
  return best
}

export function countInMonth(habit: Habit, year: number, month: number): number {
  const prefix = `${year}-${String(month).padStart(2, '0')}`
  return habit.completions.filter(d => d.startsWith(prefix)).length
}

// ── private helpers ──────────────────────────────────────────────────────────

function _prevDay(dateKey: string): string {
  const d = new Date(dateKey + 'T00:00:00')
  d.setDate(d.getDate() - 1)
  return toDateKey(d)
}

function _isNextDay(a: string, b: string): boolean {
  const da = new Date(a + 'T00:00:00')
  da.setDate(da.getDate() + 1)
  return toDateKey(da) === b
}
