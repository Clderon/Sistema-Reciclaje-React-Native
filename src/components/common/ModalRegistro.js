import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';

const ModalRegistro = ({ visible, onClose, onConfirm, loading = false }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Resetear campos cuando el modal se cierra
  useEffect(() => {
    if (!visible) {
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [visible]);

  const handleConfirm = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    onConfirm({
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    });
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
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Crear Cuenta</Text>
              <Text style={styles.headerSubtitle}>Registro de Alumno</Text>
            </View>

            {/* Contenido */}
            <View style={styles.content}>
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

              <TextInput
                style={styles.input}
                placeholder="Contraseña (mín. 6 caracteres)"
                placeholderTextColor={COLORS.textContenido}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
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
              />

              {password !== confirmPassword && confirmPassword.length > 0 && (
                <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
              )}

              {/* Botones */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCancel]}
                  onPress={onClose}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonCancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonConfirm,
                    (!isValid() || loading) && styles.buttonDisabled,
                  ]}
                  onPress={handleConfirm}
                  disabled={!isValid() || loading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonConfirmText}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  modal: {
    width: wp('85%'),
    maxWidth: wp('90%'),
    backgroundColor: COLORS.target,
    borderRadius: wp('5%'),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: hp('90%'),
  },
  header: {
    backgroundColor: COLORS.button,
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.textBorde,
  },
  headerTitle: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: COLORS.textWhite,
    marginBottom: hp('0.5%'),
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.textWhite,
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    padding: wp('7%'),
  },
  input: {
    width: '100%',
    height: wp('12%'),
    backgroundColor: '#EDDEBF',
    borderRadius: wp('3%'),
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    paddingHorizontal: wp('4%'),
    fontSize: wp('4.5%'),
    color: COLORS.textContenido,
    fontWeight: '600',
    marginBottom: hp('2%'),
    includeFontPadding: false,
  },
  errorText: {
    color: '#d9534f',
    fontSize: wp('3.5%'),
    marginBottom: hp('1%'),
    marginTop: hp('-1%'),
    paddingLeft: wp('1%'),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp('3%'),
    marginTop: hp('1%'),
  },
  button: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('4%'),
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: wp('12%'),
  },
  buttonCancel: {
    backgroundColor: COLORS.target,
    borderColor: COLORS.textBorde,
  },
  buttonConfirm: {
    backgroundColor: COLORS.button,
    borderColor: COLORS.textBorde,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonCancelText: {
    color: COLORS.textBorde,
    fontSize: wp('4.5%'),
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonConfirmText: {
    color: COLORS.textWhite,
    fontSize: wp('4.5%'),
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default ModalRegistro;

