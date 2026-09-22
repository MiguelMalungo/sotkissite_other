import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import whiteLogo from '../../assets/sotkisbranco.webp';
import levelThumb from '../../assets/levelsm.webp';
import accessThumb from '../../assets/accesssm.webp';
import drsThumb from '../../assets/drs3.webp';
import './Header.css';

type Lang = 'pt' | 'en' | 'es' | 'fr' | 'gr' | 'cr';
const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'gr', label: 'EL', name: 'Ελληνικά' },
  { code: 'cr', label: 'HR', name: 'Hrvatski' },
];

const CTA: Record<Lang, string> = {
  pt: 'Fale connosco',
  en: 'Enquire now',
  es: 'Contáctenos',
  fr: 'Contactez-nous',
  gr: 'Επικοινωνία',
  cr: 'Kontaktirajte nas',
};

const HARDWARE = [
  { path: '/level', label: 'Level', img: levelThumb },
  { path: '/access', label: 'Access', img: accessThumb },
  { path: '/drs', label: 'DRS', img: drsThumb },
];

const NAV = [
  { path: '/home', label: 'Home' },
  { label: 'Hardware', children: HARDWARE },
  { path: '/platform', label: 'Software' },
  { path: '/trash4goods', label: 'App Cidadão' },
  { path: '/paylt', label: 'P(L)ayt' },
];

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hwOpen, setHwOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const lastY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);
  const hwRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHwOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (hwRef.current && !hwRef.current.contains(e.target as Node)) setHwOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangOpen(false);
        setHwOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const hwActive = HARDWARE.some((h) => location.pathname === h.path);
  const current = LANGS.find((l) => l.code === language) ?? LANGS[0];
  const cta = CTA[language as Lang] ?? CTA.en;

  return (
    <>
      <header
        className={`hdr ${scrolled ? 'hdr--scrolled' : ''} ${hidden && !menuOpen ? 'hdr--hidden' : ''} ${menuOpen ? 'hdr--menu' : ''}`}
      >
        <div className="hdr__bar">
          <Link to="/home" className="hdr__logo" aria-label="SOTKIS — Home">
            <img src={whiteLogo} alt="SOTKIS intelligent systems" />
          </Link>

          <nav className="hdr__nav" aria-label="Main">
            <ul>
              {NAV.map((item) =>
                item.children ? (
                  <li
                    key={item.label}
                    ref={hwRef}
                    className="hdr__has-menu"
                    onMouseEnter={() => setHwOpen(true)}
                    onMouseLeave={() => setHwOpen(false)}
                  >
                    <button
                      className={`hdr__link ${hwActive ? 'is-active' : ''}`}
                      aria-expanded={hwOpen}
                      onClick={() => setHwOpen((v) => !v)}
                    >
                      {item.label}
                      <svg viewBox="0 0 10 6" className="hdr__caret" aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
                    </button>
                    <div className={`hdr__mega ${hwOpen ? 'is-open' : ''}`}>
                      <div className="hdr__mega-inner">
                        {item.children.map((c, i) => (
                          <NavLink key={c.path} to={c.path} className="hdr__mega-item" style={{ '--i': i } as React.CSSProperties}>
                            <span className="hdr__mega-img"><img src={c.img} alt="" /></span>
                            <span className="hdr__mega-meta">
                              <span className="hdr__mega-idx">0{i + 1}</span>
                              <span className="hdr__mega-label">SOTKIS {c.label}</span>
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.path}>
                    <NavLink to={item.path!} className={({ isActive }) => `hdr__link ${isActive ? 'is-active' : ''}`}>
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="hdr__actions">
            <div className="hdr__lang" ref={langRef}>
              <button
                className="hdr__lang-btn"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label="Language"
                onClick={() => setLangOpen((v) => !v)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>
                {current.label}
              </button>
              <ul className={`hdr__lang-list ${langOpen ? 'is-open' : ''}`} role="listbox">
                {LANGS.map((l) => (
                  <li key={l.code}>
                    <button
                      role="option"
                      aria-selected={l.code === language}
                      className={l.code === language ? 'is-active' : ''}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                    >
                      <span>{l.label}</span>
                      {l.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/contact" className="hdr__cta">
              <span className="hdr__cta-dot" />
              {cta}
            </Link>

            <button
              className={`hdr__burger ${menuOpen ? 'is-open' : ''}`}
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet full-screen menu */}
      <div className={`mnav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mnav__inner" aria-label="Mobile">
          <ul className="mnav__list">
            {[
              { path: '/home', label: 'Home' },
              ...HARDWARE.map((h) => ({ path: h.path, label: h.label, sub: 'Hardware' })),
              { path: '/platform', label: 'Software' },
              { path: '/trash4goods', label: 'App Cidadão' },
              { path: '/paylt', label: 'P(L)ayt' },
              { path: '/contact', label: cta },
            ].map((it, i) => (
              <li key={it.path} style={{ '--i': i } as React.CSSProperties}>
                <NavLink to={it.path} className={({ isActive }) => (isActive ? 'is-active' : '')} tabIndex={menuOpen ? 0 : -1}>
                  <span className="mnav__idx">{String(i + 1).padStart(2, '0')}</span>
                  {it.label}
                  {'sub' in it && <em>{(it as { sub: string }).sub}</em>}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mnav__langs">
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={l.code === language ? 'is-active' : ''}
                onClick={() => setLanguage(l.code)}
                tabIndex={menuOpen ? 0 : -1}
                aria-label={l.name}
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};
