import Crucigrama from '@/components/Crucigrama';
import SopaDeLetras from '@/components/SopaDeLetras';

export default function JuegosPage() {
  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '15px' }}>Juegos y Retos</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Pon a prueba tus conocimientos sobre hostelería y liderazgo por propósito. ¡Diviértete mientras aprendes!
        </p>
      </div>

      <SopaDeLetras />
      <Crucigrama />
      
    </div>
  );
}
