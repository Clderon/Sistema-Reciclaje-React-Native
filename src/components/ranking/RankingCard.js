import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../utils/constants';
import RankingUserCard from './RankingUserCard';

const RankingCard = ({ 
  rankingData, 
  onPositionPress, 
  progressText, 
  progressValue = 50,
  avatarSize = wp('12%'),
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const previousValue = useRef(0);

  useEffect(() => {
    // Siempre empezar desde 0 cuando cambia progressText (cambio de tab/usuario)
    // Esto asegura que siempre se vea la animación al entrar a la sección
    animatedWidth.setValue(0);

    // Animar desde 0 hasta el nuevo progressValue
    Animated.timing(animatedWidth, {
      toValue: progressValue,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      // Guardar el valor final para referencia
      previousValue.current = progressValue;
    });
  }, [progressValue, progressText]);

  const getPositionStyle = (position) => {
    const positions = {
      1: { top: '5%', left: '53%', transform: [{ translateX: -avatarSize / 2 }] },
      2: { top: '25%', left: '23%' },
      3: { top: '35%', left: '61%' },
      4: { top: '60%', left: '65%', transform: [{ translateX: -avatarSize / 2 }] },
      5: { top: '71%', left: '20%' },
    };
    return positions[position] || {};
  };


  return (
    <View style={styles.rankingImage}>
      <ImageBackground
        source={require('../../assets/images/Fondo-Ranking-HD.webp')}
        style={styles.imageSrc}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.positionsContainer}>
          {rankingData.slice(0, 5).map((user) => {
            const positionStyle = getPositionStyle(user.position);

            return (
              <RankingUserCard
                key={user.id}
                user={user}
                position={user.position}
                onPress={() => onPositionPress && onPositionPress(user)}
                avatarSize={avatarSize}
                showPositionBadge={false}
                showName={false}
                containerStyle={[styles.position, positionStyle]}
                avatarWrapperBackgroundColor={COLORS.avatarNameCardBorder}
              />
            );
          })}
        </View>
        
        {/* Barra de progreso dentro de la imagen, en el bottom */}
        {progressText && (
          <View style={styles.progressContainer}>
            <View style={styles.progress}>
              {/* Fondo de la barra */}
              <View style={styles.progressBg} />
              {/* Degradado verde del progreso - animado desde 0 hasta progressValue */}
              <Animated.View
                style={[
                  styles.progressFillAnimated,
                  {
                    width: animatedWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              >
                <LinearGradient
                  colors={[COLORS.progressStart, COLORS.progressMid, COLORS.progressEnd]}
                  locations={[0, 0.6, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.progressFillGradient}
                />
              </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    margin: 0,
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
  progressFillAnimated: {
    position: 'absolute',
    left: 0,
    top: 1,
    bottom: 0,
    borderRadius: wp('2.5%'),
    zIndex: 1,
    overflow: 'hidden',
  },
  progressFillGradient: {
    width: '100%',
    height: '100%',
    borderRadius: wp('2.5%'),
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
