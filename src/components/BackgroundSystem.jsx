import { useEffect, useRef } from 'react';

export function BackgroundSystem() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const particles = [];
    let animationFrame;
    let lastFrame = 0;
    let paused = false;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;
      const isSmall = window.innerWidth < 768;
      const maxParticles = isSmall ? 42 : 84;
      const density = isSmall ? 19000 : 21000;
      const count = Math.min(maxParticles, Math.floor((window.innerWidth * window.innerHeight) / density));
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.4 + 0.45,
          hue: Math.random() > 0.52 ? 188 : 275,
        });
      }
    };

    const onMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    const onVisibilityChange = () => {
      paused = document.hidden;
    };

    const animate = (time = 0) => {
      animationFrame = requestAnimationFrame(animate);
      if (paused || time - lastFrame < 33) return;
      lastFrame = time;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle, index) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 180) {
          particle.x -= dx * 0.0009;
          particle.y -= dy * 0.0009;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = window.innerWidth + 20;
        if (particle.x > window.innerWidth + 20) particle.x = -20;
        if (particle.y < -20) particle.y = window.innerHeight + 20;
        if (particle.y > window.innerHeight + 20) particle.y = -20;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 95%, 72%, 0.72)`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j += 2) {
          const other = particles[j];
          const linkDistance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (linkDistance < 88) {
            ctx.strokeStyle = `rgba(103, 232, 249, ${0.09 * (1 - linkDistance / 88)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" aria-hidden="true" />
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-55"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.08) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 82%)',
        }}
      />
      <div className="fixed inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_35rem)]" />
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
