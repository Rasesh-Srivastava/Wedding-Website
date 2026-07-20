import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../animations';

export default function StorySlide() {
  const milestones = [
    { title: 'How We Met', desc: 'A chance encounter that changed everything.' },
    { title: 'First Date', desc: 'Coffee, laughter, and an instant connection.' },
    { title: 'The Proposal', desc: 'A beautiful sunset and a promise of forever.' },
    { title: 'Forever Begins', desc: 'December 3, 2026' }
  ];

  return (
    <section style={{
      padding: '80px 24px',
      background: '#fdf8f0',
      color: '#1a0800',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(48px, 8vw, 72px)',
          color: '#c9942a',
          margin: 0,
          fontWeight: 'normal'
        }}>
          Our Story
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          position: 'relative',
          width: '100%',
          maxWidth: 'min(90vw, 600px)',
        }}
      >
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '0',
          bottom: '0',
          width: '2px',
          background: 'rgba(201, 148, 42, 0.3)'
        }} />

        {milestones.map((m, i) => (
          <motion.div key={i} variants={fadeUp} style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#c9942a',
              marginTop: '6px',
              position: 'relative',
              zIndex: 2,
              marginLeft: '15px' // to center on the 2px line at left:20px (15 + 6 = 21, close enough)
            }} />
            <div style={{ flex: 1, paddingTop: '1px' }}>
              <h3 style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(20px, 4vw, 28px)',
                margin: '0 0 4px',
                color: '#4a2208'
              }}>
                {m.title}
              </h3>
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 'clamp(15px, 2.5vw, 18px)',
                margin: 0,
                color: '#663300',
                fontStyle: 'italic'
              }}>
                {m.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
