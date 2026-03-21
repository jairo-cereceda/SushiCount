import "@testing-library/jest-native/extend-expect";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("expo-image", () => {
  const React = require("react");
  const { View } = require("react-native");
  return { Image: (props) => React.createElement(View, props) };
});

jest.mock("react-native-safe-area-context", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
    SafeAreaView: ({ children, ...props }) => React.createElement(View, props, children),
  };
});

jest.mock("expo-symbols", () => ({
  SymbolView: () => null,
}));
