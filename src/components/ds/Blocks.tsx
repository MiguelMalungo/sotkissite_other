import React, { useEffect, useRef, useState } from 'react';
import { Btn, Eyebrow, Icon } from './Btn';
import { MaskHeadline, Reveal } from './Reveal';
import { SignalArcs } from './Signal';

/** Writes scroll progress of the element through the viewport to `--p` (0 → 1). */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return ref;
}

/* ------------------------------------------------------------------ */
/* Page hero — product pages                                           */
/* ------------------------------------------------------------------ */

export const PageHero: React.FC<{
  image: string;
  imageMobile?: string;
  eyebrow: string;
  title: string;
  onPlay?: () => void;
  playLabel?: string;
  children?: React.ReactNode;
  code?: string;
  align?: 'bottom' | 'center';
}> = ({ image, imageMobile, eyebrow, title, onPlay, playLabel, children, code, align = 'bottom' }) => {
  const ref = useScrollProgress<HTMLElement>();
  const [loaded, setLoaded] = useState(false);
  const [head, ...rest] = title.split('\n');

  return (
    <section ref={ref} className={`phero phero--${align} ${loaded ? 'is-loaded' : ''}`}>
      <div className="phero__media">
        <picture>
          {imageMobile && <source media="(max-width: 700px)" srcSet={imageMobile} />}
          <img src={image} alt="" onLoad={() => setLoaded(true)} {...{ fetchpriority: 'high' }} />
        </picture>
      </div>
      <div className="phero__scrim" />
      <div className="phero__grid" aria-hidden="true" />

      <div className="phero__inner container">
        <div className="phero__top">
          <Eyebrow className="eyebrow--inv">{eyebrow}</Eyebrow>
          {code && <span className="phero__code">{code}</span>}
        </div>

        <div className="phero__body">
          <MaskHeadline as="h1" text={head} className="phero__title" immediate delay={150} />
          {rest.length > 0 && (
            <p className="phero__sub">
              {rest.map((r, i) => (
                <span key={i}>{r}</span>
              ))}
            </p>
          )}
          {children}
          {onPlay && (
            <button className="play-btn" onClick={onPlay}>
              <span className="play-btn__disc">
                <SignalArcs className="play-btn__arcs" />
                <Icon name="play" />
              </span>
              <span className="play-btn__label">{playLabel || 'Play Video'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="phero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Section intro — sticky title left, prose right                      */
/* ------------------------------------------------------------------ */

export const Intro: React.FC<{
  index?: string;
  eyebrow: string;
  title: string;
  paragraphs: (string | undefined | null)[];
  aside?: React.ReactNode;
  tone?: 'paper' | 'ink';
}> = ({ index, eyebrow, title, paragraphs, aside, tone = 'paper' }) => {
  const ps = paragraphs.filter((p): p is string => !!p && p.trim().length > 0);
  return (
    <section className={`intro intro--${tone}`}>
      <div className="container intro__grid">
        <div className="intro__head">
          <Reveal>
            <Eyebrow index={index} className={tone === 'ink' ? 'eyebrow--inv' : ''}>{eyebrow}</Eyebrow>
          </Reveal>
          <MaskHeadline text={title} className="intro__title" />
          {aside}
        </div>
        <div className="intro__body">
          {ps.map((p, i) => (
            <Reveal key={i} delay={i * 120} as="p" className={i === 0 ? 'intro__lead' : 'intro__p'}>
              {p}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SectionHead: React.FC<{
  index?: string;
  eyebrow: string;
  title: string;
  text?: string;
  inv?: boolean;
  center?: boolean;
  action?: React.ReactNode;
}> = ({ index, eyebrow, title, text, inv, center, action }) => (
  <header className={`shead ${center ? 'shead--center' : ''} ${inv ? 'shead--inv' : ''}`}>
    <div className="shead__main">
      <Reveal>
        <Eyebrow index={index} className={inv ? 'eyebrow--inv' : ''}>{eyebrow}</Eyebrow>
      </Reveal>
      <MaskHeadline text={title} className="shead__title" />
    </div>
    {(text || action) && (
      <Reveal className="shead__aside" delay={200}>
        {text && <p>{text}</p>}
        {action}
      </Reveal>
    )}
  </header>
);

/* ------------------------------------------------------------------ */
/* Media cards                                                         */
/* ------------------------------------------------------------------ */

export const MediaCard: React.FC<{
  image: string;
  title: string;
  text: string;
  index: number;
  delay?: number;
  fit?: 'cover' | 'contain';
}> = ({ image, title, text, index, delay = 0, fit = 'cover' }) => (
  <Reveal className="mcard" delay={delay}>
    <div className={`mcard__media mcard__media--${fit}`}>
      <img src={image} alt={title} loading="lazy" />
      <span className="mcard__index">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="mcard__body">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </Reveal>
);

/* ------------------------------------------------------------------ */
/* Numbered step rail                                                  */
/* ------------------------------------------------------------------ */

export interface Step {
  html?: string;
  title?: string;
  text?: string;
  media?: React.ReactNode;
}

export const StepRail: React.FC<{ steps: Step[]; inv?: boolean; className?: string }> = ({ steps, inv, className = '' }) => {
  const { ref, inView } = useInViewLocal();
  return (
    <ol ref={ref} className={`steps ${inv ? 'steps--inv' : ''} ${inView ? 'is-in' : ''} ${className}`.trim()} style={{ '--n': steps.length } as React.CSSProperties}>
      {steps.map((s, i) => (
        <li className="steps__item" key={i} style={{ '--i': i } as React.CSSProperties}>
          <div className="steps__rail">
            <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="steps__line" />
          </div>
          {s.title && <h3 className="steps__title">{s.title}</h3>}
          {s.html && <p className="steps__text" dangerouslySetInnerHTML={{ __html: s.html }} />}
          {s.text && <p className="steps__text">{s.text}</p>}
          {s.media && <div className="steps__media">{s.media}</div>}
        </li>
      ))}
    </ol>
  );
};

function useInViewLocal() {
  const ref = useRef<HTMLOListElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/* Feature tabs — list on one side, media on the other, auto-advance   */
/* ------------------------------------------------------------------ */

export interface Feature {
  label: string;
  description: string;
  media: string;
  isVideo?: boolean;
}

export const FeatureTabs: React.FC<{
  index?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  flip?: boolean;
  inv?: boolean;
}> = ({ index, eyebrow, title, subtitle, features, flip, inv }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInViewLocalDiv();

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % features.length), 6000);
    return () => window.clearTimeout(id);
  }, [active, paused, inView, features.length]);

  return (
    <section ref={ref} className={`ftabs ${flip ? 'ftabs--flip' : ''} ${inv ? 'ftabs--inv' : ''}`}>
      <div className="container ftabs__grid">
        <div className="ftabs__side" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Reveal>
            <Eyebrow index={index} className={inv ? 'eyebrow--inv' : ''}>{eyebrow}</Eyebrow>
          </Reveal>
          <MaskHeadline text={title} className="ftabs__title" />
          {subtitle && <Reveal as="p" className="ftabs__sub" delay={100}>{subtitle}</Reveal>}

          <div className="ftabs__list" role="tablist">
            {features.map((f, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                className={`ftabs__tab ${i === active ? 'is-active' : ''} ${paused ? 'is-paused' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="ftabs__tab-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ftabs__tab-text">
                  <strong>{f.label}</strong>
                  <span className="ftabs__tab-desc">{f.description}</span>
                </span>
                <span className="ftabs__tab-bar"><span key={`${active}-${paused}`} /></span>
              </button>
            ))}
          </div>
        </div>

        <Reveal className="ftabs__stage" variant="scale">
          {features.map((f, i) =>
            f.isVideo ? (
              <video
                key={i}
                className={i === active ? 'is-active' : ''}
                src={f.media}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
            ) : (
              <img key={i} className={i === active ? 'is-active' : ''} src={f.media} alt={f.label} loading="lazy" />
            )
          )}
          <span className="ftabs__stage-label">
            {String(active + 1).padStart(2, '0')} — {features[active]?.label}
          </span>
        </Reveal>
      </div>
    </section>
  );
};

function useInViewLocalDiv() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/* Exploded-view spec layout: item | image | item                      */
/* ------------------------------------------------------------------ */

export const Exploded: React.FC<{
  image: string;
  alt: string;
  left: { title: string; text: string }[];
  right: { title: string; text: string }[];
}> = ({ image, alt, left, right }) => {
  const ref = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className="exploded">
      <div className="exploded__col exploded__col--l">
        {left.map((it, i) => (
          <Reveal key={i} className="exploded__item" delay={i * 120}>
            <span className="exploded__tick" />
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </Reveal>
        ))}
      </div>
      <div className="exploded__img">
        <div className="exploded__halo" />
        <img src={image} alt={alt} loading="lazy" />
      </div>
      <div className="exploded__col exploded__col--r">
        {right.map((it, i) => (
          <Reveal key={i} className="exploded__item" delay={200 + i * 120}>
            <span className="exploded__tick" />
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* App download band                                                   */
/* ------------------------------------------------------------------ */

export const StoreBadges: React.FC<{ apple: string; google: string; className?: string }> = ({ apple, google, className = '' }) => (
  <div className={`badges ${className}`.trim()}>
    <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="badges__item">
      <img src={apple} alt="Download on the App Store" />
    </a>
    <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="badges__item">
      <img src={google} alt="Get it on Google Play" />
    </a>
  </div>
);

export { Btn };
