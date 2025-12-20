import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';

const RankingUserCard = ({
  user,
  position,
  isCurrentUser = false,
  onPress,
  avatarWrapperBackgroundColor = COLORS.badgeWrapperBackground,
  avatarInnerBackgroundColor = COLORS.badgeBackground,
  avatarSize = wp('20%'),
  showPositionBadge = false,
  showName = true,
  containerStyle,
  containerBackgroundColor,
  containerPadding,
  containerBorderRadius,
  containerBorderWidth,
  containerBorderColor,
}) => {
  const content = (
    <>
      <View style={[styles.avatarWrapper, { 
        width: avatarSize, 
        height: avatarSize,
        backgroundColor: avatarWrapperBackgroundColor 
      }, isCurrentUser && styles.avatarWrapperCurrent]}>
        <View style={[styles.avatarInner, { backgroundColor: avatarInnerBackgroundColor }]}>
          <Image
            source={user.avatar}
            style={styles.avatarImage}
            resizeMode="contain"
          />
        </View>
      </View>
      {showPositionBadge && (
        <View style={styles.positionBadge}>
          <Text style={styles.positionBadgeText}>{position}</Text>
        </View>
      )}
      {showName && (
        <Text style={styles.userName}>
          {position}. {user.name}
        </Text>
      )}
    </>
  );

  const Component = onPress ? TouchableOpacity : View;
  const componentProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <Component
      style={[
        styles.container,
        containerBackgroundColor && { backgroundColor: containerBackgroundColor },
        containerPadding !== undefined && { padding: containerPadding },
        containerBorderRadius !== undefined && { borderRadius: containerBorderRadius },
        containerBorderWidth !== undefined && { borderWidth: containerBorderWidth },
        containerBorderColor && { borderColor: containerBorderColor },
        containerStyle
      ]}
      {...componentProps}
    >
      {content}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    borderRadius: wp('50%'),
    borderWidth: 1,
    padding: wp('1.5%'),
    overflow: 'hidden',
    marginBottom: hp('1%'),
  },
  avatarWrapperCurrent: {
    borderWidth: 3,
    borderColor: COLORS.button,
    shadowColor: COLORS.button,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: wp('50%'),
    borderWidth: 1,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('50%'),
  },
  positionBadge: {
    position: 'absolute',
    bottom: hp('-0.5%'),
    left: '50%',
    transform: [{ translateX: -wp('4%') }],
    backgroundColor: COLORS.button,
    paddingVertical: hp('0.2%'),
    paddingHorizontal: wp('1.5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    minWidth: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  positionBadgeText: {
    color: COLORS.textWhite,
    fontSize: wp('2%'),
    fontWeight: '900',
    textAlign: 'center',
    includeFontPadding: false,
  },
  userName: {
    fontSize: wp('3%'),
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default RankingUserCard;

