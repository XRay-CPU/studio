'use client';

import { useState, useEffect } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import { useToast } from './use-toast';

export interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnecting: boolean;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnecting: false,
    error: null,
  });
  const { toast } = useToast();

  const connect = async () => {
    if (!window.ethereum) {
      toast({
        title: 'Wallet Error',
        description: 'MetaMask is not installed',
        variant: 'destructive',
      });
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true }));

    try {
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setState({
        address,
        balance: formatEther(balance),
        chainId: Number(network.chainId),
        isConnecting: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
    }
  };

  const disconnect = () => {
    setState({
      address: null,
      balance: null,
      chainId: null,
      isConnecting: false,
      error: null,
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', ([newAddress]: string[]) => {
        setState(prev => ({
          ...prev,
          address: newAddress || null,
          balance: null,
        }));
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setState(prev => ({
          ...prev,
          chainId: parseInt(chainId, 16),
        }));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  return {
    ...state,
    connect,
    disconnect,
  };
}
