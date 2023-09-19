import { Dimensions, Platform } from "react-native";

const { height: fullHeight, width: fullWidth } = Dimensions.get("window");

const isAndroid = Platform.OS === 'android'
const isIos = Platform.OS === 'ios'

export { fullHeight, fullWidth , isIos, isAndroid };
