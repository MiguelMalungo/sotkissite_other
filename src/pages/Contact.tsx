import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { seoConfig } from '../utils/seoConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { contactTranslations } from '../translations/contact';
import { Btn, Eyebrow } from '../components/ds/Btn';
import { MaskHeadline, Reveal } from '../components/ds/Reveal';
import { SignalArcs, SignalField } from '../components/ds/Signal';
import './Contact.css';

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = contactTranslations[language];
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    privacyPolicy: false,
    newsletter: false,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  const renderPrivacy = (text: string) => {
    const parts = text.split(/\[(.*?)\]\((.*?)\)/g);
    if (parts.length === 1) return text;
    return (
      <>
        {parts[0]}
        <a href={parts[2]} target="_blank" rel="noopener noreferrer">{parts[1]}</a>
        {parts[3]}
      </>
    );
  };

  const field = (
    name: 'name' | 'email' | 'phone' | 'company',
    type: string,
    autoComplete: string,
    required = false
  ) => (
    <div className="cf__field">
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={onChange}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
      />
      <label htmlFor={name}>{t.form[name].label}</label>
      <span className="cf__hint">{t.form[name].placeholder}</span>
    </div>
  );

  return (
    <div className="contact">
      <SEO {...seoConfig.contact} lang={language === 'pt' ? 'pt' : 'en'} />
      <SignalField className="contact__field" />
      <div className="contact__glow" aria-hidden="true" />

      <div className="container contact__grid">
        <div className="contact__intro">
          <Reveal><Eyebrow className="eyebrow--inv">Sotkon Intelligent Systems</Eyebrow></Reveal>
          <MaskHeadline as="h1" text={t.title} className="contact__title" immediate delay={150} />
          <p className="contact__sub">{t.subtitle}</p>
          <SignalArcs className="contact__arcs" />
        </div>

        <Reveal className="cf" variant="up" delay={200}>
          <form onSubmit={onSubmit} noValidate={false}>
            <div className="cf__grid">
              {field('name', 'text', 'name', true)}
              {field('email', 'email', 'email', true)}
              {field('phone', 'tel', 'tel')}
              {field('company', 'text', 'organization')}

              <div className="cf__field cf__field--full cf__field--select">
                <select id="service" name="service" value={form.service} onChange={onChange} required>
                  {t.form.service.options.map((o) => (
                    <option key={o.value} value={o.value} disabled={o.value === ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="service" className="is-fixed">{t.form.service.label}</label>
                <svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
              </div>

              <div className="cf__field cf__field--full">
                <textarea id="message" name="message" rows={4} value={form.message} onChange={onChange} placeholder=" " required />
                <label htmlFor="message">{t.form.message.label}</label>
                <span className="cf__hint">{t.form.message.placeholder}</span>
              </div>
            </div>

            <div className="cf__checks">
              <label className="cf__check">
                <input type="checkbox" name="privacyPolicy" checked={form.privacyPolicy} onChange={onChange} required />
                <span className="cf__box" aria-hidden="true" />
                <span>{renderPrivacy(t.privacy.policy)}</span>
              </label>
              <label className="cf__check">
                <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={onChange} />
                <span className="cf__box" aria-hidden="true" />
                <span>{t.privacy.newsletter}</span>
              </label>
            </div>

            <div className="cf__actions">
              <Btn type="submit" variant="lime" size="lg">{t.form.submit}</Btn>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
};
