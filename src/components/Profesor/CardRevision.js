import React, { useState } from 'react'; // ← AGREGAR useState
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/constants';
import CategorySingle from '../CategorySingle';
import Evidence from './Evidence';
import GivePointsButton from './GivePointsButton';
import ReviewButton from './ReviewButton';
import PointsModal from './modals/PointsModal';
import ImageViewerModal from './modals/ImageViewerModal';

const CardRevision = ({ 
  agentName, 
  category, 
  quantity, 
  onGivePoints, 
  onReview, 
  onCategoryChange, // No se usa para filtrar, solo para compatibilidad
  evidenceImage = null,
  evidenceCount = 1,
  requestId = null
}) => {
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleReview = () => {
    if (evidenceImage) {
      setShowImageModal(true);
    }
    if (onReview) {
      onReview();
    }
  };

  const handleGivePoints = () => {
    if (onGivePoints && requestId) {
      // Aprobar con puntos calculados automáticamente (null = backend calcula)
      onGivePoints(null);
      setShowPointsModal(false);
    } else {
      setShowPointsModal(true);
    }
  };

  return (
    <View style={styles.rectangle}>
      {/* Frame-2: Header con nombre del agente */}
      <View style={styles.frame2}>
        <Text style={styles.textWrapper4}>{agentName}</Text>
      </View>
      <PointsModal
        visible={showPointsModal}
        onClose={() => setShowPointsModal(false)}
        agentName={agentName}
        points="10"
        category={category}
      />
      <ImageViewerModal
        visible={showImageModal}
        imageUri={evidenceImage}
        onClose={() => setShowImageModal(false)}
      />

      {/* HojaDarPuntos: Botón dar puntos (posición absoluta) */}

      <View style={styles.hojaDarPuntos}>
        <GivePointsButton 
           onPress={handleGivePoints} 
        />
      </View>

      {/* Frame-3: Imagen y CategorySingle */}
      <View style={styles.frame3}>
        <Evidence 
          imageUri={evidenceImage}
          onPress={handleReview}
          badgeCount={evidenceCount}
          size="medium"
          style={styles.image}
        />
        
        <CategorySingle 
          selectedCategory={category}
          size="medium"
          showClickable={false}
          style={styles.frame49}
        />
      </View>

      {/* Frame-4: Cantidad y botón revisar */}
      <View style={styles.frame4}>
        <View style={styles.frame5}>
          <Text style={styles.textWrapper5}>Cantidad: {quantity}</Text>
        </View>
        <ReviewButton 
          onPress={handleReview}
          text="Revisar"
          icon="?"
          style={styles.botonRevisarInstance}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // .rectangle
  rectangle: {
    alignItems: 'center',
    backgroundColor: COLORS.background || '#f8f7e3',
    borderWidth: 1,
    borderColor: COLORS.textBorde || '#513015',
    borderRadius: wp('2.5%'),
    flexDirection: 'column',
    flex: 1,
    minHeight: hp('15%'), // height: 214px
    overflow: 'hidden',
    paddingBottom: hp('1.2%'), // padding bottom: 10px
    position: 'relative',
    width: wp('75%'), // width: 300px
    marginHorizontal: wp('2.5%'),
    marginVertical: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: hp('0.5%'), // gap: 10px
  },

  // .rectangle .frame-2
  frame2: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: COLORS.targetFondo || '#eedfc0',
    borderTopLeftRadius: wp('2.5%'),
    borderTopRightRadius: wp('2.5%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: hp('5.7%'), // height: 45px
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2.5%'),
    width: '100%',
    position: 'relative',
    paddingRight: wp('20%'),
  },

  // .rectangle .text-wrapper-4
  textWrapper4: {
    color: COLORS.textContenido || '#4e3217',
    fontSize: wp('6%'), // font-size: 24px
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },

  // .rectangle .frame-3
  frame3: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('1.5%'),
    paddingVertical: hp('0%'),
    gap: wp('2%'), // gap: 6px
    width: '100%',
    flex: 1,
  },

  // .rectangle .image
  image: {
    height: hp('11%'), // height: 87px
    width: wp('24%'), // width: 96px
  },

  // .rectangle .frame-49
  frame49: {
     height: hp('11%'),            // ← CAMBIAR: de hp('5%') a hp('11%') (igual que image)
     width: wp('24%'), 
    },
    
    // .rectangle .frame-4
    frame4: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1%'),
    borderTopWidth: 1,
    borderTopColor: COLORS.textBorde + '20', // Semi-transparente
    gap: wp('2%'), // gap: 20px
  },

  // .rectangle .frame-5
  frame5: {
    flex: 1,
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('2%'),
    padding: wp('1%'),
  },

  // .rectangle .text-wrapper-5
  textWrapper5: {
    color: COLORS.textContenido || '#4e3217',
    fontSize: wp('4%'),
    fontWeight: '500',
  },

  // HojaDarPuntos posición absoluta
  hojaDarPuntos: {
  position: 'absolute',
  top: hp('-1%'),    // ← Y: top: 20px convertido
  left: wp('47%'),     // ← X: left: 20px convertido  
  width: wp('18%'),   // ← width: 74px convertido
  height: hp('11%'),  // ← height: 86px convertido
  zIndex: 999,        // ← Para que esté por encima de TODO
},

  // Botón revisar
  botonRevisarInstance: {
    // ReviewButton manejará su propio tamaño
  },
});

export default CardRevision;