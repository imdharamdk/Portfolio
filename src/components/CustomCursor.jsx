import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event) => setActive(Boolean(event.target.closest('a, button, input, textarea, [data-cursor]')));
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <div className="cursor-aura" aria-hidden="true" />
      <div
        className="pointer-events-none fixed z-[90] hidden rounded-full border border-cyan-200/70 mix-blend-screen transition-[width,height,transform,background] duration-150 md:block"
        style={{
          left: position.x,
          top: position.y,
          width: active ? 42 : 22,
          height: active ? 42 : 22,
          transform: 'translate(-50%, -50%)',
          background: active ? 'rgba(34, 211, 238, 0.12)' : 'rgba(34, 211, 238, 0.04)',
          boxShadow: active ? '0 0 30px rgba(34, 211, 238, 0.55)' : '0 0 18px rgba(34, 211, 238, 0.25)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
