export interface ThemeTokens {
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    destructive: string;
    destructiveForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    input: string;
    ring: string;
    background: string;
    foreground: string;
  };
  radius: string;
}

export const defaultTheme: ThemeTokens = {
  colors: {
    primary: '221.2 83.2% 53.3%',           // Blue 600
    primaryForeground: '210 40% 98%',
    secondary: '24.6 95% 53.1%',             // Orange 500
    secondaryForeground: '210 40% 98%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 40% 98%',
    muted: '210 40% 96.1%',
    mutedForeground: '215.4 16.3% 46.9%',
    accent: '210 40% 96.1%',
    accentForeground: '222.2 47.4% 11.2%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '221.2 83.2% 53.3%',
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
  },
  radius: '0.5rem',
};
