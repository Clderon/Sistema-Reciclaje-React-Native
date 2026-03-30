import React from 'react';
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../utils/constants';
import CardRevision from '../features/teacher/CardRevision';
import MonkeyFrame from '../features/teacher/MonkeyFrame';
import PointsModal from '../features/teacher/modals/PointsModal';
import { useAuth } from '../context/AuthContext';
import { useTeacherReview } from '../hooks/useTeacherReview';

const ProfeScreen = () => {
  const { user } = useAuth();
  const {
    requests,
    loading,
    refreshing,
    loadingMore,
    pagination,
    pointsModal,
    loadMore,
    onRefresh,
    handleGivePoints,
    handleReject,
    closePointsModal,
  } = useTeacherReview(user);

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
            const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

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
                ) : requests.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No hay peticiones pendientes</Text>
                  </View>
                ) : (
                  <View style={styles.missionsContainer}>
                    {requests.map((request) => (
                      <CardRevision
                        key={request.id}
                        requestId={request.id}
                        agentName={`${request.studentName}`}
                        category={request.categoryId}
                        quantity={`${request.quantity} ${request.unit === 'Unid.' ? 'Unidades' : request.unit}`}
                        onGivePoints={(points) => handleGivePoints(request.id, points)}
                        onReview={() => {}}
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

      <PointsModal
        visible={pointsModal.visible}
        onClose={closePointsModal}
        agentName={pointsModal.agentName}
        points={pointsModal.points}
        category={pointsModal.category}
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
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    elevation: 10,
  },
  subtitle: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: COLORS.textTitle,
    textAlign: 'center',
    textShadowColor: COLORS.textBorde,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    elevation: 10,
  },
  missionsContainer: {
    backgroundColor: COLORS.targetFondo,
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
