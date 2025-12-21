import React, { useRef, useState, useCallback } from 'react';
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
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';
import AvatarNameCard from '../components/profile/AvatarNameCard';
import BadgeItem from '../components/badges/BadgeItem';
import ModalBadge from '../components/badges/ModalBadge';
import ModalAjustes from '../components/common/ModalAjustes';
import { useAuth } from '../context/AuthContext';
import { getUserAvatar } from '../utils/avatarHelper';
import { useFocusEffect } from '@react-navigation/native';
import { getUserById } from '../services/userService';

// Función para abreviar nombres largos de niveles
const abbreviateLevelName = (levelName) => {
  if (!levelName) return '';
  
  // Abreviaciones específicas para niveles conocidos
  const levelLower = levelName.toLowerCase();
  
  if (levelLower.includes('oso perezoso') || levelName === 'Oso Perezoso') {
    return 'Oso P.';
  }
  
  if (levelLower.includes('gallito') && (levelLower.includes('rocas') || levelLower.includes('roca'))) {
    return 'Gallito R.';
  }
  
  // Si el nombre es muy largo (más de 10 caracteres), abreviar
  if (levelName.length > 10) {
    const words = levelName.split(' ');
    if (words.length > 1) {
      // Tomar primera palabra + inicial de la segunda palabra con punto
      const firstWord = words[0];
      const secondInitial = words[1]?.[0]?.toUpperCase() || '';
      return secondInitial ? `${firstWord} ${secondInitial}.` : firstWord;
    }
    // Si es una sola palabra larga, truncar a 10 caracteres
    return levelName.substring(0, 10) + '.';
  }
  
  return levelName;
};

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
  const { user, signOut, updateUser } = useAuth();
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAjustesVisible, setModalAjustesVisible] = useState(false);

  // Obtener datos del usuario o valores por defecto
  const userName = user?.username || 'Usuario';
  const userLevel = user?.currentLevel || 'Hormiga';
  const totalPoints = user?.totalPoints || 0;
  const totalRecyclings = user?.totalRecyclings || 0;
  const approvedRequestsCount = user?.approvedRequestsCount || 0;

  const handleLogout = async () => {
    setModalAjustesVisible(false);
    await signOut();
    // El App.js detectará automáticamente el cambio en isAuthenticated
    // y mostrará la pantalla de Login
  };

  const badgesData = [
    {
      id: 1,
      imageSource: require('../assets/images/logro_vidrioV2.webp'),
      title: 'Maestro del Vidrio',
      description: 'Has reciclado más de 50 unidades de vidrio. ¡Eres un experto en darle una segunda vida a este material!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 2,
      imageSource: require('../assets/images/logro_caiman.webp'),
      title: 'Guardián del Agua',
      description: 'Has completado 10 misiones de reciclaje relacionadas con la conservación del agua. ¡El planeta te lo agradece!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 3,
      imageSource: require('../assets/images/logro_capibarav2.webp'),
      title: 'Protector de la Naturaleza',
      description: 'Has reciclado más de 100 kilos de materiales en total. ¡Eres un verdadero defensor del medio ambiente!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 4,
      imageSource: require('../assets/images/logro_perezoso.webp'),
      title: 'Reciclador Consistente',
      description: 'Has reciclado durante 30 días consecutivos. ¡Tu dedicación es admirable!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 5,
      imageSource: require('../assets/images/logro_sajinoV2.webp'),
      title: 'Líder del Reciclaje',
      description: 'Has alcanzado más de 500 puntos totales. ¡Eres un ejemplo para todos!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 6,
      imageSource: require('../assets/images/logro_mono.webp'),
      title: 'Leyenda del Reciclaje',
      description: 'Has completado todas las misiones disponibles. ¡Eres una verdadera leyenda del reciclaje!',
      backgroundColor: COLORS.badgeBackground,
      isLocked: true,
    },
  ];

  const handleBadgePress = (badge) => {
    if (!badge.isLocked) {
      setSelectedBadge(badge);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBadge(null);
  };

  // Refrescar datos del usuario para obtener puntos y nivel actualizados
  const refreshUserData = React.useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const result = await getUserById(user.id);
      if (result.success && result.user) {
        updateUser(result.user);
      }
    } catch (error) {
      console.error('Error refrescando datos del usuario:', error);
    }
  }, [user?.id, updateUser]);

  // Refrescar cuando la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        refreshUserData();
      }
    }, [user?.id])
  );

  // Función para obtener el badge según el nivel
  const getLevelBadge = (level) => {
    const levelMap = {
      'Hormiga': 'ANT',
      'Oso Perezoso': 'SLOTH',
      'Mono': 'MONKEY',
      'Elefante': 'ELEPHANT',
      'Gallito de las Rocas': 'ROCK',
    };
    return levelMap[level] || 'ANT';
  };

  // Función para obtener el avatar del usuario actual
  const getAvatarSource = () => {
    // Si el usuario tiene avatar_url, lo usaremos en el futuro
    // Por ahora, asignar avatar aleatorio pero consistente basado en el ID
    return getUserAvatar(user?.id, user?.avatarUrl);
  };

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
          decelerationRate="normal"
          bounces={true}
          overScrollMode="always"
          scrollEventThrottle={16}
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
              <AvatarNameCard
                avatarSource={getAvatarSource()}
                name={userName}
                level={`Nivel: ${userLevel}`}
                badge={getLevelBadge(userLevel)}
                showBadge={true}
                avatarSize={wp('26%')}
                avatarBorderWidth={5}
                avatarBorderColor={COLORS.textContenido}
                avatarWrapperBackgroundColor={'#A3DDEE'}
                infoPaddingTop={hp('1.5%')}
              />

              {/* Estadísticas */}
              <View style={styles.stats}>
                <View style={styles.stat}>
                  <View style={styles.statOuter}>
                    <View style={styles.statInner}>
                      <Text style={styles.statLabel}>
                        Puntos Totales
                      </Text>
                      <Text style={styles.statValue}>{totalPoints}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.stat}>
                  <View style={styles.statOuter}>
                    <View style={styles.statInner}>
                      <Text style={styles.statLabel}>
                        Reciclajes{'\n'}
                        Totales
                      </Text>
                      <Text style={styles.statValue}>{totalRecyclings}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.stat}>
                  <View style={styles.statOuter}>
                    <View style={styles.statInner}>
                      <Text style={styles.statLabel}>
                        Misiones{'\n'}Completadas
                      </Text>
                      <Text style={[styles.statValue, { fontSize: wp('5.5%') }]}>
                        {approvedRequestsCount}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Badges Section */}
            <View style={styles.badges}>
              <Text style={styles.badgesTitle}>Mis insignias</Text>
              <View style={styles.badgesList}>
                {badgesData.map((badge) => (
                  <BadgeItem
                    key={badge.id}
                    imageSource={badge.imageSource}
                    backgroundColor={badge.backgroundColor}
                    isLocked={badge.isLocked}
                    onPress={() => handleBadgePress(badge)}
                  />
                ))}
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
                onPress={() => setModalAjustesVisible(true)}
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
      <ModalBadge
        visible={modalVisible}
        onClose={handleCloseModal}
        badge={selectedBadge}
      />
      <ModalAjustes
        visible={modalAjustesVisible}
        onClose={() => setModalAjustesVisible(false)}
        onLogout={handleLogout}
      />
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
    shadowColor: COLORS.textBorde,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('2%'),
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    borderTopLeftRadius: wp('2.5%'),
    borderTopRightRadius: wp('2.5%'),
    height: hp('5%'),
    overflow: 'hidden',
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
    height: hp('32.5%'),
    borderBottomLeftRadius: wp('2.5%'),
    borderBottomRightRadius: wp('2.5%'),
    flexDirection: 'column',
    overflow: 'hidden',
  },
  backgroundSection: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    borderBottomLeftRadius: wp('2.5%'),
    borderBottomRightRadius: wp('2.5%'),
    overflow: 'hidden',
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
    fontSize: wp('3%'),
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
  badges: {
    width: '100%',
    marginTop: hp('1%'),
    alignItems: 'center',
  },
  badgesTitle: {
    fontWeight: '700',
    fontSize: wp('6%'),
    color: COLORS.textContenido,
    marginBottom: hp('1.5%'),
    includeFontPadding: false,
  },
  badgesList: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2.5%'),
    padding: wp('2.5%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    minHeight: hp('12%'),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingHorizontal: wp('15%'),
    flex: 1,
    alignItems: 'center',
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
    shadowColor: COLORS.textBorde,
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