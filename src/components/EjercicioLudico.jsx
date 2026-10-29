import React, { useState } from 'react';

export default function EjercicioLudico() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [mensajeFeedback, setMensajeFeedback] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);

  const pregunta = {
    titulo: "Ejercicio Interactivo: Clasificación de Recursos",
    instruccion: "Selecciona o arrastra la palabra hacia la categoría correcta:",
    concepto: "Fotosíntesis",
    opciones: ["Matemáticas", "Ciencias Naturales", "Historia"]
  };

  const responder = (opcion) => {
    setOpcionSeleccionada(opcion);
    if (opcion === "Ciencias Naturales") {
      setMensajeFeedback("¡Correcto! La fotosíntesis pertenece a Ciencias Naturales. ¡Has ganado una medalla de progreso!");
      setPuntuacion(100);
    } else {
      setMensajeFeedback("Inténtalo de nuevo. Piensa en qué materia estudias las plantas.");
    }
  };

  return (
    <div style={{ border: '2px solid #0056b3', padding: '20px', borderRadius: '8px', margin: '15px 0', backgroundColor: '#f8f9fa' }}>
      <h3>🎮 PEU-6: Ejercicio Lúdico (Sprint 3)</h3>
      <p><strong>{pregunta.instruccion}</strong></p>
      
      <div style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#333' }}>
        Elemento a clasificar: <span style={{ backgroundColor: '#e2e3e5', padding: '5px 10px', borderRadius: '4px' }}>🌿 {pregunta.concepto}</span>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {pregunta.opciones.map((opcion, index) => (
          <button
            key={index}
            onClick={() => responder(opcion)}
            aria-label={`Clasificar en categoría ${opcion}`}
            style={{
              padding: '10px 15px',
              cursor: 'pointer',
              backgroundColor: opcionSeleccionada === opcion ? '#0056b3' : '#ffffff',
              color: opcionSeleccionada === opcion ? '#ffffff' : '#000000',
              border: '1px solid #0056b3',
              borderRadius: '5px'
            }}
          >
            {opcion}
          </button>
        ))}
      </div>

      {/* Retroalimentación en tiempo real para lectores de pantalla */}
      <div aria-live="polite" style={{ marginTop: '15px', fontWeight: 'bold', color: puntuacion > 0 ? '#28a745' : '#dc3545' }}>
        {mensajeFeedback}
      </div>
      {puntuacion > 0 && <p style={{ fontSize: '1.1rem' }}>🏅 Medalla obtenida: <strong>Explorador de la Ciencia</strong></p>}
    </div>
  );
}
