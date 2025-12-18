import React, { useRef } from 'react';
import { Text, ImageBackground, View, StyleSheet, Pressable, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Button = ({ title, onPress, variant = 'primary', style, disabled = false }) => {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || variant === 'disabled';
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!isDisabled) {
      Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
    }
  };

  const getButtonStyle = () => {
    if (isDisabled) return styles.buttonDisabled;
    if (isPrimary) return styles.buttonPrimary;
    return styles.buttonSecondary;
  };

  const getTextStyle = () => {
    if (isDisabled) return styles.buttonTextDisabled;
    if (isPrimary) return styles.buttonTextPrimary;
    return styles.buttonTextSecondary;
  };

  return (
    <Pressable 
      onPress={isDisabled ? null : onPress} 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut} 
      style={{ width: '100%' }}
      disabled={isDisabled}
    >
      <Animated.View
        style={[
          styles.button,
          getButtonStyle(),
          { transform: [{ scale }] },
          style,
        ]}
      >
        <View style={styles.buttonContent}>
          {isPrimary && (
            <ImageBackground
              source={require('../assets/images/upscalemedia-transformed.webp')}
              style={[styles.buttonVines, isDisabled && { opacity: 0.5 }]}
              resizeMode="cover"
            />
          )}
          <Text style={[styles.buttonText, getTextStyle()]}>
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
    height: hp('7%'),
    borderRadius: wp('4%'),
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
  buttonDisabled: {
    backgroundColor: '#6b9b5a',
    borderColor: '#1d420f',
    opacity: 0.6,
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonVines: {
    position: 'absolute',
    top: hp('-1.8%'),
    left: 0,
    right: wp('-1%'),
    bottom: hp('-0.4%'),
    width: '100%',
    zIndex: 2,
  },
  buttonText: {
    fontSize: wp('4.5%'),
    fontWeight: '900',
    lineHeight: wp('4.5%'),
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
  buttonTextDisabled: {
    color: '#ffffff',
  },
});

export default Button;
