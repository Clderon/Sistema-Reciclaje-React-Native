import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

const BadgeItem = ({
  imageSource,
  backgroundColor = COLORS.badgeBackground,
  isLocked = false,
  onPress,
}) => {
  const content = (
    <>
      <View style={[styles.badgeItemInner, { backgroundColor }]}>
        <Image
          source={imageSource}
          style={styles.badgeItem}
          resizeMode="cover"
        />
      </View>
      {isLocked && (
        <View style={styles.lockOverlay}>
          <MaterialIcons name="lock" size={wp('6%')} color={COLORS.textWhite} />
        </View>
      )}
    </>
  );

  if (isLocked || !onPress) {
    return (
      <View style={[styles.badgeItemWrapper, { backgroundColor: COLORS.badgeWrapperBackground }, isLocked && styles.badgeItemLocked]}>
        {content}
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.badgeItemWrapper, { backgroundColor: COLORS.badgeWrapperBackground }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badgeItemWrapper: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('50%'),
    borderWidth: 1,
    padding: wp('1.5%'),
    overflow: 'hidden',
    margin: wp('1.25%'),
  },
  badgeItemInner: {
    width: '100%',
    height: '100%',
    borderRadius: wp('50%'),
    borderWidth: 1,
    overflow: 'hidden',
  },
  badgeItem: {
    width: '100%',
    height: '100%',
    borderRadius: wp('50%'),
  },
  badgeItemLocked: {
    opacity: 0.5,
    borderColor: COLORS.avatarGray,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(29, 66, 15, 0.5)',
    borderRadius: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BadgeItem;

