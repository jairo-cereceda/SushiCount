jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
  locale: "en-US",
}));

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ActionSheet } from "@/components/action-sheet";

describe("ActionSheet", () => {
  it("renders title and message and handles actions", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    const { getByText } = render(
      <ActionSheet
        visible
        title="Confirm"
        message="Are you sure?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    expect(getByText("Confirm")).toBeTruthy();
    expect(getByText("Are you sure?")).toBeTruthy();

    fireEvent.press(getByText("No"));
    expect(onCancel).toHaveBeenCalledTimes(1);

    fireEvent.press(getByText("Yes"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
