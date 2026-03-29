import { useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import { CATEGORIES } from '../utils/constants';
import { validateImage, getMimeTypeFromAsset, MAX_IMAGE_SIZE } from '../utils/imageValidation';
import { getUserImageCount, uploadImage } from '../services/uploadService';
import { createRequest } from '../services/requestService';

export function useRecycling(user, selectedCategory, quantity) {
  const [photosByCategory, setPhotosByCategory] = useState({});
  const [assetsByCategory, setAssetsByCategory] = useState({});
  const [loading, setLoading] = useState(false);

  const photo = photosByCategory[selectedCategory] || null;
  const asset = assetsByCategory[selectedCategory] || null;

  const setPhoto = (uri, assetData = null) => {
    setPhotosByCategory(prev => ({ ...prev, [selectedCategory]: uri }));
    if (assetData) {
      setAssetsByCategory(prev => ({ ...prev, [selectedCategory]: assetData }));
    }
  };

  const clearPhoto = () => {
    setPhotosByCategory(prev => ({ ...prev, [selectedCategory]: null }));
    setAssetsByCategory(prev => ({ ...prev, [selectedCategory]: null }));
  };

  const canUploadMoreImages = async () => {
    if (!user?.id) return false;

    try {
      const result = await getUserImageCount(user.id);
      if (result.success) {
        return result.canUpload;
      }
      return true;
    } catch (error) {
      console.error('Error verificando límite de imágenes:', error);
      return true;
    }
  };

  const validateSelectedImage = async (imageAsset) => {
    if (!imageAsset) {
      return { valid: false, error: 'No se seleccionó ninguna imagen' };
    }

    const mimeType = getMimeTypeFromAsset(imageAsset);
    const validation = validateImage(imageAsset.uri, mimeType, imageAsset.fileSize);

    if (!validation.valid) {
      return validation;
    }

    if (imageAsset.fileSize && imageAsset.fileSize > MAX_IMAGE_SIZE) {
      const maxSizeMB = MAX_IMAGE_SIZE / (1024 * 1024);
      return {
        valid: false,
        error: `La imagen es muy grande. El tamaño máximo permitido es ${maxSizeMB} MB`,
      };
    }

    return { valid: true, error: null };
  };

  const handleScan = async () => {
    if (user?.id) {
      const canUpload = await canUploadMoreImages();

      if (!canUpload) {
        Alert.alert(
          'Límite alcanzado',
          'Has alcanzado el límite de 5 imágenes. Elimina algunas imágenes antes de subir nuevas.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    Alert.alert(
      'Escanear Evidencia',
      '¿Cómo deseas agregar la imagen?',
      [
        {
          text: 'Cámara',
          onPress: async () => {
            try {
              const { status } = await ImagePicker.requestCameraPermissionsAsync();

              if (status !== 'granted') {
                Toast.show('Necesitamos acceso a la cámara', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, backgroundColor: '#d9534f' });
                return;
              }

              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
              });

              if (!result.canceled && result.assets && result.assets[0]) {
                const picked = result.assets[0];
                const validation = await validateSelectedImage(picked);

                if (validation.valid) {
                  setPhoto(picked.uri, picked);
                } else {
                  Toast.show(validation.error || 'Imagen no válida', { duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, backgroundColor: '#d9534f' });
                }
              }
            } catch (error) {
              console.error('Error en cámara:', error);
              Toast.show('Error al abrir la cámara', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, backgroundColor: '#d9534f' });
            }
          },
        },
        {
          text: 'Galería',
          onPress: async () => {
            try {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

              if (status !== 'granted') {
                Toast.show('Necesitamos acceso a la galería', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, backgroundColor: '#d9534f' });
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
              });

              if (!result.canceled && result.assets && result.assets[0]) {
                const picked = result.assets[0];
                const validation = await validateSelectedImage(picked);

                if (validation.valid) {
                  setPhoto(picked.uri, picked);
                } else {
                  Toast.show(validation.error || 'Imagen no válida', { duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, backgroundColor: '#d9534f' });
                }
              }
            } catch (error) {
              console.error('Error en galería:', error);
              Toast.show('Error al abrir la galería', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, backgroundColor: '#d9534f' });
            }
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleSend = async (onSuccess) => {
    if (!user?.id || !photo || quantity <= 0) {
      Toast.show('Completa todos los campos', { duration: Toast.durations.SHORT, position: Toast.positions.BOTTOM, backgroundColor: '#d9534f' });
      return;
    }

    setLoading(true);

    try {
      const uploadResult = await uploadImage(photo, user.id, asset);

      if (!uploadResult.success) {
        Alert.alert('Error al subir imagen', uploadResult.error || 'No se pudo subir la imagen', [{ text: 'OK' }]);
        setLoading(false);
        return;
      }

      const imageUrl = uploadResult.imageUrl;
      const selectedCategoryData = CATEGORIES.find((cat) => cat.id === selectedCategory);

      const requestResult = await createRequest(
        user.id,
        selectedCategory,
        quantity,
        selectedCategoryData.unit,
        imageUrl
      );

      if (!requestResult.success) {
        Toast.show(requestResult.error || 'Error al enviar petición', { duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, backgroundColor: '#d9534f' });
        setLoading(false);
        return;
      }

      clearPhoto();

      Toast.show('¡Petición enviada! El docente revisará tu reciclaje.', { duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, backgroundColor: '#5cb85c' });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error en handleSend:', error);
      Alert.alert('Error', `Error al procesar: ${error.message || 'Error desconocido'}`, [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  return {
    photo,
    asset,
    loading,
    handleScan,
    handleSend,
  };
}
