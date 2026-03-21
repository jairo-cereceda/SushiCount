import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { t } from "@/localization";
import { colors } from "@/styles/tokens";
import { styles } from "./styles";

type AddCounterInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  maxLength?: number;
};

export function AddCounterInput({
  value,
  onChangeText,
  onSubmit,
  disabled,
  placeholder = t("counter.placeholderDefault"),
  helperText,
  maxLength,
}: AddCounterInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        accessibilityLabel={t("counter.nameLabel")}
        accessibilityHint={t("counter.nameHint")}
        onSubmitEditing={onSubmit}
        editable={true}
        maxLength={maxLength}
        style={styles.input}
        returnKeyType="done"
      />
      <Pressable
        onPress={onSubmit}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={t("counter.createLabel")}
        accessibilityHint={t("counter.createHint")}
        hitSlop={6}
        style={({ pressed }) => [
          styles.button,
          disabled ? styles.buttonDisabled : null,
          pressed && !disabled ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}>{t("counter.addButton")}</Text>
      </Pressable>
      {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
}
