import React, { useState } from 'react';

const AddCard = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    image: '',
    health: '',
    letterLevel: '',
    damage: '',
    endurance: '',
    power: '',
    scope: ''
  });

  const [error, setError] = useState('');

  // Labels descriptivos para cada campo
  const fieldLabels = {
    name: 'Ingresa el nombre de la carta',
    image: 'Ingresa la URL de la imagen',
    health: 'Ingresa la cantidad de salud',
    letterLevel: 'Ingresa el nivel de la carta',
    damage: 'Ingresa el daño de la carta',
    endurance: 'Ingresa la resistencia',
    power: 'Ingresa el poder de la carta',
    scope: 'Ingresa el alcance'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isInteger = (val) => /^\d+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // limpia errores previos

    const requiredFields = ['name', 'image', 'health', 'letterLevel', 'damage', 'endurance', 'power', 'scope'];
    for (let key of requiredFields) {
      if (!form[key]) {
        setError('Todos los campos son obligatorios.');
        return;
      }
    }

    const intFields = ['health', 'letterLevel', 'damage', 'endurance', 'power', 'scope'];
    for (let key of intFields) {
      if (!isInteger(form[key])) {
        setError(`El campo ${key} debe ser un número entero.`);
        return;
      }
    }

    try {
      //const res = await fetch('http://localhost:5084/api/Cards', {
       const res = await fetch('https://localhost:7221/api/Cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: 0 }),
      });

      const json = await res.json();

      if (!res.ok) {
        // Si hay errores de unicidad, los muestra como lista
        if (json.errores && Array.isArray(json.errores)) {
          setError(json.errores.join(' • '));
        } else if (json.mensaje) {
          setError(json.mensaje);
        } else {
          setError('Error al enviar la carta.');
        }
        return;
      }

      // Si todo fue bien
      onClose(); // cerrar modal
    } catch {
      setError('Error de red o del servidor.');
    }
  };


  return (
    <div className="fixed inset-0   bg-opacity-25 backdrop-blur-sm  flex justify-center items-center z-50 overflow-auto">
      <div className="relative bg-gradient-to-b from-[#0F0C62] to-[#1E18C8] p-8 rounded-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto text-white shadow-2xl border border-blue-300/30">

        {/* Título */}
        <h2 className="text-3xl font-extrabold text-center mb-8 text-white drop-shadow-lg">
          Crear Nueva Carta
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-white font-semibold text-sm uppercase tracking-wide">
                {fieldLabels[key]}
              </label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={`Escribe aquí el ${key.toLowerCase()}...`}
                className="p-3 rounded-lg bg-white text-gray-800 font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm"
              />
            </div>
          ))}
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mt-2 whitespace-pre-line">
              {error}
            </div>
          )}

          {/* Botones en una fila */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-700 hover:bg-red-800 text-white font-bold py-3 text-lg rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#26A783] hover:bg-[#1D7F67] text-white font-bold py-3 text-lg rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
