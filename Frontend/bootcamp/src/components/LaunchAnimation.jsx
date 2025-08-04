import React from 'react';
import Cards from './Cards';

const LaunchAnimation = ({ launchedCard }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="animate-bounce">
        <div className="animate-pulse bg-yellow-400 rounded-full p-4 shadow-2xl">
          <Cards card={launchedCard} size="large" className="animate-spin" />
        </div>
      </div>
      <div className="text-center text-white text-2xl font-bold mt-4 animate-pulse">
        ¡CARTA LANZADA!
      </div>
    </div>
  );
};

export default LaunchAnimation;
