'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { AUTHORIZED_USERS } from '@/lib/authConfig';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const emailLower = email.trim().toLowerCase();

    // Verificamos si el usuario está en la lista de permitidos
    if (!AUTHORIZED_USERS.includes(emailLower)) {
      setError('Este correo no está autorizado para acceder como autor.');
      setLoading(false);
      return;
    }

    try {
      // Intentamos iniciar sesión primero
      await signInWithEmailAndPassword(auth, emailLower, password);
      router.push('/admin');
    } catch (err: any) {
      // Si falla, verificamos si es porque no existe o es credencial inválida
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        // Intentamos crear la cuenta
        try {
          await createUserWithEmailAndPassword(auth, emailLower, password);
          router.push('/admin');
        } catch (createErr: any) {
          if (createErr.code === 'auth/email-already-in-use') {
            setError('Credenciales incorrectas. Si ya creaste tu cuenta, revisa la contraseña.');
          } else if (createErr.code === 'auth/weak-password') {
            setError('La contraseña debe tener al menos 6 caracteres.');
          } else {
            setError('Error al crear la cuenta. Intenta de nuevo.');
            console.error(createErr);
          }
        }
      } else {
        setError('Error al procesar la solicitud.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2>Acceso para Autores</h2>
        <p>
          Introduce tu correo de autor y tu contraseña. Si es la primera vez que entras, se creará tu cuenta automáticamente con la contraseña que elijas.
        </p>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@ecoproposito.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Procesando...' : 'Entrar / Crear Cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
}
