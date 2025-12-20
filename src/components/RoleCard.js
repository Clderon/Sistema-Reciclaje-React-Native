import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';

const AnimatedButton = ({ children, onPress, style, disabled = false }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
    }
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const RoleCard = ({
  title,
  subtitle,
  icon,
  badge,
  onPress,
  size = 'default',
  disabled = false,
}) => {
  // Configuración de tamaños
  const sizeConfig = {
    small: {
      infoWidth: wp('85%'),
      infoHeight: hp('12%'),
      avatarSize: wp('25%'),
      avatarContainerSize: wp('23%'),
      nameCardWidth: wp('50%'),
      nameCardHeight: hp('7%'),
      nameCardLeft: wp('12%'),
      nameCardTop: hp('2%'),
      nameFontSize: wp('3.5%'),
      subtitleFontSize: wp('3%'),
      badgeFontSize: wp('3%'),
    },
    default: {
      infoWidth: wp('90%'),
      infoHeight: hp('16%'),
      avatarSize: wp('30%'),
      avatarContainerSize: wp('28%'),
      nameCardWidth: wp('58%'),
      nameCardHeight: hp('9%'),
      nameCardLeft: wp('15%'),
      nameCardTop: hp('3%'),
      nameFontSize: wp('4%'),
      subtitleFontSize: wp('3.5%'),
      badgeFontSize: wp('3.5%'),
    },
    large: {
      infoWidth: wp('95%'),
      infoHeight: hp('20%'),
      avatarSize: wp('35%'),
      avatarContainerSize: wp('33%'),
      nameCardWidth: wp('65%'),
      nameCardHeight: hp('11%'),
      nameCardLeft: wp('18%'),
      nameCardTop: hp('4%'),
      nameFontSize: wp('4.5%'),
      subtitleFontSize: wp('4%'),
      badgeFontSize: wp('4%'),
    },
  };

  const config = sizeConfig[size] || sizeConfig.default;

  return (
    <AnimatedButton onPress={onPress} disabled={disabled} style={styles.card}>
      {/* Contenedor de información (avatar y nombre) - igual a info en PerfilScreen */}
      <View
        style={[
          styles.info,
          {
            width: config.infoWidth,
            height: config.infoHeight,
          },
        ]}
      >
        {/* Avatar y badge */}
        <View
          style={[
            styles.avatarWrapper,
            {
              width: config.avatarSize,
              height: config.avatarSize,
            },
          ]}
        >
          <View
            style={[
              styles.avatarContainer,
              {
                width: config.avatarContainerSize,
                height: config.avatarContainerSize,
              },
            ]}
          >
            <Image source={icon} style={styles.avatar} resizeMode="cover" />
          </View>
          {badge && (
            <View style={styles.badge}>
              <Text style={[styles.badgeText, { fontSize: config.badgeFontSize }]}>{badge}</Text>
            </View>
          )}
        </View>

        {/* Tarjeta de nombre y nivel */}
        <View
          style={[
            styles.nameCard,
            {
              width: config.nameCardWidth,
              height: config.nameCardHeight,
              left: config.nameCardLeft,
              top: config.nameCardTop,
            },
          ]}
        >
          <View style={styles.nameCardInner}>
            <Text style={[styles.name, { fontSize: config.nameFontSize }]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.level, { fontSize: config.subtitleFontSize }]}>{subtitle}</Text>
            )}
          </View>
        </View>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatarWrapper: {
    position: 'absolute',
    left: wp('2%'),
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('2%'),
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badge: {
    marginTop: hp('-1.5%'),
    backgroundColor: COLORS.avatarBrown,
    borderRadius: wp('8%'),
    borderWidth: 3,
    borderColor: COLORS.textContenido,
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('7%'),
    zIndex: 2,
  },
  badgeText: {
    fontWeight: '700',
    color: COLORS.textWhite,
    includeFontPadding: false,
  },
  nameCard: {
    position: 'absolute',
    backgroundColor: COLORS.avatarBrown,
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: COLORS.textContenido,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  nameCardInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    paddingVertical: hp('1%'),
    paddingLeft: wp('15%'),
    paddingRight: wp('3%'),
    width: '95%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    textAlign: 'right',
    width: '100%',
    includeFontPadding: false,
  },
});

export default RoleCard;

