import { useState } from 'react'
import { useScroll, useSpring, motion, AnimatePresence } from 'framer-motion'
import EnvelopeIntro from './components/EnvelopeIntro'
import CountdownSlide from './components/CountdownSlide'
import StorySlide from './components/StorySlide'
import EventSlide from './components/EventSlide'
import GallerySlide from './components/GallerySlide'
import RSVPSlide from './components/RSVPSlide'
import FinalSlide from './components/FinalSlide'
import './App.css'

function App() {
  const [showSite, setShowSite] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      {/* Envelope intro overlay */}
      <AnimatePresence>
        {!showSite && (
          <EnvelopeIntro onComplete={() => setShowSite(true)} />
        )}
      </AnimatePresence>

      {/* Main wedding site content */}
      {showSite && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* ── Hero Section ── */}
          <section
            style={{
              position: 'relative',
              height: '100svh',
              overflow: 'hidden',
            }}
          >
            {/* Background photo */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <img
                src="/couple.png"
                alt="Couple"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 10%',
                }}
              />
              {/* Semi-transparent overlay for text readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)',
                }}
              />
            </div>

            {/* Overlay content */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Top — Monogram / subtitle */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ padding: '36px 24px 0', textAlign: 'center' }}
              >
                <div
                  className="hero-monogram"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px',
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(255,255,255,0.15)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: '28px',
                      color: '#fff',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    P&V
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 'clamp(14px, 2vw, 18px)',
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: 'clamp(3px, 0.5vw, 5px)',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  Wedding Celebration
                </p>
              </motion.div>

              {/* Spacer — so couple faces stay visible */}
              <div style={{ flex: 1, minHeight: '180px' }} />

              {/* Bottom — Frosted glass block with names */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  background: 'rgba(15,8,2,0.3)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  padding: 'clamp(20px, 4vw, 40px) clamp(24px, 5vw, 60px) clamp(36px, 6vw, 50px)',
                  margin: '0 auto 24px',
                  maxWidth: 'min(90vw, 600px)',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(48px, 10vw, 80px)',
                    color: '#fff',
                    margin: '0 0 4px',
                    lineHeight: 1.2,
                  }}
                >
                  Priya
                </p>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 'clamp(14px, 2vw, 18px)',
                    color: 'rgba(255,255,255,0.8)',
                    letterSpacing: 'clamp(4px, 1vw, 8px)',
                    textTransform: 'uppercase',
                    margin: 'clamp(4px, 1vw, 12px) 0',
                  }}
                >
                  — and —
                </p>
                <p
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(48px, 10vw, 80px)',
                    color: '#fff',
                    margin: '0 0 12px',
                    lineHeight: 1.2,
                  }}
                >
                  Vikram
                </p>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 'clamp(15px, 2.5vw, 22px)',
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: 'clamp(1px, 0.5vw, 3px)',
                    margin: 0,
                  }}
                >
                  are getting married!
                </p>
              </motion.div>
            </div>
          </section>

          <CountdownSlide />
          
          <StorySlide />
          
          <EventSlide
            label="THE FIRST HUES OF LOVE"
            heading="Mehendi"
            headingColor="#1e5c2a"
            description="Begin with henna, music and memories."
            date="13 Feb 2027"
            time="04:00 PM onwards"
            venue="The Royal Gardens, Mumbai"
            dressCode="Green & Floral"
          />

          <EventSlide
            label="A NIGHT OF MELODIES"
            heading="Sangeet"
            headingColor="#8b1a6d"
            description="Dance, sing, and celebrate the union of two souls."
            date="13 Feb 2027"
            time="08:00 PM onwards"
            venue="Grand Ballroom, Taj Hotel"
            dressCode="Glamorous Indian Evening Wear"
          />

          <EventSlide
            label="THE GOLDEN RITUAL"
            heading="Haldi"
            headingColor="#d4a017"
            description="A sacred tradition of blessings and turmeric."
            date="14 Feb 2027"
            time="10:00 AM onwards"
            venue="Courtyard, Taj Hotel"
            dressCode="Shades of Yellow"
          />

          <EventSlide
            label="THE SACRED UNION"
            heading="Wedding Ceremony"
            headingColor="#c9942a"
            description="Where two hearts become one, forever."
            date="15 Feb 2027"
            time="10:00 AM onwards"
            venue="The Royal Gardens, Mumbai"
            dressCode="Traditional Indian"
          />

          <EventSlide
            label="AN EVENING OF JOY"
            heading="Reception"
            headingColor="#2a4a7f"
            description="Dine, dance, and make memories that last a lifetime."
            date="15 Feb 2027"
            time="07:30 PM onwards"
            venue="Grand Ballroom, Taj Hotel"
            dressCode="Black Tie / Formal"
          />

          <GallerySlide />
          
          <RSVPSlide />
          
          <FinalSlide />

          {/* ── Scroll progress indicator ── */}
          <motion.div
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              width: '3px',
              height: '100vh',
              background: 'linear-gradient(180deg, #c9942a, #f0d080)',
              transformOrigin: 'top',
              scaleY,
              zIndex: 9999,
            }}
          />
        </motion.div>
      )}
    </>
  )
}

export default App
