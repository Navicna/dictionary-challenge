import "react-native-gesture-handler";

import Providers from "./src/providers";
import Routes from "./src/routes";

export default function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}
