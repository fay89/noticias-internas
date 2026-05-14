'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import styles from './editor.module.css';
import 'react-quill/dist/quill.snow.css';

// Importación dinámica para evitar errores de SSR con Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditorPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('El latido del propósito');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert('Por favor completa el título y el contenido.');
    
    setLoading(true);
    try {
      let imageUrl = '';
      
      // Si hay imagen, la subimos a Firebase Storage primero
      if (image) {
        const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, image);
        imageUrl = await getDownloadURL(uploadTask.ref);
      }

      // Guardamos la noticia en Firestore
      await addDoc(collection(db, 'articles'), {
        title,
        category,
        content,
        imageUrl,
        createdAt: serverTimestamp(),
        status: 'published'
      });

      alert('Noticia publicada con éxito');
      router.push('/admin');
    } catch (error) {
      console.error('Error al publicar:', error);
      alert('Hubo un error al publicar la noticia.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.header}>
        <h1>Redactar Nueva Noticia</h1>
      </div>

      <form onSubmit={handlePublish} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Título de la Noticia</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Ej: Nuevo acuerdo global de sostenibilidad"
            required
            className={styles.inputTitle}
          />
        </div>

        <div className={styles.grid2}>
          <div className={styles.formGroup}>
            <label>Sección / Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
              <option value="El latido del propósito">El latido del propósito</option>
              <option value="Rostros con sentido">Rostros con sentido</option>
              <option value="El laboratorio">El laboratorio</option>
              <option value="La tribuna de opinión">La tribuna de opinión</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label>Imagen de Portada (Opcional)</label>
            <div className={styles.fileUpload}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Cuerpo de la Noticia (Arrastra imágenes o formatea el texto)</label>
          <div className={styles.quillContainer}>
            <ReactQuill 
              theme="snow" 
              value={content} 
              onChange={setContent} 
              style={{ height: '300px', marginBottom: '50px' }}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className="btn-primary" style={{backgroundColor: '#64748b'}} onClick={() => router.back()}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary btn-green" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Noticia'}
          </button>
        </div>
      </form>
    </div>
  );
}
