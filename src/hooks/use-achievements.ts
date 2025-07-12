'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/utils';
import type { Achievement, UserAchievement } from '@/types/achievements';
import { achievementsService } from '@/lib/achievementsService';

const STORAGE_KEY_PREFIX = 'achievements_';

export function useAchievements(userId: string) {
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load achievements on mount
    const stored = storage.get<UserAchievement[]>(`${STORAGE_KEY_PREFIX}${userId}`, []);
    setAchievements(stored);
    setIsLoading(false);
  }, [userId]);

  // Save achievements whenever they change
  useEffect(() => {
    if (!isLoading) {
      storage.set(`${STORAGE_KEY_PREFIX}${userId}`, achievements);
    }
  }, [achievements, userId, isLoading]);

  const updateProgress = async (questCompletion: { questId: string; userId: string; completedAt: number; rewards: number }) => {
    const { updatedAchievements, bonusMultiplier } = await achievementsService.checkAndUpdateAchievements(
      questCompletion.userId,
      { ...questCompletion, bonusMultiplier: 1 }
    );
    setAchievements(updatedAchievements);
    return bonusMultiplier;
  };

  const calculateBonusMultiplier = (): number => {
    return achievements.reduce((total, achievement) => {
      if (achievement.completed && !achievement.claimed) {
        const details = achievementsService.getAchievementDetails(achievement.achievementId);
        return total * (details?.bonusMultiplier ?? 1);
      }
      return total;
    }, 1);
  };

  const claimAchievement = (achievementId: string) => {
    setAchievements(current =>
      current.map(achievement =>
        achievement.achievementId === achievementId
          ? { ...achievement, claimed: true }
          : achievement
      )
    );
  };

  return {
    achievements,
    isLoading,
    updateProgress,
    calculateBonusMultiplier,
    claimAchievement,
  };
}
