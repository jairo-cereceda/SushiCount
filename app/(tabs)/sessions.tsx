import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActionSheet } from "@/components/action-sheet";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { t } from "@/localization";
import { deleteSession, loadSessions } from "@/services/session-storage";
import type { SessionRecord } from "@/types/session";
import { styles } from "@/styles/screens/sessions.styles";
import { formatDate, formatDuration } from "@/utils/session-time";

export default function SessionsScreen() {
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [pendingDelete, setPendingDelete] = useState<SessionRecord | null>(null);

  const refresh = useCallback(() => {
    void (async () => {
      const data = await loadSessions();
      setSessions(data);
    })();
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      refresh();
      return undefined;
    }, [refresh]),
  );

  const handleDeleteRequest = useCallback((session: SessionRecord) => {
    setPendingDelete(session);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setPendingDelete(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!pendingDelete) return;
    void (async () => {
      const next = await deleteSession(pendingDelete.id);
      setSessions(next);
      setPendingDelete(null);
    })();
  }, [pendingDelete]);

  const deleteMessage = useMemo(() => {
    if (!pendingDelete) return "";
    return t("session.deleteMessage", { name: pendingDelete.name });
  }, [pendingDelete]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          sessions.length === 0 ? styles.empty : null,
        ]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.title}>{t("sessions.emptyTitle")}</Text>
            <Text style={styles.subtitle}>{t("sessions.emptySubtitle")}</Text>
          </View>
        }
        renderItem={({ item }) => {
          const duration = formatDuration(item.startedAt, item.endedAt);
          const date = formatDate(item.startedAt);

          return (
            <View style={styles.cardWrapper}>
              <Pressable
                style={({ pressed }) => [
                  styles.card,
                  pressed ? styles.cardPressed : null,
                ]}
                accessibilityRole="button"
                accessibilityLabel={t("sessions.cardA11yLabel", {
                  name: item.name,
                  date,
                  duration,
                  count: item.countersCreated,
                  total: item.totalCount,
                })}
                accessibilityHint={t("sessions.cardA11yHint")}
                onPress={() =>
                  router.push({
                    pathname: "/sessions/[id]",
                    params: { id: item.id },
                  })
                }
                onKeyDown={(event) => {
                  const key = event.nativeEvent.key;
                  if (key === "Enter" || key === " ") {
                    event.preventDefault();
                    router.push({
                      pathname: "/sessions/[id]",
                      params: { id: item.id },
                    });
                  }
                }}
              >
                <Text style={styles.cardTitle} accessibilityRole="header">
                  {item.name}
                </Text>
                <Text style={styles.meta}>
                  {t("common.date")}: {date}
                </Text>
                <Text style={styles.meta}>
                  {t("common.duration")}: {duration}
                </Text>
                <View style={styles.metrics}>
                  <Text style={styles.metric}>
                    {t("sessions.distinctPlates")}: {item.countersCreated}
                  </Text>
                  <Text style={styles.metric}>
                    {t("sessions.pieces")}: {item.totalCount}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed ? styles.cardPressed : null,
                ]}
                accessibilityRole="button"
                accessibilityLabel={t("session.deleteLabel", {
                  name: item.name,
                })}
                accessibilityHint={t("session.deleteHint")}
                onPress={() => handleDeleteRequest(item)}
                hitSlop={6}
              >
                <IconSymbol name="trash" size={16} color="#B42318" />
              </Pressable>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <ActionSheet
        visible={Boolean(pendingDelete)}
        title={t("session.deleteTitle")}
        message={deleteMessage}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </SafeAreaView>
  );
}
