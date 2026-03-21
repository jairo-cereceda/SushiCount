import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { t } from "@/localization";
import { colors } from "@/styles/tokens";
import { styles } from "./styles";

type SessionControlsProps = {
  isActive: boolean;
  name: string;
  onNameChange: (value: string) => void;
  onStart: () => void;
  onEnd: () => void;
};

export function SessionControls({
  isActive,
  name,
  onNameChange,
  onStart,
  onEnd,
}: SessionControlsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {isActive ? (
          <Text style={styles.sessionName} accessibilityRole="header">
            {name}
          </Text>
        ) : (
          <TextInput
            value={name}
            onChangeText={onNameChange}
            placeholder={t("session.restaurantPlaceholder")}
            placeholderTextColor={colors.textTertiary}
            accessibilityLabel={t("session.restaurantLabel")}
            accessibilityHint={t("session.restaurantHint")}
            editable={!isActive}
            style={[styles.input, isActive ? styles.inputDisabled : null]}
          />
        )}
        {!isActive ? (
          <Pressable
            onPress={onStart}
            accessibilityRole="button"
            accessibilityLabel={t("session.startButtonLabel")}
            accessibilityHint={t("session.startButtonHint")}
            hitSlop={6}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={styles.primaryText}>{t("session.startButton")}</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={onEnd}
            accessibilityRole="button"
            accessibilityLabel={t("session.endButtonLabel")}
            accessibilityHint={t("session.endButtonHint")}
            hitSlop={6}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={styles.secondaryText}>{t("session.endButton")}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
