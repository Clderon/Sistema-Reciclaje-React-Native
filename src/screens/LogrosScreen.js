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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
  rival: {
    alignItems: 'center',
    padding: wp('2.5%'),
    backgroundColor: COLORS.targetFondo,
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    borderRadius: wp('2.5%'),
    minWidth: wp('22%'),
    height: hp('13%'),
    marginHorizontal: wp('1.5%'),
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
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
    borderWidth: 3,
  },
  rivalAvatarGray: {
    backgroundColor: COLORS.avatarGray,
    borderColor: COLORS.avatarGrayBorder,
  },
  rivalAvatarGreen: {
    backgroundColor: COLORS.buttonDegradado,
    borderColor: COLORS.button,
  },
  rivalAvatarBrown: {
    backgroundColor: COLORS.avatarBrown,
    borderColor: COLORS.textBorde,
  },
  rivalAvatarImg: {
    width: '100%',
    height: '100%',
  },
  rivalName: {
    fontSize: wp('3%'),
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
  },
});

export default LogrosScreen;
