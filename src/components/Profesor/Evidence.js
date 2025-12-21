import React from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';

const Evidence = ({ 
  imageUri, 
  onPress,
  showBadge = true,
  badgeCount = 1,
  size = 'small' // 'small', 'medium', 'large'
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: wp('15%'),
          height: wp('15%'),
          borderRadius: wp('3%'),
        };
      case 'large':
        return {
          width: wp('25%'),
          height: wp('25%'),
          borderRadius: wp('5%'),
        };
      default: // medium
        return {
          width: wp('20%'),
          height: wp('20%'),
          borderRadius: wp('4%'),
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Pressable 
      style={[styles.container, sizeStyles]} 
      onPress={onPress}
    >
      {/* Imagen de evidencia */}
      <Image
        source={
          imageUri 
            ? { uri: imageUri }
            : require('../../assets/images/profesor/foto.png') // Imagen por defecto
        }
        style={[styles.evidenceImage, sizeStyles]}
        resizeMode="cover"
      />

      {/* Badge con número de fotos */}
      {showBadge && badgeCount > 1 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>+{badgeCount - 1}</Text>
        </View>
      )}

      {/* Overlay para efecto visual */}
      <View style={styles.overlay} />
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
  },
  evidenceImage: {
    // Tamaño dinámico aplicado inline
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
    borderRadius: wp('4%'),
  },
});

export default Evidence;