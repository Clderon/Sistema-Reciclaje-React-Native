import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';

const ModalPuntos = ({ visible, onClose, points = 10, agent = 'Juan P.', material = 'Plástico' }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header con fondo verde */}
          <View style={styles.header}>
            <View style={styles.sunbeams} />
            <Image
              source={require('../assets/images/mono_modal.webp')}
              style={styles.monkeyImage}
              resizeMode="contain"
            />
          </View>

          {/* Contenido */}
          <View style={styles.content}>
            <Text style={styles.title}>¡Reciclaje Enviado!!</Text>
            <Text style={styles.message}>
              Has asignado <Text style={styles.points}>{points} Puntos</Text> al Agente{' '}
              <Text style={styles.agent}>{agent}</Text> por su reciclaje de{' '}
              <Text style={styles.material}>{material}</Text>.
            </Text>

            <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.buttonText}>¡Genial!</Text>
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
    width: wp('90%'),
    maxWidth: wp('95%'),
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
    height: hp('18%'),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  sunbeams: {
    position: 'absolute',
    top: hp('-5%'),
    left: wp('-12%'),
    right: wp('-12%'),
    bottom: hp('-5%'),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: wp('25%'),
  },
  monkeyImage: {
    width: wp('30%'),
    height: wp('30%'),
    zIndex: 1,
  },
  content: {
    padding: wp('7%'),
    alignItems: 'center',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: COLORS.textBorde,
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  message: {
    fontSize: wp('4%'),
    color: COLORS.textContenido,
    textAlign: 'center',
    marginBottom: hp('3%'),
    lineHeight: hp('3%'),
  },
  points: {
    fontWeight: '900',
    color: COLORS.button,
    fontSize: wp('4.5%'),
  },
  agent: {
    fontWeight: '700',
    color: COLORS.textBorde,
  },
  material: {
    fontWeight: '700',
    color: COLORS.button,
  },
  button: {
    backgroundColor: COLORS.button,
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('4%'),
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    minWidth: wp('35%'),
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: wp('4.5%'),
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default ModalPuntos;
