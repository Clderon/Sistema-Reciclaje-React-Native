import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CATEGORIES, COLORS } from '../../utils/constants';

const CategoryItem = ({ category, index, isActive, onSelect, color }) => {
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

  return (
    <Pressable onPress={onSelect} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.category,
          {
            backgroundColor: color,
            borderWidth: isActive ? 3 : 2,
            transform: [{ scale: Animated.multiply(scale, activeScale) }],
          },
          isActive && styles.categoryActive,
        ]}
      >
        <ImageBackground
          source={require('../../assets/images/fondo-item-hd.webp')}
          style={styles.categoryBg}
          resizeMode="contain"
        />
        
        <View style={styles.categoryContent}>
          <View style={styles.categoryIcon}>
            <Image
              source={category.icon}
              style={styles.categoryImg}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.categoryLabel}>{category.name}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  const categoryColors = [
    '#3299e3', // Papel/Cartón
    '#4dc269', // Plástico
    '#929aa0', // Metal
    '#64cde2', // Vidrio
    '#d27c2f', // Orgánico
    '#9471e5', // Otros
  ];

  return (
    <View style={styles.container}>
      <View style={styles.categories}>
        {CATEGORIES.map((category, index) => (
          <CategoryItem
            key={category.id}
            category={category}
            index={index}
            isActive={selectedCategory === category.id}
            onSelect={() => onSelectCategory(category.id)}
            color={categoryColors[index]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('90%'),
    maxWidth: wp('95%'),
  },
  category: {
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: wp('4%'),
    borderColor: COLORS.textBorde,
    overflow: 'hidden',
    margin: wp('2%'),
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
    width: wp('11%'),
    height: wp('11%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('0.3%'),
  },
  categoryImg: {
    width: wp('12%'),
    height: wp('12%'),
  },
  categoryLabel: {
    fontSize: wp('3%'),
    fontWeight: '700',
    color: COLORS.textWhite,
    textAlign: 'center',
    lineHeight: hp('1.4%'),
    includeFontPadding: false,
    marginTop: hp('0.5%'),
  },
});

export default CategorySelector;
