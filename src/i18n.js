import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all language files
import enUS from './locales/en-US.json';
import tr from './locales/tr.json';

const resources = {
  'en-US': { translation: enUS },
  'tr': { translation: tr },
};

export const languages = [
  { code: 'en-US', name: 'English', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
