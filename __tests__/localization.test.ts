jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
  locale: "en-US",
}));

import { t } from "@/localization";

describe("localization", () => {
  it("uses English for non-spanish locales", () => {
    expect(t("session.startButton")).toBe("Start");
  });

  it("replaces template tokens", () => {
    expect(t("counter.helperMax", { max: 40 })).toBe("Maximum 40 characters");
  });
});
