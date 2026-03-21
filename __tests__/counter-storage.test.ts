import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadCounters, saveCounters } from "@/services/counter-storage";

describe("counter-storage", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("returns empty array when storage is empty", async () => {
    const counters = await loadCounters();
    expect(counters).toEqual([]);
  });

  it("persists and loads counters", async () => {
    await saveCounters([
      { id: "1", label: "Nigiri", count: 2, status: "ready", imageUri: "x" },
    ]);
    const counters = await loadCounters();
    expect(counters).toEqual([
      { id: "1", label: "Nigiri", count: 2, status: "ready", imageUri: "x" },
    ]);
  });

  it("clamps negative counts to zero", async () => {
    await AsyncStorage.setItem(
      "sushicount:counters:v1",
      JSON.stringify([{ id: "1", label: "Nigiri", count: -5 }]),
    );

    const counters = await loadCounters();
    expect(counters[0].count).toBe(0);
  });
});
