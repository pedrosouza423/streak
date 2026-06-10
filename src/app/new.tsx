import { router } from 'expo-router'
import { useState } from 'react'
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

import { type Habit } from '@/lib/habits'
import { loadHabits, saveHabits } from '@/lib/storage'

const EMOJIS = ['🧘', '📚', '🏃', '💧', '🥗', '🎯', '✍️', '🎸', '🌿', '💤', '🏋️', '🧹']

const COLORS = [
  '#f97316', // orange
  '#6366f1', // indigo
  '#10b981', // emerald
  '#ef4444', // red
  '#3b82f6', // blue
  '#a855f7', // purple
  '#f59e0b', // amber
  '#14b8a6', // teal
]

export default function NewHabitScreen() {
  const insets = useSafeAreaInsets()
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState(EMOJIS[0])
  const [color, setColor] = useState(COLORS[0])
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!name.trim()) return
    setSaving(true)
    try {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name: name.trim(),
        emoji,
        color,
        createdAt: new Date().toISOString(),
        completions: [],
      }
      const current = await loadHabits()
      await saveHabits([...current, newHabit])
      router.back()
    } catch {
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
        placeholderTextColor="#4b5563"
        autoFocus
        maxLength={40}
      />

      <Text style={styles.label}>Emoji</Text>
      <View style={styles.grid}>
        {EMOJIS.map(e => (
          <TouchableOpacity
            key={e}
            style={[styles.emojiCell, e === emoji && styles.emojiSelected]}
            onPress={() => setEmoji(e)}
          >
            <Text style={styles.emojiText}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Cor</Text>
      <View style={styles.colorRow}>
        {COLORS.map(c => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorDot,
              { backgroundColor: c },
              c === color && styles.colorSelected,
            ]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.btn, (!name.trim() || saving) && styles.btnDisabled]}
        onPress={handleSave}
        disabled={!name.trim() || saving}
        activeOpacity={0.8}
      >
        <Text style={styles.btnText}>{saving ? 'Salvando…' : 'Criar hábito'}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f14',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 8,
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#1a1a24',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emojiCell: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#1a1a24',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiSelected: {
    borderColor: '#f97316',
  },
  emojiText: {
    fontSize: 24,
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: '#ffffff',
  },
  btn: {
    marginTop: 32,
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
})
