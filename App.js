import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet } from 'react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LogrosScreen from './src/screens/LogrosScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import { COLORS } from './src/utils/constants';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.button,
          tabBarInactiveTintColor: COLORS.textContenido,
          tabBarStyle: {
            backgroundColor: COLORS.target,
            borderTopWidth: 3,
            borderTopColor: COLORS.textBorde,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./src/assets/images/home.webp')}
                style={styles.tabIcon}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Logros"
          component={LogrosScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./src/assets/images/trofeos.webp')}
                style={styles.tabIcon}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./src/assets/images/mochila.webp')}
                style={styles.tabIcon}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30,
  },
});

