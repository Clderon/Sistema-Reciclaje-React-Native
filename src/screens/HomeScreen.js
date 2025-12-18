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
import * as ImagePicker from 'expo-image-picker';
import CategorySelector from '../components/CategorySelector';
import Counter from '../components/Counter';
import Button from '../components/Button';
import ModalPuntos from '../components/ModalPuntos';
import { CATEGORIES } from '../utils/constants';

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
      <Text style={[baseStyle, { color: textColor, position: 'relative' }]}>
        {children}
      </Text>
    </View>
  );
};

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [photosByCategory, setPhotosByCategory] = useState({});
  
  const photo = photosByCategory[selectedCategory] || null;
  
  const setPhoto = (uri) => {
    setPhotosByCategory(prev => ({ ...prev, [selectedCategory]: uri }));
  };

  const handleScan = async () => {
    Alert.alert(
      'Escanear Evidencia',
      '¿Cómo deseas agregar la imagen?',
      [
        {
          text: 'Cámara',
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.8,
            });
            if (!result.canceled) {
              setPhoto(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Galería',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería');
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.8,
            });
            if (!result.canceled) {
              setPhoto(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleSend = () => {
    setModalVisible(true);
    setPhotosByCategory(prev => ({ ...prev, [selectedCategory]: null }));
    setQuantity(0);
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
          decelerationRate={0.75}
          bounces={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TextWithOutline 
                style={styles.headerTitle}
                outlineColor="#fff"
                outlineWidth={3}
              >
                Tingo Maria
              </TextWithOutline>
              <TextWithOutline 
                style={styles.headerSubtitle}
                outlineColor="#1d420f"
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
                      <MaterialIcons name="camera-alt" size={50} color="#513015" />
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
              <Button style={styles.sendButton} title="Enviar Mi Reciclaje" onPress={handleSend} disabled={!photo || quantity <= 0} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal Puntos */}
      <ModalPuntos
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        points={10}
        agent="Juan P."
        material={selectedCategoryData?.name || 'Plástico'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a7c3f',
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
    position: 'relative',
    paddingVertical: hp('1%'),
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: wp('15%'),
  },
  headerTitle: {
    fontSize: wp('9%'),
    fontWeight: '900',
    color: '#1d420f',
    letterSpacing: 1,
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: wp('5%'),
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#f3d645',
    lineHeight: hp('4%'),
    includeFontPadding: false,
  },
  registroCard: {
    backgroundColor: '#f8f7e3',
    borderWidth: 3,
    borderColor: '#1d420f',
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
    backgroundColor: '#eedfc0',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
  },
  registroTitle: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: '#513015',
    includeFontPadding: false,
  },
  registroContent: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    alignItems: 'stretch',
    gap: hp('2%'),
    width: '100%',
  },
  scanButton: {
    width: '100%',
    height: hp('11%'),
    backgroundColor: '#eedfc0',
    borderRadius: wp('3%'),
    borderWidth: 3,
    borderColor: '#1d420f',
    overflow: 'hidden',
    position: 'relative',
  },
  scanBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  scanContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp('8%'),
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
  },
  scanLabel: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: '#513015',
    lineHeight: hp('2.5%'),
    includeFontPadding: false,
  },
  photoPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: wp('2%'),
  },
  photoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: wp('2%'),
  },
  photoChangeText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '700',
  },
});

export default HomeScreen;
