import { Stack } from 'expo-router'

import { AnimatedSplashOverlay } from '@/components/animated-icon'

export default function RootLayout() {
  return (
    <>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#0f0f14' },
          headerStyle: { backgroundColor: '#0f0f14' },
          headerTintColor: '#ffffff',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="new"
          options={{ presentation: 'modal', title: 'Novo hábito' }}
        />
        <Stack.Screen name="habit/[id]" options={{ title: '' }} />
      </Stack>
    </>
  )
}
