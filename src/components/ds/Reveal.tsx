import React, { useEffect, useRef, useState } from 'react';

type RevealVariant = 'up' | 'fade' | 'scale' | 'left' | 'right' | 'clip';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  variant?: RevealVariant;
  delay?: number;
  threshold?: number;
  children?: React.ReactNode;
}

/** Fires once when the element enters the viewport. */
export function useInView<T extends Element>(threshold = 0.15, rootMargin = '0px 0px -8% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}

export const Reveal: React.FC<RevealProps> = ({
  as = 'div',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
  className = '',
  style,
  children,
  ...rest
}) => {
  const { ref, inView } = useInView<HTMLElement>(threshold);
  return React.createElement(
    as,
    {
      ref,
      className: `rv rv--${variant} ${inView ? 'is-in' : ''} ${className}`.trim(),
      style: { ...style, '--rv-delay': `${delay}ms` } as React.CSSProperties,
      ...rest,
    },
    children
  );
};

/**
 * Headline that reveals word-by-word from behind a mask.
 * Accepts plain text with `\n` or `<br />` for line breaks.
 */
export const MaskHeadline: React.FC<{
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  immediate?: boolean;
  accentLast?: boolean;
}> = ({ text, as = 'h2', className = '', delay = 0, immediate = false, accentLast = false }) => {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const [done, setDone] = useState(false);

  const lines = text
    .replace(/<br\s*\/?>/gi, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const wordCount = lines.reduce((n, l) => n + l.split(' ').length, 0);

  // Once every word has finished sliding in, drop the mask so no glyph can be clipped.
  useEffect(() => {
    if (!immediate && !inView) return;
    const id = window.setTimeout(() => setDone(true), delay + wordCount * 55 + 1200);
    return () => window.clearTimeout(id);
  }, [immediate, inView, delay, wordCount]);

  let wordIndex = 0;
  const state = `${immediate ? 'mask-head--auto' : inView ? 'is-in' : ''} ${done ? 'is-done' : ''}`;

  return React.createElement(
    as,
    { ref, className: `mask-head ${state} ${className}`.trim() },
    lines.map((line, li) => (
      <React.Fragment key={li}>
      {li > 0 && ' '}
      <span className={`mask-head__line ${accentLast && li === lines.length - 1 ? 'mask-head__line--accent' : ''}`}>
        {line.split(' ').map((word, wi) => {
          const i = wordIndex++;
          return (
            <React.Fragment key={wi}>
              {wi > 0 && ' '}
              <span className="mask-head__word">
                <span style={{ transitionDelay: `${delay + i * 55}ms`, animationDelay: `${delay + i * 55}ms` }}>{word}</span>
              </span>
            </React.Fragment>
          );
        })}
      </span>
      </React.Fragment>
    ))
  );
};
