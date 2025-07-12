
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Loader2 } from "lucide-react";
import { ethers } from "ethers";

const tokens = [
  { id: "eth", name: "Ethereum", symbol: "ETH" },
  { id: "usdc", name: "USD Coin", symbol: "USDC" },
  { id: "dai", name: "Dai Stablecoin", symbol: "DAI" },
];

export function TokenSwap() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState("eth");

  const handleSwap = async () => {
    if (typeof window.ethereum === "undefined") {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to perform a swap.",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Placeholder for actual swap logic (e.g., interacting with a DEX router)
      console.log(`Swapping ${amount} ${fromToken} for Moral...`);
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Swap Successful!",
        description: `You have successfully swapped ${amount} ${fromToken.toUpperCase()} for Moral tokens.`,
      });

    } catch (error) {
      console.error("Swap failed:", error);
      toast({
        title: "Swap Failed",
        description: "The transaction was cancelled or failed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setAmount("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Convert to Moral</CardTitle>
        <CardDescription>
          Swap your existing tokens for Moral tokens to participate in governance and staking.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2 p-4 border rounded-lg">
          <Label htmlFor="from-amount">You pay</Label>
          <div className="flex gap-2">
            <Input
              id="from-amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl h-12 border-0 shadow-none focus-visible:ring-0"
            />
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[120px] h-12 text-lg">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map(token => (
                  <SelectItem key={token.id} value={token.id}>{token.symbol}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>

        <div className="grid gap-2 p-4 border rounded-lg">
          <Label htmlFor="to-amount">You receive (est.)</Label>
           <div className="flex gap-2">
            <Input
              id="to-amount"
              type="number"
              placeholder="0.0"
              readOnly
              value={amount ? (parseFloat(amount) * 1234.56).toFixed(2) : ""}
              className="text-2xl h-12 border-0 shadow-none focus-visible:ring-0 bg-muted/50"
            />
             <div className="w-[120px] h-12 flex items-center justify-center font-bold text-lg">
                MORAL
             </div>
          </div>
        </div>
        
        <Button onClick={handleSwap} disabled={isLoading} className="w-full font-bold" size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Swap...
            </>
          ) : (
            'Swap Tokens'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
