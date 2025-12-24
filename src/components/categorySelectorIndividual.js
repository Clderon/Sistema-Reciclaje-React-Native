import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';

const CategoryItem = ({ 
  category, 
  index = 0, 
  isActive = false, 
  onSelect, 
  color = '#3299e3',
  size = 'medium', // 'small', 'smallMedium', 'medium', 'large'
  showDecoration = true,  // Por defecto muestra la decoración
  borderRadius = wp('4%'),  // Por defecto usa el valor definido en los estilos
  borderWidth = null,  // Ancho del borde (null = usa valor por defecto: 2 normal, 3 activo)
  iconMarginBottom = null,  // Separación entre icono y texto (null = usa valor por defecto del tamaño)
  labelMarginTop = null,  // Margen superior del texto (null = usa valor por defecto del tamaño)
  paddingBottom = null,  // Padding inferior del contenido (null = usa valor por defecto del tamaño)
  paddingHorizontal = null  // Padding horizontal del contenido (null = usa valor por defecto del tamaño)
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const activeScale = useRef(new Animated.Value(isActive ? 1.05 : 1)).current;

  useEffect(() => {
    if (isActive) {
      Animated.sequence([
        Animated.spring(activeScale, { toValue: 1.02, useNativeDriver: true, speed: 50 }),
        Animated.spring(activeScale, { toValue: 1.01, useNativeDriver: true, speed: 50 }),
      ]).start();
    } else {
      Animated.spring(activeScale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
    }
  }, [isActive]);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: wp('15%'),
          height: wp('15%'),
          iconSize: wp('8%'),
          fontSize: wp('2.5%'),
          paddingBottom: hp('0.8%'),
          iconMarginBottom: hp('0.2%'),
          labelMarginTop: hp('0.3%'),
          paddingHorizontal: wp('0.8%'),
        };
      case 'smallMedium':
        return {
          width: wp('18.5%'),
          height: wp('18.5%'),
          iconSize: wp('9.5%'),
          fontSize: wp('2.5%'),
          paddingBottom: hp('1%'),
          iconMarginBottom: hp('0.3%'),
          labelMarginTop: hp('0.4%'),
          paddingHorizontal: wp('1%'),
        };
      case 'large':
        return {
          width: wp('28%'),
          height: wp('28%'),
          iconSize: wp('16%'),
          fontSize: wp('3.5%'),
          paddingBottom: hp('1.5%'),
          iconMarginBottom: hp('0.5%'),
          labelMarginTop: hp('0.7%'),
          paddingHorizontal: wp('1.5%'),
        };
      default: // medium
        return {
          width: wp('22%'),
          height: wp('22%'),
          iconSize: wp('11%'),
          fontSize: wp('3%'),
          paddingBottom: hp('1.2%'),
          iconMarginBottom: hp('0.4%'),
          labelMarginTop: hp('0.5%'),
          paddingHorizontal: wp('1.2%'),
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <Pressable onPress={onSelect} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.category,
          {
            backgroundColor: color,
            borderWidth: borderWidth !== null ? borderWidth : (isActive ? 3 : 2),
            borderRadius: borderRadius,
            transform: [{ scale: Animated.multiply(scale, activeScale) }],
            width: sizeStyles.width,
            height: sizeStyles.height,
          },
          isActive && styles.categoryActive,
        ]}
        >
        {showDecoration && (
          <ImageBackground
            source={require('../assets/images/fondo-item-hd.webp')}
            style={styles.categoryBg}
            resizeMode="contain"
          />
        )}
        
        <View style={[styles.categoryContent, {
          paddingBottom: paddingBottom !== null ? paddingBottom : sizeStyles.paddingBottom,
          paddingHorizontal: paddingHorizontal !== null ? paddingHorizontal : sizeStyles.paddingHorizontal,
        }]}>
          <View style={[styles.categoryIcon, { 
            width: sizeStyles.iconSize, 
            height: sizeStyles.iconSize,
            marginBottom: iconMarginBottom !== null ? iconMarginBottom : sizeStyles.iconMarginBottom,
          }]}>
            <Image
              source={category.icon}
              style={[styles.categoryImg, {
                width: sizeStyles.iconSize,
                height: sizeStyles.iconSize,
              }]}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.categoryLabel, { 
            fontSize: sizeStyles.fontSize,
            marginTop: labelMarginTop !== null ? labelMarginTop : sizeStyles.labelMarginTop,
          }]}>
            {category.name}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  category: {
    borderRadius: wp('4%'),
    borderColor: COLORS.textBorde,
    overflow: 'hidden',
    margin: wp('1%'),
  },
  categoryActive: {
    shadowColor: COLORS.button,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  categoryBg: {
    position: 'absolute',
    top: -wp('6%'),
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  categoryContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingBottom y paddingHorizontal se aplican dinámicamente
    zIndex: 1,
  },
  categoryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom se aplica dinámicamente
  },
  categoryImg: {
    // Tamaño dinámico se aplica inline
  },
  categoryLabel: {
    fontWeight: '700',
    color: COLORS.textWhite,
    textAlign: 'center',
    lineHeight: hp('1.4%'),
    includeFontPadding: false,
    // marginTop se aplica dinámicamente
  },
});

export default CategoryItem;