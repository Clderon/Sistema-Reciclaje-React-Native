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
import { COLORS } from '../../utils/constants';

const ModalBadge = ({ visible, onClose, badge }) => {
  if (!badge) return null;

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
            <Text style={styles.headerTitle}>Detalle de Insignia</Text>
          </View>

          {/* Contenido */}
          <View style={styles.content}>
            {/* Badge */}
            <View style={styles.badgeContainer}>
              <View style={[styles.badgeWrapper, { backgroundColor: COLORS.badgeWrapperBackground }]}>
                <View style={[styles.badgeInner, { backgroundColor: badge.backgroundColor || COLORS.badgeBackground }]}>
                  <Image
                    source={badge.imageSource}
                    style={styles.badgeImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>

            {/* Título y descripción */}
            <Text style={styles.title}>{badge.title}</Text>
            <Text style={styles.description}>{badge.description}</Text>

            {/* Botón */}
            <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.buttonText}>Cerrar</Text>
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
    borderWidth: 3,
    borderColor: COLORS.textContenido,
    overflow: 'hidden',
    shadowColor: COLORS.textBorde,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    borderTopLeftRadius: wp('2.5%'),
    borderTopRightRadius: wp('2.5%'),
    height: hp('5%'),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: wp('5%'),
    fontWeight: '700',
    includeFontPadding: false,
  },
  content: {
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('3%'),
    alignItems: 'center',
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  badgeWrapper: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('50%'),
    borderWidth: 1,
    padding: wp('2%'),
    overflow: 'hidden',
  },
  badgeInner: {
    width: '100%',
    height: '100%',
    borderRadius: wp('50%'),
    borderWidth: 1,
    overflow: 'hidden',
  },
  badgeImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('50%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: COLORS.textContenido,
    marginBottom: hp('1.5%'),
    textAlign: 'center',
    includeFontPadding: false,
  },
  description: {
    fontSize: wp('4%'),
    color: COLORS.textContenido,
    textAlign: 'center',
    marginBottom: hp('3%'),
    lineHeight: hp('2.5%'),
    includeFontPadding: false,
  },
  button: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textContenido,
    fontWeight: '700',
    fontSize: wp('5%'),
    includeFontPadding: false,
  },
});

export default ModalBadge;

