import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LogrosScreen from './src/screens/LogrosScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import { COLORS } from './src/utils/constants';

const Tab = createBottomTabNavigator();

// Componente personalizado para el botón del tab con border-right
const TabBarButton = ({ children, onPress, isLast = false, style, ...props }) => (
  <View style={[styles.tabBarButtonContainer, !isLast && styles.tabBarButtonContainerWithBorder]}>
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.tabBarButton, style]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  </View>
);

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
            height: 85,
            paddingBottom: 5,
            paddingTop: 0,
            paddingHorizontal: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            marginTop: 10,
            fontWeight: '700',
            textAlign: 'center',
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
                style={{ width: 50, height: 50, marginTop: 15}}
                resizeMode="cover"
              />
            ),
            tabBarButton: (props) => <TabBarButton {...props} isLast={false} />,
          }}
        />
        <Tab.Screen
          name="Logros"
          component={LogrosScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./src/assets/images/trofeos.webp')}
                style={{ width: 50, height: 50, marginTop: 15 }}
                resizeMode="cover"
              />
            ),
            tabBarButton: (props) => <TabBarButton {...props} isLast={false} />,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('./src/assets/images/mochila.webp')}
                style={{ width: 50, height: 50, marginTop: 15 }}
                resizeMode="cover"
              />
            ),
            tabBarButton: (props) => <TabBarButton {...props} isLast={true} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarButtonContainer: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  tabBarButtonContainerWithBorder: {
    borderRightWidth: 3,
    borderRightColor: COLORS.textBorde,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
