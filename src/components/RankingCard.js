import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { COLORS } from '../utils/constants';

const RankingCard = ({ rankingData, onPositionPress }) => {
  const getPositionStyle = (position) => {
    const positions = {
      1: { top: '5%', left: '50%', marginLeft: -20 },
      2: { top: '20%', left: '15%' },
      3: { top: '30%', right: '10%' },
      4: { top: '50%', left: '10%' },
      5: { top: '60%', right: '15%' },
    };
    return positions[position] || {};
  };

  const getAvatarStyle = (position) => {
    const sizes = {
      1: { width: 40, height: 40 },
      2: { width: 50, height: 50 },
      3: { width: 65, height: 65 },
      4: { width: 60, height: 60 },
      5: { width: 60, height: 60 },
    };
    return sizes[position] || { width: 60, height: 60 };
  };

  const getAvatarBorder = (position) => {
    if (position === 1) return { borderColor: '#FFD700', borderWidth: 3 };
    if (position === 2) return { borderColor: '#C0C0C0', borderWidth: 3 };
    if (position === 3) return { borderColor: '#CD7F32', borderWidth: 3 };
    return { borderColor: COLORS.textBorde, borderWidth: 2 };
  };

  return (
    <View style={styles.rankingImageContainer}>
      <ImageBackground
        source={require('../assets/images/Fondo-Ranking-HD.webp')}
        style={styles.rankingImage}
        resizeMode="contain"
      >
        <View style={styles.positionsContainer}>
          {rankingData.slice(0, 5).map((user) => {
            const positionStyle = getPositionStyle(user.position);
            const avatarStyle = getAvatarStyle(user.position);
            const avatarBorder = getAvatarBorder(user.position);

            return (
              <TouchableOpacity
                key={user.id}
                style={[styles.position, positionStyle]}
                onPress={() => onPositionPress(user)}
                activeOpacity={0.7}
              >
                <View style={[styles.avatar, avatarStyle, avatarBorder]}>
                  <Image source={user.avatar} style={avatarStyle} resizeMode="contain" />
                </View>
                <View style={styles.positionBadge}>
                  <Text style={styles.positionBadgeText}>{user.position}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  rankingImageContainer: {
    width: '100%',
    aspectRatio: 400 / 300,
    position: 'relative',
    marginVertical: 20,
  },
  rankingImage: {
    width: '100%',
    height: '100%',
  },
  positionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  position: {
    position: 'absolute',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  positionBadge: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -15,
    backgroundColor: COLORS.button,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionBadgeText: {
    color: COLORS.textWhite,
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
  },
});

export default RankingCard;
