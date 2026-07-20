import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function EnvelopeIntro({ onComplete }) {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('invited')) onComplete()
  }, [])

  const handleTap = () => {
    if (opened) return
    setOpened(true)
    setTimeout(() => {
      sessionStorage.setItem('invited', 'true')
      onComplete()
    }, 2200)
  }

  return (
    <div
      onClick={handleTap}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(160deg, #fdf8f0, #f5ece0, #efe2d0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Decorative gold line at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #c9942a, transparent)',
        }}
      />

      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}
            exit={{ opacity: 0, y: 80, transition: { duration: 0.6, ease: 'easeIn' } }}
          >
            <motion.img
              src={import.meta.env.BASE_URL + "envelope.jpeg"}
              alt="Wedding Invitation Envelope"
              style={{
                width: 'min(220px, 55vw)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(201, 148, 42, 0.25)',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(18px, 5vw, 24px)',
                color: '#4a2208',
                margin: 0,
                letterSpacing: '0.5px',
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Tap to open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed message after opening */}
      <AnimatePresence>
        {opened && (
          <motion.div
            key="reveal-msg"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center' }}
          >
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(32px, 8vw, 48px)',
                color: '#c9942a',
                margin: 0,
              }}
            >
              You're Invited
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative gold line at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #c9942a, transparent)',
        }}
      />
    </div>
  )
}