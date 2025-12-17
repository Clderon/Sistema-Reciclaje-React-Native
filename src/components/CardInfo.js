import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { COLORS } from '../utils/constants';

const { width } = Dimensions.get('window');

const CardInfo = ({ visible, onClose, userData }) => {
  if (!userData) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayTouch} activeOpacity={1} onPress={onClose} />
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Mi Mochila de Explorador</Text>
            </View>

            <ImageBackground
              source={require('../assets/images/frame-5.webp')}
              style={styles.body}
              imageStyle={styles.bodyBackground}
            >
              {/* Profile Section */}
              <View style={styles.profile}>
                <View style={styles.avatarContainer}>
                  <Image source={userData.avatar} style={styles.avatar} resizeMode="contain" />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.username}>{userData.name}</Text>
                  <Text style={styles.level}>Nivel: {userData.level}</Text>
                </View>
              </View>

              {/* Badge */}
              <View style={styles.badgeWrapper}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{userData.badge || 'N/A'}</Text>
                </View>
              </View>

              {/* Stats */}
              <View style={styles.stats}>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Puntos Totales</Text>
                  <Text style={styles.statValue}>{userData.points}</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Reciclajes</Text>
                  <Text style={styles.statValue}>{userData.recyclings}</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Posición</Text>
                  <Text style={styles.statValue}>{userData.position}</Text>
                </View>
              </View>
            </ImageBackground>

            {/* Badges Section */}
            <View style={styles.badgesSection}>
              <Text style={styles.badgesTitle}>Mis insignias</Text>
              <View style={styles.badgesGrid}>
                <Image
                  source={require('../assets/images/hormiga.webp')}
                  style={styles.badgeItem}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/images/elefante.webp')}
                  style={styles.badgeItem}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/images/mono.webp')}
                  style={styles.badgeItem}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/images/gallito-rocas.webp')}
                  style={[styles.badgeItem, styles.badgeItemLocked]}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: width * 0.9,
    maxWidth: 340,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: COLORS.button,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeText: {
    color: COLORS.textWhite,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 24,
  },
  card: {
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 10,
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textContenido,
  },
  body: {
    padding: 20,
  },
  bodyBackground: {
    opacity: 0.15,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 15,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textBorde,
    marginBottom: 5,
  },
  level: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textContenido,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: COLORS.button,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
  },
  badgeText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '900',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textContenido,
    marginBottom: 5,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textBorde,
  },
  badgesSection: {
    padding: 20,
    backgroundColor: COLORS.targetFondo,
  },
  badgesTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textContenido,
    marginBottom: 15,
    textAlign: 'center',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  badgeItem: {
    width: 54,
    height: 54,
  },
  badgeItemLocked: {
    opacity: 0.5,
  },
});

export default CardInfo;
