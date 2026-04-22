import type { Metadata, Viewport } from 'next';
import { Anton } from 'next/font/google';
import './globals.css';
import layoutStyles from './layout.module.css';

const anton = Anton({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Enfoque Nublo - El Latido del Propósito',
  description: 'Periódico digital interno para embajadores y líderes.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Enfoque Nublo',
  },
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
                {/* Asegúrate de tener una imagen llamada logo.png en tu carpeta public/ */}
                <img src="/logo.png" alt="Logo Enfoque Nublo" className={layoutStyles.logoImage} />
                <h1 className={`${layoutStyles.newspaperTitle} ${anton.className}`}>Enfoque Nublo</h1>
              </div>
              <div className={layoutStyles.actions}>
                <a href="/login" className="btn-primary">Entrar</a>
              </div>
            </div>
            <nav className={layoutStyles.nav}>
              <ul>
                <li><a href="/#latido">El Latido del Propósito</a></li>
                <li><a href="/#rostros">Rostros con Sentido</a></li>
                <li><a href="/#laboratorio">El Laboratorio</a></li>
                <li><a href="/juegos">Juegos y Retos</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className={layoutStyles.main}>
          {children}
        </main>

        <footer className={layoutStyles.footer}>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Enfoque Nublo - Embajadores en Red</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
