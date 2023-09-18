import { ArrowUpIcon, View } from "native-base";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

const size = 60;

function ArrowButton({ onPress }: { onPress(): void }) {
  const { top } = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 16,
        bottom: top,
      }}
      onPress={onPress}
    >
      <View
        backgroundColor="black"
        borderRadius={size / 2}
        height={size}
        width={size}
        alignItems="center"
        justifyContent="center"
      >
        <ArrowUpIcon size="8" color="emerald.500" />
      </View>
    </TouchableOpacity>
  );
}

export { ArrowButton };
