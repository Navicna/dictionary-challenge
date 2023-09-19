import { View, Text } from "native-base";
import React from "react";

import { TouchableOpacity } from "react-native";
import { fullWidth } from "@constants/metrics";
import { Tabs } from "@interfaces/index";

function TabBar({
  onPress,
  activeTab,
}: {
  onPress(tab: Tabs): void;
  activeTab: Tabs;
}) {
  const tabSize = fullWidth * 0.95;

  const tabs = ["Word list", "History", "Favorites"];

  const TabItem = ({
    onPress,
    children,
    enabled,
  }: {
    onPress(children: string): void;
    children: string;
    enabled: boolean;
  }) => {
    const handlePress = () => {
      onPress(children);
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <View
          width={tabSize / 3}
          alignItems="center"
          justifyContent="center"
          pt="16px"
          pb="16px"
        >
          <Text
            fontSize="xl"
            fontWeight={enabled ? "bold" : undefined}
            color={enabled ? "purple.400" : "emerald.500"}
          >
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      width={tabSize}
      alignSelf="center"
      bgColor="black"
      flexDirection="row"
      borderWidth={1}
      borderColor="emerald.500"
      borderRadius="10px"
    >
      {tabs.map((tab) => (
        <TabItem key={tab} onPress={onPress} enabled={activeTab === tab}>
          {tab}
        </TabItem>
      ))}
    </View>
  );
}

export { TabBar };
