import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { CATEGORIES } from '../utils/constants';
import { getPendingRequests, approveRequest, rejectRequest } from '../services/requestService';

export function useTeacherReview(user) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, limit: 20, offset: 0, hasMore: false });
  const [pointsModal, setPointsModal] = useState({
    visible: false,
    agentName: '',
    points: '',
    category: '',
  });

  const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.name : 'Desconocida';
  };

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
          backgroundColor: '#d9534f',
        });
      }
    } catch (error) {
      console.error('Error loading requests:', error);
      Toast.show('Error al cargar peticiones', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#d9534f',
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && pagination.hasMore) {
      const nextOffset = pagination.offset + pagination.limit;
      loadRequests(nextOffset, true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadRequests(0, false);
  };

  useFocusEffect(
    useCallback(() => {
      loadRequests();
    }, [])
  );

  const handleGivePoints = async (requestId, points = null) => {
    if (!user?.id) return;

    try {
      const request = requests.find(req => req.id === requestId);
      if (!request) return;

      const result = await approveRequest(requestId, user.id, points);

      if (result.success) {
        const categoryName = getCategoryName(request.categoryId);
        const pointsAwarded = result.request.pointsAwarded || '10';

        setPointsModal({
          visible: true,
          agentName: request.studentName,
          points: String(pointsAwarded),
          category: categoryName,
        });

        setRequests(prev => prev.filter(req => req.id !== requestId));
        setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      } else {
        Toast.show(result.error || 'Error al aprobar petición', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#d9534f',
        });
      }
    } catch (error) {
      console.error('Error approving request:', error);
      Toast.show('Error al aprobar petición', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#d9534f',
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
          backgroundColor: '#5cb85c',
        });
        setRequests(prev => prev.filter(req => req.id !== requestId));
        setPagination(prev => ({ ...prev, total: prev.total - 1 }));
      } else {
        Toast.show(result.error || 'Error al rechazar petición', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#d9534f',
        });
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      Toast.show('Error al rechazar petición', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        backgroundColor: '#d9534f',
      });
    }
  };

  const closePointsModal = () => {
    setPointsModal(prev => ({ ...prev, visible: false }));
  };

  return {
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
    getCategoryName,
  };
}
