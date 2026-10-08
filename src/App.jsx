import React, { useState } from 'react';
import './App.css';

// Datos del Product Backlog (US-01, US-02, US-05)
const articlesData = [
  {
    id: 1,
    title: "Los Colores y las Formas",
    category: "infantil",
    categoryLabel: "Infantil",
    description: "Aprende los colores primarios y las figuras geométricas básicas con ejemplos sencillos.",
    pdfName: "Ficha_Colores_Infantil.pdf",
    pdfSize: "1.1 MB"
  },
  {
    id: 2,
    title: "Introducción a la Suma y Resta",
    category: "primaria",
    categoryLabel: "Primaria",
    description: "Guía paso a paso para resolver operaciones matemáticas fundamentales.",
    pdfName: "Guia_Matematicas_Primaria.pdf",
    pdfSize: "1.8 MB"
  },
  {
    id: 3,
    title: "Ecosistemas y Medio Ambiente",
    category: "secundaria",
    categoryLabel: "Secundaria",
    description: "Análisis del equilibrio ecológico, cadenas alimenticias y conservación ambiental.",
    pdfName: "Resumen_Ecosistemas.pdf",
    pdfSize: "1.5 MB"
  },
  {
    id: 4,
    title: "Educación Financiera Básica",
    category: "adultos",
    categoryLabel: "Adultos",
    description: "Conceptos sobre presupuesto familiar, ahorro y gestión de crédito personal.",
    pdfName: "Manual_Finanzas_Personales.pdf",
    pdfSize: "1.9 MB"
  }
];

export default function App() {
  // Manejo de Estados de React (Hooks)
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // US-01: Funciones para ajustar tamaño de fuente
  const adjustFontSize = (delta) => {
    setFontSize((prev) => Math.min(Math.max(prev + delta, 12), 24));
  };

  const resetFontSize = () => setFontSize(16);

  // US-01: Alternar Alto Contraste
  const toggleHighContrast = () => setHighContrast(!highContrast);

  // US-02: Simulación de descarga de PDF
  const simularDescarga = (fileName) => {
    alert(`[US-02 Demostración]: Iniciando descarga del archivo de lectura accesible: "${fileName}" (Comprimido a menos de 2MB).`);
  };

  // US-05: Filtrado dinámico por nivel educativo
  const filteredArticles = selectedCategory === 'todos'
    ? articlesData
    : articlesData.filter(art => art.category === selectedCategory);

  return (
    <div className={`main-wrapper ${highContrast ? 'high-contrast' : ''}`} style={{ fontSize: `${fontSize}px` }}>
      <header>
        <h1>Plataforma Educativa Universal</h1>
        <p>Prototipo Funcional - Incremento Sprint 1 (MVP desarrollado en React)</p>
      </header>

      {/* US-01: BARRA DE ACCESIBILIDAD */}
      <section className="accessibility-bar" aria-label="Herramientas de accesibilidad">
        <strong>Opciones de Accesibilidad (US-01):</strong>
        <button onClick={() => adjustFontSize(2)} aria-label="Aumentar tamaño de letra">A+</button>
        <button onClick={() => adjustFontSize(-2)} aria-label="Disminuir tamaño de letra">A-</button>
        <button onClick={resetFontSize} aria-label="Restablecer tamaño de letra">A (Normal)</button>
        <button onClick={toggleHighContrast} aria-label="Alternar alto contraste">
          {highContrast ? 'Modo Normal' : 'Modo Alto Contraste'}
        </button>
      </section>

      {/* US-05: FILTRO DE CONTENIDO POR EDAD */}
      <section className="filter-section" aria-label="Filtro de recursos">
        <label htmlFor="age-filter"><strong>Filtrar por nivel educativo (US-05):</strong></label>
        <select 
          id="age-filter" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="todos">Mostrar Todos</option>
          <option value="infantil">Infantil</option>
          <option value="primaria">Primaria</option>
          <option value="secundaria">Secundaria</option>
          <option value="adultos">Adultos</option>
        </select>
      </section>

      {/* ÁREA DE CONTENIDOS EDUCATIVOS */}
      <main>
        <div className="content-grid">
          {filteredArticles.length === 0 ? (
            <p>No se encontraron recursos para este nivel.</p>
          ) : (
            filteredArticles.map((art) => (
              <article key={art.id} className="card">
                <span className="badge">{art.categoryLabel}</span>
                <h2>{art.title}</h2>
                <p>{art.description}</p>
                <button 
                  className="btn-download" 
                  onClick={() => simularDescarga(art.pdfName)}
                  aria-label={`Descargar PDF ${art.title}`}
                >
                  📄 Descargar PDF <span className="pdf-size">({art.pdfSize})</span>
                </button>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
