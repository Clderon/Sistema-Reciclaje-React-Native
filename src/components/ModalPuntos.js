import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

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
    padding: 20,
  },
  modal: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    backgroundColor: '#46a330',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  sunbeams: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 100,
  },
  monkeyImage: {
    width: 120,
    height: 120,
    zIndex: 1,
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textBorde,
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.textContenido,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  points: {
    fontWeight: '900',
    color: COLORS.button,
    fontSize: 18,
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
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    minWidth: 150,
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default ModalPuntos;
