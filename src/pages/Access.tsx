import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { accessTranslations } from '../translations/access';
import { Eyebrow } from '../components/ds/Btn';
import { MaskHeadline, Reveal } from '../components/ds/Reveal';
import { Exploded, Intro, MediaCard, PageHero, SectionHead, StepRail } from '../components/ds/Blocks';
import { VideoModal } from '../components/ds/Overlays';
import accessHeroImage from '../assets/0058-frame.webp';
import access1Image from '../assets/access1.webp';
import accessSuperficieImage from '../assets/AccessSuperficie.webp';
import accessAppT4GImage from '../assets/AccessAppT4G.webp';
import marcoExplodImage from '../assets/marco-ikon-flex-EXPLOD.172.webp';
import restrictorImage from '../assets/0042-frame.webp';
import smartTagImage from '../assets/smart-tag.webp';
import smartCardImage from '../assets/smart-card.webp';
import smartphoneImage from '../assets/smartphone.webp';
import conectarImage from '../assets/conectar.webp';
import tambor1Image from '../assets/access-com-restritor-volume-1.webp';
import tambor2Image from '../assets/access-com-restritor-volume.webp';
import alcapao1Image from '../assets/access-com-restritor-volume-2.webp';
import alcapao2Image from '../assets/access-com-restritor-volume-3.webp';
import alcapao3Image from '../assets/access-com-restritor-volume-4.webp';
import './Product.css';

const Tile: React.FC<{ srcs: string[]; alt: string }> = ({ srcs, alt }) => (
  <div className="tile">
    {srcs.map((s, i) => (
      <img key={i} src={s} alt={i === 0 ? alt : ''} loading="lazy" />
    ))}
  </div>
);

export const Access: React.FC = () => {
  const { language } = useLanguage();
  const t = accessTranslations[language];
  const [video, setVideo] = useState(false);
  const intro = t.intro as { title: string; text1: string; text2?: string; text3?: string };
  const images = [access1Image, accessSuperficieImage, accessAppT4GImage];
  const h = t.howItWorks;

  return (
    <div className="product">
      <SEO {...seoConfig.access} lang={language === 'pt' ? 'pt' : 'en'} />

      <PageHero
        image={accessHeroImage}
        eyebrow="Hardware / 02"
        code="SOTKIS · ACC"
        title={t.hero.title}
        onPlay={() => setVideo(true)}
        playLabel={t.hero.button}
      />

      <Intro index="01" eyebrow="SOTKIS Access" title={intro.title} paragraphs={[intro.text1, intro.text2, intro.text3]} />

      <section className="cards">
        <div className="container cards__grid">
          {t.carousel.map((c, i) => (
            <MediaCard key={i} index={i} image={images[i]} title={c.title} text={c.description} delay={i * 120} />
          ))}
        </div>
      </section>

      {/* Technical */}
      <section className="tech">
        <div className="container">
          <SectionHead index="02" eyebrow="Specs" title={t.technical.title} text={t.technical.text} inv />
          <Exploded
            image={marcoExplodImage}
            alt="SOTKIS Access — exploded view"
            left={[{ title: t.technical.lock.title, text: t.technical.lock.description }]}
            right={[{ title: t.technical.box.title, text: t.technical.box.description }]}
          />

          <div className="devices">
            <Reveal as="p" className="devices__text">{t.technical.devicesText}</Reveal>
            <div className="devices__grid">
              {[
                { img: smartTagImage, name: 'Smart Tag', type: 'RFID' },
                { img: smartCardImage, name: 'Smart Card', type: 'RFID' },
                { img: smartphoneImage, name: 'Smartphone', type: 'Bluetooth' },
              ].map((d, i) => (
                <Reveal key={d.name} className="device" delay={i * 120}>
                  <div className="device__img"><img src={d.img} alt={d.name} loading="lazy" /></div>
                  <div className="device__meta">
                    <strong>{d.name}</strong>
                    <span>{d.type}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Restrictor */}
      <section className="feature-split">
        <div className="container feature-split__grid">
          <div className="feature-split__copy">
            <Reveal><Eyebrow index="03">PAYT</Eyebrow></Reveal>
            <MaskHeadline text={t.restrictor.title} className="feature-split__title" />
            {language === 'pt' ? (
              <Reveal as="p" className="feature-split__text" delay={150}>
                O SOTKIS Access, por meio da instalação de um restritor volumétrico no marco de deposição,{' '}
                <strong>viabiliza a implementação do princípio PAYT.</strong> O &quot;pay-as-you-throw&quot; é um sistema em que os
                residentes pagam pelos resíduos de acordo com a quantidade que produzem, sendo considerado um sistema de pagamento
                mais justo.
                <br />
                <br />
                Dependendo do marco de deposição ou do contentor existem diferentes restritores de volume disponíveis.
              </Reveal>
            ) : (
              <Reveal as="p" className="feature-split__text" delay={150}>{t.restrictor.text}</Reveal>
            )}
          </div>
          <Reveal className="feature-split__media" variant="clip">
            <img src={restrictorImage} alt={t.restrictor.title} loading="lazy" />
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <div className="container">
          <div className="how__head">
            <Reveal><Eyebrow index="04">Workflow</Eyebrow></Reveal>
            <MaskHeadline text={h.title} className="how__title" />
          </div>

          <div className="seq">
            <div className="seq__intro">
              <span className="seq__tag">A</span>
              <Reveal as="p">{h.tamborDesc}</Reveal>
            </div>
            <StepRail
              className="steps--cards"
              steps={[
                { html: h.step1, media: <Tile srcs={[conectarImage]} alt="Conectar" /> },
                { html: h.step2Tambor, media: <Tile srcs={[tambor2Image]} alt="" /> },
                { html: h.step3Tambor, media: <Tile srcs={[tambor1Image]} alt="" /> },
              ]}
            />
          </div>

          <div className="seq">
            <div className="seq__intro">
              <span className="seq__tag">B</span>
              <div>
                <Reveal as="p">{h.alcapaoDesc1}</Reveal>
                <Reveal as="p" delay={100}>{h.alcapaoDesc2}</Reveal>
              </div>
            </div>
            <StepRail
              className="steps--cards"
              steps={[
                { html: h.step1, media: <Tile srcs={[conectarImage]} alt="Conectar" /> },
                { html: h.step2Alcapao, media: <Tile srcs={[alcapao1Image]} alt="" /> },
                { html: h.step3Alcapao, media: <Tile srcs={[alcapao2Image, alcapao3Image]} alt="" /> },
              ]}
            />
          </div>
        </div>
      </section>

      <VideoModal open={video} onClose={() => setVideo(false)} youtubeId="HS2bHBCLMoY" title="SOTKIS Access" />
    </div>
  );
};
