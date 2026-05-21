'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arts: any[] = [];
      snapshot.forEach((doc) => {
        arts.push({ id: doc.id, ...doc.data() });
      });
      setArticles(arts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta noticia de forma permanente?')) {
      try {
        await deleteDoc(doc(db, 'articles', id));
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Error al eliminar la noticia.');
      }
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando panel...</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <Link href="/admin/editor" className="btn-primary">
          + Redactar Nueva Noticia
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Noticias Publicadas</h3>
          <p className={styles.statNumber}>{articles.length}</p>
        </div>
      </div>

      <div className={styles.recentSection}>
        <h2>Noticias Recientes</h2>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Sección</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.category}</td>
                  <td>
                    {article.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString('es-ES') : 'Reciente'}
                  </td>
                  <td>
                    <button 
                      className={styles.btnAction} 
                      onClick={() => router.push(`/admin/edit/${article.id}`)}
                      style={{ marginRight: '10px' }}
                    >
                      Editar
                    </button>
                    <button 
                      className={styles.btnAction} 
                      onClick={() => handleDelete(article.id)}
                      style={{ color: '#bf122c' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>No hay noticias publicadas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
