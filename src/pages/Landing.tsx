import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { Icon } from '../components/ds/Btn';
import { SignalField } from '../components/ds/Signal';
import sotkisLogo from '../assets/Logo.png';
import googleBadge from '../assets/google.webp';
import appleBadge from '../assets/apple.webp';
import flagPt from '../assets/pt.png';
import flagEn from '../assets/en.png';
import flagFr from '../assets/fr.png';
import flagEs from '../assets/sp.png';
import flagGr from '../assets/gr.png';
import flagCr from '../assets/cr.png';
import './Landing.css';

// Landing page translations
const landingTranslations = {
  pt: {
    visitWebsite: 'Visite o Website',
    visitDescription: 'Descubra como transformamos a gestão de resíduos com tecnologia inteligente',
    exploreButton: 'Explorar o Sotkis',
    accessPlatform: 'Aceder à Plataforma',
    accessDescription: 'Faça login na plataforma SOTKIS para gerir as suas operações',
    loginButton: 'Efectuar Login',
    downloadApp: 'Faça download da APP',
  },
  en: {
    visitWebsite: 'Visit the Website',
    visitDescription: 'Discover how we transform waste management with intelligent technology',
    exploreButton: 'Explore Sotkis',
    accessPlatform: 'Access the Platform',
    accessDescription: 'Log in to the SOTKIS platform to manage your operations',
    loginButton: 'Log In',
    downloadApp: 'Download the APP',
  },
  fr: {
    visitWebsite: 'Visitez le Site Web',
    visitDescription: 'Découvrez comment nous transformons la gestion des déchets avec une technologie intelligente',
    exploreButton: 'Explorer Sotkis',
    accessPlatform: 'Accéder à la Plateforme',
    accessDescription: 'Connectez-vous à la plateforme SOTKIS pour gérer vos opérations',
    loginButton: 'Se Connecter',
    downloadApp: 'Télécharger l\'APP',
  },
  es: {
    visitWebsite: 'Visite el Sitio Web',
    visitDescription: 'Descubra cómo transformamos la gestión de residuos con tecnología inteligente',
    exploreButton: 'Explorar Sotkis',
    accessPlatform: 'Acceder a la Plataforma',
    accessDescription: 'Inicie sesión en la plataforma SOTKIS para gestionar sus operaciones',
    loginButton: 'Iniciar Sesión',
    downloadApp: 'Descarga la APP',
  },
  gr: {
    visitWebsite: 'Επισκεφθείτε τον Ιστότοπο',
    visitDescription: 'Ανακαλύψτε πώς μετασχηματίζουμε τη διαχείριση αποβλήτων με έξυπνη τεχνολογία',
    exploreButton: 'Εξερευνήστε το Sotkis',
    accessPlatform: 'Πρόσβαση στην Πλατφόρμα',
    accessDescription: 'Συνδεθείτε στην πλατφόρμα SOTKIS για να διαχειριστείτε τις λειτουργίες σας',
    loginButton: 'Σύνδεση',
    downloadApp: 'Κατεβάστε την εφαρμογή',
  },
  cr: {
    visitWebsite: 'Posjetite Web Stranicu',
    visitDescription: 'Otkrijte kako transformiramo upravljanje otpadom s inteligentnom tehnologijom',
    exploreButton: 'Istražite Sotkis',
    accessPlatform: 'Pristupite Platformi',
    accessDescription: 'Prijavite se na SOTKIS platformu za upravljanje vašim operacijama',
    loginButton: 'Prijava',
    downloadApp: 'Preuzmite APP',
  },
};

const FLAGS = [
  { code: 'pt' as const, src: flagPt, alt: 'Português' },
  { code: 'en' as const, src: flagEn, alt: 'English' },
  { code: 'fr' as const, src: flagFr, alt: 'Français' },
  { code: 'es' as const, src: flagEs, alt: 'Español' },
  { code: 'gr' as const, src: flagGr, alt: 'Ελληνικά' },
  { code: 'cr' as const, src: flagCr, alt: 'Hrvatski' },
];

export const Landing: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = landingTranslations[language];

  const Flags = ({ className }: { className: string }) => (
    <div className={`lp__flags ${className}`} role="group" aria-label="Language">
      {FLAGS.map((f) => (
        <button
          key={f.code}
          className={language === f.code ? 'is-active' : ''}
          onClick={() => setLanguage(f.code)}
          aria-label={f.alt}
          aria-pressed={language === f.code}
        >
          <img src={f.src} alt="" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="lp">
      <SEO {...seoConfig.landing} lang={language === 'pt' ? 'pt' : 'en'} />
      <SignalField className="lp__field" />
      <div className="lp__glow" aria-hidden="true" />

      <header className="lp__top">
        <span className="lp__meta">Sotkon Intelligent Systems</span>
        <Flags className="lp__flags--top" />
      </header>

      <div className="lp__center">
        <img src={sotkisLogo} alt="SOTKIS — intelligent systems" className="lp__logo" />

        <nav className="lp__rows">
          <Link to="/home" className="lp__row" style={{ '--i': 0 } as React.CSSProperties}>
            <span className="lp__idx">01</span>
            <span className="lp__text">
              <span className="lp__title">{t.visitWebsite}</span>
              <span className="lp__desc">{t.visitDescription}</span>
            </span>
            <span className="lp__action">
              <span className="lp__action-label">{t.exploreButton}</span>
              <span className="lp__circle"><Icon name="arrow" /></span>
            </span>
          </Link>

          <a
            href="https://miguelmalungo.github.io/sotkis/"
            target="_blank"
            rel="noopener noreferrer"
            className="lp__row"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            <span className="lp__idx">02</span>
            <span className="lp__text">
              <span className="lp__title">{t.accessPlatform}</span>
              <span className="lp__desc">{t.accessDescription}</span>
            </span>
            <span className="lp__action">
              <span className="lp__action-label">{t.loginButton}</span>
              <span className="lp__circle"><Icon name="out" /></span>
            </span>
          </a>

          <div className="lp__row lp__row--app" style={{ '--i': 2 } as React.CSSProperties}>
            <span className="lp__idx">03</span>
            <span className="lp__text">
              <span className="lp__title">{t.downloadApp}</span>
            </span>
            <span className="lp__badges">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img src={googleBadge} alt="Google Play" />
              </a>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                <img src={appleBadge} alt="App Store" />
              </a>
            </span>
          </div>
        </nav>
      </div>

      <footer className="lp__bottom">
        <Flags className="lp__flags--bottom" />
        <span className="lp__meta">© {new Date().getFullYear()} SOTKON</span>
      </footer>
    </div>
  );
};
