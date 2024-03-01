import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './App.css';

function App() {
  return (
	  <div className="w-screen h-screen bg-webBackground">
	    <header className="w-full py-3 p-2 h-14 bg-webTertiary">
			<h1 className="text-4xl font-bold text-webPrimary">Town Trekker</h1>
	    </header>
	    <header className="w-full p-2 pl-7 h-12 bg-webSecondary">
		    <h2 className="text-2xl font-bold text-webTertiary">idk what to put here</h2>
	    </header>
    <div className="flex flex-col items-center justify-start m-12 pt-2 pb-52 pl-52 pr-52 bg-webTertiary rounded-3xl opacity-75">
        <div className="mt-2">
				  <ButtonGroup variant="contained" aria-label="Basic button group">
					  <Button>Login</Button>
					  <Button>Register</Button>
				  </ButtonGroup>
			  </div>
		  </div>
	  </div>
  );
}

export default App;
