// src/screens/AssistantScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';  // ①

export default function AssistantScreen({ navigation }) {
  return (
    <View style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
        <Text style={s.backText}>‹ Geri</Text>
      </TouchableOpacity>
      <Text style={s.title}>SAĞLIK ASİSTANIM</Text>

      {/* ② Chatbot iframe */}
      <View style={s.webviewContainer}>
        <WebView
          source={{ uri: 'https://www.chatbase.co/chatbot-iframe/92Xly1zD9f8TD7Qvwsi9O' }}
          style={s.webview}
          originWhitelist={['*']}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  back: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 18,
    color: 'rgb(30,30,64)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgb(30,30,64)',
    marginBottom: 16,
  },
  webviewContainer: {
    flex: 1,            // ③ ekranı tamamını kaplasın
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});
