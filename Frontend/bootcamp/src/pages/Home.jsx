import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import cartasImagen from '../assets/cartasImegen.png'
import musica from '../assets/clash1.mp3'

export const Home = () => {
  return (
    <div
      className='flex flex-col h-screen bg-cover bg-center'
      style={{
        backgroundImage: "url('https://wallpapers.com/images/hd/clash-royale-background-xlpgmv93cqdspkzu.jpg')"
      }}
    >
      {/* Música de fondo */}
      <audio src={musica} autoPlay loop />

      <Link to="/Cards">
        <div className="cursor-pointer rounded-r-2xl w-50 h-16 bg-[#2C8246] text-white text-3xl shadow-lg font-bold flex items-center hover:bg-[#115826] transition-colors duration-300 mt-10 mb-0 px-6 gap-4">
          <img src={cartasImagen} alt="Carta" className="w-14 h-auto -ml-4" />
          <span>Cartas</span>
        </div>
      </Link>

      <div className='items-center flex flex-col gap-10 mt-20'>
        <div className='rounded-full w-60 h-60 bg-[#060E42] shadow-lg shadow-blue-700/40 justify-center items-center flex flex-col'>
          <div className='w-60 h-45'>
            <img src={logo} alt="Descripción" className="w-auto h-auto object-contain" />
          </div>
        </div>

        <Link to="/Room">
          <div className="cursor-pointer rounded-2xl w-50 h-15 bg-[#1C16D2] text-white text-2xl shadow-lg font-bold flex items-center justify-center hover:bg-[#0F0C62] transition-colors duration-300">
            Crear Sala
          </div>
        </Link>
      </div>
    </div>
  )
}
