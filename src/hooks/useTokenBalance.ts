import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contractConfig';

export function useTokenBalance(address: string | null) {
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setLoading(false);
      return;
    }

    if (!window.ethereum) {
      console.error('MetaMask not found');
      setLoading(false);
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    let contract: ethers.Contract;

    const setupContract = async () => {
      try {
        const signer = await provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        // Get initial balance
        const initialBalance = await contract.balanceOf(address);
        setBalance(ethers.formatEther(initialBalance));
        setLoading(false);

        // Listen for Transfer events TO this address
        const filterTo = contract.filters.Transfer(null, address);
        // Listen for Transfer events FROM this address
        const filterFrom = contract.filters.Transfer(address);

        const handleTransfer = async () => {
          const newBalance = await contract.balanceOf(address);
          setBalance(ethers.formatEther(newBalance));
        };

        // Subscribe to events
        contract.on(filterTo, handleTransfer);
        contract.on(filterFrom, handleTransfer);

        // Cleanup function
        return () => {
          contract.removeListener(filterTo, handleTransfer);
          contract.removeListener(filterFrom, handleTransfer);
        };
      } catch (error) {
        console.error('Error setting up token balance listener:', error);
        setLoading(false);
      }
    };

    setupContract();
  }, [address]);

  return { balance, loading };
}
