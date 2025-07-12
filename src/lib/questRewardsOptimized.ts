"use client";

import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contractConfig';

interface QuestReward {
  questId: string;
  amount: string;
  recipient: string;
}

interface BatchQuestReward {
  questIds: string[];
  amounts: string[];
  recipients: string[];
}

interface GasOptions {
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  gasLimit?: string;
}

// Gas price thresholds in Gwei
const GAS_PRICE_THRESHOLDS = {
  LOW: '30',
  MEDIUM: '50',
  HIGH: '100'
};

export async function getOptimalGasPrice(): Promise<{ 
  isOptimal: boolean; 
  currentPrice: string;
  recommendation: 'proceed' | 'wait' | 'batch';
}> {
  if (!window.ethereum) {
    throw new Error('MetaMask not found');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const feeData = await provider.getFeeData();
  
  const gasPriceGwei = ethers.formatUnits(feeData.gasPrice ?? 0, 'gwei');
  const currentPrice = parseFloat(gasPriceGwei);

  return {
    isOptimal: currentPrice <= parseFloat(GAS_PRICE_THRESHOLDS.MEDIUM),
    currentPrice: gasPriceGwei,
    recommendation: 
      currentPrice <= parseFloat(GAS_PRICE_THRESHOLDS.LOW) ? 'proceed' :
      currentPrice <= parseFloat(GAS_PRICE_THRESHOLDS.MEDIUM) ? 'batch' : 'wait'
  };
}

export async function processBatchQuestRewards({ 
  questIds, 
  amounts, 
  recipients 
}: BatchQuestReward, 
  gasOptions?: GasOptions
) {
  if (!window.ethereum) {
    throw new Error('MetaMask not found');
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Convert all amounts to wei
    const rewardAmounts = amounts.map(amount => ethers.parseEther(amount));

    // Prepare transaction options
    const txOptions: any = {};
    if (gasOptions?.maxFeePerGas) {
      txOptions.maxFeePerGas = ethers.parseUnits(gasOptions.maxFeePerGas, 'gwei');
    }
    if (gasOptions?.maxPriorityFeePerGas) {
      txOptions.maxPriorityFeePerGas = ethers.parseUnits(gasOptions.maxPriorityFeePerGas, 'gwei');
    }
    if (gasOptions?.gasLimit) {
      txOptions.gasLimit = ethers.parseUnits(gasOptions.gasLimit, 'wei');
    }

    // Use multicall or batch transfer function
    const tx = await contract.batchTransfer(recipients, rewardAmounts, txOptions);
    const receipt = await tx.wait();

    // Calculate gas used and cost
    const gasUsed = receipt.gasUsed;
    const effectiveGasPrice = receipt.effectiveGasPrice;
    const totalGasCost = gasUsed * effectiveGasPrice;

    // Emit batch event
    const event = new CustomEvent('batchQuestRewardsProcessed', {
      detail: {
        questIds,
        recipients,
        amounts: rewardAmounts.map(a => a.toString()),
        txHash: tx.hash,
        gasUsed: gasUsed.toString(),
        gasCost: ethers.formatEther(totalGasCost)
      }
    });
    window.dispatchEvent(event);

    return {
      txHash: tx.hash,
      gasUsed: gasUsed.toString(),
      gasCost: ethers.formatEther(totalGasCost)
    };
  } catch (error) {
    console.error('Error processing batch quest rewards:', error);
    throw error;
  }
}

export async function processQuestRewardOptimized({ 
  questId, 
  amount, 
  recipient 
}: QuestReward, 
  gasOptions?: GasOptions
) {
  if (!window.ethereum) {
    throw new Error('MetaMask not found');
  }

  try {
    // Check gas price first
    const gasPrice = await getOptimalGasPrice();
    if (!gasPrice.isOptimal) {
      throw new Error(`Gas price is currently too high (${gasPrice.currentPrice} Gwei). Recommendation: ${gasPrice.recommendation}`);
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const rewardAmount = ethers.parseEther(amount);
    
    // Prepare transaction options
    const txOptions: any = {
      maxFeePerGas: ethers.parseUnits(gasOptions?.maxFeePerGas ?? GAS_PRICE_THRESHOLDS.MEDIUM, 'gwei'),
      maxPriorityFeePerGas: ethers.parseUnits(gasOptions?.maxPriorityFeePerGas ?? '2', 'gwei')
    };
    
    if (gasOptions?.gasLimit) {
      txOptions.gasLimit = ethers.parseUnits(gasOptions.gasLimit, 'wei');
    }

    const tx = await contract.transfer(recipient, rewardAmount, txOptions);
    const receipt = await tx.wait();

    // Calculate gas used and cost
    const gasUsed = receipt.gasUsed;
    const effectiveGasPrice = receipt.effectiveGasPrice;
    const totalGasCost = gasUsed * effectiveGasPrice;

    // Emit event
    const event = new CustomEvent('questRewardProcessed', {
      detail: {
        questId,
        recipient,
        amount: rewardAmount.toString(),
        txHash: tx.hash,
        gasUsed: gasUsed.toString(),
        gasCost: ethers.formatEther(totalGasCost)
      }
    });
    window.dispatchEvent(event);

    return {
      txHash: tx.hash,
      gasUsed: gasUsed.toString(),
      gasCost: ethers.formatEther(totalGasCost)
    };
  } catch (error) {
    console.error('Error processing quest reward:', error);
    throw error;
  }
}

// Queue for batching transactions
class TransactionQueue {
  private static instance: TransactionQueue;
  private queue: QuestReward[] = [];
  private processingInterval: NodeJS.Timeout | null = null;
  private readonly maxBatchSize = 10;
  private readonly processingDelay = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.startProcessing();
  }

  public static getInstance(): TransactionQueue {
    if (!TransactionQueue.instance) {
      TransactionQueue.instance = new TransactionQueue();
    }
    return TransactionQueue.instance;
  }

  public addToQueue(reward: QuestReward) {
    this.queue.push(reward);
    if (this.queue.length >= this.maxBatchSize) {
      this.processBatch();
    }
  }

  private async processBatch() {
    if (this.queue.length === 0) return;

    const batch = this.queue.splice(0, this.maxBatchSize);
    const questIds = batch.map(r => r.questId);
    const amounts = batch.map(r => r.amount);
    const recipients = batch.map(r => r.recipient);

    try {
      await processBatchQuestRewards({ questIds, amounts, recipients });
    } catch (error) {
      console.error('Error processing batch:', error);
      // Re-add failed transactions to queue
      this.queue = [...batch, ...this.queue];
    }
  }

  private startProcessing() {
    this.processingInterval = setInterval(() => {
      if (this.queue.length > 0) {
        this.processBatch();
      }
    }, this.processingDelay);
  }

  public stopProcessing() {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
  }
}

export const transactionQueue = TransactionQueue.getInstance();
