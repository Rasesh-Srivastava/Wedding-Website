import { motion } from 'framer-motion';
import DiwaliFireworksCanvas from './DiwaliFireworksCanvas';

export default function InvitedBySlide({
  grandMother = "Smt. Rajkumari",
  fatherName = "Dr. Sandesh Srivastava",
  motherName = "Dr. Neeta Srivastava",
  familyText = "And the entire Srivastava family, friends and relatives"
}) {
  return (
    <section
      className="invited-by-section"
      style={{
        position: 'relative',
        background: '#152025',
        borderBottom: '1px solid #2C3730',
        padding: '38px 24px',
        color: '#fdf8f0',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Diwali Fireworks & Sparkles Canvas */}
      <DiwaliFireworksCanvas />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '850px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {/* Top Invitation Text */}
        <p style={{
          fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
          fontSize: 'clamp(18px, 3.2vw, 24px)',
          color: '#fdf8f0',
          lineHeight: 1.6,
          margin: '0 auto 16px auto',
          maxWidth: '650px',
          fontStyle: 'italic',
          opacity: 0.95
        }}>
          Your presence is the greatest gift we could ask for
        </p>

        {/* Invited By Subheading */}
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(42px, 8vw, 64px)',
          color: '#c9942a',
          margin: '0 0 24px 0',
          fontWeight: 'normal',
          textShadow: '0 0 16px rgba(201, 148, 42, 0.4)'
        }}>
          Warm Regards
        </h2>

        {/* Centered Family Card */}
        <div className="invited-by-grid">
          <div className="bride-column">
            <div className="family-card">
              <p className="family-parents-name">{grandMother}</p>
              <p className="family-parents-name">{fatherName}</p>
              <p className="family-parents-name">{motherName}</p>
              <p className="family-parents-name">{familyText}</p>
            </div>
          </div>
        </div>

        {/* Bottom Closing Text */}
        <p style={{
          fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
          fontSize: 'clamp(18px, 3.2vw, 24px)',
          color: '#fdf8f0',
          lineHeight: 1.5,
          margin: '24px auto 0 auto',
          fontStyle: 'italic',
          opacity: 0.95
        }}>
          Let's gather, celebrate and make memories together!
        </p>
      </motion.div>
    </section>
  );
}
