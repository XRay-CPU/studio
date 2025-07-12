import express from "express";
import dotenv from "dotenv";
import { ethers } from "ethers";
import bodyParser from "body-parser";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Generate or use existing private key
let privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  const newWallet = ethers.Wallet.createRandom();
  privateKey = newWallet.privateKey;
  console.log('Generated new private key:', privateKey);
  // Save to .env file for future use
  const fs = require('fs');
  const envPath = '.env';
  const envContent = `VIC_TESTNET_RPC_URL="https://89.rpc.thirdweb.com/"\nPRIVATE_KEY="${privateKey}"`;
  fs.writeFileSync(envPath, envContent);
}

// Blockchain setup
const provider = new ethers.JsonRpcProvider(process.env.VIC_TESTNET_RPC_URL || "https://89.rpc.thirdweb.com/");
const wallet = new ethers.Wallet(privateKey, provider);
console.log('Using wallet address:', wallet.address);
const contractAddress = process.env.CONTRACT_ADDRESS || "0xCDc7291aC9a6E77f00C4e1B8CafA521547a6887C";
const contractAbi = require("../lib/contractConfig").CONTRACT_ABI;
const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

// Example: relay a transaction (e.g., transfer tokens)
app.post("/relay/transfer", async (req, res) => {
  try {
    const { to, amount } = req.body;
    const tx = await contract.transfer(to, amount);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
  const message = err instanceof Error ? err.message : String(err);
  res.status(500).json({ error: message });
}
});

// Example: store/retrieve off-chain data (in-memory for demo)
const submissions: any[] = [];

app.post("/submissions", (req, res) => {
  submissions.push(req.body);
  res.json({ success: true });
});

app.get("/submissions", (req, res) => {
  res.json(submissions);
});

// Example: webhook/event listener (logs Transfer events)
contract.on("Transfer", (from, to, value, event) => {
  console.log(`Transfer: ${from} -> ${to} (${value.toString()})`);
});

const PORT = process.env.BACKEND_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
