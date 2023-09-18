import React, { ReactNode } from "react";
import { NativeBaseProvider, Box } from "native-base";

import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from "@context/AppContext";

const queryClient = new QueryClient();

interface Providers {
  children: ReactNode;
}

function Providers({ children }: Providers) {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <AppProvider>{children}</AppProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

export default Providers;
