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
import RankingCard from '../components/RankingCard';
import CardInfo from '../components/CardInfo';
import { COLORS, RANKING_DATA } from '../utils/constants';

const LogrosScreen = () => {
  const [activeTab, setActiveTab] = useState('estudiantes');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePositionPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

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
                rankingData={currentRanking} 
                onPositionPress={handlePositionPress}
                progressText={`Faltan ${activeTab === 'estudiantes' ? 120 : 320} para subir`}
                progressValue={50}
              />

              {/* Rivals Section */}
              <View style={styles.rivals}>
                <Text style={styles.rivalsTitle}>
                  {activeTab === 'estudiantes' ? 'Rivales Cercanos' : 'Salones Cercanos'}
                </Text>
                <View style={styles.rivalsList}>
                  <View style={styles.rival}>
                    <View style={[styles.rivalAvatar, styles.rivalAvatarGray]}>
                      <Image
                        source={require('../assets/images/elefante.webp')}
                        style={styles.rivalAvatarImg}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={styles.rivalName}>
                      4. {activeTab === 'estudiantes' ? 'Maria' : 'Salón 1A'}
                    </Text>
                  </View>
                  <View style={[styles.rival, styles.rivalCurrent]}>
                    <View style={[styles.rivalAvatar, styles.rivalAvatarGreen]}>
                      <Image
                        source={require('../assets/images/hormiga.webp')}
                        style={styles.rivalAvatarImg}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={styles.rivalName}>
                      14. Tu{activeTab === 'salones' ? ' Salón' : ''}
                    </Text>
                  </View>
                  <View style={styles.rival}>
                    <View style={[styles.rivalAvatar, styles.rivalAvatarBrown]}>
                      <Image
                        source={require('../assets/images/mono.webp')}
                        style={styles.rivalAvatarImg}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={styles.rivalName}>
                      15. {activeTab === 'estudiantes' ? 'Pedro' : 'Salón 2C'}
                    </Text>
                  </View>
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
    paddingTop: 70, // Similar a HomeScreen
    paddingBottom: 120,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  rankingCard: {
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    borderRadius: 20, // 2rem
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400, // 40rem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 5,
    marginTop: 40, // 4rem
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    paddingVertical: 10, // 1rem
    paddingHorizontal: 20, // 2rem
    alignItems: 'center',
  },
  title: {
    fontSize: 24, // 2.4rem
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
    fontSize: 14, // 1.4rem
    paddingVertical: 10, // 1rem
    paddingHorizontal: 15, // 1.5rem
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
    borderBottomRightRadius: 10, 
  },
  tabLast: {
    borderRightWidth: 0,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.textBorde,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.textBorde,
    borderBottomLeftRadius: 10, // 1rem
  },
  tabActive: {
    backgroundColor: COLORS.button,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
  },
  tabTextActive: {
    color: COLORS.textWhite,
  },
  content: {
    // El contenido está dentro del rankingCard
    padding: 10,
  },
  rivals: {
    paddingHorizontal: 20, // 2rem
    paddingBottom: 20, // 2rem
    backgroundColor: COLORS.target,
  },
  rivalsTitle: {
    fontSize: 20, // 2rem
    fontWeight: '900',
    color: COLORS.textContenido,
    textAlign: 'center',
    marginBottom: 15, // 1.5rem
  },
  rivalsList: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15, // 1.5rem
  },
  rival: {
    alignItems: 'center',
    padding: 10, // 1rem
    backgroundColor: COLORS.targetFondo,
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    borderRadius: 10, // 1rem
    minWidth: 90, // 9rem
    height: 110, // 11rem
  },
  rivalCurrent: {
    borderColor: COLORS.button,
    borderWidth: 3,
    shadowColor: COLORS.button,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  rivalAvatar: {
    width: 60, // 6rem
    height: 60, // 6rem
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8, // 0.8rem
    borderWidth: 3,
  },
  rivalAvatarGray: {
    backgroundColor: COLORS.avatarGray || '#929aa0',
    borderColor: COLORS.avatarGrayBorder || '#6d7479',
  },
  rivalAvatarGreen: {
    backgroundColor: COLORS.buttonDegradado || '#7bc224',
    borderColor: COLORS.button,
  },
  rivalAvatarBrown: {
    backgroundColor: COLORS.avatarBrown || '#d27c2f',
    borderColor: COLORS.textBorde,
  },
  rivalAvatarImg: {
    width: '100%',
    height: '100%',
  },
  rivalName: {
    fontSize: 12, // 1.2rem
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
  },
});

export default LogrosScreen;
