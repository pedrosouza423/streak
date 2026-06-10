import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'

import { gradients, palette, radius } from '@/constants/theme'

type Props = {
  progress: number
  height?: number
  color?: string[]
}

export function ProgressBar({ progress, height = 10, color }: Props) {
  const pct = Math.min(1, Math.max(0, progress))
  return (
    <View style={[styles.track, { height, borderRadius: radius.full }]}>
      <LinearGradient
        colors={color ?? gradients.fire}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.fill, { width: `${pct * 100}%`, height, borderRadius: radius.full }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: palette.surfaceRaised,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {},
})
