import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';
import CategorySingle from '../CategorySingle';
import Evidence from './Evidence';
import GivePointsButton from './GivePointsButton';
import ReviewButton from './ReviewButton';
import ImageViewerModal from './modals/ImageViewerModal';
import { playPopSound } from '../../utils/soundHelper';

const CardRevision = ({ 
  agentName, 
  category, 
  quantity, 
  onGivePoints, 
  onReview, 
  onCategoryChange, // No se usa para filtrar, solo para compatibilidad
  evidenceImage = null,
  evidenceCount = 1,
  requestId = null
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  // Animación del botón "Genial"
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleReview = () => {
    if (evidenceImage) {
      setShowImageModal(true);
    }
    if (onReview) {
      onReview();
    }
  };

  const handleGivePoints = () => {
    // Animación del botón al presionar
    playPopSound({ volume: 0.3 });
    
    // Animación de escala del botón
    Animated.sequence([
      Animated.spring(buttonScale, {
        toValue: 0.9,
        tension: 300,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        tension: 300,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    if (onGivePoints && requestId) {
      // Aprobar con puntos calculados automáticamente (null = backend calcula)
      // Delay slightly to allow button animation to be visible
      setTimeout(() => {
        onGivePoints(null);
      }, 150);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Header con nombre del agente */}
      <View style={styles.headerContainer}>
        <Text style={styles.agentNameText}>{agentName}</Text>
      </View>
      <ImageViewerModal
        visible={showImageModal}
        imageUri={evidenceImage}
        onClose={() => setShowImageModal(false)}
      />

      {/* Botón dar puntos (posición absoluta) */}
      <View style={styles.pointsButtonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <GivePointsButton 
             onPress={handleGivePoints} 
          />
        </Animated.View>
      </View>

      {/* Contenedor de imagen y categoría */}
      <View style={styles.contentRow}>
        <Evidence 
          imageUri={evidenceImage}
          onPress={handleReview}
          badgeCount={evidenceCount}
          size="smallMedium"
          style={styles.evidenceImageContainer}
          padding={2}
          backgroundColor={COLORS.targetFondo}
          borderRadius={wp('2.5%')}
        />
        
        <CategorySingle 
          selectedCategory={category}
          size="smallMedium"
          showClickable={false}
          style={styles.categoryContainer}
          showDecoration={false}
          borderRadius={wp('2.5%')}
          labelMarginTop={hp('0.1%')}
          paddingBottom={hp('0.3%')}
          borderWidth={2}
        />
      </View>

      {/* Footer: Cantidad y botón revisar */}
      <View style={styles.footerContainer}>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>Cantidad: {quantity}</Text>
        </View>
        <ReviewButton 
          onPress={handleReview}
          text="Revisar"
          icon="?"
          style={styles.reviewButtonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Contenedor principal de la tarjeta
  cardContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.textBorde || '#513015',
    borderRadius: wp('2.5%'),
    flexDirection: 'column',
    flex: 1,
    minHeight: hp('15%'),
    overflow: 'hidden',
    paddingBottom: hp('1.2%'),
    position: 'relative',
    width: wp('75%'),
    marginHorizontal: wp('2.5%'),
    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: hp('0.5%'),
  },

  // Header con nombre del agente
  headerContainer: {
    backgroundColor: COLORS.targetFondo,
    borderTopLeftRadius: wp('2.5%'),
    borderTopRightRadius: wp('2.5%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    width: '100%',
    position: 'relative',
    paddingLeft: wp('3%'),
  },

  // Texto del nombre del agente
  agentNameText: {
    color: COLORS.textContenido,
    fontSize: wp('6%'),
    fontWeight: '700',
    textAlign: 'left',
    flex: 1,
  },

  // Fila de contenido: imagen y categoría
  contentRow: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1%'),
    gap: wp('1%'),
  },

  // Contenedor de la imagen de evidencia
  evidenceImageContainer: {
  },

  // Contenedor de la categoría
  categoryContainer: {
    height: hp('10%'),
    width: wp('24%'),
  },
    
  // Footer: cantidad y botón revisar
  footerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1%'),
    borderTopColor: COLORS.textBorde + '20',
    gap: wp('3%'),
  },

  // Contenedor de la cantidad
  quantityContainer: {
    flex: 1,
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
  },

  // Texto de la cantidad
  quantityText: {
    color: COLORS.textContenido,
    fontSize: wp('4%'),
    fontWeight: '700',
  },

  // Contenedor del botón de puntos (posición absoluta)
  pointsButtonContainer: {
    position: 'absolute',
    top: hp('0.5%'),
    right: wp('2%'),
    zIndex: 10,
  },

  // Contenedor del botón revisar
  reviewButtonContainer: {
    // ReviewButton manejará su propio tamaño
  },
});

export default CardRevision;