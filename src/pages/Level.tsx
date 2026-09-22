import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { levelTranslations } from '../translations/level';
import { Eyebrow } from '../components/ds/Btn';
import { MaskHeadline, Reveal } from '../components/ds/Reveal';
import { Intro, PageHero, SectionHead, StepRail, useScrollProgress } from '../components/ds/Blocks';
import { VideoModal } from '../components/ds/Overlays';
import level2Image from '../assets/level2.webp';
import levelSondaImage from '../assets/LEVEL-SondaREEN2-1.webp';
import sotkisAppImage from '../assets/Sotkis-APP-DSC08537-new.webp';
import sotkisLevel1 from '../assets/sotkis-level-1.webp';
import sotkisLevel2 from '../assets/sotkis-level-2.webp';
import sotkisLevel3 from '../assets/sotkis-level-3.webp';
import sotkisLevel from '../assets/sotkis-level.webp';
import './Product.css';

export const Level: React.FC = () => {
  const { language } = useLanguage();
  const t = levelTranslations[language];
  const [video, setVideo] = useState(false);
  const pairRef = useScrollProgress<HTMLDivElement>();
  const intro = t.intro as { title: string; description: string; description2?: string };
  const sensor = t.sensor as { title: string; description?: string };

  const specs = [
    { label: t.specs.sensorTech.label, value: t.specs.sensorTech.value },
    { label: t.specs.connectivity.label, value: 'LTE Cat M1 (4G) · GSM-fallback (2G)' },
    { label: t.specs.power.label, value: t.specs.power.value },
    { label: t.specs.protection.label, value: t.specs.protection.value },
    { label: t.specs.material.label, value: t.specs.material.value },
    { label: t.specs.workTemp.label, value: t.specs.workTemp.value },
  ];

  const stageImages = [sotkisLevel3, sotkisLevel2, sotkisLevel1, sotkisLevel];

  return (
    <div className="product">
      <SEO {...seoConfig.level} lang={language === 'pt' ? 'pt' : 'en'} />

      <PageHero
        image={level2Image}
        eyebrow="Hardware / 01"
        code="SOTKIS · LVL"
        title={t.hero.title}
        onPlay={() => setVideo(true)}
        playLabel={t.hero.button}
      />

      <Intro index="01" eyebrow="SOTKIS Level" title={intro.title} paragraphs={[intro.description, intro.description2]} />

      <section className="pair">
        <div className="container">
          <div ref={pairRef} className="pair__grid">
            <Reveal className="pair__a" variant="clip">
              <img src={sotkisAppImage} alt="Sotkis APP" loading="lazy" />
            </Reveal>
            <Reveal className="pair__b" variant="clip" delay={150}>
              <img src={levelSondaImage} alt="SOTKIS Level" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tech specs */}
      <section className="specs">
        <div className="container">
          <SectionHead index="02" eyebrow="Specs" title={sensor.title} text={sensor.description} inv />
          <div className="specs__grid">
            <Reveal className="specs__visual" variant="scale">
              <div className="specs__rings" aria-hidden="true"><span /><span /><span /></div>
              <img src={levelSondaImage} alt="SOTKIS Level sensor" loading="lazy" />
            </Reveal>
            <dl className="specs__list">
              {specs.map((s, i) => (
                <Reveal key={i} className="specs__row" delay={i * 80}>
                  <dt><span>{String(i + 1).padStart(2, '0')}</span>{s.label.replace(/:$/, '')}</dt>
                  <dd>{s.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <div className="container">
          <div className="how__head">
            <Reveal><Eyebrow index="03">Workflow</Eyebrow></Reveal>
            <MaskHeadline text={t.stages.title} className="how__title" />
          </div>
          <StepRail
            className="steps--cards"
            steps={t.stageItems.map((text, i) => ({
              text,
              media: <img src={stageImages[i]} alt="" loading="lazy" className="how__img" />,
            }))}
          />
        </div>
      </section>

      <VideoModal open={video} onClose={() => setVideo(false)} youtubeId="RShrgmn1j0U" title="SOTKIS Level" />
    </div>
  );
};
