import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';
import BadgeItem from '../badges/BadgeItem';
import UserProfileSection from '../profile/UserProfileSection';

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

            {/* Profile Section */}
            <UserProfileSection
              avatarSource={userData.avatar}
              name={userData.name}
              level={`Nivel: ${userData.level}`}
              stats={[
                { label: 'Puntos Totales', value: userData.points },
                { label: 'Reciclajes', value: userData.recyclings },
                { label: 'Posición', value: userData.position },
              ]}
              backgroundImageSource={require('../../assets/images/fondo_.webp')}
              avatarSize={wp('25%')}
              avatarBorderWidth={5}
              avatarBorderColor={COLORS.avatarBadgeBackground}
              avatarWrapperBackgroundColor={COLORS.badgeWrapperBackground}
            />

            {/* Badges Section */}
            <View style={styles.badgesSection}>
              <Text style={styles.badgesTitle}>Mis insignias</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.badgesScrollContent}
                style={styles.badgesScroll}
              >
                {userData.badges && userData.badges.length > 0 ? (
                  userData.badges.map((badge, index) => (
                    <BadgeItem
                      key={index}
                      imageSource={badge.imageSource}
                      backgroundColor={badge.backgroundColor || COLORS.badgeBackground}
                      isLocked={badge.isLocked || false}
                    />
                  ))
                ) : (
                  // Insignias por defecto si no se proporcionan
                  <>
                    <BadgeItem
                      imageSource={require('../../assets/images/logro_vidrioV2.png')}
                      backgroundColor={COLORS.badgeBackground}
                    />
                    <BadgeItem
                      imageSource={require('../../assets/images/logro_caiman.png')}
                      backgroundColor={COLORS.badgeBackground}
                    />
                    <BadgeItem
                      imageSource={require('../../assets/images/logro_capibarav2.png')}
                      backgroundColor={COLORS.badgeBackground}
                    />
                    <BadgeItem
                      imageSource={require('../../assets/images/serpiente.png')}
                      backgroundColor={COLORS.badgeBackground}
                      isLocked={true}
                    />
                  </>
                )}
              </ScrollView>
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
    backgroundColor: 'rgba(29, 66, 15, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
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
    overflow: 'hidden',
    shadowColor: COLORS.textBorde,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 5,
  },
  header: {
    backgroundColor: COLORS.targetFondo,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.textBorde,
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: COLORS.textContenido,
  },
  badgesSection: {
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1%'),
    backgroundColor: COLORS.targetFondo,
    borderTopWidth: 3,
    borderTopColor: COLORS.textBorde,
  },
  badgesTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '900',
    color: COLORS.textContenido,
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  badgesScroll: {
    width: '100%',
  },
  badgesScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1%'),
  },
});

export default CardInfo;
