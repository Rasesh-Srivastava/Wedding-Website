import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RSVPSlide({
  scriptUrl = '' // Google Apps Script Webhook URL or Web3Forms Endpoint
}) {
  const [formData, setFormData] = useState({
    name: '',
    attending: '', // Default 'Please select'
    guests: '',
    attendeeNames: '',
    accommodation: '' // Default '' (blank, requires selection on 'Yes, I'll be there')
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'submitted'

  const errorTimerRef = useRef(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const showError = (msg) => {
    setErrorMessage(msg);
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    errorTimerRef.current = setTimeout(() => {
      setErrorMessage('');
    }, 10000); // Dismiss after 10 seconds
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Check 1: Full Name cannot be empty
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      showError("Please enter your Full Name before submitting.");
      return;
    }

    // Validation Check 2: Attending choice selection
    if (!formData.attending) {
      showError("Please select whether you will be attending.");
      return;
    }

    let payloadGuests = "0";
    let payloadAttendeeNames = "N/A";
    let payloadAccommodation = "N/A";

    // Validation Check 3: If attending, check guests, attendee names & accommodation choice
    if (formData.attending === "Yes, I'll be there") {
      const guestNum = parseInt(formData.guests.trim(), 10);
      if (isNaN(guestNum) || guestNum <= 0) {
        showError("Please enter a valid number of guests (1 or more).");
        return;
      }

      const trimmedAttendeeNames = formData.attendeeNames.trim();
      if (!trimmedAttendeeNames) {
        showError("Please enter the names of the people attending.");
        return;
      }

      if (!formData.accommodation) {
        showError("Please select whether you require accommodation (Yes or No).");
        return;
      }

      payloadGuests = guestNum.toString();
      payloadAttendeeNames = trimmedAttendeeNames;
      payloadAccommodation = formData.accommodation;
    }

    // Clear error message when validation passes
    setErrorMessage('');
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);

    setStatus('submitting');

    const payload = {
      name: trimmedName,
      attending: formData.attending,
      guests: payloadGuests,
      attendeeNames: payloadAttendeeNames,
      accommodation: payloadAccommodation
    };

    try {
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Fallback test delay
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
      setStatus('submitted');
    } catch (err) {
      console.error(err);
      showError("Something went wrong while submitting. Please try again.");
      setStatus('idle');
    }
  };

  return (
    <section className="rsvp-section" style={{
      background: '#1A292F',
      borderTop: '1px solid #2C3730',
      borderBottom: '1px solid #2C3730',
      padding: '60px 24px',
      color: '#fdf8f0',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '650px', margin: '0 auto', width: '100%' }}>
        {status !== 'submitted' ? (
          /* Custom RSVP Card matching rsvp_card.jpeg */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(145deg, #152025 0%, #0e161a 100%)',
              border: '1px solid rgba(201, 148, 42, 0.35)',
              borderRadius: '24px',
              padding: 'clamp(28px, 5vw, 42px) clamp(20px, 4vw, 36px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              boxSizing: 'border-box'
            }}
          >
            {/* Heading */}
            <h2 style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: 'clamp(38px, 8vw, 58px)',
              color: '#c9942a',
              textAlign: 'center',
              margin: '0 0 4px 0',
              fontWeight: 'normal'
            }}>
              Will you join us?
            </h2>

            {/* Subtitle */}
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: '11px',
              color: '#fdf8f0',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: '0 0 32px 0',
              fontWeight: 'bold',
              opacity: 0.9
            }}>
              PLEASE RSVP BY OCTOBER 15, 2026
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Row 1: Full Name & Attending? */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px'
              }}>
                {/* Field 1: Full Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                  <label style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '11px',
                    color: '#c9942a',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}>
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      background: '#1A292F',
                      border: '1px solid rgba(201, 148, 42, 0.35)',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      color: '#fdf8f0',
                      fontFamily: "'EB Garamond', serif",
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      width: '100%'
                    }}
                  />
                </div>

                {/* Field 2: Attending? */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                  <label style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '11px',
                    color: '#c9942a',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}>
                    ATTENDING?
                  </label>
                  <select
                    name="attending"
                    value={formData.attending}
                    onChange={handleChange}
                    style={{
                      background: '#1A292F',
                      border: '1px solid rgba(201, 148, 42, 0.35)',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      color: formData.attending ? '#fdf8f0' : 'rgba(253, 248, 240, 0.5)',
                      fontFamily: "'EB Garamond', serif",
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      width: '100%',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" disabled hidden>Please select</option>
                    <option value="Yes, I'll be there" style={{ background: '#152025', color: '#fdf8f0' }}>Yes, I'll be there</option>
                    <option value="Regretfully decline" style={{ background: '#152025', color: '#fdf8f0' }}>Regretfully decline</option>
                  </select>
                </div>
              </div>

              {/* Conditional Row 2 & 3: Guests, Names of People Attending, & Accommodation? */}
              <AnimatePresence>
                {formData.attending === "Yes, I'll be there" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '20px'
                    }}>
                      {/* Field 3: Number of Guests (Number input, no dropdown) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                        <label style={{
                          fontFamily: "'EB Garamond', serif",
                          fontSize: '11px',
                          color: '#c9942a',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          fontWeight: 'bold'
                        }}>
                          NUMBER OF GUESTS
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="25"
                          name="guests"
                          placeholder="e.g. 2"
                          value={formData.guests}
                          onChange={handleChange}
                          style={{
                            background: '#1A292F',
                            border: '1px solid rgba(201, 148, 42, 0.35)',
                            borderRadius: '12px',
                            padding: '14px 18px',
                            color: '#fdf8f0',
                            fontFamily: "'EB Garamond', serif",
                            fontSize: '16px',
                            outline: 'none',
                            boxSizing: 'border-box',
                            width: '100%'
                          }}
                        />
                      </div>

                      {/* Field 4: Names of People Attending */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                        <label style={{
                          fontFamily: "'EB Garamond', serif",
                          fontSize: '11px',
                          color: '#c9942a',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          fontWeight: 'bold'
                        }}>
                          NAMES OF PEOPLE ATTENDING
                        </label>
                        <input
                          type="text"
                          name="attendeeNames"
                          placeholder="e.g. Tina, Rahul, Anjali"
                          value={formData.attendeeNames}
                          onChange={handleChange}
                          style={{
                            background: '#1A292F',
                            border: '1px solid rgba(201, 148, 42, 0.35)',
                            borderRadius: '12px',
                            padding: '14px 18px',
                            color: '#fdf8f0',
                            fontFamily: "'EB Garamond', serif",
                            fontSize: '16px',
                            outline: 'none',
                            boxSizing: 'border-box',
                            width: '100%'
                          }}
                        />
                      </div>

                      {/* Field 5: Accommodation Grid Container (Spans full width, 2 cols on laptop, 1 col on mobile) */}
                      <div style={{
                        gridColumn: '1 / -1',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '8px 20px',
                        alignItems: 'center'
                      }}>
                        {/* Label */}
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                          <label style={{
                            fontFamily: "'EB Garamond', serif",
                            fontSize: '11px',
                            color: '#c9942a',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            margin: 0
                          }}>
                            ACCOMMODATION?
                          </label>
                        </div>

                        {/* Yes / No Box */}
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                          <div style={{
                            background: '#1A292F',
                            border: '1px solid rgba(201, 148, 42, 0.35)',
                            borderRadius: '12px',
                            padding: '12px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                            width: '100%',
                            minHeight: '48px'
                          }}>
                            <label style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              fontFamily: "'EB Garamond', serif",
                              fontSize: '16px',
                              color: '#fdf8f0',
                              userSelect: 'none'
                            }}>
                              <input
                                type="checkbox"
                                name="accommodation"
                                value="Yes"
                                checked={formData.accommodation === 'Yes'}
                                onChange={() => setFormData({ ...formData, accommodation: formData.accommodation === 'Yes' ? '' : 'Yes' })}
                                style={{
                                  accentColor: '#c9942a',
                                  width: '18px',
                                  height: '18px',
                                  cursor: 'pointer'
                                }}
                              />
                              Yes
                            </label>

                            <label style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              cursor: 'pointer',
                              fontFamily: "'EB Garamond', serif",
                              fontSize: '16px',
                              color: '#fdf8f0',
                              userSelect: 'none'
                            }}>
                              <input
                                type="checkbox"
                                name="accommodation"
                                value="No"
                                checked={formData.accommodation === 'No'}
                                onChange={() => setFormData({ ...formData, accommodation: formData.accommodation === 'No' ? '' : 'No' })}
                                style={{
                                  accentColor: '#c9942a',
                                  width: '18px',
                                  height: '18px',
                                  cursor: 'pointer'
                                }}
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    background: 'linear-gradient(135deg, #dfa943 0%, #c9942a 100%)',
                    color: '#152025',
                    border: 'none',
                    padding: '14px 44px',
                    fontFamily: "'EB Garamond', serif",
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 16px rgba(201, 148, 42, 0.3)',
                    transition: 'transform 0.2s, opacity 0.2s',
                    opacity: status === 'submitting' ? 0.7 : 1
                  }}
                >
                  {status === 'submitting' ? 'Sending RSVP...' : 'Send RSVP'}
                </button>

                {/* Validation Error Message (Polite Red Text below button) */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: "'EB Garamond', serif",
                        fontSize: '14px',
                        color: '#ff4d4f',
                        margin: 0,
                        textAlign: 'center',
                        fontWeight: '600',
                        lineHeight: 1.4
                      }}
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(145deg, #152025 0%, #0e161a 100%)',
              border: '1px solid rgba(201, 148, 42, 0.4)',
              borderRadius: '24px',
              padding: '48px 32px',
              textAlign: 'center',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ fontSize: '48px', color: '#c9942a', marginBottom: '16px' }}>
              ✓
            </div>
            <h3 style={{
              fontFamily: "'Pinyon Script', cursive",
              fontSize: '44px',
              color: '#c9942a',
              margin: '0 0 12px 0',
              fontWeight: 'normal'
            }}>
              Thank You!
            </h3>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: '18px',
              color: '#fdf8f0',
              margin: 0,
              lineHeight: 1.6
            }}>
              Your RSVP response has been received.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
