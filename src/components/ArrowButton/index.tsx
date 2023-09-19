import { ArrowUpIcon, View } from "native-base";
import React from "react";

import { TouchableOpacity } from "react-native";

const size = 60;

function ArrowButton({ onPress }: { onPress(): void }) {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 16,
        bottom: 16,
      }}
      testID="arrow-button"
      onPress={onPress}
    >
      <View
        bgColor="#242424"
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
