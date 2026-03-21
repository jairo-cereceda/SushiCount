import React, { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, Text, View } from "react-native";
import { t } from "@/localization";
import { styles } from "./styles";

type ActionSheetProps = {
  visible: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ActionSheet({
  visible,
  title,
  message,
  confirmText = t("common.confirm"),
  cancelText = t("common.cancel"),
  onConfirm,
  onCancel,
}: ActionSheetProps) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      anim.setValue(0);
      return;
    }

    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 240,
      useNativeDriver: true,
    }).start();
  }, [anim, visible]);

  const backdropStyle = {
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const sheetStyle = {
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [24, 0],
        }),
      },
    ],
  };

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onCancel}>
      <View style={styles.overlay} accessibilityViewIsModal>
        <Pressable
          style={styles.backdrop}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel={t("common.close")}
        >
          <Animated.View style={[styles.backdropFill, backdropStyle]} />
        </Pressable>
        <Animated.View style={[styles.sheet, sheetStyle]}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={styles.actions}>
            <Pressable
              style={styles.cancelButton}
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel={cancelText}
              accessibilityHint={t("actionSheet.cancelHint")}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>
            <Pressable
              style={styles.confirmButton}
              onPress={onConfirm}
              accessibilityRole="button"
              accessibilityLabel={confirmText}
              accessibilityHint={t("actionSheet.confirmHint")}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
