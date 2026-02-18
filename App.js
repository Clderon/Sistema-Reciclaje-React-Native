import React, { useRef, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import AnimatedReanimated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { playPopSound, loadSoundPreference, loadMusicPreferences, playBackgroundMusic, stopBackgroundMusic, isMusicEnabled } from './src/utils/soundHelper';

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


// Componente personalizado de TabBar con fondo animado
const AnimatedTabBar = ({ state, descriptors, navigation }) => {
  const tabIndex = useSharedValue(0);
  const tabLayouts = useSharedValue({ width: 0, x: 0 });

  // Sincronizar tabIndex con el estado actual
  useEffect(() => {
    tabIndex.value = withTiming(state.index, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });
  }, [state.index]);

  // Animación del fondo que se desplaza entre tabs
  const backgroundStyle = useAnimatedStyle(() => {
    const tabWidth = tabLayouts.value.width > 0 ? tabLayouts.value.width / state.routes.length : 0;
    const translateX = tabIndex.value * tabWidth;
    
    return {
      transform: [{ 
        translateX: withTiming(translateX, {
          duration: 250,
          easing: Easing.out(Easing.ease),
        })
      }],
      width: tabWidth || `${100 / state.routes.length}%`,
    };
  });

  return (
    <View 
      style={styles.tabBarContainer}
      onLayout={(event) => {
        const { width, x } = event.nativeEvent.layout;
        tabLayouts.value = { width, x };
      }}
    >
      {/* Fondo animado que se desplaza */}
      <AnimatedReanimated.View style={[styles.tabBarBackground, backgroundStyle]} />
      
      {/* Botones de tabs */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabBarButton,
              index < state.routes.length - 1 && styles.tabBarButtonWithBorder,
            ]}
          >
            <View style={styles.tabBarButtonContent}>
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? COLORS.textWhite : COLORS.textContenido, size: 50 })}
              <Text style={[
                styles.tabBarLabel,
                { color: isFocused ? COLORS.textWhite : COLORS.textContenido }
              ]}>
                {label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

// Componente personalizado para el botón del tab con animación (mantener para compatibilidad)
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
  );
};

// Tab Navigator para ESTUDIANTES
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
        component={HomeScreen} // Pantalla de estudiantes
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./src/assets/images/home.webp')}
              style={{ width: 50, height: 50, marginTop: 15}}
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
              source={require('./src/assets/images/trofeos.webp')}
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
              source={require('./src/assets/images/mochila.webp')}
              style={{ width: 50, height: 50, marginTop: 15 }}
              resizeMode="cover"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Tab Navigator para PADRES
function TeacherTabs() {
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

  // Manejar música de fondo cuando el usuario está autenticado
  useEffect(() => {
    // Solo ejecutar cuando termine de cargar y el estado de autenticación cambie
    if (loading) return;

    let isMounted = true; // Flag para evitar actualizaciones después de desmontar
    let timeoutId = null;
    let isHandling = false; // Flag para evitar múltiples llamadas simultáneas

    const handleMusic = async () => {
      if (!isMounted || isHandling) return;
      
      isHandling = true;
      
      try {
        if (isAuthenticated && isMusicEnabled()) {
          // Usuario autenticado: iniciar música de fondo
          // playBackgroundMusic SIEMPRE detiene música anterior y reinicia desde el principio
          await playBackgroundMusic('calm_background_loop.wav', { 
            volume: 0.20, // Volumen
            loop: true 
          });
        } else {
          // Usuario no autenticado o música deshabilitada: detener música
          await stopBackgroundMusic();
        }
      } finally {
        isHandling = false;
      }
    };

    // Delay para evitar múltiples llamadas durante hot reload
    timeoutId = setTimeout(() => {
      handleMusic();
    }, 300);

    // Cleanup: detener música solo cuando el usuario cierre sesión o el componente se desmonte
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Solo detener si realmente el usuario cerró sesión (no durante hot reload)
      if (!isAuthenticated) {
        stopBackgroundMusic();
      }
    };
  }, [isAuthenticated, loading]);

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
  // Cargar preferencias de sonido y música al iniciar la app
  useEffect(() => {
    loadSoundPreference();
    loadMusicPreferences();
  }, []);

  return (
    <RootSiblingParent>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
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
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0, // Sin border radius
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  tabBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: COLORS.button,
    zIndex: 0,
    borderRadius: 0, // Sin border radius
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  tabBarButtonWithBorder: {
    borderRightWidth: 3,
    borderRightColor: COLORS.textBorde,
  },
  tabBarButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
});