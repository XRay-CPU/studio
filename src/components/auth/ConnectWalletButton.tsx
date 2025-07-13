
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function ConnectWalletButton() {
  const router = useRouter();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      // Check if we're on the right network (VIC Testnet)
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x59') { // Chain ID 89 in hex
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x59' }], // VIC Testnet
          });
        } catch (switchError: any) {
          // If the chain hasn't been added to MetaMask
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x59',
                chainName: 'VIC Testnet',
                nativeCurrency: {
                  name: 'VIC',
                  symbol: 'VIC',
                  decimals: 18
                },
                rpcUrls: ['https://89.rpc.thirdweb.com/'],
                blockExplorerUrls: ['https://testnet.vicscan.xyz']
              }]
            });
          } else {
            throw switchError;
          }
        }
      }

      setAccount(accounts[0]);
      toast({
        title: "Wallet Connected!",
        description: "Redirecting to account creation...",
      });
      setTimeout(() => router.push("/auth"), 1500);
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "User rejected the request or an error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button onClick={connectWallet} disabled={isConnecting} size="lg" className="font-bold">
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Connect with MetaMask
        </>
      )}
    </Button>
  );
}
