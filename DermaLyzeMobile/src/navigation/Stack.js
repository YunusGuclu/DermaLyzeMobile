// src/navigation/stack.js
import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import HomeScreen from '../screens/HomeScreen';
import AssistantScreen from '../screens/AssistantScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import SkinScreen from '../screens/SkinScreen';
import AcneScreen from '../screens/AcneScreen';  // ← burada doğru export edilen component
import EczemaScreen from '../screens/EczemaScreen';
enableScreens();
const Stack = createStackNavigator();

export default function Root() {
  useEffect(() => {
    async function reqPerms() {
      if (Platform.OS === 'android') {
        const readPerm =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        await PermissionsAndroid.request(readPerm);
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      }
    }
    reqPerms();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Assistant" component={AssistantScreen} />
        <Stack.Screen name="Analysis" component={AnalysisScreen} />
        <Stack.Screen name="Skin" component={SkinScreen} />
        <Stack.Screen name="Acne" component={AcneScreen} />
        <Stack.Screen name="Eczema" component={EczemaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
