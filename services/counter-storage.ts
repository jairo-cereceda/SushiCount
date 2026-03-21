import AsyncStorage from "@react-native-async-storage/async-storage";

import type { CounterItem } from "@/types/counter";

type PersistedCounter = {
  id: string;
  label: string;
  count: number;
  imageUri?: string;
};

const STORAGE_KEY = "sushicount:counters:v1";

export async function loadCounters(): Promise<CounterItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as PersistedCounter[];
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => ({
      id: item.id,
      label: item.label,
      count: Math.max(0, Number(item.count) || 0),
      status: item.imageUri ? "ready" : "idle",
      imageUri: item.imageUri,
    }));
  } catch {
    return [];
  }
}

export async function saveCounters(counters: CounterItem[]): Promise<void> {
  const payload: PersistedCounter[] = counters.map((item) => ({
    id: item.id,
    label: item.label,
    count: item.count,
    imageUri: item.imageUri,
  }));

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
