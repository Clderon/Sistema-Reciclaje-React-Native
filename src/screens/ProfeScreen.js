import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, CATEGORIES } from '../utils/constants';
import CardRevision from '../components/Profesor/CardRevision';
import MonkeyFrame from '../components/Profesor/MonkeyFrame';
import PointsModal from '../components/Profesor/modals/PointsModal';
import { useAuth } from '../context/AuthContext';
import { getPendingRequests, approveRequest, rejectRequest } from '../services/requestService';
import Toast from 'react-native-root-toast';

const ProfeScreen = ({ navigation }) => {
  const { user } = useAuth();
  // Removido selectedCategory - siempre mostrar todas las peticiones
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, limit: 20, offset: 0, hasMore: false });
  const [pointsModal, setPointsModal] = useState({
    visible: false,
    agentName: '',
    points: '',
    category: ''
  });

  // Cargar peticiones pendientes
  const loadRequests = async (offset = 0, append = false) => {
    try {
      if (offset === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const result = await getPendingRequests(20, offset);
      
      if (result.success) {
        if (append) {
          setRequests(prev => [...prev, ...result.requests]);
        } else {
          setRequests(result.requests);
        }
        setPagination(result.pagination);
      } else {
        Toast.show(result.error || 'Error al cargar peticiones', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#d9534f'
        });
      }
    } catch (error) {
      console.error('Error loading requests:', error);
      Toast.show('Error al cargar peticiones', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#d9534f'
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  // Cargar más peticiones (scroll infinito)
  const loadMore = () => {
    if (!loadingMore && pagination.hasMore) {
      const nextOffset = pagination.offset + pagination.limit;
      loadRequests(nextOffset, true);
    }
  };

  // Refrescar peticiones
  const onRefresh = () => {
    setRefreshing(true);
    loadRequests(0, false);
  };

  // Cargar peticiones cuando la pantalla recibe foco
  useFocusEffect(
    useCallback(() => {
      loadRequests();
    }, [])
  );

  const handleGivePoints = async (requestId, points = null) => {
    if (!user?.id) return;

    try {
      // Buscar la petición para obtener información del estudiante
      const request = requests.find(req => req.id === requestId);
      if (!request) return;

      const result = await approveRequest(requestId, user.id, points);
      
      if (result.success) {
        // Obtener información para el modal
        const categoryName = getCategoryName(request.categoryId);
        const pointsAwarded = result.request.pointsAwarded || '10';
        
        // Mostrar modal de puntos
        setPointsModal({
          visible: true,
          agentName: request.studentName,
          points: String(pointsAwarded),
          category: categoryName
        });
        
        // Remover la petición de la lista
        setRequests(prev => prev.filter(req => req.id !== requestId));
        // Actualizar paginación
        setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      } else {
        Toast.show(result.error || 'Error al aprobar petición', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#d9534f'
        });
      }
    } catch (error) {
      console.error('Error approving request:', error);
      Toast.show('Error al aprobar petición', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#d9534f'
      });
    }
  };

  const handleReject = async (requestId) => {
    if (!user?.id) return;

    try {
      const result = await rejectRequest(requestId, user.id);
      
      if (result.success) {
        Toast.show('Petición rechazada', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#5cb85c'
        });
        // Remover la petición de la lista
        setRequests(prev => prev.filter(req => req.id !== requestId));
        // Actualizar paginación
        setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      } else {
        Toast.show(result.error || 'Error al rechazar petición', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#d9534f'
        });
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      Toast.show('Error al rechazar petición', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#d9534f'
      });
    }
  };

  const handleReview = (requestId) => {
    // La funcionalidad de revisar ya está manejada en CardRevision con el modal de imagen
    console.log(`Revisar petición ${requestId}`);
  };

  // NO usar filtrado por categoría - mostrar TODAS las peticiones siempre
  // El CategorySingle en cada CardRevision es solo visual
  const filteredRequests = requests; // Siempre mostrar todas las peticiones

  // Obtener nombre de categoría
  const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.name : 'Desconocida';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/frame-5.webp')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const paddingToBottom = 20;
            const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
            
            if (isCloseToBottom && pagination.hasMore && !loadingMore) {
              loadMore();
            }
          }}
          scrollEventThrottle={400}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Centro de Control:</Text>
            <Text style={styles.subtitle}>Guardabosques Educador</Text>
          </View>
          
          <View style={styles.containerContent}>
            <MonkeyFrame 
              text={`¡${pagination.total} Peticiones Pendientes!`}
              monkeyImage={require('../assets/images/profesor/monoBino.webp')}
            />
            <View style={styles.containerBackgroundDos}>
              <View style={styles.containerBackground}>
                {loading && requests.length === 0 ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.button} />
                    <Text style={styles.loadingText}>Cargando peticiones...</Text>
                  </View>
                ) : filteredRequests.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      No hay peticiones pendientes
                    </Text>
                  </View>
                ) : (
                  <View style={styles.missionsContainer}>
                    {filteredRequests.map((request) => (
                      <CardRevision
                        key={request.id}
                        requestId={request.id}
                        agentName={`${request.studentName}`}
                        category={request.categoryId}
                        quantity={`${request.quantity} ${request.unit === 'Unid.' ? 'Unidades' : request.unit}`}
                        onGivePoints={(points) => handleGivePoints(request.id, points)}
                        onReview={() => handleReview(request.id)}
                        onCategoryChange={() => {}}
                        evidenceImage={request.evidenceImageUrl}
                        evidenceCount={1}
                      />
                    ))}
                    {loadingMore && (
                      <View style={styles.loadingMoreContainer}>
                        <ActivityIndicator size="small" color={COLORS.button} />
                      </View>
                    )}
                  </View>
                )}
                <View style={styles.scrollBarContainer}>
                  <View style={styles.scrollBarTrack}>
                    <View style={styles.scrollBarThumb} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      
      {/* Modal de puntos - se muestra después de dar puntos exitosamente */}
      <PointsModal
        visible={pointsModal.visible}
        onClose={() => setPointsModal(prev => ({ ...prev, visible: false }))}
        agentName={pointsModal.agentName}
        points={pointsModal.points}
        category={pointsModal.category}
      />
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
    borderRadius: wp('4%'),       
    gap: hp('2%'),               
    padding: wp('1%'),   
    paddingHorizontal: wp('0.1%'),
    overflow: 'hidden',           
    width: '100%',
  },
  containerBackground: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.textBorde,
    borderRadius: wp('4%'),
    padding: wp('3.5%'),
    paddingRight: wp('6%'),
  },
  scrollBarContainer: {
    position: 'absolute',
    right: wp('2%'),
    top: wp('3.5%'),
    bottom: wp('3.5%'),
    width: wp('2.5%'),
    zIndex: 10,
    justifyContent: 'center',
  },
  scrollBarTrack: {
    width: '100%',
    flex: 1,
    backgroundColor: 'Transparent',
    borderRadius: wp('1%'),
    position: 'relative',
    minHeight: wp('10%'),
  },
  scrollBarThumb: {
    position: 'absolute',
    width: '100%',
    backgroundColor: COLORS.scrollBar,
    borderWidth: 0.5,
    borderRadius: wp('1%'),
    height: wp('25%'),
  },
  containerBackgroundDos: {
    backgroundColor: COLORS.madera,
    borderWidth: 1,
    borderColor: COLORS.textBorde,
    borderRadius: wp('4%'),
    padding: wp('2%'),
  },
  containerContent: {
    flexDirection: 'column',     
    alignItems: 'center',        
    gap: hp('0%'),              
    width: '100%',              
    flex: 1,                    
  },
  loadingContainer: {
    padding: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: COLORS.textContenido,
  },
  emptyContainer: {
    padding: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: wp('4%'),
    color: COLORS.textContenido,
    textAlign: 'center',
  },
  loadingMoreContainer: {
    padding: hp('2%'),
    alignItems: 'center',
  },
});

export default ProfeScreen;