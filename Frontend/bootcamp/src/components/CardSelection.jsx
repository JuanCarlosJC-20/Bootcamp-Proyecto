import React from 'react';
import Cards from './Cards';

const CardSelection = ({ 
  selectedCard, 
  selectedAttribute, 
  onAttributeClick, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div>
      <div className="text-lg mb-4 bg-purple-600 bg-opacity-80 px-3 py-2 rounded-lg shadow-lg">
        ¡Elige tu atributo y lanza la carta!
      </div>
      
      {selectedCard && (
        <div className="relative mb-4">
          <div className="relative transform rotate-12 hover:rotate-0 transition-transform duration-500 flex justify-center mb-4">
            <Cards 
              card={selectedCard} 
              size="large" 
              isSelected={true}
              onAttributeClick={onAttributeClick}
              selectedAttribute={selectedAttribute}
            />
          </div>
          
          <div className="text-center">
            <div className="text-lg mb-4 bg-purple-600 bg-opacity-80 px-3 py-2 rounded-lg shadow-lg text-white inline-block">
              Atributo seleccionado: <span className="font-bold text-yellow-300">{selectedAttribute}</span>
            </div>
            
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={onConfirm}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 border-2 border-green-700 shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 flex items-center gap-2 text-sm"
              >
                🚀 <span>Lanzar</span>
              </button>
              <button
                onClick={onCancel}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 border-2 border-red-700 shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 flex items-center gap-2 text-sm"
              >
                ❌ <span>Cancelar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSelection;
