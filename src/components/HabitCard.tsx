import * as Haptics from 'expo-haptics'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated'

import { fonts, glow, palette, radius, spacing, typeScale } from '@/constants/theme'
import { currentStreak, isCompletedOn, todayKey, type Habit } from '@/lib/habits'
import { PressableScale } from './PressableScale'

type Props = {
  habit: Habit
  onToggle: (id: string) => void
  onPress: (id: string) => void
}

export function HabitCard({ habit, onToggle, onPress }: Props) {
  const today = todayKey()
  const done = isCompletedOn(habit, today)
  const streak = currentStreak(habit, today)

  const checkScale = useSharedValue(1)
  const checkStyle = useAnimatedStyle(() => ({ transform: [{ scale: checkScale.value }] }))

  function handleToggle() {
    if (!done && Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    checkScale.value = withSequence(
      withSpring(1.3, { damping: 10, stiffness: 300 }),
      withSpring(1, { damping: 12, stiffness: 200 }),
    )
    onToggle(habit.id)
  }

  return (
    <PressableScale
      onPress={() => onPress(habit.id)}
      style={[
        styles.card,
        done && { borderColor: habit.color, ...glow(habit.color) },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: habit.color + '26' }]}>
        <Text style={styles.emoji}>{habit.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, done && { color: habit.color }]}>{habit.name}</Text>
        <View style={[styles.streakPill, { backgroundColor: habit.color + '20' }]}>
          <Text style={[styles.streakText, { color: habit.color }]}>🔥 {streak} dias</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleToggle}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.checkbox,
            checkStyle,
            done
              ? [{ backgroundColor: habit.color, borderWidth: 0 }, glow(habit.color)]
              : styles.checkboxEmpty,
          ]}
        >
          {done && <Text style={styles.checkmark}>✓</Text>}
        </Animated.View>
      </TouchableOpacity>
    </PressableScale>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    padding: spacing.lg + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm + 2,
    borderWidth: 1.5,
    borderColor: palette.border,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  info: {
    flex: 1,
    gap: 6,
  },
  name: {
    color: palette.text,
    fontSize: typeScale.body,
    fontFamily: fonts.extraBold,
  },
  streakPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  streakText: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
  },
  checkbox: {
    width: 38,
    height: 38,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxEmpty: {
    borderWidth: 2,
    borderColor: palette.border,
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.black,
  },
})
