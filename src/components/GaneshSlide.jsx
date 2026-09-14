import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GaneshSlide({ onComplete }) {
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000); // 5.0 seconds total duration
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <section
      className="ganesh-section"
      style={{
        padding: 'clamp(32px, 6vh, 64px) 24px',
        background: '#152025',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        boxSizing: 'border-box',
        borderBottom: '1px solid #2C3730',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(24px, 5vh, 48px)',
          width: '100%',
          maxWidth: 'min(90vw, 550px)'
        }}
      >
        {/* Step 1: Lord Ganesh Image (Revealed Top-to-Bottom in 1 second) */}
        <motion.img
          src={import.meta.env.BASE_URL + "LordGanesh.png"}
          alt="Lord Ganesh"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
          style={{
            width: '100%',
            maxWidth: 'clamp(220px, 35vw, 320px)',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
          }}
        />

        {/* Step 2: Mantra Image (Revealed Top-to-Bottom in 1 second, after 1 second wait = delay 2.0s) */}
        <motion.img
          src={import.meta.env.BASE_URL + "mantra.png"}
          alt="Mantra"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ delay: 2.0, duration: 1.0, ease: 'easeInOut' }}
          style={{
            width: '100%',
            maxWidth: 'clamp(260px, 42vw, 380px)',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
          }}
        />
      </div>
    </section>
  );
}
