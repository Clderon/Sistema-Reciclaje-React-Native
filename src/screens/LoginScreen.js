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
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';
import AvatarNameCard from '../components/AvatarNameCard';

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
  const handleRoleSelect = (role) => {
    console.log('Rol seleccionado:', role);
    // Aquí iría la lógica de autenticación real
    // Por ahora, simplemente navegamos a la pantalla principal
    if (onLogin) {
      onLogin();
    }
  };

  const handleGoogleLogin = () => {
    console.log('Login con Google');
    // Aquí iría la lógica de autenticación con Google
    // Por ahora, simplemente navegamos a la pantalla principal
    if (onLogin) {
      onLogin();
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
            <TouchableOpacity
              onPress={() => handleRoleSelect('parent')}
              activeOpacity={0.7}
              style={styles.roleButton}
            >
              <AvatarNameCard
                avatarSource={require('../assets/images/avatar.webp')}
                name="Soy Padre/ Madre"
                showBadge={false}
                nameCardBorderWidth={5}
                badgeBorderWidth={5}
                avatarBorderWidth={5}
              />
            </TouchableOpacity>

            {/* Botón Docente */}
            <TouchableOpacity
              onPress={() => handleRoleSelect('teacher')}
              activeOpacity={0.7}
              style={styles.roleButton}
            >
              <AvatarNameCard
                avatarSource={require('../assets/images/avatar.webp')}
                name="Soy Docente"
                showBadge={false}
                nameCardBorderWidth={5}
                badgeBorderWidth={5}
                avatarBorderWidth={5}
              />
            </TouchableOpacity>

            {/* Botón Alumno */}
            <TouchableOpacity
              onPress={() => handleRoleSelect('student')}
              activeOpacity={0.7}
              style={styles.roleButton}
            >
              <AvatarNameCard
                avatarSource={require('../assets/images/avatar.webp')}
                name="Soy Alumno"
                showBadge={false}
                nameCardBorderWidth={5}
                badgeBorderWidth={5}
                avatarBorderWidth={5}
              />
            </TouchableOpacity>
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
    backgroundColor: 'red',
  },
  roleButton: {
    width: '100%',
    alignSelf: 'stretch',
    flex: 1,
    minHeight: 0,
  },
  googleButton: {
    width: '100%',
    maxWidth: wp('90%'),
    backgroundColor: COLORS.target,
    borderRadius: wp('3%'),
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  googleButtonText: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: COLORS.textBorde,
    textAlign: 'center',
    includeFontPadding: false,
  },
  forgotPasswordContainer: {
    marginTop: hp('2%'),
  },
  forgotPasswordText: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    color: COLORS.buttonDegradado,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    includeFontPadding: false,
  },
});

export default LoginScreen;

