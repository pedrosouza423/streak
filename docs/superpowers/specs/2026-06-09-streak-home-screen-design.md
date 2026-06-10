# HomeScreen — Design Spec

**Data:** 2026-06-09
**Fase:** 0 (conclusão) / ponte para Fase 1
**Issue relacionada:** #1 — Setup & Hello Mobile

---

## Objetivo

Substituir o template padrão do Expo por uma tela funcional do Streak: lista de hábitos com visual dark + colorido, dados mockados e toggle de "feito hoje" via `useState` local (sem persistência).

Fora de escopo: criação de hábitos, AsyncStorage, navegação, EmptyState.

---

## Arquitetura

Três arquivos criados/modificados, seguindo a estrutura planejada no CLAUDE.md:

```
src/
  lib/
    habits.ts          ← tipo Habit + MOCK_HABITS (array com 3 hábitos)
  components/
    HabitCard.tsx      ← componente visual de cada item da lista
  app/
    index.tsx          ← HomeScreen — tela principal (substitui o template Expo)
```

Cada arquivo tem uma responsabilidade única e pode ser entendido/testado de forma independente.

---

## Modelo de dados

`src/lib/habits.ts`

```typescript
export type Habit = {
  id: string
  name: string
  emoji: string
  color: string          // hex — usado no ícone, streak e checkbox preenchido
  streak: number         // dias consecutivos (mock)
  completedToday: boolean
}

export const MOCK_HABITS: Habit[] = [
  { id: '1', name: 'Meditar',   emoji: '🧘', color: '#f97316', streak: 7,  completedToday: false },
  { id: '2', name: 'Ler 30min', emoji: '📚', color: '#6366f1', streak: 14, completedToday: true  },
  { id: '3', name: 'Exercitar', emoji: '🏃', color: '#10b981', streak: 3,  completedToday: false },
]
```

Na Fase 1 este tipo permanece idêntico — só adiciona persistência em volta.

---

## Componente HabitCard

`src/components/HabitCard.tsx`

**Props:**
- `habit: Habit`
- `onToggle: (id: string) => void`

**Visual:**
- Fundo: `#1a1a24` (card escuro sobre o fundo `#0f0f14` da tela)
- Ícone: emoji em box 42×42 com `border-radius: 12`, fundo `color + 20` (translúcido via `rgba` ou hex com alpha)
- Nome: branco 15sp bold; quando `completedToday`, cinza `#9ca3af` com `line-through`
- Streak: `🔥 N dias` na cor do hábito
- Checkbox: círculo 30×30; pendente = borda `#374151`; feito = fundo na cor do hábito com ✓ branco
- Card inteiro com `opacity: 0.55` quando `completedToday`

**Interação:** toque em qualquer área do card chama `onToggle(habit.id)`.

---

## HomeScreen

`src/app/index.tsx`

**Estado:**
```typescript
const [habits, setHabits] = useState<Habit[]>(MOCK_HABITS)
```

**Toggle:**
```typescript
function toggleHabit(id: string) {
  setHabits(prev =>
    prev.map(h => h.id === id ? { ...h, completedToday: !h.completedToday } : h)
  )
}
```

**Layout (de cima para baixo):**
1. Header — "Hoje" (bold 26sp branco) + data atual + contador `X de Y ✓` (calculado dos habits)
2. `FlatList` de `HabitCard` com `keyExtractor={h => h.id}`
3. FAB `+` (laranja `#f97316`, posição absoluta canto inferior direito) — visual only, sem ação

**Fundo da tela:** `#0f0f14`

---

## Visual style

| Token | Valor |
|-------|-------|
| Fundo da tela | `#0f0f14` |
| Fundo do card | `#1a1a24` |
| Texto principal | `#ffffff` |
| Texto secundário | `#6b7280` |
| Texto riscado | `#9ca3af` |
| Checkbox pendente | borda `#374151` |
| FAB | `#f97316` |

Cores de acento por hábito são livres (hex) — cada hábito carrega a sua no campo `color`.

---

## O que fica de fora (próximas fases)

| Feature | Fase |
|---------|------|
| Criar/editar hábitos | 1 |
| AsyncStorage (persistência) | 1 |
| EmptyState (lista vazia) | 1 |
| Navegação para detalhe | 2 |
| SQLite | 3 |

---

## Como rodar

```bash
npx expo start   # Metro bundler
# tecla 'a' para emulador Android, ou escaneia QR com Expo Go
```
