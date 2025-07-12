# Likas Bayani Studio

## Deployment Options

### 1. Vercel (Recommended)

The easiest way to deploy:

1. Fork this repository
2. Go to [Vercel](https://vercel.com)
3. Import your forked repository
4. Add environment variables:
   - `NEXT_PUBLIC_CHAIN_ID`: 80001
   - `NEXT_PUBLIC_RPC_URL`: https://rpc-mumbai.maticvigil.com
5. Deploy

Or using Vercel CLI:
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 2. Railway

1. Install Railway CLI:
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### 3. Netlify

1. Fork this repository
2. Go to [Netlify](https://netlify.com)
3. Import your forked repository
4. Add environment variables in Netlify dashboard
5. Deploy

## Accessing the Deployed App

After deployment, users can access the app via:
- Vercel: `https://your-app.vercel.app`
- Railway: `https://your-app.railway.app`
- Netlify: `https://your-app.netlify.app`

## Requirements for Users

1. MetaMask browser extension installed
2. Mumbai testnet configured in MetaMask:
   - Network Name: Mumbai
   - RPC URL: https://rpc-mumbai.maticvigil.com
   - Chain ID: 80001
   - Currency Symbol: MATIC
   - Block Explorer: https://mumbai.polygonscan.com
