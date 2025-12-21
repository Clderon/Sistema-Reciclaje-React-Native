import React, { useState } from 'react';
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

const StudentRegisterScreen = ({ navigation }) => {
  const { registerStudent } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    try {
      const result = await registerStudent(
        username.trim(),
        email.trim(),
        password.trim()
      );
      
      if (result.success) {
        // El AuthContext maneja el cambio de estado y App.js redirige automáticamente
      } else {
        Alert.alert(
          'Error',
          result.error || 'No se pudo registrar. Intenta de nuevo.'
        );
      }
    } catch (error) {
      console.error('Error en registro:', error);
      Alert.alert(
        'Error de conexión',
        'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate('StudentLogin');
  };

  const isValid = () => {
    return (
      username.trim().length > 0 &&
      email.trim().length > 0 &&
      email.includes('@') &&
      password.trim().length >= 6 &&
      password === confirmPassword
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
              <Text style={styles.title}>Crear Cuenta en la Selva</Text>
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
                    placeholder="Usuario"
                    placeholderTextColor={COLORS.textContenido}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
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
                    placeholder="Email"
                    placeholderTextColor={COLORS.textContenido}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                  />
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="email"
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
                    placeholder="Confirmar contraseña"
                    placeholderTextColor={COLORS.textContenido}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    editable={!loading}
                    returnKeyType="done"
                    onSubmitEditing={handleRegister}
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

              {password !== confirmPassword && confirmPassword.length > 0 && (
                <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
              )}

              {/* Botón Register con imagen de hoja */}
              <TouchableOpacity
                style={styles.registerButtonContainer}
                onPress={handleRegister}
                disabled={!isValid() || loading}
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={require('../assets/images/hoja-login.webp')}
                  style={[
                    styles.registerButton,
                    (!isValid() || loading) && styles.buttonDisabled,
                  ]}
                  resizeMode="contain"
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.textWhite} size="large" />
                  ) : (
                    <Text style={styles.registerButtonText}>Registrarse</Text>
                  )}
                </ImageBackground>
              </TouchableOpacity>
              </View>
            </View>

            {/* Footer con opción de login */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity
                onPress={handleGoToLogin}
                disabled={loading}
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>Inicia sesión aquí</Text>
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
    paddingTop: hp('8%'),
    paddingHorizontal: wp('8%'),
    paddingBottom: hp('5%'),
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: hp('1.5%'),
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
    paddingHorizontal: wp('8%'),
    paddingVertical: wp('4%'),
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
    width: wp('68%'),
    height: wp('3%'),
    marginBottom: 0,
    zIndex: 1,
    marginLeft: wp('-2.5%'),
    marginBottom: hp('-0.5%'),
  },
  bambuBorderBottom: {
    width: wp('68%'),
    height: wp('3%'),
    marginTop: 0,
    zIndex: 1,
    marginLeft: wp('-2.5%'),
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
    fontSize: wp('3.5%'),
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
  errorText: {
    color: '#d9534f',
    fontSize: wp('3.5%'),
    marginBottom: hp('1%'),
    paddingLeft: wp('1%'),
  },
  registerButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    width: '100%',
    height: wp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: wp('20%'),
    marginTop: hp('-1.5%'),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
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
  loginLink: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: COLORS.button,
    textDecorationLine: 'underline',
  },
});

export default StudentRegisterScreen;

