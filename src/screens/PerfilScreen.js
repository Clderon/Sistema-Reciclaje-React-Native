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
    paddingTop: 75,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  perfilCard: {
    backgroundColor: COLORS.target,
    borderRadius: 20, // 1rem
    borderWidth: 3,
    borderColor: COLORS.textContenido,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400, // 40rem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    padding: 10,
    
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    borderTopLeftRadius: 10, // 1rem 1rem 0 0
    borderTopRightRadius: 10,
    height: 60, // 6.4rem
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
    fontSize: 20, // 2rem
    fontWeight: '700',
    paddingHorizontal: 10, // 1rem
    includeFontPadding: false,
  },
  section: {
    width: '100%',
    height: 230, // 22.3rem
    position: 'relative',
    marginBottom: 10, // 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  backgroundSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '105%',
    zIndex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  info: {
    width: 359, // 35.9rem
    height: 134, // 13.4rem
    position: 'absolute',
    top: 10, // 0.5rem
    alignSelf: 'center',
    zIndex: 2,
  },
  avatarWrapper: {
    width: 124, // 12.4rem
    height: 124, // 13.4rem
    position: 'absolute',
    left: 10,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatarContainer: {
    width: 120, // 11.8rem
    height: 120, // 11.8rem
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },
  badge: {
    marginTop: -15, // -1rem
    backgroundColor: COLORS.avatarBrown, // var(--colorAvatarBrown)
    borderRadius: 30, // 3rem
    borderWidth: 3,
    borderColor: COLORS.textContenido,
    paddingVertical: 4, // 0.4rem
    paddingHorizontal: 29, // 2.9rem
    zIndex: 2,
  },
  badgeText: {
    fontWeight: '700',
    fontSize: 14, // 1.4rem
    color: COLORS.textWhite,
    includeFontPadding: false,
  },
  nameCard: {
    width: 240, // aumentado para que se extienda más hacia el avatar
    height: 78, // 7.8rem
    position: 'absolute',
    left: 60, // movido más a la izquierda para que quede debajo del avatar
    top: 25, // centrado verticalmente con el avatar
    backgroundColor: COLORS.avatarBrown, // var(--colorAvatarBrown)
    borderRadius: 10, // 1rem
    borderWidth: 1,
    borderColor: COLORS.textContenido,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // detrás del avatar
  },
  nameCardInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: 10, // 1rem
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    paddingVertical: 10, // 1rem
    paddingLeft: 60, // espacio para el avatar superpuesto
    paddingRight: 12,
    width: '95%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    fontWeight: '700',
    fontSize: 16, // 1.6rem
    color: COLORS.textContenido,
    textAlign: 'right',
    width: '100%',
    includeFontPadding: false,
  },
  level: {
    fontWeight: '500',
    fontSize: 14, // 1.4rem
    color: COLORS.textContenido,
    textAlign: 'right',
    width: '100%',
    includeFontPadding: false,
  },
  stats: {
    paddingHorizontal: 10, // 1rem
    flexDirection: 'row',
    gap: 5, // 0.5rem
    justifyContent: 'space-between',
    width: '100%',
    height: 80, // 8rem
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
    backgroundColor: COLORS.avatarBrown, // var(--colorAvatarBrown)
    borderRadius: 10, // 1rem
    borderWidth: 1,
    borderColor: COLORS.textContenido,
    padding: 5, // 0.5rem
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
    borderRadius: 10, // 1rem
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'column',
    gap: 2,
    padding: 5, 
  },
  statLabel: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    width: '100%',
    includeFontPadding: false,
  },
  statValue: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: 18, // 1.6rem
    letterSpacing: 1,
    fontWeight: '800',
    width: '100%',
    includeFontPadding: false,
  },
  badges: {
    width: '100%',
    marginTop: 10, // 1.5rem
    alignItems: 'center',
    gap: 12, // 1.2rem
    marginTop: 10,
  },
  badgesTitle: {
    fontWeight: '700',
    fontSize: 22, // 1.8rem
    color: COLORS.textContenido,
    paddingLeft: 10, // 1rem
    alignSelf: 'center',
    includeFontPadding: false,
  },
  badgesList: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: 10, // 1rem
    padding: 10, // 
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // 1rem
    justifyContent: 'space-around',
    width: '100%',
    minHeight: 100,
  },
  badgeItemWrapper: {
    width: 79, // 7.9rem
    height: 79, // 7.9rem
    flexShrink: 0,
  },
  badgeItem: {
    width: 79, // 7.9rem
    height: 79, // 7.9rem
  },
  badgeItemMore: {
    // Para mas_insignia.webp
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15, // 1.5rem
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 70, // 7.4rem
    paddingVertical: 10,
  },
  buttonEdit: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: 10, // 1rem
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    paddingVertical: 10, // 1rem
    paddingHorizontal: 20, // 2rem
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textContenido,
    fontWeight: '700',
    fontSize: 20, // 2rem
    includeFontPadding: false,
  },
  buttonSettings: {
    flexShrink: 0,
    width: 58, // 5.8rem
    height: '100%',
    backgroundColor: COLORS.targetFondo,
    borderRadius: 10, // 1rem
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
    width: 30, // 3rem
    height: 30, // 3rem
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImg: {
    width: '100%',
    height: '100%',
  },
});

export default PerfilScreen;