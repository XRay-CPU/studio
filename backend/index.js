// Basic Express.js server setup for Solidity integration


const express = require('express');
const { ethers } = require('ethers');
console.log('Loaded environment variables:', process.env);
const db = require('./db');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Ethereum
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Example contract ABI and address (replace with your own)
const contractABI = [
  // Example function
  "function getValue() public view returns (uint256)",
  "function setValue(uint256 _value) public",
  "function transfer(address _to, uint256 _value) public returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];
const contractAddress = process.env.CONTRACT_ADDRESS;

if (!process.env.PRIVATE_KEY) {
  console.error('PRIVATE_KEY is undefined!');
  process.exit(1);
}
console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY, 'Length:', process.env.PRIVATE_KEY.length);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// GET endpoint to read from contract
app.get('/value', async (req, res) => {
  try {
    const value = await contract.getValue();
    res.json({ value: value.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST endpoint to write to contract
app.post('/value', async (req, res) => {
  try {
    const { value } = req.body;
    const tx = await contract.setValue(value);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST endpoint to transfer tokens and log to DB
app.post('/transfer', async (req, res) => {
  try {
    const { to, value } = req.body;
    const tx = await contract.transfer(to, value);
    const receipt = await tx.wait();
    // Find Transfer event in logs
    const transferEvent = receipt.logs
      .map(log => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find(e => e && e.name === 'Transfer');
    if (transferEvent) {
      const { from, to: toAddr, value: val } = transferEvent.args;
      db.run(
        'INSERT INTO transfers (from_address, to_address, value, tx_hash) VALUES (?, ?, ?, ?)',
        [from, toAddr, val.toString(), tx.hash],
        (err) => {
          if (err) {
            console.error('DB insert error:', err);
          }
        }
      );
    }
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET endpoint to fetch transfer history from DB
app.get('/transfers', (req, res) => {
  db.all('SELECT * FROM transfers ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Health check endpoint
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is connected!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

