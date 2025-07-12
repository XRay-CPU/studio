'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/utils';
import { useWallet } from './use-wallet';
import { useAnalytics } from './use-analytics';
import { useLeaderboard } from './useLeaderboard';
import { useAchievements } from './use-achievements';

export function useSharedData() {
  const { address, connect } = useWallet();
  const { data: analytics } = useAnalytics();
  const { users, currentUserRank } = useLeaderboard();
  const { achievements, updateProgress, calculateBonusMultiplier } = useAchievements(address || '');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Sync data on an interval
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle quest completion
  const handleQuestCompletion = async (questId: string, rewards: number) => {
    if (!address) return;

    const questCompletion = {
      questId,
      userId: address,
      completedAt: Date.now(),
      rewards
    };

    // Update achievements and get bonus multiplier
    const bonusMultiplier = await updateProgress(questCompletion);

    // Calculate final reward amount
    const finalRewards = rewards * bonusMultiplier;

    return {
      finalRewards,
      bonusMultiplier
    };
  };

  return {
    address,
    connect,
    analytics,
    leaderboard: {
      users,
      currentUserRank
    },
    achievements,
    handleQuestCompletion,
    lastUpdate,
    calculateBonusMultiplier
  };
}
