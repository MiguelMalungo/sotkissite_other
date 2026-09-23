import React, { useEffect, useRef, useState } from 'react';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { platformTranslations } from '../translations/platform';
import { homeTranslations } from '../translations/home';
import { Btn, Eyebrow, Icon } from '../components/ds/Btn';
import { MaskHeadline, Reveal } from '../components/ds/Reveal';
import { Intro, SectionHead, StoreBadges, useScrollProgress } from '../components/ds/Blocks';
import { SignalField } from '../components/ds/Signal';
import { Lightbox, type LightboxItem } from '../components/ds/Overlays';
import heroMockup from '../assets/Mockup-Desktop+Mobile-Sotkis-PT.webp';
import seloImage from '../assets/selo.webp';
import dashboardsImage from '../assets/PLATAFORMA-Dashboards.webp';
import niveisImage from '../assets/PLATAFORMA-Niveis-Enchimento-.webp';
import sotcareImage from '../assets/PLATAFORMA-Manutenções-Sotcare.webp';
import gamificacaoImage from '../assets/PLATAFORMA-Gamificação.webp';
import appleImage from '../assets/apple.webp';
import googleImage from '../assets/google.webp';
import moduloLevel from '../assets/ModuloSotkisLevel.webp';
import moduloAccess from '../assets/ModuloSotkisAccess.webp';
import moduloDRS from '../assets/ModuloSotkisDRS.webp';
import moduloSotcare from '../assets/ModuloSotcare.webp';
import moduloPlayt from '../assets/ModuloSotkisPLAYT.webp';
import moduloRoutes from '../assets/ModuloSotkisRoutes.webp';
import './Platform.css';

const appVideo = new URL('../assets/app_video.mp4', import.meta.url).href;
const FUNC_IMAGES = [dashboardsImage, niveisImage, sotcareImage, gamificacaoImage];
const MODULE_IMAGES = [moduloLevel, moduloAccess, moduloDRS, moduloSotcare, moduloPlayt, moduloRoutes];

