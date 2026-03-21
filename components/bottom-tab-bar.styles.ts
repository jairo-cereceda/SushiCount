import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/tokens";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tabBarBackground,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.bodySmall,
    fontWeight: "600",
    color: colors.tabBarText,
  },
  labelActive: {
    color: colors.tabBarTextActive,
  },
  separator: {
    width: 1,
    backgroundColor: colors.tabBarDivider,
    marginVertical: spacing.sm,
  },
});
