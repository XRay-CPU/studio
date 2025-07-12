import { useEffect, useState } from 'react';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { Skeleton } from '@/components/ui/skeleton';

interface TokenBalanceProps {
  address: string | null;
  className?: string;
  showSymbol?: boolean;
}

export function TokenBalance({ address, className = '', showSymbol = true }: TokenBalanceProps) {
  const { balance, loading } = useTokenBalance(address);
  const [displayBalance, setDisplayBalance] = useState('0');

  useEffect(() => {
    // Listen for quest reward events
    const handleQuestReward = (event: Event) => {
      const questEvent = event as CustomEvent<{recipient: string, amount: string}>;
      if (questEvent.detail.recipient.toLowerCase() === address?.toLowerCase()) {
        // Balance will update automatically through Transfer event listener
        // We can add additional UI feedback here if needed
      }
    };

    window.addEventListener('questRewardProcessed', handleQuestReward);

    return () => {
      window.removeEventListener('questRewardProcessed', handleQuestReward);
    };
  }, [address]);

  useEffect(() => {
    // Animate the balance change
    const target = parseFloat(balance);
    const start = parseFloat(displayBalance);
    const duration = 1000; // 1 second animation
    const startTime = Date.now();

    const animateBalance = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (target - start) * easeOutQuart;

      setDisplayBalance(current.toFixed(4));

      if (progress < 1) {
        requestAnimationFrame(animateBalance);
      }
    };

    animateBalance();
  }, [balance]);

  if (loading) {
    return <Skeleton className={`h-6 w-24 ${className}`} />;
  }

  if (!address) {
    return <span className={className}>Connect Wallet</span>;
  }

  if (!window.ethereum) {
    return <span className={className}>Install MetaMask</span>;
  }

  return (
    <span className={className}>
      {displayBalance}
      {showSymbol && ' MORAL'}
    </span>
  );
}
