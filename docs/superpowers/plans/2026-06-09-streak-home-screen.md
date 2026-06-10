# HomeScreen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o template Expo pela primeira tela real do Streak — lista de hábitos dark + colorida, dados mockados, toggle de "feito hoje" via `useState` local.

**Architecture:** Três arquivos independentes com responsabilidade única: `lib/habits.ts` define os tipos e dados mock; `components/HabitCard.tsx` renderiza cada item; `app/index.tsx` compõe a tela com FlatList e FAB. Sem persistência — estado vive só em memória.

**Tech Stack:** React Native 0.85, Expo SDK 56, Expo Router (file-based), TypeScript, react-native-safe-area-context.

**Spec:** `docs/superpowers/specs/2026-06-09-streak-home-screen-design.md`

---

## Arquivos

| Ação | Caminho |
|------|---------|
| Modify | `.gitignore` |
| Create | `src/lib/habits.ts` |
| Create | `src/components/HabitCard.tsx` |
| Modify | `src/app/index.tsx` |

---

### Task 1: Gitignore — adicionar `.superpowers/`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Adicionar `.superpowers/` ao .gitignore**

Abrir `.gitignore` e adicionar ao final:

```
# brainstorming visual companion
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm dir"
```

---

### Task 2: Tipos e dados mock — `src/lib/habits.ts`

**Files:**
- Create: `src/lib/habits.ts`

- [ ] **Step 1: Criar o arquivo com o tipo `Habit` e o array de mock**

```typescript
export type Habit = {
  id: string
  name: string
  emoji: string
  color: string          // hex — usado no ícone, streak e checkbox preenchido
  streak: number
  completedToday: boolean
}

export const MOCK_HABITS: Habit[] = [
  { id: '1', name: 'Meditar',   emoji: '🧘', color: '#f97316', streak: 7,  completedToday: false },
  { id: '2', name: 'Ler 30min', emoji: '📚', color: '#6366f1', streak: 14, completedToday: true  },
  { id: '3', name: 'Exercitar', emoji: '🏃', color: '#10b981', streak: 3,  completedToday: false },
]
```

> **Nota RN para quem vem do web:** esse arquivo é igual a qualquer `types.ts` de um projeto React. Nada específico de mobile aqui.

- [ ] **Step 2: Verificar que o TypeScript não reclama**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/habits.ts
git commit -m "feat(habits): add Habit type and mock data"
```

---

### Task 3: Componente — `src/components/HabitCard.tsx`

**Files:**
- Create: `src/components/HabitCard.tsx`

- [ ] **Step 1: Criar o componente**

```typescript
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import type { Habit } from '@/lib/habits'

type Props = {
  habit: Habit
  onToggle: (id: string) => void
}

export function HabitCard({ habit, onToggle }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, habit.completedToday && styles.cardDone]}
      onPress={() => onToggle(habit.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: habit.color + '20' }]}>
        <Text style={styles.emoji}>{habit.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, habit.completedToday && styles.nameDone]}>
          {habit.name}
        </Text>
        <Text style={[styles.streak, { color: habit.color }]}>
          🔥 {habit.streak} dias
        </Text>
      </View>

      <View style={[
        styles.checkbox,
        habit.completedToday
          ? { backgroundColor: habit.color, borderWidth: 0 }
          : styles.checkboxEmpty,
      ]}>
        {habit.completedToday && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a24',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  cardDone: {
    opacity: 0.55,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 3,
  },
  nameDone: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  streak: {
    fontSize: 12,
    fontWeight: '700',
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxEmpty: {
    borderWidth: 2,
    borderColor: '#374151',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
})
```

> **Nota RN para quem vem do web:**
> - `View` = `div`
> - `Text` = `span`/`p` (obrigatório para texto — não pode soltar texto solto em `View`)
> - `TouchableOpacity` = `button` com efeito de opacidade no toque
> - `StyleSheet.create` = objeto de estilos tipado; propriedades em camelCase igual CSS-in-JS
> - `gap: 12` funciona igual ao CSS moderno (suportado desde RN 0.71)
> - `habit.color + '20'` concatena `#f97316` + `20` → `#f9731620` (hex com canal alpha = 12% opacidade)

- [ ] **Step 2: Checar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/HabitCard.tsx
git commit -m "feat(components): add HabitCard component"
```

---

### Task 4: Tela principal — `src/app/index.tsx`

**Files:**
- Modify: `src/app/index.tsx` (substituir conteúdo inteiro)

- [ ] **Step 1: Substituir o conteúdo do arquivo**

```typescript
import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HabitCard } from '@/components/HabitCard'
import { MOCK_HABITS, type Habit } from '@/lib/habits'

function todayLabel() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })
}

export default function HomeScreen() {
  const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS)

  function toggleHabit(id: string) {
    setHabits(prev =>
      prev.map(h => h.id === id ? { ...h, completedToday: !h.completedToday } : h)
    )
  }

  const doneCount = habits.filter(h => h.completedToday).length

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.date}>{todayLabel()}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{doneCount} de {habits.length} ✓</Text>
          </View>
        </View>

        <FlatList
          data={habits}
          keyExtractor={h => h.id}
          renderItem={({ item }) => (
            <HabitCard habit={item} onToggle={toggleHabit} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f14',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#4b5563',
  },
  badge: {
    backgroundColor: '#1a1a24',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    color: '#6b7280',
  },
  list: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 30,
  },
})
```

> **Nota RN para quem vem do web:**
> - `FlatList` = lista virtualizada (como `react-window` no web). Usa `data` + `renderItem` + `keyExtractor`. Nunca use `.map()` em listas longas no RN — não virtualiza.
> - `SafeAreaView` garante que o conteúdo não fica atrás do notch/status bar do celular.
> - `position: 'absolute'` funciona igual ao CSS — posiciona relativo ao pai com `position: 'relative'` (que é o padrão no RN).
> - `elevation` é a shadow do Android. `shadowColor/Offset/Opacity/Radius` são para iOS.

- [ ] **Step 2: Checar TypeScript**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/app/index.tsx
git commit -m "feat(home): implement HomeScreen with habit list and toggle"
```

---

### Task 5: Rodar e verificar

**Files:** nenhum — verificação visual

- [ ] **Step 1: Iniciar o Metro**

```bash
npx expo start
```

No terminal do Metro: tecla `a` para abrir no emulador Android, ou escanear o QR com o Expo Go no celular.

- [ ] **Step 2: Verificar checklist visual**

| Item | Esperado |
|------|----------|
| Fundo da tela | Preto azulado `#0f0f14` |
| Header | "Hoje" grande + data + badge "1 de 3 ✓" |
| Cards | 3 hábitos com emoji colorido, nome, streak 🔥 |
| Hábito 2 (Ler) | Já começa com opacity baixa e nome riscado |
| Toque num card pendente | Fica com opacity baixa, nome riscado, checkbox preenche com cor |
| Toque num card feito | Volta ao estado pendente |
| Badge do header | Atualiza o contador conforme você toca |
| FAB `+` | Visível no canto inferior direito, laranja, sem ação |

- [ ] **Step 3: Commit final se tudo ok**

```bash
git add .
git commit -m "feat(fase-0): complete HomeScreen — closes #1"
```

> Esse commit fecha a Issue #1 no GitHub quando for mergeado na `main` via PR.
