import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import * as ImagePicker from 'expo-image-picker';
import CategorySelector from '../components/common/CategorySelector';
import Counter from '../components/common/Counter';
import Button from '../components/common/Button';
import ModalPuntos from '../components/common/ModalPuntos';
import { CATEGORIES, COLORS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { validateImage, getMimeTypeFromAsset, MAX_IMAGE_SIZE } from '../utils/imageValidation';
import { getUserImageCount, uploadImage } from '../services/uploadService';
import { createRecycling } from '../services/recyclingService';

// Componente para texto con contorno (simula múltiples text-shadows)
const TextWithOutline = ({ children, style, outlineColor = '#fff', outlineWidth = 3 }) => {
  // Extraer propiedades específicas del estilo
  const textColor = style?.color;
  
  // Crear estilo base sin color (el color se aplica por separado)
  const baseStyle = {
    fontSize: style?.fontSize || 35,
    fontWeight: style?.fontWeight || '900',
    letterSpacing: style?.letterSpacing,
    fontStyle: style?.fontStyle,
    lineHeight: style?.lineHeight,
    includeFontPadding: false,
    textAlign: style?.textAlign || 'center',
  };

  // Posiciones para crear el contorno (8 direcciones)
  const offsets = [
    { x: -outlineWidth, y: -outlineWidth }, // -3, -3
    { x: outlineWidth, y: -outlineWidth },  // 3, -3
    { x: -outlineWidth, y: outlineWidth },  // -3, 3
    { x: outlineWidth, y: outlineWidth },   // 3, 3
    { x: -outlineWidth, y: 0 },             // -3, 0
    { x: outlineWidth, y: 0 },              // 3, 0
    { x: 0, y: -outlineWidth },             // 0, -3
    { x: 0, y: outlineWidth },              // 0, 3
  ];

  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      {/* Capas de contorno */}
      {offsets.map((offset, index) => (
        <Text
          key={`outline-${index}`}
          style={[
            baseStyle,
            {
              position: 'absolute',
              color: outlineColor,
              transform: [{ translateX: offset.x }, { translateY: offset.y }],
              width: '100%',
            },
          ]}
        >
          {children}
        </Text>
      ))}
      {/* Texto principal */}
      <Text style={[baseStyle, { color: textColor }]}>
        {children}
      </Text>
    </View>
  );
};

