import React, { useRef } from 'react';
import { View, Text, Pressable, Image, ImageBackground, StyleSheet, Animated } from 'react-native';
import { CATEGORIES } from '../utils/constants';

const CategoryItem = ({ category, index, isActive, onSelect, color }) => {
  const scale = useRef(new Animated.Value(1)).current;

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
            transform: [{ scale }],
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
    marginTop: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    maxWidth: 375,
    gap: 20,
  },
  category: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderColor: '#1d420f',
    overflow: 'hidden',
    position: 'relative',
  },
  categoryActive: {
    shadowColor: '#46a330',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  categoryBg: {
    position: 'absolute',
    top: -25,
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
    paddingBottom: 8,
    paddingHorizontal: 5,
    position: 'relative',
    zIndex: 1,
  },
  categoryIcon: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  categoryImg: {
    width: 50,
    height: 50,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e9f5e6',
    textAlign: 'center',
    lineHeight: 11,
    includeFontPadding: false,
    marginTop: 4,
  },
});

export default CategorySelector;
