export interface BalanceData {
  chain: string;
  address: string;
  balances: Record<string, number>;
  change: Record<string, number>;
}

export async function fetchBalances(address: string): Promise<BalanceData[]> {
  // Placeholder implementation: replace with real API calls.
  // Example for Etherscan:
  // const ethRes = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKey`);
  // const ethData = await ethRes.json();

  // For demonstration, return mock data.
  return [
    {
      chain: "Ethereum",
      address,
      balances: { ETH: 1.2345, USDC: 567.89 },
      change: { ETH: -0.1234, USDC: 12.34 },
    },
    {
      chain: "Base",
      address,
      balances: { BASE: 10.0, USDT: 200.0 },
      change: { BASE: 0.5, USDT: -5.0 },
    },
    {
      chain: "BSC",
      address,
      balances: { BNB: 5.0, BUSD: 100.0 },
      change: { BNB: -0.2, BUSD: 3.0 },
    },
  ];
}
