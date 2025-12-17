import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../utils/constants';

const RankingCard = ({ rankingData, onPositionPress, progressText, progressValue = 50 }) => {
  const getPositionStyle = (position) => {
    const positions = {
      1: { top: '5%', left: '53%', transform: [{ translateX: -20 }] }, // 40px avatar, centrar
      2: { top: '25%', left: '23%' },
      3: { top: '31%', left: '61%' },
      4: { top: '60%', left: '59%', transform: [{ translateX: -30 }] }, // 60px avatar, centrar
      5: { top: '71%', left: '20%' },
    };
    return positions[position] || {};
  };

  const getAvatarSize = (position) => {
    const sizes = {
      1: 40, // 4rem
      2: 50, // 5rem (silver)
      3: 65, // 6.5rem (bronze)
      4: 60, // 6rem
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
    padding: 10,
    maxHeight: 400,
    minHeight: 300,
  },
  imageSrc: {
    width: '100%',
    aspectRatio: 400 / 400,
    overflow: 'contain',
    borderWidth:3,
    borderColor: COLORS.textBorde,
    borderRadius: 10,
  },
  imageStyle: {
    borderRadius: 7,
  },
  positionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10, // 1rem padding de la imagen
  },
  position: {
    position: 'absolute',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionBadge: {
    position: 'absolute',
    bottom: -5, // -0.5rem
    left: '50%',
    transform: [{ translateX: -15 }], // Centrar el badge
    backgroundColor: COLORS.button,
    paddingVertical: 2, // 0.2rem
    paddingHorizontal: 6, // 0.6rem
    borderRadius: 10, // 1rem
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionBadgeText: {
    color: COLORS.textWhite,
    fontSize: 7, // 0.7rem
    fontWeight: '900',
    textAlign: 'center',
    includeFontPadding: false,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 10, // 1rem de distancia del bottom
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 10, // Padding del contenedor de la imagen
  },
  progress: {
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    width: '80%',
    borderRadius: 100, // 10rem
    height: 25, // 2rem
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
    borderRadius: 100,
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0.7,
    bottom: 0,
    borderRadius: 10, // 1rem
    height: '99%',
    zIndex: 1, // Por debajo del texto
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Por encima del degradado verde
  },
  progressText: {
    fontSize: 14, // 1.4rem
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default RankingCard;
