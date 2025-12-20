import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';
import CardRevision from '../components/Profesor/CardRevision';
import MonkeyFrame from '../components/Profesor/MonkeyFrame';

const ProfeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("papel");

  const handleGivePoints = (agentName) => {
    console.log(`Dar puntos a ${agentName}`);
  };

  const handleReview = (agentName) => {
    console.log(`Revisar misión de ${agentName}`);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    console.log('Categoría cambiada a:', newCategory);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/frame-5.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Centro de Control:</Text>
            <Text style={styles.subtitle}>Guardabosques Educador</Text>
            
                      
          </View>
        <View style={styles.containerConten}>
          <MonkeyFrame 
              text="¡15 Estudiantes Activos!"
              monkeyImage={require('../assets/images/profesor/monoBino.png')} // Si tienes imagen
            />
          <View style={styles.containerBackgroundDos}>

            <View style={styles.containerBackground}>
              <View style={styles.missionsContainer}>
                <CardRevision
                  agentName="Agente Juan P."
                  category={selectedCategory}
                  quantity="8"
                  onGivePoints={() => handleGivePoints("Juan P.")}
                  onReview={() => handleReview("Juan P.")}
                  onCategoryChange={handleCategoryChange}
                  evidenceImage={null}
                  evidenceCount={3}
                />
              </View>
              </View>
          </View>
        </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Mantén solo los styles que uses
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
    paddingTop: hp('8%'),
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('15%'),
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: wp('9%'),
    fontWeight: '900',
    color: COLORS.textWhite,
    textAlign: 'center',
    textShadowColor: COLORS.textBorde,
    textShadowOffset: { width: 0, height: 0},
    textShadowRadius: 10,
    elevation: 10,
  },
  subtitle: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: COLORS.textTitle,
    textAlign: 'center',
    textShadowColor: COLORS.textBorde,
    textShadowOffset: { width: 0, height: 0},
    textShadowRadius: 10,
    elevation: 10,
  },
  monkeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  monkeyEmoji: {
    fontSize: wp('15%'),
  },
  speechBubble: {
    backgroundColor: '#E6F3FF',
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderWidth: 2,
    borderColor: COLORS.textBorde,
    marginLeft: wp('2%'),
  },
  speechText: {
    fontSize: wp('3.5%'),
    fontWeight: '700',
    color: COLORS.textBorde,
  },
  missionsContainer: {
      backgroundColor: COLORS.targetFondo ,
      borderWidth: 1,
      borderColor: COLORS.textBorde,
      alignItems: 'center',
      borderRadius: wp('4%'),        // border-radius: 15px convertido
      gap: hp('2%'),               // gap: 10px convertido
      padding: wp('1%'),             // padding: 31px convertido
      overflow: 'hidden',            // overflow: hidden
      width: '100%',  
  },



  containerBackground: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.textBorde,
    borderRadius: wp('4%'),
    padding: wp('3%'),
  },
  containerBackgroundDos: {
    backgroundColor: COLORS.madera,
    borderWidth: 1,
    borderColor: COLORS.textBorde,
    borderRadius: wp('4%'),
    padding: wp('1%'),
  },
  containerConten: {
  flexDirection: 'column',     // Layout vertical
  alignItems: 'center',        // Centrar horizontalmente
  gap: hp('0%'),              // Espacio entre MonkeyFrame y containerBackgroundDos
  width: '100%',              // Ocupar todo el ancho disponible
  flex: 1,                    // Expandir para usar espacio disponible
},
});

export default ProfeScreen;