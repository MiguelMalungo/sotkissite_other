import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { footerTranslations } from '../../translations/footer';
import { contactTranslations } from '../../translations/contact';
import { Icon } from '../ds/Btn';
import { MaskHeadline, Reveal } from '../ds/Reveal';
import { SignalArcs } from '../ds/Signal';
import logoImage from '../../assets/logotipo-sotkon-neg-preto.webp';
import './Footer.css';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = footerTranslations[language];
  const c = contactTranslations[language];
  const { pathname } = useLocation();
  const year = new Date().getFullYear();
  const showCta = pathname !== '/contact';

  return (
    <footer className="ftr">
      {showCta && (
        <Link to="/contact" className="ftr__cta">
          <div className="container ftr__cta-inner">
            <Reveal className="ftr__cta-sub">
              <SignalArcs className="ftr__cta-arcs" />
              <span>{c.subtitle}</span>
            </Reveal>
            <div className="ftr__cta-row">
              <MaskHeadline text={c.title} className="ftr__cta-title" />
              <span className="ftr__cta-circle" aria-hidden="true">
                <Icon name="out" />
              </span>
            </div>
          </div>
        </Link>
      )}

      <div className="container ftr__grid">
        <div className="ftr__brand">
          <a href="https://sotkon.com" target="_blank" rel="noopener noreferrer" className="ftr__logo">
            <img src={logoImage} alt="Sotkon waste systems" />
          </a>
          <p className="ftr__tag">{t.description}</p>
          <div className="ftr__social">
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.1 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" /></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M21.8 8a2.5 2.5 0 0 0-1.76-1.78C18.07 6 12 6 12 6s-6.07 0-8.04.22A2.5 2.5 0 0 0 2.2 8 26 26 0 0 0 2 12a26 26 0 0 0 .2 4 2.5 2.5 0 0 0 1.76 1.78C5.93 18 12 18 12 18s6.07 0 8.04-.22A2.5 2.5 0 0 0 21.8 16a26 26 0 0 0 .2-4 26 26 0 0 0-.2-4ZM10 14.5v-5l4.5 2.5-4.5 2.5Z" /></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.11 20.45H3.56V9h3.55v11.45Z" /></svg>
            </a>
          </div>
        </div>

        <nav className="ftr__col" aria-label={t.products.title}>
          <h4 className="ftr__h">{t.products.title}</h4>
          <ul>
            {t.products.links.map((l, i) => (
              <li key={i}>
                <Link to={l.path}>
                  <span className="ftr__idx">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ftr__col ftr__news">
          <h4 className="ftr__h">{t.newsletter.title}</h4>
          <form className="ftr__form" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="ftr-email">{t.newsletter.placeholder}</label>
            <input id="ftr-email" type="email" placeholder={t.newsletter.placeholder} required />
            <button type="submit">
              {t.newsletter.button}
              <Icon name="arrow" />
            </button>
          </form>
          <p className="ftr__note">{t.newsletter.note}</p>
        </div>
      </div>

      <div className="ftr__mark" aria-hidden="true">sotkis</div>

      <div className="container ftr__bottom">
        <span>
          © {year} {t.copyright}{' '}
          <a href="https://sotkon.com" target="_blank" rel="noopener noreferrer">SOTKON</a>
        </span>
        <a href={t.privacyPolicy.url} target="_blank" rel="noopener noreferrer">{t.privacyPolicy.label}</a>
        <button className="ftr__top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <svg viewBox="0 0 24 24"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
        </button>
      </div>
    </footer>
  );
};
