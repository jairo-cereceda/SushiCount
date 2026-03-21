import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@/styles/tokens";

export const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.body,
    color: colors.inputText,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    backgroundColor: colors.primaryDisabled,
  },
  buttonText: {
    color: colors.card,
    fontSize: typography.bodySmall,
    fontWeight: "600",
  },
  helperText: {
    color: colors.textTertiary,
    fontSize: typography.caption,
  },
});
