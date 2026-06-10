# Fase 1 — Fundamentos: v1 mínimo

**Data:** 2026-06-10
**Fase:** 1 — Fundamentos
**Issue relacionada:** #2 — v1 mínimo (criar/listar/marcar/salvar)

---

## Objetivo

Transformar a HomeScreen com dados mockados da Fase 0 num app real: criar hábitos, persistir com AsyncStorage e calcular streaks de verdade, com uma tela de detalhe inspirada no app "Boosts" (calendário mensal + stats).

---

## Decisões de design

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Criar hábito | Tela dedicada `new.tsx` | App real com Expo Router desde já |
| Formulário | Nome + emoji (grade ~12) + cor (paleta 8) | Tipo Habit já prevê os campos |
| Streak | Contagem real por data (`completions: string[]`) | Correto desde o início; Fase 3 só adiciona SQLite |
| Detalhe | Calendário + 3 stats (streak atual, melhor, total mês) | Inspirado no app Boosts que Pedro usa |
| Gerência | Só excluir (editar fica pra depois) | YAGNI — criar+excluir cobre o ciclo básico |
| Navegação | Stack puro (sem tabs do template) | Padrão correto pra esse tipo de app |

---

## Modelo de dados

`src/lib/habits.ts`

```typescript
export type Habit = {
  id: string
  name: string
  emoji: string
  color: string
  createdAt: string      // ISO date string
  completions: string[]  // 'YYYY-MM-DD', datas locais, sem duplicatas
}
```

`completedToday` e `streak` deixam de ser campos — são **funções puras derivadas**:

| Função | Descrição |
|--------|-----------|
| `todayKey()` | Retorna data local como `YYYY-MM-DD` |
| `toDateKey(date)` | Converte Date para `YYYY-MM-DD` local |
| `isCompletedOn(habit, dateKey)` | Boolean — se o hábito foi completado naquele dia |
| `toggleCompletion(habit, dateKey)` | Retorna novo Habit (imutável) com ou sem a data |
| `currentStreak(habit, today)` | Dias consecutivos até hoje (ou ontem se hoje não feito) |
| `bestStreak(habit)` | Maior sequência do histórico completo |
| `countInMonth(habit, year, month)` | Completions no mês |

---

## Persistência

`src/lib/storage.ts`

- Package: `@react-native-async-storage/async-storage` (instalado via `npx expo install`)
- Chave: `@streak/habits`
- `loadHabits(): Promise<Habit[]>` — JSON.parse, retorna `[]` em erro
- `saveHabits(habits: Habit[]): Promise<void>` — JSON.stringify

AsyncStorage é a fonte da verdade entre telas. Cada tela recarrega no foco com `useFocusEffect` — padrão equivalente ao `refetch on focus` do React Query.

---

## Navegação

`src/app/_layout.tsx` — substituir NativeTabs por Stack puro:

```tsx
<Stack screenOptions={{ backgroundColor: '#0f0f14', headerStyle: { backgroundColor: '#0f0f14' }, headerTintColor: '#fff' }}>
  <Stack.Screen name="index" options={{ headerShown: false }} />
  <Stack.Screen name="new" options={{ presentation: 'modal', title: 'Novo hábito' }} />
  <Stack.Screen name="habit/[id]" options={{ title: '' }} />
</Stack>
```

**Arquivos deletados:** `src/app/explore.tsx`, `src/components/app-tabs.tsx`, `src/components/app-tabs.web.tsx`

---

## Telas

### HomeScreen (`src/app/index.tsx`)

- `useFocusEffect` + `loadHabits()` — recarrega a cada foco
- Toggle: atualiza estado + `saveHabits` (otimista)
- HabitCard: corpo → `router.push('/habit/' + id)`; checkbox → toggle (tap targets separados)
- FAB `+` → `router.push('/new')`
- Lista vazia → `<EmptyState />`

### Criar hábito (`src/app/new.tsx`)

- `TextInput` para nome com `autoFocus`
- Grade de ~12 emojis selecionáveis (borda destacada no selecionado)
- Paleta de 8 cores (círculo colorido, borda no selecionado)
- Botão "Criar hábito" desabilitado se nome vazio
- Salva: `crypto.randomUUID()` → append → `saveHabits` → `router.back()`

### Detalhe do hábito (`src/app/habit/[id].tsx`)

- `useLocalSearchParams()` para o id
- Header: emoji + nome do hábito
- 3 `<StatCard>`: streak atual 🔥, melhor streak 🏆, total no mês 📅
- `<MonthCalendar>`: grade D/S/T/Q/Q/S/S (pt-BR), 🔥 nos dias completados, navegação ← →
- Botão "Excluir hábito" → `Alert.alert` com confirmação → remove + `saveHabits` → `router.back()`

---

## Componentes

| Arquivo | Mudança |
|---------|---------|
| `HabitCard.tsx` | Props: `{ habit, onToggle, onPress }`; streak calculado via lib; checkbox separado |
| `EmptyState.tsx` | Novo — emoji + mensagem + dica do FAB |
| `StatCard.tsx` | Novo — ícone + valor + label |
| `MonthCalendar.tsx` | Novo — grade mensal com completions, navegação entre meses |

---

## Testes

Só funções puras de `src/lib/habits.ts` (jest-expo):

- `currentStreak`: hoje feito / só até ontem / sequência quebrada / histórico vazio
- `bestStreak`: sequência atravessando mês, múltiplas sequências
- `toggleCompletion`: adiciona data / remove data / sem duplicatas

---

## Equivalências web (para o aprendizado)

| React Native / Expo Router | Equivalente web |
|---------------------------|-----------------|
| `expo-router` Stack | Next.js file-based routing |
| `router.push('/new')` | `router.push('/new')` do Next.js |
| `useLocalSearchParams()` | `useParams()` do React Router |
| `AsyncStorage` | `localStorage` (assíncrono) |
| `useFocusEffect` | `refetch on focus` do React Query |
