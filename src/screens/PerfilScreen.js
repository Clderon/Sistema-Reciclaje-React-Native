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
import Button from '../components/Button';
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
        >
          <View style={styles.perfilCard}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Mi Mochila de Explorador</Text>
            </View>

            {/* Profile Section */}
            <View style={styles.section}>
              <ImageBackground
                source={require('../assets/images/fondo_.webp')}
                style={styles.backgroundSection}
                resizeMode="cover"
              >
                {/* Name Card */}
                <View style={styles.nameCard}>
                  <View style={styles.nameCardInner}>
                    <Text style={styles.name}>Explorador Juan</Text>
                    <Text style={styles.level}>Nivel: Hormiga</Text>
                  </View>
                </View>

                {/* Avatar and Badge */}
                <View style={styles.avatarWrapper}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={require('../assets/images/avatar.webp')}
                      style={styles.avatar}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>ANT</Text>
                  </View>
                </View>

                {/* Stats */}
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
                          Kilos{'\n'}Reciclados
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
              </ImageBackground>
            </View>

            {/* Badges Section */}
            <View style={styles.badges}>
              <Text style={styles.badgesTitle}>Mis insignias</Text>
              <View style={styles.badgesList}>
                <Image
                  source={require('../assets/images/insignia.webp')}
                  style={styles.badgeItem}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/images/insignia.webp')}
                  style={styles.badgeItem}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/images/insignia.webp')}
                  style={styles.badgeItem}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/images/mas_insignia.webp')}
                  style={styles.badgeItem}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Button
                title="Editar Mi Perfil"
                onPress={() => console.log('Edit profile')}
                variant="primary"
              />
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => console.log('Settings')}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../assets/images/configuracion.webp')}
                  style={styles.settingsIcon}
                  resizeMode="contain"
                />
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
    paddingTop: 20,
    paddingBottom: 120,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  perfilCard: {
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textContenido,
  },
  section: {
    position: 'relative',
  },
  backgroundSection: {
    padding: 20,
    minHeight: 300,
  },
  nameCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameCardInner: {
    backgroundColor: COLORS.target,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textBorde,
    textAlign: 'center',
    marginBottom: 5,
  },
  level: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: COLORS.textBorde,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  badge: {
    backgroundColor: COLORS.button,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
  },
  badgeText: {
    color: COLORS.textWhite,
    fontSize: 18,
    fontWeight: '900',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  statOuter: {
    backgroundColor: COLORS.target,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    padding: 2,
    width: '100%',
  },
  statInner: {
    backgroundColor: COLORS.targetFondo,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textContenido,
    textAlign: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textBorde,
  },
  badges: {
    padding: 20,
    backgroundColor: COLORS.targetFondo,
  },
  badgesTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textContenido,
    marginBottom: 15,
    textAlign: 'center',
  },
  badgesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  badgeItem: {
    width: 60,
    height: 60,
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.targetFondo,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 35,
    height: 35,
  },
});

export default PerfilScreen;