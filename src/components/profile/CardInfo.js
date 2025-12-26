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

// Función para abreviar nombres largos de niveles
const abbreviateLevelName = (levelName) => {
  if (!levelName) return '';
  
  // Abreviaciones específicas para niveles conocidos
  const levelLower = levelName.toLowerCase();
  
  if (levelLower.includes('oso perezoso') || levelName === 'Oso Perezoso') {
    return 'Oso P.';
  }
  
  if (levelLower.includes('gallito') && (levelLower.includes('rocas') || levelLower.includes('roca'))) {
    return 'Gallito R.';
  }
  
  // Si el nombre es muy largo (más de 10 caracteres), abreviar
  if (levelName.length > 10) {
    const words = levelName.split(' ');
    if (words.length > 1) {
      // Tomar primera palabra + inicial de la segunda palabra con punto
      const firstWord = words[0];
      const secondInitial = words[1]?.[0]?.toUpperCase() || '';
      return secondInitial ? `${firstWord} ${secondInitial}.` : firstWord;
    }
    // Si es una sola palabra larga, truncar a 10 caracteres
    return levelName.substring(0, 10) + '.';
  }
  
  return levelName;
};

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
              level={`Nivel: ${abbreviateLevelName(userData.level)}`}
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
              sectionPaddingVertical={hp('0%')}
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
                      imageSource={require('../../assets/images/logro_vidrioV2.webp')}
                      backgroundColor={COLORS.badgeBackground}
                    />
                    <BadgeItem
                      imageSource={require('../../assets/images/logro_caiman.webp')}
                      backgroundColor={COLORS.badgeBackground}
                    />
                    <BadgeItem
                      imageSource={require('../../assets/images/logro_capibarav2.webp')}
                      backgroundColor={COLORS.badgeBackground}
                    />
                    <BadgeItem
                      imageSource={require('../../assets/images/serpiente.webp')}
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
    width: wp('85%'),
    maxWidth: wp('80%'),
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
    borderRadius: wp('3%'),
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
    borderTopLeftRadius: wp('3%'),
    borderTopRightRadius: wp('3%'),
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: '900',
    color: COLORS.textContenido,
  },
  badgesSection: {
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1%'),
    backgroundColor: COLORS.target,
    borderTopWidth: 3,
    borderTopColor: COLORS.textBorde,
    borderBottomLeftRadius: wp('3%'),
    borderBottomRightRadius: wp('3%'),
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
    borderRadius: wp('3%'),
    backgroundColor: COLORS.targetFondo,
  },
});

export default CardInfo;
