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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registrado con éxito con el scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registro fallido: ', err);
                  });
                });
              }
            `,
          }}
        />
        <header className={layoutStyles.header}>
          <div className="container">
            <div className={layoutStyles.headerTop}>
              <div className={layoutStyles.date}>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <a href="/" className={layoutStyles.logoContainer} style={{textDecoration: 'none'}}>
                {/* Asegúrate de tener una imagen llamada logo.png en tu carpeta public/ */}
                <img src="/logo.png" alt="Logo Enfoque Nublo" className={layoutStyles.logoImage} />
                <h1 className={`${layoutStyles.newspaperTitle} ${anton.className}`}>Enfoque Nublo</h1>
              </a>
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
