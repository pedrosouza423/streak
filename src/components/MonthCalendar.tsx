import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { fonts, palette, radius, typeScale } from '@/constants/theme'
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

  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  function dateKey(day: number) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onPrev}
          style={styles.arrow}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.arrowText}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {MONTH_NAMES[month - 1]} · {year}
        </Text>
        <TouchableOpacity
          onPress={onNext}
          style={styles.arrow}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
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
              <View
                style={[
                  styles.dayBg,
                  done && { backgroundColor: color },
                  isToday && !done && styles.todayBg,
                ]}
              >
                {done && isToday && <Text style={styles.flame}>🔥</Text>}
                <Text style={[
                  styles.dayNum,
                  done && styles.dayNumDone,
                  isToday && !done && styles.todayNum,
                ]}>
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
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  monthTitle: {
    color: palette.text,
    fontSize: typeScale.body,
    fontFamily: fonts.extraBold,
  },
  arrow: {
    padding: 4,
  },
  arrowText: {
    color: palette.textMuted,
    fontSize: 26,
    lineHeight: 28,
    fontFamily: fonts.black,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    color: palette.textFaint,
    fontSize: typeScale.caption,
    fontFamily: fonts.black,
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
    borderRadius: radius.full,
  },
  todayBg: {
    borderWidth: 2,
    borderColor: palette.textMuted,
  },
  flame: {
    fontSize: 8,
    position: 'absolute',
    top: 1,
    right: 1,
  },
  dayNum: {
    color: palette.textMuted,
    fontSize: 13,
    fontFamily: fonts.bold,
  },
  dayNumDone: {
    color: '#fff',
    fontFamily: fonts.black,
  },
  todayNum: {
    color: palette.text,
    fontFamily: fonts.black,
  },
})
