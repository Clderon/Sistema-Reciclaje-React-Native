import React, { useRef, useState } from 'react';
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
import AvatarNameCard from '../components/AvatarNameCard';
import BadgeItem from '../components/BadgeItem';
import ModalBadge from '../components/ModalBadge';

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
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const badgesData = [
    {
      id: 1,
      imageSource: require('../assets/images/logro_vidrioV2.png'),
      title: 'Maestro del Vidrio',
      description: 'Has reciclado más de 50 unidades de vidrio. ¡Eres un experto en darle una segunda vida a este material!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 2,
      imageSource: require('../assets/images/logro_caiman.png'),
      title: 'Guardián del Agua',
      description: 'Has completado 10 misiones de reciclaje relacionadas con la conservación del agua. ¡El planeta te lo agradece!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 3,
      imageSource: require('../assets/images/logro_capibarav2.png'),
      title: 'Protector de la Naturaleza',
      description: 'Has reciclado más de 100 kilos de materiales en total. ¡Eres un verdadero defensor del medio ambiente!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 4,
      imageSource: require('../assets/images/logro_perezoso.png'),
      title: 'Reciclador Consistente',
      description: 'Has reciclado durante 30 días consecutivos. ¡Tu dedicación es admirable!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 5,
      imageSource: require('../assets/images/logro_sajinoV2.png'),
      title: 'Líder del Reciclaje',
      description: 'Has alcanzado más de 500 puntos totales. ¡Eres un ejemplo para todos!',
      backgroundColor: COLORS.badgeBackground,
    },
    {
      id: 6,
      imageSource: require('../assets/images/logro_mono.png'),
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
                avatarSource={require('../assets/images/elefante.png')}
                name="Explorador Juan"
                level="Nivel: Hormiga"
                badge="ANT"
                showBadge={true}
                avatarSize={wp('30%')}
                avatarBorderWidth={5}
                avatarBorderColor={COLORS.textContenido}
                avatarWrapperBackgroundColor={'#A3DDEE'}

              />

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
                        Misiones cumplidas
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
      <ModalBadge
        visible={modalVisible}
        onClose={handleCloseModal}
        badge={selectedBadge}
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