jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
  locale: "en-US",
}));

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { CounterCard } from "@/components/counter-card";
import type { CounterItem } from "@/types/counter";

describe("CounterCard", () => {
  it("renders counter info and handles actions", () => {
    const counter: CounterItem = {
      id: "1",
      label: "Nigiri",
      count: 2,
      status: "loading",
    };

    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const onDelete = jest.fn();

    const { getByText, getByLabelText } = render(
      <CounterCard
        counter={counter}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />,
    );

    expect(getByText("Nigiri")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
    expect(getByText("Generating...")).toBeTruthy();

    fireEvent.press(getByLabelText("Add to Nigiri"));
    expect(onIncrement).toHaveBeenCalledWith("1");

    fireEvent.press(getByLabelText("Subtract from Nigiri"));
    expect(onDecrement).toHaveBeenCalledWith("1");

    fireEvent.press(getByLabelText("Delete Nigiri"));
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
