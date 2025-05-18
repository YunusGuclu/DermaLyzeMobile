// src/screens/HomeScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Platform,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    Animated.timing(menuAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const scaleY = menuAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const opacity = menuAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoWrap}>
          <Image
            source={require('../assets/images/6025105.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>DermaLyze</Text>
        </View>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => navigation.navigate('Assistant')}>
            <Text style={styles.linkText}>Sağlık Asistanım</Text>
          </TouchableOpacity>

          {/* Analiz Dropdown */}
          <View style={styles.menuWrap}>
            <TouchableOpacity onPress={toggleMenu}>
              <Text style={styles.linkText}>Analiz ▾</Text>
            </TouchableOpacity>
            <Animated.View
              style={[
                styles.dropdown,
                { opacity, transform: [{ scaleY }] },
              ]}
            >
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Analysis');
                }}
              >
                <Text style={styles.dropdownText}>Cilt Analizi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  toggleMenu();
                  navigation.navigate('Skin');
                }}
              >
                <Text style={styles.dropdownText}>Deri Analizi</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>

      {/* Hero */}
      <ImageBackground
        source={require('../assets/images/360_F_1002528808_bJI4Gn2lusUNarSS7ZYCTeE5DUr0qMWL.jpg')}
        style={styles.hero}
      >
        <View style={styles.overlay} />
        <Text style={styles.heroTitle}>HOŞGELDİNİZ</Text>
        <Text style={styles.heroSubtitle}>
          DermaLyze ile Cildinizi Keşfedin
        </Text>
      </ImageBackground>

      {/* Bölümler */}
      <View style={styles.section}>
        <ImageBackground
          source={require('../assets/images/360_F_619411419_TI1j5q8ItTz6VTFxFtSUm0m8n5wYSWNy.jpg')}
          style={styles.card}
        >
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>SAĞLIK ASİSTANIM</Text>
            <Text style={styles.cardDesc}>
              Akıllı sağlık asistanımıza danışarak hızlı yanıtlar alın.
            </Text>
            <TouchableOpacity
              style={styles.cardBtn}
              onPress={() => navigation.navigate('Assistant')}
            >
              <Text style={styles.btnText}>Sağlık Asistanım</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <ImageBackground
          source={require('../assets/images/depositphotos_254341448-stock-photo-face-beautiful-girl-scanning-g.jpg')}
          style={styles.card}
        >
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>CİLT ANALİZİ</Text>
            <Text style={styles.cardDesc}>
Cildinizden şüpheleniyor musunuz? AI ile cildinizdeki potansiyel riskleri tespit edin ve genel sağlık durumunuz hakkında bilgi edinin.
            </Text>
            <TouchableOpacity
              style={styles.cardBtn}
              onPress={() => navigation.navigate('Analysis')}
            >
              <Text style={styles.btnText}>Cilt Analizi</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <ImageBackground
          source={require('../assets/images/360_F_283884186_YBKqPDaRmGJ0eh3nu6ZOcq6yvvO8NzLm.jpg')}
          style={styles.card}
        >
          <View style={styles.cardOverlay} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>DERİ ANALİZİ</Text>
            <Text style={styles.cardDesc}>
              Akne veya Egzemalarınız mı var? 
              AI ile cildinizdeki akne veya egzema rahatsızlıklarını tespit edin; belirtileriniz hakkında ayrıntılı bilgi edinin
            </Text>
            <TouchableOpacity
              style={styles.cardBtn}
              onPress={() => navigation.navigate('Skin')}
            >
              <Text style={styles.btnText}>Deri Analizi</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Image
          source={require('../assets/images/LinkedIn_icon.png')}
          style={styles.icon}
        />
        <Image
          source={require('../assets/images/github-icon-2.png')}
          style={styles.icon}
        />
        <Text style={styles.copy}>@ 2025 Copyright: Yunus Güçlü</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  navbar: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'rgb(30,30,64)',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  logoWrap: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 40, height: 40 },
  title: { color: '#fff', fontSize: 20, marginLeft: 8 },
  links: { flexDirection: 'row', alignItems: 'center' },
  linkText: { color: '#fff', marginHorizontal: 10, fontSize: 16 },

  menuWrap: { position: 'relative' },
  dropdown: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 32 : 36,
    right: 0,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    transform: [{ scaleY: 0 }],
    transformOrigin: 'top',
    zIndex: 100,
  },
  dropdownItem: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  dropdownText: { fontSize: 16, color: '#333' },

  hero: { width: '100%', height: 250, justifyContent: 'center' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30,30,64,0.5)',
  },
  heroTitle: { color: '#fff', fontSize: 28, marginLeft: 20 },
  heroSubtitle: { color: '#fff', fontSize: 18, marginLeft: 20, marginTop: 4 },

  section: { marginVertical: 12, paddingHorizontal: 12 },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardContent: { padding: 16 },
  cardTitle: { color: '#fff', fontSize: 22, fontWeight: '600' },
  cardDesc: { color: '#fff', fontSize: 14, marginVertical: 8 },

  cardBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(20,20,65)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  btnText: { color: '#fff', fontSize: 16 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgb(20,20,65)',
  },
  icon: { width: 30, height: 30, marginHorizontal: 8 },
  copy: { color: '#fff', marginLeft: 12 },
});
