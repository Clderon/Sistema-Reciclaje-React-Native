import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';

const MonkeyFrame = ({ 
  text = "¡12 Misiones Pendientes!",
  monkeyImage = null 
}) => {
  return (
    <View style={styles.frame}>
      {/* Globo de texto */}
      <View style={styles.divWrapper}>
        <Text style={styles.textWrapper}>{text}</Text>
      </View>
      
      {/* Mono con imagen de fondo */}
      <View style={styles.fondoMonoInstance}>
        {monkeyImage ? (
          <Image 
            source={monkeyImage}
            style={styles.monkeyImage}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.monkeyEmoji}>🐵</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // .frame
  frame: {
    height: hp('14%'),     // height: 116px convertido
    position: 'relative',
    width: wp('90%'),      // width: 358px convertido
    alignSelf: 'center',
  },

  // .frame .div-wrapper
  divWrapper: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.targetFondo || '#efe1c4',
    borderWidth: 2,
    borderColor: COLORS.textBorde || '#60422a',
    borderRadius: wp('2.5%'),     // border-radius: 10px
    flexDirection: 'column',
    justifyContent: 'center',
    height: hp('5%'),             // height: 39px convertido
    left: wp('15%'),              // left: 57px convertido
    overflow: 'hidden',
    paddingVertical: hp('1%'),   // padding: 90px vertical convertido
    paddingHorizontal: wp('4%'),  // padding: 8px 31px horizontal convertido
    position: 'absolute',
    top: hp('5.5%'),              // top: 44px convertido
    width: wp('71%'),             // width: 284px convertido
  },

  // .frame .text-wrapper
  textWrapper: {
    alignItems: 'center',
    color: COLORS.textContenido || '#513015',
    fontSize: wp('4%'),               // font-size: 20px convertido
    fontWeight: '700',
    textAlign: 'right',
    width: 'auto',
                     // Ajustar posición horizontal
  },

  // .frame .fondo-mono-instance
  fondoMonoInstance: {
    height: hp('16%'),        // height: 127px convertido
    left: 0,                  // left: 0
    top: 0,                   // top: 0
    width: wp('37%'),         // width: 148px convertido
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Imagen del mono
  monkeyImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('2%'),
  },

  // Emoji del mono (fallback)
  monkeyEmoji: {
    fontSize: wp('15%'),
    textAlign: 'center',
  },
});

export default MonkeyFrame;