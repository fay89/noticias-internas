import type { Metadata } from 'next';
import './globals.css';
import layoutStyles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Noticias Internas - El Latido del Propósito',
  description: 'Periódico digital interno para embajadores y líderes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header className={layoutStyles.header}>
          <div className="container">
            <div className={layoutStyles.headerTop}>
              <div className={layoutStyles.date}>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div className={layoutStyles.logoContainer}>
                {/* Se asume que el usuario guardará la imagen como logo.png en public/ */}
                <img src="/logo.png" alt="Hotel Cristina" className={layoutStyles.logoImage} />
                <p className={layoutStyles.subtitle}>El Latido del Propósito</p>
              </div>
              <div className={layoutStyles.actions}>
                <a href="/login" className="btn-primary">Entrar</a>
              </div>
            </div>
            <nav className={layoutStyles.nav}>
              <ul>
                <li><a href="#latido">El Latido del Propósito</a></li>
                <li><a href="#rostros">Rostros con Sentido</a></li>
                <li><a href="#laboratorio">El Laboratorio</a></li>
                <li><a href="#tribuna">Tribuna de Opinión</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className={layoutStyles.main}>
          {children}
        </main>

        <footer className={layoutStyles.footer}>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Noticias Internas - Embajadores en Red</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
