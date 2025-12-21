import React from 'react';
import { Modal, View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';

const ImageViewerModal = ({ visible, imageUri, onClose }) => {
  if (!visible || !imageUri) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Botón cerrar */}
        <Pressable style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={wp('8%')} color={COLORS.textWhite} />
        </Pressable>

        {/* Imagen expandida */}
        <Pressable style={styles.imageContainer} onPress={onClose} activeOpacity={1}>
          <Image
            source={{ uri: imageUri }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: hp('5%'),
    right: wp('5%'),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: wp('6%'),
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.textWhite,
    zIndex: 1000,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});

export default ImageViewerModal;

