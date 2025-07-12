"use client";

import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contractConfig';

interface QuestReward {
  questId: string;
  amount: string;
  recipient: string;
}

export async function processQuestReward({ questId, amount, recipient }: QuestReward) {
  if (!window.ethereum) {
    throw new Error('MetaMask not found');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Convert reward amount to wei (assuming 18 decimals)
    const rewardAmount = ethers.parseEther(amount);

    // Transfer tokens to the user
    const tx = await contract.transfer(recipient, rewardAmount);
    await tx.wait();

    // Emit a custom event that our components can listen to
    const event = new CustomEvent('questRewardProcessed', {
      detail: {
        questId,
        recipient,
        amount: rewardAmount.toString(),
        txHash: tx.hash
      }
    });
    window.dispatchEvent(event);

    return tx.hash;
  } catch (error) {
    console.error('Error processing quest reward:', error);
    throw error;
  }
}
