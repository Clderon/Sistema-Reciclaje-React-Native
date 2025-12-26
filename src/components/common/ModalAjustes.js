import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../utils/constants';
import { 
  playPopSound, 
  saveSoundPreference,
  saveMusicPreferences,
  loadMusicPreferences,
  stopBackgroundMusic,
  playBackgroundMusic
} from '../../utils/soundHelper';

const ModalAjustes = ({ visible, onClose, onLogout, soundEnabled = true, onSoundToggle }) => {
  const [musicEnabled, setMusicEnabled] = React.useState(true);

  // Cargar preferencias de música al abrir el modal
  React.useEffect(() => {
    if (visible) {
      loadMusicPreferences().then(({ enabled }) => {
        setMusicEnabled(enabled);
      });
    }
  }, [visible]);

  const handleSoundToggle = async () => {
    const newValue = !soundEnabled;
    playPopSound({ volume: 0.3 });
    await saveSoundPreference(newValue);
    if (onSoundToggle) {
      onSoundToggle(newValue);
    }
  };

  const handleMusicToggle = async () => {
    const newValue = !musicEnabled;
    playPopSound({ volume: 0.3 });
    setMusicEnabled(newValue);
    
    // Guardar preferencias
    await saveMusicPreferences(newValue);
    
    // Si se activa, iniciar música inmediatamente
    if (newValue) {
      await playBackgroundMusic('calm_background_loop.wav', { 
        volume: 0.20, 
        loop: true 
      });
    }
    // Si se desactiva, saveMusicPreferences ya la detiene
  };

  const handleLogout = () => {
    playPopSound({ volume: 0.3 });
    onLogout?.();
  };

  const handleClose = () => {
    playPopSound({ volume: 0.3 });
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Ajustes</Text>
          </View>

          {/* Contenido */}
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </TouchableOpacity>

            {/* Toggle de sonido */}
            <View style={styles.soundToggleContainer}>
              <View style={styles.soundToggleInfo}>
                <MaterialIcons 
                  name={soundEnabled ? "volume-up" : "volume-off"} 
                  size={wp('6%')} 
                  color={COLORS.textContenido} 
                />
                <Text style={styles.soundToggleText}>Sonidos de interacción</Text>
              </View>
              <TouchableOpacity
                style={[styles.soundToggle, soundEnabled && styles.soundToggleActive]}
                onPress={handleSoundToggle}
                activeOpacity={0.7}
              >
                <View style={[styles.soundToggleThumb, soundEnabled && styles.soundToggleThumbActive]} />
              </TouchableOpacity>
            </View>

            {/* Toggle de música de fondo */}
            <View style={styles.soundToggleContainer}>
              <View style={styles.soundToggleInfo}>
                <MaterialIcons 
                  name={musicEnabled ? "music-note" : "music-off"} 
                  size={wp('6%')} 
                  color={COLORS.textContenido} 
                />
                <Text style={styles.soundToggleText}>Música de fondo</Text>
              </View>
              <TouchableOpacity
                style={[styles.soundToggle, musicEnabled && styles.soundToggleActive]}
                onPress={handleMusicToggle}
                activeOpacity={0.7}
              >
                <View style={[styles.soundToggleThumb, musicEnabled && styles.soundToggleThumbActive]} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
  },
  modal: {
    width: wp('85%'),
    maxWidth: wp('90%'),
    backgroundColor: COLORS.target,
    borderRadius: wp('5%'),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    backgroundColor: COLORS.button,
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.textBorde,
  },
  headerTitle: {
    fontSize: wp('6%'),
    fontWeight: '900',
    color: COLORS.textWhite,
    textAlign: 'center',
  },
  content: {
    padding: wp('7%'),
    gap: hp('2%'),
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: hp('2%'),
    borderRadius: wp('4%'),
    borderWidth: 3,
    borderColor: COLORS.textBorde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textWhite,
    fontSize: wp('4.5%'),
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonCancel: {
    marginTop: hp('1%'),
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
  },
  buttonCancelText: {
    color: COLORS.textContenido,
    fontSize: wp('4%'),
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  soundToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    backgroundColor: COLORS.targetFondo,
    borderRadius: wp('3%'),
    borderWidth: 2,
    borderColor: COLORS.textBorde,
  },
  soundToggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
    flex: 1,
  },
  soundToggleText: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: COLORS.textContenido,
  },
  soundToggle: {
    width: wp('14%'),
    height: hp('3.5%'),
    borderRadius: wp('7%'),
    backgroundColor: '#ccc',
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    justifyContent: 'center',
    paddingHorizontal: wp('0.5%'),
  },
  soundToggleActive: {
    backgroundColor: COLORS.button,
  },
  soundToggleThumb: {
    width: wp('5.5%'),
    height: wp('5.5%'),
    borderRadius: wp('2.75%'),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.textBorde,
    alignSelf: 'flex-start',
  },
  soundToggleThumbActive: {
    alignSelf: 'flex-end',
  },
});

export default ModalAjustes;

