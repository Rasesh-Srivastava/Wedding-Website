import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SaveTheDateSlide({
  stampImgSrc = import.meta.env.BASE_URL + 'stamp.png',
  onOpen
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [useFallbackStamp, setUseFallbackStamp] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  return (
    <section
      className="save-the-date-section"
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(340px, 48vh, 440px)',
        minHeight: '340px',
        overflow: 'hidden',
        background: '#152025',
        borderBottom: '1px solid #2C3730',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      }}
    >
      {/* 1. Underlying Revealed Invitation Content (zIndex: 5) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '98vw',
          width: '98%',
          zIndex: 5,
          pointerEvents: isOpen ? 'auto' : 'none',
          boxSizing: 'border-box'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: isOpen ? 1 : 0.15,
            scale: isOpen ? 1 : 0.92,
          }}
          transition={{ duration: 0.8, delay: isOpen ? 0.3 : 0 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%'
          }}
        >
          {/* Line 1: Reminder Message */}
          <h2 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(23px, 4.6vw, 56px)',
            color: '#c9942a',
            margin: '0 auto 16px auto',
            width: '100%',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            lineHeight: 1.2,
            fontWeight: 'normal',
            textShadow: '0 4px 16px rgba(0,0,0,0.4)'
          }}>
            <span style={{ fontFamily: "'Pinyon Script', cursive", fontSize: '1.15em', marginRight: '1px', display: 'inline-block' }}>A</span>
            &nbsp;little reminder to keep these dates free for us.
          </h2>

          {/* Decorative Gold Line */}
          <div style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #c9942a, transparent)',
            margin: '0 auto 24px auto'
          }} />

          {/* Line 2: Wednesday, December 2, 2026 */}
          <p style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
            fontSize: 'clamp(18px, 3.2vw, 28px)',
            color: '#fdf8f0',
            letterSpacing: '2.5px',
            margin: '0 0 12px 0',
            fontWeight: '600',
            lineHeight: 1.3,
            textTransform: 'uppercase'
          }}>
            Wednesday, December 2
          </p>

          {/* Line 3: and */}
          <p style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(24px, 4vw, 34px)',
            color: '#c9942a',
            margin: '4px 0 12px 0',
            fontStyle: 'italic'
          }}>
            and
          </p>

          {/* Line 4: Thursday, December 3, 2026 */}
          <p style={{
            fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
            fontSize: 'clamp(18px, 3.2vw, 28px)',
            color: '#fdf8f0',
            letterSpacing: '2.5px',
            margin: 0,
            fontWeight: '600',
            lineHeight: 1.3,
            textTransform: 'uppercase'
          }}>
            Thursday, December 3, 2026
          </p>
        </motion.div>
      </div>

      {/* 2. Left Flap (zIndex: 10) */}
      <motion.div
        animate={{ x: isOpen ? '-100%' : '0%' }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, #1A292F 0%, #152025 100%)',
          borderRight: '1px solid #c9942a',
          boxShadow: '4px 0 24px rgba(0,0,0,0.5)',
          boxSizing: 'border-box',
          zIndex: 10
        }}
      />

      {/* 3. Right Flap (zIndex: 10) */}
      <motion.div
        animate={{ x: isOpen ? '100%' : '0%' }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(225deg, #1A292F 0%, #152025 100%)',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.5)',
          boxSizing: 'border-box',
          zIndex: 10
        }}
      />

      {/* 4. Seal Button & Text Wrapper (DIRECT CHILD OF ROOT CONTAINER, OUTSIDE FLAPS, zIndex: 50) */}
      {!isOpen && (
        <div
          onClick={handleOpen}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            userSelect: 'none',
            touchAction: 'manipulation'
          }}
        >
          <AnimatePresence>
            <motion.div
              key="seal-anim"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 15 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Wax Seal Button */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 'clamp(95px, 20vw, 135px)',
                  height: 'clamp(95px, 20vw, 135px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 8px 24px rgba(180, 20, 20, 0.6))',
                  position: 'relative'
                }}
              >
                {!useFallbackStamp ? (
                  <img
                    src={stampImgSrc}
                    alt="S&I Red Stamp Wax Seal"
                    onError={() => setUseFallbackStamp(true)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #e63946 0%, #b71c1c 65%, #6b0000 100%)',
                    border: '3px solid #c9942a',
                    boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.3), 0 8px 20px rgba(0,0,0,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#c9942a',
                    fontFamily: "'Great Vibes', cursive"
                  }}>
                    <span style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.6)', margin: 0, padding: 0, textAlign: 'center' }}>
                      S&I
                    </span>
                    <span style={{ fontFamily: "'EB Garamond', serif", fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: '#fbeaa6', marginTop: '-4px', textAlign: 'center' }}>
                      Open
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Prompt Text directly below Seal Image */}
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 'clamp(11px, 2vw, 13px)',
                  color: '#c9942a',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginTop: '16px',
                  marginBottom: 0,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                }}
              >
                TAP SEAL TO UNVEIL
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
