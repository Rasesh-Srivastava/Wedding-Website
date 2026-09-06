import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Rose Petal Colors: Rich Crimson, Rose Red, Warm Coral, Gold Accent
const PETAL_COLORS = [
  { main: '#d62828', secondary: '#9e1b1b', edge: '#590d0d' }, // Deep Crimson
  { main: '#e63946', secondary: '#b71c1c', edge: '#6b0000' }, // Classic Rose Red
  { main: '#ff758f', secondary: '#c9184a', edge: '#800f2f' }, // Warm Rose Pink
  { main: '#c9942a', secondary: '#9b6c16', edge: '#593b00' }, // Rose Gold Accent
];

function useRosePetalsCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle count optimized for 60 FPS performance on mobile and desktop
    const particleCount = width < 768 ? 26 : 44;
    const petals = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 10, // 10px to 18px
      speedY: Math.random() * 0.3 + 0.7, // Balanced falling speed (0.7 - 1.0 px/frame)
      speedX: Math.random() * 0.25 - 0.125, // Soft horizontal drift
      angle: Math.random() * Math.PI * 2,
      angularSpeed: Math.random() * 0.008 - 0.004, // Very slow rotation
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.012 + 0.006, // Gentle slow 3D sway
      opacity: Math.random() * 0.4 + 0.45,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]
    }));

    let time = 0;

    const render = () => {
      time += 0.006;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        // Physics update
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.wobble) * 0.25;
        p.angle += p.angularSpeed;
        p.wobble += p.wobbleSpeed;

        // Reset when falling off bottom
        if (p.y > height + 30) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        // Keep inside horizontal bounds
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Draw Organic Rose Petal Shape with 3D Fluttering
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(Math.cos(p.wobble), 1); // 3D flip effect

        const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        grad.addColorStop(0, p.color.main);
        grad.addColorStop(0.7, p.color.secondary);
        grad.addColorStop(1, p.color.edge);

        ctx.fillStyle = grad;
        ctx.globalAlpha = p.opacity;

        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.95, p.size * 0.4, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.95, p.size * 0.4, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [canvasRef]);
}

export const DEFAULT_EVENTS = [
  {
    id: 'mehendi',
    date: 'DEC 2, 2026',
    fancyName: 'Henna Hues',
    actualName: 'Mehendi Ceremony',
    time: '10:00 AM Onwards',
    venue: 'Amoha Hall',
    dressCode: 'Green & Floral Festive',
    description: 'A sacred morning of henna, music and auspicious blessings.',
    icon: import.meta.env.BASE_URL + 'leaf.png',
    caricature: import.meta.env.BASE_URL + 'CARICATURE 5.png',
    fancyNamePaddingTop: '0px'
  },
  {
    id: 'sangeet',
    date: 'DEC 2, 2026',
    fancyName: 'Glitter & Grooves',
    actualName: 'Sangeet Night',
    time: '6:30 PM Onwards',
    venue: 'Sadhya Hall',
    dressCode: 'Glamorous Evening Wear',
    description: 'Dance, sing, and celebrate the union of two families under the stars.',
    icon: import.meta.env.BASE_URL + 'music.png',
    caricature: import.meta.env.BASE_URL + 'CARICATURE 2.png',
    fancyNamePaddingTop: '0px'
  },
  {
    id: 'haldi',
    date: 'DEC 3, 2026',
    fancyName: 'Turmeric Twist',
    actualName: 'Haldi Carnival',
    time: '11:00 AM Onwards',
    venue: 'Mosaic Alfresco',
    dressCode: 'Shades of Yellow',
    description: 'A morning of auspicious turmeric, laughter, and joyful celebrations.',
    icon: import.meta.env.BASE_URL + 'star.png',
    caricature: import.meta.env.BASE_URL + 'CARICATURE 6.png',
    fancyNamePaddingTop: '0px'
  },
  {
    id: 'wedding',
    date: 'DEC 3, 2026',
    fancyName: 'Serenade of Souls',
    actualName: 'Wedding Ceremony',
    time: '7:30 PM Onwards',
    venue: 'Kalpatru Lawn',
    dressCode: 'Traditional Royal Attire',
    description: 'Where two souls unite in sacred Pheras and eternal love.',
    icon: import.meta.env.BASE_URL + 'garland.png',
    caricature: import.meta.env.BASE_URL + 'CARICATURE 1.png',
    fancyNamePaddingTop: '0px'
  },
  {
    id: 'phere',
    date: 'DEC 4, 2026',
    fancyName: 'Petals & Promises',
    actualName: 'Saptapadi',
    time: '1:00 AM Onwards',
    venue: 'Mosaic Alfresco',
    dressCode: 'Traditional Royal Attire',
    description: 'Where two souls unite in sacred Pheras and eternal love.',
    icon: import.meta.env.BASE_URL + 'fire.png',
    caricature: import.meta.env.BASE_URL + 'CARICATURE 3.png',
    fancyNamePaddingTop: '0px'
  },
  {
    id: 'reception',
    date: 'DEC 7, 2026',
    fancyName: 'Twirl into Togetherness',
    actualName: 'Aashirwad',
    time: '7:00 PM Onwards',
    venue: 'Banquet Hall',
    dressCode: 'Traditional Royal Attire',
    description: 'Where two souls unite in sacred Pheras and eternal love.',
    icon: import.meta.env.BASE_URL + 'ring.png',
    caricature: import.meta.env.BASE_URL + 'CARICATURE 4.png',
    fancyNamePaddingTop: '6px'
  }
];

