'use client';

import { useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import styles from './editor.module.css';
import 'react-quill/dist/quill.snow.css';

// Importación dinámica para evitar errores de SSR con Quill y permitir Refs
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function Component({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

export default function EditorPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('El latido del propósito');
  const [subCategory, setSubCategory] = useState('Laboratorio');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Embajador');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const quillRef = useRef<any>(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      try {
        const storageRef = ref(storage, `images/content/${Date.now()}_${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(uploadTask.ref);

        if (quillRef.current) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', downloadURL);
        }
      } catch (error) {
        console.error('Error uploading image', error);
        alert('Error al subir la imagen insertada.');
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

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

      // Si la categoría principal es Match point, guardamos la subcategoría en su lugar
      const finalCategory = category === 'Match point' ? subCategory : category;

      // Guardamos la noticia en Firestore
      const articleData: any = {
        title,
        category: finalCategory,
        content,
        imageUrl,
        createdAt: serverTimestamp(),
        status: 'published'
      };

      // Añadimos datos de autor solo si es Tribuna de opinión
      if (category === 'La tribuna de opinión') {
        articleData.authorName = authorName;
        articleData.authorRole = authorRole;
      }

      await addDoc(collection(db, 'articles'), articleData);

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
            <label>Sección Principal</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
              <option value="El latido del propósito">El latido del propósito</option>
              <option value="Rostros con sentido">Rostros con sentido</option>
              <option value="Match point">Match point</option>
              <option value="La tribuna de opinión">La tribuna de opinión</option>
            </select>
          </div>

          {category === 'Match point' && (
            <div className={styles.formGroup}>
              <label>Subsección (Match point)</label>
              <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className={styles.select}>
                <option value="Laboratorio">Laboratorio</option>
                <option value="Cápsula de liderazgo">Cápsula de liderazgo</option>
                <option value="La huella">La huella</option>
              </select>
            </div>
          )}

          {category === 'La tribuna de opinión' && (
            <>
              <div className={styles.formGroup}>
                <label>Nombre del Autor</label>
                <input 
                  type="text" 
                  value={authorName} 
                  onChange={(e) => setAuthorName(e.target.value)} 
                  placeholder="Ej: María García"
                  className={styles.inputTitle}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Rol del Autor</label>
                <select value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} className={styles.select}>
                  <option value="Embajador">Embajador</option>
                  <option value="Líder por propósito">Líder por propósito</option>
                </select>
              </div>
            </>
          )}
          
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
              forwardedRef={quillRef}
              theme="snow" 
              value={content} 
              onChange={setContent} 
              modules={modules}
              formats={formats}
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
