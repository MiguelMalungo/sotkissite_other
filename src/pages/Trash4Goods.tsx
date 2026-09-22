import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { trash4goodsTranslations } from '../translations/trash4goods';
import { Btn, Eyebrow } from '../components/ds/Btn';
import { MaskHeadline, Reveal } from '../components/ds/Reveal';
import { Intro, PageHero, StoreBadges, useScrollProgress } from '../components/ds/Blocks';
import { SignalField } from '../components/ds/Signal';
import { VideoModal } from '../components/ds/Overlays';
import heroImage from '../assets/SFS06451.webp';
import appleImage from '../assets/apple.webp';
import googleImage from '../assets/google.webp';
import t4gHomepage from '../assets/T4G-homepage-pt.webp';
import t4gMap from '../assets/T4G-map-pt.webp';
import t4gRecycling from '../assets/T4G-recycling-location-pt.webp';
import t4gDrs from '../assets/T4G-drs-recycle-success-pt.webp';
import t4gMarketplace from '../assets/T4G-marketplace-pt.webp';
import './Product.css';

const SCREENS = [t4gHomepage, t4gMap, t4gRecycling, t4gDrs, t4gMarketplace];

export const Trash4Goods: React.FC = () => {
  const { language } = useLanguage();
  const t = trash4goodsTranslations[language];
  const [video, setVideo] = useState(false);
  const [active, setActive] = useState(0);
  const phonesRef = useScrollProgress<HTMLDivElement>();
  const intro = t.intro as { title: string; text1: string; text2?: string; text3?: string };

  return (
    <div className="product">
      <SEO {...seoConfig.trash4goods} lang={language === 'pt' ? 'pt' : 'en'} />

      <PageHero
        image={heroImage}
        eyebrow="App Cidadão"
        code="T4G"
        title={t.hero.title}
        onPlay={() => setVideo(true)}
        playLabel={t.hero.button}
      />

      <Intro index="01" eyebrow="Trash4Goods" title={intro.title} paragraphs={[intro.text1, intro.text2, intro.text3]} />

      {/* Interactive walkthrough */}
      <section className="walk">
        <SignalField className="walk__field" density={52} />
        <div className="container walk__grid">
          <div className="walk__list">
            <Reveal><Eyebrow index="02" className="eyebrow--inv">Walkthrough</Eyebrow></Reveal>
            <MaskHeadline text={t.howItWorks.title} className="walk__title" />
            <ol>
              {t.steps.map((s, i) => (
                <li key={i}>
                  <button
                    className={i === active ? 'is-active' : ''}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="walk__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="walk__t" dangerouslySetInnerHTML={{ __html: s }} />
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div ref={phonesRef} className="walk__stage" aria-live="polite">
            <div className="walk__halo" />
            {SCREENS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Trash4Goods — ${i + 1}`}
                className={`walk__phone ${i === active ? 'is-active' : ''}`}
                style={{ '--o': i - active } as React.CSSProperties}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* App download */}
      <section className="appband">
        <div className="container appband__grid">
          <div className="appband__copy">
            <Reveal><Eyebrow index="03">Download</Eyebrow></Reveal>
            <h2 className="appband__title">
              TRASH<span>4</span>GOODS
            </h2>
            <Reveal as="p" className="appband__text" delay={100}>{t.app.description}</Reveal>
            <Reveal delay={200}>
              <StoreBadges apple={appleImage} google={googleImage} />
            </Reveal>
            <Reveal delay={300}>
              <Btn href="https://www.trash4goods.com/" variant="ink" icon="out">{t.app.cta}</Btn>
            </Reveal>
          </div>
          <Reveal className="appband__phones" variant="scale">
            <img src={t4gMarketplace} alt="" loading="lazy" />
            <img src={t4gHomepage} alt="Trash4Goods app" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <VideoModal open={video} onClose={() => setVideo(false)} youtubeId="pv3ENJ8CYoY" title="App Cidadão" />
    </div>
  );
};
