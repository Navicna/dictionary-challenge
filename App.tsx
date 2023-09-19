import "react-native-gesture-handler";

import Providers from "./src/providers";
import Routes from "./src/routes";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <Providers>
      <StatusBar />
      <Routes />
    </Providers>
  );
}
