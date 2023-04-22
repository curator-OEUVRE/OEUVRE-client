require('dotenv').config();

module.exports = {
  expo: {
    name: 'OEUVRE',
    slug: 'oeuvre',
    owner: 'cmc-curator',
    version: '1.0.2',
    runtimeVersion: {
      policy: 'nativeVersion',
    },
    orientation: 'default',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/bc755e58-fef2-4c34-8869-6f92386964d6',
      checkAutomatically: 'ON_ERROR_RECOVERY',
    },
    assetBundlePatterns: ['**/*'],
    plugins: [
      [
        '@react-native-seoul/kakao-login',
        {
          kakaoAppKey: process.env.KAKAO_APP_KEY,
          kotlinVersion: '1.6.10',
        },
      ],
      '@react-native-google-signin/google-signin',
      '@react-native-firebase/app',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      '@react-native-firebase/dynamic-links',
    ],
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.curator.oeuvre',
      googleServicesFile: './GoogleService-Info.plist',
      requireFullScreen: true,
      buildNumber: '5',
      associatedDomains: ['applinks:oeuvre.page.link'],
      bitcode: 'Debug',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.curator.oeuvre',
      googleServicesFile: './google-services.json',
      versionCode: 5,
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: 'oeuvre.page.link',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
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
