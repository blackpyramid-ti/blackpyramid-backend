import { describe, it, expect, beforeEach } from 'vitest';
import i18n, { languages } from './i18n';

describe('i18n Configuration', () => {
  beforeEach(async () => {
    // Reset to English before each test
    await i18n.changeLanguage('en');
  });

  it('should have 10 languages configured', () => {
    expect(languages).toHaveLength(10);
  });

  it('should have all required languages', () => {
    const languageCodes = languages.map(l => l.code);
    expect(languageCodes).toContain('en');
    expect(languageCodes).toContain('es');
    expect(languageCodes).toContain('fr');
    expect(languageCodes).toContain('de');
    expect(languageCodes).toContain('pt-BR');
    expect(languageCodes).toContain('it');
    expect(languageCodes).toContain('nl');
    expect(languageCodes).toContain('sv');
    expect(languageCodes).toContain('pl');
    expect(languageCodes).toContain('ar');
  });

  it('should have Arabic marked as RTL', () => {
    const arabic = languages.find(l => l.code === 'ar');
    expect(arabic).toBeDefined();
    expect(arabic?.dir).toBe('rtl');
  });

  it('should have non-Arabic languages as LTR', () => {
    const ltrLanguages = languages.filter(l => l.code !== 'ar');
    ltrLanguages.forEach(lang => {
      expect(lang.dir).toBe('ltr');
    });
  });

  it('should default to English', () => {
    expect(i18n.language).toBe('en');
  });

  it('should translate navigation keys in English', () => {
    expect(i18n.t('nav.home')).toBe('Home');
    expect(i18n.t('nav.services')).toBe('Services');
    expect(i18n.t('nav.about')).toBe('About');
    expect(i18n.t('nav.insights')).toBe('Insights');
    expect(i18n.t('nav.contact')).toBe('Contact');
  });

  it('should translate hero section in English', () => {
    expect(i18n.t('hero.titleHighlight')).toBe('Unfair Advantage');
    expect(i18n.t('hero.cta')).toBe('Start Your Project');
  });

  it('should change language to Portuguese', async () => {
    await i18n.changeLanguage('pt-BR');
    expect(i18n.language).toBe('pt-BR');
    expect(i18n.t('nav.home')).toBe('Início');
    expect(i18n.t('nav.services')).toBe('Serviços');
  });

  it('should change language to Spanish', async () => {
    await i18n.changeLanguage('es');
    expect(i18n.language).toBe('es');
    expect(i18n.t('nav.home')).toBe('Inicio');
    expect(i18n.t('nav.services')).toBe('Servicios');
  });

  it('should change language to Arabic', async () => {
    await i18n.changeLanguage('ar');
    expect(i18n.language).toBe('ar');
    expect(i18n.t('nav.home')).toBe('الرئيسية');
    expect(i18n.t('nav.services')).toBe('الخدمات');
  });

  it('should have all languages with flags', () => {
    languages.forEach(lang => {
      expect(lang.flag).toBeDefined();
      expect(lang.flag.length).toBeGreaterThan(0);
    });
  });

  it('should have all languages with names', () => {
    languages.forEach(lang => {
      expect(lang.name).toBeDefined();
      expect(lang.name.length).toBeGreaterThan(0);
    });
  });
});
