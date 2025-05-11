const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

// 1. Varsayılan config’i al
const defaultConfig = getDefaultConfig(__dirname);

// 2. assetExts'e tflite ve txt ekle, .cxx klasörünü blokla
module.exports = mergeConfig(defaultConfig, {
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'tflite',
      'txt'
    ],
    blockList: exclusionList([
      /node_modules\/react-native-screens\/android\/\.cxx\/.*/,
    ]),
  },
});
