// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

// Static imports for images to avoid require path issues
const heroImg      = require('../assets/images/360_F_1002528808_bJI4Gn2lusUNarSS7ZYCTeE5DUr0qMWL.jpg');
const assistantImg = require('../assets/images/360_F_619411419_TI1j5q8ItTz6VTFxFtSUm0m8n5wYSWNy.jpg');
const skinImg      = require('../assets/images/depositphotos_254341448-stock-photo-face-beautiful-girl-scanning-g.jpg');
const dermImg      = require('../assets/images/360_F_283884186_YBKqPDaRmGJ0eh3nu6ZOcq6yvvO8NzLm.jpg');
const logoImg      = require('../assets/images/6025105.png');
const linkedInIcon = require('../assets/images/LinkedIn_icon.png');
const githubIcon   = require('../assets/images/github-icon-2.png');

export default function HomeScreen({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.logoWrap}>
          <Image source={logoImg} style={styles.logo} />
          <Text style={styles.title}>DermaLyze</Text>
        </View>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => navigation.navigate('Assistant')}>
            <Text style={styles.linkText}>Sağlık Asistanım</Text>
          </TouchableOpacity>

          {/* Analiz Dropdown */}
          <View style={styles.menuWrap}>
            <TouchableOpacity onPress={() => setMenuOpen(o => !o)}>
              <Text style={styles.linkText}>Analiz ▾</Text>
            </TouchableOpacity>

            {menuOpen && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setMenuOpen(false);
                    navigation.navigate('Analysis');
                  }}
                >
                  <Text style={styles.dropdownText} numberOfLines={1}>
                    Cilt Analizi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setMenuOpen(false);
                    navigation.navigate('Skin');
                  }}
                >
                  <Text style={styles.dropdownText} numberOfLines={1}>
                    Deri Analizi
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Hero */}
      <ImageBackground source={heroImg} style={styles.hero}>
        <View style={styles.overlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>HOŞGELDİNİZ!</Text>
          <Text style={styles.heroSubtitle}>DermaLyze ile Cildinizi Keşfedin</Text>
        </View>
      </ImageBackground>

      {/* Sections */}
      <View style={styles.sectionContainer}>
        {/* Sağlık Asistanım Card */}
        <View style={styles.section}>
          <ImageBackground source={assistantImg} style={styles.card}>
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>SAĞLIK ASISTANIM</Text>
              <Text style={styles.cardDesc}>
                Akıllı sağlık asistanımıza danışarak hızlı yanıtlar alın.
              </Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => navigation.navigate('Assistant')}
              >
                <Text style={styles.btnText}>Sağlık Asistanım →</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Cilt Analizi Card */}
        <View style={styles.section}>
          <ImageBackground source={skinImg} style={styles.card}>
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>CİLT ANALİZİ</Text>
              <Text style={styles.cardDesc}>
                AI ile cildinizdeki potansiyel riskleri tespit edin.
              </Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => navigation.navigate('Analysis')}
              >
                <Text style={styles.btnText}>Cilt Analizi →</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Deri Analizi Card */}
        <View style={styles.section}>
          <ImageBackground source={dermImg} style={styles.card}>
            <View style={styles.cardOverlay} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>DERİ ANALİZİ</Text>
              <Text style={styles.cardDesc}>Akne veya egzema analizine göz atın.</Text>
              <TouchableOpacity
                style={styles.cardBtn}
                onPress={() => navigation.navigate('Skin')}
              >
                <Text style={styles.btnText}>Deri Analizi →</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Image source={linkedInIcon} style={styles.icon} />
        <Image source={githubIcon} style={styles.icon} />
        <Text style={styles.copy}>&copy; 2025 Yunus Güçlü</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:        { backgroundColor: '#F9FAFB' },
  navbar:           {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'white',
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      elevation: 3,
                      zIndex: 10,
                    },
  logoWrap:         { flexDirection: 'row', alignItems: 'center' },
  logo:             { width: 40, height: 40 },
  title:            { marginLeft: 8, fontSize: 20, fontWeight: '600', color: '#1F2937' },
  links:            { flexDirection: 'row', alignItems: 'center' },
  linkText:         { color: '#4B5563', marginHorizontal: 12, fontSize: 16 },
  menuWrap:         {
                      position: 'relative',
                      overflow: 'visible',
                    },
  dropdown:         {
                      position: 'absolute',
                      top: Platform.OS === 'ios' ? 36 : 40,
                      right: 0,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 4,
                      elevation: 10,
                      zIndex: 100,
                      minWidth: 140,          // kesecek kadar genişlik
                    },
  dropdownItem:     { paddingVertical: 8, paddingHorizontal: 12 },
  dropdownText:     { fontSize: 16, color: '#374151' },
  hero:             { width: '100%', height: 300, justifyContent: 'center' },
  overlay:          { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(31,41,55,0.5)' },
  heroContent:      { marginLeft: 16 },
  heroTitle:        { color: 'white', fontSize: 32, fontWeight: '700' },
  heroSubtitle:     { color: 'white', fontSize: 18, marginTop: 4 },
  sectionContainer: { paddingVertical: 24 },
  section:          { marginBottom: 16, paddingHorizontal: 12 },
  card:             { width: '100%', height: 200, borderRadius: 12, overflow: 'hidden', justifyContent: 'flex-end' },
  cardOverlay:      { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  cardContent:      { padding: 16 },
  cardTitle:        { color: 'white', fontSize: 20, fontWeight: '600' },
  cardDesc:         { color: 'white', fontSize: 14, marginVertical: 8 },
  cardBtn:          { alignSelf: 'flex-start', backgroundColor: 'rgb(20,20,65)', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 25 },
  btnText:          { color: 'white', fontSize: 16 },
  footer:           { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16, backgroundColor: 'rgb(20,20,65)' },
  icon:             { width: 30, height: 30, marginHorizontal: 8 },
  copy:             { color: 'white', fontSize: 14 },
});
