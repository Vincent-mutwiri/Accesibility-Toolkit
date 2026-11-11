// Adapted from tools/adapters/reading-ruler.js, Apache-2.0.
// React owns the band; pointer, focus, scrolling and keyboard support added.
import React, { useEffect, useState } from 'react';
import { useAccessibility } from './Preferences';
export default function ReadingRuler() {
  const { preferences } = useAccessibility();
  const [y, setY] = useState(() => window.innerHeight / 2);
  useEffect(function followReadingPosition() {
    if (!preferences.readingRuler) return;
    let frame = 0;
    let followingFocus = false;
    const move = (value: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setY(Math.max(20, Math.min(window.innerHeight - 20, value))));
    };
    const pointer = (event: PointerEvent) => { followingFocus = false; move(event.clientY); };
    const focus = () => {
      if (document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
        const box = document.activeElement.getBoundingClientRect();
        move(box.top + box.height / 2);
      }
    };
    const key = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        followingFocus = false;
        cancelAnimationFrame(frame);
        const delta = event.key === 'ArrowDown' ? 40 : -40;
        setY(previous => Math.max(20, Math.min(window.innerHeight - 20, previous + delta)));
      }
    };
    const onFocus = () => { followingFocus = true; focus(); };
    const onScroll = () => { if (followingFocus) focus(); };
    const onResize = () => setY(previous => Math.max(20, Math.min(window.innerHeight - 20, previous)));
    document.addEventListener('pointermove', pointer, { passive: true });
    document.addEventListener('pointerdown', pointer, { passive: true });
    document.addEventListener('focusin', onFocus);
    document.addEventListener('keydown', key);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', pointer);
      document.removeEventListener('pointerdown', pointer);
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('keydown', key);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [preferences.readingRuler]);
  return preferences.readingRuler ? <div className="reading-ruler" aria-hidden="true" style={{ top: y - 20 }} /> : null;
}
