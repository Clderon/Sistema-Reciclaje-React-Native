import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, View, StyleSheet, Animated } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen'; // Para estudiantes
import LogrosScreen from './src/screens/LogrosScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import ProfeScreen from './src/screens/ProfeScreen';
import { COLORS } from './src/utils/constants';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

// Tab Navigator para ESTUDIANTES
function StudentTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.textWhite,
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
        component={HomeScreen} // Pantalla de estudiantes
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
  );
}

// Tab Navigator para PADRES
function TeacherTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.textWhite,
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
        name="Control"
        component={ProfeScreen} // Pantalla de padres
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
        name="Estadísticas"
        component={LogrosScreen} // Podrías crear una pantalla específica para padres
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
        name="Configuración"
        component={PerfilScreen} // Podrías crear una pantalla específica para padres
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
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Agregar estado para el rol

  const handleLogin = (role) => {
    setUserRole(role); // Guardar el rol del usuario
    setIsAuthenticated(true); // Marcar como autenticado
  };

  // Función para determinar qué Tab Navigator usar
  const getMainComponent = () => {
    if (userRole === 'teacher') {
      return TeacherTabs; // Tabs para padres
    }
    // Por defecto, usar tabs para estudiantes
    return StudentTabs; // Tabs para estudiantes
  };

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isAuthenticated ? (
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  onLogin={handleLogin} // Pasar la función que maneja el rol
                />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main" component={getMainComponent()} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}

// ...existing styles...
const styles = StyleSheet.create({
  tabBarButtonContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.target,
  },
  tabBarButtonContainerWithBorder: {
    borderRightWidth: 3,
    borderRightColor: COLORS.textBorde,
  },
  tabBarButtonContainerFocused: {
    backgroundColor: COLORS.buttonDegradado,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});