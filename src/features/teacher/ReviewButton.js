import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';
import Svg, { Text as SvgText } from 'react-native-svg';
import { playPopSound } from '../../utils/soundHelper';

const ReviewButton = ({
  onPress,
  text = "Revisar",
  icon = "?",
  disabled = false
}) => {
  const handlePress = () => {
    if (!disabled) {
      playPopSound({ volume: 0.3 });
      onPress?.();
    }
  };

  return (
    <Pressable style={[styles.button, disabled && styles.buttonDisabled]} onPress={handlePress} disabled={disabled}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Svg height="100%" width="100%">
            <SvgText fill="#FFFFFF" fontSize={wp('3.5%')} fontWeight="bold" x="52%" y="80%" textAnchor="middle">
              {icon}
            </SvgText>
          </Svg>
        </View>
        <Svg height={wp('4%')} width={wp('12%')}>
          <SvgText fill="transparent" stroke={COLORS.textContenido} strokeWidth="3" fontSize={wp('3.5%')} fontWeight="950" x="0" y="70%" fontFamily="Inter">
            {text}
          </SvgText>
          <SvgText fill="#FCF3EA" stroke="none" fontSize={wp('3.5%')} fontWeight="950" x="0" y="70%" fontFamily="Inter">
            {text}
          </SvgText>
          <SvgText fill="#FCF3EA" stroke="none" fontSize={wp('3.5%')} fontWeight="950" x="0" y="70%" fontFamily="Inter">
            {text}
          </SvgText>
        </Svg>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: wp('22%'),
    maxWidth: wp('30%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('1.8%'),
    alignItems: 'center',
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    backgroundColor: '#FAA540',
  },
  buttonDisabled: { opacity: 0.5 },
  content: { flexDirection: 'row', alignItems: 'center', gap: wp('1.8%') },
  iconContainer: {
    width: wp('4.8%'),
    height: wp('4.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BA5E1D',
    borderRadius: wp('2.2%'),
    borderWidth: 1,
    borderColor: COLORS.textContenido,
  },
});

export default ReviewButton;
