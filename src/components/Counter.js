import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';

const AnimatedButton = ({ onPress, disabled, children }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.85, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled}>
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const Counter = ({ value, onIncrement, onDecrement, min = 0, max = 99, unit = 'unidades' }) => {
  const displayValue = Number.isInteger(value) ? value : value.toFixed(1);
  
  return (
    <View style={styles.counter}>
      <AnimatedButton onPress={() => value > min && onDecrement()} disabled={value <= min}>
        <Text style={styles.buttonIcon}>−</Text>
      </AnimatedButton>
      
      <Text style={styles.value}>Cantidad: {displayValue} {unit}</Text>
      
      <AnimatedButton onPress={() => value < max && onIncrement()} disabled={value >= max}>
        <Text style={styles.buttonIcon}>+</Text>
      </AnimatedButton>
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
