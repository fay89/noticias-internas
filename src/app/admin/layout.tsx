'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AUTHORIZED_USERS } from '@/lib/authConfig';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email) {
        if (AUTHORIZED_USERS.includes(currentUser.email)) {
          setUser(currentUser);
          setLoading(false);
        } else {
          // Usuario autenticado pero no autorizado
          router.push('/unauthorized');
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return <div className={styles.loadingScreen}>Cargando panel de administración...</div>;
  }

  if (!user) {
    return null; // Evitar renderizado intermitente antes de redirigir
  }

  return (
    <div className={styles.adminLayout}>
      <button className={styles.mobileMenuBtn} onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
      </button>

      {isSidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}

      <aside className={`${styles.adminSidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.adminLogo}>
          <h2>Eco del Propósito</h2>
          <p>CMS Editorial</p>
        </div>
        <nav className={styles.adminNav}>
          <ul>
            <li><a href="/admin" onClick={() => setIsSidebarOpen(false)}>📊 Dashboard</a></li>
            <li><a href="/admin/editor" onClick={() => setIsSidebarOpen(false)}>✍️ Nueva Noticia</a></li>
            <li><a href="/" onClick={() => setIsSidebarOpen(false)}>🏠 Volver al Periódico</a></li>
          </ul>
        </nav>
        <div className={styles.adminUser}>
          <p className={styles.userEmail}>{user.email}</p>
          <button onClick={() => signOut(auth)} className={styles.btnLogout}>Cerrar Sesión</button>
        </div>
      </aside>
      <main className={styles.adminContent}>
        {children}
      </main>
    </div>
  );
}
