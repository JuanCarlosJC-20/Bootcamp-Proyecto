import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import music from '../assets/loading.mp3'
import { useNavigate } from 'react-router-dom';

export const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/Home');
    }, 5000); // 5000 ms = 5 segundos

    return () => clearTimeout(timeout);
  }, [navigate]);


  return (
    <div className="h-screen w-full flex items-center justify-center ">
      {/* Audio de fondo */}
      <audio src={music} autoPlay loop />
      
      <DotLottieReact
        src="https://lottie.host/e04009e1-972a-47a9-b6e9-e31e2298c718/uYdLIN8RUz.lottie"
        loop={true} 
        autoplay
        style={{ width: 350, height: 350 }}
      />
    </div>
  );
};

