import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

import enTranslations from './locales/en/translation.json';
import lvTranslations from './locales/lv/translation.json';

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      lv: {
        translation: lvTranslations,
      },
    },
    fallbackLng: 'en',
  });

export default i18n;
