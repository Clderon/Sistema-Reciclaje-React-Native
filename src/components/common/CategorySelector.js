import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CATEGORIES } from '../../utils/constants';
import CategoryItem from '../categorySelectorIndividual';

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
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
            color={category.color}
            size="medium"
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
});


export default CategorySelector;