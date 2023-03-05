/* eslint-disable global-require */

import { COLOR } from './styles';

export const IMAGE = {
  floorStyleShadow: require('@/assets/images/floorStyleShadow.png'),
  heart: require('@/assets/images/heart.png'),
  bookmark: require('@/assets/images/bookmark.png'),
  check: require('@/assets/images/check.png'),
  onboarding: [
    require('@/assets/images/onboarding1.png'),
    require('@/assets/images/onboarding2.png'),
    require('@/assets/images/onboarding3.png'),
    require('@/assets/images/onboarding4.png'),
    require('@/assets/images/onboarding5.png'),
  ],
  paint: {
    [COLOR.mono.white]: require('@/assets/images/paint/white.png'),
    [COLOR.mono.gray1]: require('@/assets/images/paint/gray.png'),
    [COLOR.mono.gray5]: require('@/assets/images/paint/gray5.png'),
    [COLOR.mono.gray7]: require('@/assets/images/paint/gray7.png'),
    [COLOR.floor.blue]: require('@/assets/images/paint/blue.png'),
    [COLOR.oeuvre.blue1]: require('@/assets/images/paint/green.png'),
    [COLOR.floor.yellow]: require('@/assets/images/paint/yellow.png'),
    [COLOR.floor.red]: require('@/assets/images/paint/red.png'),
    [COLOR.floor.orange]: require('@/assets/images/paint/orange.png'),
    [COLOR.floor.purple]: require('@/assets/images/paint/purple.png'),
  },
} as const;
