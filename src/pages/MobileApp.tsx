import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { Eyebrow, Icon } from '../components/ds/Btn';
import { MaskHeadline } from '../components/ds/Reveal';
import { SignalField } from '../components/ds/Signal';
import { VideoModal } from '../components/ds/Overlays';
import './MobileApp.css';

export const MobileApp: React.FC = () => {
  const { language } = useLanguage();
  const [video, setVideo] = useState(false);
  const pt = language === 'pt';

  return (
    <div className="mapp">
      <SEO {...seoConfig['mobile-app']} lang={pt ? 'pt' : 'en'} />
      <SignalField className="mapp__field" />
      <div className="container mapp__inner">
        <Eyebrow className="eyebrow--inv">App</Eyebrow>
        <MaskHeadline as="h1" text={pt ? 'Aplicação Mobile' : 'Mobile Application'} className="mapp__title" immediate />
        <p className="mapp__sub">
          {pt
            ? 'Esta página está em desenvolvimento. Em breve teremos mais informações.'
            : 'This page is under development. More information coming soon.'}
        </p>
        <button className="play-btn" onClick={() => setVideo(true)}>
          <span className="play-btn__disc"><Icon name="play" /></span>
          <span className="play-btn__label">{pt ? 'Ver vídeo' : 'Watch video'}</span>
        </button>
      </div>
      <VideoModal open={video} onClose={() => setVideo(false)} youtubeId="pv3ENJ8CYoY" title="App Cidadão" />
    </div>
  );
};
