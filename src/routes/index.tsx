import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ModalSettings } from "@utils/modalConfig";

import { StackParams, Screens } from "./types";
import Home from "@screens/Home";
import Modal from "@screens/Modal";
import Login from "@screens/Login";

import { useAppData } from "@context/AppContext";

const Stack = createStackNavigator<StackParams>();

function Routes() {
  const { credentials } = useAppData();

  return credentials ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Home}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={Screens.Home} component={Home} />
        <Stack.Screen
          name={Screens.Modal}
          component={Modal}
          options={{
            presentation: "transparentModal",
            ...ModalSettings,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Login}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={Screens.Login} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
