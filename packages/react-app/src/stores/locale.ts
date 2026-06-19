import { Language, TranslationKey, translations } from '@saas/locales';
import { create } from 'zustand';

interface LocaleState {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  lang: 'cs',
  setLang: lang => set({ lang }),
  t: (key, params) => {
    const currentLang = get().lang;
    const dictionary = translations[currentLang];

    const keys = key.split('.');
    let current: unknown = dictionary;

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = (current as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    if (typeof current !== 'string') {
      return key;
    }

    if (params) {
      let formattedString = current;
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        formattedString = formattedString.replace(`{${paramKey}}`, String(paramValue));
      });
      return formattedString;
    }

    return current;
  }
}));
