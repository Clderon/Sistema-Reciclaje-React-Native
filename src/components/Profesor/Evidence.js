import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, Text, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';

const Evidence = ({ 
  imageUri, 
  onPress,
  showBadge = true,
  badgeCount = 1,
  size = 'small',
  padding = null,  // Padding personalizado (null = usa valor por defecto del tamaño)
  backgroundColor = null,  // Color de fondo del contenedor (null = transparente)
  borderRadius = null  // BorderRadius personalizado (null = usa valor por defecto del tamaño)
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          containerWidth: wp('15%'),
          containerHeight: wp('15%'),
          borderRadius: wp('3%'),
          padding: wp('0.6%'),
        };
      case 'smallMedium':
        return {
          containerWidth: wp('18.5%'),
          containerHeight: wp('18.5%'),
          borderRadius: wp('3.5%'),
          padding: wp('0.8%'),
        };
      case 'large':
        return {
          containerWidth: wp('25%'),
          containerHeight: wp('25%'),
          borderRadius: wp('5%'),
          padding: wp('0.8%'),
        };
      default: // medium
        return {
          containerWidth: wp('20%'),
          containerHeight: wp('20%'),
          borderRadius: wp('4%'),
          padding: wp('1.2%'),
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const containerPadding = padding !== null ? padding : sizeStyles.padding;
  const containerBorderRadius = borderRadius !== null ? borderRadius : sizeStyles.borderRadius;

  return (
    <Pressable 
      style={[
        styles.container, 
        {
          width: sizeStyles.containerWidth,
          height: sizeStyles.containerHeight,
          borderRadius: containerBorderRadius,
          padding: containerPadding,
          backgroundColor: backgroundColor,
        }
      ]} 
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {/* Imagen de evidencia */}
        {imageUri && imageLoading && !imageError && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={COLORS.button} />
          </View>
        )}
        <Image
          source={
            imageUri && !imageError
              ? { uri: imageUri }
              : require('../../assets/images/profesor/foto.png') // Imagen por defecto
          }
          style={[
            styles.evidenceImage,
            {
              width: sizeStyles.containerWidth - (containerPadding * 2) - 4, // Resta padding y border
              height: sizeStyles.containerHeight - (containerPadding * 2) - 4,
              borderRadius: containerBorderRadius - containerPadding,
            },
            imageError && styles.errorImage
          ]}
          resizeMode="cover"
          onLoadStart={() => {
            setImageLoading(true);
            setImageError(false);
          }}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
            console.error('Error cargando imagen de evidencia:', imageUri);
          }}
        />

        {/* Badge con número de fotos */}
        {showBadge && badgeCount > 1 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>+{badgeCount - 1}</Text>
          </View>
        )}

        {/* Overlay para efecto visual */}
        <View style={[
          styles.overlay,
          {
            borderRadius: containerBorderRadius - containerPadding,
          }
        ]} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: wp('1%'),
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  evidenceImage: {
    width: '100%',
    height: '100%',
  },
  errorImage: {
    opacity: 0.5,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    zIndex: 1,
  },
  badge: {
    position: 'absolute',
    top: -wp('1%'),
    right: -wp('1%'),
    backgroundColor: '#ff6b6b',
    borderRadius: wp('3%'),
    minWidth: wp('6%'),
    height: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: wp('2.5%'),
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default Evidence;