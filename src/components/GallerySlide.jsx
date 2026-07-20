import { motion } from 'framer-motion';
import { scaleIn } from '../animations';

export default function GallerySlide() {
  return (
    <section style={{
      padding: '80px 24px',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <motion.h2 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scaleIn}
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(42px, 8vw, 64px)',
          color: '#c9942a',
          margin: '0 0 40px',
          textAlign: 'center',
          fontWeight: 'normal'
        }}
      >
        Moments Together
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: 'min(90vw, 800px)'
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <img 
            src="/couple.png" 
            alt="Couple 1"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <img 
            src="/couple2.png" 
            alt="Couple 2"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
