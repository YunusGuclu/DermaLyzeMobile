// src/screens/AnalysisScreen.js
import React, { useState, useRef } from 'react';
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

export default function AnalysisScreen() {
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const uploadRef = useRef(null);
  const [uploadY, setUploadY] = useState(0);

  const [imageUri, setImageUri] = useState(null);
  const [results, setResults] = useState([]);
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
    const form = new FormData();
    form.append('image', { uri, name: 'photo.jpg', type: 'image/jpeg' });

    // Denenecek sunucular:
    const servers = [
      'http://10.0.2.2:5000',     
      'http://192.168.1.39:5000', 
    ];

    let response;
    for (const base of servers) {
      try {
        response = await fetch(`http://192.168.1.39:5000/predict`, { method: 'POST', body: form });
        if (!response.ok) throw new Error('Hata kodu: ' + response.status);
        break;
      } catch (err) {
        console.log(`Bağlantı başarısız: ${base}`, err.message);
      }
    }

    if (!response) {
      alert('Sunucuya ulaşılamadı. Lütfen adresleri kontrol et.');
      setLoading(false);
      return;
    }

    try {
      const raw = await response.text();
      const data = JSON.parse(raw);
      setResults(data);
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
        <Text style={styles.navTitle}>Cilt Analizi</Text>
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        {/* Hero */}
        <ImageBackground
          source={require('../assets/images/depositphotos_254341448-stock-photo-face-beautiful-girl-scanning-g.jpg')}
          style={styles.hero}
        >
          <View style={styles.overlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Cilt Analizi</Text>
            <Text style={styles.heroSubtitle}>
              Cildinizden şüpheleniyor musunuz? AI ile potansiyel riskleri tespit edin.
            </Text>
          </View>
        </ImageBackground>

        {/* Upload & Analyze Section */}
        <View
          ref={uploadRef}
          onLayout={e => setUploadY(e.nativeEvent.layout.y)}
          style={styles.uploadCard}
        >
          <Text style={styles.uploadTitle}>Görsel Yükleyin</Text>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Text style={styles.uploadBtnText}>📤 Görsel Seç</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" style={styles.loader} />}
          {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="contain" />}
          {results.length > 0 && (
            <View style={styles.resultsCard}>
              {results.map((r, i) => (
                <View key={i} style={styles.resultRow}>
                  <Text style={styles.resultLabel}>{r.label}</Text>
                  <Text style={styles.resultScore}>{(r.score * 100).toFixed(1)}%</Text>
                </View>
              ))}
            </View>
          )}
          {results.length > 0 && (
            <Text style={styles.disclaimer}>
              Sonuçlar yapay zekâ tarafından belirlenmiştir. Lütfen tanı için doktorunuza danışın.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9FAFB' },
  navbar: { flexDirection: 'row', alignItems: 'center', height: 56, paddingHorizontal: 16, backgroundColor: 'white', elevation: 3 },
  backBtn: { paddingRight: 16 },
  backText: { fontSize: 20, color: '#4B5563' },
  navTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937' },

  container: { paddingBottom: 24 },
  hero: { width: '100%', height: 250, justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  heroContent: { paddingHorizontal: 16 },
  heroTitle: { color: 'white', fontSize: 28, fontWeight: '700', marginBottom: 4 },
  heroSubtitle: { color: 'white', fontSize: 16 },

  uploadCard: { backgroundColor: 'white', margin: 16, borderRadius: 12, padding: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 3 },
  uploadTitle: { fontSize: 20, fontWeight: '600', color: '#1F2937', marginBottom: 12, textAlign: 'center' },
  uploadBtn: { backgroundColor: '#4F46E5', paddingVertical: 12, borderRadius: 999, alignItems: 'center', marginBottom: 16 },
  uploadBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
  loader: { marginVertical: 16 },
  preview: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },

  resultsCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 3, marginTop: 12 },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  resultLabel: { fontSize: 16, color: '#374151' },
  resultScore: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  disclaimer: { marginTop: 16, fontSize: 14, color: '#888', fontStyle: 'italic', textAlign: 'center', paddingHorizontal: 8 },
});
