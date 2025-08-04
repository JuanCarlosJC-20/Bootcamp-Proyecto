import React from 'react';

const ExitModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#060E42] to-[#475BDF] rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            ¿Salir de la Partida?
          </h2>
          <p className="text-gray-200 mb-6 text-lg">
            Si sales ahora, perderás todo el progreso de esta partida. 
            ¿Estás seguro de que quieres continuar?
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={onCancel}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Cancelar</span>
            </button>
            <button
              onClick={onConfirm}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
