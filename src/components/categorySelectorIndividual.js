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
  size = 'medium' // 'small', 'medium', 'large'
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
        };
      case 'large':
        return {
          width: wp('28%'),
          height: wp('28%'),
          iconSize: wp('16%'),
          fontSize: wp('3.5%'),
        };
      default: // medium
        return {
          width: wp('22%'),
          height: wp('22%'),
          iconSize: wp('11%'),
          fontSize: wp('3%'),
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
            borderWidth: isActive ? 3 : 2,
            transform: [{ scale: Animated.multiply(scale, activeScale) }],
            width: sizeStyles.width,
            height: sizeStyles.height,
          },
          isActive && styles.categoryActive,
        ]}
      >
        <ImageBackground
          source={require('../assets/images/fondo-item-hd.webp')}
          style={styles.categoryBg}
          resizeMode="contain"
        />
        
        <View style={styles.categoryContent}>
          <View style={[styles.categoryIcon, { 
            width: sizeStyles.iconSize, 
            height: sizeStyles.iconSize 
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
          <Text style={[styles.categoryLabel, { fontSize: sizeStyles.fontSize }]}>
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
    paddingBottom: hp('1%'),
    paddingHorizontal: wp('1%'),
    zIndex: 1,
  },
  categoryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('0.3%'),
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
    marginTop: hp('0.5%'),
  },
});

export default CategoryItem;