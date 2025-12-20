import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';

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
    backgroundColor: COLORS.targetFondo,
    width: '100%',
    paddingHorizontal: wp('2%'),
  },
  button: {
    width: wp('12%'),
    height: wp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: COLORS.textContenido,
    lineHeight: wp('6%'),
    includeFontPadding: false,
  },
  value: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: COLORS.textContenido,
    flex: 1,
    textAlign: 'center',
    includeFontPadding: false,
    marginHorizontal: wp('2%'),
  },
});

export default Counter;
