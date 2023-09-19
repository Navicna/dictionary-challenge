import React from "react";
import { View, Text } from "native-base";
import { ActivityIndicator } from "react-native";

function FullScreenLoading() {
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      bgColor="#242424"
    >
      <ActivityIndicator />
    </View>
  );
}

export { FullScreenLoading };
