# CLAUDE.md — Streak

Pointer operacional para Claude Code trabalhando neste repositório.

## Contexto do projeto

App de hábitos chamado **Streak** 🔥, construído com Expo + React Native + TypeScript.
Pedro tem experiência sólida em React/web mas está aprendendo React Native.
O objetivo é aprender RN construindo um produto real, fase a fase, seguindo o cronograma de um curso.

**Repositório GitHub:** https://github.com/pedrosouza423/streak

## Trilha de aprendizado (issues no GitHub)

| Issue | Fase | Status |
|-------|------|--------|
| #1 | Fase 0 — Setup & Hello Mobile | Em andamento |
| #2 | Fase 1 — Fundamentos: v1 mínimo (criar/listar/marcar/salvar) | Pendente |
| #3 | Fase 2 — Navegação com Expo Router | Pendente |
| #4 | Fase 3 — Banco local: expo-sqlite + streaks | Pendente |
| #5 | Fase 4 — Estado global + API | Pendente |
| #6 | Fase 5 — Notificações + Deep Linking | Pendente |
| #7 | Fase 6 — Animações com Reanimated | Pendente |

Ao iniciar uma sessão: **verificar qual issue está aberta** e continuar dali.
Cada PR deve incluir `Closes #N` no body para fechar a issue automaticamente ao mergear.

## Stack (introduzida progressivamente)

| Camada | Ferramenta | Fase |
|--------|-----------|------|
| Base | Expo (managed) + TypeScript | 0–1 |
| Navegação | Expo Router (file-based) | 2 |
| Banco local | AsyncStorage → expo-sqlite | 1 → 3 |
| Estado global | Context API (+ React Query) | 4 |
| Notificações | expo-notifications | 5 |
| Animações | react-native-reanimated + gesture-handler | 6 |
| Estilo | StyleSheet primeiro (avaliar NativeWind depois) | 1+ |

## Comandos

```bash
npx expo start        # inicia o Metro — tecla 'a' para emulador Android, QR para Expo Go
npm run reset-project # limpa o template padrão (já foi usado na Fase 0)
```

## Ambiente de teste

- **Expo Go** no celular (loop rápido do dia a dia)
- **Emulador Android** via Android Studio (reserva no PC)
- Windows 11 — sem simulador iOS

## Estrutura do projeto (meta — construída ao longo das fases)

```
src/
  app/                  # rotas Expo Router
    _layout.tsx
    index.tsx           # lista de hábitos (home)
    new.tsx             # criar hábito
    habit/[id].tsx      # detalhe do hábito
  components/           # HabitCard, EmptyState, etc.
  lib/
    storage.ts          # AsyncStorage (Fase 1) → db.ts SQLite (Fase 3)
    habits.ts           # tipos + regras de streak
  constants/            # cores, espaçamentos
```

## Git workflow

- `main` é protegida — nunca push direto
- Branch por fase: `feat/fase-1-fundamentos`, `feat/fase-2-navegacao`, etc.
- Commits atômicos: `tipo(escopo): descrição`
- PR com `Closes #N` para fechar a issue da fase

## Como ensinar (instruções para o Claude)

- Ligar sempre o conceito ao código real do Streak (nunca teoria solta)
- Comparar com o equivalente web que Pedro já conhece (ex: `View` = `div`, `FlatList` = lista virtualizada)
- Ao fim de cada feature, fazer um "check" rápido (estilo quiz) para fixar
- Validar versões/APIs via Context7 antes de codar — Expo muda por SDK
