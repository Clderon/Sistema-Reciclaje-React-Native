import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CATEGORIES } from '../utils/constants';
import CategoryItem from './categorySelectorIndividual';

const CategorySingle = ({ 
  selectedCategory = 'papel', 
  onSelectCategory, 
  size = 'small',  // ← CAMBIAR de 'large' a 'medium'
  showClickable = false 
}) => {
  // Mapeo de strings a IDs (usando los datos existentes)
  const categoryMapping = {
    'papel': 1,
    'plastico': 2, 
    'metal': 3,
    'vidrio': 4,
    'organico': 5,
    'otros': 6,
  };

  const categoryId = categoryMapping[selectedCategory] || 1;
  const selectedCategoryData = CATEGORIES.find(cat => cat.id === categoryId);

  if (!selectedCategoryData) return null;

  return (
    <View style={styles.container}>
      <CategoryItem
        category={selectedCategoryData}
        index={categoryId - 1}
        isActive={true}
        onSelect={showClickable ? () => onSelectCategory?.(selectedCategory) : undefined}
        color={selectedCategoryData.color}
        size={size}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
});

export default CategorySingle;