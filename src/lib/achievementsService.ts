import { Achievement, AchievementType, UserAchievement, QuestCompletion } from '@/types/achievements';

class AchievementsService {
  private static instance: AchievementsService;
  private achievements: Achievement[] = [
    {
      id: 'daily-streak-7',
      title: 'Week Warrior',
      description: 'Complete quests for 7 consecutive days',
      type: AchievementType.STREAK,
      threshold: 7,
      bonusMultiplier: 1.5,
      icon: '🔥'
    },
    {
      id: 'quest-master',
      title: 'Quest Master',
      description: 'Complete 10 quests',
      type: AchievementType.QUEST_COMPLETION,
      threshold: 10,
      bonusMultiplier: 2,
      icon: '⭐'
    },
    {
      id: 'community-champion',
      title: 'Community Champion',
      description: 'Help 5 other users complete their quests',
      type: AchievementType.COMMUNITY,
      threshold: 5,
      bonusMultiplier: 1.75,
      icon: '🤝'
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Complete a quest within the first hour of its release',
      type: AchievementType.SPECIAL_EVENT,
      threshold: 1,
      bonusMultiplier: 1.25,
      icon: '🌅'
    },
    {
      id: 'referral-sage',
      title: 'Referral Sage',
      description: 'Bring 3 friends to join the platform',
      type: AchievementType.REFERRAL,
      threshold: 3,
      bonusMultiplier: 1.5,
      icon: '🎯'
    }
  ];

  private constructor() {}

  public static getInstance(): AchievementsService {
    if (!AchievementsService.instance) {
      AchievementsService.instance = new AchievementsService();
    }
    return AchievementsService.instance;
  }

  public async checkAndUpdateAchievements(
    userId: string,
    questCompletion: QuestCompletion
  ): Promise<{ updatedAchievements: UserAchievement[]; bonusMultiplier: number }> {
    const userAchievements = await this.getUserAchievements(userId);
    let totalMultiplier = 1;
    const updatedAchievements: UserAchievement[] = [];

    // Check each achievement
    for (const achievement of this.achievements) {
      const existingAchievement = userAchievements.find(
        ua => ua.achievementId === achievement.id
      );

      if (existingAchievement && !existingAchievement.completed) {
        let shouldUpdate = false;
        let newProgress = existingAchievement.progress;

        switch (achievement.type) {
          case AchievementType.QUEST_COMPLETION:
            newProgress++;
            shouldUpdate = true;
            break;
          case AchievementType.STREAK:
            // Check if the last completion was yesterday
            const lastCompletion = await this.getLastQuestCompletion(userId);
            if (lastCompletion) {
              const isConsecutive = this.isConsecutiveDay(lastCompletion.completedAt);
              if (isConsecutive) {
                newProgress++;
                shouldUpdate = true;
              } else {
                newProgress = 1; // Reset streak
                shouldUpdate = true;
              }
            }
            break;
          // Add other achievement type checks here
        }

        if (shouldUpdate) {
          const isNewlyCompleted = newProgress >= achievement.threshold;
          if (isNewlyCompleted) {
            totalMultiplier *= achievement.bonusMultiplier;
          }

          const updatedAchievement = {
            ...existingAchievement,
            progress: newProgress,
            completed: isNewlyCompleted,
            completedAt: isNewlyCompleted ? Date.now() : undefined
          };
          updatedAchievements.push(updatedAchievement);
        }
      }
    }

    // Store updated achievements
    await this.saveUserAchievements(userId, updatedAchievements);

    return {
      updatedAchievements,
      bonusMultiplier: totalMultiplier
    };
  }

  private async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    // Implement storage logic (e.g., localStorage, IndexedDB, or backend API)
    const stored = localStorage.getItem(`achievements_${userId}`);
    return stored ? JSON.parse(stored) : this.initializeUserAchievements();
  }

  private async saveUserAchievements(
    userId: string,
    achievements: UserAchievement[]
  ): Promise<void> {
    // Implement storage logic
    localStorage.setItem(`achievements_${userId}`, JSON.stringify(achievements));
  }

  private async getLastQuestCompletion(userId: string): Promise<QuestCompletion | null> {
    // Implement storage logic
    const stored = localStorage.getItem(`lastQuest_${userId}`);
    return stored ? JSON.parse(stored) : null;
  }

  private isConsecutiveDay(lastCompletionTimestamp: number): boolean {
    const lastDate = new Date(lastCompletionTimestamp);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  }

  private initializeUserAchievements(): UserAchievement[] {
    return this.achievements.map(achievement => ({
      achievementId: achievement.id,
      progress: 0,
      completed: false,
      claimed: false
    }));
  }

  public getAchievementDetails(achievementId: string): Achievement | undefined {
    return this.achievements.find(a => a.id === achievementId);
  }
}

export const achievementsService = AchievementsService.getInstance();
