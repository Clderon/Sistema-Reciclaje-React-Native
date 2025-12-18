import React, { useRef } from 'react';
import { Text, ImageBackground, View, StyleSheet, Pressable, Animated } from 'react-native';

const Button = ({ title, onPress, variant = 'primary', style }) => {
  const isPrimary = variant === 'primary';
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={{ width: '100%' }}>
      <Animated.View
        style={[
          styles.button,
          isPrimary ? styles.buttonPrimary : styles.buttonSecondary,
          { transform: [{ scale }] },
          style,
        ]}
      >
        <View style={styles.buttonContent}>
          {isPrimary && (
            <ImageBackground
              source={require('../assets/images/upscalemedia-transformed.webp')}
              style={styles.buttonVines}
              resizeMode="cover"
            />
          )}
          <Text style={[styles.buttonText, isPrimary ? styles.buttonTextPrimary : styles.buttonTextSecondary]}>
            {title}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    borderWidth: 3.5,
    borderColor: '#1d420f',
    overflow: 'visible',
    position: 'relative',
  },
  buttonPrimary: {
    backgroundColor: '#46a330',
  },
  buttonSecondary: {
    backgroundColor: '#f8f7e3',
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonVines: {
    position: 'absolute',
    top: -14,
    left: 0,
    right: -4,
    bottom: -3,
    width: '100%',
    zIndex: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 18,
    position: 'relative',
    zIndex: 3,
    includeFontPadding: false,
  },
  buttonTextPrimary: {
    color: '#e9f5e6',
  },
  buttonTextSecondary: {
    color: '#513015',
  },
});

export default Button;
