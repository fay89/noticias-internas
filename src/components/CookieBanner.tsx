'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      maxWidth: '500px',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
        Utilizamos cookies para mejorar tu experiencia en <strong>Eco del Propósito</strong>. 
        Al continuar navegando, aceptas nuestra <Link href="/legal/politica-cookies" style={{ color: '#bf122c', fontWeight: 'bold' }}>Política de Cookies</Link>.
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={acceptCookies}
          style={{
            backgroundColor: '#bf122c',
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}
        >
          Aceptar
        </button>
        <Link 
          href="/legal/politica-privacidad"
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.85rem',
            alignSelf: 'center',
            textDecoration: 'none'
          }}
        >
          Saber más
        </Link>
      </div>
    </div>
  );
}
