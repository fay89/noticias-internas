import type { Metadata, Viewport } from 'next';
import { Anton } from 'next/font/google';
import './globals.css';
import layoutStyles from './layout.module.css';
import CookieBanner from '@/components/CookieBanner';

const anton = Anton({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eco del Propósito - El Latido del Propósito',
  description: 'Periódico digital interno para embajadores y líderes.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Eco del Propósito',
  },
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
                <img src="/logo.png" alt="Logo Eco del Propósito" className={layoutStyles.logoImage} />
                <h1 className={`${layoutStyles.newspaperTitle} ${anton.className}`}>Eco del Propósito</h1>
              </a>
              <div className={layoutStyles.actions}>
                <a href="/login" className="btn-primary">Entrar</a>
              </div>
            </div>
            <nav className={layoutStyles.nav}>
              <ul>
                <li>
                  <a href="/#latido">
                    <svg className={layoutStyles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span className={layoutStyles.desktopText}>El Latido del Propósito</span>
                    <span className={layoutStyles.mobileText}>Inicio</span>
                  </a>
                </li>
                <li>
                  <a href="/#rostros">
                    <svg className={layoutStyles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span className={layoutStyles.desktopText}>Rostros con Sentido</span>
                    <span className={layoutStyles.mobileText}>Rostros</span>
                  </a>
                </li>
                <li>
                  <a href="/#match-point">
                    <svg className={layoutStyles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    <span className={layoutStyles.desktopText}>Match point</span>
                    <span className={layoutStyles.mobileText}>Match point</span>
                  </a>
                </li>
                <li>
                  <a href="/juegos">
                    <svg className={layoutStyles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><circle cx="15" cy="13" r="1"></circle><circle cx="18" cy="11" r="1"></circle><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>
                    <span className={layoutStyles.desktopText}>Juegos y Retos</span>
                    <span className={layoutStyles.mobileText}>Juegos</span>
                  </a>
                </li>
                <li>
                  <a href="/admin/editor" className={layoutStyles.publishButton}>
                    <svg className={layoutStyles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    <span className={layoutStyles.desktopText}>Redactar</span>
                    <span className={layoutStyles.mobileText}>Publicar</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className={layoutStyles.main}>
          {children}
        </main>

        <footer className={layoutStyles.footer}>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Eco del Propósito - Embajadores en Red</p>
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
              <a href="/legal/aviso-legal">Aviso Legal</a>
              <a href="/legal/politica-privacidad">Privacidad</a>
              <a href="/legal/politica-cookies">Cookies</a>
            </div>
          </div>
        </footer>
        <CookieBanner />
      </body>
    </html>
  );
}
