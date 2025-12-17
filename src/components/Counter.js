import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

const Counter = ({ value, onIncrement, onDecrement, min = 1, max = 99 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => value > min && onDecrement()}
        activeOpacity={0.95}
        disabled={value <= min}
      >
        <Text style={styles.buttonIcon}>−</Text>
      </TouchableOpacity>
      
      <Text style={styles.value}>Cantidad: {value}</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => value < max && onIncrement()}
        activeOpacity={0.95}
        disabled={value >= max}
      >
        <Text style={styles.buttonIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.targetFondo,
    width: '100%',
    gap: 10,
    paddingVertical: 0,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textContenido,
    lineHeight: 24,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textContenido,
    flex: 1,
    textAlign: 'center',
  },
});

export default Counter;
