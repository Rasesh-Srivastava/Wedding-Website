import { motion } from 'framer-motion';

export default function ShowcaseSlide({
  groomImgSrc = import.meta.env.BASE_URL + 'couple.png', // falls back to couple.png
  brideImgSrc = import.meta.env.BASE_URL + 'couple2.png' // falls back to couple2.png
}) {
  return (
    <section style={{
      padding: '80px 24px',
      background: '#152025', // deep elegant background (darker bg)
      color: '#fdf8f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderBottom: '1px solid #2C3730',
      minHeight: '100vh',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Global Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px', width: '100%', zIndex: 10 }}>
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(10px, 1.5vw, 13px)',
          color: '#fdf8f0',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: '0 0 8px 0',
          opacity: 0.95
        }}>
          With love and blessings
        </p>
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(36px, 8vw, 56px)',
          color: '#c9942a',
          margin: 0,
          fontWeight: 'normal'
        }}>
          The Happy Couple
        </h2>
      </div>

      <div className="showcase-container" style={{ zIndex: 10 }}>
        {/* Groom's Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="showcase-column"
        >
          {/* Photo Wrapper */}
          <div className="photo-wrapper">
            <img src={groomImgSrc} alt="Groom" />
          </div>
          <h3 className="showcase-name">Ishank</h3>
          <p className="showcase-title">The Groom</p>
          <p className="showcase-bio">
            A gentleman with a heart of gold, carrying a beautiful dream of love. Ready to walk hand-in-hand towards a lifetime of happiness, laughter, and forever.
          </p>

          {/* Groom's Blessed by Elders Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              background: 'rgba(26, 41, 47, 0.6)',
              border: '1px solid rgba(201, 148, 42, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              marginTop: '28px',
              width: '100%',
              maxWidth: '320px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(4px)',
              textAlign: 'center',
              boxSizing: 'border-box'
            }}
          >
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(12px, 1.8vw, 14px)',
              letterSpacing: '2px',
              color: '#c9942a',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
              fontWeight: 'bold'
            }}>
              Blessed by Elders
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Section 1: Parents */}
              <div>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  color: '#c9942a',
                  textTransform: 'uppercase',
                  margin: '0 0 4px 0',
                  fontWeight: 'bold',
                  opacity: 0.9,
                  textAlign: 'center'
                }}>
                  Parents
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: '0 0 2px 0',
                  textAlign: 'center'
                }}>
                  Dr. Ashwani Johri
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Dr. Surabhi Johri
                </p>
              </div>
              
              <div style={{ width: '40px', height: '1px', background: 'rgba(201, 148, 42, 0.2)', margin: '2px auto' }} />

              {/* Section 2: Dada & Dadi */}
              <div>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  color: '#c9942a',
                  textTransform: 'uppercase',
                  margin: '0 0 4px 0',
                  fontWeight: 'bold',
                  opacity: 0.9,
                  textAlign: 'center'
                }}>
                  Dada & Dadi
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: '0 0 2px 0',
                  textAlign: 'center'
                }}>
                  Late Mr. Narendra Mohan Saxena
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Late Smt. Surya Prabha Saxena
                </p>
              </div>

              <div style={{ width: '40px', height: '1px', background: 'rgba(201, 148, 42, 0.2)', margin: '2px auto' }} />

              {/* Section 3: Nana & Nani */}
              <div>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  color: '#c9942a',
                  textTransform: 'uppercase',
                  margin: '0 0 4px 0',
                  fontWeight: 'bold',
                  opacity: 0.9,
                  textAlign: 'center'
                }}>
                  Nana & Nani
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: '0 0 2px 0',
                  textAlign: 'center'
                }}>
                  Late Mr. Shishir Kumar
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Smt. Pratima Shrivastav
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider (visible on desktop only, hidden on mobile) */}
        <div className="showcase-divider" />

        {/* Bride's Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="showcase-column"
        >
          {/* Photo Wrapper */}
          <div className="photo-wrapper">
            <img src={brideImgSrc} alt="Bride" />
          </div>
          <h3 className="showcase-name">Shivi</h3>
          <p className="showcase-title">The Bride</p>
          <p className="showcase-bio">
            A vision of grace and beauty, ready to embark on a sweet adventure of love. Eager to write a story of tomorrow alongside her dream partner.
          </p>

          {/* Bride's Blessed by Elders Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              background: 'rgba(26, 41, 47, 0.6)',
              border: '1px solid rgba(201, 148, 42, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              marginTop: '28px',
              width: '100%',
              maxWidth: '320px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(4px)',
              textAlign: 'center',
              boxSizing: 'border-box'
            }}
          >
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(12px, 1.8vw, 14px)',
              letterSpacing: '2px',
              color: '#c9942a',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
              fontWeight: 'bold'
            }}>
              Blessed by Elders
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Section 1: Parents */}
              <div>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  color: '#c9942a',
                  textTransform: 'uppercase',
                  margin: '0 0 4px 0',
                  fontWeight: 'bold',
                  opacity: 0.9,
                  textAlign: 'center'
                }}>
                  Parents
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: '0 0 2px 0',
                  textAlign: 'center'
                }}>
                  Dr. Sandesh Kumar Srivastava
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Dr. Neeta Srivastava
                </p>
              </div>
              
              <div style={{ width: '40px', height: '1px', background: 'rgba(201, 148, 42, 0.2)', margin: '2px auto' }} />

              {/* Section 2: Dada & Dadi */}
              <div>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  color: '#c9942a',
                  textTransform: 'uppercase',
                  margin: '0 0 4px 0',
                  fontWeight: 'bold',
                  opacity: 0.9,
                  textAlign: 'center'
                }}>
                  Dada & Dadi
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: '0 0 2px 0',
                  textAlign: 'center'
                }}>
                  Late Dr. Suresh Chandra Srivastava
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Smt. Rajkumari
                </p>
              </div>

              <div style={{ width: '40px', height: '1px', background: 'rgba(201, 148, 42, 0.2)', margin: '2px auto' }} />

              {/* Section 3: Nana & Nani */}
              <div>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  color: '#c9942a',
                  textTransform: 'uppercase',
                  margin: '0 0 4px 0',
                  fontWeight: 'bold',
                  opacity: 0.9,
                  textAlign: 'center'
                }}>
                  Nana & Nani
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: '0 0 2px 0',
                  textAlign: 'center'
                }}>
                  Late Mr. Devi Shankar Lal
                </p>
                <p style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: '14px',
                  color: '#fdf8f0',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  Late Smt. Radha Rani
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
