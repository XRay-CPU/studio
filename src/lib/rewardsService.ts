import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contractConfig';

export interface RewardMetadata {
  questId: string;
  amount: string;
  recipient: string;
  timestamp: number;
  signature?: string;
}

class RewardsService {
  private static instance: RewardsService;
  private provider: ethers.Provider;
  
  private constructor() {
    // Use the default VIC Testnet RPC URL if none is provided
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://89.rpc.thirdweb.com/';
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  // Initialize with development mock for testing
  private async getSignerForRewards(): Promise<ethers.Signer> {
    if (typeof window === 'undefined') {
      throw new Error('Window is not defined');
    }

    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider.getSigner();
  }

  public static getInstance(): RewardsService {
    if (!RewardsService.instance) {
      RewardsService.instance = new RewardsService();
    }
    return RewardsService.instance;
  }

  // Claim rewards directly using user's wallet
  public async claimReward(reward: RewardMetadata): Promise<string> {
    try {
      const signer = await this.getSignerForRewards();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Get current gas price
      const feeData = await this.provider.getFeeData();
      const maxFeePerGas = feeData.maxFeePerGas || feeData.gasPrice;
      const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;

      // Prepare transaction options
      const options: any = {};
      if (maxFeePerGas) {
        options.maxFeePerGas = maxFeePerGas;
      }
      if (maxPriorityFeePerGas) {
        options.maxPriorityFeePerGas = maxPriorityFeePerGas;
      }

      // Call contract with optimized gas settings
      const tx = await contract.transfer(
        reward.recipient,
        ethers.parseEther(reward.amount),
        options
      );
      
      const receipt = await tx.wait();

      // Emit event for UI updates
      const event = new CustomEvent('rewardClaimed', {
        detail: {
          questId: reward.questId,
          amount: reward.amount,
          recipient: reward.recipient,
          txHash: receipt.hash
        }
      });
      window.dispatchEvent(event);

      return receipt.hash;
    } catch (error: any) {
      console.error('Error claiming reward:', error);
      if (error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction was rejected by user');
      }
      throw error;
    }
  }

  // Batch claim rewards
  public async batchClaimRewards(rewards: RewardMetadata[]): Promise<string[]> {
    try {
      const signer = await this.getSignerForRewards();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Get current gas price
      const feeData = await this.provider.getFeeData();
      const maxFeePerGas = feeData.maxFeePerGas || feeData.gasPrice;
      const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;

      // Prepare transaction options
      const options: any = {};
      if (maxFeePerGas) {
        options.maxFeePerGas = maxFeePerGas;
      }
      if (maxPriorityFeePerGas) {
        options.maxPriorityFeePerGas = maxPriorityFeePerGas;
      }

      // Prepare batch transfer data
      const recipients = rewards.map(r => r.recipient);
      const amounts = rewards.map(r => ethers.parseEther(r.amount));

      // Execute batch transfer
      const tx = await contract.batchTransfer(recipients, amounts, options);
      const receipt = await tx.wait();

      // Process events
      const transferEvents = receipt.logs
        .map((log: ethers.Log) => {
          try {
            return contract.interface.parseLog({
              topics: log.topics,
              data: log.data
            });
          } catch {
            return null;
          }
        })
        .filter((event: any) => event && event.name === 'Transfer')
        .map((event: any) => event.args.transactionHash);

      // Emit events for UI updates
      rewards.forEach((reward, index) => {
        const event = new CustomEvent('rewardClaimed', {
          detail: {
            questId: reward.questId,
            amount: reward.amount,
            recipient: reward.recipient,
            txHash: transferEvents[index]
          }
        });
        window.dispatchEvent(event);
      });

      return transferEvents;
    } catch (error: any) {
      console.error('Error batch claiming rewards:', error);
      if (error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction was rejected by user');
      }
      throw error;
    }
  }
}

export const rewardsService = RewardsService.getInstance();
