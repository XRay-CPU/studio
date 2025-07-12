import { useState } from 'react';
import { rewardsService, RewardMetadata } from '@/lib/rewardsService';
import { achievementsService } from '@/lib/achievementsService';
import { useToast } from '@/hooks/use-toast';
import { UserAchievement } from '@/types/achievements';

export function useRewards() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const claimReward = async (reward: RewardMetadata) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      // Check for achievements and get bonus multiplier
      const { updatedAchievements, bonusMultiplier } = await achievementsService.checkAndUpdateAchievements(
        reward.recipient,
        {
          questId: reward.questId,
          userId: reward.recipient,
          completedAt: reward.timestamp,
          rewards: parseFloat(reward.amount),
          bonusMultiplier: 1
        }
      );

      // Apply bonus multiplier to reward amount
      const finalAmount = (parseFloat(reward.amount) * bonusMultiplier).toString();
      const txHash = await rewardsService.claimReward({
        ...reward,
        amount: finalAmount
      });
      
      // Show achievement notifications
      showAchievementNotifications(updatedAchievements);

      toast({
        title: 'Reward Claimed!',
        description: bonusMultiplier > 1 
          ? `Congratulations! You earned a ${((bonusMultiplier - 1) * 100).toFixed(0)}% bonus!`
          : 'Your tokens have been added to your wallet.',
      });

      return txHash;
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast({
        title: 'Failed to Claim Reward',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const showAchievementNotifications = (achievements: UserAchievement[]) => {
    achievements.forEach(achievement => {
      if (achievement.completed && !achievement.claimed) {
        const details = achievementsService.getAchievementDetails(achievement.achievementId);
        if (details) {
          toast({
            title: `${details.icon} Achievement Unlocked!`,
            description: `${details.title} - ${details.description}`,
          });
        }
      }
    });
  };

  return {
    claimReward,
    isProcessing
  };
}
