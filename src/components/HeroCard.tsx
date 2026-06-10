import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View } from 'react-native'

import { fonts, gradients, glow, radius, typeScale } from '@/constants/theme'
import { ProgressBar } from './ProgressBar'

type Props = {
  topStreak: number
  done: number
  total: number
}

export function HeroCard({ topStreak, done, total }: Props) {
  const progress = total > 0 ? done / total : 0

  return (
    <LinearGradient
      colors={gradients.fire}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, glow('#ff6b1a')]}
    >
      <View style={styles.row}>
        <View>
          <Text style={styles.streakNum}>{topStreak}</Text>
          <Text style={styles.streakLabel}>🔥 maior streak</Text>
        </View>
        <View style={styles.statsRight}>
          <Text style={styles.statsNum}>{done}/{total}</Text>
          <Text style={styles.statsLabel}>hábitos hoje</Text>
        </View>
      </View>
      <View style={styles.progressWrap}>
        <ProgressBar
          progress={progress}
          height={8}
          color={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.9)']}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    padding: 20,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  streakNum: {
    fontSize: 56,
    fontFamily: fonts.black,
    color: '#fff',
    lineHeight: 60,
  },
  streakLabel: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  statsRight: {
    alignItems: 'flex-end',
    paddingBottom: 6,
  },
  statsNum: {
    fontSize: typeScale.title,
    fontFamily: fonts.black,
    color: '#fff',
  },
  statsLabel: {
    fontSize: typeScale.caption,
    fontFamily: fonts.bold,
    color: 'rgba(255,255,255,0.85)',
  },
  progressWrap: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
})
