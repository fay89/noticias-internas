'use client';

import styles from './page.module.css';
import Link from 'next/link';

export default function AdminDashboard() {
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
          <p className={styles.statNumber}>12</p>
        </div>
        <div className={styles.statCard}>
          <h3>Borradores</h3>
          <p className={styles.statNumber}>3</p>
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Ejemplo estático por ahora */}
              <tr>
                <td>Lanzamiento de la nueva iniciativa</td>
                <td>Noticia Inspiradora</td>
                <td>22/04/2026</td>
                <td><span className={styles.badgePublished}>Publicado</span></td>
                <td>
                  <button className={styles.btnAction}>Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
