import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contractConfig";

// Returns a contract instance using the user's wallet (e.g. MetaMask)
export function getContract() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No crypto wallet found. Please install MetaMask.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}
