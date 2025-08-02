import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
export const StartPage = () => {
  return (
    <div className='items-center text-center justify-center flex flex-col h-screen'>
      <div className='rounded-4xl w-80 h-90 bg-[#0F0C62] shadow-lg shadow-blue-700/40 justify-center items-center flex flex-col'>
        <div className=' w-50 h-45'>
          <img src={logo} alt="Descripción" className="w-auto h-auto object-contain" />
        </div>
        <Link to="/Loading">
          <div className=' cursor-pointer rounded-lg w-50 h-10 bg-[#2C8246] text-white text-2xl shadow-lg font-bold text-center justify-center flex items-center'>
            Iniciar
          </div>
        </Link>

      </div>
    </div>
  )
}


