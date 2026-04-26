'use client';

import { useState, useRef } from 'react';
import styles from './EditorialModal.module.css';

export default function EditorialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const openEditorial = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Bajar volumen al 20%
      // Intentar reproducir la música
      audioRef.current.play().catch(e => console.log('Autoplay bloqueado:', e));
    }
  };

  const closeEditorial = () => {
    setIsOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <>
      <div className={styles.bannerContainer}>
        <button onClick={openEditorial} className={styles.openButton}>
          <span className={styles.badge}>Nuevo</span>
          <h2>Editorial de Lanzamiento</h2>
          <p>Donde el Propósito encuentra su voz</p>
          <span className={styles.readAction}>Leer y Escuchar &rarr;</span>
        </button>
      </div>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeEditorial}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeEditorial}>
              &times;
            </button>
            
            <div className={styles.editorialHeader}>
              <span className={styles.editorialLabel}>Editorial de Lanzamiento</span>
              <h2>Eco del Propósito</h2>
              <p className={styles.author}>De: El Equipo de Embajadores</p>
            </div>

            <div className={styles.editorialBody}>
              <p>Bienvenidos a la primera edición de <strong>Eco del Propósito</strong>.</p>
              
              <div className={styles.imageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" 
                  alt="Equipo trabajando con propósito" 
                  className={styles.editorialImage}
                />
              </div>

              <p>
                A menudo se piensa que el liderazgo es una posición en un organigrama o un título en una tarjeta de
                presentación. Sin embargo, quienes formamos parte de este programa entendemos una verdad más
                profunda: el Propósito es, ante todo, una decisión de servicio. Es la voluntad de alinear nuestros
                talentos personales con las necesidades del mundo.
              </p>

              <p>
                Este periódico nace no solo para informar, sino para sostener el espejo frente a nosotros. Queremos que
                estas páginas sean un espacio para reconocer el impacto que estamos logrando entre todos, pero
                también para reflexionar sobre los desafíos que enfrentamos cuando decidimos compartir la visión de
                nuestros roles desde la coherencia y el propósito.
              </p>

              <p>
                ¿Por qué ahora? Porque el mundo no necesita más jefes; necesita referentes. Necesita personas que,
                más allá de los resultados inmediatos, se pregunten: <em>¿Para qué hago lo que hago?</em>.
              </p>

              <p>
                En cada sección encontrarán historias de embajadores que ya están moviendo la aguja, herramientas
                para fortalecer nuestra resiliencia y espacios de opinión donde todas las voces cuentan. Este no es un
                boletín de la empresa; es el latido de nuestra comunidad, el Hotel Cristina, que cree firmemente que el
                Propósito aporta motivación, satisfacción y legado a nuestras vidas.
              </p>

              <p>
                Les invitamos a leer, a compartir y, sobre todo, a participar. Que estas letras sean la mecha que
                encienda la hoguera de las nuevas acciones.
              </p>

              <p className={styles.closing}>El viaje comienza ahora. ¿Nos acompañas?</p>
            </div>
          </div>
        </div>
      )}

      {/* Audio Element: loop={false} para que no se repita */}
      <audio 
        ref={audioRef} 
        src="/musica-editorial.mp3" 
        preload="auto"
        loop={false} 
      />
    </>
  );
}
