jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
  locale: "en-US",
}));

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { AddCounterInput } from "@/components/add-counter-input";

describe("AddCounterInput", () => {
  it("renders helper text and triggers callbacks", () => {
    const onChangeText = jest.fn();
    const onSubmit = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <AddCounterInput
        value="Sushi"
        onChangeText={onChangeText}
        onSubmit={onSubmit}
        helperText="Max 40"
        placeholder="Dish"
      />,
    );

    fireEvent.changeText(getByPlaceholderText("Dish"), "Nigiri");
    expect(onChangeText).toHaveBeenCalledWith("Nigiri");

    fireEvent.press(getByText("Add"));
    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(getByText("Max 40")).toBeTruthy();
  });
});
