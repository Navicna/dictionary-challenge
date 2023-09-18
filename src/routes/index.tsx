import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StackParams, Screens } from "./types";
import Home from "@screens/Home";
import ListDetails from "@screens/ListDetails";

const Stack = createStackNavigator<StackParams>();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Home}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={Screens.Home} component={Home} />
        <Stack.Screen name={Screens.ListDetails} component={ListDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
