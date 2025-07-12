export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: AchievementType;
  threshold: number;
  bonusMultiplier: number;
  icon: string;
}

export enum AchievementType {
  QUEST_COMPLETION = 'quest_completion',
  STREAK = 'streak',
  COMMUNITY = 'community',
  SPECIAL_EVENT = 'special_event',
  REFERRAL = 'referral'
}

export interface UserAchievement {
  achievementId: string;
  progress: number;
  completed: boolean;
  completedAt?: number;
  claimed: boolean;
}

export interface QuestCompletion {
  questId: string;
  userId: string;
  completedAt: number;
  rewards: number;
  bonusMultiplier: number;
}
