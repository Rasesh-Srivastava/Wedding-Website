import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GaneshSlide({ onComplete }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img1Path = import.meta.env.BASE_URL + "LordGanesh.png";
    const img2Path = import.meta.env.BASE_URL + "mantra.png";

    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        setIsLoaded(true);
      }
    };

    const img1 = new Image();
    const img2 = new Image();

    img1.src = img1Path;
    img2.src = img2Path;

    // Check if already cached in browser memory
    if (img1.complete) handleLoad();
    else {
      img1.onload = handleLoad;
      img1.onerror = handleLoad;
    }

    if (img2.complete) handleLoad();
    else {
      img2.onload = handleLoad;
      img2.onerror = handleLoad;
    }

    // Safety fallback: force load state after 6 seconds if network stalls
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 6000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // 5-second timer starts ONLY after images are fully loaded
  useEffect(() => {
    if (isLoaded && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000); // 5.0 seconds total duration AFTER images are loaded
      return () => clearTimeout(timer);
    }
  }, [isLoaded, onComplete]);

  return (
    <section
      className="ganesh-section"
      style={{
        padding: '20px 24px',
        background: '#152025',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        borderBottom: '1px solid #2C3730',
        textAlign: 'center'
      }}
    >
      {!isLoaded ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          color: '#c9942a',
          fontFamily: "'EB Garamond', serif"
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            style={{
              width: '36px',
              height: '36px',
              border: '2px solid rgba(201, 148, 42, 0.2)',
              borderTop: '2px solid #c9942a',
              borderRadius: '50%'
            }}
          />
          <span style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8 }}>
            Loading Blessing...
          </span>
        </div>
      ) : (
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
      )}
    </section>
  );
}
