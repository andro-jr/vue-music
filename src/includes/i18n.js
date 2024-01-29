import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import ne from '@/locales/ne.json';

export default createI18n({
  locale: 'np',
  fallbackLocale: 'en',
  messages: {
    en,
    ne
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    ja: {
      currency: {
        style: 'currency',
        currency: 'JPY'
      }
    }
  }
});
