import { motion } from 'framer-motion';
import { fadeUp } from '../animations';

export default function RSVPSlide() {
  return (
    <section style={{
      padding: '80px 24px',
      background: 'linear-gradient(135deg, #dfa943 0%, #c9942a 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
        style={{ width: '100%', maxWidth: 'min(90vw, 600px)' }}
      >
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(52px, 10vw, 80px)',
          margin: '0 0 16px',
          fontWeight: 'normal',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          Save the Date
        </h2>
        
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(24px, 5vw, 36px)',
          letterSpacing: 'clamp(2px, 1vw, 4px)',
          margin: '0 0 24px',
          fontWeight: 'bold'
        }}>
          03 . 12 . 2026
        </p>

        <div style={{
          width: '80px',
          height: '1px',
          background: '#fff',
          margin: '0 auto 32px',
          opacity: 0.6
        }} />

        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSd5fvzTaMHELro-RO9an2tTSlgYtXOttg1v23_kXOyAVv0qIw/viewform?usp=publish-editor"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            background: '#fff',
            color: '#c9942a',
            border: 'none',
            padding: '16px 40px',
            fontFamily: "'EB Garamond', serif",
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: 'clamp(14px, 2vw, 16px)',
            fontWeight: 'bold',
            borderRadius: '30px',
            textDecoration: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s'
          }}
        >
          RSVP Now
        </a>
      </motion.div>
    </section>
  );
}
