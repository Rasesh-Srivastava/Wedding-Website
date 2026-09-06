import { useEffect, useRef } from 'react';

class FireworkParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2.2 + 0.8;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 0.85;
    this.decay = Math.random() * 0.018 + 0.012;
    this.size = Math.random() * 1.0 + 0.8;
    this.gravity = 0.025;
    this.friction = 0.96;
    this.isStar = Math.random() > 0.5;
  }

  update() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 3;

    if (this.isStar) {
      // 4-point sparkle star
      const r = this.size * 1.5;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * 90) * Math.PI / 180) * r + this.x, Math.sin((i * 90) * Math.PI / 180) * r + this.y);
        ctx.lineTo(Math.cos((45 + i * 90) * Math.PI / 180) * (r / 3) + this.x, Math.sin((45 + i * 90) * Math.PI / 180) * (r / 3) + this.y);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

class AmbientSparkle {
  constructor(width, height) {
    this.reset(width, height);
  }

  reset(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.5 + 0.8;
    this.color = ['#FFD700', '#FFA500', '#FF9933', '#FFFFFF', '#F0D080'][Math.floor(Math.random() * 5)];
    this.alpha = Math.random() * 0.6;
    this.speed = Math.random() * 0.015 + 0.005;
    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.vy = -(Math.random() * 0.2 + 0.05);
  }

  update(width, height) {
    this.y += this.vy;
    this.alpha += this.speed * this.dir;
    if (this.alpha >= 0.7) {
      this.alpha = 0.7;
      this.dir = -1;
    } else if (this.alpha <= 0) {
      this.reset(width, height);
    }
    if (this.y < 0) {
      this.y = height;
    }
  }

  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function DiwaliFireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    // Clear particles on tab visibility change to prevent accumulation when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        particles.length = 0;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const particles = [];
    const ambientSparkles = Array.from({ length: 20 }, () => new AmbientSparkle(width, height));
    const diwaliColors = ['#FFD700', '#FF9933', '#FF4500', '#FFFFFF', '#FFA500', '#F0D080'];

    const createFireworkBurst = () => {
      const x = Math.random() * (width * 0.8) + width * 0.1;
      const y = Math.random() * (height * 0.6) + height * 0.15;
      const particleCount = Math.floor(Math.random() * 11) + 20; // Random 20 to 30 particles per burst
      const burstColor = diwaliColors[Math.floor(Math.random() * diwaliColors.length)];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new FireworkParticle(x, y, burstColor));
      }

      // Hard cap max active particles to prevent any build-up
      if (particles.length > 60) {
        particles.splice(0, particles.length - 60);
      }
    };

    let lastBurstTime = 0;

    const render = (timestamp) => {
      if (document.hidden) {
        particles.length = 0;
        lastBurstTime = timestamp;
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (!lastBurstTime) lastBurstTime = timestamp;
      const elapsed = timestamp - lastBurstTime;

      // Trigger a subtle burst every 2.0 seconds
      if (elapsed > 2000) {
        createFireworkBurst();
        lastBurstTime = timestamp;
      }

      // Render ambient Diwali sparkles
      ambientSparkles.forEach((sparkle) => {
        sparkle.update(width, height);
        sparkle.draw(ctx);
      });

      // Render firework burst particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
