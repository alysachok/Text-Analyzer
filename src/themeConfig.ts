import { createTheme } from '@mui/material';

type Mode = 'light' | 'dark';

// Function to define light and dark theme tokens
export const getDesignTokens = (mode: Mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#3e5c76' },
          secondary: { main: '#748cab' },
          background: { default: '#f0ebd8', paper: '#ffffff' },
          text: { primary: '#1d2d44', secondary: '#3e5c76' },
        }
      : {
          primary: { main: '#748cab' },
          secondary: { main: '#3e5c76' },
          background: { default: '#1d2d44', paper: '#2a3e55' },
          text: { primary: '#f0ebd8', secondary: '#c4d7e0' },
        }),
  },
});

export const createCustomTheme = (mode: Mode) => createTheme(getDesignTokens(mode));
