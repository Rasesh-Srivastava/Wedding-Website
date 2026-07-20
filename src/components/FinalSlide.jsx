import { motion } from 'framer-motion';

export default function FinalSlide() {
  return (
    <section style={{
      padding: '80px 24px',
      background: '#1a0800',
      color: '#fdf8f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      minHeight: '40vh',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(18px, 3.5vw, 26px)',
          margin: '0 0 24px',
          fontStyle: 'italic',
          color: 'rgba(253, 248, 240, 0.8)'
        }}>
          We can't wait to celebrate with you!
        </p>

        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(48px, 10vw, 80px)',
          margin: '0 0 16px',
          color: '#c9942a',
          fontWeight: 'normal'
        }}>
          Priya & Vikram
        </h2>

        <div style={{ color: '#c9942a', fontSize: 'clamp(20px, 4vw, 32px)' }}>
          ♥
        </div>
      </motion.div>
    </section>
  );
}
