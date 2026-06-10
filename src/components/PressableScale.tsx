import { Pressable, type PressableProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

type Props = PressableProps & { children: React.ReactNode }

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function PressableScale({ children, onPressIn, onPressOut, ...props }: Props) {
  const scale = useSharedValue(1)
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }))

  return (
    <AnimatedPressable
      style={animStyle}
      onPressIn={e => {
        // eslint-disable-next-line react-hooks/immutability
        scale.value = withSpring(0.96, { damping: 15, stiffness: 300 })
        onPressIn?.(e)
      }}
      onPressOut={e => {
        // eslint-disable-next-line react-hooks/immutability
        scale.value = withSpring(1, { damping: 15, stiffness: 300 })
        onPressOut?.(e)
      }}
      {...props}
    >
      {children}
    </AnimatedPressable>
  )
}
