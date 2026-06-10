import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { palette } from '@/constants/theme'

export default function FriendsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.emoji}>👥</Text>
        <Text style={styles.title}>Amigos</Text>
        <Text style={styles.hint}>Em breve</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emoji: { fontSize: 48 },
  title: { color: palette.text, fontSize: 18, fontFamily: 'Nunito_900Black' },
  hint: { color: palette.textMuted, fontSize: 14 },
})
