import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';

const AvatarNameCard = ({
  avatarSource,
  name,
  level,
  badge,
  avatarSize = wp('30%'),
  nameCardMaxWidth = wp('60%'),
  nameCardHeight = hp('10%'),
  nameFontSize = wp('5%'),
  levelFontSize = wp('4%'),
  badgeFontSize = wp('4%'),
  showBadge = true,
  badgeBorderWidth = 3,
  nameCardBorderWidth = 2,
  avatarBorderWidth = 0,
  avatarBorderColor = COLORS.textContenido,
  badgeBorderColor = COLORS.textContenido,
  nameCardBorderColor = COLORS.textContenido,
  avatarWrapperBackgroundColor = COLORS.avatarWrapperBackground,
  badgeBackgroundColor = COLORS.avatarBadgeBackground,
  nameCardBackgroundColor = COLORS.avatarNameCardBackground,
  nameCardInnerBackgroundColor = COLORS.targetFondo,
}) => {
  // Ajustar el marginTop del nameCard basado en si hay badge o no
  const nameCardMarginTop = showBadge && badge ? hp('-2%') : 0;
  
  // Calcular el tamaño de la imagen restando el borde del contenedor
  const imageSize = avatarSize - (avatarBorderWidth * 2);
  
  // Asegurar que info no se expanda verticalmente más allá del avatarSize
  const infoStyle = {
    maxHeight: avatarSize,
    alignSelf: 'flex-start',
  };
  
  return (
    <View style={[styles.info, infoStyle]}>
      {/* Avatar y badge */}
      <View
        style={[
          styles.avatarWrapper,
          {
            width: avatarSize,
            height: avatarSize,
            borderWidth: avatarBorderWidth,
            borderRadius: avatarBorderWidth > 0 ? avatarSize / 2 : 0,
            borderColor: avatarBorderColor,
            backgroundColor: avatarWrapperBackgroundColor,
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
              borderRadius: avatarBorderWidth > 0 ? imageSize / 2 : 0,
            },
          ]}
          resizeMode="cover"
        />
        {showBadge && badge && (
          <View style={[styles.badge, { borderWidth: badgeBorderWidth, borderColor: badgeBorderColor, backgroundColor: badgeBackgroundColor }]}>
            <Text style={[styles.badgeText, { fontSize: badgeFontSize }]}>{badge}</Text>
          </View>
        )}
      </View>

      {/* Tarjeta de nombre y nivel */}
      <View
        style={[
          styles.nameCard,
          {
            maxWidth: nameCardMaxWidth,
            height: nameCardHeight,
            marginTop: nameCardMarginTop,
            backgroundColor: nameCardBackgroundColor,
          },
        ]}
      >
        <View style={[styles.nameCardInner, { borderWidth: nameCardBorderWidth, borderColor: nameCardBorderColor, backgroundColor: nameCardInnerBackgroundColor }]}>
          <Text style={[styles.name, { fontSize: nameFontSize }]}>{name}</Text>
          {level && <Text style={[styles.level, { fontSize: levelFontSize }]}>{level}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    paddingHorizontal: wp('4%'),
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatar: {
    objectFit: 'cover',
    overflow: 'hidden',
    marginLeft: wp('2%'),
    marginTop: hp('3%'),
  },
  badge: {
    marginTop: hp('-1.5%'),
    borderRadius: wp('8%'),
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('7%'),
    zIndex: 2,
    alignSelf: 'center',
  },
  badgeText: {
    fontWeight: '700',
    color: COLORS.textWhite,
    includeFontPadding: false,
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
    paddingHorizontal: wp('1%'),
  },
  nameCardInner: {
    borderRadius: wp('2.5%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    height: '90%',
    width: '100%',
    justifyContent: 'center',
  },
  name: {
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'right',
    width: '100%',
    includeFontPadding: false,
  },
  level: {
    fontWeight: '500',
    color: COLORS.textContenido,
    width: '100%',
    includeFontPadding: false,
    textAlign: 'right',
  },
});

export default AvatarNameCard;

