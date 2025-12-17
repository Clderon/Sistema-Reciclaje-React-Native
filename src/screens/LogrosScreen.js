import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
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
  const currentUser = { name: 'Tu', position: 14, avatar: require('../assets/images/hormiga.webp') };

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
                style={[styles.tab, activeTab === 'estudiantes' && styles.tabActive]}
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
                style={[styles.tab, activeTab === 'salones' && styles.tabActive]}
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
              <RankingCard rankingData={currentRanking} onPositionPress={handlePositionPress} />

              {/* Progress Bar */}
              <View style={styles.progress}>
                <Text style={styles.progressText}>Faltan {activeTab === 'estudiantes' ? 120 : 320} para subir</Text>
              </View>

              {/* Rivals Section */}
              <View style={styles.rivals}>
                <Text style={styles.rivalsTitle}>
                  {activeTab === 'estudiantes' ? 'Rivales Cercanos' : 'Salones Cercanos'}
                </Text>
                <View style={styles.rivalsList}>
                  <View style={styles.rival}>
                    <View style={[styles.rivalAvatar, styles.rivalAvatarGray]}>
                      <Text style={styles.rivalAvatarText}>4</Text>
                    </View>
                    <Text style={styles.rivalName}>4. {activeTab === 'estudiantes' ? 'Maria' : 'Salón 1A'}</Text>
                  </View>
                  <View style={[styles.rival, styles.rivalCurrent]}>
                    <View style={[styles.rivalAvatar, styles.rivalAvatarGreen]}>
                      <Text style={styles.rivalAvatarText}>14</Text>
                    </View>
                    <Text style={styles.rivalName}>14. Tu{activeTab === 'salones' ? ' Salón' : ''}</Text>
                  </View>
                  <View style={styles.rival}>
                    <View style={[styles.rivalAvatar, styles.rivalAvatarBrown]}>
                      <Text style={styles.rivalAvatarText}>15</Text>
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
    paddingTop: 40,
    paddingBottom: 120,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  rankingCard: {
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 5,
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.target,
    borderRightWidth: 3,
    borderRightColor: COLORS.textBorde,
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
    padding: 20,
  },
  progress: {
    marginVertical: 15,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textContenido,
  },
  rivals: {
    marginTop: 20,
  },
  rivalsTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textBorde,
    marginBottom: 15,
    textAlign: 'center',
  },
  rivalsList: {
    gap: 10,
  },
  rival: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.targetFondo,
  },
  rivalCurrent: {
    backgroundColor: COLORS.button + '40',
    borderWidth: 2,
    borderColor: COLORS.button,
  },
  rivalAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    borderWidth: 3,
  },
  rivalAvatarGray: {
    backgroundColor: COLORS.avatarGray,
    borderColor: COLORS.avatarGrayBorder,
  },
  rivalAvatarGreen: {
    backgroundColor: COLORS.avatarGreen,
    borderColor: COLORS.button,
  },
  rivalAvatarBrown: {
    backgroundColor: COLORS.avatarBrown,
    borderColor: COLORS.textBorde,
  },
  rivalAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  rivalName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textBorde,
    flex: 1,
  },
});

export default LogrosScreen;