import * as Localization from "expo-localization";

import { en } from "./en";
import { es } from "./es";

const fallbackLocale = "en";

const localeTag =
  Localization.getLocales?.()[0]?.languageTag || Localization.locale || fallbackLocale;

const languageCode = localeTag.split(/[-_]/)[0]?.toLowerCase() ?? fallbackLocale;

export type Locale = "es" | "en";

export const currentLocale: Locale = languageCode === "es" ? "es" : "en";

const strings = {
  en,
  es,
} as const;

export type TranslationKey = keyof typeof strings.en;

export function t(key: TranslationKey, params?: Record<string, string | number>) {
  const template = strings[currentLocale][key] ?? strings[fallbackLocale][key];
  if (!template) return key;

  if (!params) return template;

  return template.replace(/{{\s*(\w+)\s*}}/g, (_, token: string) =>
    params[token] !== undefined ? String(params[token]) : "",
  );
}

export function getLocaleTag() {
  return localeTag;
}
