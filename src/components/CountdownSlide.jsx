import { motion } from 'framer-motion';
import { scaleIn } from '../animations';
import { useCountdown } from '../hooks/useCountdown';

export default function CountdownSlide() {
  const time = useCountdown('2026-12-03T10:00:00');

  return (
    <section style={{
      padding: '80px 24px',
      background: '#1a0800',
      color: '#c9942a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(32px, 6vw, 52px)',
          margin: '0 0 32px',
          color: '#fdf8f0'
        }}>
          Counting down to forever
        </p>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          {[
            { label: 'Days', value: time.days ?? 0 },
            { label: 'Hours', value: time.hours ?? 0 },
            { label: 'Mins', value: time.minutes ?? 0 },
            { label: 'Secs', value: time.seconds ?? 0 },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(201, 148, 42, 0.1)',
              border: '1px solid rgba(201, 148, 42, 0.3)',
              borderRadius: '12px',
              padding: 'clamp(12px, 3vw, 24px) clamp(8px, 2vw, 20px)',
              minWidth: 'clamp(70px, 12vw, 110px)',
              backdropFilter: 'blur(4px)'
            }}>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 'bold',
                lineHeight: 1,
                marginBottom: '8px'
              }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(11px, 1.5vw, 16px)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#fdf8f0'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
