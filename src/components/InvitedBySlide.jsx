import { motion } from 'framer-motion';

export default function InvitedBySlide({
  groomName = "Dr. Ishank Johri",
  groomFather = "Dr. Ashwani Johri",
  groomMother = "Dr. Surabhi Johri",
  brideName = "Dr. Shivi Srivastava",
  brideFather = "Dr. Sandesh Kumar Srivastava",
  brideMother = "Dr. Neeta Srivastava"
}) {
  return (
    <section
      className="invited-by-section"
      style={{
        background: '#152025',
        borderBottom: '1px solid #2C3730',
        padding: '38px 24px',
        color: '#fdf8f0',
        width: '100%',
        boxSizing: 'border-box',
        textAlign: 'center'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}
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
          fontWeight: 'normal'
        }}>
          Invited By
        </h2>

        {/* 2 Columns Container */}
        <div className="invited-by-grid">
          {/* Groom Section */}
          <div className="groom-column">
            <div className="family-card">
              <span className="family-role-label">GROOM</span>
              <h3 className="family-person-name">{groomName}</h3>
              <div className="family-card-divider" />
              <span className="family-parents-label">GROOM'S PARENTS</span>
              <p className="family-parents-name">{groomFather}</p>
              <p className="family-parents-name">{groomMother}</p>
            </div>
          </div>

          {/* Bride Section */}
          <div className="bride-column">
            <div className="family-card">
              <span className="family-role-label">BRIDE</span>
              <h3 className="family-person-name">{brideName}</h3>
              <div className="family-card-divider" />
              <span className="family-parents-label">BRIDE'S PARENTS</span>
              <p className="family-parents-name">{brideFather}</p>
              <p className="family-parents-name">{brideMother}</p>
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
          We look forward to celebrating with you!
        </p>
      </motion.div>
    </section>
  );
}
