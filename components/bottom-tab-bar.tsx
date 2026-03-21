import React from "react";
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/styles/tokens";
import { styles } from "./bottom-tab-bar.styles";

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home-outline",
  sessions: "list-outline",
};

export function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: spacing.sm + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : (options.title ?? route.name);
        const isFocused = state.index === index;
        const iconName = ICONS[route.name] ?? "ellipse-outline";
        const tintColor = isFocused ? colors.tabBarTextActive : colors.tabBarText;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <React.Fragment key={route.key}>
            <Pressable
              accessibilityRole="tab"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              <View style={styles.tabContent}>
                <Ionicons name={iconName} size={18} color={tintColor} />
                <Text style={[styles.label, isFocused ? styles.labelActive : null]}>
                  {label}
                </Text>
              </View>
            </Pressable>
            {index < state.routes.length - 1 ? <View style={styles.separator} /> : null}
          </React.Fragment>
        );
      })}
    </View>
  );
}
