import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import NavigationBar from '../components/NavigationBar';
import EmailVerificationPopup from '../components/EmailVerificationPopup';

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

function HomePage() {
  const navigate = useNavigate();
  //const user = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === user.email && storedUser.verified !== user.verified) {
      setUser(storedUser);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col bg-custom-bg">
      <NavigationBar />
      <div className="flex flex-grow items-center justify-center">
        <ThemeProvider theme={theme}>
          <div className="grid grid-cols-2 gap-4 w-full justify-items-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNavigate('/MyTowns')}
              sx={{
                height: '60vh',
                width: '35vw',
                backgroundImage: 'url(/images/town.jpg)',
                backgroundSize: 'cover',
                boxShadow: '5px 5px 15px rgba(0,0,0,0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Towns
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNavigate('/GuessPage')}
              sx={{
                height: '60vh',
                width: '35vw',
                backgroundImage: 'url(/images/map.jpg)',
                backgroundSize: 'cover',
                boxShadow: '5px 5px 15px rgba(0,0,0,0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Play
            </Button>
          </div>
        </ThemeProvider>
      </div>
      {user && !user.verified && (
        <EmailVerificationPopup 
          user={user} 
          onClose={() => {
            const updatedUser = { ...user, verified: true };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            setUser(updatedUser);
            
            console.log(localStorage.getItem('user'));
          }} 
        />
      )}
    </div>
  );
}

export default HomePage;
