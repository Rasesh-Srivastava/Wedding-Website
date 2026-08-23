import { motion } from 'framer-motion';

export default function FinalSlide() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        position: 'relative',
        background: '#1A292F',
        borderTop: '1px solid #2C3730',
        padding: '18px 16px 32px 16px',
        color: '#fdf8f0',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Center Line: Handcrafted with love by Rasesh Srivastava */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          textAlign: 'center'
        }}
      >
        <span style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(13px, 2.2vw, 17px)',
          color: '#fdf8f0',
          letterSpacing: '0.8px'
        }}>
          Handcrafted with love by
        </span>
        <span
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: '#c9942a',
            fontSize: 'clamp(22px, 3.8vw, 32px)',
            fontWeight: 'normal',
            lineHeight: 1
          }}
        >
          Rasesh Srivastava
        </span>
      </motion.div>

      {/* Bottom Right Line: Small Copyright & Couple Names with Colon */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '16px',
          fontFamily: "'EB Garamond', serif",
          fontSize: '9.5px',
          color: 'rgba(253, 248, 240, 0.55)',
          letterSpacing: '0.8px',
          textTransform: 'uppercase'
        }}
      >
        © {currentYear}: Shivi &amp; Ishank
      </div>
    </footer>
  );
}
