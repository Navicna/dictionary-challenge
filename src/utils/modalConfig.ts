import { Animated, Platform } from 'react-native';

import {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  TransitionPresets,
} from '@react-navigation/stack';

const OPACITY = 0.32;
export function modalAnimateConfig({
  current,
  inverted,
  layouts: { screen },
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  const translateY = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.height, 0],
      extrapolate: 'clamp',
    }),
    inverted,
  );

  return {
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, OPACITY],
        extrapolate: 'clamp',
      }),
    },
    cardStyle: {
      transform: [{ translateY }],
    },
  };
}

export const ModalSettings = {
  presentation: 'transparentModal',
  gestureEnabled: Platform.OS === 'ios',
  cardOverlayEnabled: true,
  animationEnabled: true,
  cardStyle: { backgroundColor: 'transparent' },
  ...TransitionPresets.ModalSlideFromBottomIOS,
  cardStyleInterpolator: modalAnimateConfig,
};
