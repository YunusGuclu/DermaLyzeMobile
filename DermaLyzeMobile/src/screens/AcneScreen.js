// AcneScreen.js

import React, { useState } from 'react';
import {
  View, Text, Button, Image, StyleSheet,
  ActivityIndicator, ScrollView, TouchableOpacity
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function AcneScreen() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);

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
      const response = await fetch('http://10.0.2.2:5000/predict_acne', {
        method: 'POST',
        body: form,
      });
      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Akne Analizi</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Button title="Galeriden Fotoğraf Seç" onPress={pickImage} />

        {loading && <ActivityIndicator size="large" style={{ marginVertical: 20 }} />}

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.preview}
            resizeMode="cover"
          />
        )}

        {result && (
          <View style={styles.resultsCard}>
            <Text style={styles.resultsHeader}>Tahmin Sonucu:</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Sınıf:</Text>
              <Text style={styles.resultScore}>{result.label}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Güven:</Text>
              <Text style={styles.resultScore}>
                {(result.score * 100).toFixed(1)}%
              </Text>
            </View>
            <Text style={styles.infoHeader}>Açıklama:</Text>
            <Text style={styles.infoText}>{result.info}</Text>
          </View>
        )}

        {result && (
          <Text style={styles.disclaimer}>
            Sonuçlar yapay zekâ tarafından belirlenmiştir. Lütfen tanı ve tedavi için doktorunuza danışın.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fefefe' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgb(30,30,64)',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  backBtn: { paddingRight: 16 },
  backText: { fontSize: 16, color: '#fff' },
  title: { fontSize: 18, fontWeight: '600', color: '#fff' },

  container: { padding: 16, alignItems: 'center' },
  preview: { width: '100%', height: 300, borderRadius: 12, marginVertical: 20 },

  resultsCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 20
  },
  resultsHeader: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  resultLabel: { fontSize: 16, color: '#555' },
  resultScore: { fontSize: 16, fontWeight: '500', color: '#000' },
  infoHeader: { fontSize: 16, fontWeight: '600', marginTop: 12, marginBottom: 4, color: '#333' },
  infoText: { fontSize: 14, color: '#444', lineHeight: 20 },

  disclaimer: {
    marginTop: 16,
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 8
  }
});
