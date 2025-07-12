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
  private relayerPrivateKey: string;
  private provider: ethers.Provider;

  private constructor() {
    // Initialize with environment variables in production
    this.relayerPrivateKey = process.env.NEXT_PUBLIC_RELAYER_PRIVATE_KEY || '';
    this.provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  }

  public static getInstance(): RewardsService {
    if (!RewardsService.instance) {
      RewardsService.instance = new RewardsService();
    }
    return RewardsService.instance;
  }

  // Create a signed message for gasless reward claim
  public async createRewardSignature(reward: RewardMetadata): Promise<string> {
    const wallet = new ethers.Wallet(this.relayerPrivateKey, this.provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    // Create message hash
    const messageHash = ethers.solidityPackedKeccak256(
      ['address', 'uint256', 'string', 'uint256'],
      [reward.recipient, ethers.parseEther(reward.amount), reward.questId, reward.timestamp]
    );

    // Sign the message
    const signature = await wallet.signMessage(ethers.getBytes(messageHash));
    return signature;
  }

  // Claim rewards without gas fees
  public async claimReward(reward: RewardMetadata): Promise<string> {
    if (!reward.signature) {
      reward.signature = await this.createRewardSignature(reward);
    }

    const wallet = new ethers.Wallet(this.relayerPrivateKey, this.provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    try {
      // Platform pays for gas
      const tx = await contract.executeReward(
        reward.recipient,
        ethers.parseEther(reward.amount),
        reward.questId,
        reward.timestamp,
        reward.signature
      );
      
      const receipt = await tx.wait();
      return receipt.hash;
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw error;
    }
  }

  // Batch claim rewards for multiple users
  public async batchClaimRewards(rewards: RewardMetadata[]): Promise<string[]> {
    const wallet = new ethers.Wallet(this.relayerPrivateKey, this.provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    const signedRewards = await Promise.all(
      rewards.map(async (reward) => {
        if (!reward.signature) {
          reward.signature = await this.createRewardSignature(reward);
        }
        return reward;
      })
    );

    try {
      const tx = await contract.batchExecuteRewards(
        signedRewards.map(r => ({
          recipient: r.recipient,
          amount: ethers.parseEther(r.amount),
          questId: r.questId,
          timestamp: r.timestamp,
          signature: r.signature
        }))
      );
      
      const receipt = await tx.wait();
      return receipt.logs
        .map(log => {
          try {
            return contract.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .filter(event => event && event.name === 'RewardClaimed')
        .map(event => event.args.txHash);
    } catch (error) {
      console.error('Error batch claiming rewards:', error);
      throw error;
    }
  }
}

export const rewardsService = RewardsService.getInstance();
