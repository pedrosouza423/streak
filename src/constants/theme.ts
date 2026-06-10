import '@/global.css';

export const palette = {
  bg: '#0a0a0f',
  surface: '#16161f',
  surfaceRaised: '#1f1f2e',
  border: '#2a2a3a',
  text: '#ffffff',
  textMuted: '#9ca3af',
  textFaint: '#5b5b6e',
  success: '#34d399',
  danger: '#f43f5e',
} as const;

export const habitColors = [
  '#ff6b1a',
  '#ff2e7e',
  '#a855f7',
  '#22d3ee',
  '#a3e635',
  '#fbbf24',
  '#3b82f6',
  '#34d399',
] as const;

export const gradients = {
  fire: ['#ffb02e', '#ff6b1a', '#ff2e7e'] as string[],
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 40,
} as const;

export const fonts = {
  bold: 'Nunito_700Bold',
  extraBold: 'Nunito_800ExtraBold',
  black: 'Nunito_900Black',
} as const;

export const typeScale = {
  display: 34,
  title: 24,
  heading: 18,
  body: 15,
  caption: 12,
} as const;

export function glow(color: string) {
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  };
}
