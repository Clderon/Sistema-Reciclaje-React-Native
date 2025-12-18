import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';

const AnimatedButton = ({ children, onPress, style }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const PerfilScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/frame-5.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          decelerationRate={0.75}
          bounces={false}
        >
          <View style={styles.perfilCard}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Mi Mochila de Explorador</Text>
              </View>
            </View>

            {/* Profile Section */}
            <View style={styles.section}>
              <Image
                source={require('../assets/images/fondo_.webp')}
                style={styles.backgroundSection}
                resizeMode="cover"
              />
              
              {/* Contenedor de información (avatar y nombre) */}
              <View style={styles.info}>
                {/* Avatar y badge */}
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={require('../assets/images/avatar.webp')}
                      style={styles.avatar}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>ANT</Text>
                  </View>
                </View>

                {/* Tarjeta de nombre y nivel */}
                <View style={styles.nameCard}>
                  <View style={styles.nameCardInner}>
                    <Text style={styles.name}>Explorador Juan</Text>
                    <Text style={styles.level}>Nivel: Hormiga</Text>
                  </View>
                </View>
              </View>

              {/* Estadísticas */}
              <View style={styles.stats}>
                <View style={styles.stat}>
                  <View style={styles.statOuter}>
                    <View style={styles.statInner}>
                      <Text style={styles.statLabel}>
                        Puntos Totales
                      </Text>
                      <Text style={styles.statValue}>150</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.stat}>
                  <View style={styles.statOuter}>
                    <View style={styles.statInner}>
                      <Text style={styles.statLabel}>
                        Kilos{'\n'}
                        Reciclados
                      </Text>
                      <Text style={styles.statValue}>52.3</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.stat}>
                  <View style={styles.statOuter}>
                    <View style={styles.statInner}>
                      <Text style={styles.statLabel}>
                        Misiones
                      </Text>
                      <Text style={styles.statValue}>8</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Badges Section */}
            <View style={styles.badges}>
              <Text style={styles.badgesTitle}>Mis insignias</Text>
              <View style={styles.badgesList}>
                <View style={styles.badgeItemWrapper}>
                  <Image
                    source={require('../assets/images/insignia.webp')}
                    style={styles.badgeItem}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.badgeItemWrapper}>
                  <Image
                    source={require('../assets/images/insignia.webp')}
                    style={styles.badgeItem}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.badgeItemWrapper}>
                  <Image
                    source={require('../assets/images/insignia.webp')}
                    style={styles.badgeItem}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.badgeItemWrapper}>
                  <Image
                    source={require('../assets/images/insignia.webp')}
                    style={styles.badgeItem}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.badgeItemWrapper}>
                  <Image
                    source={require('../assets/images/insignia.webp')}
                    style={styles.badgeItem}
                    resizeMode="cover"
                  />
                </View>
                <Image
                  source={require('../assets/images/mas_insignia.webp')}
                  style={[styles.badgeItem, styles.badgeItemMore]}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <AnimatedButton
                style={styles.buttonEdit}
                onPress={() => console.log('Edit profile')}
              >
                <Text style={styles.buttonText}>Editar Mi Perfil</Text>
              </AnimatedButton>
              <AnimatedButton
                style={styles.buttonSettings}
                onPress={() => console.log('Settings')}
              >
                <View style={styles.buttonIcon}>
                  <Image
                    source={require('../assets/images/configuracion.webp')}
                    style={styles.buttonImg}
                    resizeMode="cover"
                  />
                </View>
              </AnimatedButton>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondoFallback,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingTop: hp('8%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    paddingBottom: hp('15%'),
  },
  perfilCard: {
    backgroundColor: COLORS.target,
    borderRadius: wp('5%'),
    borderWidth: 3,
    borderColor: COLORS.textContenido,
    overflow: 'hidden',
    width: '100%',
    maxWidth: wp('95%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    padding: wp('2.5%'),
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    borderTopLeftRadius: wp('2.5%'),
    borderTopRightRadius: wp('2.5%'),
    height: hp('7%'),
    position: 'relative',
    overflow: 'hidden',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: wp('5%'),
    fontWeight: '700',
    paddingHorizontal: wp('2.5%'),
    includeFontPadding: false,
  },
  section: {
    width: '100%',
    height: hp('28%'),
    position: 'relative',
    marginBottom: hp('1%'),
    borderBottomLeftRadius: wp('2.5%'),
    borderBottomRightRadius: wp('2.5%'),
  },
  backgroundSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '105%',
    zIndex: 1,
    borderBottomLeftRadius: wp('2.5%'),
    borderBottomRightRadius: wp('2.5%'),
  },
  info: {
    width: wp('90%'),
    height: hp('16%'),
    position: 'absolute',
    top: hp('1%'),
    alignSelf: 'center',
    zIndex: 2,
  },
  avatarWrapper: {
    width: wp('30%'),
    height: wp('30%'),
    position: 'absolute',
    left: wp('2%'),
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatarContainer: {
    width: wp('28%'),
    height: wp('28%'),
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('2%'),
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
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
    fontSize: wp('3.5%'),
    color: COLORS.textWhite,
    includeFontPadding: false,
  },
  nameCard: {
    width: wp('58%'),
    height: hp('9%'),
    position: 'absolute',
    left: wp('15%'),
    top: hp('3%'),
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
    fontSize: wp('4%'),
    color: COLORS.textContenido,
    textAlign: 'right',
    width: '100%',
    includeFontPadding: false,
  },
  level: {
    fontWeight: '500',
    fontSize: wp('3.5%'),
    color: COLORS.textContenido,
    textAlign: 'right',
    width: '100%',
    includeFontPadding: false,
  },
  stats: {
    paddingHorizontal: wp('2.5%'),
    flexDirection: 'row',
    gap: wp('1%'),
    justifyContent: 'space-between',
    width: '100%',
    height: hp('10%'),
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 2,
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'column',
    gap: 2,
    padding: wp('1%'),
  },
  statLabel: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: wp('3.2%'),
    fontWeight: '800',
    width: '100%',
    includeFontPadding: false,
  },
  statValue: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: wp('4.5%'),
    letterSpacing: 1,
    fontWeight: '800',
    width: '100%',
    includeFontPadding: false,
  },
  badges: {
    width: '100%',
    marginTop: hp('1%'),
    alignItems: 'center',
    gap: hp('1.5%'),
  },
  badgesTitle: {
    fontWeight: '700',
    fontSize: wp('5.5%'),
    color: COLORS.textContenido,
    paddingLeft: wp('2.5%'),
    alignSelf: 'center',
    includeFontPadding: false,
  },
  badgesList: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    padding: wp('2.5%'),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2.5%'),
    justifyContent: 'space-around',
    width: '100%',
    minHeight: hp('12%'),
  },
  badgeItemWrapper: {
    width: wp('18%'),
    height: wp('18%'),
    flexShrink: 0,
  },
  badgeItem: {
    width: wp('18%'),
    height: wp('18%'),
  },
  badgeItemMore: {
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: wp('4%'),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: hp('8%'),
    paddingVertical: hp('1%'),
  },
  buttonEdit: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textContenido,
    fontWeight: '700',
    fontSize: wp('5%'),
    includeFontPadding: false,
  },
  buttonSettings: {
    flexShrink: 0,
    width: wp('14%'),
    height: '100%',
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -11 },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: wp('7%'),
    height: wp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImg: {
    width: '100%',
    height: '100%',
  },
});

export default PerfilScreen;