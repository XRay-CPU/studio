"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contractConfig';

export interface BayaniUser {
  address: string;
  name: string;
  questsCompleted: number;
  rank: number;
  totalRewards: string;
  level: number;
  lastQuestDate: Date;
  monthlyProgress: {
    completed: number;
    total: number;
  };
}

export function useLeaderboard() {
  const [users, setUsers] = useState<BayaniUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      if (!window.ethereum) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        // Get current user's address
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const currentAddress = accounts[0];

        // This would be replaced with your actual contract calls or API endpoints
        // For now, using mock data with real-time updates
        const mockUsers: BayaniUser[] = [
          {
            address: "0x1234...",
            name: "Juan dela Cruz",
            questsCompleted: 15,
            rank: 1,
            totalRewards: "2500",
            level: 5,
            lastQuestDate: new Date(),
            monthlyProgress: { completed: 15, total: 20 }
          },
          {
            address: "0x5678...",
            name: "Maria Santos",
            questsCompleted: 12,
            rank: 2,
            totalRewards: "2000",
            level: 4,
            lastQuestDate: new Date(),
            monthlyProgress: { completed: 12, total: 20 }
          },
          // Add more mock users...
        ];

        setUsers(mockUsers);
        
        // Find current user's rank
        const userRank = mockUsers.findIndex(user => 
          user.address.toLowerCase() === currentAddress?.toLowerCase()
        ) + 1;
        setCurrentUserRank(userRank || null);

        // Listen for quest completion events
        contract.on("QuestCompleted", async (user, questId, reward) => {
          setUsers(prevUsers => {
            const updatedUsers = [...prevUsers];
            const userIndex = updatedUsers.findIndex(u => 
              u.address.toLowerCase() === user.toLowerCase()
            );

            if (userIndex !== -1) {
              updatedUsers[userIndex] = {
                ...updatedUsers[userIndex],
                questsCompleted: updatedUsers[userIndex].questsCompleted + 1,
                totalRewards: (Number(updatedUsers[userIndex].totalRewards) + Number(ethers.formatEther(reward))).toString(),
                lastQuestDate: new Date(),
                monthlyProgress: {
                  ...updatedUsers[userIndex].monthlyProgress,
                  completed: updatedUsers[userIndex].monthlyProgress.completed + 1
                }
              };
            }

            // Resort based on quests completed
            return updatedUsers
              .sort((a, b) => b.questsCompleted - a.questsCompleted)
              .map((user, index) => ({ ...user, rank: index + 1 }));
          });
        });

      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();

    // Monthly reset check
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeToTomorrow = tomorrow.getTime() - now.getTime();

    // Check for month change at midnight
    const timer = setTimeout(() => {
      const newMonth = new Date().getMonth() !== now.getMonth();
      if (newMonth) {
        fetchLeaderboardData(); // Refresh for new month
      }
    }, timeToTomorrow);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return { users, isLoading, currentUserRank };
}
