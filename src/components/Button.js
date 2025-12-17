import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native';
import { COLORS } from '../utils/constants';

const Button = ({ title, onPress, variant = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        {variant === 'primary' && (
          <ImageBackground
            source={require('../assets/images/upscalemedia-transformed.webp')}
            style={styles.vines}
            resizeMode="cover"
          />
        )}
        <Text style={[styles.text, styles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}`]]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 60,
    borderRadius: 15,
    borderWidth: 3.5,
    borderColor: COLORS.textBorde,
    overflow: 'hidden',
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  primary: {
    backgroundColor: COLORS.button,
    // Gradient effect simulation
    shadowColor: COLORS.shadowButton || 'rgba(70, 163, 48, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondary: {
    backgroundColor: COLORS.target,
    borderColor: COLORS.textBorde,
  },
  vines: {
    position: 'absolute',
    top: -14,
    left: 0,
    right: -4,
    bottom: -3,
    width: '100%',
    zIndex: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    position: 'relative',
    zIndex: 3,
  },
  textPrimary: {
    color: COLORS.textWhite,
  },
  textSecondary: {
    color: COLORS.textContenido,
  },
});

export default Button;

