import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0e3b39',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4caf50',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    background: {
      default: '#ffffff',
      paper: '#EFF9F9',
    },
    divider: '#e0e0e0'
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 700,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: 'none'
        }
      }
    }
  },
});