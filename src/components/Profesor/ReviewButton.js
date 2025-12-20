import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';
import Svg, { Text as SvgText } from 'react-native-svg';

const ReviewButton = ({ 
  onPress, 
  text = "Revisar",
  icon = "?",
  disabled = false 
}) => {
  return (
    <Pressable
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.content}>
        {/* Icono normal (sin SVG) */}
        <View style={styles.iconContainer}>
          <Svg height="100%" width="100%">
            <SvgText
              fill="#FFFFFF"
              fontSize={wp('3.5%')}
              fontWeight="bold"
              x="52%"
              y="80%"
              textAnchor="middle"
            >
              {icon}
            </SvgText>
          </Svg>
        </View>
        
        {/* Solo el texto con stroke SVG */}
       <Svg height={wp('4%')} width={wp('12%')}>
      {/* Primer texto: solo stroke (más grueso) */}
      <SvgText
        fill="transparent"
        stroke={COLORS.textContenido}
        strokeWidth="3"
        fontSize={wp('3.5%')}
        fontWeight="950"
        x="0"
        y="70%"
        fontFamily="Inter"
      >
        {text}
      </SvgText>
      
      {/* Segundo texto: relleno encima */}
      <SvgText
        fill="#FCF3EA"
        stroke="none"
        fontSize={wp('3.5%')}
        fontWeight="950"
        x="0"
        y="70%"
        fontFamily="Inter"
      >
        {text}
      </SvgText>

      {/* Segundo texto: relleno encima */}
      <SvgText
        fill="#FCF3EA"
        stroke="none"
        fontSize={wp('3.5%')}
        fontWeight="950"
        x="0"
        y="70%"
        fontFamily="Inter"
      >
        {text}
      </SvgText>
</Svg>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: wp('27%'),
    maxWidth: wp('30%'),
    paddingVertical: hp('0.6%'),
    paddingHorizontal: wp('1.8%'),
    alignItems: 'center',
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: COLORS.textContenido,
    backgroundColor: '#FAA540',
    shadowColor: '#885E34',
    shadowOffset: { width: -1, height: -7 },
    shadowOpacity: 0.56,
    shadowRadius: 1.7,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1.8%'),
  },
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
  // Estilo para el icono normal (sin stroke)
  icon: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ReviewButton;