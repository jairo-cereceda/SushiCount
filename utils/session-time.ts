import { getLocaleTag, t } from "@/localization";

export function formatDuration(start: string, end: string) {
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  const diffSeconds = Math.max(0, Math.round((endMs - startMs) / 1000));

  if (diffSeconds < 60) {
    return diffSeconds === 1
      ? t("time.second", { count: diffSeconds })
      : t("time.seconds", { count: diffSeconds });
  }

  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) {
    return diffMinutes === 1
      ? t("time.minute", { count: diffMinutes })
      : t("time.minutes", { count: diffMinutes });
  }

  const diffHours = Math.round(diffMinutes / 60);
  return diffHours === 1
    ? t("time.hour", { count: diffHours })
    : t("time.hours", { count: diffHours });
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString(getLocaleTag());
}

export function formatTime(value: string) {
  return new Date(value).toLocaleTimeString(getLocaleTag(), {
    hour: "2-digit",
    minute: "2-digit",
  });
}
