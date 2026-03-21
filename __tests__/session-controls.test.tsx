jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
  locale: "en-US",
}));

import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { SessionControls } from "@/components/session-controls";

describe("SessionControls", () => {
  it("shows input and start button when inactive", () => {
    const onNameChange = jest.fn();
    const onStart = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <SessionControls
        isActive={false}
        name=""
        onNameChange={onNameChange}
        onStart={onStart}
        onEnd={jest.fn()}
      />,
    );

    fireEvent.changeText(getByPlaceholderText("Restaurant"), "Sushi Bar");
    expect(onNameChange).toHaveBeenCalledWith("Sushi Bar");

    fireEvent.press(getByText("Start"));
    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("shows session name and end button when active", () => {
    const onEnd = jest.fn();

    const { getByText } = render(
      <SessionControls
        isActive
        name="Sushi Bar"
        onNameChange={jest.fn()}
        onStart={jest.fn()}
        onEnd={onEnd}
      />,
    );

    expect(getByText("Sushi Bar")).toBeTruthy();

    fireEvent.press(getByText("End session"));
    expect(onEnd).toHaveBeenCalledTimes(1);
  });
});
