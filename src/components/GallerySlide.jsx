import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Automatically discover all photos inside public/moments/ folder via Vite globbing
const momentModules = import.meta.glob('/public/moments/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });

const globbedImages = Object.keys(momentModules).map((path) => {
  const cleanPath = path.replace('/public/', '');
  return import.meta.env.BASE_URL + cleanPath;
});

const fallbackImages = [
  import.meta.env.BASE_URL + 'moments/couple.png',
  import.meta.env.BASE_URL + 'moments/couple2.png'
];

const images = globbedImages.length > 0 ? globbedImages : fallbackImages;

export default function GallerySlide() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isLit, setIsLit] = useState(false); // Initially low light / dimmed
  const [isPulling, setIsPulling] = useState(false);
  const [isRopeHovered, setIsRopeHovered] = useState(false);

  const [useCustomRope, setUseCustomRope] = useState(true);

  const currentIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const handlePullRope = () => {
    setIsPulling(true);
    setTimeout(() => {
      setIsLit((prev) => !prev);
      setIsPulling(false);
    }, 200);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section style={{
      padding: '60px 16px',
      background: '#1A292F', // lighter bg (alternating)
      color: '#c9942a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      borderBottom: '1px solid #2C3730',
      minHeight: '100vh',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Interactive Lamp Pull Rope (Top Right) */}
      <div 
        onClick={handlePullRope}
        onMouseEnter={() => setIsRopeHovered(true)}
        onMouseLeave={() => setIsRopeHovered(false)}
        onTouchStart={() => setIsRopeHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsRopeHovered(false), 2500)}
        style={{
          position: 'absolute',
          top: 0,
          right: 'clamp(16px, 4vw, 32px)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          touchAction: 'manipulation'
        }}
      >
        {/* Pull Cord & Knob Handle */}
        <motion.div
          animate={{ y: isPulling ? 26 : 0 }}
          transition={{ type: 'spring', stiffness: 450, damping: 15 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {useCustomRope ? (
            <img
              src={import.meta.env.BASE_URL + 'pull_rope.png'}
              alt="Pull Rope"
              onError={() => setUseCustomRope(false)}
              style={{
                width: 'clamp(36px, 8vw, 52px)',
                height: 'auto',
                maxHeight: '130px',
                objectFit: 'contain',
                filter: isLit 
                  ? 'drop-shadow(0 0 10px rgba(201, 148, 42, 0.8))' 
                  : 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
                transition: 'filter 0.3s ease',
                pointerEvents: 'none'
              }}
            />
          ) : (
            <>
              {/* Thin Gold Metallic Cord */}
              <div style={{
                width: '2px',
                height: '65px',
                background: 'linear-gradient(to bottom, #c9942a, #fbeaa6, #c9942a)',
                boxShadow: '0 0 6px rgba(201, 148, 42, 0.4)'
              }} />

              {/* Brass / Gold Knob Handle */}
              <div style={{
                width: '20px',
                height: '30px',
                borderRadius: '10px 10px 14px 14px',
                background: 'radial-gradient(circle at 30% 30%, #fbeaa6 0%, #c9942a 60%, #8a6214 100%)',
                border: '1px solid #ffe89c',
                boxShadow: isLit 
                  ? '0 0 14px #c9942a, 0 4px 8px rgba(0,0,0,0.5)' 
                  : '0 4px 8px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Metallic groove accent */}
                <div style={{
                  width: '12px',
                  height: '2px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '1px'
                }} />
              </div>
            </>
          )}
        </motion.div>

        {/* Hover-only Text Label Below Rope */}
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: isRopeHovered ? 1 : 0, y: isRopeHovered ? 0 : -4 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '11px',
            color: '#c9942a',
            letterSpacing: '1px',
            marginTop: '8px',
            textTransform: 'uppercase',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            fontWeight: 'bold',
            pointerEvents: 'none'
          }}
        >
          {isLit ? "Turn Lights Off" : "Turn Lights On"}
        </motion.span>
      </div>

      {/* Main Page Content Wrapper (Dimmers when isLit is false) */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'filter 0.8s ease, opacity 0.8s ease',
        filter: isLit ? 'brightness(1) contrast(1)' : 'brightness(0.3) contrast(1.1)',
        opacity: isLit ? 1 : 0.45,
        pointerEvents: isLit ? 'auto' : 'none'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '28px', width: '100%', padding: '0 8px', boxSizing: 'border-box' }}
        >
          <h2 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(38px, 8vw, 64px)',
            color: '#c9942a',
            margin: '0 0 8px',
            fontWeight: 'normal'
          }}>
            Moments Together
          </h2>
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(14px, 2.2vw, 18px)',
            color: '#fdf8f0',
            letterSpacing: '1px',
            margin: 0,
            opacity: 0.85
          }}>
            Swipe the cards to walk through our journey together
          </p>
        </motion.div>

        {/* Swipeable Carousel Container */}
        <div style={{
          position: 'relative',
          width: 'min(340px, 82vw)',
          height: 'clamp(380px, 60vh, 500px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                border: '1px solid rgba(201, 148, 42, 0.3)',
                background: '#152025',
                boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                cursor: 'grab',
                touchAction: 'pan-y'
              }}
              whileTap={{ cursor: 'grabbing' }}
            >
              <img
                src={images[currentIndex]}
                alt={`Moment ${currentIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none'
                }}
              />
              {/* Image counter badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(21, 32, 37, 0.8)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(201, 148, 42, 0.4)',
                borderRadius: '20px',
                padding: '4px 12px',
                fontFamily: "'EB Garamond', serif",
                fontSize: '12px',
                color: '#c9942a',
                letterSpacing: '1px'
              }}>
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={() => paginate(-1)}
            style={{
              position: 'absolute',
              left: 'clamp(-12px, -2vw, -16px)',
              zIndex: 10,
              background: 'rgba(21, 32, 37, 0.85)',
              border: '1px solid #c9942a',
              color: '#c9942a',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s',
              touchAction: 'manipulation'
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => paginate(1)}
            style={{
              position: 'absolute',
              right: 'clamp(-12px, -2vw, -16px)',
              zIndex: 10,
              background: 'rgba(21, 32, 37, 0.85)',
              border: '1px solid #c9942a',
              color: '#c9942a',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s',
              touchAction: 'manipulation'
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>

        {/* Pagination Dots */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '28px',
          justifyContent: 'center'
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > currentIndex ? 1 : -1])}
              style={{
                width: i === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentIndex ? '#c9942a' : 'rgba(201, 148, 42, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Illuminated Gold Line (Appears when lights are turned on) */}
        <AnimatePresence>
          {isLit && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(26px, 5vw, 38px)',
                color: '#c9942a',
                margin: '24px 0 0',
                textAlign: 'center',
                fontWeight: 'normal',
                letterSpacing: '1px'
              }}
            >
              Beautiful Moments Illuminate
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
