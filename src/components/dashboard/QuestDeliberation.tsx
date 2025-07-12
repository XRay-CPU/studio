"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  processQuestRewardOptimized, 
  getOptimalGasPrice, 
  transactionQueue 
} from '@/lib/questRewardsOptimized';
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2,
  Star,
  Award,
  Medal,
  Shield,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface QuestRatings {
  quality: number;
  impact: number;
  timeliness: number;
}

interface QuestDeliberationProps {
  questId: string;
  questTitle: string;
  submissionContent: string;
  submissionDate: Date;
  baseRewardAmount: number;
  submitterAddress: string;
  onDeliberatedAction?: () => Promise<void>;
}

const calculateBonusMultiplier = (ratings: QuestRatings): number => {
  const qualityBonus = (ratings.quality - 3) * 0.1;
  const impactBonus = (ratings.impact - 3) * 0.15;
  const timelinessBonus = (ratings.timeliness - 3) * 0.05;
  return Math.max(0.5, Math.min(2, 1 + qualityBonus + impactBonus + timelinessBonus));
};

export default function QuestDeliberation({
  questId,
  questTitle,
  submissionContent,
  submissionDate,
  baseRewardAmount,
  submitterAddress,
  onDeliberatedAction
}: QuestDeliberationProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [deliberationStatus, setDeliberationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [ratings, setRatings] = useState<QuestRatings>({
    quality: 3,
    impact: 3,
    timeliness: 3
  });
  const [gasInfo, setGasInfo] = useState<{
    isOptimal: boolean;
    currentPrice: string;
    recommendation: 'proceed' | 'wait' | 'batch';
  } | null>(null);

  const { toast } = useToast();

  // Monitor gas prices
  useEffect(() => {
    const checkGasPrice = async () => {
      try {
        const info = await getOptimalGasPrice();
        setGasInfo(info);
      } catch (error) {
        console.error('Error checking gas price:', error);
      }
    };

    checkGasPrice();
    const interval = setInterval(checkGasPrice, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const bonusMultiplier = calculateBonusMultiplier(ratings);
  const finalRewardAmount = Math.floor(baseRewardAmount * bonusMultiplier);

  const handleRatingChange = (type: keyof QuestRatings, value: number) => {
    setRatings(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setDeliberationStatus('pending');
    setRatings({ quality: 3, impact: 3, timeliness: 3 });
    setFeedback('');
    onDeliberatedAction?.();
  };

  const handleApprove = async () => {
    if (!feedback.trim()) {
      toast({
        description: "Please provide feedback for the submission.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsProcessing(true);

      if (gasInfo?.recommendation === 'batch') {
        // Add to batch queue
        transactionQueue.addToQueue({
          questId,
          amount: finalRewardAmount.toString(),
          recipient: submitterAddress
        });

        toast({
          description: "Transaction added to batch queue for gas optimization.",
        });
        setShowSuccess(true);
      } else if (gasInfo?.recommendation === 'wait') {
        toast({
          description: `High gas prices (${gasInfo.currentPrice} Gwei). Consider waiting or using batch processing.`,
          variant: "destructive"
        });
        return;
      } else {
        // Process immediately
        const result = await processQuestRewardOptimized({
          questId,
          amount: finalRewardAmount.toString(),
          recipient: submitterAddress
        });

        setShowSuccess(true);
        toast({
          description: `Quest approved. Gas used: ${result.gasUsed}, Cost: ${result.gasCost} ETH`
        });
      }
    } catch (error) {
      console.error('Error processing quest reward:', error);
      toast({
        description: error instanceof Error ? error.message : "Failed to process quest rewards. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!feedback.trim()) {
      toast({
        description: "Please provide feedback for rejection.",
        variant: "destructive"
      });
      return;
    }

    setDeliberationStatus('rejected');
    onDeliberatedAction?.();
  };

  return (
    <Dialog open={deliberationStatus === 'pending'}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Quest Deliberation
          </DialogTitle>
          <DialogDescription>
            Review submission and provide feedback
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Gas Price Indicator */}
          {gasInfo && (
            <motion.div
              className={`rounded-lg p-3 flex items-center gap-2 ${
                gasInfo.recommendation === 'proceed' 
                  ? 'bg-green-100 text-green-800' 
                  : gasInfo.recommendation === 'batch'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">
                Gas Price: {gasInfo.currentPrice} Gwei ({gasInfo.recommendation === 'proceed' 
                  ? 'Optimal for processing' 
                  : gasInfo.recommendation === 'batch'
                  ? 'Recommended to batch process'
                  : 'High gas prices, consider waiting'})
              </span>
            </motion.div>
          )}

          {/* Submission Details */}
          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="font-semibold">{questTitle}</h4>
            <p className="text-sm text-muted-foreground">
              Submitted on {submissionDate.toLocaleDateString()}
            </p>
            <p className="text-sm">{submissionContent}</p>
          </div>

          {/* Rating Sliders */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quest Rating</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Quality Rating
                </label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[ratings.quality]}
                  onValueChange={([value]) => handleRatingChange('quality', value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-500" />
                  Impact Rating
                </label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[ratings.impact]}
                  onValueChange={([value]) => handleRatingChange('impact', value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Medal className="h-4 w-4 text-green-500" />
                  Timeliness
                </label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[ratings.timeliness]}
                  onValueChange={([value]) => handleRatingChange('timeliness', value)}
                />
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Feedback</label>
            <Textarea
              placeholder="Provide feedback for the submission..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Reward Preview */}
          <motion.div
            className="rounded-lg bg-primary/10 p-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3, repeat: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Reward Amount</h4>
                <p className="text-sm text-muted-foreground">Including quality bonus</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{finalRewardAmount} MORAL</div>
                <p className="text-sm text-muted-foreground">
                  Base: {baseRewardAmount} × {bonusMultiplier.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReject}
              disabled={isProcessing}
              className="flex items-center gap-2"
            >
              <ThumbsDown className="h-4 w-4" />
              Reject
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isProcessing || gasInfo?.recommendation === 'wait'}
              className="flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : gasInfo?.recommendation === 'batch' ? (
                <>
                  <ThumbsUp className="h-4 w-4" />
                  Add to Batch
                </>
              ) : (
                <>
                  <ThumbsUp className="h-4 w-4" />
                  Approve & Transfer
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={handleSuccessClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Quest Completed!
            </DialogTitle>
            <DialogDescription>
              {questTitle} has been approved and {finalRewardAmount} MORAL tokens 
              {gasInfo?.recommendation === 'batch' 
                ? ' will be transferred in the next batch.' 
                : ' have been transferred.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button onClick={handleSuccessClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
