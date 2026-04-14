import * as React from 'react';
import { type ThemeTokens, defaultTheme } from './tokens';
import { resolveTheme } from './resolver';

const ThemeContext = React.createContext<ThemeTokens>(defaultTheme);

export interface AdaptUIProviderProps {
  children: React.ReactNode;
  theme?: Partial<ThemeTokens>;
}

export function AdaptUIProvider({ children, theme: themeOverride }: AdaptUIProviderProps) {
  const [resolvedTheme, setResolvedTheme] = React.useState<ThemeTokens>(defaultTheme);

  React.useEffect(() => {
    const detected = resolveTheme();
    setResolvedTheme(detected);
  }, []);

  const theme = React.useMemo<ThemeTokens>(() => {
    if (!themeOverride) return resolvedTheme;

    return {
      colors: { ...resolvedTheme.colors, ...themeOverride.colors },
      radius: themeOverride.radius ?? resolvedTheme.radius,
    };
  }, [resolvedTheme, themeOverride]);

  const cssVars = React.useMemo(() => {
    const vars: Record<string, string> = {
      '--primary': theme.colors.primary,
      '--primary-foreground': theme.colors.primaryForeground,
      '--secondary': theme.colors.secondary,
      '--secondary-foreground': theme.colors.secondaryForeground,
      '--destructive': theme.colors.destructive,
      '--destructive-foreground': theme.colors.destructiveForeground,
      '--muted': theme.colors.muted,
      '--muted-foreground': theme.colors.mutedForeground,
      '--accent': theme.colors.accent,
      '--accent-foreground': theme.colors.accentForeground,
      '--border': theme.colors.border,
      '--input': theme.colors.input,
      '--ring': theme.colors.ring,
      '--background': theme.colors.background,
      '--foreground': theme.colors.foreground,
      '--radius': theme.radius,
    };
    return vars as React.CSSProperties;
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={cssVars}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeTokens {
  return React.useContext(ThemeContext);
}
