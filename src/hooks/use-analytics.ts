"use client";

import { useState, useEffect } from 'react';
import { questData } from '@/data/quests';

export type AnalyticsData = {
  totalUsers: number;
  questsVerified: number;
  questsPending: number;
  submissionsFlagged: number;
  questCompletions: {
    name: string;
    completed: number;
    pending: number;
  }[];
  categoryStats: {
    name: string;
    value: number;
  }[];
  userStats: {
    questsCompleted: number;
    impactLevel: number;
    moralBalance: string;
  };
};

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    totalUsers: 0,
    questsVerified: 0,
    questsPending: 0,
    submissionsFlagged: 0,
    questCompletions: [],
    categoryStats: [],
    userStats: {
      questsCompleted: 0,
      impactLevel: 1,
      moralBalance: '0',
    },
  });

  useEffect(() => {
    // Initial data fetch
    fetchAnalyticsData();

    // Set up interval for real-time updates
    const interval = setInterval(fetchAnalyticsData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Simulate fetching data from API
      // In a real app, this would be an API call
      const newData: AnalyticsData = {
        totalUsers: Math.floor(2000 + Math.random() * 1000),
        questsVerified: Math.floor(1500 + Math.random() * 500),
        questsPending: Math.floor(100 + Math.random() * 100),
        submissionsFlagged: Math.floor(5 + Math.random() * 15),
        questCompletions: [
          { name: 'Jan', completed: 40, pending: 24 },
          { name: 'Feb', completed: 30, pending: 13 },
          { name: 'Mar', completed: 50, pending: 38 },
          { name: 'Apr', completed: 47, pending: 39 },
          { name: 'May', completed: 69, pending: 48 },
          { name: 'Jun', completed: 59, pending: 38 },
        ],
        categoryStats: [
          { name: 'Marine Protection', value: Math.floor(300 + Math.random() * 200) },
          { name: 'Reforestation', value: Math.floor(200 + Math.random() * 200) },
          { name: 'Waste Management', value: Math.floor(150 + Math.random() * 100) },
          { name: 'Urban Greening', value: Math.floor(200 + Math.random() * 150) },
        ],
        userStats: {
          questsCompleted: Math.floor(5 + Math.random() * 10),
          impactLevel: Math.floor(1 + Math.random() * 5),
          moralBalance: (Math.random() * 1000).toFixed(2),
        },
      };

      setData(newData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  return { data, refetch: fetchAnalyticsData };
}
