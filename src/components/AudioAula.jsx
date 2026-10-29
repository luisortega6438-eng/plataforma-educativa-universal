import React, { useState } from 'react';

export default function AudioAula() {
  const [velocidad, setVelocidad] = useState(1.0);
  const [reproduciendo, setReproduciendo] = useState(false);

  const cambiarVelocidad = (e) => {
    setVelocidad(parseFloat(e.target.value));
  };

  return (
    <div style={{ border: '2px solid #28a745', padding: '20px', borderRadius: '8px', margin: '15px 0', backgroundColor: '#f4fbf7' }}>
      <h3>🎙️ PEU-7: Audio-Aula / Podcast Educativo (Sprint 3)</h3>
      <p><strong>Lección 01: Introducción a la Biodiversidad en México</strong></p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <button
          onClick={() => setReproduciendo(!reproduciendo)}
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {reproduciendo ? '⏸️ Pausar Audio' : '▶️ Reproducir Audio'}
        </button>

        <label htmlFor="select-velocidad">
          <strong>Velocidad de reproducción: </strong>
          <select id="select-velocidad" value={velocidad} onChange={cambiarVelocidad} style={{ padding: '5px', borderRadius: '4px' }}>
            <option value={0.5}>0.5x (Lento)</option>
            <option value={1.0}>1.0x (Normal)</option>
            <option value={1.5}>1.5x (Rápido)</option>
            <option value={2.0}>2.0x (Muy Rápido)</option>
          </select>
        </label>

        <a
          href="#descargar-audio"
          onClick={(e) => { e.preventDefault(); alert("Descargando archivo mp3 comprimido para escucha offline (< 5MB)..."); }}
          style={{ padding: '8px 12px', backgroundColor: '#17a2b8', color: 'white', borderRadius: '5px', textDecoration: 'none' }}
        >
          ⬇️ Descargar MP3 (Offline)
        </a>
      </div>

      <div style={{ fontSize: '0.9rem', color: '#555' }}>
        Estado: <em>{reproduciendo ? `Reproduciendo a velocidad ${velocidad}x...` : 'En espera'}</em>
      </div>
    </div>
  );
}
