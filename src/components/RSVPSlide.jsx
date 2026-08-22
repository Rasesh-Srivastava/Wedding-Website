import { motion } from 'framer-motion';

export default function RSVPSlide({
  formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd5fvzTaMHELro-RO9an2tTSlgYtXOttg1v23_kXOyAVv0qIw/viewform?usp=publish-editor"
}) {
  return (
    <section className="rsvp-section">
      <div className="rsvp-container">
        {/* Left / Top: Question Text */}
        <p className="rsvp-question-text">
          Are you Attending?
        </p>

        {/* Right / Bottom: RSVP Button */}
        <motion.a
          whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(201, 148, 42, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          href={formUrl}
          target="_blank"
          rel="noreferrer"
          className="rsvp-button"
        >
          RSVP Now
        </motion.a>
      </div>
    </section>
  );
}
