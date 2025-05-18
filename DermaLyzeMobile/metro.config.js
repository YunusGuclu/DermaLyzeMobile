// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// 1. Varsayılan config’i al
const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  resolver: {
    // varolan assetExts dizisine 'tflite' ve 'txt' ekliyoruz
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'tflite',
      'txt'
    ]
  }
});
