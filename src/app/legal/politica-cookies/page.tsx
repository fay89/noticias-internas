export default function PoliticaCookies() {
  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '40px' }}>Política de Cookies</h1>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '20px' }}>
          En este sitio web utilizamos cookies propias y de terceros para mejorar su experiencia de navegación y analizar el tráfico.
        </p>

        <section style={{ marginBottom: '30px' }}>
          <h2>1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se descargan en su dispositivo al acceder a páginas web. 
            Permiten recordar sus preferencias y mejorar el rendimiento del sitio.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>2. Tipos de cookies utilizadas</h2>
          <ul>
            <li><strong>Técnicas:</strong> Necesarias para el funcionamiento del portal (p. ej., mantener la sesión iniciada).</li>
            <li><strong>Analíticas:</strong> Nos permiten saber cuántas personas nos leen y qué secciones son las más populares.</li>
            <li><strong>Preferencias:</strong> Recuerdan si ha aceptado este aviso o sus preferencias de audio.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>3. Gestión de cookies</h2>
          <p>
            Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador.
          </p>
        </section>
      </div>
    </div>
  );
}
