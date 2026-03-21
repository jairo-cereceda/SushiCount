import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@/styles/tokens";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  backdropFill: {
    flex: 1,
    backgroundColor: colors.sheetBackdrop,
  },
  sheet: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.text,
  },
  message: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.sheetCancel,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.danger,
    alignItems: "center",
  },
  cancelText: {
    color: colors.text,
    fontWeight: "600",
  },
  confirmText: {
    color: colors.card,
    fontWeight: "600",
  },
});
