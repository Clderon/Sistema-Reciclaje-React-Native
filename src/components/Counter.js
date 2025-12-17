import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = ({ value, onIncrement, onDecrement, min = 1, max = 99 }) => {
  return (
    <View style={styles.counter}>
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
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eedfc0',
    gap: 10,
    width: '100%',
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f7e3',
    borderWidth: 3,
    borderColor: '#1d420f',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: 24,
    fontWeight: '900',
    color: '#513015',
    lineHeight: 24,
    includeFontPadding: false,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#513015',
    flex: 1,
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default Counter;
