export default function PoliticaPrivacidad() {
  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '40px' }}>Política de Privacidad</h1>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '20px' }}>
          De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa a los usuarios sobre el tratamiento de sus datos personales.
        </p>

        <section style={{ marginBottom: '30px' }}>
          <h2>1. Responsable del Tratamiento</h2>
          <p>El equipo de Gestión Interna de la Organización es el responsable del tratamiento de los datos recogidos en este portal.</p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>2. Finalidad</h2>
          <p>
            Los datos se recogen exclusivamente con la finalidad de gestionar el acceso al portal, la suscripción a noticias internas 
            y la participación en retos y juegos propuestos.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>3. Legitimación</h2>
          <p>La base legal para el tratamiento de sus datos es el consentimiento del usuario al acceder e interactuar con el portal.</p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>4. Derechos</h2>
          <p>
            Usted tiene derecho a acceder, rectificar, suprimir y oponerse al tratamiento de sus datos. 
            Para ello, puede ponerse en contacto con el departamento de Recursos Humanos o el equipo de Embajadores.
          </p>
        </section>
      </div>
    </div>
  );
}
