import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { isCompletedOn, toDateKey, type Habit } from '@/lib/habits'

type Props = {
  habit: Habit
  year: number
  month: number // 1-based
  color: string
  onPrev: () => void
  onNext: () => void
}

const WEEK_DAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

export function MonthCalendar({ habit, year, month, color, onPrev, onNext }: Props) {
  const today = toDateKey(new Date())

  // 0-based weekday of the 1st of the month (0=Sun)
  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  // pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  function dateKey(day: number) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPrev} style={styles.arrow}>
          <Text style={styles.arrowText}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {MONTH_NAMES[month - 1].toUpperCase()} · {year}
        </Text>
        <TouchableOpacity onPress={onNext} style={styles.arrow}>
          <Text style={styles.arrowText}>{'›'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {WEEK_DAYS.map((d, i) => (
          <Text key={i} style={styles.weekDay}>{d}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((day, i) => {
          if (!day) return <View key={i} style={styles.cell} />
          const key = dateKey(day)
          const done = isCompletedOn(habit, key)
          const isToday = key === today
          return (
            <View key={i} style={styles.cell}>
              <View style={[styles.dayBg, isToday && styles.todayBg]}>
                {done && <Text style={styles.flame}>🔥</Text>}
                <Text style={[styles.dayNum, done && styles.dayNumDone, isToday && styles.todayNum]}>
                  {day}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a24',
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  monthTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  arrow: {
    padding: 4,
  },
  arrowText: {
    color: '#6b7280',
    fontSize: 22,
    lineHeight: 24,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: '#4b5563',
    fontSize: 11,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBg: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  todayBg: {
    backgroundColor: '#ffffff15',
  },
  flame: {
    fontSize: 10,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dayNum: {
    color: '#9ca3af',
    fontSize: 13,
    fontWeight: '500',
  },
  dayNumDone: {
    color: '#ffffff',
    fontWeight: '700',
  },
  todayNum: {
    color: '#ffffff',
  },
})
