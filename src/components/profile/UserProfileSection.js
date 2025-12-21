import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';
import AvatarNameCard from './AvatarNameCard';

const UserProfileSection = ({
  avatarSource,
  name,
  level,
  stats = [],
  backgroundImageSource,
  avatarSize = wp('30%'),
  avatarBorderWidth = 5,
  avatarBorderColor = COLORS.textContenido,
  avatarWrapperBackgroundColor = '#A3DDEE',
  showBadge = false,
  badge,
  sectionPaddingVertical,
}) => {
  return (
    <View style={[styles.section, sectionPaddingVertical && { paddingVertical: sectionPaddingVertical }]}>
      {backgroundImageSource && (
        <View style={styles.backgroundWrapper}>
          <Image
            source={backgroundImageSource}
            style={styles.backgroundSection}
            resizeMode="cover"
          />
        </View>
      )}
      
      {/* Contenedor de información (avatar y nombre) */}
      <AvatarNameCard
        avatarSource={avatarSource}
        name={name}
        level={level}
        badge={badge}
        showBadge={showBadge}
        avatarSize={avatarSize}
        avatarBorderWidth={avatarBorderWidth}
        avatarBorderColor={avatarBorderColor}
        avatarWrapperBackgroundColor={avatarWrapperBackgroundColor}
      />

      {/* Estadísticas */}
      {stats.length > 0 && (
        <View style={styles.stats}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.stat}>
              <View style={styles.statOuter}>
                <View style={styles.statInner}>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
    minHeight: hp('32.5%'),
    flexDirection: 'column',
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: hp('2%'),
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  backgroundSection: {
    width: '100%',
    height: '100%',
  },
  stats: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: wp('1%'),
    zIndex: 2,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
  },
  stat: {
    flex: 1,
    minWidth: 0,
  },
  statOuter: {
    backgroundColor: COLORS.avatarBrown,
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: COLORS.textContenido,
    padding: wp('1%'),
    shadowColor: COLORS.textBorde,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    height: hp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('0.5%'),
  },
  statInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    padding: wp('1%'),
  },
  statLabel: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: wp('3.5%'),
    fontWeight: '800',
    width: '100%',
    includeFontPadding: false,
  },
  statValue: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: wp('5.5%'),
    letterSpacing: 1,
    fontWeight: '800',
    width: '100%',
    includeFontPadding: false,
  },
});

export default UserProfileSection;

