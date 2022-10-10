// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// firebase 설정을 위해 추가
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
