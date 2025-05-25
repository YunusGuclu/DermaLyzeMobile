// src/screens/SkinScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

// Static image imports
const backArrow = '‹';
const heroImg = require('../assets/images/360_F_283884186_YBKqPDaRmGJ0eh3nu6ZOcq6yvvO8NzLm.jpg');
const acneImg = require('../assets/images/akne.png');
const eczemaImg = require('../assets/images/DERMATOLOJI-banner.jpg');

export default function SkinScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{backArrow}</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>DERİ ANALİZİ</Text>
        {/* Menü butonu kaldırıldı */}
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Hero */}
        <ImageBackground source={heroImg} style={styles.hero}>
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text style={styles.heroTitle}>DERİ ANALİZİ</Text>
            <Text style={styles.heroSubtitle}>
              Cildinizdeki akne veya egzema rahatsızlıklarını tespit edin; belirtileriniz hakkında detaylı bilgi edinin.
            </Text>
          </View>
        </ImageBackground>

        {/* Akne Analizi */}
        <View style={styles.section}>
          <ImageBackground source={acneImg} style={styles.card}>
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>AKNE ANALİZİ</Text>
              <Text style={styles.cardDesc}>
                Siyah nokta, beyaz sivilce, kist ya da papül tespiti için görüntünüzü analiz edin.
              </Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => navigation.navigate('Acne')}
              >
                <Text style={styles.btnText}>Analiz Et</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Egzema Analizi */}
        <View style={styles.section}>
          <ImageBackground source={eczemaImg} style={styles.card}>
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>EGZEMA ANALİZİ</Text>
              <Text style={styles.cardDesc}>
                Kuru, kaşıntılı, iltihaplı döküntüleri,kızarıklıkları analiz edin.
              </Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => navigation.navigate('Eczema')}
              >
                <Text style={styles.btnText}>Analiz Et</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#F9FAFB' },
  navbar:          {
                     flexDirection: 'row',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     paddingHorizontal: 16,
                     paddingVertical: 12,
                     backgroundColor: 'white',
                     elevation: 3,
                   },
  backBtn:         { width: 32, justifyContent: 'center', alignItems: 'center' },
  backArrow:       { fontSize: 24, color: '#4B5563' },
  navTitle:        { fontSize: 20, fontWeight: '600', color: '#1F2937' },

  content:         { flex: 1 },
  hero:            { width:'100%', height:250, justifyContent:'center' },
  overlay:         { ...StyleSheet.absoluteFillObject, backgroundColor:'rgba(31,41,55,0.5)' },
  textContainer:   { paddingHorizontal: 16 },
  heroTitle:       { color:'white', fontSize:28, fontWeight:'600' },
  heroSubtitle:    { color:'white', fontSize:16, marginTop:4 },

  section:         { marginVertical:12, paddingHorizontal:16 },
  card:            { width:'100%', height:200, borderRadius:12, overflow:'hidden', justifyContent:'flex-end' },
  cardOverlay:     { ...StyleSheet.absoluteFillObject, backgroundColor:'rgba(0,0,0,0.3)' },
  cardContent:     { padding:16 },
  cardTitle:       { color:'white', fontSize:20, fontWeight:'600' },
  cardDesc:        { color:'white', fontSize:14, marginVertical:8 },
  cardBtn:         { alignSelf:'flex-start', backgroundColor:'#4F46E5', paddingVertical:8, paddingHorizontal:16, borderRadius:20 },
  btnText:         { color:'white', fontSize:16 },
});
