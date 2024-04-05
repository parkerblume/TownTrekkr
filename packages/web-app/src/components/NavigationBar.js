import React from 'react';
import { colors } from '../styles/commonStyles';

const NavigationBar = () => {
  return (
    <nav style={{ backgroundColor: colors.olive, color: colors.buttonPrimary, width: '100%', height: '10vh',
      padding: '10px 0', textAlign: 'center', fontSize: '60px'}}>
      <h1>Town Trekkr</h1>
    </nav>
  );
};

export default NavigationBar;
