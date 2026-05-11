import { useEffect, useState } from 'react';

export function useTypewriter(words, speed = 58, pause = 1300) {
  const [text, setText] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timer = window.setTimeout(tick, pause);
          return;
        }
      } else {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      timer = window.setTimeout(tick, deleting ? speed * 0.48 : speed);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [words, speed, pause]);

  return text;
}
