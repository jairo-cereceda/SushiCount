import type { SessionRecord } from "@/types/session";
import { getAuthToken } from "@/services/backend-auth";
import { t } from "@/localization";

const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

type ExportPayload = {
  name: string;
  date: string;
  time: string;
  duration: string;
  counters: SessionRecord["counters"];
};

function buildUrl(path: string) {
  if (!BASE_URL) {
    throw new Error(t("image.missingApiUrl"));
  }

  return BASE_URL.endsWith("/") ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
}

export async function generateSessionSummaryImage(payload: ExportPayload) {
  const token = await getAuthToken();
  const response = await fetch(buildUrl("api/export-session"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: payload.name,
      date: payload.date,
      time: payload.time,
      duration: payload.duration,
      counters: (payload.counters ?? []).map((counter) => ({
        label: counter.label,
        count: counter.count,
        imageUri: counter.imageUri,
      })),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || t("export.error"));
  }

  const data = (await response.json()) as { base64?: string };
  if (!data?.base64) {
    throw new Error(t("image.serviceInvalid"));
  }

  return data.base64;
}
