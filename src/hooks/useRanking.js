import { useState, useCallback } from 'react';
import { getStudentsRanking } from '../services/rankingService';
import { getUserById } from '../services/userService';
import { getUserAvatar } from '../utils/avatarHelper';

const getLevelByPoints = (totalPoints) => {
  if (totalPoints >= 800) return 'Gallito de las Rocas';
  if (totalPoints >= 600) return 'Elefante';
  if (totalPoints >= 400) return 'Mono';
  if (totalPoints >= 200) return 'Oso Perezoso';
  return 'Hormiga';
};

const getLevelBadge = (level) => {
  const levelMap = {
    'Hormiga': 'ANT',
    'Oso Perezoso': 'SLOTH',
    'Mono': 'MONKEY',
    'Elefante': 'ELEPHANT',
    'Gallito de las Rocas': 'ROCK',
  };
  return levelMap[level] || 'ANT';
};

const formatRankingData = (backendRankings) => {
  return backendRankings.map((user) => {
    const level = user.level || getLevelByPoints(user.points || 0);
    return {
      id: user.id,
      name: user.name || user.username || 'Usuario',
      level,
      badge: getLevelBadge(level),
      points: user.points || 0,
      recyclings: user.recyclings || user.total_recyclings || 0,
      avatar: getUserAvatar(user.id, user.avatar_url),
      position: user.position || 0,
    };
  });
};

export function useRanking(user, updateUser, activeTab) {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRanking = async () => {
    if (activeTab !== 'estudiantes') {
      setRankingData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await getStudentsRanking(20);
      if (result.success) {
        setRankingData(formatRankingData(result.rankings));
      } else {
        console.error('Error al cargar ranking:', result.error);
        setRankingData([]);
      }
    } catch (error) {
      console.error('Error al cargar ranking:', error);
      setRankingData([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = useCallback(async () => {
    if (!user?.id) return;

    try {
      const result = await getUserById(user.id);
      if (result.success && result.user) {
        updateUser(result.user);
      }
    } catch (error) {
      console.error('Error refrescando datos del usuario:', error);
    }
  }, [user?.id, updateUser]);

  return {
    rankingData,
    loading,
    loadRanking,
    refreshUserData,
    getLevelByPoints,
    getLevelBadge,
    formatRankingData,
  };
}
