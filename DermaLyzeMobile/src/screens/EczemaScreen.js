// src/screens/EczemaScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function EczemaScreen() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const res = await launchImageLibrary({ mediaType: 'photo' });
    if (res.didCancel || !res.assets?.length) return;
    const uri = res.assets[0].uri;
    setImageUri(uri);
    uploadImage(uri);
  };

  const uploadImage = async (uri) => {
    setLoading(true);
    setResult(null);
    const form = new FormData();
    form.append('image', { uri, name: 'photo.jpg', type: 'image/jpeg' });
    try {
      const response = await fetch('http://10.0.2.2:5000/predict_atopic', { method: 'POST', body: form });
      if (!response.ok) throw new Error(`Sunucu hatası: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Tahmin sırasında hata: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>EGZEMA ANALİZİ</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero */}
        <ImageBackground
          source={require('../assets/images/DERMATOLOJI-banner.jpg')}
          style={styles.hero}
        >
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text style={styles.heroTitle}>EGZEMA ANALİZİ</Text>
            <Text style={styles.heroSubtitle}>
            Kuru, kaşıntılı, iltihaplı döküntüleri,kızarıklıkları analiz edin ve genel bilgiler alın.
            </Text>
          </View>
        </ImageBackground>

        {/* Upload Card */}
        <View style={styles.uploadCard}>
          <Text style={styles.uploadTitle}>Görsel Yükleyin</Text>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Text style={styles.uploadBtnText}>📤 Görsel Seç</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" style={styles.loader} />}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="contain" />
          )}

          {/* Results */}
          {result && (
            <View style={styles.resultsCard}>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Sınıf:</Text>
                <Text style={styles.resultScore}>{result.label}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Güven:</Text>
                <Text style={styles.resultScore}>{(result.score*100).toFixed(1)}%</Text>
              </View>
              <Text style={styles.infoHeader}>Teşhis:</Text>
              <Text style={styles.infoText}>{result.diagnosis}</Text>
              <Text style={styles.infoHeader}>Açıklama:</Text>
              <Text style={styles.infoText}>{result.info}</Text>
            </View>
          )}

          {result && (
            <Text style={styles.disclaimer}>
              Sonuçlar yapay zekâ tarafından belirlenmiştir. Lütfen tanı ve tedavi için doktorunuza danışın.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:          { flex: 1, backgroundColor: '#F9FAFB' },
  navbar:       { flexDirection: 'row', alignItems: 'center', height: 56, paddingHorizontal: 16, backgroundColor: 'white', elevation: 3 },
  backBtn:      { paddingRight: 16 },
  backText:     { fontSize: 20, color: '#4B5563' },
  navTitle:     { fontSize: 18, fontWeight: '600', color: '#1F2937' },

  container:    { paddingBottom: 24 },
  hero:         { width: '100%', height: 250, justifyContent: 'center' },
  overlay:      { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  textContainer:{ paddingHorizontal: 16 },
  heroTitle:    { color: 'white', fontSize: 28, fontWeight: '700', marginBottom: 4 },
  heroSubtitle: { color: 'white', fontSize: 16 },

  uploadCard:   { backgroundColor: 'white', margin: 16, borderRadius: 12, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 3 },
  uploadTitle:  { fontSize: 20, fontWeight: '600', color: '#1F2937', marginBottom: 12, textAlign: 'center' },
  uploadBtn:    { backgroundColor: '#4F46E5', paddingVertical: 12, borderRadius: 999, alignItems: 'center', marginBottom: 16 },
  uploadBtnText:{ color: 'white', fontSize: 16, fontWeight: '600' },
  loader:       { marginVertical: 16 },
  preview:      { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },

  resultsCard:  { backgroundColor: 'white', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 3, marginTop: 12 },
  resultRow:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  resultLabel:  { fontSize: 16, color: '#374151' },
  resultScore:  { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  infoHeader:   { fontSize: 16, fontWeight: '600', color: '#374151', marginTop: 12 },
  infoText:     { fontSize: 14, color: '#374151', marginTop: 4, lineHeight: 20 },
  disclaimer:   { marginTop: 16, fontSize: 14, color: '#888', fontStyle: 'italic', textAlign: 'center', paddingHorizontal: 8 },
});
