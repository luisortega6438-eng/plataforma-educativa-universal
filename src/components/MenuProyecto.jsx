import React, { useState, useRef, useEffect } from 'react';
import './MenuProyecto.css';

// Configura aquí tus enlaces oficiales
const CONFIG_ENLACES = {
  // Sustituye por el enlace a tu carpeta de Google Drive con los PDFs de las Unidades 1 a 4
  // o deja la ruta a una carpeta /docs dentro de tu repositorio
  actividadesCurso: 'https://drive.google.com/drive/folders/TU_ID_DE_CARPETA_AQUI',
  
  // Enlace al repositorio o sistema desplegado
  sistemaImplementado: 'https://github.com/luisortega6438-eng/plataforma-educativa-universal',
  
  // Descarga directa automática del código fuente comprimido (.zip) desde tu rama main de GitHub
  codigoComprimidoZip: 'https://github.com/luisortega6438-eng/plataforma-educativa-universal/archive/refs/heads/main.zip',
  
  // Documentación de gestión (Product Backlog & Schedule)
  documentacionScrum: 'https://docs.google.com/document/d/1xNrcUrBVYmoKM8r0bpWhXNttZLLkUD00N89e6GwvJY4/edit?usp=sharing'
};

const MODIFICACIONES_REALIZADAS = [
  {
    modulo: 'Interfaz Responsiva (App.jsx / CSS)',
    sugerencia: 'Evitar desbordamiento horizontal al escalar tipografía en pantallas pequeñas.',
    modificacion: 'Consolidación de variables CSS con unidades relativas (rem/em) vinculadas al estado global useState.',
    verificacion: 'Validado desde 320px sin corte de texto.'
  },
  {
    modulo: 'Evaluaciones (Cuestionario.jsx)',
    sugerencia: 'Prevenir trampas de foco al abrir y cerrar ventanas modales con teclado.',
    modificacion: 'Refinamiento del Hook useRef para retornar el enfoque al botón disparador al cerrar el modal.',
    verificacion: 'Navegación Tab / Esc conforme a WCAG 2.1 AA.'
  },
  {
    modulo: 'Gamificación (EjercicioLudico.jsx)',
    sugerencia: 'Garantizar retroalimentación auditiva clara en movimientos por teclado.',
    modificacion: 'Ajuste de atributos aria-live="polite" y etiquetas descriptivas en zonas de destino.',
    verificacion: 'Probado con lectura secuencial de teclado (flechas + espacio).'
  },
  {
    modulo: 'Documentación y Cierre (PEU-8 / README.md)',
    sugerencia: 'Alinear la descripción pública del repositorio con el cierre del Sprint 3 y revisión U4.',
    modificacion: 'Actualización de arquitectura, guía de ejecución en React y registro de cumplimiento WCAG v1.1.',
    verificacion: 'Publicado y verificado en rama main de GitHub.'
  }
];

