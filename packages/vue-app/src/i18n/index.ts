import { createI18n } from 'vue-i18n';
import { cs, en } from '@saas/locales';

type MessageSchema = typeof cs;

const i18n = createI18n<[MessageSchema], 'cs' | 'en'>({
  legacy: false,
  locale: 'cs',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    cs,
    en
  }
});

export default i18n;
