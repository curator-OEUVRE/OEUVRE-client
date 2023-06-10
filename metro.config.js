// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// firebase 설정을 위해 추가
defaultConfig.resolver.assetExts.push('cjs');

// https://github.com/facebook/react-native/issues/36794#issuecomment-1500880284
defaultConfig.server = {
  rewriteRequestUrl: (url) => {
    if (!url.endsWith('.bundle')) {
      return url;
    }

    return `${url}?platform=ios&dev=true&minify=false&modulesOnly=false&runModule=true`;
  },
};

module.exports = defaultConfig;
