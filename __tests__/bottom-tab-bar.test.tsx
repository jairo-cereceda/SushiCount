jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
  locale: "en-US",
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { BottomTabBar } from "@/components/bottom-tab-bar";

describe("BottomTabBar", () => {
  it("navigates to a different tab when pressed", () => {
    const navigation = {
      emit: jest.fn(() => ({ defaultPrevented: false })),
      navigate: jest.fn(),
    };

    const props = {
      state: {
        index: 0,
        routeNames: ["index", "sessions"],
        routes: [
          { key: "index", name: "index" },
          { key: "sessions", name: "sessions" },
        ],
        key: "tab",
        stale: false,
        type: "tab",
        history: [],
      },
      descriptors: {
        index: { options: { title: "Home" } },
        sessions: { options: { title: "Sessions" } },
      },
      navigation,
      insets: { top: 0, bottom: 0, left: 0, right: 0 },
    } as any;

    const { getByText } = render(<BottomTabBar {...props} />);

    fireEvent.press(getByText("Sessions"));
    expect(navigation.emit).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith("sessions");
  });
});
