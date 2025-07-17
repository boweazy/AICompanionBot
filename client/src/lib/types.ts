export interface BotConfig {
  activityLevel: number;
  keywords: string[];
  schedule: {
    start: string;
    end: string;
  };
  respectLimits: boolean;
}

export interface BotStats {
  postsCount?: number;
  engagementRate?: number;
  likesCount?: number;
  commentsCount?: number;
  followsCount?: number;
  successRate?: number;
  totalInteractions: number;
}

export interface DashboardStats {
  totalInteractions: number;
  successRate: string;
  activeHours: string;
  costSavings: string;
}
