import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartasImagen from '../assets/cartasImegen.png'
import flecha from '../assets/flecha.svg'
import CardGrid from '../components/CardGrid'

export const CardsPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col h-screen'>
      <div className="gap-4 flex flex-col items-start p-4">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer py-2 bg-[#980E0E] rounded-r-2xl hover:bg-[#7A0B0B] transition w-25 flex items-center justify-center"
        >
          <img src={flecha} alt="Flecha" className="w-20 h-auto mr-2" />
        </button>

        <Link to="/Cards">
          <div className="cursor-pointer rounded-r-2xl w-50 h-16 bg-[#2C8246] text-white text-3xl shadow-lg font-bold flex items-center hover:bg-[#115826] transition-colors duration-300 px-6 gap-4">
            <img src={cartasImagen} alt="Carta" className="w-14 h-auto -ml-4" />
            <span>Añadir</span>
          </div>
        </Link>
      </div>

      <div className='items-center flex flex-col gap-10 p-4'>
        <p className='text-white text-5xl font-bold' style={{
          textShadow: `
            -2px -2px 0 #980E0E,
            2px -2px 0 #980E0E,
            -2px 2px 0 #980E0E,
            2px 2px 0 #980E0E
          `
        }}>
          Cartas
        </p>

        <div className='bg-[#B5B5B5] rounded-3xl shadow-lg shadow-blue-700/40 w-full max-w-6xl p-6'>
          <CardGrid />
        </div>
      </div>
    </div>
  );
};
