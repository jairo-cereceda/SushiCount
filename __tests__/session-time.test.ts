jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
  locale: "en-US",
}));

import { formatDuration, formatTime } from "@/utils/session-time";

describe("session-time", () => {
  it("formats seconds under a minute", () => {
    const start = "2026-03-19T10:00:00.000Z";
    const end = "2026-03-19T10:00:30.000Z";
    expect(formatDuration(start, end)).toBe("30 seconds");
  });

  it("formats minutes and hours", () => {
    const start = "2026-03-19T10:00:00.000Z";
    const end = "2026-03-19T12:00:00.000Z";
    expect(formatDuration(start, end)).toBe("2 hours");
  });

  it("formats time without seconds", () => {
    const value = "2026-03-19T10:05:06.000Z";
    const formatted = formatTime(value);
    expect(formatted).toMatch(/\d{1,2}:\d{2}/);
    expect(formatted).not.toMatch(/:\d{2}:\d{2}/);
  });
});
