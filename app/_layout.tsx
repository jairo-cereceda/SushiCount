import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Head from "expo-router/head";

import { colors } from "@/styles/tokens";

export default function RootLayout() {
  return (
    <>
      <Head>
        <title>SushiCount</title>
        <meta name="description" content="Contador de sushi" />
      </Head>

      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false, title: "SushiCount" }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="dark" backgroundColor={colors.background} />
      </ThemeProvider>
    </>
  );
}
