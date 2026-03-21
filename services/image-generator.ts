import { t } from "@/localization";
import { getAuthToken } from "./backend-auth";

export type GeneratedImage = {
  uri: string;
};

type ImageApiResponse = {
  images?: { url: string }[];
  imageUrl?: string;
  base64?: string;
  output?: string;
};

const BASE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

function buildUrl(path: string) {
  if (!BASE_URL) {
    throw new Error(t("image.missingApiUrl"));
  }

  return BASE_URL.endsWith("/") ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
}

export async function generateImageFromText(text: string): Promise<GeneratedImage> {
  const token = await getAuthToken();
  const response = await fetch(buildUrl("api/generate-image"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 401) {
    const refreshedToken = await getAuthToken({ forceRefresh: true });
    const retryResponse = await fetch(buildUrl("api/generate-image"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshedToken}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!retryResponse.ok) {
      throw new Error(t("image.generateError"));
    }

    const data = (await retryResponse.json()) as ImageApiResponse;
    return parseImageResponse(data);
  }

  if (!response.ok) {
    throw new Error(t("image.generateError"));
  }

  const data = (await response.json()) as ImageApiResponse;
  return parseImageResponse(data);
}

function parseImageResponse(data: ImageApiResponse): GeneratedImage {
  if (data.images && data.images.length > 0 && data.images[0].url) {
    return { uri: data.images[0].url };
  }

  if (data.imageUrl) {
    return { uri: data.imageUrl };
  }

  if (data.base64) {
    return { uri: `data:image/png;base64,${data.base64}` };
  }

  if (data.output) {
    return { uri: data.output };
  }

  throw new Error(t("image.serviceInvalid"));
}
