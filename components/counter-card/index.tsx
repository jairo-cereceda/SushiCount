import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { t } from "@/localization";
import type { CounterItem } from "@/types/counter";
import { styles } from "./styles";

type CounterCardProps = {
  counter: CounterItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
};

export function CounterCard({
  counter,
  onIncrement,
  onDecrement,
  onDelete,
}: CounterCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.mainRow}>
        <View style={styles.imageColumn}>
          <View style={styles.imageFrame}>
            {counter.status === "ready" && counter.imageUri ? (
              <Image
                source={{ uri: counter.imageUri }}
                style={styles.image}
                contentFit="cover"
                accessibilityLabel={t("image.label", { name: counter.label })}
                accessibilityRole="image"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageStatus}>
                  {counter.status === "loading"
                    ? t("image.generating")
                    : t("image.noImage")}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.middleColumn}>
          <Text style={styles.label} accessibilityRole="header">
            {counter.label}
          </Text>
          <Text
            style={styles.count}
            accessibilityLabel={t("counter.countLabel", {
              count: counter.count,
            })}
          >
            {counter.count}
          </Text>
        </View>

        <View style={styles.rightColumn}>
          <Pressable
            onPress={() => onIncrement(counter.id)}
            accessibilityRole="button"
            accessibilityLabel={t("counter.incrementLabel", {
              name: counter.label,
            })}
            accessibilityHint={t("counter.incrementHint")}
            hitSlop={6}
            style={({ pressed }) => [
              styles.actionButton,
              pressed ? styles.actionPressed : null,
            ]}
          >
            <IconSymbol name="plus" size={22} color="#FFFFFF" />
          </Pressable>
          <Pressable
            onPress={() => onDecrement(counter.id)}
            accessibilityRole="button"
            accessibilityLabel={t("counter.decrementLabel", {
              name: counter.label,
            })}
            accessibilityHint={t("counter.decrementHint")}
            hitSlop={6}
            style={({ pressed }) => [
              styles.actionButton,
              pressed ? styles.actionPressed : null,
            ]}
          >
            <IconSymbol name="minus" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
      <View style={styles.deleteRow}>
        <Pressable
          onPress={() => onDelete(counter.id)}
          accessibilityRole="button"
          accessibilityLabel={t("counter.deleteLabel", { name: counter.label })}
          accessibilityHint={t("counter.deleteHint")}
          hitSlop={8}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed ? styles.actionPressed : null,
          ]}
        >
          <Text style={styles.deleteText}>{t("common.delete")}</Text>
        </Pressable>
      </View>
      {counter.status === "error" && counter.errorMessage ? (
        <Text style={styles.errorText}>{counter.errorMessage}</Text>
      ) : null}
    </View>
  );
}
