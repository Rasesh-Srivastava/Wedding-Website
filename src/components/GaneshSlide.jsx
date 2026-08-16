import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../animations';

export default function GaneshSlide({ onComplete }) {
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);
  return (
    <section style={{
      padding: '80px 24px',
      background: '#152025',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      boxSizing: 'border-box',
      borderBottom: '1px solid #2C3730',
      textAlign: 'center'
    }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
          width: '100%',
          maxWidth: 'min(90vw, 800px)'
        }}
      >
        <img
          src={import.meta.env.BASE_URL + "LordGanesh.png"}
          alt="Lord Ganesh"
          style={{
            width: '100%',
            maxWidth: '320px',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
          }}
        />
        
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          width: '100%'
        }}>
          <img
            src={import.meta.env.BASE_URL + "shree.png"}
            alt="Shree"
            style={{
              width: '100%',
              maxWidth: '320px',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }}
          />

          <img
            src={import.meta.env.BASE_URL + "mantra.png"}
            alt="Mantra"
            style={{
              width: '100%',
              maxWidth: '320px',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
