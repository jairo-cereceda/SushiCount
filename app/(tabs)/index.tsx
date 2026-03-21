import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { ActionSheet } from "@/components/action-sheet";
import { AddCounterInput } from "@/components/add-counter-input";
import { CounterCard } from "@/components/counter-card";
import { SessionControls } from "@/components/session-controls";
import { t } from "@/localization";
import { getLocalizedErrorMessage } from "@/utils/error-message";
import { loadCounters, saveCounters } from "@/services/counter-storage";
import { generateImageFromText } from "@/services/image-generator";
import {
  clearSessionState,
  loadSessionState,
  loadSessions,
  saveSessionState,
  saveSessions,
} from "@/services/session-storage";
import type { CounterItem } from "@/types/counter";
import type { SessionRecord, SessionState } from "@/types/session";
import { styles } from "@/styles/screens/home.styles";
import { spacing } from "@/styles/tokens";

const MAX_LABEL_LENGTH = 40;

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState("");
  const [counters, setCounters] = useState<CounterItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sessionState, setSessionState] = useState<SessionState | null>(null);
  const isSessionActive = sessionState !== null;
  const [isEndSheetVisible, setIsEndSheetVisible] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [pendingDelete, setPendingDelete] = useState<CounterItem | null>(null);
  const insets = useSafeAreaInsets();
  const isMountedRef = useRef(true);
  const headerAnim = useRef(new Animated.Value(isSessionActive ? 0 : 1)).current;
  const [layoutHeights, setLayoutHeights] = useState({
    outer: 0,
    content: 0,
  });

  useEffect(() => {
    void (async () => {
      const stored = await loadCounters();
      const storedSession = await loadSessionState();
      if (!isMountedRef.current) return;
      setCounters(stored);
      setSessionState(storedSession);
      setSessionName(storedSession?.name ?? "");
      setIsHydrated(true);
    })();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    void saveCounters(counters);
  }, [counters, isHydrated]);

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: isSessionActive ? 0 : 1,
      duration: 420,
      useNativeDriver: false,
    }).start();
  }, [headerAnim, isSessionActive]);

  const centerOffset = useMemo(() => {
    if (!layoutHeights.outer || !layoutHeights.content) return 0;
    const desiredTop = Math.max(20, (layoutHeights.outer - layoutHeights.content) / 2);
    return desiredTop - 20;
  }, [layoutHeights]);

  const translateY = useMemo(
    () =>
      headerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, centerOffset],
      }),
    [centerOffset, headerAnim],
  );

  const titleTop = useMemo(() => Math.max(spacing.lg, centerOffset / 2), [centerOffset]);

  const createCounter = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || !isSessionActive) return;

    const label = trimmed.slice(0, MAX_LABEL_LENGTH);
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const newCounter: CounterItem = {
      id,
      label,
      count: 0,
      status: "loading",
    };

    setCounters((current) => [...current, newCounter]);
    setInputValue("");
    Keyboard.dismiss();

    void (async () => {
      try {
        const image = await generateImageFromText(label);
        if (!isMountedRef.current) return;

        setCounters((current) =>
          current.map((item) =>
            item.id === id ? { ...item, status: "ready", imageUri: image.uri } : item,
          ),
        );
      } catch (error) {
        if (!isMountedRef.current) return;

        const message = getLocalizedErrorMessage(error, "image.generateError");

        setCounters((current) =>
          current.map((item) =>
            item.id === id ? { ...item, status: "error", errorMessage: message } : item,
          ),
        );
      }
    })();
  }, [inputValue, isSessionActive]);

  const handleIncrement = useCallback((id: string) => {
    setCounters((current) =>
      current.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item)),
    );
  }, []);

  const handleDecrement = useCallback((id: string) => {
    setCounters((current) =>
      current.map((item) =>
        item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item,
      ),
    );
  }, []);

  const handleDeleteRequest = useCallback(
    (id: string) => {
      const target = counters.find((item) => item.id === id) ?? null;
      setPendingDelete(target);
    },
    [counters],
  );

  const handleDeleteCancel = useCallback(() => {
    setPendingDelete(null);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!pendingDelete) return;
    setCounters((current) => current.filter((item) => item.id !== pendingDelete.id));
    setPendingDelete(null);
  }, [pendingDelete]);

  const isSubmitDisabled = inputValue.trim().length === 0;

  const handleStartSession = useCallback(() => {
    const name = sessionName.trim() || t("session.defaultName");
    const state: SessionState = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      startedAt: new Date().toISOString(),
    };
    setSessionState(state);
    void saveSessionState(state);
  }, [sessionName]);

  const confirmEndSession = useCallback(() => {
    setIsEndSheetVisible(true);
  }, []);

  const handleEndSession = useCallback(() => {
    if (!sessionState) {
      setIsEndSheetVisible(false);
      return;
    }

    const endedAt = new Date().toISOString();
    const nonEmptyCounters = counters.filter((item) => item.count > 0);
    const countersCreated = nonEmptyCounters.length;
    const totalCount = nonEmptyCounters.reduce((sum, item) => sum + item.count, 0);
    const shouldPersist = countersCreated > 0 && totalCount > 0;

    setIsEndSheetVisible(false);
    setSessionState(null);
    setCounters([]);
    setInputValue("");
    setSessionName("");

    void (async () => {
      if (shouldPersist) {
        const record: SessionRecord = {
          id: sessionState.id,
          name: sessionState.name,
          startedAt: sessionState.startedAt,
          endedAt,
          countersCreated,
          totalCount,
          counters: nonEmptyCounters.map((item) => ({
            id: item.id,
            label: item.label,
            count: item.count,
            imageUri: item.imageUri,
          })),
        };

        const current = await loadSessions();
        await saveSessions([record, ...current]);
      }
      await clearSessionState();
    })();
  }, [counters, sessionState]);

  const handleCancelEndSession = useCallback(() => {
    setIsEndSheetVisible(false);
  }, []);

  const inputSection = useMemo(
    () => (
      <AddCounterInput
        value={inputValue}
        onChangeText={setInputValue}
        onSubmit={createCounter}
        disabled={isSubmitDisabled || !isSessionActive}
        maxLength={MAX_LABEL_LENGTH}
        placeholder={t("counter.placeholder")}
        helperText={t("counter.helperMax", { max: MAX_LABEL_LENGTH })}
      />
    ),
    [createCounter, inputValue, isSubmitDisabled, isSessionActive],
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      onLayout={(event) =>
        setLayoutHeights((prev) => ({
          ...prev,
          outer: event.nativeEvent.layout.height,
        }))
      }
    >
      {!isSessionActive ? (
        <Text style={[styles.pageTitle, { top: titleTop }]} accessibilityRole="header">
          {t("session.startTitle")}
        </Text>
      ) : null}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: "padding", android: "height" })}
        keyboardVerticalOffset={
          Platform.select({
            ios: insets.top + spacing.lg,
            android: 0,
          }) ?? 0
        }
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
          <FlatList
            data={counters}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CounterCard
                counter={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onDelete={handleDeleteRequest}
              />
            )}
            onContentSizeChange={(_width, height) =>
              setLayoutHeights((prev) => ({ ...prev, content: height }))
            }
            contentContainerStyle={[
              styles.listContent,
              counters.length === 0 ? styles.listEmptyContent : null,
              isSessionActive
                ? { paddingBottom: spacing.xxl + insets.bottom }
                : { paddingBottom: spacing.lg },
            ]}
            ListHeaderComponent={
              <Animated.View
                style={[
                  styles.headerSection,
                  {
                    marginBottom: headerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ]}
              >
                <SessionControls
                  isActive={isSessionActive}
                  name={sessionName}
                  onNameChange={setSessionName}
                  onStart={handleStartSession}
                  onEnd={confirmEndSession}
                />
              </Animated.View>
            }
            ListEmptyComponent={
              <View style={styles.emptyState}>
                {isSessionActive ? inputSection : null}
              </View>
            }
            ListFooterComponent={
              counters.length > 0 && isSessionActive ? (
                <View style={styles.footer}>{inputSection}</View>
              ) : null
            }
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyboardShouldPersistTaps="handled"
          />
        </Animated.View>
        <ActionSheet
          visible={isEndSheetVisible}
          title={t("session.endTitle")}
          message={t("session.endMessage")}
          confirmText={t("common.finish")}
          cancelText={t("common.cancel")}
          onConfirm={handleEndSession}
          onCancel={handleCancelEndSession}
        />
        <ActionSheet
          visible={Boolean(pendingDelete)}
          title={t("counter.deleteTitle")}
          message={
            pendingDelete
              ? t("counter.deleteMessage", { name: pendingDelete.label })
              : undefined
          }
          confirmText={t("common.delete")}
          cancelText={t("common.keep")}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
