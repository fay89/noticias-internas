import styles from '@/app/page.module.css';

export default function AvisoLegal() {
  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '40px' }}>Aviso Legal</h1>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <section style={{ marginBottom: '30px' }}>
          <h2>1. Información General</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), 
            se informa que este sitio web "Eco del Propósito" es un portal de comunicación interna gestionado por el equipo de Embajadores de la organización.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>2. Propiedad Intelectual</h2>
          <p>
            Todos los contenidos de este portal, incluyendo textos, imágenes, audios y diseño, son propiedad de la organización o de sus respectivos autores. 
            Queda prohibida la reproducción total o parcial para fines externos sin autorización previa.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>3. Responsabilidad</h2>
          <p>
            La organización no se hace responsable de las opiniones vertidas por los colaboradores en las secciones de opinión, 
            siendo estas responsabilidad exclusiva de sus autores.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>4. Enlaces</h2>
          <p>
            La presencia de enlaces a sitios externos tiene una finalidad meramente informativa, no suponiendo en ningún caso una sugerencia o invitación a la contratación de productos o servicios.
          </p>
        </section>
      </div>
    </div>
  );
}
