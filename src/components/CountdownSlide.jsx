import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import confetti from 'canvas-confetti';

export default function CountdownSlide() {
  const time = useCountdown('2026-12-03T10:00:00');
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const confettiCanvasRef = useRef(null);
  const confettiIntervalRef = useRef(null);

  // Set up metallic gold scratch overlay surface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas dimensions for resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Load custom gold image (fallback to metallic gold gradient if missing)
    const img = new Image();
    img.src = import.meta.env.BASE_URL + 'scratch_gold.png';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      drawOverlayText(ctx, canvas.width, canvas.height);
    };
    img.onerror = () => {
      // Shimmering metallic gradient fallback
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#c9942a');
      grad.addColorStop(0.3, '#fbeaa6');
      grad.addColorStop(0.5, '#e5c07b');
      grad.addColorStop(0.8, '#fbeaa6');
      grad.addColorStop(1, '#c9942a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawOverlayText(ctx, canvas.width, canvas.height);
    };
  }, []);

  // Clean up confetti interval on unmount
  useEffect(() => {
    return () => {
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current);
      }
    };
  }, []);

  // Instruction text on the scratch card
  const drawOverlayText = (ctx, w, h) => {
    ctx.font = "bold clamp(12px, 3.5vw, 15px) 'EB Garamond', serif";
    ctx.fillStyle = '#152025';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("SCRATCH TO REVEAL DATE", w / 2, h / 2);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleStart = (e) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handleMove = (e) => {
    if (!isDrawingRef.current || isRevealed) return;
    // Prevent touch scrolling when scratching
    if (e.cancelable) e.preventDefault();
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    isDrawingRef.current = false;
    checkScratchPercentage();
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparent++;
      }
    }

    const percentage = (transparent / (canvas.width * canvas.height)) * 100;
    if (percentage > 40 && !isRevealed) {
      setIsRevealed(true);
      // Clear entire canvas on crossing threshold
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triggerConfettiBurst();
    }
  };

  // Full-screen confetti celebration using canvas-confetti
  const triggerConfettiBurst = useCallback(() => {
    // Create a dedicated full-screen canvas for confetti
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.width = '100vw';
    confettiCanvas.style.height = '100vh';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '99999';
    document.body.appendChild(confettiCanvas);
    confettiCanvasRef.current = confettiCanvas;

    // Handle resize
    const handleResize = () => {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create a confetti instance bound to our canvas
    const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

    const weddingColors = ['#c9942a', '#e5c07b', '#fbeaa6', '#dfa943', '#fdf8f0', '#ffb366'];

    // Initial burst — two big side cannons
    myConfetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.05, y: 0.6 },
      angle: 55,
      colors: weddingColors,
      startVelocity: 45,
      gravity: 0.8,
      ticks: 300
    });
    myConfetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.95, y: 0.6 },
      angle: 125,
      colors: weddingColors,
      startVelocity: 45,
      gravity: 0.8,
      ticks: 300
    });

    // Gentle continuous fall for 5 seconds
    let elapsed = 0;
    confettiIntervalRef.current = setInterval(() => {
      elapsed += 200;
      if (elapsed > 5000) {
        clearInterval(confettiIntervalRef.current);
        confettiIntervalRef.current = null;
        // Clean up the canvas after particles settle
        setTimeout(() => {
          window.removeEventListener('resize', handleResize);
          if (confettiCanvasRef.current) {
            confettiCanvasRef.current.remove();
            confettiCanvasRef.current = null;
          }
        }, 4000);
        return;
      }

      myConfetti({
        particleCount: 3,
        spread: 160,
        origin: { x: Math.random(), y: -0.05 },
        colors: weddingColors,
        startVelocity: 8,
        gravity: 0.5,
        drift: (Math.random() - 0.5) * 0.5,
        ticks: 250,
        scalar: 0.9
      });
    }, 200);
  }, []);

  return (
    <section style={{
      padding: '60px 24px',
      background: '#1A292F', // lighter bg
      color: '#c9942a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      borderBottom: '1px solid #2C3730',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ width: '100%', maxWidth: '500px', zIndex: 10 }}>
        {/* Title */}
        <h2 style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 'clamp(20px, 4.5vw, 32px)',
          color: '#c9942a',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: '0 0 32px',
          fontWeight: 'normal'
        }}>
          Scratch and Reveal
        </h2>

        {/* Scratch Card Frame */}
        <div style={{
          position: 'relative',
          width: 'min(340px, 85vw)',
          height: '180px',
          margin: '0 auto',
          borderRadius: '16px',
          border: '2px dashed #c9942a',
          background: '#152025',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'none' // Prevent default touch actions (scrolling) during scratch
        }}>
          {/* revealed date overlay underneath */}
          <div style={{
            padding: '24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%'
          }}>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 'clamp(12px, 2.5vw, 15px)',
              letterSpacing: '3px',
              color: '#c9942a',
              textTransform: 'uppercase',
              margin: '0 0 6px 0',
              fontWeight: 'bold'
            }}>
              Thursday
            </p>
            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(32px, 8vw, 44px)',
              color: '#fdf8f0',
              margin: 0,
              lineHeight: 1.1
            }}>
              December 3, 2026
            </p>
          </div>

          {/* canvas scratch layer */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: isRevealed ? 'default' : 'crosshair',
              transition: 'opacity 0.5s ease',
              opacity: isRevealed ? 0 : 1,
              pointerEvents: isRevealed ? 'none' : 'auto',
              borderRadius: '14px'
            }}
          />
        </div>

        {/* Revealed Countdown Timer */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ marginTop: '48px', width: '100%' }}
            >
              <p style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(28px, 5.5vw, 46px)',
                margin: '0 0 24px',
                color: '#fdf8f0',
                fontWeight: 'normal'
              }}>
                Counting down to forever
              </p>

              {/* Countdown Numbers Grid */}
              <div style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center'
              }}>
                {[
                  { label: 'Days', value: time.days ?? 0 },
                  { label: 'Hours', value: time.hours ?? 0 },
                  { label: 'Mins', value: time.minutes ?? 0 },
                  { label: 'Secs', value: time.seconds ?? 0 },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'rgba(201, 148, 42, 0.08)',
                    border: '1px solid rgba(201, 148, 42, 0.25)',
                    borderRadius: '12px',
                    padding: 'clamp(12px, 2.5vw, 20px) clamp(6px, 1.5vw, 16px)',
                    minWidth: 'clamp(64px, 11vw, 96px)',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <div style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 'clamp(24px, 4.5vw, 42px)',
                      fontWeight: 'bold',
                      lineHeight: 1,
                      marginBottom: '6px',
                      color: '#c9942a'
                    }}>
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 'clamp(10px, 1.3vw, 13px)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#fdf8f0',
                      opacity: 0.8
                    }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
