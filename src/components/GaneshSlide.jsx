import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GaneshSlide({
  onComplete,
  mantraDesktopOffsetY = '61px'
}) {
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 4500); // Total 4.5 seconds duration
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <section
      className="ganesh-section"
      style={{
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
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(24px, 4vw, 48px)',
          width: '100%',
          maxWidth: 'min(90vw, 800px)'
        }}
      >
        {/* Step 1: Lord Ganesh Image (Drawn / Revealed Top-to-Bottom, starts immediately) */}
        <motion.img
          src={import.meta.env.BASE_URL + "LordGanesh.png"}
          alt="Lord Ganesh"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
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
          {/* Step 2: Shree Image ("Shree Ganeshay Namah" Written / Revealed Left-to-Right, delay 1.0s) */}
          <motion.img
            src={import.meta.env.BASE_URL + "shree.png"}
            alt="Shree"
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            transition={{ delay: 1.0, duration: 1.2, ease: 'easeInOut' }}
            style={{
              width: '100%',
              maxWidth: '320px',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }}
          />

          {/* Step 3: Mantra Image (Drawn / Revealed Top-to-Bottom, delay 2.0s = 1.0s after Shree) */}
          <motion.img
            src={import.meta.env.BASE_URL + "mantra.png"}
            alt="Mantra"
            className="ganesh-mantra-img"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ delay: 2.0, duration: 1.0, ease: 'easeInOut' }}
            style={{
              '--mantra-desktop-y': mantraDesktopOffsetY,
              width: '100%',
              maxWidth: '320px',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
            }}
          />
        </div>
      </div>
    </section>
  );
}
