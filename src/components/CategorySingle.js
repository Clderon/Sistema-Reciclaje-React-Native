import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CATEGORIES } from '../utils/constants';
import CategoryItem from './categorySelectorIndividual';

const CategorySingle = ({ 
  selectedCategory = 'papel', 
  onSelectCategory, 
  size = 'small',  // ← CAMBIAR de 'large' a 'medium'
  showClickable = false,
  showDecoration = true,  // Por defecto muestra la decoración
  borderRadius = wp('4%'),  // Por defecto usa el valor definido en CategoryItem
  borderWidth = null,  // Ancho del borde (null = usa valor por defecto: 2 normal, 3 activo)
  iconMarginBottom = null,  // Separación entre icono y texto (null = usa valor por defecto del tamaño)
  labelMarginTop = null,  // Margen superior del texto (null = usa valor por defecto del tamaño)
  paddingBottom = null,  // Padding inferior del contenido (null = usa valor por defecto del tamaño)
  paddingHorizontal = null  // Padding horizontal del contenido (null = usa valor por defecto del tamaño)
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
        showDecoration={showDecoration}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        iconMarginBottom={iconMarginBottom}
        labelMarginTop={labelMarginTop}
        paddingBottom={paddingBottom}
        paddingHorizontal={paddingHorizontal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
});

export default CategorySingle;