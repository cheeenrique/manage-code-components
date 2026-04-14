import { type ThemeTokens, defaultTheme } from './tokens';

const CSS_VAR_MAP: Record<keyof ThemeTokens['colors'], string> = {
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  destructive: '--destructive',
  destructiveForeground: '--destructive-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  accent: '--accent',
  accentForeground: '--accent-foreground',
  border: '--border',
  input: '--input',
  ring: '--ring',
  background: '--background',
  foreground: '--foreground',
};

export function resolveTheme(): ThemeTokens {
  if (typeof document === 'undefined') {
    return defaultTheme;
  }

  const root = document.documentElement;
  const style = getComputedStyle(root);

  const primary = style.getPropertyValue('--primary').trim();
  if (!primary) {
    return defaultTheme;
  }

  const colors = { ...defaultTheme.colors };

  for (const [key, cssVar] of Object.entries(CSS_VAR_MAP)) {
    const value = style.getPropertyValue(cssVar).trim();
    if (value) {
      colors[key as keyof ThemeTokens['colors']] = value;
    }
  }

  const radius = style.getPropertyValue('--radius').trim() || defaultTheme.radius;

  return { colors, radius };
}
