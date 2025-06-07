import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './locales/eng.json';
import geo from './locales/geo.json';

const storedLang = localStorage.getItem('lang') || 'eng';

i18n.use(initReactI18next).init({
  resources: {
    eng: {
      translation: eng,
    },
    geo: {
      translation: geo,
    },
  },
  lng: storedLang,
  fallbackLng: 'eng', //default language
  interpolation: {
    escapeValue: false,
  },
});
