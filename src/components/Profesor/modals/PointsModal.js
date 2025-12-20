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
              <Image 
            source={require('../../../assets/images/profesor/monoFeliz.png')}
            style={styles.capturaDeScreen}
            resizeMode="contain"
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
          <Pressable style={styles.hojaButton} onPress={onClose}>
            <Image 
                source={require('../../../assets/images/hoja.png')}
                style={styles.hojaImagen}
                resizeMode="contain"
            />
            <Text style={styles.textWrapper4}>¡Genial!</Text>
          </Pressable>

          {/* Mono feliz */}
        

          
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
    height: '100%',
  },

  // .frame
  frame: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: hp('2.5%'),              // gap: 20px
    flex: 1,          // height: 463px
    paddingVertical: hp('10.8%'),  // padding: 70px 0px 39px
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
    justifyContent: 'flex-start',
    padding: wp('2.5%'),                // padding: 10px
    position: 'relative',
    minHeight: wp('100%'),
    
  },

     


  contenedorImagen: {
    position: 'relative',
    top: hp('0%'),                    // Sobresalir del borde superior
    width: wp('100%'),                  // Ancho del círculo
    height: wp('50%'),               // Mitad del ancho para medio círculo
    backgroundColor: COLORS.button,    // Color verde
    borderBottomLeftRadius: wp('90%'),  // Esquina redondeada izquierda
    borderBottomRightRadius: wp('90%'), // Esquina redondeada derecha
    borderWidth: 2,
    borderBottomWidth: 0,              // Sin borde inferior
    borderColor: COLORS.textBorde,
    zIndex: 1,
    overflow: 'hidden',       
  },
  // .frame .div
  div: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingBottom: hp('5%'), 
    backgroundColor: COLORS.targetFondo,   // background-color: #eedfc0
    borderWidth: 1,
    borderColor: COLORS.textContenido,     // border-color: #513015
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('4.3%'),         // padding: 17px horizontal
    position: 'relative',
    overflow: 'hidden', 
    zIndex: 5, 
  },

  // .frame .intersect
  intersect: {
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
    position: 'relative',
    width: '100%',
    zIndex: 10, 
  },

  // .frame .text-wrapper
  textWrapper: {
    alignSelf: 'stretch',
    color: COLORS.textBorde,      // color: #7f1e97ff
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

  
  hojaButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: wp('-6%'),
    zIndex: 9,  
                    
},

// Imagen de la hoja
hojaImagen: {
  width: hp('25%'), 
  height: hp('15%'), 
  position: 'absolute', 
                 // Imagen como fondo
  
},


  // .frame .text-wrapper-4
    textWrapper4: {
        color: COLORS.textWhite,
        
        fontSize: wp('5.5%'),                 // Tamaño ajustado para caber en la hoja
        fontWeight: '700',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 1)',   // Sombra para mejor legibilidad
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 4,
        zIndex: 10,  
        elevation: 10,
  },

  // .frame .captura-de-screen (mono feliz)
  capturaDeScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',    
    height: wp('45%'),            // Ajustado para React Native
    width: wp('44%'),
    position: 'relative',
    bottom: hp('40%'),            // Posición ajustada
    left: wp('0%'),
    zIndex: 20, 
  },
});

export default PointsModal;