export const Platform: React.FC = () => {
  const { language } = useLanguage();
  const t = platformTranslations[language];
  const homeT = homeTranslations[language];
  const heroRef = useScrollProgress<HTMLElement>();
  const [lb, setLb] = useState<{ items: LightboxItem[]; index: number } | null>(null);
  const [activeFunc, setActiveFunc] = useState(0);
  const funcRefs = useRef<(HTMLDivElement | null)[]>([]);

  const intro = t.intro as { title: string; text1: string; text2: string; text3?: string };
  const func = (t as { funcionalidades?: { title: string; items: { title: string; description: string }[] } }).funcionalidades;
  const moduleTitles = ['Level', 'Access', 'DRS', 'Sotcare', 'P(L)ayt', t.modules[5].title];

  useEffect(() => {
    const els = funcRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveFunc(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [func]);

  const funcItems: LightboxItem[] = func
    ? func.items.map((it, i) => ({ image: FUNC_IMAGES[i], title: it.title, description: it.description }))
    : [];
  const moduleItems: LightboxItem[] = t.modules.map((m, i) => ({
    image: MODULE_IMAGES[i],
    title: moduleTitles[i],
    description: m.description,
  }));

  return (
    <div className="platform">
      <SEO {...seoConfig.platform} lang={language === 'pt' ? 'pt' : 'en'} />

      {/* ---------------- HERO ---------------- */}
      <section className="plh" ref={heroRef}>
        <SignalField className="plh__field" />
        <div className="container plh__grid">
          <div className="plh__copy">
            <Reveal><Eyebrow className="eyebrow--inv">Software / Portal + App</Eyebrow></Reveal>
            <MaskHeadline as="h1" text={'SOTKIS\nSOFTWARE'} className="plh__title" immediate delay={150} accentLast />
            <p className="plh__tag">{t.heroTagline}</p>
            <div className="plh__actions">
              <Btn href="https://sotkis.com/login" variant="lime" size="lg" icon="out">
                {language === 'pt' ? 'Aceder ao login' : 'Login'}
              </Btn>
            </div>
          </div>
          <div className="plh__visual">
            <img src={heroMockup} alt="SOTKIS Platform" className="plh__mockup" {...{ fetchpriority: 'high' }} />
            <img src={seloImage} alt="Selo SOTKIS" className="plh__seal" />
          </div>
        </div>
      </section>

      <Intro index="01" eyebrow="Platform" title={intro.title} paragraphs={[intro.text1, intro.text2, intro.text3]} />

      {/* ---------------- FEATURES (sticky scrollytelling) ---------------- */}
      {func && (
        <section className="func">
          <div className="container">
            <SectionHead index="02" eyebrow="Features" title={func.title} />
            <div className="func__grid">
              <div className="func__list">
                {func.items.map((it, i) => (
                  <div
                    key={i}
                    data-i={i}
                    ref={(el) => (funcRefs.current[i] = el)}
                    className={`func__item ${i === activeFunc ? 'is-active' : ''}`}
                  >
                    <span className="func__num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{it.title}</h3>
                    <p>{it.description}</p>
                    <button className="func__inline" onClick={() => setLb({ items: funcItems, index: i })} aria-label={it.title}>
                      <img src={FUNC_IMAGES[i]} alt={it.title} loading="lazy" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="func__sticky">
                <button className="func__frame" onClick={() => setLb({ items: funcItems, index: activeFunc })} aria-label={func.items[activeFunc]?.title}>
                  {FUNC_IMAGES.map((img, i) => (
                    <img key={i} src={img} alt="" className={i === activeFunc ? 'is-active' : ''} loading="lazy" />
                  ))}
                  <span className="func__expand"><Icon name="expand" /></span>
                  <span className="func__meter">
                    {FUNC_IMAGES.map((_, i) => (
                      <i key={i} className={i === activeFunc ? 'is-active' : ''} />
                    ))}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------- MODULES ---------------- */}
      <section className="mods">
        <div className="container">
          <SectionHead index="03" eyebrow="Modules" title={t.modulesTitle} inv />
          <div className="mods__grid">
            {t.modules.map((m, i) => (
              <Reveal key={i} delay={(i % 3) * 110} className="mods__cell">
                <button className="mods__card" onClick={() => setLb({ items: moduleItems, index: i })}>
                  <span className="mods__media">
                    <img src={MODULE_IMAGES[i]} alt={`${moduleTitles[i]} module`} loading="lazy" />
                  </span>
                  <span className="mods__body">
                    <span className="mods__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="mods__title">{moduleTitles[i]}</span>
                    <span className="mods__desc">{m.description}</span>
                  </span>
                  <span className="mods__plus"><Icon name="plus" /></span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- APP ---------------- */}
      <section className="plapp">
        <div className="container plapp__grid">
          {/* The phone lives in the left third of the video — frame it so it never sits under the copy */}
          <Reveal className="plapp__media" variant="scale">
            <video className="plapp__video" src={appVideo} autoPlay loop muted playsInline preload="metadata" />
          </Reveal>
          <div className="plapp__copy">
            <Reveal><Eyebrow index="04" className="eyebrow--inv">App SOTKIS</Eyebrow></Reveal>
            <MaskHeadline text={homeT.app.title} className="plapp__title" />
            <Reveal as="p" className="plapp__text" delay={150}>{homeT.app.description}</Reveal>
            <Reveal delay={250}>
              <StoreBadges apple={appleImage} google={googleImage} />
            </Reveal>
          </div>
        </div>
      </section>

      <Lightbox
        items={lb?.items ?? null}
        index={lb?.index ?? 0}
        onIndex={(i) => setLb((cur) => (cur ? { ...cur, index: i } : cur))}
        onClose={() => setLb(null)}
      />
    </div>
  );
};
