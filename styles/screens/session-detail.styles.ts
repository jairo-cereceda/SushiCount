import { StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "@/styles/tokens";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    zIndex: 1,
  },
  listContent: {
    padding: spacing.xl,
  },
  listPadBottom: {
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  sessionName: {
    fontSize: typography.titleLarge,
    fontWeight: "700",
    color: colors.text,
  },
  sessionDate: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  counterCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  counterInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  counterLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  counterCount: {
    fontSize: typography.countLarge,
    fontWeight: "700",
    color: colors.success,
  },
  imageFrame: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.inputDisabled,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
  },
  imageText: {
    fontSize: typography.caption,
    color: colors.muted,
    textAlign: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.textStrong,
  },
  subtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
  separator: {
    height: spacing.lg,
  },
  footer: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  exportButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    alignItems: "center",
  },
  exportText: {
    color: colors.card,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.caption,
    textAlign: "center",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: spacing.sm,
  },
  backText: {
    color: colors.link,
    fontWeight: "600",
    fontSize: typography.bodySmall,
  },
});
