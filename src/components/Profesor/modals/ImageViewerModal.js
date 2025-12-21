import React, { useState } from 'react';
import { Modal, View, Image, StyleSheet, Pressable, Text, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../utils/constants';
import { MaterialIcons } from '@expo/vector-icons';

const ImageViewerModal = ({ visible, imageUri, onClose }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

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
          {imageLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.textWhite} />
              <Text style={styles.loadingText}>Cargando imagen...</Text>
            </View>
          )}
          {imageError && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={wp('15%')} color={COLORS.textWhite} />
              <Text style={styles.errorText}>Error al cargar la imagen</Text>
              <Text style={styles.errorSubtext}>Verifica tu conexión</Text>
            </View>
          )}
          <Image
            source={{ uri: imageUri }}
            style={[styles.fullImage, (imageLoading || imageError) && styles.hiddenImage]}
            resizeMode="contain"
            onLoadStart={() => {
              setImageLoading(true);
              setImageError(false);
            }}
            onLoadEnd={() => setImageLoading(false)}
            onError={(error) => {
              setImageLoading(false);
              setImageError(true);
              console.error('Error cargando imagen en modal:', imageUri, error);
            }}
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
  hiddenImage: {
    opacity: 0,
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  loadingText: {
    marginTop: hp('2%'),
    color: COLORS.textWhite,
    fontSize: wp('4%'),
  },
  errorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  errorText: {
    marginTop: hp('2%'),
    color: COLORS.textWhite,
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  errorSubtext: {
    marginTop: hp('1%'),
    color: COLORS.textWhite,
    fontSize: wp('4%'),
    opacity: 0.7,
  },
});

export default ImageViewerModal;