export default function WeddingEvents({ events = DEFAULT_EVENTS }) {
  const canvasRef = useRef(null);
  useRosePetalsCanvas(canvasRef);

  return (
    <section className="events-section">
      {/* Falling Rose Petals Canvas Background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Slide Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '52px', width: '100%', zIndex: 10 }}
      >
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(44px, 9vw, 72px)',
          color: '#c9942a',
          margin: 0,
          fontWeight: 'normal'
        }}>
          Wedding Events
        </h2>
      </motion.div>

      {/* Events Timeline Container */}
      <div className={`events-timeline-wrapper ${events.length === 1 ? 'single-event-wrapper' : ''}`}>
        {/* Central Vertical Line - Desktop Only (hidden if single event) */}
        {events.length > 1 && <div className="events-center-line" />}

        {/* Map over Events */}
        {events.map((evt, index) => {
          const isSingle = events.length === 1;
          const isLeft = isSingle ? true : index % 2 === 0;
          return (
            <div
              key={evt.id || index}
              className={`event-row ${isSingle ? 'single-event-row' : (isLeft ? 'left-event' : 'right-event')}`}
            >
              {/* Connector Line (Desktop Only) */}
              {!isSingle && <div className="event-connector" />}

              {/* Central Marker (Desktop Only) */}
              {!isSingle && (
                <div className="event-marker-desktop">
                  {typeof evt.icon === 'string' && (evt.icon.includes('.') || evt.icon.startsWith('/') || evt.icon.startsWith('http')) ? (
                    <img
                      src={evt.icon}
                      alt={evt.fancyName}
                      style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                    />
                  ) : typeof evt.icon === 'string' ? (
                    <span>{evt.icon}</span>
                  ) : (
                    evt.icon || <span>✦</span>
                  )}
                </div>
              )}

              {/* Event Card Component */}
              <motion.div
                initial={{ opacity: 0, y: 25, x: isSingle ? 0 : (isLeft ? -25 : 25) }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="event-card"
              >
                {/* Event Caricature Accent */}
                {evt.caricature && (
                  <div
                    className={`event-caricature-wrapper ${isLeft ? 'caricature-left' : 'caricature-right'}`}
                    style={{
                      position: 'absolute',
                      top: 'clamp(-40px, -9vw, -30px)',
                      [isLeft ? 'left' : 'right']: 'clamp(-12px, -2vw, -6px)',
                      zIndex: 10,
                      pointerEvents: 'none'
                    }}
                  >
                    <img
                      src={evt.caricature}
                      alt={`${evt.fancyName} Caricature`}
                      style={{
                        height: 'clamp(98px, 22.8vw, 146px)',
                        width: 'auto',
                        maxWidth: 'clamp(95px, 21vw, 138px)',
                        objectFit: 'contain',
                        objectPosition: 'bottom center',
                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                        display: 'block'
                      }}
                    />
                  </div>
                )}
                {/* Date Badge */}
                <div className="event-date-badge-wrapper">
                  <span className="event-date-badge">{evt.date}</span>
                </div>

                {/* Fancy Event Name (using 'Great Vibes', cursive) */}
                <h3
                  className="event-fancy-name"
                  style={{
                    ...(evt.headingColor ? { color: evt.headingColor } : {}),
                    '--desktop-padding-top': evt.fancyNamePaddingTop || '0px'
                  }}
                >
                  {evt.fancyName}
                </h3>

                {/* Actual Event Name */}
                <p className="event-actual-name">{evt.actualName}</p>

                {/* Decorative Divider */}
                <div className="event-card-divider" />

                {/* Details Row: Time & Venue */}
                <div className="event-details-row">
                  <span className="event-detail-item">{evt.time}</span>
                  <span className="event-detail-bullet">•</span>
                  <span className="event-detail-item">{evt.venue}</span>
                </div>

                {/* Dress Code */}
                {evt.dressCode && (
                  <p className="event-dress-code">
                    <span style={{ opacity: 0.7 }}>Dress Code:</span> {evt.dressCode}
                  </p>
                )}

                {/* Description */}
                {evt.description && (
                  <p className="event-description">
                    "{evt.description}"
                  </p>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
