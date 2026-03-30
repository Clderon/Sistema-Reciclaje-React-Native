import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, Image, Pressable, ImageBackground, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../utils/constants';
import { playPopSound } from '../../../utils/soundHelper';

const PointsModal = ({
  visible = false,
  onClose,
  agentName = "Agente Juan P",
  points = "10",
  category = "Plástico",
  extraText = ""
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(() => { scaleAnim.setValue(0); opacityAnim.setValue(0); });
    }
  }, [visible]);

  const handleButtonPress = () => {
    playPopSound({ volume: 0.3 });
    Animated.sequence([
      Animated.spring(buttonScale, { toValue: 0.9, tension: 300, friction: 3, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1, tension: 300, friction: 3, useNativeDriver: true }),
    ]).start();
    setTimeout(() => { onClose?.(); }, 150);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable onPress={() => {}}>
          <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
            <View style={styles.outerFrame}>
              <View style={styles.innerContentBox}>
                <View style={styles.topGreenArcContainer}>
                  <Image source={require('../../../assets/images/fondos/fondoP.webp')} resizeMode="cover" />
                </View>
                <View style={styles.textContentContainer}>
                  <Text style={styles.titleText}>¡Puntos Enviados!</Text>
                  <Text style={styles.messageText}>
                    <Text style={styles.normalText}>Ha asignado</Text>
                    <Text style={styles.pointsText}> {points} Puntos</Text>
                    <Text style={styles.normalText}> al </Text>
                    <Text style={styles.highlightText}>{agentName}</Text>
                    <Text style={styles.normalText}>. por su reciclaje{'\n'}de </Text>
                    <Text style={styles.highlightText}>{category}</Text>
                    <Text style={styles.normalText}>{extraText}</Text>
                  </Text>
                </View>
              </View>
            </View>

            <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
              <Pressable onPress={handleButtonPress}>
                <ImageBackground
                  source={require('../../../assets/images/hoja.webp')}
                  style={styles.buttonImageBackground}
                  resizeMode="contain"
                >
                  <Text style={styles.buttonText}>¡Genial!</Text>
                </ImageBackground>
              </Pressable>
            </Animated.View>

            <Image
              source={require('../../../assets/images/profesor/monoFeliz.webp')}
              style={styles.monkeyImage}
              resizeMode="contain"
            />
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: {
    alignItems: 'flex-start', flexDirection: 'column', gap: hp('2.5%'),
    height: hp('60%'), paddingVertical: hp('8.8%'), paddingHorizontal: 0,
    position: 'relative', width: wp('85%'), overflow: 'visible',
  },
  outerFrame: {
    alignItems: 'center', alignSelf: 'stretch', backgroundColor: COLORS.madera,
    borderWidth: 1, borderColor: COLORS.textContenido, flex: 1, justifyContent: 'center',
    padding: wp('2.5%'), position: 'relative', width: '100%', overflow: 'visible', borderRadius: wp('2%'),
  },
  topGreenArcContainer: {
    position: 'relative', top: hp('-15%'), width: wp('100%'), height: wp('50%'),
    backgroundColor: COLORS.button, borderBottomLeftRadius: wp('90%'), borderBottomRightRadius: wp('90%'),
    borderWidth: 2, borderBottomWidth: 0, borderColor: COLORS.textBorde, zIndex: 10, overflow: 'hidden',
  },
  innerContentBox: {
    alignItems: 'center', alignSelf: 'stretch', backgroundColor: COLORS.targetFondo,
    borderWidth: 1, borderColor: COLORS.textContenido, flex: 1, height: '100%',
    flexDirection: 'column', gap: hp('0%'), justifyContent: 'center',
    paddingVertical: hp('10%'), paddingHorizontal: wp('4.3%'),
    position: 'relative', overflow: 'hidden', borderRadius: wp('1.5%'),
  },
  textContentContainer: {
    alignItems: 'flex-start', alignSelf: 'stretch', flexDirection: 'column',
    paddingHorizontal: wp('5.5%'), paddingVertical: hp('1%'),
    position: 'relative', width: '100%', marginTop: hp('-15%'),
  },
  titleText: { alignSelf: 'stretch', color: COLORS.textBorde, fontSize: wp('6%'), fontWeight: '700', textAlign: 'center' },
  messageText: { alignSelf: 'stretch', fontSize: wp('4.5%'), fontWeight: '400', textAlign: 'center', lineHeight: hp('2.5%') },
  normalText: { color: COLORS.textContenido },
  pointsText: { color: COLORS.textBorde, fontWeight: '700' },
  highlightText: { color: COLORS.textBorde, fontWeight: '700' },
  buttonContainer: { position: 'absolute', bottom: hp('3.5%'), alignSelf: 'center', backgroundColor: 'transparent', zIndex: 10 },
  buttonImageBackground: { justifyContent: 'center', alignItems: 'center', paddingVertical: hp('2%'), paddingHorizontal: wp('10%'), minWidth: wp('50%'), minHeight: hp('12%'), backgroundColor: 'transparent' },
  buttonText: { color: COLORS.textWhite, fontSize: wp('6.5%'), fontWeight: '700', textAlign: 'center' },
  monkeyImage: { height: hp('45%'), width: wp('50%'), position: 'absolute', top: hp('-7%'), left: wp('17.5%'), zIndex: 5 },
});

export default PointsModal;
