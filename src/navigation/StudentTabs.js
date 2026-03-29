import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar from './AnimatedTabBar';
import HomeScreen from '../screens/HomeScreen';
import LogrosScreen from '../screens/LogrosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { COLORS } from '../utils/constants';

const Tab = createBottomTabNavigator();

function StudentTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.textWhite,
        tabBarInactiveTintColor: COLORS.textContenido,
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/images/home.webp')}
              style={{ width: 50, height: 50, marginTop: 15 }}
              resizeMode="cover"
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
              source={require('../assets/images/trofeos.webp')}
              style={{ width: 50, height: 50, marginTop: 15 }}
              resizeMode="cover"
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
              source={require('../assets/images/mochila.webp')}
              style={{ width: 50, height: 50, marginTop: 15 }}
              resizeMode="cover"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default StudentTabs;
