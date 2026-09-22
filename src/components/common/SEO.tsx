import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  lang?: 'pt' | 'en';
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage = '/Hero1.webp',
  ogType = 'website',
  canonical,
  lang = 'pt',
  structuredData
}) => {
  const location = useLocation();
  const baseUrl = 'https://miguelmalungo.github.io/sotkissite_other';
  const currentUrl = canonical || `${baseUrl}${location.pathname}`;
  const fullTitle = `${title} | Sotkis - Sotkon Intelligent Systems`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update language
    document.documentElement.lang = lang;

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', 'Sotkis - Sotkon Group');
    updateMetaTag('robots', 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', `${baseUrl}${ogImage}`, true);
    updateMetaTag('og:site_name', 'Sotkis - Sotkon Intelligent Systems', true);
    updateMetaTag('og:locale', lang === 'pt' ? 'pt_PT' : 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', `${baseUrl}${ogImage}`, true);
    updateMetaTag('twitter:url', currentUrl, true);

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Add hreflang alternate links (x-default points to canonical)
    const hreflangs: Array<{ hreflang: string; href: string }> = [
      { hreflang: 'x-default', href: currentUrl },
      { hreflang: 'pt', href: currentUrl },
      { hreflang: 'en', href: currentUrl },
    ];
    hreflangs.forEach(({ hreflang, href }) => {
      let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    });

    // Add structured data if provided
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, ogImage, ogType, currentUrl, fullTitle, lang, structuredData]);

  return null;
};





