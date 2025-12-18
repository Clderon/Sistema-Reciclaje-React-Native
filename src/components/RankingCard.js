import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/constants';

const RankingCard = ({ rankingData, onPositionPress, progressText, progressValue = 50 }) => {
  const getPositionStyle = (position) => {
    const positions = {
      1: { top: '5%', left: '53%', transform: [{ translateX: -20 }] }, // 40px avatar, centrar
      2: { top: '25%', left: '23%' },
      3: { top: '35%', left: '61%' },
      4: { top: '60%', left: '65%', transform: [{ translateX: -30 }] }, // 60px avatar, centrar
      5: { top: '71%', left: '20%' },
    };
    return positions[position] || {};
  };

  const getAvatarSize = (position) => {
    const sizes = {
      1: 40, // 4rem
      2: 45, // 5rem (silver)
      3: 55, // 6.5rem (bronze)
      4: 55, // 6rem
      5: 60, // 6rem
    };
    return sizes[position] || 60;
  };


  return (
    <View style={styles.rankingImage}>
      <ImageBackground
        source={require('../assets/images/Fondo-Ranking-HD.webp')}
        style={styles.imageSrc}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.positionsContainer}>
          {rankingData.slice(0, 5).map((user) => {
            const positionStyle = getPositionStyle(user.position);
            const avatarSize = getAvatarSize(user.position);

            return (
              <TouchableOpacity
                key={user.id}
                style={[styles.position, positionStyle]}
                onPress={() => onPositionPress && onPositionPress(user)}
                activeOpacity={0.7}
              >
                <View style={[styles.avatar, { width: avatarSize, height: avatarSize }]}>
                  <Image 
                    source={user.avatar} 
                    style={{ width: avatarSize, height: avatarSize }} 
                    resizeMode="contain" 
                  />
                </View>
                <View style={styles.positionBadge}>
                  <Text style={styles.positionBadgeText}>{user.position}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        
        {/* Barra de progreso dentro de la imagen, en el bottom */}
        {progressText && (
          <View style={styles.progressContainer}>
            <View style={styles.progress}>
              {/* Fondo de la barra */}
              <View style={styles.progressBg} />
              {/* Degradado verde del progreso - empieza desde la izquierda */}
              <LinearGradient
                colors={[COLORS.progressStart, COLORS.progressMid, COLORS.progressEnd]}
                locations={[0, 0.6, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.progressFill, { width: `${progressValue}%` }]}
              />
              {/* Texto centrado sobre la barra (z-index alto para estar por encima) */}
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>
                  {progressText}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  rankingImage: {
    width: '100%',
    backgroundColor: COLORS.target,
    position: 'relative',
    padding: wp('2.5%'),
    maxHeight: hp('50%'),
    minHeight: hp('35%'),
  },
  imageSrc: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    borderRadius: wp('2.5%'),
  },
  imageStyle: {
    borderRadius: wp('2%'),
  },
  positionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: wp('2.5%'),
  },
  position: {
    position: 'absolute',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: wp('25%'),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  positionBadgeText: {
    color: COLORS.textWhite,
    fontSize: wp('2%'),
    fontWeight: '900',
    textAlign: 'center',
    includeFontPadding: false,
  },
  progressContainer: {
    position: 'absolute',
    bottom: hp('1%'),
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
  },
  progress: {
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    width: '80%',
    borderRadius: wp('25%'),
    height: hp('3%'),
    position: 'relative',
    overflow: 'hidden',
  },
  progressBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.progressBg,
    borderRadius: wp('25%'),
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0.7,
    bottom: 0,
    borderRadius: wp('2.5%'),
    height: '99%',
    zIndex: 1,
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  progressText: {
    fontSize: wp('3.5%'),
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default RankingCard;
