'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams } from 'next/navigation';
import styles from './article.module.css';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchArticle = async () => {
      const docRef = doc(db, 'articles', id as string);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setArticle({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No existe el artículo');
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="container" style={{padding: '50px', textAlign: 'center'}}>Cargando artículo...</div>;
  }

  if (!article) {
    return <div className="container" style={{padding: '50px', textAlign: 'center'}}>Artículo no encontrado.</div>;
  }

  return (
    <div className="container">
      <article className={styles.articleContainer}>
        <div className={styles.header}>
          <span className={styles.category}>{article.category}</span>
          <h1>{article.title}</h1>
          <p className={styles.date}>
            {article.createdAt?.toDate().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {article.imageUrl && (
          <div className={styles.imageContainer}>
            {/* Usando img estandar por simplicidad temporal */}
            <img src={article.imageUrl} alt={article.title} className={styles.image} />
          </div>
        )}

        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        <div className={styles.actions}>
          <a href="/" className="btn-primary" style={{backgroundColor: 'var(--text-primary)'}}>&larr; Volver al Periódico</a>
        </div>
      </article>
    </div>
  );
}
