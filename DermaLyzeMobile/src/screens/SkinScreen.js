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

export default function SkinScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Deri Analizi</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Hero */}
        <ImageBackground
          source={require('../assets/images/360_F_283884186_YBKqPDaRmGJ0eh3nu6ZOcq6yvvO8NzLm.jpg')}
          style={styles.hero}
        >
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text style={styles.heroTitle}>DERİ ANALİZİ</Text>
            <Text style={styles.heroSubtitle}>
Cildinizdeki akne veya egzema rahatsızlıklarını tespit edin; belirtileriniz hakkında ayrıntılı bilgi edinin
            </Text>
          </View>
        </ImageBackground>

        {/* Akne Analizi Kartı */}
        <View style={styles.section}>
          <ImageBackground
            source={require('../assets/images/akne.png')}
            style={styles.card}
          >
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>AKNE ANALİZİ</Text>
              <Text style={styles.cardDesc}>
Cildinizde siyah noktalar, ucu beyaz sivilceler, derin altı ağrılı sert yumrular, irin dolu kistler veya kırmızı küçük papüller var mı?
Cildinizdeki akneleri analiz edin.
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

        {/* Egzema Analizi Kartı */}
        <View style={styles.section}>
          <ImageBackground
            source={require('../assets/images/DERMATOLOJI-banner.jpg')}
            style={styles.card}
          >
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>EGZEMA ANALİZİ</Text>
              <Text style={styles.cardDesc}>
Cildinizde kuruma, çatlama, yoğun kaşıntı ve hassasiyet; şişkin, renk değiştiren döküntülerle birlikte kabuklaşma veya iltihaplanma görüyor musunuz?
Egzemalarınızı analiz edin.


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
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: 'rgb(30,30,64)',
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },
  backBtn: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  hero: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30,30,64,0.5)',
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
  },

  section: { marginVertical: 12, paddingHorizontal: 12 },
  card: {
    width: '100%',
    height: 245,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardContent: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'left',
  },
  cardDesc: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 8,
    lineHeight: 20,
  },
  cardBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(20,20,65)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  btnText: { color: '#fff', fontSize: 16 },
});
