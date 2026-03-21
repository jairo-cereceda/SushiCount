import { StyleSheet } from "react-native";
import { colors, radius, shadows, spacing, typography } from "@/styles/tokens";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: "flex-start",
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  backText: {
    color: colors.link,
    fontWeight: "600",
    fontSize: typography.bodySmall,
  },
  pressed: {
    opacity: 0.85,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  empty: {
    flexGrow: 1,
  },
  emptyState: {
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "600",
    color: colors.textStrong,
  },
  subtitle: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    ...shadows.card,
  },
  cardWrapper: {
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.dangerBg,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.sm,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardTitle: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.text,
  },
  meta: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  metric: {
    fontSize: typography.bodySmall,
    fontWeight: "600",
    color: colors.success,
  },
  separator: {
    height: spacing.xl,
  },
});
