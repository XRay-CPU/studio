"use client";

import { StatCard } from "@/components/dashboard/StatCard";
import { TokenBalance } from "@/components/shared/TokenBalance";
import { Coins } from "lucide-react";
import { useState, useEffect } from "react";
import { useAnalytics } from "@/hooks/use-analytics";

export function DashboardStats() {
  const [account, setAccount] = useState<string | null>(null);
  const { data } = useAnalytics();

  useEffect(() => {
    const checkAccount = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0] || null);

        // Listen for account changes
        window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
          setAccount(newAccounts[0] || null);
        });
      }
    };

    checkAccount();
  }, []);

  return (
    <StatCard
      title="Moral Balance"
      value={<TokenBalance address={account} className="text-2xl font-bold" />}
      icon={<Coins className="h-6 w-6 text-yellow-500" />}
      description="Tokens earned from quests"
    />
  );
}
