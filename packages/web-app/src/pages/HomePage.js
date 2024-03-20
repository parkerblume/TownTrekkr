import React from 'react';
import Leaflet from '../components/leaflet';
import ImageDisplay from '../components/ImageDisplay';
import NavigationBar from '../components/NavigationBar';
import { colors } from '../styles/commonStyles';


const HomePage = () => {
  return (
	  <div className="flex flex-col min-h-screen w-screen bg-webPrimary">
		  <NavigationBar/>
		  <div className="flex flex-col flex-grow">
			  <div className="flex flex-row justify-center flex-grow">
				  <div className="w-1/2 flex flex-col">
					  <ImageDisplay/>
				  </div>
				  <div className="w-1/2 flex flex-col rounded-4xl pt-4 flex-grow">
					  <Leaflet/>
				  </div>
			  </div>
		  </div>
	  </div>


  );
};

export default HomePage;
