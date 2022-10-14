module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '@/apis': './src/apis',
            '@/assets': './assets',
            '@/components': './src/components',
            '@/constants': './src/constants',
            '@/feature': './src/feature',
            '@/hooks': './src/hooks',
            '@/screens': './src/screens',
            '@/services': './src/services',
            '@/states': './src/states',
            '@/types': './src/types',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
