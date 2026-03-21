import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "@/localization";

const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;
const TOKEN_STORAGE_KEY = "sushicount:image-api-token";
const EXPIRY_SKEW_MS = 30_000;

type AuthResponse = {
  token: string;
  expiresAt?: string;
};

type StoredToken = {
  token: string;
  expiresAt?: string;
};

type TokenOptions = {
  forceRefresh?: boolean;
};

function buildUrl(path: string) {
  if (!BASE_URL) {
    throw new Error(t("image.missingApiUrl"));
  }

  return BASE_URL.endsWith("/") ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
}

function isTokenValid(data?: StoredToken) {
  if (!data?.token || !data.expiresAt) {
    return false;
  }

  const expiresAt = Date.parse(data.expiresAt);
  if (Number.isNaN(expiresAt)) {
    return false;
  }

  return expiresAt - EXPIRY_SKEW_MS > Date.now();
}

async function requestNewToken() {
  const response = await fetch(buildUrl("auth/anon"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(t("image.authError"));
  }

  const data = (await response.json()) as AuthResponse;

  if (!data.token) {
    throw new Error(t("image.authError"));
  }

  const stored: StoredToken = {
    token: data.token,
    expiresAt: data.expiresAt,
  };

  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(stored));

  return stored;
}

export async function getAuthToken(options?: TokenOptions) {
  if (!options?.forceRefresh) {
    const raw = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredToken;
      if (isTokenValid(parsed)) {
        return parsed.token;
      }
    }
  }

  const fresh = await requestNewToken();
  return fresh.token;
}
