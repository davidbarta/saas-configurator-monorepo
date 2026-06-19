import cs from './cs';
import en from './en';

export { cs, en };
export type Language = 'cs' | 'en';

export const translations = { cs, en };

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Leaves<T> = T extends object ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T] : '';

export type TranslationKey = Leaves<typeof cs>;
