import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
  const [quantity, setQuantity] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);

  const handleScan = () => {
    console.log('Scan evidence');
  };

  const handleSend = () => {
    setModalVisible(true);
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
            onSelectCategory={setSelectedCategory}
          />

          {/* Card de Registro */}
          <View style={styles.registroCard}>
            <View style={styles.registroHeader}>
              <Text style={styles.registroTitle}>Registro</Text>
            </View>

            <View style={styles.registroContent}>
              {/* Botón de Escanear */}
              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleScan}
                activeOpacity={0.98}
              >
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
              </TouchableOpacity>

              {/* Counter */}
              <Counter
                value={quantity}
                onIncrement={() => setQuantity((prev) => Math.min(prev + 1, 99))}
                onDecrement={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              />

              {/* Send Button */}
              <Button style={styles.sendButton} title="Enviar Mi Reciclaje" onPress={handleSend} variant="primary" />
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
    paddingTop: 70,
    paddingBottom: 120,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    width: '100%',
    maxWidth: 375,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 10,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#1d420f',
    letterSpacing: 1,
    marginBottom: 3,
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    color: '#f3d645',
    lineHeight: 31.2,
    includeFontPadding: false,
  },
  registroCard: {
    backgroundColor: '#f8f7e3',
    borderWidth: 3,
    borderColor: '#1d420f',
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 335,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  registroHeader: {
    backgroundColor: '#eedfc0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  registroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#513015',
    includeFontPadding: false,
  },
  registroContent: {
    paddingVertical:20,
    paddingHorizontal:35,
    alignItems: 'stretch',
    gap: 15,
    width: '100%',
  },
  scanButton: {
    width: '100%',
    height: 90,
    backgroundColor: '#eedfc0',
    borderRadius: 12,
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
    gap: 35,
    paddingHorizontal: 15,
    paddingVertical: 12,
    zIndex: 1,
  },
  sendButton: {
    width: '100%',
    height: 60,
  },
  scanText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  scanLabel: {
    fontSize: 20,
    fontWeight: '900',
    color: '#513015',
    lineHeight: 19.2,
    includeFontPadding: false,
  },
});

export default HomeScreen;
