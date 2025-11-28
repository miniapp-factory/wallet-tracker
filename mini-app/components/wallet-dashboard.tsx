"use client";

import { useState } from "react";
import { fetchBalances, BalanceData } from "@/lib/fetchBalances";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WalletDashboard() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BalanceData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchBalances(address);
      setData(result);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Wallet Balance Analyzer</CardTitle>
        <CardDescription>
          Enter a wallet address to view its historic asset balances across Base, BSC, and Ethereum.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Input
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={handleFetch} disabled={loading || !address}>
            {loading ? "Loading…" : "Fetch Balances"}
          </Button>
        </div>
        {error && <p className="text-destructive">{error}</p>}
        {data && (
          <div className="space-y-4">
            {data.map((chainData) => (
              <Card key={chainData.chain} className="bg-muted/50">
                <CardHeader>
                  <CardTitle>{chainData.chain}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {Object.entries(chainData.balances).map(([token, balance]) => (
                      <li key={token}>
                        <span className="font-medium">{token}:</span>{" "}
                        <span>{balance.toFixed(4)}</span>{" "}
                        <span className="text-muted-foreground">
                          ({chainData.change[token]?.toFixed(4) ?? "N/A"} change)
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
