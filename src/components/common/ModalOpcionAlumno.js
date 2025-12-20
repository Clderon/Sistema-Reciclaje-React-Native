import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';

const ModalOpcionAlumno = ({ visible, onClose, onNuevo, onYaTieneCuenta }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Soy Alumno</Text>
            <Text style={styles.headerSubtitle}>¿Ya tienes cuenta?</Text>
          </View>

          {/* Contenido */}
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.button}
              onPress={onYaTieneCuenta}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Sí, ya tengo cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={onNuevo}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonTextPrimary}>No, soy nuevo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  },
  header: {
    backgroundColor: COLORS.button,
    paddingVertical: hp('3%'),
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
    gap: hp('2%'),
  },
  button: {
    backgroundColor: COLORS.targetFondo,
    paddingVertical: hp('2%'),
    borderRadius: wp('4%'),
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: COLORS.button,
    borderColor: COLORS.textBorde,
  },
  buttonText: {
    color: COLORS.textContenido,
    fontSize: wp('4.5%'),
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonTextPrimary: {
    color: COLORS.textWhite,
    fontSize: wp('4.5%'),
    fontWeight: '900',
    textAlign: 'center',
  },
  buttonCancel: {
    marginTop: hp('1%'),
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
  },
  buttonCancelText: {
    color: COLORS.textContenido,
    fontSize: wp('4%'),
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ModalOpcionAlumno;

