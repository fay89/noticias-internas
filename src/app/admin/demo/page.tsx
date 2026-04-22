'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const DEMO_ARTICLES = [
  {
    title: 'La nueva directiva europea de sostenibilidad: Un catalizador para la excelencia operativa y la economía circular',
    category: 'La Noticia Inspiradora',
    imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    content: `
      <p>A partir del presente ejercicio fiscal, el panorama global nos invita a dar un paso al frente de manera contundente en materia de <strong>sostenibilidad corporativa y consciencia ambiental</strong>. Las recientes normativas aprobadas en el marco europeo han dejado de ser meras obligaciones legales para convertirse en una oportunidad estratégica que nos permite confirmar que el propósito de nuestra organización está perfectamente alineado con la preservación del futuro del planeta.</p>
      <br/>
      <p>Según los analistas del sector, la transición hacia un modelo de economía circular requerirá que los líderes de todos los departamentos, desde Operaciones hasta Recursos Humanos, colaboren de manera sinérgica y estrecha. <em>"Es el momento crítico para demostrar que nuestro propósito corporativo no es una simple declaración en los pasillos, sino el filtro principal a través del cual tomamos nuestras decisiones operativas diarias"</em>, afirmó nuestro Comité de Estrategia Global durante la última convención.</p>
      <br/>
      <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sostenibilidad" />
      <br/>
      <p>El verdadero reto ahora reside en auditar y adaptar nuestros procesos de suministro y gestión de residuos. Se implementarán nuevos protocolos de eficiencia energética en nuestras sedes y se priorizará a proveedores que certifiquen prácticas de comercio justo. Todos los embajadores de la marca están llamados a liderar esta transformación, aportando ideas innovadoras desde sus respectivas áreas de influencia para consolidarnos como referentes en la industria.</p>
    `
  },
  {
    title: 'Carlos Mendoza: Redefiniendo el Liderazgo Empático y la Excelencia en la Región Sur',
    category: 'Embajador Destacado',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Este mes nos enorgullece destacar la extraordinaria labor de Carlos Mendoza, Director de la Región Sur, quien ha logrado transformar radicalmente el clima laboral y los índices de satisfacción de su equipo aplicando una competencia fundamental del liderazgo contemporáneo: <strong>la empatía estratégica y la escucha activa</strong>.</p>
      <br/>
      <p>Carlos nos comparte que el punto de inflexión en su gestión ocurrió cuando decidió reformular la estructura de sus reuniones semanales. En lugar de comenzar directamente con la revisión de KPIs y métricas de rendimiento, estableció un protocolo de dedicar los primeros 15 minutos exclusivamente a entender la situación emocional y operativa de su equipo mediante la simple pero poderosa pregunta: <em>"¿Qué obstáculos os impiden dar vuestro máximo potencial hoy, y cómo puedo ayudaros a eliminarlos?"</em>.</p>
      <br/>
      <p>Los resultados de esta aproximación humana han sido extraordinarios: la rotación de personal en su región ha disminuido un 22% en el último semestre, la productividad ha experimentado un repunte del 14%, y las encuestas de clima interno muestran niveles históricos de motivación. Carlos es el claro ejemplo de que un liderazgo consciente y vulnerable es la herramienta más eficaz para construir equipos de alto rendimiento.</p>
    `
  },
  {
    title: 'Entrevista Exclusiva con Elena Ramos, VP de Operaciones: "El Propósito Estratégico como Motor de Rentabilidad"',
    category: 'Líder Invitado',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Tuvimos el privilegio de sentarnos a conversar en profundidad con Elena Ramos, nuestra Vicepresidenta de Operaciones Internacionales, sobre los complejos desafíos de mantener el propósito fundacional vivo y operativo durante periodos de incertidumbre económica global.</p>
      <br/>
      <p><strong>P: Elena, desde una perspectiva puramente operativa, ¿qué significa para ti el "liderazgo con propósito"? ¿No entra en conflicto a veces con los márgenes de beneficio?</strong></p>
      <p>R: Esa es la falsa dicotomía contra la que debemos luchar cada día. Para mí, liderar con propósito significa entender que cuando las circunstancias del mercado se vuelven adversas, no debemos recurrir inmediatamente a la decisión que parezca más barata a corto plazo. Significa tener la valentía de elegir el camino que nos permite ser congruentes con nuestros valores. A la larga, esa coherencia es precisamente lo que fideliza a nuestros clientes y retiene al talento clave. La integridad tiene un ROI altísimo, aunque no siempre se refleje en el Excel del mes siguiente.</p>
      <br/>
      <img src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Entrevista" />
      <br/>
      <p><strong>P: ¿Cómo podemos asegurar que los equipos de primera línea, que enfrentan la presión del día a día, no pierdan de vista esa visión global?</strong></p>
      <p>R: A través de la comunicación constante y la delegación de confianza. Si microgestionamos, matamos el propósito. Si empoderamos y damos contexto, el propósito florece.</p>
      <p><em>Puedes escuchar la entrevista completa de 45 minutos en el próximo episodio de nuestro podcast corporativo interno, disponible el próximo jueves.</em></p>
    `
  },
  {
    title: 'Masterclass: 4 Estrategias Avanzadas para Dominar la Escucha Activa en Entornos de Alta Presión',
    category: 'Cápsula de Liderazgo',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    content: `
      <p>En la dinámica corporativa actual, a menudo oímos las palabras, pero no llegamos a escuchar el mensaje subyacente. La verdadera escucha activa es una habilidad cognitiva que requiere energía y foco. Presentamos cuatro técnicas validadas para elevar la calidad de tus interacciones profesionales:</p>
      <br/>
      <ol>
        <li><strong>Suspensión del diálogo interno:</strong> El mayor obstáculo para escuchar es estar preparando tu refutación mentalmente mientras el interlocutor habla. Concéntrate deliberadamente en silenciar esa voz y asume la postura de un aprendiz curioso.</li>
        <li><strong>Lectura del lenguaje no verbal:</strong> Los estudios indican que más del 70% de la comunicación en situaciones de estrés es no verbal. Observa la tensión en los hombros, el contacto visual y el tono de voz de tu equipo. A menudo, lo que no se dice es el verdadero problema a resolver.</li>
        <li><strong>El poder del silencio táctico:</strong> Cuando un empleado termine de explicar un problema complejo, no llenes el vacío inmediatamente. Cuenta hasta tres mentalmente. Esos segundos extra a menudo impulsan a la persona a revelar la verdadera raíz de su preocupación.</li>
        <li><strong>Validación reflexiva:</strong> Antes de ofrecer soluciones (el impulso natural de todo líder), valida la emoción y el dato: <em>"Si te he comprendido correctamente, la frustración principal viene de los cuellos de botella en el software, ¿es correcto?"</em>. Esto genera seguridad psicológica inmediata.</li>
      </ol>
    `
  },
  {
    title: 'Análisis Estratégico: "El Juego Infinito" de Simon Sinek y su Aplicación en Nuestra Cultura',
    category: 'Recomendado',
    imageUrl: '',
    content: `
      <p>Esta semana recomendamos una lectura que consideramos fundamental para cualquier persona con responsabilidades de gestión: <strong>"El Juego Infinito" de Simon Sinek</strong>. En esta obra, Sinek redefine la forma en que evaluamos el éxito empresarial, alejándose de las métricas trimestrales para enfocarse en la sostenibilidad a largo plazo.</p>
      <br/>
      <p>Sinek postula que los líderes tradicionales juegan un "juego finito" (enfocado en superar a la competencia inmediata y ganar el trimestre), mientras que los líderes excepcionales juegan el "juego infinito", cuyo único objetivo es asegurar que la organización tenga la resiliencia y la cultura necesarias para seguir existiendo y mejorando en el futuro.</p>
      <br/>
      <p>La lección más aplicable para nuestra realidad corporativa es la creación de un "Círculo de Seguridad". Cuando los líderes fomentan una cultura donde los empleados se sienten protegidos frente a las amenazas internas (culpas, políticas de oficina, miedos a represalias), toda esa energía se redirige hacia la innovación y la protección contra amenazas externas (competencia, crisis de mercado). El libro ya se encuentra disponible para su préstamo en la plataforma de e-learning corporativa.</p>
    `
  },
  {
    title: 'El Desafío de la Agilidad Ética: Cómo Tomar Decisiones Rápidas sin Comprometer Nuestros Valores',
    category: 'Tribuna de Opinión',
    imageUrl: '',
    content: `
      <p>En el vertiginoso ecosistema actual, el mercado nos exige tiempos de respuesta que se miden en horas, no en semanas. Como líderes, sentimos una presión constante y asfixiante por entregar resultados inmediatos. Sin embargo, me pregunto a menudo: ¿qué sucede cuando la idolatría por la velocidad compromete nuestros estándares éticos y de calidad?</p>
      <br/>
      <p>Desde la Dirección de Innovación hemos comprobado que, paradójicamente, desacelerar en los momentos críticos es lo que nos hace más rápidos a largo plazo. Tomarse 5 minutos adicionales antes de autorizar un nuevo proceso para plantearnos la pregunta fundamental —<em>"¿Es esta solución coherente con nuestro propósito y respetuosa con el cliente final?"</em>— nos ha ahorrado meses de costosos reprocesos, crisis de reputación y fricciones en el equipo.</p>
      <br/>
      <p>Debemos desterrar la idea de que ser éticos nos hace lentos. La verdadera agilidad no consiste en correr a ciegas hacia cualquier dirección, sino en avanzar a paso firme sabiendo que cada paso consolida nuestra reputación y fortalece nuestra marca. Os invito a todos a ser valientes y atreveros a poner el freno cuando el instinto os diga que la decisión rápida no es la decisión correcta.</p>
    `
  },
  {
    title: 'Resultados e Impacto del Nuevo Programa Integral de Bienestar y Salud Mental',
    category: 'Tribuna de Opinión',
    imageUrl: '',
    content: `
      <p>Utilizo este espacio abierto para hacer balance sobre los primeros meses de implementación de nuestro programa "Mindful Leadership". Cuando desde Recursos Humanos propusimos integrar talleres de salud mental y resiliencia emocional en horario laboral, sabíamos que estábamos rompiendo un tabú corporativo histórico.</p>
      <br/>
      <p>Hoy, los datos nos respaldan. El uso del servicio de apoyo psicológico anónimo ha superado nuestras expectativas, demostrando que la necesidad estaba latente. Pero más allá de las estadísticas, lo más valioso ha sido el cambio cualitativo en nuestros pasillos y reuniones virtuales. Como embajador del programa, he presenciado a directores de área compartir abiertamente sus estrategias para gestionar el estrés, normalizando conversaciones que hace un año eran impensables.</p>
      <br/>
      <p>Sigamos fomentando estos espacios de vulnerabilidad segura. Un equipo sano a nivel mental no solo es un equipo más productivo, es el único tipo de equipo capaz de innovar verdaderamente y sostener nuestro propósito en el tiempo. Gracias a todos por abrazar esta iniciativa con tanta madurez.</p>
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
