import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
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
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	const handleLogout = () => {
		localStorage.removeItem('user'); // Remove the user from localStorage
		navigate('/'); // Redirect user to login page
	};

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
	    <nav className="flex flex-row items-center justify-between w-full h-10vh bg-webAccent text-webSecondary">
		    <button onClick={handleLogout} className="p-2 m-4 shadow-xl bg-webSecondary text-2xl text-white font-bold border-white border-4 rounded-2xl hover:bg-webBackground hover:text-webTertiary transition duration-300">Logout</button>
		    <h1 className="text-5xl p-4 font-londrina-solid pr-4">Town Trekkr</h1>
	    </nav>
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
              onClick={() => handleNavigate('/GamePage')}
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
