import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { payltTranslations } from '../translations/paylt';
import { Eyebrow } from '../components/ds/Btn';
import { MaskHeadline, Reveal } from '../components/ds/Reveal';
import { FeatureTabs, Intro, PageHero } from '../components/ds/Blocks';
import { VideoModal } from '../components/ds/Overlays';
import heroImage from '../assets/SFS06471-copy.webp';
import logoPlaytW from '../assets/logo-playtW.png';
import containersImg from '../assets/playt-contentores.webp';
import iconAccessBag from '../assets/icon-1.webp';
import iconDrsGlass from '../assets/icon-2.webp';
import iconDrsPlastic from '../assets/icon-4.webp';
import iconAccessPaper from '../assets/icon-3.webp';
import iconAccessOrganic from '../assets/icon-4-1.webp';
import iconConectar from '../assets/conectar.webp';
import iconFatura from '../assets/fatura.webp';
import iconPontos from '../assets/pontos.webp';
import softDash from '../assets/Software_DashboardsInterativos.mp4';
import softApp from '../assets/Software_AplicacaoCidadao.webp';
import softMarket from '../assets/Software_marketplace-video.mp4';
import softPolicy from '../assets/Software_PLAYT.webp';
import hardIot from '../assets/Hardware_sensoresnivel.mp4';
import hardAccess from '../assets/Hardware_controlosAcesso2.webp';
import hardRestrictor from '../assets/Hardware_retritorVolume.webp';
import hardDrs from '../assets/Hardware_sensoresDeteção.webp';
import benefitMunicipio from '../assets/municipios-parallax.webp';
import benefitCidadao from '../assets/Cidadao_Beneficios.webp';
import './Paylt.css';

/* Copy that previously lived hard-coded in Portuguese */
const LOCAL: Record<string, { eco: string; how: string }> = {
  pt: { eco: 'Todas as soluções SOTKIS num único ecossistema', how: 'Como Funciona' },
  en: { eco: 'All SOTKIS solutions in a single ecosystem', how: 'How it works' },
  es: { eco: 'Todas las soluciones SOTKIS en un único ecosistema', how: 'Cómo funciona' },
  fr: { eco: 'Toutes les solutions SOTKIS dans un seul écosystème', how: 'Comment ça marche' },
  gr: { eco: 'Όλες οι λύσεις SOTKIS σε ένα ενιαίο οικοσύστημα', how: 'Πώς λειτουργεί' },
  cr: { eco: 'Sva SOTKIS rješenja u jedinstvenom ekosustavu', how: 'Kako funkcionira' },
};

type Scheme = {
  billingTitle: string; billingHighlight: string; billingDetail: string;
  pointsTitle: string; pointsHighlight: string; pointsDetail1: string; pointsDetail2: string;
  openingHighlight: string; openingDetail1: string; openingDetail2: string;
};
type Feat = { label: string; description: string };

