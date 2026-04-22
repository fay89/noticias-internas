'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const DEMO_ARTICLES = [
  {
    title: 'La nueva ley europea impulsa la economía circular en nuestras operaciones',
    category: 'La Noticia Inspiradora',
    imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `
      <p>A partir de este nuevo año, el panorama global nos invita a dar un paso al frente en materia de <strong>sostenibilidad y consciencia ambiental</strong>. Las recientes normativas aprobadas en el marco europeo no son solo una obligación legal, sino una confirmación de que nuestro propósito de empresa está perfectamente alineado con el futuro del planeta.</p>
      <br/>
      <p>Según los expertos, la transición hacia una economía circular requerirá que líderes de todos los departamentos colaboren de manera estrecha. <em>"Es el momento de demostrar que el propósito no está solo en los carteles, sino en nuestras decisiones diarias"</em>, afirmó nuestro equipo de estrategia global.</p>
      <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sostenibilidad" />
      <p>El reto ahora está en adaptar nuestros procesos. Todos los embajadores están llamados a aportar ideas desde sus áreas de influencia.</p>
    `
  },
  {
    title: 'Carlos Mendoza: Liderando con Empatía en el Equipo Sur',
    category: 'Embajador Destacado',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Este mes destacamos a Carlos Mendoza, quien ha logrado transformar el clima laboral de su equipo aplicando una herramienta muy sencilla pero poderosa: <strong>la escucha activa</strong>.</p>
      <p>Carlos nos cuenta que su rutina cambió cuando decidió dedicar los primeros 10 minutos de cada reunión simplemente a preguntar <em>"¿Cómo están hoy?"</em> y escuchar sin interrumpir.</p>
      <p>Los resultados hablan por sí solos: la rotación de su equipo ha disminuido un 15% y la motivación general está en su punto más alto. Un verdadero ejemplo de liderazgo consciente.</p>
    `
  },
  {
    title: 'Entrevista a Elena Ramos: "El Propósito como brújula"',
    category: 'Líder Invitado',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Tuvimos el honor de sentarnos a conversar con Elena Ramos, Directora de Operaciones Internacionales, sobre los retos de mantener el propósito vivo en tiempos de crisis.</p>
      <p><strong>P: Elena, ¿qué significa para ti el liderazgo con propósito?</strong></p>
      <p>R: Para mí, significa que cuando las cosas van mal, no tomamos la decisión más rápida o barata, sino la que nos deja dormir tranquilos sabiendo que fuimos fieles a nuestros valores.</p>
      <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Entrevista" />
      <p>Puedes escuchar la entrevista completa en nuestro próximo podcast interno.</p>
    `
  },
  {
    title: '3 Pasos para dominar la Escucha Activa',
    category: 'Cápsula de Liderazgo',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
      <p>A veces oímos, pero no escuchamos. Aquí tienes 3 tips para mejorar:</p>
      <ol>
        <li><strong>Contacto visual:</strong> Deja el móvil o el portátil. Mira a la persona a los ojos.</li>
        <li><strong>No prepares tu respuesta:</strong> Mientras el otro habla, tu cerebro no debe estar pensando en qué contestar, solo en comprender.</li>
        <li><strong>Parafrasea:</strong> Al terminar, haz un resumen de lo que entendiste: <em>"Si te he entendido bien, lo que te preocupa es..."</em></li>
      </ol>
      <p>¡Ponlo a prueba hoy mismo!</p>
    `
  },
  {
    title: 'Libro del mes: "Los líderes comen al final" de Simon Sinek',
    category: 'Recomendado',
    imageUrl: '',
    content: `
      <p>Una lectura obligatoria para cualquier líder. Sinek explora por qué en algunas organizaciones los equipos se apoyan mutuamente hasta las últimas consecuencias, mientras que en otras predominan las peleas internas.</p>
      <p>La clave, argumenta, está en crear un "Círculo de Seguridad". Si todavía no lo has leído, te invitamos a buscarlo en nuestra biblioteca corporativa.</p>
    `
  },
  {
    title: 'El reto de conciliar velocidad y ética en las decisiones diarias',
    category: 'Tribuna de Opinión',
    imageUrl: '',
    content: `
      <p>A menudo el mercado nos exige respuestas en 24 horas. Como líderes, sentimos la presión de entregar resultados rápidos. Sin embargo, ¿qué pasa cuando la rapidez compromete nuestros estándares éticos?</p>
      <p>Desde mi departamento he notado que tomarse 5 minutos adicionales para hacer la pregunta <em>"¿Es esto lo correcto?"</em> nos ha ahorrado meses de dolores de cabeza. La verdadera agilidad no es correr a ciegas, es correr en la dirección correcta.</p>
    `
  },
  {
    title: 'Carta al Editor: Gracias por la nueva iniciativa de salud mental',
    category: 'Tribuna de Opinión',
    imageUrl: '',
    content: `
      <p>Escribo a este buzón abierto para agradecer profundamente las recientes charlas sobre salud mental y resiliencia que se han implementado. Como embajador de mi área, he visto a compañeros abrirse y apoyarse como nunca antes. Sigamos fomentando estos espacios seguros.</p>
    `
  }
];

export default function DemoSeeder() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleSeed = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < DEMO_ARTICLES.length; i++) {
        const article = DEMO_ARTICLES[i];
        
        // Simular un ligero desfase de tiempo para que se ordenen bien en la portada
        const fakeDate = new Date();
        fakeDate.setMinutes(fakeDate.getMinutes() - i * 10); // Cada noticia es 10 mins más antigua

        await addDoc(collection(db, 'articles'), {
          title: article.title,
          category: article.category,
          content: article.content,
          imageUrl: article.imageUrl,
          createdAt: fakeDate,
          status: 'published'
        });
        setProgress(i + 1);
      }
      alert('¡Contenido de demostración generado con éxito!');
      router.push('/');
    } catch (error) {
      console.error('Error seeding data', error);
      alert('Error al generar los datos. Revisa la consola o tus reglas de Firestore.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--text-primary)' }}>Generador de Contenido Demo</h1>
      <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
        Pulsa el botón de abajo para inyectar automáticamente 7 noticias de demostración en tu base de datos de Firebase. Esto incluirá textos completos, imágenes en alta calidad (vía Unsplash) y diferentes categorías. Ideal para la presentación de mañana.
      </p>
      
      {loading ? (
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
          <p>Generando artículo {progress} de {DEMO_ARTICLES.length}...</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Por favor, no cierres esta pestaña.</p>
        </div>
      ) : (
        <button 
          onClick={handleSeed}
          style={{
            backgroundColor: 'var(--accent-blue)',
            color: 'white',
            padding: '15px 30px',
            fontSize: '1.2rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          ✨ Inyectar Contenido de Demostración ✨
        </button>
      )}
      
      <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#94a3b8' }}>
        Nota: Estas noticias se guardarán permanentemente en tu Firestore. Podrás borrarlas desde el Panel de Administración más adelante si lo deseas.
      </p>
    </div>
  );
}
