import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import StudentLoginScreen from './src/screens/StudentLoginScreen';
import StudentRegisterScreen from './src/screens/StudentRegisterScreen';
import TeacherLoginScreen from './src/screens/TeacherLoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import LogrosScreen from './src/screens/LogrosScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import ProfeScreen from './src/screens/ProfeScreen';
import { COLORS } from './src/utils/constants';
import { AuthProvider, useAuth } from './src/context/AuthContext';

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

// Componente MainTabs que selecciona el tab según el rol del usuario
function MainTabs() {
  const { user } = useAuth();
  
  // Si el usuario es estudiante, mostrar StudentTabs, de lo contrario TeacherTabs
  if (user?.role === 'student') {
    return <StudentTabs />;
  }
  
  // Para 'teacher' o 'parent' mostrar TeacherTabs
  return <TeacherTabs />;
}

// Componente interno que usa el contexto de autenticación
function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.target }}>
        <ActivityIndicator size="large" color={COLORS.button} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  onLogin={() => {
                    // El AuthContext ya maneja el estado, no necesitamos hacer nada aquí
                  }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
            <Stack.Screen name="StudentRegister" component={StudentRegisterScreen} />
            <Stack.Screen name="TeacherLogin" component={TeacherLoginScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
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