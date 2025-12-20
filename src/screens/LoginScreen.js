import React, { useRef } from 'react';
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
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { COLORS } from '../utils/constants';
import RoleButtonCard from '../components/RoleButtonCard';

// Necesario para que funcione correctamente en web
WebBrowser.maybeCompleteAuthSession();

const AnimatedButton = ({ children, onPress, style }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const LoginScreen = ({ onLogin }) => {
  // Configuración de Google OAuth
  // NOTA: Para que funcione, necesitas configurar las credenciales en Google Cloud Console
  // https://console.cloud.google.com/apis/credentials
  const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
  const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || GOOGLE_CLIENT_ID;
  const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || GOOGLE_CLIENT_ID;
  const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || GOOGLE_CLIENT_ID;
  
  // Modo demo: si no hay credenciales configuradas, usar modo simulado
  const isDemoMode = !GOOGLE_CLIENT_ID || 
                     GOOGLE_CLIENT_ID === 'TU_CLIENT_ID_AQUI' || 
                     GOOGLE_CLIENT_ID === '';
  
  // Solo inicializar el hook de Google si tenemos credenciales válidas
  // En modo demo, no inicializamos el hook para evitar errores
  const googleAuthConfig = isDemoMode 
    ? null 
    : {
        expoClientId: GOOGLE_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        webClientId: GOOGLE_WEB_CLIENT_ID,
      };
  
  const [request, response, promptAsync] = Google.useAuthRequest(
    googleAuthConfig || {
      // Valores dummy para evitar errores en modo demo (no se usarán)
      expoClientId: 'demo',
      androidClientId: 'demo',
      iosClientId: 'demo',
      webClientId: 'demo',
    },
    { useProxy: true } // Usar proxy de Expo para desarrollo
  );

  // Manejar respuesta de Google
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Autenticación exitosa con Google:', authentication);
      
      // Aquí puedes obtener información del usuario con el access_token
      // Ejemplo: fetchUserInfo(authentication.accessToken);
      
      // Navegar a la pantalla principal
      if (onLogin) {
        onLogin();
      }
    } else if (response?.type === 'error') {
      console.error('Error en autenticación Google:', response.error);
      
      // Mensaje más específico según el tipo de error
      let errorMessage = 'No se pudo completar el inicio de sesión con Google.';
      
      if (response.error?.code === '4004' || response.error?.message?.includes('4004')) {
        errorMessage = 'Error 4004: Las credenciales de Google OAuth no están configuradas correctamente.\n\n' +
          'Por favor, configura tus credenciales en Google Cloud Console:\n' +
          '1. Ve a https://console.cloud.google.com/\n' +
          '2. Crea un proyecto o selecciona uno existente\n' +
          '3. Habilita Google Sign-In API\n' +
          '4. Crea credenciales OAuth 2.0\n' +
          '5. Agrega EXPO_PUBLIC_GOOGLE_CLIENT_ID a tu archivo .env';
      }
      
      Alert.alert('Error de autenticación', errorMessage, [{ text: 'OK' }]);
    } else if (response?.type === 'cancel') {
      console.log('Usuario canceló el inicio de sesión con Google');
    }
  }, [response, onLogin]);

  
const handleRoleSelect = (role) => {
  console.log('Rol seleccionado:', role);
  
  // Agregar navegación específica por rol
  if (role === 'parent') {
    // Navegar al Centro de Control para padres
    if (onLogin) {
      onLogin('parent'); // Pasamos el rol al callback
    }
  } else if (role === 'teacher') {
    // Navegar a la pantalla de docente (por definir)
    if (onLogin) {
      onLogin('teacher');
    }
  } else if (role === 'student') {
    // Navegar a la pantalla de alumno (por definir)
    if (onLogin) {
      onLogin('student');
    }
  }
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
            {/* Botón Padre/Madre */}
            <RoleButtonCard
              avatarSource={require('../assets/images/elefante.png')}
              name="Soy Padre/ Madre"
              onPress={() => handleRoleSelect('parent')}
              nameCardBorderWidth={0}
              avatarBorderWidth={5}
              avatarInnerColor="#AFE3B2"
            />

            {/* Botón Docente */}
            <RoleButtonCard
              avatarSource={require('../assets/images/gallito-rocas.png')}
              name="Soy Docente"
              onPress={() => handleRoleSelect('teacher')}
              nameCardBorderWidth={0}
              avatarInnerColor="#AFE3B2"
            />

            {/* Botón Alumno */}
            <RoleButtonCard
              avatarSource={require('../assets/images/tucan.png')}
              name="Soy Alumno"
              onPress={() => handleRoleSelect('student')}
              nameCardBorderWidth={0}
              avatarInnerColor="#9CDAE7"
            />
          </View>

          {/* Botón Google */}
          <AnimatedButton
            onPress={handleGoogleLogin}
            style={styles.googleButton}
          >
            <Text style={styles.googleButtonText}>ingresar con Google</Text>
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
    backgroundColor: '#EDDEBF',
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
});

export default LoginScreen;

