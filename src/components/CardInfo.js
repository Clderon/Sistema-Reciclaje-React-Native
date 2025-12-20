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
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';

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
                  <Image 
                    source={userData.avatar} 
                    style={styles.avatar} 
                    resizeMode="cover"
                  />
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
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: wp('90%'),
    maxWidth: wp('85%'),
  },
  closeButton: {
    position: 'absolute',
    top: hp('-1%'),
    right: wp('-2%'),
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    backgroundColor: COLORS.button,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeText: {
    color: COLORS.textWhite,
    fontSize: wp('6%'),
    fontWeight: '900',
    lineHeight: wp('6%'),
  },
  card: {
    backgroundColor: COLORS.target,
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    borderRadius: wp('5%'),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: COLORS.textContenido,
  },
  body: {
    padding: wp('5%'),
  },
  bodyBackground: {
    opacity: 0.15,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  avatarContainer: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    overflow: 'hidden',
    marginRight: wp('4%'),
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
    fontSize: wp('4.5%'),
    fontWeight: '900',
    color: COLORS.textBorde,
    marginBottom: hp('0.5%'),
  },
  level: {
    fontSize: wp('3.5%'),
    fontWeight: '700',
    color: COLORS.textContenido,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  badge: {
    backgroundColor: COLORS.button,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('5%'),
    borderWidth: 3,
    borderColor: COLORS.textBorde,
  },
  badgeText: {
    color: COLORS.textWhite,
    fontSize: wp('4%'),
    fontWeight: '900',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('1%'),
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: wp('3%'),
    fontWeight: '700',
    color: COLORS.textContenido,
    marginBottom: hp('0.5%'),
    textAlign: 'center',
  },
  statValue: {
    fontSize: wp('4.5%'),
    fontWeight: '900',
    color: COLORS.textBorde,
  },
  badgesSection: {
    padding: wp('5%'),
    backgroundColor: COLORS.targetFondo,
  },
  badgesTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '900',
    color: COLORS.textContenido,
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badgeItem: {
    width: wp('13%'),
    height: wp('13%'),
    margin: wp('1.25%'),
  },
  badgeItemLocked: {
    opacity: 0.5,
  },
});

export default CardInfo;
