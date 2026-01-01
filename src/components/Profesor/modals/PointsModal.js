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
  // Animación de aparición/desaparición del modal
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  // Animación del botón "Genial"
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // Iniciar animación cuando el modal aparece
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animación de desaparición
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Resetear valores después de la animación
        scaleAnim.setValue(0);
        opacityAnim.setValue(0);
      });
    }
  }, [visible]);

  const handleButtonPress = () => {
    // Animación del botón al presionar
    playPopSound({ volume: 0.3 });
    
    // Animación de escala del botón
    Animated.sequence([
      Animated.spring(buttonScale, {
        toValue: 0.9,
        tension: 300,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        tension: 300,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Cerrar modal después de un pequeño delay para ver la animación
    setTimeout(() => {
      onClose?.();
    }, 150);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay semi-transparente */}
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable onPress={() => {}}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
          
          {/* Frame wrapper - Contenedor principal */}
          <View style={styles.outerFrame}>
            <View style={styles.innerContentBox}>
            <View style={styles.topGreenArcContainer}>
              {/* Imagen de fondo superior (hoja.webp) */}
              <Image 
                source={require('../../../assets/images/fondos/fondoP.webp')}
                resizeMode="cover"
              />
             </View>
              {/* Contenido del texto */}
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

          {/* Botón Genial con hoja-login */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                transform: [{ scale: buttonScale }],
              },
            ]}
          >
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

          {/* Mono feliz */}
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
  // Overlay del modal (fondo oscuro semitransparente)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Contenedor principal del modal
  modalContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: hp('2.5%'),              // gap: 20px
    height: hp('60%'),            // Cuadro más alto
    paddingVertical: hp('8.8%'),  // padding: 70px 0px 39px
    paddingHorizontal: 0,
    position: 'relative',
    width: wp('85%'),             // width: 340px
    overflow: 'visible',          // Permitir que el botón sobresalga
  },

  // Marco exterior (fondo marrón/madera)
  outerFrame: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.madera,     // background-color: #e1ae6f
    borderWidth: 1,
    borderColor: COLORS.textContenido,  // border-color: #513015
    flex: 1,
    justifyContent: 'center',
    padding: wp('2.5%'),                // padding: 10px
    position: 'relative',
    width: '100%',
    overflow: 'visible',                // Permitir que el botón sobresalga
    borderRadius: wp('2%'),
  },

  // Contenedor del arco verde superior
  topGreenArcContainer: {
    position: 'relative',
    top: hp('-15%'),                    // Sobresalir del borde superior
    width: wp('100%'),                  // Ancho del círculo
    height: wp('50%'),               // Mitad del ancho para medio círculo
    backgroundColor: COLORS.button,    // Color verde
    borderBottomLeftRadius: wp('90%'),  // Esquina redondeada izquierda
    borderBottomRightRadius: wp('90%'), // Esquina redondeada derecha
    borderWidth: 2,
    borderBottomWidth: 0,              // Sin borde inferior
    borderColor: COLORS.textBorde,
    zIndex: 10,
    overflow: 'hidden', 
  },

  // Caja de contenido interior (fondo beige)
  innerContentBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.targetFondo,   // background-color: #eedfc0
    borderWidth: 1,
    borderColor: COLORS.textContenido,     // border-color: #513015
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    gap: hp('0%'),
    justifyContent: 'flex-start',
    justifyContent: 'center',
    paddingVertical: hp('10%'),           // padding: 69px vertical
    paddingHorizontal: wp('4.3%'),         // padding: 17px horizontal
    position: 'relative',
    overflow: 'hidden', 
    borderRadius: wp('1.5%'),
  },

  // Contenedor del texto (título y mensaje)
  textContentContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'column',
    paddingHorizontal: wp('5.5%'),
    paddingVertical: hp('1%'),
    position: 'relative',
    width: '100%',
    marginTop: hp('-15%'),
  },

  // Texto del título "¡Puntos Enviados!"
  titleText: {
    alignSelf: 'stretch',
    color: COLORS.textBorde,      // color: #1d420f
    fontSize: wp('6%'),           // font-size: 20px
    fontWeight: '700',
    textAlign: 'center',
  },

  // Texto del mensaje completo
  messageText: {
    alignSelf: 'stretch',
    fontSize: wp('4.5%'),           // font-size: 16px
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: hp('2.5%'),       // line-height ajustado
  },

  // Texto normal (parte del mensaje)
  normalText: {
    color: COLORS.textContenido,  // color normal del texto
  },

  // Texto de puntos (destacado)
  pointsText: {
    color: COLORS.textBorde,      // color destacado para puntos
    fontWeight: '700',
  },

  // Texto destacado (nombre y categoría)
  highlightText: {
    color: COLORS.textBorde,      // color destacado para nombre/categoría
    fontWeight: '700',
  },

  // Contenedor del botón "¡Genial!"
  buttonContainer: {
    position: 'absolute',
    bottom: hp('3.5%'),                  // Posicionado para que la mitad esté fuera
    alignSelf: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },

  // Fondo de imagen del botón (hoja)
  buttonImageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    minWidth: wp('50%'),                // Botón más grande
    minHeight: hp('12%'),               // Botón más alto
    backgroundColor: 'transparent',
  },

  // Texto del botón "¡Genial!"
  buttonText: {
    color: COLORS.textWhite,
    fontSize: wp('6.5%'),
    fontWeight: '700',
    textAlign: 'center',
  },

  // Imagen del mono feliz
  monkeyImage: {
    height: hp('45%'),            // Mono más grande
    width: wp('50%'),             // Ancho proporcional
    position: 'absolute',
    top: hp('-7%'),              // Posicionado para que la mitad superior esté fuera del cuadro
    left: wp('17.5%'),            // Centrado horizontalmente
    zIndex: 5,
  },
});

export default PointsModal;