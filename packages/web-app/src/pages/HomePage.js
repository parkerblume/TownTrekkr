import React from 'react';
import Leaflet from '../components/leaflet';
import ImageDisplay from '../components/ImageDisplay';
import NavigationBar from '../components/NavigationBar';
import { colors } from '../styles/commonStyles';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: colors.background }}>
      <NavigationBar /> {}
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '50%', height: '100%' }}>
          <ImageDisplay />
        </div>
        <div style={{ width: '50%', height: '100%' }}>
          <Leaflet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