export const Paylt: React.FC = () => {
  const { language } = useLanguage();
  const t = payltTranslations[language];
  const tx = t as unknown as {
    scheme: Scheme;
    contentores?: { title: string };
    software: { title: string; subtitle: string; features: Feat[] };
    hardware: { title: string; subtitle: string; features: Feat[] };
    benefits: { title: string; features: Feat[] };
    video?: { button: string };
    intro: { title: string; text1: string; text2?: string; text3?: string };
  };
  const L = LOCAL[language] ?? LOCAL.en;
  const s = tx.scheme;
  const [video, setVideo] = useState(false);

  const billingMain = s.billingDetail.split('(')[0].trim();
  const billingSub = s.billingDetail.includes('(') ? `(${s.billingDetail.split('(')[1]}` : '';

  const cols = [
    { icon: iconAccessBag, label: 'ACCESS', note: 'c/restritor de volume', detail: billingMain, sub: billingSub, group: 'bill' },
    { icon: iconDrsGlass, label: 'DRS', detail: s.pointsDetail1, group: 'pack' },
    { icon: iconDrsPlastic, label: 'DRS', detail: s.pointsDetail2, group: 'pack' },
    { icon: iconAccessPaper, label: 'ACCESS', detail: s.openingDetail1, group: 'open' },
    { icon: iconAccessOrganic, label: 'ACCESS', detail: s.openingDetail2, group: 'open' },
  ];

  const sw = tx.software.features;
  const softwareFeatures = [
    { label: sw[1].label, description: sw[1].description, media: softApp },
    { label: sw[0].label, description: sw[0].description, media: softDash, isVideo: true },
    { label: sw[2].label, description: sw[2].description, media: softMarket, isVideo: true },
    { label: sw[3].label, description: sw[3].description, media: softPolicy },
  ];
  const hardwareMedia = [hardIot, hardAccess, hardRestrictor, hardDrs];
  const hardwareFeatures = tx.hardware.features.map((f, i) => ({ ...f, media: hardwareMedia[i], isVideo: i === 0 }));
  const benefitsMedia = [benefitMunicipio, benefitCidadao];
  const benefitsFeatures = tx.benefits.features.map((f, i) => ({ ...f, media: benefitsMedia[i] }));

  return (
    <div className="paylt">
      <SEO {...seoConfig.paylt} lang={language === 'pt' ? 'pt' : 'en'} />

      <PageHero
        image={heroImage}
        eyebrow="Pay Less As You Throw"
        code="SOTKIS · PLAYT"
        title={`P(L)AYT\n${L.eco}`}
        onPlay={() => setVideo(true)}
        playLabel={tx.video?.button || 'Play Video'}
      >
        <div className="pl-eq" aria-label="Hardware + Software + App Cidadão → P(L)AYT">
          <span>Hardware</span>
          <i>+</i>
          <span>Software</span>
          <i>+</i>
          <span className="pl-eq__dark">App Cidadão</span>
          <i className="pl-eq__arrow">→</i>
          <img src={logoPlaytW} alt="P(L)AYT" />
        </div>
      </PageHero>

      <Intro index="01" eyebrow="Sotkis P(L)AYT" title={tx.intro.title} paragraphs={[tx.intro.text1, tx.intro.text2, tx.intro.text3]} />

      {/* ---------------- HOW IT WORKS SCHEME ---------------- */}
      <section className="scheme">
        <div className="container">
          <div className="scheme__head">
            <Reveal><Eyebrow index="02">{L.how}</Eyebrow></Reveal>
            <MaskHeadline text={tx.contentores?.title || ''} className="scheme__title" />
          </div>

          <Reveal className="scheme__board" variant="up">
            {/* Group headers */}
            <div className="scheme__groups">
              <div className="scheme__group scheme__group--bill">
                <img src={iconFatura} alt="" />
                <span>{s.billingTitle}</span>
              </div>
              <div className="scheme__group scheme__group--pts">
                <img src={iconPontos} alt="" />
                <span>{s.pointsTitle}</span>
              </div>
            </div>

            {/* Rules */}
            <div className="scheme__rules">
              <div className="scheme__rule scheme__rule--bill">{s.billingHighlight}</div>
              <div className="scheme__rule scheme__rule--pack">{s.pointsHighlight}</div>
              <div className="scheme__rule scheme__rule--open">{s.openingHighlight}</div>
            </div>

            {/* Columns */}
            <div className="scheme__cols">
              {cols.map((c, i) => (
                <div key={i} className={`scheme__col scheme__col--${c.group}`}>
                  <div className="scheme__icon"><img src={c.icon} alt="" /></div>
                  <p className="scheme__device">SOTKIS <strong>{c.label}</strong></p>
                  {c.note && <p className="scheme__note">{c.note}</p>}
                  <p className="scheme__detail">{c.detail}</p>
                  {c.sub && <p className="scheme__sub">{c.sub}</p>}
                </div>
              ))}
            </div>

            <div className="scheme__foot">
              <img src={iconConectar} alt="RFID & Bluetooth" className="scheme__conectar" />
              <span>RFID · Bluetooth</span>
            </div>
          </Reveal>

          <Reveal className="scheme__containers" variant="clip">
            <img src={containersImg} alt="Contentores P(L)AYT" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <FeatureTabs index="03" eyebrow="Impact" title={tx.benefits.title} features={benefitsFeatures} inv />
      <FeatureTabs index="04" eyebrow="Hardware" title={tx.hardware.title} subtitle={tx.hardware.subtitle} features={hardwareFeatures} flip />
      <FeatureTabs index="05" eyebrow="Software" title={tx.software.title} subtitle={tx.software.subtitle} features={softwareFeatures} inv />

      <VideoModal open={video} onClose={() => setVideo(false)} youtubeId="M0Gr6pVUz4E" title="SOTKON Intelligent Systems — Sotkis" />
    </div>
  );
};
