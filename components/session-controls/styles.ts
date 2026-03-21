import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@/styles/tokens";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  sessionName: {
    flex: 1,
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.text,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.bodySmall,
    color: colors.inputText,
  },
  inputDisabled: {
    backgroundColor: colors.inputDisabled,
    color: colors.muted,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
  },
  secondaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
  },
  primaryText: {
    color: colors.card,
    fontSize: typography.bodySmall,
    fontWeight: "600",
  },
  secondaryText: {
    color: colors.card,
    fontSize: typography.bodySmall,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.85,
  },
});