export default function MenuProyecto() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modalReporteAbierto, setModalReporteAbierto] = useState(false);

  const botonMenuRef = useRef(null);
  const contenedorMenuRef = useRef(null);
  const botonCerrarModalRef = useRef(null);

  // Cerrar el menú desplegable al hacer clic fuera o presionar Escape
  useEffect(() => {
    const manejarClickFuera = (evento) => {
      if (contenedorMenuRef.current && !contenedorMenuRef.current.contains(evento.target)) {
        setMenuAbierto(false);
      }
    };

    const manejarTeclaEscape = (evento) => {
      if (evento.key === 'Escape') {
        if (modalReporteAbierto) {
          setModalReporteAbierto(false);
          setTimeout(() => botonMenuRef.current?.focus(), 0);
        } else if (menuAbierto) {
          setMenuAbierto(false);
          botonMenuRef.current?.focus();
        }
      }
    };

    document.addEventListener('mousedown', manejarClickFuera);
    document.addEventListener('keydown', manejarTeclaEscape);
    return () => {
      document.removeEventListener('mousedown', manejarClickFuera);
      document.removeEventListener('keydown', manejarTeclaEscape);
    };
  }, [menuAbierto, modalReporteAbierto]);

  // Mover el foco automáticamente al botón de cerrar cuando se abre el modal de reporte
  useEffect(() => {
    if (modalReporteAbierto) {
      botonCerrarModalRef.current?.focus();
    }
  }, [modalReporteAbierto]);

  const abrirModalReporte = () => {
    setMenuAbierto(false);
    setModalReporteAbierto(true);
  };

  const cerrarModalReporte = () => {
    setModalReporteAbierto(false);
    setTimeout(() => botonMenuRef.current?.focus(), 0);
  };

  return (
    <div className="menu-proyecto-contenedor" ref={contenedorMenuRef}>
      {/* Botón principal requerido por la rúbrica */}
      <button
        ref={botonMenuRef}
        type="button"
        className="btn-menu-proyecto"
        aria-expanded={menuAbierto}
        aria-haspopup="true"
        aria-controls="lista-menu-proyecto"
        onClick={() => setMenuAbierto((prev) => !prev)}
      >
        <span aria-hidden="true">☰</span> Menú del Proyecto
      </button>

      {/* Lista desplegable con los 4 elementos solicitados */}
      {menuAbierto && (
        <ul
          id="lista-menu-proyecto"
          className="dropdown-menu-proyecto"
          role="menu"
          aria-label="Entregables de Proyecto II - UDGVirtual"
        >
          <li role="none">
            <a
              role="menuitem"
              href={CONFIG_ENLACES.actividadesCurso}
              target="_blank"
              rel="noopener noreferrer"
              className="item-menu-proyecto"
              onClick={() => setMenuAbierto(false)}
            >
              <strong>1. Actividades realizadas en el curso</strong>
              <span>Portafolio de entregas (Unidades 1 a 4)</span>
            </a>
          </li>

          <li role="none">
            <a
              role="menuitem"
              href="#main-content"
              className="item-menu-proyecto"
              onClick={() => setMenuAbierto(false)}
            >
              <strong>2. Sistema implementado</strong>
              <span>Plataforma Educativa Universal (En ejecución)</span>
            </a>
          </li>

          <li role="none">
            <a
              role="menuitem"
              href={CONFIG_ENLACES.codigoComprimidoZip}
              download="plataforma-educativa-universal.zip"
              className="item-menu-proyecto"
              onClick={() => setMenuAbierto(false)}
            >
              <strong>3. Código fuente (comprimido)</strong>
              <span>Descargar paquete completo (.ZIP)</span>
            </a>
          </li>

          <li role="none">
            <button
              role="menuitem"
              type="button"
              className="item-menu-proyecto btn-item-reporte"
              onClick={abrirModalReporte}
            >
              <strong>4. Reporte de las modificaciones realizadas</strong>
              <span>Ver bitácora técnica de cambios (PEU-1 a PEU-8)</span>
            </button>
          </li>
        </ul>
      )}

      {/* Modal accesible con el Reporte de Modificaciones */}
      {modalReporteAbierto && (
        <div
          className="modal-reporte-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-reporte"
        >
          <div className="modal-reporte-contenido">
            <header className="modal-reporte-header">
              <h2 id="titulo-modal-reporte">
                Reporte de Modificaciones Realizadas (PEU v1.1)
              </h2>
              <button
                ref={botonCerrarModalRef}
                type="button"
                className="btn-cerrar-modal"
                onClick={cerrarModalReporte}
                aria-label="Cerrar reporte de modificaciones"
              >
                ✕ Cerrar
              </button>
            </header>

            <div className="modal-reporte-cuerpo">
              <p>
                Consolidación final del Product Backlog (<strong>41 Story Points / 8 Historias de Usuario</strong>) tras las sesiones de revisión y validación WCAG 2.1 Nivel AA:
              </p>

              <div className="tabla-responsiva">
                <table className="tabla-modificaciones">
                  <thead>
                    <tr>
                      <th>Módulo / Componente</th>
                      <th>Observación / Mejora</th>
                      <th>Modificación Ejecutada</th>
                      <th>Verificación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODIFICACIONES_REALIZADAS.map((item, idx) => (
                      <tr key={idx}>
                        <td><strong>{item.modulo}</strong></td>
                        <td>{item.sugerencia}</td>
                        <td>{item.modificacion}</td>
                        <td>{item.verificacion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="modal-reporte-enlaces">
                <a
                  href={CONFIG_ENLACES.sistemaImplementado}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver repositorio en GitHub ↗
                </a>
                <a
                  href={CONFIG_ENLACES.documentacionScrum}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Product Backlog en Google Docs ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
