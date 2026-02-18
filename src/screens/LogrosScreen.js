import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';
import RankingCard from '../components/ranking/RankingCard';
import CardInfo from '../components/profile/CardInfo';
import RankingUserCard from '../components/ranking/RankingUserCard';
import { COLORS } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { getStudentsRanking } from '../services/rankingService';
import { getUserAvatar } from '../utils/avatarHelper';
import { getUserById } from '../services/userService';

const LogrosScreen = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('estudiantes');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reanimated: Shared values para animaciones
  const tabIndex = useSharedValue(0); // 0 = estudiantes, 1 = salones
  const scrollX = useSharedValue(0);
  const tabLayouts = useSharedValue({ width: 0, x: 0 }); // Layout del contenedor de tabs

  // Función para determinar el nivel según puntos (igual que en backend)
  // Niveles: Hormiga (0-199), Oso Perezoso (200-399), Mono (400-599), Elefante (600-799), Gallito de las Rocas (800+)
  const getLevelByPoints = (totalPoints) => {
    if (totalPoints >= 800) return 'Gallito de las Rocas';
    if (totalPoints >= 600) return 'Elefante';
    if (totalPoints >= 400) return 'Mono';
    if (totalPoints >= 200) return 'Oso Perezoso';
    return 'Hormiga';
  };

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

  // Función para formatear datos del ranking del backend al formato esperado
  const formatRankingData = (backendRankings) => {
    return backendRankings.map((user) => {
      const level = user.level || getLevelByPoints(user.points || 0);
      return {
        id: user.id,
        name: user.name || user.username || 'Usuario',
        level: level,
        badge: getLevelBadge(level),
        points: user.points || 0,
        recyclings: user.recyclings || user.total_recyclings || 0,
        // Asignar avatar aleatorio pero consistente basado en el ID del usuario
        avatar: getUserAvatar(user.id, user.avatar_url),
        position: user.position || 0,
      };
    });
  };

  // Cargar ranking desde el backend
  const loadRanking = async () => {
    if (activeTab !== 'estudiantes') {
      // Por ahora solo implementamos estudiantes, salones después
      setRankingData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await getStudentsRanking(20); // Obtener top 20
      if (result.success) {
        const formattedData = formatRankingData(result.rankings);
        setRankingData(formattedData);
      } else {
        console.error('Error al cargar ranking:', result.error);
        setRankingData([]);
      }
    } catch (error) {
      console.error('Error al cargar ranking:', error);
      setRankingData([]);
    } finally {
      setLoading(false);
    }
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

  // Sincronizar tabIndex con activeTab
  useEffect(() => {
    const newIndex = activeTab === 'estudiantes' ? 0 : 1;
    // Usar withTiming para control preciso de duración (250ms)
    tabIndex.value = withTiming(newIndex, {
      duration: 150, // 0.25s - tiempo óptimo para buena UX
      easing: Easing.out(Easing.ease), // Easing suave: no brusco ni muy lento
    });
    // Usar el ancho del rankingCard (95% del ancho de pantalla)
    const contentWidth = wp('95%');
    scrollX.value = withTiming(newIndex * contentWidth, {
      duration: 250, // Misma duración para sincronización
      easing: Easing.out(Easing.ease), // Mismo easing para consistencia
    });
  }, [activeTab]);

  // Recargar cuando la pantalla recibe foco o cambia el tab
  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        refreshUserData(); // Refrescar datos del usuario
      }
      loadRanking();
      // Incrementar la key para forzar el remontaje y ejecutar la animación
      setAnimationKey(prev => prev + 1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, user?.id])
  );

  // Función para cambiar de tab con animación
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Calcular valores fuera del worklet (no se puede usar wp dentro de worklets)
  const borderRadiusValue = wp('2.5%');

  // Animación del fondo que se desplaza entre tabs
  const backgroundStyle = useAnimatedStyle(() => {
    // ============================================
    // CONFIGURACIÓN DEL DESPLAZAMIENTO
    // ============================================
    // tabWidth: Ancho de cada tab (50% del contenedor)
    const tabWidth = tabLayouts.value.width > 0 ? tabLayouts.value.width / 2 : 0;
    
    // translateX: Cantidad de movimiento horizontal
    // tabIndex 0 = 0 (sin desplazamiento, primer tab)
    // tabIndex 1 = tabWidth (desplazado a la derecha, segundo tab)
    const translateX = tabIndex.value * tabWidth;
    
    // ============================================
    // CONFIGURACIÓN DEL BORDER RADIUS
    // ============================================
    // tabIndex 0 (estudiantes) = border radius DERECHA
    // tabIndex 1 (salones) = border radius IZQUIERDA
    const topLeftRadius = interpolate(
      tabIndex.value,
      [0, 1],
      [0, borderRadiusValue], // 0 = sin radius izquierda, 1 = con radius izquierda
      Extrapolate.CLAMP
    );
    const bottomLeftRadius = interpolate(
      tabIndex.value,
      [0, 1],
      [0, borderRadiusValue], // 0 = sin radius izquierda, 1 = con radius izquierda
      Extrapolate.CLAMP
    );
    const topRightRadius = interpolate(
      tabIndex.value,
      [0, 1],
      [borderRadiusValue, 0], // 0 = con radius derecha, 1 = sin radius derecha
      Extrapolate.CLAMP
    );
    const bottomRightRadius = interpolate(
      tabIndex.value,
      [0, 1],
      [borderRadiusValue, 0], // 0 = con radius derecha, 1 = sin radius derecha
      Extrapolate.CLAMP
    );
    
    return {
      transform: [{ 
        translateX: withTiming(translateX, {
          // ============================================
          // CONFIGURACIÓN DE LA ANIMACIÓN TIMING
          // ============================================
          duration: 250, // Duración: 250ms (0.25s) - tiempo óptimo para UX
          easing: Easing.out(Easing.ease), // Easing suave: empieza rápido, termina suave (no brusco)
          // Opciones de easing disponibles:
          // Easing.linear - movimiento constante
          // Easing.ease - suave inicio y fin
          // Easing.easeIn - lento inicio, rápido fin
          // Easing.easeOut - rápido inicio, lento fin (recomendado)
          // Easing.easeInOut - suave inicio y fin
        })
      }],
      width: tabWidth || '50%',
      borderTopLeftRadius: topLeftRadius,
      borderBottomLeftRadius: bottomLeftRadius,
      borderTopRightRadius: topRightRadius,
      borderBottomRightRadius: bottomRightRadius,
    };
  });

  // Animación del contenido (slide horizontal)
  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -scrollX.value }],
    };
  });

  // Calcular progreso hacia el siguiente nivel
  const calculateProgress = () => {
    const totalPoints = user?.totalPoints || 0;
    // Siempre calcular el nivel basado en los puntos actuales, no confiar en currentLevel de la BD
    // Esto asegura que si el nivel está desactualizado en la BD, se use el correcto
    const calculatedLevel = getLevelByPoints(totalPoints);
    const currentLevel = calculatedLevel; // Usar siempre el nivel calculado
    
    // Definir los umbrales de puntos para cada nivel (según backend corregido)
    // Hormiga 0-199, Oso Perezoso 200-399, Mono 400-599, Elefante 600-799, Gallito de las Rocas 800+
    const levelThresholds = {
      'Hormiga': { min: 0, next: 200, nextLevel: 'Oso Perezoso' },
      'Oso Perezoso': { min: 200, next: 400, nextLevel: 'Mono' },
      'Mono': { min: 400, next: 600, nextLevel: 'Elefante' },
      'Elefante': { min: 600, next: 800, nextLevel: 'Gallito de las Rocas' },
      'Gallito de las Rocas': { min: 800, next: null, nextLevel: null }, // Nivel máximo
    };

    const threshold = levelThresholds[currentLevel] || levelThresholds['Hormiga'];
    
    // Si está en el nivel máximo o no hay siguiente nivel
    if (!threshold.nextLevel || !threshold.next) {
      return {
        progressValue: 100,
        pointsRemaining: 0,
        progressText: '¡Nivel máximo alcanzado!',
      };
    }

    // Calcular puntos en el nivel actual (desde el mínimo del nivel)
    const pointsInCurrentLevel = Math.max(0, totalPoints - threshold.min);
    
    // Calcular puntos necesarios para el siguiente nivel (rango del nivel actual)
    const pointsNeededForNext = threshold.next - threshold.min;
    
    // Calcular porcentaje de progreso (0-100%)
    const progressPercentage = Math.min(100, Math.max(0, (pointsInCurrentLevel / pointsNeededForNext) * 100));
    
    // Calcular puntos faltantes para el siguiente nivel
    const pointsRemaining = Math.max(0, threshold.next - totalPoints);

    return {
      progressValue: progressPercentage,
      pointsRemaining,
      progressText: `Faltan ${pointsRemaining} puntos para ${threshold.nextLevel}`,
    };
  };

  const handlePositionPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  // Encontrar usuarios cercanos al usuario actual para la sección "Rivales Cercanos"
  // Para docentes, mostrar los top 3 recicladores
  const getNearbyUsers = () => {
    if (!rankingData.length) {
      return [];
    }

    // Si es docente, mostrar los primeros 3 del ranking (top recicladores)
    if (user?.role === 'teacher') {
      return rankingData.slice(0, 3);
    }

    // Para estudiantes, mostrar usuarios cercanos al usuario actual
    if (!user) {
      return [];
    }

    const currentUserPosition = rankingData.findIndex(u => u.id === user.id);
    
    if (currentUserPosition === -1) {
      // Usuario no está en el top, mostrar últimos 3
      return rankingData.slice(-3);
    }

    // Mostrar usuario anterior, actual, y siguiente
    const start = Math.max(0, currentUserPosition - 1);
    const end = Math.min(rankingData.length, currentUserPosition + 2);
    return rankingData.slice(start, end);
  };

  // Obtener usuarios para el podio (solo para docentes)
  const getPodiumUsers = () => {
    const top3 = rankingData.slice(0, 3);
    // Orden: tercero (izq), primero (centro), segundo (der)
    return [
      top3[2] || null, // Tercero - izquierda
      top3[0] || null, // Primero - centro
      top3[1] || null, // Segundo - derecha
    ];
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
          <View style={styles.rankingCard}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Ranking de la Selva</Text>
            </View>

            {/* Tabs */}
            <View 
              style={styles.tabs}
              onLayout={(event) => {
                const { width, x } = event.nativeEvent.layout;
                tabLayouts.value = { width, x };
              }}
            >
              {/* Fondo animado que se desplaza */}
              <Animated.View style={[styles.tabBackground, backgroundStyle]} />
              
              <TouchableOpacity
                style={[styles.tab, styles.tabFirst, activeTab === 'estudiantes' && styles.tabActive]}
                onPress={() => handleTabChange('estudiantes')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'estudiantes' && styles.tabTextActive,
                  ]}
                >
                  Ranking Estudiantes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab, 
                  styles.tabLast, 
                  activeTab === 'salones' && styles.tabActive,
                  activeTab === 'salones' && styles.tabLastActive,
                ]}
                onPress={() => handleTabChange('salones')}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.tabText, activeTab === 'salones' && styles.tabTextActive]}
                >
                  Ranking Salones
                </Text>
              </TouchableOpacity>
            </View>

            {/* Ranking Content - Tab Pager con animación de slide */}
            <View style={styles.contentContainer}>
              <Animated.View style={[styles.contentPager, contentStyle]}>
                {/* Tab 1: Ranking Estudiantes */}
                <View style={[styles.contentPage, { width: wp('95%') }]}>
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color={COLORS.button} />
                      <Text style={styles.loadingText}>Cargando ranking...</Text>
                    </View>
                  ) : rankingData.length > 0 ? (
                    <View style={styles.rankingCardWrapper}>
                      <RankingCard 
                        key={`estudiantes-${animationKey}`}
                        rankingData={rankingData} 
                        onPositionPress={handlePositionPress}
                        progressText={calculateProgress().progressText}
                        progressValue={calculateProgress().progressValue}
                        avatarSize={wp('16%')}
                        avatarWrapperBackgroundColor={COLORS.avatarNameCardBorder}
                      />
                    </View>
                  ) : (
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No hay datos de ranking disponibles</Text>
                    </View>
                  )}

                  {/* Rivals Section / Top Recicladores */}
                  {!loading && rankingData.length > 0 && (
                    <View style={styles.rivals}>
                      <Text style={styles.rivalsTitle}>
                        {user?.role === 'teacher' 
                          ? 'Top Recicladores' 
                          : 'Rivales Cercanos'}
                      </Text>
                      <View style={styles.rivalsList}>
                        {user?.role === 'teacher' ? (
                          // Podio para docentes: tercero (izq), primero (centro), segundo (der)
                          getPodiumUsers().map((podiumUser, index) => {
                            if (!podiumUser) return <View key={`empty-${index}`} style={{ flex: 1 }} />;
                            return (
                              <RankingUserCard
                                key={podiumUser.id}
                                user={{
                                  id: podiumUser.id,
                                  name: podiumUser.name,
                                  avatar: podiumUser.avatar,
                                }}
                                position={podiumUser.position}
                                isCurrentUser={false}
                                containerBackgroundColor={COLORS.targetFondo}
                                containerPadding={wp('1%')}
                                containerBorderRadius={wp('2%')}
                                containerBorderWidth={1}
                                onPress={() => handlePositionPress(podiumUser)}
                              />
                            );
                          })
                        ) : (
                          // Lista normal para estudiantes
                          getNearbyUsers().slice(0, 3).map((nearbyUser) => (
                            <RankingUserCard
                              key={nearbyUser.id}
                              user={{
                                id: nearbyUser.id,
                                name: nearbyUser.name,
                                avatar: nearbyUser.avatar,
                              }}
                              position={nearbyUser.position}
                              isCurrentUser={nearbyUser.id === user?.id}
                              containerBackgroundColor={COLORS.targetFondo}
                              containerPadding={wp('1%')}
                              containerBorderRadius={wp('2%')}
                              containerBorderWidth={1}
                              onPress={() => handlePositionPress(nearbyUser)}
                            />
                          ))
                        )}
                      </View>
                    </View>
                  )}
                </View>

                {/* Tab 2: Ranking Salones */}
                <View style={[styles.contentPage, { width: wp('95%') }]}>
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Ranking de Salones - Próximamente</Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Card Info Modal */}
      <CardInfo
        visible={modalVisible}
        onClose={handleCloseModal}
        userData={selectedUser}
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
    paddingTop: hp('5%'),
    paddingBottom: hp('15%'),
    width: wp('90%'),
    alignSelf: 'center',
    alignItems: 'center',
  },
  rankingCard: {
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    borderRadius: wp('5%'),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 5,
    marginTop: hp('5%'),
    alignItems: 'center', // Centrar contenido dentro del contenedor verde
    justifyContent: 'center',
    alignSelf: 'center',
  },
  header: {
    backgroundColor: COLORS.target,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: COLORS.textContenido,
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: COLORS.textBorde,
    backgroundColor: COLORS.target,
    margin: wp('0%'),
    position: 'relative',
    overflow: 'hidden',
  },
  tabBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: COLORS.button,
    zIndex: 0,
  },
  tab: {
    flex: 1,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    borderRightColor: COLORS.textBorde,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  tabFirst: {
    borderBottomColor: COLORS.textBorde,
    borderBottomRightRadius: wp('2.5%'),
    borderTopRightRadius: wp('2.5%'),
  },
  tabLast: {
    borderLeftColor: COLORS.textBorde,
    borderBottomColor: COLORS.textBorde,
    borderBottomRightRadius: wp('2.5%'),
    borderTopRightRadius: wp('2.5%'),
  },
  tabLastActive: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: wp('2.5%'),
    borderBottomLeftRadius: wp('2.5%'),
  },
  tabActive: {
    // El fondo se maneja con el tabBackground animado
  },
  tabText: {
    fontSize: wp('3.5%'),
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
  },
  tabTextActive: {
    color: COLORS.textWhite,
  },
  content: {
    padding: wp('2.5%'),
  },
  contentContainer: {
    overflow: 'hidden',
    width: '100%',
  },
  contentPager: {
    flexDirection: 'row',
    width: wp('190%'), // 2 tabs * 95% = 190%
  },
  contentPage: {
    padding: wp('2.5%'),
    alignItems: 'center', // Centrar contenido dentro del contenedor verde
    width: '100%',
  },
  rankingCardWrapper: {
    width: '100%',
    alignItems: 'center', // Centrar el RankingCard (rojo) dentro del contenedor verde
    justifyContent: 'center',
  },
  rivals: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('2%'),
    backgroundColor: COLORS.targetFondo,
    width: '95%',
    alignItems: 'center', // Centrar la sección de Rivales Cercanos
    alignSelf: 'center', // Centrar dentro del contenedor verde
    marginTop: hp('1%'), // Espaciado superior
    marginRight: wp('6.5%'),
    borderRadius: wp('2.5%'),
    
  },
  rivalsTitle: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: COLORS.textContenido,
    textAlign: 'center',
    marginBottom: hp('1.5%'),
  },
  rivalsList: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: wp('2%'),
  },
  loadingContainer: {
    paddingVertical: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: COLORS.textContenido,
    fontWeight: '600',
  },
  emptyContainer: {
    paddingVertical: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: wp('4%'),
    color: COLORS.textContenido,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default LogrosScreen;
