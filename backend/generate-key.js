const { Wallet } = require('ethers');
const wallet = Wallet.createRandom();
console.log('Your new private key:', wallet.privateKey);
console.log('Your new address:', wallet.address);
