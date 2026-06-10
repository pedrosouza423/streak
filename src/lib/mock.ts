export const MOCK_PROFILE = {
  name: 'Pedro',
  avatar: '🦊',
  joinedAt: '2026-01-01',
} as const

export type MockFriend = {
  id: string
  name: string
  avatar: string
  streak: number
  lastActivity: string
}

export const MOCK_FRIENDS: MockFriend[] = [
  { id: '1', name: 'Ana Lima', avatar: '🐼', streak: 42, lastActivity: 'completou Meditar há 1h' },
  { id: '2', name: 'Caio Reis', avatar: '🦁', streak: 28, lastActivity: 'completou Correr há 3h' },
  { id: '3', name: 'Julia Costa', avatar: '🦋', streak: 21, lastActivity: 'completou Ler há 2h' },
  { id: '4', name: 'Marcos Silva', avatar: '🐯', streak: 17, lastActivity: 'completou Meditar hoje' },
  { id: '5', name: 'Bia Santos', avatar: '🐸', streak: 14, lastActivity: 'completou Diário há 5h' },
  { id: '6', name: 'Rafa Mendes', avatar: '🦊', streak: 9, lastActivity: 'completou Yoga ontem' },
  { id: '7', name: 'Leo Pinto', avatar: '🐻', streak: 6, lastActivity: 'completou Água há 1h' },
]

export type MockBadge = {
  id: string
  emoji: string
  title: string
  description: string
  unlocked: boolean
}

export const MOCK_BADGES: MockBadge[] = [
  { id: 'first', emoji: '🌱', title: 'Primeiro passo', description: 'Criou o primeiro hábito', unlocked: true },
  { id: 'week', emoji: '🔥', title: 'Semana de fogo', description: '7 dias seguidos', unlocked: false },
  { id: 'checks50', emoji: '💯', title: '50 checks', description: 'Completou 50 vezes', unlocked: false },
  { id: 'month', emoji: '🏆', title: 'Mês perfeito', description: '30 dias seguidos', unlocked: false },
  { id: 'social', emoji: '👥', title: 'Conectado', description: 'Adicionou um amigo', unlocked: false },
  { id: 'early', emoji: '🌅', title: 'Madrugador', description: 'Check antes das 7h', unlocked: false },
]