const HomeScreen = () => {
  const { user, updateUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [photosByCategory, setPhotosByCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [assetsByCategory, setAssetsByCategory] = useState({});
  
  const photo = photosByCategory[selectedCategory] || null;
  const asset = assetsByCategory[selectedCategory] || null;
  
  const setPhoto = (uri, assetData = null) => {
    setPhotosByCategory(prev => ({ ...prev, [selectedCategory]: uri }));
    if (assetData) {
      setAssetsByCategory(prev => ({ ...prev, [selectedCategory]: assetData }));
    }
  };

  // Validar si el usuario puede subir más imágenes
  const canUploadMoreImages = async () => {
    if (!user?.id) return false;

    try {
      const { getUserImageCount } = await import('../services/uploadService');
      const result = await getUserImageCount(user.id);
      
      if (result.success) {
        return result.canUpload;
      }
      return true; // Si hay error, permitir intentar (el backend validará)
    } catch (error) {
      console.error('Error verificando límite de imágenes:', error);
      return true; // Si hay error, permitir intentar
    }
  };

  // Validar imagen seleccionada
  const validateSelectedImage = async (asset) => {
    if (!asset) {
      return { valid: false, error: 'No se seleccionó ninguna imagen' };
    }

    // Validar formato
    const mimeType = getMimeTypeFromAsset(asset);
    const validation = validateImage(asset.uri, mimeType, asset.fileSize);

    if (!validation.valid) {
      return validation;
    }

    // Validar tamaño si está disponible
    if (asset.fileSize && asset.fileSize > MAX_IMAGE_SIZE) {
      const maxSizeMB = MAX_IMAGE_SIZE / (1024 * 1024);
      return {
        valid: false,
        error: `La imagen es muy grande. El tamaño máximo permitido es ${maxSizeMB} MB`,
      };
    }

    return { valid: true, error: null };
  };

  const handleScan = async () => {
    // Verificar límite de imágenes antes de permitir seleccionar (solo si hay usuario)
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
                const asset = result.assets[0];
                const validation = await validateSelectedImage(asset);
                
                if (validation.valid) {
                  setPhoto(asset.uri, asset);
                } else {
                  Toast.show(validation.error || 'Imagen no válida', { 
                    duration: Toast.durations.LONG, 
                    position: Toast.positions.BOTTOM, 
                    backgroundColor: '#d9534f' 
                  });
                }
              }
            } catch (error) {
              console.error('Error en cámara:', error);
              Toast.show('Error al abrir la cámara', { 
                duration: Toast.durations.SHORT, 
                position: Toast.positions.BOTTOM, 
                backgroundColor: '#d9534f' 
              });
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
                const asset = result.assets[0];
                const validation = await validateSelectedImage(asset);
                
                if (validation.valid) {
                  setPhoto(asset.uri, asset);
                } else {
                  Toast.show(validation.error || 'Imagen no válida', { 
                    duration: Toast.durations.LONG, 
                    position: Toast.positions.BOTTOM, 
                    backgroundColor: '#d9534f' 
                  });
                }
              }
            } catch (error) {
              console.error('Error en galería:', error);
              Toast.show('Error al abrir la galería', { 
                duration: Toast.durations.SHORT, 
                position: Toast.positions.BOTTOM, 
                backgroundColor: '#d9534f' 
              });
            }
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleSend = async () => {
    if (!user?.id || !photo || quantity <= 0) {
      Toast.show('Completa todos los campos', { 
        duration: Toast.durations.SHORT, 
        position: Toast.positions.BOTTOM, 
        backgroundColor: '#d9534f' 
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Subir imagen a S3
      const uploadResult = await uploadImage(photo, user.id, asset);
      
      if (!uploadResult.success) {
        Alert.alert(
          'Error al subir imagen',
          uploadResult.error || 'No se pudo subir la imagen',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      const imageUrl = uploadResult.imageUrl;
      console.log('✅ URL temporal generada:', imageUrl);

      // 2. Crear registro de reciclaje
      const selectedCategoryData = CATEGORIES.find((cat) => cat.id === selectedCategory);
      
      const recyclingResult = await createRecycling(
        user.id,
        selectedCategory,
        quantity,
        selectedCategoryData.unit,
        imageUrl
      );

      if (!recyclingResult.success) {
        Toast.show(recyclingResult.error || 'Error al registrar reciclaje', { 
          duration: Toast.durations.LONG, 
          position: Toast.positions.BOTTOM, 
          backgroundColor: '#d9534f' 
        });
        setLoading(false);
        return;
      }

      // 3. Actualizar usuario con nuevos puntos y estadísticas
      if (recyclingResult.userStats && user) {
        updateUser({
          ...user,
          totalPoints: recyclingResult.userStats.totalPoints,
          totalRecyclings: recyclingResult.userStats.totalRecyclings,
          currentLevel: recyclingResult.userStats.currentLevel,
        });
      }

      // 4. Guardar puntos ganados y mostrar modal de éxito
      const earnedPoints = recyclingResult.recycling?.pointsEarned || 0;
      setPointsEarned(earnedPoints);
      setModalVisible(true);
      setPhotosByCategory(prev => ({ ...prev, [selectedCategory]: null }));
      setAssetsByCategory(prev => ({ ...prev, [selectedCategory]: null }));
      setQuantity(0);

      Toast.show('¡Reciclaje registrado exitosamente!', { 
        duration: Toast.durations.SHORT, 
        position: Toast.positions.BOTTOM, 
        backgroundColor: '#5cb85c' 
      });

    } catch (error) {
      console.error('Error en handleSend:', error);
      Alert.alert(
        'Error',
        `Error al procesar: ${error.message || 'Error desconocido'}`,
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryData = CATEGORIES.find((cat) => cat.id === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/frame-5.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          decelerationRate="normal"
          bounces={true}
          overScrollMode="always"
          scrollEventThrottle={16}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TextWithOutline 
                style={styles.headerTitle}
                outlineColor={COLORS.textWhite}
                outlineWidth={3}
              >
                Tingo Maria
              </TextWithOutline>
              <TextWithOutline 
                style={styles.headerSubtitle}
                outlineColor={COLORS.textBorde}
                outlineWidth={2}
              >
                A reciclar por la selva!
              </TextWithOutline>
            </View>
          </View>

          {/* Category Selector */}
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={(id) => {
              setSelectedCategory(id);
              setQuantity(0);
            }}
          />

          {/* Card de Registro */}
          <View style={styles.registroCard}>
            <View style={styles.registroHeader}>
              <Text style={styles.registroTitle}>Registro</Text>
            </View>

            <View style={styles.registroContent}>
              {/* Botón de Escanear / Vista previa */}
              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleScan}
                activeOpacity={0.98}
              >
                {photo ? (
                  <>
                    <Image source={{ uri: photo }} style={styles.photoPreview} resizeMode="cover" />
                    <View style={styles.photoOverlay}>
                      <MaterialIcons name="edit" size={24} color="#fff" />
                      <Text style={styles.photoChangeText}>Cambiar foto</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <ImageBackground
                      source={require('../assets/images/fondo-camara.webp')}
                      style={styles.scanBg}
                      resizeMode="cover"
                    />
                    <View style={styles.scanContent}>
                      <MaterialIcons name="camera-alt" size={50} color={COLORS.textContenido} />
                      <View style={styles.scanText}>
                        <Text style={styles.scanLabel}>¡ESCANEAR</Text>
                        <Text style={styles.scanLabel}>EVIDENCIA!</Text>
                      </View>
                    </View>
                  </>
                )}
              </TouchableOpacity>

              {/* Counter */}
              <Counter
                value={quantity}
                onIncrement={() => setQuantity((prev) => Math.min(prev + selectedCategoryData.step, selectedCategoryData.max))}
                onDecrement={() => setQuantity((prev) => Math.max(prev - selectedCategoryData.step, selectedCategoryData.min))}
                min={selectedCategoryData.min}
                max={selectedCategoryData.max}
                unit={selectedCategoryData.unit}
              />

              {/* Send Button */}
              <Button 
                style={styles.sendButton} 
                title={loading ? "Enviando..." : "Enviar Mi Reciclaje"} 
                onPress={handleSend} 
                disabled={!photo || quantity <= 0 || loading} 
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal Puntos */}
      <ModalPuntos
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        points={pointsEarned}
        agent={user?.username || 'Usuario'}
        material={selectedCategoryData?.name || 'Plástico'}
      />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: hp('8%'),
    paddingBottom: hp('15%'),
    width: wp('90%'),
    alignSelf: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    width: '100%',
    maxWidth: wp('95%'),
    minHeight: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: wp('15%'),
  },
  headerTitle: {
    fontSize: wp('9%'),
    fontWeight: '900',
    color: COLORS.textBorde,
    letterSpacing: 1,
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: wp('5%'),
    fontWeight: '700',
    fontStyle: 'italic',
    color: COLORS.textTitle,
    lineHeight: hp('4%'),
    includeFontPadding: false,
  },
  registroCard: {
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    borderRadius: wp('4%'),
    overflow: 'hidden',
    width: '100%',
    maxWidth: wp('85%'),
    marginTop: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  registroHeader: {
    backgroundColor: COLORS.targetFondo,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
  },
  registroTitle: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: COLORS.textContenido,
    includeFontPadding: false,
  },
  registroContent: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    alignItems: 'stretch',
    width: '100%',
    gap: hp('2%'),
  },
  scanButton: {
    width: '100%',
    height: hp('11%'),
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('3%'),
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    overflow: 'hidden',
    marginBottom: hp('2%'),
  },
  scanBg: {
    ...StyleSheet.absoluteFillObject,
  },
  scanContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    zIndex: 1,
  },
  sendButton: {
    width: '100%',
    height: hp('7%'),
  },
  scanText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: wp('8%'),
  },
  scanLabel: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: COLORS.textContenido,
    lineHeight: hp('2.5%'),
    includeFontPadding: false,
  },
  photoPreview: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: wp('2%'),
  },
  photoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('2%'),
  },
  photoChangeText: {
    color: COLORS.textWhite,
    fontSize: wp('4%'),
    fontWeight: '700',
  },
});

export default HomeScreen;
