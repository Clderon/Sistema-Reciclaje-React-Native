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
      <View style={styles.divWrapper}>
        <Text style={styles.textWrapper}>{text}</Text>
      </View>
      <View style={styles.fondoMonoInstance}>
        {monkeyImage ? (
          <Image source={monkeyImage} style={styles.monkeyImage} resizeMode="cover" />
        ) : (
          <Text style={styles.monkeyEmoji}>🐵</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    height: hp('14%'),
    position: 'relative',
    width: wp('90%'),
    alignSelf: 'center',
  },
  divWrapper: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.targetFondo || '#efe1c4',
    borderWidth: 2,
    borderColor: COLORS.textBorde || '#60422a',
    borderRadius: wp('2.5%'),
    flexDirection: 'column',
    justifyContent: 'center',
    height: hp('5%'),
    left: wp('15%'),
    overflow: 'hidden',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    position: 'absolute',
    top: hp('5.5%'),
    width: wp('71%'),
  },
  textWrapper: {
    alignItems: 'center',
    color: COLORS.textContenido || '#513015',
    fontSize: wp('4%'),
    fontWeight: '700',
    textAlign: 'right',
    width: 'auto',
  },
  fondoMonoInstance: {
    height: hp('16%'),
    left: 0,
    top: 0,
    width: wp('37%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  monkeyImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('2%'),
  },
  monkeyEmoji: {
    fontSize: wp('15%'),
    textAlign: 'center',
  },
});

export default MonkeyFrame;
