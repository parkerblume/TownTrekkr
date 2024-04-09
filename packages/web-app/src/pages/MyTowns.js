import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import NavigationBar from '../components/NavigationBar';
import TownsList from '../components/TownsList';
import AvailableTownsList from '../components/AvailableTownsList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ABC4AB',
      contrastText: '#DCC9B6',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '90px',
          textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        },
      },
    },
  },
});

const MyTowns = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/CreateTownPage');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex min-h-screen flex-col bg-custom-bg">
        <NavigationBar />
        <div className="flex flex-grow items-center justify-center">
          <div className="grid grid-cols-3 gap-4 w-full justify-items-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigate}
              sx={{
                height: '60vh',
                width: '30vw',
                backgroundImage: 'url(/images/town2.jpg)',
                backgroundSize: 'cover',
                boxShadow: '5px 5px 15px rgba(0,0,0,0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Create Town
            </Button>
            <div className="flex-1">
              <TownsList />
            </div>
            <div className="flex-1">
              <AvailableTownsList />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MyTowns;
