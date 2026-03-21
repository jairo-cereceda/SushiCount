import AsyncStorage from "@react-native-async-storage/async-storage";

import type { SessionRecord, SessionState } from "@/types/session";

const SESSIONS_KEY = "sushicount:sessions:v1";
const SESSION_STATE_KEY = "sushicount:session-state:v1";

export async function loadSessions(): Promise<SessionRecord[]> {
  try {
    const raw = await AsyncStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as SessionRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveSessions(sessions: SessionRecord[]): Promise<void> {
  await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export async function deleteSession(sessionId: string): Promise<SessionRecord[]> {
  const sessions = await loadSessions();
  const next = sessions.filter((session) => session.id !== sessionId);
  await saveSessions(next);
  return next;
}

export async function loadSessionState(): Promise<SessionState | null> {
  try {
    const raw = await AsyncStorage.getItem(SESSION_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionState;
    if (!parsed?.id || !parsed?.startedAt || !parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveSessionState(state: SessionState): Promise<void> {
  await AsyncStorage.setItem(SESSION_STATE_KEY, JSON.stringify(state));
}

export async function clearSessionState(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_STATE_KEY);
}
