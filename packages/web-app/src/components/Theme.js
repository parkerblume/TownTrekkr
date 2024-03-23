import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    selectForm: {
      main: '#ABC4AB',
      light: '#d2f3d2',
      dark: '#969c8c',
      contrastText: '#242105',
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#ABC4AB',
          color: '#242105',
          opacity: 1.0,
          borderRadius: '20px',
          border: '3px solid #abc4ab',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#969c8c',
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: '#abc4ab',
            shadow: '0px 0px 10px 5px #abc4ab',
            color: '#D9DFD6',
            opacity: 1.0,
          },
        },
      },
    },
  },
});

export default theme;
