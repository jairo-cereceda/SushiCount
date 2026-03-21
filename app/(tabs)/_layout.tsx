import React from "react";
import { Tabs } from "expo-router";
import { BottomTabBar } from "@/components/bottom-tab-bar";
import { t } from "@/localization";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, title: "SushiCount" }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: t("app.tab.home") }} />
      <Tabs.Screen name="sessions" options={{ title: t("app.tab.sessions") }} />
    </Tabs>
  );
}
