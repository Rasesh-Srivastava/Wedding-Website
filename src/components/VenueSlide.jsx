import { motion } from 'framer-motion';

export default function VenueSlide({
  venueName = 'The Royal Palace Hotel',
  venueAddress = '123 Celebration Boulevard, Golden City, India',
  mapsUrl = 'https://maps.google.com',
  venueImgSrc = import.meta.env.BASE_URL + 'couple.png'
}) {
  return (
    <section style={{
      padding: '80px 24px',
      background: '#152025', // darker bg (alternating pattern)
      color: '#fdf8f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderBottom: '1px solid #2C3730',
      minHeight: '100vh',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '44px', width: '100%', zIndex: 10 }}
      >
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(48px, 10vw, 76px)',
          color: '#c9942a',
          margin: 0,
          fontWeight: 'normal'
        }}>
          The Venue
        </h2>
      </motion.div>

      {/* Main Responsive Venue Container */}
      <div className="venue-container" style={{ zIndex: 10 }}>
        {/* Left Column (Desktop) / Bottom Section (Mobile): Text & Get Directions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="venue-left"
        >
          {/* Venue Hotel Name */}
          <h3 style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(24px, 4vw, 36px)',
            color: '#c9942a',
            margin: '0 0 12px 0',
            fontWeight: 'bold',
            lineHeight: 1.2
          }}>
            {venueName}
          </h3>

          {/* Decorative Gold Divider */}
          <div style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, #c9942a, #fbeaa6)',
            margin: '0 0 20px 0',
            borderRadius: '1px'
          }} />

          {/* Venue Address */}
          <p style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(15px, 2.2vw, 19px)',
            color: '#fdf8f0',
            opacity: 0.9,
            lineHeight: 1.6,
            margin: '0 0 28px 0',
            maxWidth: '380px'
          }}>
            {venueAddress}
          </p>

          {/* Get Directions Button (Opens Google Maps in new tab) */}
          <motion.a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #dfa943 0%, #c9942a 100%)',
              color: '#152025',
              padding: '14px 32px',
              fontFamily: "'EB Garamond', serif",
              fontSize: '13px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              borderRadius: '30px',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(201, 148, 42, 0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            Get Directions
          </motion.a>
        </motion.div>

        {/* Right Column (Desktop) / Top Section (Mobile): Hotel Photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="venue-right"
        >
          <div style={{
            width: '100%',
            maxWidth: '440px',
            height: 'clamp(240px, 45vh, 320px)',
            borderRadius: '16px',
            border: '1px solid rgba(201, 148, 42, 0.3)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            background: '#1A292F',
            position: 'relative'
          }}>
            <img
              src={venueImgSrc}
              alt={venueName}
              onError={(e) => {
                // Fallback image if custom image fails to load
                e.target.onerror = null;
                e.target.src = import.meta.env.BASE_URL + 'couple.png';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
