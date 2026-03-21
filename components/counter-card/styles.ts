import { StyleSheet } from "react-native";
import { colors, radius, sizes, spacing, typography } from "@/styles/tokens";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xxl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.md,
  },
  imageColumn: {
    alignItems: "flex-start",
  },
  middleColumn: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.xs,
  },
  rightColumn: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  deleteRow: {
    marginTop: 0,
  },
  label: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600",
  },
  count: {
    color: colors.success,
    fontSize: typography.count,
    fontWeight: "700",
  },
  imageFrame: {
    width: sizes.image,
    height: sizes.image,
    borderRadius: radius.xl,
    overflow: "hidden",
    backgroundColor: colors.inputDisabled,
  },
  deleteButton: {
    backgroundColor: colors.dangerBg,
    width: sizes.image,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  deleteText: {
    color: colors.danger,
    fontSize: typography.caption,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: spacing.sm,
  },
  imageStatus: {
    color: colors.muted,
    fontSize: typography.caption,
    textAlign: "center",
  },
  actionButton: {
    width: sizes.actionButtonWidth,
    height: sizes.actionButtonHeight,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  actionPressed: {
    opacity: 0.8,
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.caption,
  },
});
