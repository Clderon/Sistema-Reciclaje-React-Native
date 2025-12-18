import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, View, StyleSheet, Animated } from 'react-native';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import LogrosScreen from './src/screens/LogrosScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import { COLORS } from './src/utils/constants';

const Tab = createBottomTabNavigator();

// Componente personalizado para el botón del tab con animación
const TabBarButton = ({ children, onPress, isLast = false, accessibilityState, style, ...props }) => {
  const focused = accessibilityState?.selected;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <View style={[
      styles.tabBarButtonContainer, 
      !isLast && styles.tabBarButtonContainerWithBorder,
      focused && styles.tabBarButtonContainerFocused,
    ]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.tabBarButton, style]}
        {...props}
      >
        <Animated.View style={{ transform: [{ scale }], flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FFFFFF',
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
    backgroundColor: COLORS.target,
  },
  tabBarButtonContainerWithBorder: {
    borderRightWidth: 3,
    borderRightColor: COLORS.textBorde,
  },
  tabBarButtonContainerFocused: {
    backgroundColor: '#6BB927',
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
