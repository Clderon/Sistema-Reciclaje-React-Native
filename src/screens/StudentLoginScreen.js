import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

// Datos de estudiantes de prueba para auto-rellenar
const TEST_STUDENTS = [
  {
    username: 'estudiante1',
    email: 'estudiante1@unas.edu.pe',
    password: 'estudiante1'
  },
  {
    username: 'estudiante2',
    email: 'estudiante2@unas.edu.pe',
    password: 'estudiante2'
  }
];

const StudentLoginScreen = ({ navigation }) => {
  const { loginStudent } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-rellenar campos con un estudiante de prueba aleatorio al montar el componente
  useEffect(() => {
    // Seleccionar aleatoriamente uno de los estudiantes de prueba
    const randomStudent = TEST_STUDENTS[Math.floor(Math.random() * TEST_STUDENTS.length)];
    setEmailOrUsername(randomStudent.username);
    setPassword(randomStudent.password);
  }, []);

  const handleLogin = async () => {
    if (!emailOrUsername.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const result = await loginStudent(
        emailOrUsername.trim(),
        password.trim()
      );
      
      if (result.success) {
        // El AuthContext maneja el cambio de estado y App.js redirige automáticamente
      } else {
        Alert.alert(
          'Error',
          result.error || 'No se pudo iniciar sesión. Intenta de nuevo.'
        );
      }
    } catch (error) {
      console.error('Error en login:', error);
      Alert.alert(
        'Error de conexión',
        'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate('StudentRegister');
  };

  const isValid = () => {
    return (
      emailOrUsername.trim().length > 0 &&
      password.trim().length >= 6
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/frame-5.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Iniciar Sesión en la Selva</Text>
            </View>

            {/* Imagen del mono */}
            <View style={styles.monoContainer}>
              <Image
                source={require('../assets/images/mono-login.webp')}
                style={styles.monoImage}
                resizeMode="contain"
              />
            </View>

            {/* Form Wrapper */}
            <View style={styles.formWrapper}>
              {/* Form */}
              <View style={styles.formContainer}>
                {/* Input con bordes de bambú (completo) */}
                <View style={styles.inputWrapper}>
                  {/* Bambú horizontal superior */}
                  <Image
                    source={require('../assets/images/banbo-horizontal.webp')}
                    style={styles.bambuBorderTop}
                    resizeMode="stretch"
                  />
                  {/* Contenedor horizontal con bambú lateral y input */}
                  <View style={styles.inputContainer}>
                    <Image
                      source={require('../assets/images/banbo-vertical.webp')}
                      style={styles.bambuBorderLeft}
                      resizeMode="stretch"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Email o Usuario"
                      placeholderTextColor={COLORS.textContenido}
                      value={emailOrUsername}
                      onChangeText={setEmailOrUsername}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      editable={!loading}
                      autoFocus
                    />
                    <View style={styles.iconContainer}>
                      <MaterialIcons
                        name="person"
                        size={wp('8%')}
                        color={COLORS.textContenido}
                      />
                    </View>
                    <Image
                      source={require('../assets/images/banbo-vertical.webp')}
                      style={styles.bambuBorderRight}
                      resizeMode="stretch"
                    />
                  </View>
                  {/* Bambú horizontal inferior */}
                  <Image
                    source={require('../assets/images/banbo-horizontal.webp')}
                    style={styles.bambuBorderBottom}
                    resizeMode="stretch"
                  />
                </View>

                {/* Input con bordes de bambú (completo) */}
                <View style={styles.inputWrapper}>
                  {/* Bambú horizontal superior */}
                  <Image
                    source={require('../assets/images/banbo-horizontal.webp')}
                    style={styles.bambuBorderTop}
                    resizeMode="stretch"
                  />
                  {/* Contenedor horizontal con bambú lateral y input */}
                  <View style={styles.inputContainer}>
                    <Image
                      source={require('../assets/images/banbo-vertical.webp')}
                      style={styles.bambuBorderLeft}
                      resizeMode="stretch"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Contraseña"
                      placeholderTextColor={COLORS.textContenido}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoCapitalize="none"
                      editable={!loading}
                      returnKeyType="done"
                      onSubmitEditing={handleLogin}
                    />
                    <View style={styles.iconContainer}>
                      <MaterialIcons
                        name="lock"
                        size={wp('7%')}
                        color={COLORS.textContenido}
                      />
                    </View>
                    <Image
                      source={require('../assets/images/banbo-vertical.webp')}
                      style={styles.bambuBorderRight}
                      resizeMode="stretch"
                    />
                  </View>
                  {/* Bambú horizontal inferior */}
                  <Image
                    source={require('../assets/images/banbo-horizontal.webp')}
                    style={styles.bambuBorderBottom}
                    resizeMode="stretch"
                  />
                </View>

                {/* Botón Login con imagen de hoja */}
                <TouchableOpacity
                  style={styles.loginButtonContainer}
                  onPress={handleLogin}
                  disabled={!isValid() || loading}
                  activeOpacity={0.8}
                >
                  <ImageBackground
                    source={require('../assets/images/hoja-login.webp')}
                    style={[
                      styles.loginButton,
                      (!isValid() || loading) && styles.buttonDisabled,
                    ]}
                    resizeMode="contain"
                  >
                    {loading ? (
                      <ActivityIndicator color={COLORS.textWhite} size="large" />
                    ) : (
                      <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    )}
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer con opción de registro */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity
                onPress={handleGoToRegister}
                disabled={loading}
                activeOpacity={0.7}
              >
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: hp('4%'),
    paddingHorizontal: wp('8%'),
    paddingBottom: hp('5%'),
    justifyContent: 'center',
    marginTop: hp('10%'),
  },
  monoContainer: {
    width: '100%',
    alignItems: 'center', 
  },
  monoImage: {
    width: wp('40%'),
    height: hp('15%'),
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: '900',
    color: COLORS.textBorde,
    textAlign: 'center',
    marginBottom: hp('1%'),
    textShadowColor: COLORS.textTitle,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  formWrapper: {
    width: '100%',
    maxWidth: wp('90%'),
    alignSelf: 'center',
    padding: wp('2%'),
    borderRadius: wp('4%'),
    borderWidth: 2,
    borderColor: COLORS.formBorderColor,
    backgroundColor: COLORS.badgeWrapperBackground,
  },
  formContainer: {
    width: '100%',
    maxWidth: wp('85%'),
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: wp('4%'),
    borderColor: COLORS.formBorderColor,
    padding: wp('8%'),
    paddingHorizontal: wp('9%'),
    backgroundColor: COLORS.target,
  },
  inputWrapper: {
    marginBottom: hp('4%'),
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('12%'),
  },
  bambuBorderTop: {
    width: wp('64%'),
    height: wp('3%'),
    marginBottom: 0,
    zIndex: 1,
    marginLeft: wp('-2%'),
    marginBottom: hp('-0.5%'),
  },
  bambuBorderBottom: {
    width: wp('64%'),
    height: wp('3%'),
    marginTop: 0,
    zIndex: 1,
    marginLeft: wp('-2%'),
    marginTop: hp('-0.5%'),
  },
  bambuBorderLeft: {
    width: wp('3%'),
    height: hp('10%'),
    marginRight: wp('-1%'),
    zIndex: 2,
  },
  bambuBorderRight: {
    width: wp('3%'),
    height: hp('10%'),
    zIndex: 2,
    marginLeft: wp('-1%'),
  },
  input: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.targetFondo,
    paddingHorizontal: wp('5%'),
    fontSize: wp('4.5%'),
    color: COLORS.textContenido,
    fontWeight: '600',
    includeFontPadding: false,
  },
  iconContainer: {
    height: '100%',
    width: wp('12%'),
    backgroundColor: COLORS.progressBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('-0.5%'),
  },
  loginButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    marginTop: hp('-1%'),
  },
  loginButton: {
    width: '100%',
    height: wp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: wp('20%'),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: COLORS.textWhite,
    fontSize: wp('5%'),
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(29, 66, 15, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    includeFontPadding: false,
  },
  footer: {
    marginTop: hp('1%'),
    alignItems: 'center',
  },
  footerText: {
    fontSize: wp('4%'),
    color: COLORS.textContenido,
    marginBottom: hp('1%'),
  },
  registerLink: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: COLORS.button,
    textDecorationLine: 'underline',
  },
});

export default StudentLoginScreen;
