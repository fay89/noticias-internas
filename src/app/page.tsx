'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Anton } from 'next/font/google';
import styles from './page.module.css';
import EditorialModal from '@/components/EditorialModal';

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  imageUrl?: string;
  createdAt: any;
  authorName?: string;
  authorRole?: string;
}

const anton = Anton({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const arts: Article[] = [];
      snapshot.forEach((doc) => {
        arts.push({ id: doc.id, ...doc.data() } as Article);
      });
      setArticles(arts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="container" style={{padding: '50px', textAlign: 'center'}}>Cargando noticias...</div>;
  }

  // Filtrar artículos por categoría para las secciones
  const mainArticle = articles.find(a => a.category === 'El latido del propósito') || articles.find(a => a.category === 'La Noticia Inspiradora') || articles[0];
  const rostrosArticles = articles.filter(a => a.category === 'Rostros con sentido' || a.category === 'Embajador Destacado' || a.category === 'Líder Invitado').slice(0, 2);
  const matchPointArticles = articles.filter(a => a.category === 'Match point' || a.category === 'Laboratorio' || a.category === 'Cápsula de liderazgo' || a.category === 'La huella' || a.category === 'El laboratorio' || a.category === 'Cápsula de Liderazgo' || a.category === 'Recomendado').slice(0, 3);
  const tribunaArticles = articles.filter(a => a.category === 'La tribuna de opinión' || a.category === 'Tribuna de Opinión').slice(0, 3);

  return (
    <div className="container">
      <div className={styles.appBranding}>
        <h1 className={`${styles.appTitle} ${anton.className}`}>Eco del Propósito</h1>
      </div>
      <EditorialModal />
      <div className={styles.newspaperLayout}>
        <div className={styles.mainContent}>
          
          <section id="latido" className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>El Latido del Propósito</h2>
            </div>
            
            {mainArticle ? (
              <article className={styles.heroArticle}>
                {mainArticle.imageUrl ? (
                  <div className={styles.heroImagePlaceholder} style={{ backgroundImage: `url(${mainArticle.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent' }}>
                  </div>
                ) : (
                  <div className={styles.heroImagePlaceholder}>Sin Imagen</div>
                )}
                <div className={styles.heroContent}>
                  <span className={styles.categoryBadge}>{mainArticle.category}</span>
                  <h3>{mainArticle.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: mainArticle.content.substring(0, 200) + '...' }} />
                  <a href={`/noticias/${mainArticle.id}`} className={styles.readMore}>Leer artículo completo &rarr;</a>
                </div>
              </article>
            ) : (
              <p>No hay noticias principales publicadas aún.</p>
            )}
          </section>

          <section id="rostros" className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Rostros con Sentido</h2>
            </div>
            <div className={styles.grid2}>
              {rostrosArticles.map((article, index) => (
                <article key={article.id} className={styles.cardArticle}>
                  {article.imageUrl ? (
                    <img src={article.imageUrl} alt={article.title} className={styles.dynamicImage} />
                  ) : (
                    <div className={styles.cardImagePlaceholder}></div>
                  )}
                  <div className={styles.cardContent}>
                    <span className={`${styles.categoryBadge} ${index % 2 === 0 ? styles.bgGreen : styles.bgEarth}`}>{article.category}</span>
                    <h4>{article.title}</h4>
                    <a href={`/noticias/${article.id}`} className={styles.readMore}>Leer más</a>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>

        <aside className={styles.sidebar}>
          
          <div id="match-point" className={styles.sidebarWidget}>
            <h3 className={styles.widgetTitle}>Match point</h3>
            <ul className={styles.widgetList}>
              {matchPointArticles.map(article => (
                <li key={article.id}>
                  <span className={styles.widgetLabel}>{article.category}</span>
                  <a href={`/noticias/${article.id}`}>{article.title}</a>
                </li>
              ))}
              {matchPointArticles.length === 0 && <p>Sin artículos recientes.</p>}
            </ul>
          </div>

          <div id="tribuna" className={styles.sidebarWidget}>
            <h3 className={styles.widgetTitle}>Tribuna de Opinión</h3>
            {tribunaArticles.map(article => (
              <div key={article.id} className={styles.opinionItem}>
                <h5><a href={`/noticias/${article.id}`}>{article.title}</a></h5>
                <p className={styles.excerpt}>
                  Por {article.authorName ? `${article.authorName} - ` : 'un '}{article.authorRole || 'Embajador'}
                </p>
              </div>
            ))}
            {tribunaArticles.length === 0 && <p>No hay opiniones recientes.</p>}
          </div>
          
        </aside>
      </div>
    </div>
  );
}
