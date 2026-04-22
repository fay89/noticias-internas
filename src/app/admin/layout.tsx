'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className={styles.loadingScreen}>Cargando panel de administración...</div>;
  }

  if (!user) {
    return null; // Evitar renderizado intermitente antes de redirigir
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.adminSidebar}>
        <div className={styles.adminLogo}>
          <h2>CMS CMS</h2>
          <p>Panel de Control</p>
        </div>
        <nav className={styles.adminNav}>
          <ul>
            <li><a href="/admin">Dashboard</a></li>
            <li><a href="/admin/editor">Nueva Noticia</a></li>
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
