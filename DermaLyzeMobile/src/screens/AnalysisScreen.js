// src/screens/AnalyzeScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Alert,
  FlatList
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import jpeg from 'jpeg-js';
import { loadTensorflowModel } from 'react-native-fast-tflite';

// Modelin beklediği sınıf etiketleri:
const LABELS = [
  'Melanositik Nevüs',
  'Melanom',
  'Benign Keratoz Benzeri Lezyon',
  'Bazal Hücre Karsinomu',
  'Aktinik Keratoz / İntraepitelyal Karsinom',
];

export default function AnalyzeScreen() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [photoUri, setPhotoUri] = useState(null);
  const WIDTH = 224, HEIGHT = 224;

  // 1️⃣ Modeli yükle
  useEffect(() => {
    (async () => {
      try {
        const m = await loadTensorflowModel(
          require('../assets/models/model.tflite')
        );
        setModel(m);
        console.log('✅ Model yüklendi');
      } catch (e) {
        console.error('❌ Model yükleme hatası', e);
        Alert.alert('Hata', 'Model yüklenemedi: ' + e.message);
      }
    })();
  }, []);

  const analyze = async () => {
    if (!model) {
      return Alert.alert('Model henüz yüklenmedi.');
    }

    // 2️⃣ Fotoğraf seç
    const res = await launchImageLibrary({ mediaType: 'photo' });
    const uri = res.assets?.[0]?.uri;
    if (!uri) return;
    setPhotoUri(uri);

    try {
      // 3️⃣ 224×224 boyutuna küçült
      const { uri: resizedUri } = await ImageResizer.createResizedImage(
        uri, WIDTH, HEIGHT, 'JPEG', 100
      );

      // 4️⃣ Dosyayı base64 olarak oku
      const b64 = await RNFS.readFile(resizedUri, 'base64');
      const raw = jpeg.decode(Buffer.from(b64, 'base64'));

      // 5️⃣ RGBA → RGB Uint8Array çevir
      const buffer = new Uint8Array(WIDTH * HEIGHT * 3);
      for (let i = 0; i < WIDTH * HEIGHT; i++) {
        buffer[i * 3 + 0] = raw.data[i * 4 + 0]; // R
        buffer[i * 3 + 1] = raw.data[i * 4 + 1]; // G
        buffer[i * 3 + 2] = raw.data[i * 4 + 2]; // B
      }

      // 6️⃣ Modeli çalıştır, çıktı array’ini al
      const out = await model.run(buffer); 
      // out örn. [0.02, 0.85, 0.01, 0.10, 0.02]

      // 7️⃣ Etiketlerle eşleştir ve % olarak sırala
      const preds = out
        .map((p, i) => ({
          label: LABELS[i],
          probability: (p * 100).toFixed(1) + '%'
        }))
        .sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));

      setPredictions(preds);
    } catch (e) {
      console.error('❌ Analiz hatası', e);
      Alert.alert('Analiz Hatası', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cilt Analizi</Text>
      <Button title="Fotoğraf Seç & Analiz Et" onPress={analyze} />
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.photo} />
      )}
      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(_, idx) => idx.toString()}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.prob}>{item.probability}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 16 },
  photo: { width: 200, height: 200, marginTop: 16, borderRadius: 8 },
  list: { marginTop: 16, width: '100%' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 16 },
  prob: { fontSize: 16, fontWeight: 'bold' },
});
