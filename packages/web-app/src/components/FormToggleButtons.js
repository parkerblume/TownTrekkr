import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import theme from './Theme';

const FormToggleButtons = ({ alignment, setAlignment }) => {
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="Login">Login</ToggleButton>
        <ToggleButton value="Register">Register</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
};

export default FormToggleButtons;

