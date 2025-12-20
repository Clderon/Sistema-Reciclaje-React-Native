import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RankingCard from '../components/ranking/RankingCard';
import CardInfo from '../components/profile/CardInfo';
import RankingUserCard from '../components/ranking/RankingUserCard';
import { COLORS, RANKING_DATA } from '../utils/constants';

const LogrosScreen = () => {
  const [activeTab, setActiveTab] = useState('estudiantes');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handlePositionPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  // Ejecutar animación cada vez que la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      // Incrementar la key para forzar el remontaje y ejecutar la animación
      setAnimationKey(prev => prev + 1);
    }, [])
  );

  const currentRanking = activeTab === 'estudiantes' ? RANKING_DATA.estudiantes : RANKING_DATA.salones;

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
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, styles.tabFirst, activeTab === 'estudiantes' && styles.tabActive]}
                onPress={() => setActiveTab('estudiantes')}
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
                style={[styles.tab, styles.tabLast, activeTab === 'salones' && styles.tabActive]}
                onPress={() => setActiveTab('salones')}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.tabText, activeTab === 'salones' && styles.tabTextActive]}
                >
                  Ranking Salones
                </Text>
              </TouchableOpacity>
            </View>

            {/* Ranking Content */}
            <View style={styles.content}>
              <RankingCard 
                key={`${activeTab}-${animationKey}`}
                rankingData={currentRanking} 
                onPositionPress={handlePositionPress}
                progressText={`Faltan ${activeTab === 'estudiantes' ? 120 : 320} para subir`}
                progressValue={50}
                avatarSize={wp('16%')}
                avatarWrapperBackgroundColor={COLORS.avatarNameCardBorder}
              />

              {/* Rivals Section */}
              <View style={styles.rivals}>
                <Text style={styles.rivalsTitle}>
                  {activeTab === 'estudiantes' ? 'Rivales Cercanos' : 'Salones Cercanos'}
                </Text>
                <View style={styles.rivalsList}>
                  <RankingUserCard
                    user={{
                      id: 4,
                      name: activeTab === 'estudiantes' ? 'Maria' : 'Salón 1A',
                      avatar: require('../assets/images/sajino.png'),
                    }}
                    position={4}
                    containerBackgroundColor={COLORS.targetFondo}
                    containerPadding={wp('2%')}
                    containerBorderRadius={wp('2%')}
                    containerBorderWidth={1}
                    onPress={() => handlePositionPress({
                      id: 4,
                      name: activeTab === 'estudiantes' ? 'Maria' : 'Salón 1A',
                      avatar: require('../assets/images/sajino.png'),
                      level: 'Hormiga',
                      badge: 'Hierro',
                      points: 280,
                      recyclings: 58,
                      position: 4,
                    })}
                  />
                  <RankingUserCard
                    user={{
                      id: 14,
                      name: `Tu${activeTab === 'salones' ? ' Salón' : ''}`,
                      avatar: require('../assets/images/elefante.png'),
                    }}
                    position={14}
                    isCurrentUser={true}
                    containerBackgroundColor={COLORS.targetFondo}
                    containerPadding={wp('2%')}
                    containerBorderRadius={wp('2%')}
                    containerBorderWidth={1}
                    onPress={() => handlePositionPress({
                      id: 14,
                      name: `Tu${activeTab === 'salones' ? ' Salón' : ''}`,
                      avatar: require('../assets/images/elefante.png'),
                      level: 'Elefante',
                      badge: 'Cobre',
                      points: 150,
                      recyclings: 45,
                      position: 14,
                    })}
                  />
                  <RankingUserCard
                    user={{
                      id: 15,
                      name: activeTab === 'estudiantes' ? 'Pedro' : 'Salón 2C',
                      avatar: require('../assets/images/serpiente.png'),
                    }}
                    position={15}
                    containerBackgroundColor={COLORS.targetFondo}
                    containerPadding={wp('2%')}
                    containerBorderRadius={wp('2%')}
                    containerBorderWidth={1}
                    onPress={() => handlePositionPress({
                      id: 15,
                      name: activeTab === 'estudiantes' ? 'Pedro' : 'Salón 2C',
                      avatar: require('../assets/images/serpiente.png'),
                      level: 'Serpiente',
                      badge: 'Oro',
                      points: 350,
                      recyclings: 72,
                      position: 15,
                    })}
                  />
                </View>
              </View>
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
    overflow: 'hidden',
    width: '100%',
    maxWidth: wp('95%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 5,
    marginTop: hp('5%'),
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: COLORS.textContenido,
  },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 3,
    borderTopColor: COLORS.textBorde,
  },
  tab: {
    flex: 1,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: COLORS.target,
    borderRightWidth: 3,
    borderRightColor: COLORS.textBorde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabFirst: {
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.textBorde,
    borderBottomRightRadius: wp('2.5%'),
  },
  tabLast: {
    borderRightWidth: 0,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.textBorde,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.textBorde,
    borderBottomLeftRadius: wp('2.5%'),
  },
  tabActive: {
    backgroundColor: COLORS.button,
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
  rivals: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('2%'),
    backgroundColor: COLORS.target,
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
  },
});

export default LogrosScreen;
