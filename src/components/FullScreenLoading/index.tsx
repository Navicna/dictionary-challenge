import React from "react";
import { View } from "native-base";
import { ActivityIndicator } from "react-native";

function FullScreenLoading() {
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      bgColor="#242424"
      testID="full-screen-loading"
    >
      <ActivityIndicator />
    </View>
  );
}

export { FullScreenLoading };
