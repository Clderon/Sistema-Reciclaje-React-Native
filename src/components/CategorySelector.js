import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { CATEGORIES, COLORS } from '../utils/constants';

const { width } = Dimensions.get('window');

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  // Grid de 3 columnas - colores de cada categoría
  const categoryColors = [
    '#3299e3', // Papel/Cartón
    '#4dc269', // Plástico
    '#929aa0', // Metal
    '#64cde2', // Vidrio
    '#d27c2f', // Orgánico
    '#9471e5', // Otros
  ];

  const categoryWidth = (width * 0.9 - 60) / 3; // 3 columnas con gap

  return (
    <View style={styles.container}>
      {CATEGORIES.map((category, index) => {
        const isActive = selectedCategory === category.id;
        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { width: categoryWidth, backgroundColor: categoryColors[index] },
              isActive && styles.categoryButtonActive,
            ]}
            onPress={() => onSelectCategory(category.id)}
            activeOpacity={0.95}
          >
            {/* Fondo de lianas */}
            <ImageBackground
              source={require('../assets/images/fondo-item-hd.webp')}
              style={styles.categoryBg}
              resizeMode="contain"
            />
            
            {/* Contenido */}
            <View style={styles.categoryContent}>
              <View style={styles.categoryIcon}>
                <Image
                  source={category.icon}
                  style={styles.categoryImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.categoryLabel}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
    paddingHorizontal: '5%',
    marginTop: 10,
    width: '100%',
  },
  categoryButton: {
    height: 100,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryButtonActive: {
    borderWidth: 3,
    shadowColor: COLORS.button,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  categoryBg: {
    position: 'absolute',
    top: -51,
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
    zIndex: 1,
  },
  categoryIcon: {
    width: 45,
    height: 45,
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textWhite,
    textAlign: 'center',
    lineHeight: 11,
  },
});

export default CategorySelector;
