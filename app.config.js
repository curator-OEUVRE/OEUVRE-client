require('dotenv').config();

module.exports = {
  expo: {
    name: 'OEUVRE',
    slug: 'oeuvre',
    owner: 'cmc-curator',
    version: '1.0.0',
    runtimeVersion: {
      policy: 'nativeVersion',
    },
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    plugins: [
      [
        '@react-native-seoul/kakao-login',
        {
          kakaoAppKey: process.env.KAKAO_APP_KEY,
        },
      ],
    ],
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.curator.oeuvre',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.curator.oeuvre',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: 'bc755e58-fef2-4c34-8869-6f92386964d6',
      },
    },
  },
};
