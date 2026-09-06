import { useEffect, useRef } from 'react';

class FireworkParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3.5 + 1.2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.008;
    this.size = Math.random() * 2.5 + 1.5;
    this.gravity = 0.035;
    this.friction = 0.965;
    this.isStar = Math.random() > 0.6;
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
    ctx.shadowBlur = 8;

    if (this.isStar) {
      // 4-point sparkle star
      const r = this.size * 1.8;
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
    this.size = Math.random() * 2 + 1;
    this.color = ['#FFD700', '#FFA500', '#FF9933', '#FFFFFF', '#F0D080'][Math.floor(Math.random() * 5)];
    this.alpha = Math.random();
    this.speed = Math.random() * 0.025 + 0.01;
    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.vy = -(Math.random() * 0.3 + 0.1);
  }

  update(width, height) {
    this.y += this.vy;
    this.alpha += this.speed * this.dir;
    if (this.alpha >= 1) {
      this.alpha = 1;
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
    ctx.shadowBlur = 6;
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

    const particles = [];
    const ambientSparkles = Array.from({ length: 30 }, () => new AmbientSparkle(width, height));
    const diwaliColors = ['#FFD700', '#FF9933', '#FF4500', '#FFFFFF', '#FFA500', '#F0D080'];

    const createFireworkBurst = () => {
      const x = Math.random() * (width * 0.85) + width * 0.075;
      const y = Math.random() * (height * 0.65) + height * 0.1;
      const particleCount = Math.floor(Math.random() * 20) + 25;
      const burstColor = diwaliColors[Math.floor(Math.random() * diwaliColors.length)];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new FireworkParticle(x, y, burstColor));
      }
    };

    // Smooth continuous random firework bursts
    const interval = setInterval(() => {
      createFireworkBurst();
    }, 1500);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

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

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
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
