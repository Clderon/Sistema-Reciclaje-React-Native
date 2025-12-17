import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import CategorySelector from '../components/CategorySelector';
import Counter from '../components/Counter';
import Button from '../components/Button';
import ModalPuntos from '../components/ModalPuntos';
import { COLORS, CATEGORIES } from '../utils/constants';

// Componente simple de ícono de cámara
const CameraIcon = ({ size = 40, color = COLORS.textContenido }) => (
  <View style={[styles.cameraIcon, { width: size, height: size * 0.75 }]}>
    <View style={[styles.cameraBody, { borderColor: color, borderWidth: 2 }]} />
    <View style={[styles.cameraLens, { borderColor: color, borderWidth: 2 }]} />
  </View>
);

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [quantity, setQuantity] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);

  const handleScan = () => {
    // TODO: Implement camera/scanner functionality
    console.log('Scan evidence');
  };

  const handleSend = () => {
    // TODO: Implement send recycling logic
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
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Tingo Maria</Text>
              <Text style={styles.headerSubtitle}>A reciclar por la selva!</Text>
            </View>
          </View>

          {/* Category Selector */}
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Registration Card */}
          <View style={styles.registroCard}>
            <View style={styles.registroHeader}>
              <Text style={styles.registroTitle}>Registro</Text>
            </View>

            <View style={styles.registroContent}>
              {/* Scan Button */}
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
                  <View style={styles.scanIcon}>
                    <CameraIcon size={40} color={COLORS.textContenido} />
                  </View>
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
              <Button title="Enviar Mi Reciclaje" onPress={handleSend} variant="primary" />
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
    backgroundColor: COLORS.fondoFallback,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 120,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
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
    color: COLORS.textBorde,
    letterSpacing: 1,
    marginBottom: 3,
    textShadowColor: '#fff',
    textShadowOffset: { width: -3, height: -3 },
    textShadowRadius: 0,
    includeFontPadding: false,
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: '700',
    fontStyle: 'italic',
    color: COLORS.textTitle,
    lineHeight: 31.2,
    textShadowColor: COLORS.textBorde,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
    includeFontPadding: false,
  },
  registroCard: {
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
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
    backgroundColor: COLORS.targetFondo,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  registroTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textContenido,
    includeFontPadding: false,
  },
  registroContent: {
    padding: 15,
    alignItems: 'center',
    gap: 15,
  },
  scanButton: {
    width: '100%',
    height: 90,
    backgroundColor: COLORS.targetFondo,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
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
    gap: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    zIndex: 1,
  },
  scanIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  scanLabel: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.textContenido,
    lineHeight: 19.2,
    includeFontPadding: false,
  },
  cameraIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraBody: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cameraLens: {
    width: '45%',
    height: '45%',
    borderRadius: 20,
    position: 'absolute',
    top: '27.5%',
    left: '27.5%',
  },
});

export default HomeScreen;
