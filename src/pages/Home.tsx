import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { homeTranslations } from '../translations/home';
import { Btn, Eyebrow, Icon } from '../components/ds/Btn';
import { MaskHeadline, Reveal } from '../components/ds/Reveal';
import { Marquee, SignalField } from '../components/ds/Signal';
import { SectionHead, useScrollProgress } from '../components/ds/Blocks';
import heroImage1 from '../assets/11.webp';
import heroImage2 from '../assets/2.webp';
import heroImage3 from '../assets/3.webp';
import heroImage4 from '../assets/4.webp';
import accessImage from '../assets/newAccess.webp';
import levelImage from '../assets/LEVEL-SondaREEN2-1.webp';
import drsImage from '../assets/SFS07103.webp';
import t4gImage from '../assets/trash4goods-pic.webp';
import ecosystemImage from '../assets/rainbow_homepage.png';
import logoPlayt from '../assets/logo-playt.webp';
import iphoneHand from '../assets/iPhone-Hand-Mockup.webp';
import './Home.css';

const platformVideo = new URL('../assets/platfvid.mp4', import.meta.url).href;
const SLIDES = [heroImage1, heroImage2, heroImage3, heroImage4];

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const t = homeTranslations[language];
  const [slide, setSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const softwareRef = useScrollProgress<HTMLElement>();
  const t4gRef = useScrollProgress<HTMLElement>();
  const heroRef = useScrollProgress<HTMLElement>();

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.playbackRate = 1.5;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const hardware = [
    { key: 'level', to: '/level', img: levelImage, data: t.level, fit: 'contain' as const },
    { key: 'access', to: '/access', img: accessImage, data: t.access, fit: 'cover' as const },
    { key: 'drs', to: '/drs', img: drsImage, data: t.drs, fit: 'cover' as const },
  ];

  return (
    <div className="home">
      <SEO {...seoConfig.home} lang={language === 'pt' ? 'pt' : 'en'} />

      {/* ---------------- HERO ---------------- */}
      <section className="hh" ref={heroRef}>
        <SignalField className="hh__field" />
        <div className="hh__glow" aria-hidden="true" />

        <div className="container hh__grid">
          <div className="hh__copy">
            <Reveal delay={100}>
              <Eyebrow className="eyebrow--inv">Sotkon Intelligent Systems</Eyebrow>
            </Reveal>
            <MaskHeadline as="h1" text={t.hero.title} className="hh__title" immediate delay={200} accentLast />
            {'subtitle' in t.hero && t.hero.subtitle && <p className="hh__subtitle">{t.hero.subtitle}</p>}
            <p className="hh__desc" dangerouslySetInnerHTML={{ __html: t.hero.description }} />
            <div className="hh__actions">
              <Btn to="/paylt" variant="lime" size="lg">{t.paylt.button}</Btn>
              <Btn to="/platform" variant="ghost-light">{t.riseAbove.button}</Btn>
            </div>
          </div>

          <div className="hh__visual">
            <div className="hh__window">
              {SLIDES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={i === slide ? 'is-active' : ''}
                  {...{ fetchpriority: i === 0 ? 'high' : 'low' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
              <div className="hh__window-ui">
                <span className="hh__live"><i />LIVE</span>
                <span className="hh__count">
                  {String(slide + 1).padStart(2, '0')}<em>/ {String(SLIDES.length).padStart(2, '0')}</em>
                </span>
              </div>
              <div className="hh__progress">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={i === slide ? 'is-active' : i < slide ? 'is-done' : ''}
                    onClick={() => setSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                  >
                    <span />
                  </button>
                ))}
              </div>
            </div>
            <img src={iphoneHand} alt="" className="hh__phone" />
          </div>
        </div>

        <div className="container hh__foot">
          {['Level', 'Access', 'DRS', 'Software', 'App', 'P(L)AYT'].map((k, i) => (
            <span key={k} style={{ '--i': i } as React.CSSProperties}>
              <em>{String(i + 1).padStart(2, '0')}</em>
              {k}
            </span>
          ))}
        </div>
      </section>

      <Marquee className="home__marquee" items={['SOTKIS Level', 'SOTKIS Access', 'SOTKIS DRS', 'Software', t.t4g.title, 'P(L)AYT']} />

      {/* ---------------- HARDWARE ---------------- */}
      <section className="hw" id="hardware">
        <div className="container">
          <SectionHead index="01" eyebrow="Hardware" title="Hardware" text={t.hardwareIntro} />

          <div className="hw__grid">
            {hardware.map((h, i) => (
              <Reveal key={h.key} delay={i * 140} className={`hw__card hw__card--${h.key}`}>
                <Link to={h.to} className="hw__link">
                  <div className={`hw__media hw__media--${h.fit}`}>
                    <img src={h.img} alt={`SOTKIS ${h.data.title}`} loading="lazy" />
                  </div>
                  <div className="hw__top">
                    <span className="hw__idx">0{i + 1}</span>
                    <span className="hw__go"><Icon name="out" /></span>
                  </div>
                  <div className="hw__body">
                    <h3 className="hw__title">{h.data.title}</h3>
                    <p className="hw__desc">{h.data.description}</p>
                    <span className="hw__cta">{h.data.button}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SOFTWARE ---------------- */}
      <section className="sw" ref={softwareRef}>
        <div className="container sw__grid">
          <div className="sw__copy">
            <Reveal><Eyebrow index="02" className="eyebrow--inv">Software</Eyebrow></Reveal>
            <MaskHeadline text={t.riseAbove.title} className="sw__title" />
            <Reveal as="p" className="sw__text" delay={150}>{t.riseAbove.text}</Reveal>
            <Reveal delay={250}>
              <Btn to="/platform" variant="lime">{t.riseAbove.button}</Btn>
            </Reveal>
          </div>
          <Reveal className="sw__device" variant="scale">
            <div className="sw__screen">
              <video ref={videoRef} src={platformVideo} muted playsInline loop preload="metadata" />
            </div>
            <div className="sw__chip sw__chip--a"><i /> Dashboard</div>
            <div className="sw__chip sw__chip--b"><i /> Portal + App</div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- APP CIDADÃO ---------------- */}
      <section className="t4g" ref={t4gRef}>
        <div className="t4g__bg" style={{ backgroundImage: `url(${t4gImage})` }} />
        <div className="t4g__scrim" />
        <div className="container t4g__inner">
          <Reveal className="t4g__card" variant="up">
            <Eyebrow index="03" className="eyebrow--inv">Trash4Goods</Eyebrow>
            <h2 className="t4g__title">{t.t4g.title}</h2>
            <p>{t.t4g.description}</p>
            <Btn to="/trash4goods" variant="lime">{t.t4g.button}</Btn>
          </Reveal>
        </div>
      </section>

      {/* ---------------- P(L)AYT ---------------- */}
      <section className="eco">
        <div className="container">
          <div className="eco__head">
            <Reveal><Eyebrow index="04">P(L)AYT — Pay Less As You Throw</Eyebrow></Reveal>
            <div className="eco__equation" aria-label="Hardware + Software + App Cidadão = P(L)AYT">
              {['Hardware', 'Software', 'App Cidadão'].map((w, i) => (
                <React.Fragment key={w}>
                  <Reveal as="span" delay={i * 160} className={`eco__term ${i === 2 ? 'eco__term--dark' : ''}`}>{w}</Reveal>
                  <Reveal as="span" delay={i * 160 + 80} className="eco__op">{i < 2 ? '+' : '='}</Reveal>
                </React.Fragment>
              ))}
              <Reveal as="span" delay={560} className="eco__result">
                <img src={logoPlayt} alt="P(L)AYT" />
              </Reveal>
            </div>
            <Reveal as="p" className="eco__desc" delay={200}>{t.paylt.description}</Reveal>
          </div>

          <Reveal className="eco__frame" variant="clip">
            <img src={ecosystemImage} alt="P(L)AYT ecosystem" loading="lazy" />
          </Reveal>

          <Reveal className="eco__cta" delay={100}>
            <Btn to="/paylt" variant="ink" size="lg">{t.paylt.button}</Btn>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
