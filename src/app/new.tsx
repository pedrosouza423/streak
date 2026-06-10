import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { Platform, useState } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { GradientButton } from '@/components/GradientButton'
import { fonts, habitColors, palette, radius, spacing, typeScale } from '@/constants/theme'
import { generateId, type Habit } from '@/lib/habits'
import { loadHabits, saveHabits } from '@/lib/storage'

const EMOJIS = ['🧘', '📚', '🏃', '💧', '🥗', '🎯', '✍️', '🎸', '🌿', '💤', '🏋️', '🧹']

export default function NewHabitScreen() {
  const insets = useSafeAreaInsets()
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState(EMOJIS[0])
  const [color, setColor] = useState(habitColors[0])
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!name.trim()) return
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSaving(true)
    try {
      const newHabit: Habit = {
        id: generateId(),
        name: name.trim(),
        emoji,
        color,
        createdAt: new Date().toISOString(),
        completions: [],
      }
      const current = await loadHabits()
      await saveHabits([...current, newHabit])
      router.back()
    } catch (e) {
      console.error('[new.tsx] handleSave error:', e)
      Alert.alert('Erro', 'Não foi possível salvar o hábito.')
      setSaving(false)
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ex: Meditar 10 minutos"
        placeholderTextColor={palette.textFaint}
        autoFocus
        maxLength={40}
      />

      <Text style={styles.label}>Emoji</Text>
      <View style={styles.grid}>
        {EMOJIS.map(e => (
          <TouchableOpacity
            key={e}
            style={[
              styles.emojiCell,
              e === emoji && { borderColor: color, backgroundColor: color + '20' },
            ]}
            onPress={() => setEmoji(e)}
            activeOpacity={0.7}
          >
            <Text style={styles.emojiText}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Cor</Text>
      <View style={styles.colorRow}>
        {habitColors.map(c => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorDot,
              { backgroundColor: c },
              c === color && styles.colorSelected,
            ]}
            onPress={() => setColor(c)}
            activeOpacity={0.7}
          />
        ))}
      </View>

      <GradientButton
        label={saving ? 'Salvando…' : 'Criar hábito'}
        onPress={handleSave}
        disabled={!name.trim()}
        loading={saving}
        style={styles.btn}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    gap: spacing.sm,
  },
  label: {
    color: palette.textMuted,
    fontSize: typeScale.caption,
    fontFamily: fonts.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    marginTop: spacing.lg,
  },
  input: {
    backgroundColor: palette.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 16,
    color: palette.text,
    fontSize: typeScale.body,
    fontFamily: fonts.extraBold,
    borderWidth: 1.5,
    borderColor: palette.border,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm + 2,
  },
  emojiCell: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiText: {
    fontSize: 26,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  colorDot: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: '#ffffff',
  },
  btn: {
    marginTop: spacing.xxxl,
  },
})
