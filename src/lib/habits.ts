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
