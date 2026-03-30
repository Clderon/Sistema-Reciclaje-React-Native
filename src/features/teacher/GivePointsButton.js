import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GivePointsButton = ({ onPress, disabled = false }) => {
  const handlePress = () => {
    if (!disabled) onPress?.();
  };

  return (
    <Pressable style={[styles.button, disabled && styles.buttonDisabled]} onPress={handlePress} disabled={disabled}>
      <Image
        source={require('../../assets/images/profesor/darPuntos.png')}
        style={styles.buttonImage}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {},
  buttonDisabled: { opacity: 0.6 },
  buttonImage: {
    width: wp('25%'),
    height: hp('19%'),
  },
});

export default GivePointsButton;
