import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { drsTranslations } from '../translations/drs';
import { Eyebrow } from '../components/ds/Btn';
import { MaskHeadline, Reveal } from '../components/ds/Reveal';
import { Exploded, Intro, MediaCard, PageHero, SectionHead, StepRail } from '../components/ds/Blocks';
import { VideoModal } from '../components/ds/Overlays';
import drsHeroImage from '../assets/SFS06839.webp';
import dsc5571Image from '../assets/-DSC5571.webp';
import dsc6216Image from '../assets/-DSC6216.webp';
import sfs06884Image from '../assets/SFS06884.webp';
import drsExplodImage from '../assets/2101-100-020-m-EXPLOD.113.webp';
import smartTagIcon from '../assets/conectar.webp';
import depositarIcon from '../assets/icon-2.webp';
import pontuarIcon from '../assets/prize.webp';
import trocarIcon from '../assets/DRS.webp';
import drsSc from '../assets/drsesq.png';
import drsScEn from '../assets/drsesq_en.png';
import './Product.css';

export const DRS: React.FC = () => {
  const { language } = useLanguage();
  const t = drsTranslations[language];
  const [video, setVideo] = useState(false);
  const cardImages = [dsc5571Image, dsc6216Image, sfs06884Image];
  const stepIcons = [smartTagIcon, depositarIcon, pontuarIcon, trocarIcon];

  return (
    <div className="product">
      <SEO {...seoConfig.drs} lang={language === 'pt' ? 'pt' : 'en'} />

      <PageHero
        image={drsHeroImage}
        eyebrow="Hardware / 03"
        code="SOTKIS · DRS"
        title={t.hero.title}
        onPlay={() => setVideo(true)}
        playLabel={t.hero.button}
      />

      <Intro index="01" eyebrow="SOTKIS DRS" title={t.content.title} paragraphs={[t.content.text1, t.content.text2]} />

      <section className="cards">
        <div className="container cards__grid">
          {t.cards.map((c, i) => (
            <MediaCard key={i} index={i} image={cardImages[i]} title={c.title} text={c.description} delay={i * 120} />
          ))}
        </div>
      </section>

      <section className="tech">
        <div className="container">
          <SectionHead index="02" eyebrow="Specs" title={t.technical.title} text={t.technical.text} inv />
          <Exploded
            image={drsExplodImage}
            alt="SOTKIS DRS — exploded view"
            left={[{ title: t.technical.box.title, text: t.technical.box.description }]}
            right={[{ title: t.technical.ring.title, text: t.technical.ring.description }]}
          />
        </div>
      </section>

      <section className="how">
        <div className="container">
          <div className="how__head">
            <Reveal><Eyebrow index="03">Workflow</Eyebrow></Reveal>
            <MaskHeadline text={t.howItWorks.title} className="how__title" />
          </div>
          <StepRail
            className="steps--icons"
            steps={t.steps.map((s, i) => ({
              title: s.title,
              text: s.description,
              media: (
                <div className="icon-disc">
                  <img src={stepIcons[i]} alt="" loading="lazy" />
                </div>
              ),
            }))}
          />
        </div>
      </section>

      <section className="cycle">
        <div className="container">
          <SectionHead index="04" eyebrow="Circular" title={t.cycle.title} />
          <Reveal className="cycle__frame" variant="clip">
            <img src={language === 'pt' ? drsSc : drsScEn} alt={t.cycle.title} loading="lazy" />
          </Reveal>
        </div>
      </section>

      <VideoModal open={video} onClose={() => setVideo(false)} youtubeId="JeTtkIFl3uk" title="SOTKIS DRS" />
    </div>
  );
};
