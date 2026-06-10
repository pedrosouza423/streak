import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator, StyleSheet, Text, type ViewStyle } from 'react-native'

import { fonts, gradients, glow, radius, typeScale } from '@/constants/theme'
import { PressableScale } from './PressableScale'

type Props = {
  label: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
}

export function GradientButton({ label, onPress, disabled, loading, style }: Props) {
  return (
    <PressableScale onPress={onPress} disabled={disabled || loading} style={style}>
      <LinearGradient
        colors={gradients.fire}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, (disabled || loading) && styles.disabled]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.label}>{label}</Text>
        )}
      </LinearGradient>
    </PressableScale>
  )
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: radius.lg,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...glow('#ff6b1a'),
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    color: '#fff',
    fontSize: typeScale.body,
    fontFamily: fonts.black,
    letterSpacing: 0.3,
  },
})
