import {
  bestStreak,
  countInMonth,
  currentStreak,
  toggleCompletion,
  type Habit,
} from '../habits'

function makeHabit(completions: string[]): Habit {
  return {
    id: '1',
    name: 'Test',
    emoji: '🧪',
    color: '#f97316',
    createdAt: '2026-01-01T00:00:00.000Z',
    completions,
  }
}

// ── currentStreak ────────────────────────────────────────────────────────────

describe('currentStreak', () => {
  it('returns 0 for empty history', () => {
    expect(currentStreak(makeHabit([]), '2026-06-10')).toBe(0)
  })

  it('counts streak when today is done', () => {
    const habit = makeHabit(['2026-06-08', '2026-06-09', '2026-06-10'])
    expect(currentStreak(habit, '2026-06-10')).toBe(3)
  })

  it('counts streak from yesterday when today is not done', () => {
    const habit = makeHabit(['2026-06-08', '2026-06-09'])
    expect(currentStreak(habit, '2026-06-10')).toBe(2)
  })

  it('returns 0 when streak is broken', () => {
    const habit = makeHabit(['2026-06-05', '2026-06-06'])
    expect(currentStreak(habit, '2026-06-10')).toBe(0)
  })

  it('handles single day streak', () => {
    const habit = makeHabit(['2026-06-10'])
    expect(currentStreak(habit, '2026-06-10')).toBe(1)
  })

  it('crosses month boundary correctly', () => {
    const habit = makeHabit(['2026-05-31', '2026-06-01', '2026-06-02'])
    expect(currentStreak(habit, '2026-06-02')).toBe(3)
  })
})

// ── bestStreak ───────────────────────────────────────────────────────────────

describe('bestStreak', () => {
  it('returns 0 for empty history', () => {
    expect(bestStreak(makeHabit([]))).toBe(0)
  })

  it('finds the best among multiple sequences', () => {
    // 3-day streak, gap, 2-day streak
    const habit = makeHabit([
      '2026-01-01', '2026-01-02', '2026-01-03',
      '2026-01-10', '2026-01-11',
    ])
    expect(bestStreak(habit)).toBe(3)
  })

  it('spans across a month boundary', () => {
    const habit = makeHabit([
      '2026-05-29', '2026-05-30', '2026-05-31',
      '2026-06-01', '2026-06-02',
    ])
    expect(bestStreak(habit)).toBe(5)
  })

  it('works with single entry', () => {
    expect(bestStreak(makeHabit(['2026-06-10']))).toBe(1)
  })
})

// ── toggleCompletion ─────────────────────────────────────────────────────────

describe('toggleCompletion', () => {
  it('adds a date that is not present', () => {
    const habit = makeHabit(['2026-06-09'])
    const updated = toggleCompletion(habit, '2026-06-10')
    expect(updated.completions).toContain('2026-06-10')
    expect(updated.completions).toHaveLength(2)
  })

  it('removes a date that is already present', () => {
    const habit = makeHabit(['2026-06-09', '2026-06-10'])
    const updated = toggleCompletion(habit, '2026-06-10')
    expect(updated.completions).not.toContain('2026-06-10')
    expect(updated.completions).toHaveLength(1)
  })

  it('does not duplicate dates', () => {
    const habit = makeHabit(['2026-06-10'])
    // toggle off then on
    const off = toggleCompletion(habit, '2026-06-10')
    const on = toggleCompletion(off, '2026-06-10')
    expect(on.completions.filter(d => d === '2026-06-10')).toHaveLength(1)
  })

  it('is immutable — does not mutate original habit', () => {
    const habit = makeHabit(['2026-06-09'])
    const original = [...habit.completions]
    toggleCompletion(habit, '2026-06-10')
    expect(habit.completions).toEqual(original)
  })
})

// ── countInMonth ─────────────────────────────────────────────────────────────

describe('countInMonth', () => {
  it('counts completions in the given month', () => {
    const habit = makeHabit([
      '2026-06-01', '2026-06-15', '2026-06-30',
      '2026-07-01',
    ])
    expect(countInMonth(habit, 2026, 6)).toBe(3)
  })

  it('returns 0 for a month with no completions', () => {
    expect(countInMonth(makeHabit([]), 2026, 6)).toBe(0)
  })
})
