import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { fonts, palette, radius } from '@/constants/theme'

type IoniconName = React.ComponentProps<typeof Ionicons>['name']

function TabIcon({ name, color, size }: { name: IoniconName; color: string; size: number }) {
  return <Ionicons name={name} size={size} color={color} />
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff6b1a',
        tabBarInactiveTintColor: palette.textFaint,
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom + 12,
          marginHorizontal: 16,
          height: 64,
          borderRadius: radius.xl,
          backgroundColor: palette.surface,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 12,
          paddingBottom: 0,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.extraBold,
          fontSize: 11,
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hoje',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'flame' : 'flame-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Amigos',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'people' : 'people-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}
