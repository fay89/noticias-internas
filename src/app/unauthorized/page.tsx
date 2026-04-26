'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleBack = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f8fafc'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#bf122c', marginBottom: '20px' }}>Acceso Restringido</h1>
      <p style={{ fontSize: '1.2rem', color: '#475569', maxWidth: '500px', marginBottom: '40px' }}>
        Lo sentimos, tu cuenta no tiene permisos para acceder al panel de administración de <strong>Eco del Propósito</strong>.
      </p>
      <button 
        onClick={handleBack}
        style={{
          backgroundColor: '#0f172a',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '30px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Volver al Periódico
      </button>
    </div>
  );
}
