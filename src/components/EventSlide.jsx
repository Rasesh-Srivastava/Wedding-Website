import { motion } from 'framer-motion';
import { fadeUp } from '../animations';

export default function EventSlide({
  label,
  heading,
  headingColor = '#c9942a',
  description,
  date,
  time,
  venue,
  dressCode,
  mapsUrl
}) {
  return (
    <section style={{
      padding: '60px 24px',
      background: '#fdf8f0', // cream
      color: '#1a0800', // text-dark
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{ width: '100%', maxWidth: 'min(90vw, 600px)' }}
      >
        <div style={{
          width: '60px',
          height: '2px',
          background: '#c9942a',
          margin: '0 auto 20px'
        }} />
        
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(12px, 2vw, 16px)',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: '#4a2208',
          margin: '0 0 10px'
        }}>
          {label}
        </p>
        
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(48px, 8vw, 72px)',
          color: headingColor,
          margin: '0 0 16px',
          fontWeight: 'normal'
        }}>
          {heading}
        </h2>
        
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(16px, 3vw, 24px)',
          fontStyle: 'italic',
          color: '#4a2208',
          margin: '0 0 32px',
          lineHeight: 1.5
        }}>
          {description}
        </p>
        
        <div style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'grid', gap: '16px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>📅</span>
              <p style={{ margin: 0, fontFamily: "'EB Garamond', serif", fontSize: 'clamp(15px, 2.5vw, 20px)' }}>{date}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>⏰</span>
              <p style={{ margin: 0, fontFamily: "'EB Garamond', serif", fontSize: 'clamp(15px, 2.5vw, 20px)' }}>{time}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>📍</span>
              <p style={{ margin: 0, fontFamily: "'EB Garamond', serif", fontSize: 'clamp(15px, 2.5vw, 20px)' }}>{venue}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>👔</span>
              <p style={{ margin: 0, fontFamily: "'EB Garamond', serif", fontSize: 'clamp(15px, 2.5vw, 20px)' }}>{dressCode}</p>
            </div>
          </div>
        </div>
        
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: '#c9942a',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: "'EB Garamond', serif",
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: 'clamp(13px, 2vw, 16px)',
              borderRadius: '24px',
              transition: 'all 0.2s'
            }}
          >
            Get Directions
          </a>
        )}
      </motion.div>
    </section>
  );
}