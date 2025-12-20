import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { COLORS } from '../utils/constants';
import RoleButtonCard from '../components/common/RoleButtonCard';
import ModalNombre from '../components/common/ModalNombre';
import { useAuth } from '../context/AuthContext';

// Necesario para que funcione correctamente en web
WebBrowser.maybeCompleteAuthSession();

const AnimatedButton = ({ children, onPress, style, disabled = false }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
    }
  };

  return (
    <Pressable 
      onPress={onPress} 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const LoginScreen = ({ onLogin, navigation }) => {
  const { signIn } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalNombreVisible, setModalNombreVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Configuración de Google OAuth (mantener para futuro)
  const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
  const isDemoMode = !GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === '';
  
  const googleAuthConfig = isDemoMode ? null : {
    expoClientId: GOOGLE_CLIENT_ID,
    androidClientId: GOOGLE_CLIENT_ID,
    iosClientId: GOOGLE_CLIENT_ID,
    webClientId: GOOGLE_CLIENT_ID,
  };
  
  const [request, response, promptAsync] = Google.useAuthRequest(
    googleAuthConfig || {
      expoClientId: 'demo',
      androidClientId: 'demo',
      iosClientId: 'demo',
      webClientId: 'demo',
    },
    { useProxy: true }
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      // Google login - implementar después
      if (onLogin) {
        onLogin();
      }
    }
  }, [response, onLogin]);

  const handleRoleSelect = (role, navigation) => {
    if (role === 'student') {
      // Navegar a la pantalla de login de estudiantes
      navigation.navigate('StudentLogin');
    } else {
      setSelectedRole(role);
      setModalNombreVisible(true);
    }
  };

  const handleConfirmNombre = async (username) => {
    if (!selectedRole) return;

    setModalNombreVisible(false);
    setLoading(true);
    
    try {
      // Llamar al backend para login/registro (padres/docentes)
      const result = await signIn(username, selectedRole);
      
      if (result.success) {
        // Login exitoso, navegar a la app
        if (onLogin) {
          onLogin();
        }
      } else {
        Alert.alert(
          'Error',
          result.error || 'No se pudo iniciar sesión. Intenta de nuevo.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error en login:', error);
      Alert.alert(
        'Error de conexión',
        'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalNombreVisible(false);
    setSelectedRole(null);
  };

  const handleGoogleLogin = async () => {
    try {
      // Modo demo: simular login exitoso
      if (isDemoMode) {
        Alert.alert(
          'Modo Demo',
          'Google Sign-In está en modo demo. Para usar la funcionalidad real, configura tus credenciales de Google OAuth.\n\n' +
          'Pasos:\n' +
          '1. Ve a https://console.cloud.google.com/\n' +
          '2. Crea un proyecto\n' +
          '3. Habilita Google Sign-In API\n' +
          '4. Crea credenciales OAuth 2.0\n' +
          '5. Agrega EXPO_PUBLIC_GOOGLE_CLIENT_ID a tu archivo .env\n\n' +
          'Por ahora, simulando login exitoso...',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Continuar (Demo)',
              onPress: () => {
                if (onLogin) {
                  onLogin();
                }
              },
            },
          ]
        );
        return;
      }

      // Verificar si la solicitud está lista y tenemos credenciales válidas
      if (!request || isDemoMode) {
        Alert.alert(
          'Error',
          'Google Sign-In no está configurado correctamente. Verifica tus credenciales.'
        );
        return;
      }

      // Iniciar el flujo de autenticación
      const result = await promptAsync();
      
      if (result?.type === 'dismiss') {
        console.log('Usuario cerró el diálogo de autenticación');
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      
      // Si el error es por credenciales faltantes, mostrar modo demo
      if (error.message?.includes('androidClientId') || error.message?.includes('Client Id')) {
        Alert.alert(
          'Configuración Requerida',
          'Para usar Google Sign-In, necesitas configurar tus credenciales.\n\n' +
          '¿Deseas continuar en modo demo?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Continuar (Demo)',
              onPress: () => {
                if (onLogin) {
                  onLogin();
                }
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Error',
          `Ocurrió un error al intentar iniciar sesión con Google: ${error.message || 'Error desconocido'}`
        );
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Recuperar contraseña');
    // Aquí iría la navegación a recuperar contraseña
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/frame-5.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          decelerationRate="normal"
          bounces={true}
          overScrollMode="always"
          scrollEventThrottle={16}
        >
          {/* Título principal */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>Bienvenido a la Selva del Reciclaje</Text>
            <Text style={styles.subtitle}>¿Quién eres hoy?</Text>
          </View>

          {/* Botones de selección de rol */}
          <View style={styles.rolesContainer}>
            {/* Botón Padre/Madre - Deshabilitado */}
            <RoleButtonCard
              avatarSource={require('../assets/images/elefante.png')}
              name="Soy Padre/ Madre"
              onPress={() => {}} // No hace nada
              nameCardBorderWidth={0}
              avatarBorderWidth={5}
              avatarInnerColor="#AFE3B2"
              disabled={true}
            />

            {/* Botón Docente - Deshabilitado */}
            <RoleButtonCard
              avatarSource={require('../assets/images/gallito-rocas.png')}
              name="Soy Docente"
              onPress={() => {}} // No hace nada
              nameCardBorderWidth={0}
              avatarInnerColor="#AFE3B2"
              disabled={true}
            />

            {/* Botón Alumno - Habilitado */}
            <RoleButtonCard
              avatarSource={require('../assets/images/tucan.png')}
              name="Soy Alumno"
              onPress={() => handleRoleSelect('student', navigation)}
              nameCardBorderWidth={0}
              avatarInnerColor="#9CDAE7"
              disabled={false}
            />
          </View>

          {/* Botón Google - Deshabilitado */}
          <AnimatedButton
            onPress={() => {}} // No hace nada
            style={[styles.googleButton, styles.buttonDisabled]}
            disabled={true}
          >
            <Text style={[styles.googleButtonText, styles.buttonTextDisabled]}>
              ingresar con Google
            </Text>
          </AnimatedButton>

          {/* Link de contraseña olvidada */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste Tu Contraseña?</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>

      {/* Modal para ingresar nombre (padres/docentes) */}
      <ModalNombre
        visible={modalNombreVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirmNombre}
        role={selectedRole}
        loading={loading}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondoFallback,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingTop: hp('8%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    paddingBottom: hp('15%'),
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  mainTitle: {
    fontSize: wp('7%'),
    fontWeight: '900',
    color: COLORS.textTitle,
    textAlign: 'center',
    marginBottom: hp('2%'),
    textShadowColor: COLORS.textBorde,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: COLORS.textBorde,
    textAlign: 'center',
    includeFontPadding: false,
  },
  rolesContainer: {
    width: '100%',
    maxWidth: wp('95%'),
    marginBottom: hp('4%'),
    gap: hp('2%'),
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  googleButton: {
    width: wp('80%'), // 430px si el diseño base es 430px
    maxWidth: wp('100%'),
    height: wp('10%'), // 80px / 430px * 100 = 18.6% del ancho
    minHeight: wp('15%'), // Asegurar altura mínima
    backgroundColor: '#EDDEBF',
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: COLORS.textContenido,
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButtonText: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: COLORS.textBorde,
    textAlign: 'center',
    includeFontPadding: false,
  },
  forgotPasswordContainer: {
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2.5%'),
    paddingVertical: hp('1%'),
  },
  forgotPasswordText: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: COLORS.textBorde,
    textAlign: 'center',
    textDecorationLine: 'underline',
    includeFontPadding: false,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('2%'),
    marginBottom: hp('2%'),
  },
  loadingText: {
    marginTop: hp('1%'),
    fontSize: wp('4%'),
    color: COLORS.textContenido,
    fontWeight: '600',
    includeFontPadding: false,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTextDisabled: {
    opacity: 0.7,
  },
});

export default LoginScreen;

