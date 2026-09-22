import React from 'react';
import { Link } from 'react-router-dom';

type BtnVariant = 'lime' | 'ink' | 'light' | 'ghost' | 'ghost-light';

interface BtnProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: BtnVariant;
  icon?: 'arrow' | 'play' | 'out';
  className?: string;
  type?: 'button' | 'submit';
  size?: 'md' | 'lg';
}

export const Icon: React.FC<{ name: 'arrow' | 'play' | 'out' | 'close' | 'prev' | 'next' | 'plus' | 'expand' }> = ({ name }) => {
  switch (name) {
    case 'play':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>;
    case 'out':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'close':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'prev':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18 9 12l6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'next':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'plus':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'expand':
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
};

export const Btn: React.FC<BtnProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'lime',
  icon = 'arrow',
  className = '',
  type = 'button',
  size = 'md',
}) => {
  const cls = `btn btn--${variant} btn--${size} ${className}`.trim();
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__icon">
        <span className="btn__icon-track">
          <Icon name={icon} />
          <Icon name={icon} />
        </span>
      </span>
    </>
  );

  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
};

export const Eyebrow: React.FC<{ index?: string; children: React.ReactNode; className?: string }> = ({
  index,
  children,
  className = '',
}) => (
  <span className={`eyebrow ${className}`.trim()}>
    <span className="eyebrow__dot" aria-hidden="true" />
    {index && <span className="eyebrow__index">{index}</span>}
    <span className="eyebrow__label">{children}</span>
  </span>
);
