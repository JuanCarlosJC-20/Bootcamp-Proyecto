import React from 'react';
import Cards from './Cards';

const LaunchAnimation = ({ launchedCard }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="animate-[cardThrow_1.2s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards]">
        <div className="inline-flex rounded-xl bg-gradient-to-br from-yellow-300/40 to-orange-200/30 shadow-lg p-0.5">
          <Cards card={launchedCard} size="large" />
        </div>
      </div>
      <div className="mt-4 text-center text-white text-2xl font-bold animate-pulse drop-shadow-lg">
        ¡CARTA LANZADA!
      </div>
      <style>{`
        @keyframes cardThrow {
          0% {
            transform: translateY(200px) translateX(-100px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          30% {
            transform: translateY(-50px) translateX(-20px) rotate(45deg) scale(1.1);
            opacity: 1;
          }
          60% {
            transform: translateY(-20px) translateX(10px) rotate(65deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(15deg) scale(0.6);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LaunchAnimation;
