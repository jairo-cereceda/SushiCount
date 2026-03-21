import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { loadSessions } from "@/services/session-storage";
import { generateSessionSummaryImage } from "@/services/session-export";
import type { SessionRecord } from "@/types/session";
import { styles } from "@/styles/screens/session-detail.styles";
import { formatDate, formatDuration, formatTime } from "@/utils/session-time";
import { t } from "@/localization";
import { getLocalizedErrorMessage } from "@/utils/error-message";
import { colors } from "@/styles/tokens";

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [session, setSession] = useState<SessionRecord | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const sessions = await loadSessions();
      const match = sessions.find((item) => item.id === id) ?? null;
      setSession(match);
    })();
  }, [id]);

  const formattedDate = useMemo(() => {
    if (!session) return "";
    return formatDate(session.startedAt);
  }, [session]);

  const formattedTime = useMemo(() => {
    if (!session) return "";
    return formatTime(session.startedAt);
  }, [session]);

  const formattedDuration = useMemo(() => {
    if (!session) return "";
    return formatDuration(session.startedAt, session.endedAt);
  }, [session]);

  const handleExport = async () => {
    if (!session || isExporting) return;

    setIsExporting(true);
    setExportError(null);

    try {
      const base64 = await generateSessionSummaryImage({
        name: session.name,
        date: formattedDate,
        time: formattedTime,
        duration: formattedDuration,
        counters: session.counters ?? [],
      });

      if (Platform.OS === "web") {
        const anchor = document.createElement("a");
        anchor.href = `data:image/png;base64,${base64}`;
        anchor.download = `session-${session.id}.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      } else {
        const fileUri = `${FileSystem.cacheDirectory}session-${session.id}.png`;
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri, {
            mimeType: "image/png",
            dialogTitle: t("export.button"),
            UTI: "public.png",
          });
        }
      }
    } catch (error) {
      console.error("Export Error:", error);
      const message = getLocalizedErrorMessage(error, "export.error");
      setExportError(message);
    } finally {
      setIsExporting(false);
    }
  };

  if (!session) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyState}>
          <Text style={styles.title}>{t("session.notFoundTitle")}</Text>
          <Text style={styles.subtitle}>{t("session.notFoundSubtitle")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <FlatList
          data={session.counters ?? []}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, styles.listPadBottom]}
          ListHeaderComponent={
            <View style={styles.header}>
              <Link href="/sessions" asChild>
                <Pressable
                  style={({ pressed }) => [
                    styles.backButton,
                    pressed ? styles.buttonPressed : null,
                  ]}
                  accessibilityRole="link"
                  accessibilityLabel={t("sessions.back")}
                  hitSlop={6}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <IconSymbol name="chevron.left" size={18} color={colors.link} />
                    <Text style={styles.backText} accessibilityRole="link">
                      {t("sessions.back")}
                    </Text>
                  </View>
                </Pressable>
              </Link>
              <Text style={styles.sessionDate}>
                {t("session.metaLine", {
                  date: formattedDate,
                  time: formattedTime,
                  duration: formattedDuration,
                })}
              </Text>
              <Text style={styles.sessionName} accessibilityRole="header">
                {session.name}
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.title}>{t("session.emptyCounters")}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.counterCard}>
              <View style={styles.counterInfo}>
                <Text style={styles.counterLabel}>{item.label}</Text>
                <Text style={styles.counterCount}>{item.count}</Text>
              </View>
              <View style={styles.imageFrame}>
                {item.imageUri ? (
                  <Image source={{ uri: item.imageUri }} style={styles.image} contentFit="cover" />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>{t("image.noImage")}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <Pressable
                onPress={handleExport}
                disabled={isExporting}
                style={({ pressed }) => [
                  styles.exportButton,
                  pressed ? styles.buttonPressed : null,
                  isExporting ? styles.buttonDisabled : null,
                ]}
              >
                <Text style={styles.exportText}>
                  {isExporting ? t("export.generating") : t("export.button")}
                </Text>
              </Pressable>
              {exportError ? <Text style={styles.errorText}>{exportError}</Text> : null}
            </View>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
}
