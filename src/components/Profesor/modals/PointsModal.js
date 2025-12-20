import React from 'react';
import { View, Text, StyleSheet, Modal, Image, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../utils/constants';

const PointsModal = ({ 
  visible = false, 
  onClose, 
  agentName = "Agente Juan P", 
  points = "10", 
  category = "Plástico",
  extraText = ""
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay semi-transparente */}
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.frame} onPress={() => {}}>
          
          {/* Frame wrapper - Contenedor principal */}
          <View style={styles.frameWrapper}>
            <View style={styles.div}>
            <View style={styles.contenedorImagen}>
              {/* Imagen de fondo superior (hoja.png) */}
              <Image 
                source={require('../../../assets/images/fondos/fondoP.png')}
                resizeMode="cover"
              />
             </View>
              {/* Contenido del texto */}
              <View style={styles.div2}>
                <Text style={styles.textWrapper}>¡Puntos Enviados!</Text>
                <Text style={styles.haAsignado}>
                  <Text style={styles.span}>Ha asignado</Text>
                  <Text style={styles.textWrapper2}> {points} Puntos</Text>
                  <Text style={styles.span}> al </Text>
                  <Text style={styles.textWrapper3}>{agentName}</Text>
                  <Text style={styles.span}>. por su reciclaje{'\n'}de </Text>
                  <Text style={styles.textWrapper3}>{category}</Text>
                  <Text style={styles.span}>{extraText}</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Botón Genial */}
          <Pressable style={styles.divWrapper} onPress={onClose}>
            <Text style={styles.textWrapper4}>¡Genial!</Text>
          </Pressable>

          {/* Mono feliz */}
          <Image 
            source={require('../../../assets/images/profesor/monoFeliz.png')}
            style={styles.capturaDeScreen}
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Overlay del modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // .frame
  frame: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: hp('2.5%'),              // gap: 20px
    height: hp('58%'),            // height: 463px
    paddingVertical: hp('8.8%'),  // padding: 70px 0px 39px
    paddingHorizontal: 0,
    position: 'relative',
    width: wp('85%'),             // width: 340px
  },

  // .frame .frame-wrapper
  frameWrapper: {
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
  },
  contenedorImagen: {
    position: 'relative',
    top: hp('-5%'),                    // Sobresalir del borde superior
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
  // .frame .div
  div: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.targetFondo,   // background-color: #eedfc0
    borderWidth: 1,
    borderColor: COLORS.textContenido,     // border-color: #513015
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    justifyContent: 'center',
    paddingVertical: hp('10%'),           // padding: 69px vertical
    paddingHorizontal: wp('4.3%'),         // padding: 17px horizontal
    position: 'relative',
    overflow: 'hidden', 
  },

  // .frame .intersect
  intersect: {
    height: hp('13%'),            // height: 104px
    left: 0,
    position: 'absolute',
    top: 0,
    width: wp('80%'),             // width: 320px
  },

  // .frame .div-2
  div2: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'column',
    paddingBottom: hp('2%'),
    position: 'relative',
    width: '100%',
  },

  // .frame .text-wrapper
  textWrapper: {
    alignSelf: 'stretch',
    color: COLORS.textBorde,      // color: #1d420f
    fontSize: wp('5%'),           // font-size: 20px
    fontWeight: '700',
    textAlign: 'center',
  },

  // .frame .ha-asignado
  haAsignado: {
    alignSelf: 'stretch',
    fontSize: wp('4%'),           // font-size: 16px
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: hp('2.5%'),       // line-height ajustado
  },

  // .frame .span
  span: {
    color: COLORS.textContenido,  // color normal del texto
  },

  // .frame .text-wrapper-2
  textWrapper2: {
    color: COLORS.textBorde,      // color destacado para puntos
    fontWeight: '700',
  },

  // .frame .text-wrapper-3
  textWrapper3: {
    color: COLORS.textBorde,      // color destacado para nombre/categoría
    fontWeight: '700',
  },

  // .frame .div-wrapper (botón Genial)
  divWrapper: {
    backgroundColor: COLORS.button,        // Verde del botón
    borderRadius: wp('5%'),
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('8%'),
    alignSelf: 'center',
  },

  // .frame .text-wrapper-4
  textWrapper4: {
    color: COLORS.textWhite,
    fontSize: wp('5%'),
    fontWeight: '700',
    textAlign: 'center',
  },

  // .frame .captura-de-screen (mono feliz)
  capturaDeScreen: {
    height: hp('25%'),            // Ajustado para React Native
    width: wp('35%'),
    position: 'absolute',
    bottom: hp('25%'),            // Posición ajustada
    left: wp('25%'),
  },
});

export default PointsModal;