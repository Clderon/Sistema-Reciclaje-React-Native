import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../utils/constants';

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
                        Puntos Totales{'\n'}
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
                        Misiones{'\n'}
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
                <Image
                  source={require('../assets/images/mas_insignia.webp')}
                  style={[styles.badgeItem, styles.badgeItemMore]}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => console.log('Edit profile')}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Editar Mi Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSettings}
                onPress={() => console.log('Settings')}
                activeOpacity={0.7}
              >
                <View style={styles.buttonIcon}>
                  <Image
                    source={require('../assets/images/configuracion.webp')}
                    style={styles.buttonImg}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
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
    paddingTop: 40,
    paddingBottom: 120,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  perfilCard: {
    backgroundColor: COLORS.target,
    borderRadius: 10, // 1rem
    borderWidth: 3,
    borderColor: COLORS.textContenido, // var(--colorTextContenido) en CSS original
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400, // 40rem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    borderTopLeftRadius: 10, // 1rem 1rem 0 0
    borderTopRightRadius: 10,
    height: 64, // 6.4rem
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
    height: 223, // 22.3rem
    position: 'relative',
    marginBottom: 10, // 1rem
  },
  backgroundSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '110%',
    zIndex: 1,
  },
  info: {
    width: 359, // 35.9rem
    height: 134, // 13.4rem
    position: 'absolute',
    top: 5, // 0.5rem
    alignSelf: 'center',
    zIndex: 2,
  },
  avatarWrapper: {
    width: 124, // 12.4rem
    height: 134, // 13.4rem
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    backgroundColor: COLORS.textContenido, // var(--colorTextContenido)
    borderRadius: 59, // 50%
    borderWidth: 1,
    borderColor: COLORS.textContenido,
    padding: 3,
    overflow: 'hidden',
    width: 118, // 11.8rem
    height: 118, // 11.8rem
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badge: {
    marginTop: -10, // -1rem
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
    width: 219, // 21.9rem
    height: 78, // 7.8rem
    position: 'absolute',
    left: 105, // 10.5rem
    top: 17, // 1.7rem
    backgroundColor: COLORS.avatarBrown, // var(--colorAvatarBrown)
    borderRadius: 10, // 1rem
    borderWidth: 1,
    borderColor: COLORS.textContenido,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameCardInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: 10, // 1rem
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    paddingVertical: 10, // 1rem
    paddingHorizontal: 9, // 0.9rem
    width: 210, // 21rem
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
    bottom: -10, // -10px
    zIndex: 2,
    backgroundColor: 'red',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  statInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: 10, // 1rem
    borderWidth: 2,
    borderColor: COLORS.textContenido,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'green',
  },
  statLabel: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: 11, // 1.1rem
    fontWeight: '800',
    lineHeight: 11, // 1.1
    width: '100%',
    includeFontPadding: false,
  },
  statValue: {
    color: COLORS.textContenido,
    textAlign: 'center',
    fontSize: 16, // 1.6rem
    letterSpacing: 1,
    fontWeight: '800',
    width: '100%',
    includeFontPadding: false,
  },
  badges: {
    width: '90%',
    marginTop: 15, // 1.5rem
    alignItems: 'center',
    gap: 12, // 1.2rem
  },
  badgesTitle: {
    fontWeight: '700',
    fontSize: 18, // 1.8rem
    color: COLORS.textContenido,
    paddingLeft: 10, // 1rem
    alignSelf: 'center',
    includeFontPadding: false,
  },
  badgesList: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: 10, // 1rem
    padding: 10, // 1rem
    flexDirection: 'row',
    gap: 10, // 1rem
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: 100, // 10rem
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
    padding: 10, // 1rem
    flexDirection: 'row',
    gap: 15, // 1.5rem
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 74, // 7.4rem
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