import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Btn';

function useLockScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

export const VideoModal: React.FC<{
  open: boolean;
  onClose: () => void;
  youtubeId?: string;
  src?: string;
  title: string;
}> = ({ open, onClose, youtubeId, src, title }) => {
  useLockScroll(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <button className="overlay__close" onClick={onClose} aria-label="Close">
        <Icon name="close" />
      </button>
      <div className="overlay__video" onClick={(e) => e.stopPropagation()}>
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <video src={src} controls autoPlay playsInline />
        )}
      </div>
    </div>,
    document.body
  );
};

export interface LightboxItem {
  image: string;
  title: string;
  description: string;
}

export const Lightbox: React.FC<{
  items: LightboxItem[] | null;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}> = ({ items, index, onIndex, onClose }) => {
  const open = !!items;
  useLockScroll(open);

  const prev = useCallback(() => items && onIndex((index - 1 + items.length) % items.length), [items, index, onIndex]);
  const next = useCallback(() => items && onIndex((index + 1) % items.length), [items, index, onIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, prev, next]);

  if (!items) return null;
  const item = items[index];

  return createPortal(
    <div className="overlay overlay--lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button className="overlay__close" onClick={onClose} aria-label="Close">
        <Icon name="close" />
      </button>
      <figure className="lightbox" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox__media">
          <img key={item.image} src={item.image} alt={item.title} />
        </div>
        <figcaption className="lightbox__caption">
          <span className="lightbox__count">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {items.length > 1 && (
            <div className="lightbox__nav">
              <button onClick={prev} aria-label="Previous"><Icon name="prev" /></button>
              <button onClick={next} aria-label="Next"><Icon name="next" /></button>
            </div>
          )}
        </figcaption>
      </figure>
    </div>,
    document.body
  );
};
