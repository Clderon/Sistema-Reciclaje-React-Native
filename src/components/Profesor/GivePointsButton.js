import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { playPopSound } from '../../utils/soundHelper';

const GivePointsButton = ({ 
  onPress, 
  disabled = false 
}) => {
  const handlePress = () => {
    if (!disabled) {
      playPopSound({ volume: 0.3 });
      onPress?.();
    }
  };

  return (
    <Pressable
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Image
        source={require('../../assets/images/profesor/darPuntos.png')}
        style={styles.buttonImage}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    // Sin estilos de fondo, solo la imagen
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonImage: {
    width: wp('25%'), // Ajusta el tamaño según necesites
    height: hp('19%'),  // Ajusta el tamaño según necesites
  },
});

export default GivePointsButton;