import { fullWidth } from "@constants/metrics";
import React from "react";
import { View, Text } from "native-base";

function TextContainer({
  onPress,
  children,
  numColumns = 3,
}: {
  onPress?(): void;
  children: string;
  numColumns?: number;
}) {
  return (
    <View
      borderWidth={1}
      borderColor="purple.400"
      width={fullWidth / numColumns}
      alignItems="center"
      justifyContent="center"
      p="5"
    >
      <Text
        fontSize="xl"
        color="purple.500"
        fontWeight="bold"
        textAlign="center"
      >
        {children}
      </Text>
    </View>
  );
}

export { TextContainer };
