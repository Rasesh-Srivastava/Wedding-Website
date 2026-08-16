import { useState, useEffect, useRef } from 'react'
import { useScroll, useSpring, motion, AnimatePresence } from 'framer-motion'
import EnvelopeIntro from './components/EnvelopeIntro'
import CountdownSlide from './components/CountdownSlide'
import StorySlide from './components/StorySlide'
import EventSlide from './components/EventSlide'
import GallerySlide from './components/GallerySlide'
import RSVPSlide from './components/RSVPSlide'
import FinalSlide from './components/FinalSlide'
import GaneshSlide from './components/GaneshSlide'
import ShowcaseSlide from './components/ShowcaseSlide'
import './App.css'

function App() {
  const [stage, setStage] = useState(0) // 0: Envelope, 1: Ganesh, 2: Main Website
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  // Music player state
  const audioRef = useRef(null)
  const targetRef = useRef(null)
  const playBtnRef = useRef(null)
  const [musicStarted, setMusicStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Sync button position to the anchor target
  const syncButtonPosition = () => {
    if (targetRef.current && playBtnRef.current) {
      const rect = targetRef.current.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      playBtnRef.current.style.left = `${x}px`
      playBtnRef.current.style.top = `${y}px`
    }
  }

  // Handle event listeners and continuous animation frame sync for absolute precision
  useEffect(() => {
    window.addEventListener('resize', syncButtonPosition)
    window.addEventListener('scroll', syncButtonPosition, { passive: true })
    
    // Continuous loop to prevent alignment drift during transitions, scrolls, or layout shifts
    let frameId;
    const loop = () => {
      syncButtonPosition()
      frameId = requestAnimationFrame(loop)
    }
    
    if (stage >= 1) {
      frameId = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', syncButtonPosition)
      window.removeEventListener('scroll', syncButtonPosition)
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [stage, isPlaying])

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(import.meta.env.BASE_URL + 'music.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setMusicStarted(true)
        })
        .catch((err) => {
          console.error("Audio playback failed:", err)
        })
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => { if (audioRef.current) audioRef.current.pause() }
  }, [])

  useEffect(() => {
    if (stage === 1) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [stage])

  return (
    <>
      {/* Envelope intro overlay */}
      <AnimatePresence>
        {stage === 0 && (
          <EnvelopeIntro onComplete={() => setStage(1)} />
        )}
      </AnimatePresence>

      {/* Main wedding site content */}
      {stage >= 1 && (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* ── Hero Section ── */}
             <section
               style={{
                 position: 'relative',
                 minHeight: '100vh',
                 background: '#1A292F',
                 display: 'flex',
                 flexDirection: 'column',
                 justifyContent: 'space-between',
                 boxSizing: 'border-box',
                 borderBottom: '1px solid #2C3730',
                 paddingBottom: '24px'
               }}
             >
              {/* Top — Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ padding: '36px 24px 0', textAlign: 'center' }}
              >
              <img
                  src={import.meta.env.BASE_URL + 'Logo_woBG.png'}
                  alt="S&I Logo"
                  style={{
                    width: 'min(360px, 85vw)', /* 3x size on desktop (360px), safely scales down to 85% width on mobile */
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    margin: '0 auto',
                    display: 'block',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }}
                />
              </motion.div>

              {/* Music Player Container */}
              <div className="music-container">
                {/* Left Side (Desktop: Text | Mobile: Top Text) */}
                <div className="music-left" style={{ alignItems: 'center', textAlign: 'center' }}>
                  <h2
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 'clamp(14px, 2.5vw, 22px)',
                      color: '#c9942a',
                      letterSpacing: 'clamp(2px, 0.5vw, 6px)',
                      textTransform: 'uppercase',
                      margin: 0,
                      fontWeight: 'normal',
                      lineHeight: 1.2,
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    Tap to set the mood
                  </h2>
                  
                  {/* Subtitle - Desktop only */}
                  <AnimatePresence>
                    {isPlaying && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="desktop-subtitle"
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          style={{
                            fontFamily: "'EB Garamond', serif",
                            fontSize: 'clamp(13px, 1.8vw, 16px)',
                            color: '#fdf8f0',
                            opacity: 0.7,
                            fontStyle: 'italic',
                            margin: '0 0 16px 0',
                            textAlign: 'center',
                            width: '100%'
                          }}
                        >
                          Let the music play while you explore our story
                        </p>
                        <video
                          src={import.meta.env.BASE_URL + 'sound.mp4'}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="auto"
                          style={{
                            width: '100%',
                            maxWidth: '150px',
                            borderRadius: '12px',
                            border: '1px solid #2C3730',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            display: 'block',
                            margin: '0 auto',
                            pointerEvents: 'none'
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right Side (Desktop: Image | Mobile: Middle Image + Bottom Text) */}
                <div className="music-right">
                  {/* Stereo image with positionTarget anchor */}
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '100%',
                      maxWidth: '340px',
                    }}
                  >
                    <img
                      src={import.meta.env.BASE_URL + 'stereo.png'}
                      alt="Wedding Radio"
                      onLoad={syncButtonPosition}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))'
                      }}
                    />
                    
                    {/* Position target anchor element */}
                    <div
                      id="positionTarget"
                      ref={targetRef}
                      style={{
                        '--target-top': '78.8%',
                        '--target-left': '72.5%',
                        '--target-size': '10%',
                        '--target-offset-x': '0px',
                        position: 'absolute',
                        top: 'var(--target-top)',
                        left: 'calc(var(--target-left) + var(--target-offset-x))',
                        width: 'var(--target-size)',
                        height: 'var(--target-size)',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>

                  {/* Subtitle - Mobile only */}
                  <AnimatePresence>
                    {isPlaying && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mobile-subtitle"
                        style={{ overflow: 'hidden' }}
                      >
                        <p
                          style={{
                            fontFamily: "'EB Garamond', serif",
                            fontSize: 'clamp(13px, 2.2vw, 18px)',
                            color: '#fdf8f0',
                            opacity: 0.7,
                            fontStyle: 'italic',
                            margin: '0 0 16px 0',
                            textAlign: 'center',
                            width: '100%'
                          }}
                        >
                          Let the music play while you explore our story
                        </p>
                        <video
                          src={import.meta.env.BASE_URL + 'sound.mp4'}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="auto"
                          style={{
                            width: '100%',
                            maxWidth: '140px',
                            borderRadius: '12px',
                            border: '1px solid #2C3730',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            display: 'block',
                            margin: '0 auto',
                            pointerEvents: 'none'
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Overlaid Play/Pause Button positioned dynamically */}
              <button
                ref={playBtnRef}
                onClick={togglePlay}
                style={{
                  position: 'fixed',
                  zIndex: 1000,
                  transform: 'translate(-50%, -50%) scale(0.5)',
                  background: 'rgba(21, 32, 37, 0.75)',
                  border: '2px solid #c9942a',
                  borderRadius: '50%',
                  width: 'clamp(50px, 14vw, 70px)',
                  height: 'clamp(50px, 14vw, 70px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#c9942a',
                  fontSize: 'clamp(22px, 5vw, 30px)',
                  backdropFilter: 'blur(6px)',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Spacer — centering block and pushing content up */}
              <div style={{ flex: 1, minHeight: '40px' }} />
            </section>

            {/* ── Names Section (New Slide) ── */}
            <section
              style={{
                position: 'relative',
                minHeight: '100vh',
                background: '#152025', // darker bg (alternating)
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
                borderBottom: '1px solid #2C3730',
                padding: '80px 24px'
              }}
            >
              {/* Bottom — Elegant block with names */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  background: '#1A292F', // lighter bg card (contrasting)
                  border: '1px solid #2C3730',
                  borderRadius: '16px',
                  padding: 'clamp(20px, 4vw, 40px) clamp(24px, 5vw, 60px) clamp(36px, 6vw, 50px)',
                  margin: '0 auto',
                  maxWidth: 'min(90vw, 600px)',
                  width: '100%',
                  textAlign: 'center',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(48px, 10vw, 80px)',
                    color: '#c9942a',
                    margin: '0 0 4px',
                    lineHeight: 1.2,
                  }}
                >
                  Shivi
                </p>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 'clamp(14px, 2vw, 18px)',
                    color: '#fdf8f0',
                    letterSpacing: 'clamp(4px, 1vw, 8px)',
                    textTransform: 'uppercase',
                    margin: 'clamp(4px, 1vw, 12px) 0',
                    opacity: 0.8
                  }}
                >
                  — and —
                </p>
                <p
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(48px, 10vw, 80px)',
                    color: '#c9942a',
                    margin: '0 0 12px',
                    lineHeight: 1.2,
                  }}
                >
                  Ishank
                </p>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 'clamp(15px, 2.5vw, 22px)',
                    color: '#fdf8f0',
                    letterSpacing: 'clamp(1px, 0.5vw, 3px)',
                    margin: 0,
                    opacity: 0.9
                  }}
                >
                  are getting married!
                </p>
                
                {/* Wedding Hashtag */}
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 'clamp(14px, 2vw, 18px)',
                    color: '#c9942a',
                    letterSpacing: '2px',
                    margin: '20px 0 0 0',
                    opacity: 0.9,
                    fontWeight: 'bold'
                  }}
                >
                  #ShiviSeIshkHai
                </p>
              </motion.div>

              {/* Invitation Message (poetic and gold-colored) */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 'clamp(16px, 2.5vw, 22px)',
                  color: '#c9942a',
                  maxWidth: '600px',
                  width: '100%',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  margin: '40px auto 0',
                  fontStyle: 'italic',
                  padding: '0 24px'
                }}
              >
                "Two souls, one journey, woven by destiny. We request the joy of your presence as they begin their forever."
              </motion.p>
            </section>

            <CountdownSlide />

            <ShowcaseSlide />
          
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

        {/* Ganesh Screen Overlay */}
        <AnimatePresence>
          {stage === 1 && (
            <motion.div
              key="ganesh-overlay"
              initial={{ y: 0 }}
              exit={{ y: '-100vh', opacity: 0 }}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9998,
                background: '#152025',
                overflow: 'hidden'
              }}
            >
              <GaneshSlide onComplete={() => setStage(2)} />
            </motion.div>
          )}
        </AnimatePresence>
      {/* Fixed mute/unmute button — top right */}
      {musicStarted && (
        <button onClick={togglePlay} style={{
          position: 'fixed', top: '16px', right: '16px', zIndex: 99999,
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(201, 148, 42, 0.4)',
          color: '#c9942a', fontSize: '18px', cursor: 'pointer',
          display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}
      {/* Floating Scroll Indicator */}
      {stage === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '24px',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none'
          }}
        >
          <span style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '10px',
            letterSpacing: '2px',
            color: '#c9942a',
            textTransform: 'uppercase',
            textAlign: 'center',
            display: 'block'
          }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '35px',
              background: 'linear-gradient(to bottom, #c9942a, transparent)'
            }}
          />
        </motion.div>
      )}
      </div>
    )}
  </>
  )
}

export default App
