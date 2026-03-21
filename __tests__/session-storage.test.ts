import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  clearSessionState,
  deleteSession,
  loadSessionState,
  loadSessions,
  saveSessionState,
  saveSessions,
} from "@/services/session-storage";

describe("session-storage", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it("returns empty sessions when storage is empty", async () => {
    const sessions = await loadSessions();
    expect(sessions).toEqual([]);
  });

  it("persists and loads sessions", async () => {
    const payload = [
      {
        id: "1",
        name: "Test",
        startedAt: "2026-03-19T10:00:00.000Z",
        endedAt: "2026-03-19T11:00:00.000Z",
        countersCreated: 1,
        totalCount: 2,
        counters: [],
      },
    ];
    await saveSessions(payload);
    const sessions = await loadSessions();
    expect(sessions).toEqual(payload);
  });

  it("deletes a session by id", async () => {
    const payload = [
      {
        id: "1",
        name: "Test",
        startedAt: "2026-03-19T10:00:00.000Z",
        endedAt: "2026-03-19T11:00:00.000Z",
        countersCreated: 1,
        totalCount: 2,
        counters: [],
      },
      {
        id: "2",
        name: "Test 2",
        startedAt: "2026-03-19T10:00:00.000Z",
        endedAt: "2026-03-19T11:00:00.000Z",
        countersCreated: 1,
        totalCount: 2,
        counters: [],
      },
    ];
    await saveSessions(payload);
    const next = await deleteSession("1");
    expect(next).toHaveLength(1);
    expect(next[0].id).toBe("2");
  });

  it("loads and clears session state", async () => {
    await saveSessionState({
      id: "1",
      name: "Test",
      startedAt: "2026-03-19T10:00:00.000Z",
    });

    const state = await loadSessionState();
    expect(state?.id).toBe("1");

    await clearSessionState();
    const cleared = await loadSessionState();
    expect(cleared).toBeNull();
  });
});
