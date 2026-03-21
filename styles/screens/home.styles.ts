import { StyleSheet } from "react-native";
import { colors, radius, spacing, shadows, typography } from "@/styles/tokens";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    position: "relative",
  },
  container: {
    flex: 1,
    marginInline: spacing.lg,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    margin: spacing.xl,
    alignSelf: "center",
    width: "100%",
    maxWidth: 560,
    display: "flex",
    gap: spacing.md,
    ...shadows.surface,
  },
  listEmptyContent: {
    paddingVertical: spacing.xl,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  emptyState: {
    alignItems: "center",
    gap: spacing.lg,
  },
  pageTitle: {
    fontSize: typography.title,
    fontWeight: "600",
    color: colors.textStrong,
    textAlign: "center",
    position: "absolute",
    left: spacing.xl,
    right: spacing.xl,
  },
  footer: {
    marginTop: spacing.xl,
  },
  separator: {
    height: spacing.xl,
  },
});
