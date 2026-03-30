import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';
import { playPopSound } from '../../utils/soundHelper';

const RoleButtonCard = ({
  avatarSource,
  name,
  onPress,
  nameCardBorderWidth = 5,
  avatarInnerColor = '#9BDDE4',
  disabled = false,
}) => {
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
        {/* Contenedor externo del avatar */}
        <View style={styles.avatarOuterContainer}>
          {/* Contenedor interno del avatar */}
          <View style={styles.avatarInnerContainer}>
            <Image
              source={avatarSource}
              style={[styles.avatar, { backgroundColor: avatarInnerColor }]}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Tarjeta de nombre */}
        <View style={styles.nameCard}>
          <View style={[styles.nameCardInner]}>
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: wp('2%'),
    // backgroundColor: "orange",
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('2%'),
    // backgroundColor: 'red',
  },
  avatarOuterContainer: {
    width: wp('35%'),
    height: wp('35%'),
    borderRadius: wp('20%'),
    backgroundColor: "yellow",
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: "#603316",
    backgroundColor: "#995d35",
    // backgroundColor: "yellow",
  },
  avatarInnerContainer: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    backgroundColor: "blue",
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: "#995d35",
    backgroundColor: "green",
    borderWidth: 3,
    borderColor: "#603316",
  },
  avatar: {
    backgroundColor: "green",
    borderRadius: wp('20%'),
    objectFit: 'contain',
    objectPosition: 'end',
    width: 180,
    height: 180,
  },
  nameCard: {
    flex: 1,
    height: hp('10%'),
    borderRadius: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    marginLeft: wp('-8%'),
    backgroundColor: '#A06942',
    padding: wp('1%'),
    borderWidth: 3,
    borderColor: "#603316",
  },
  nameCardInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('3%'),
    paddingVertical: hp('1%'),
    paddingLeft: wp('8%'),
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 3,
    borderColor: "#603316",
  },
  name: {
    fontWeight: '700',
    fontSize: wp('4.5%'),
    color: COLORS.textContenido,
    textAlign: 'start',
    width: '90%',
    includeFontPadding: false,
  },
  containerDisabled: {
    opacity: 0.5,
  },
});

export default RoleButtonCard;
