import React, { ReactNode } from "react";
import { NativeBaseProvider, Box } from "native-base";

interface AppProvider {
  children: ReactNode;
}

function AppProvider({ children }: AppProvider) {
  return <NativeBaseProvider>{children}</NativeBaseProvider>;
}

export default AppProvider;
