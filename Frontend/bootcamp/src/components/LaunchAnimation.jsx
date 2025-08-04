import React from 'react';
import Cards from './Cards';

const LaunchAnimation = ({ launchedCard }) => {
  return (
    <div className="card-container">
      <style>{`
        @keyframes cardThrow {
          0% {
            transform: translateY(200px) translateX(-100px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          30% {
            transform: translateY(-50px) translateX(-20px) rotate(45deg) scale(1.2);
            opacity: 1;
          }
          60% {
            transform: translateY(-20px) translateX(10px) rotate(65deg) scale(1.1);
            opacity: 1;
          }
          85% {
            transform: translateY(-5px) translateX(2px) rotate(72deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(75deg) scale(0.9);
            opacity: 0.9;
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 215, 0, 0.8), 0 0 90px rgba(255, 215, 0, 0.6);
          }
        }
        
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 215, 0, 0.6);
            transform: scale(1);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 215, 0, 0.8);
            transform: scale(1.05);
          }
        }
        
        .card-throw {
          animation: cardThrow 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          transform: translateY(0px) translateX(0px) rotate(75deg) scale(1);
        }
        
        .glow-effect {
          animation: glowPulse 2s ease-in-out infinite;
          border-radius: 12px;
          background: linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1));
          backdrop-filter: blur(8px);
        }
        
        .card-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 50;
        }
        
        .text-glow {
          animation: textGlow 1.5s ease-in-out infinite;
        }
      `}</style>
      
      <div className="card-throw">
        <div className="glow-effect p-2">
          <Cards card={launchedCard} size="medium" />
        </div>
      </div>
      
      <div className="text-center text-white text-2xl font-bold mt-8 text-glow">
        ¡CARTA LANZADA!
      </div>
    </div>
  );
};

export default LaunchAnimation;
