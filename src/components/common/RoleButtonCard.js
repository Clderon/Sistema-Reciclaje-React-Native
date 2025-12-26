import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';
import { playPopSound } from '../../utils/soundHelper';

const RoleButtonCard = ({
  avatarSource,
  name,
  onPress,
  avatarSize = wp('30%'),
  nameCardMaxWidth = wp('60%'),
  nameCardHeight = hp('10%'),
  nameFontSize = wp('5%'),
  avatarBorderWidth = 5,
  nameCardBorderWidth = 5,
  avatarOuterSize = null, // Si no se especifica, será avatarSize + padding
  avatarOuterColor = COLORS.avatarBrown, // Color del contenedor externo
  avatarInnerColor = '#9BDDE4', // Color del contenedor interno
  disabled = false,
}) => {
  // Tamaño del contenedor externo (marco/fondo) - el más grande
  const outerSize = avatarOuterSize || avatarSize;
  // Tamaño del contenedor interno (para la imagen) - un poco más pequeño que el externo
  const innerSize = outerSize - wp('2%'); // 2% más pequeño que el externo
  // Tamaño de la imagen - FIJADO al tamaño del contenedor interno para consistencia
  const imageSize = innerSize; // Mismo tamaño que el interno para que todas las imágenes sean iguales
  
  const handlePress = () => {
    if (!disabled) {
      playPopSound({ volume: 0.3 });
      onPress?.();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
      style={[styles.container, disabled && styles.containerDisabled]}
    >
      <View style={styles.info}>
        {/* Contenedor externo del avatar (marco/fondo) */}
        <View
          style={[
            styles.avatarOuterContainer,
            {
              width: outerSize,
              height: outerSize,
              backgroundColor: avatarOuterColor,
            },
          ]}
        >
          {/* Contenedor interno del avatar (para la imagen) */}
          <View
            style={[
              styles.avatarInnerContainer,
              {
                width: innerSize,
                height: innerSize,
                borderRadius: innerSize / 2,
                backgroundColor: avatarInnerColor,
              },
            ]}
          >
            <Image
              source={avatarSource}
              style={[
                styles.avatar,
                {
                  width: imageSize,
                  height: imageSize,
                  borderRadius: imageSize / 2,
                },
              ]}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Tarjeta de nombre */}
        <View
          style={[
            styles.nameCard,
            {
              maxWidth: nameCardMaxWidth,
              height: nameCardHeight,
            },
          ]}
        >
          <View style={[styles.nameCardInner, { borderWidth: nameCardBorderWidth }]}>
            <Text style={[styles.name, { fontSize: nameFontSize }]}>{name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    paddingHorizontal: wp('4%'),
    flexShrink: 0,
  },
  avatarOuterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    flexShrink: 0,
    borderRadius: wp('15%'),
    // width, height y backgroundColor se pasan como props dinámicamente
  },
  avatarInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    borderWidth: 10,
    borderColor: '#A06942',
    // width, height, borderRadius y backgroundColor se pasan como props dinámicamente
  },
  avatar: {
    // width, height y borderRadius se pasan dinámicamente basado en innerSize
  },
  nameCard: {
    flex: 1,
    borderRadius: wp('2.5%'),
    borderWidth: 0,
    borderColor: COLORS.textContenido,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    marginLeft: wp('-10%'),
    backgroundColor: '#A06942',
    padding: wp('2%'),

  },
  nameCardInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    borderColor: COLORS.textContenido,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    width: '95%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
    width: '100%',
    includeFontPadding: false,
  },
  containerDisabled: {
    opacity: 0.5,
  },
});

export default RoleButtonCard;

