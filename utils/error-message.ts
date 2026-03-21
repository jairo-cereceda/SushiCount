import { currentLocale, t, type TranslationKey } from "@/localization";

const englishFallbackPatterns = [
  /network request failed/i,
  /failed to fetch/i,
  /timeout/i,
  /request failed/i,
  /invalid response/i,
];

export function getLocalizedErrorMessage(error: unknown, fallbackKey: TranslationKey) {
  const fallback = t(fallbackKey);
  if (!(error instanceof Error)) return fallback;

  const message = error.message?.trim();
  if (!message) return fallback;

  if (currentLocale === "es") {
    const isEnglishFallback = englishFallbackPatterns.some((pattern) =>
      pattern.test(message),
    );
    if (isEnglishFallback) return fallback;
  }

  return message;
}
