export interface Wallet {
  address: string;
  solBalance: number;
  solValue: number;
  tokens: Token[];
  nfts: NFT[];
  lpPositions: LPPosition[];
  totalValue: number;
}

export interface Token {
  symbol: string;
  name: string;
  mint: string;
  amount: number;
  value: number;
  price: number;
  change24h: number;
  logo?: string;
}

export interface NFT {
  name: string;
  collection: string;
  image: string;
}

export interface LPPosition {
  pair: string;
  liquidity: number;
  value: number;
}

export interface Signal {
  id: string;
  type: "BUY" | "SELL" | "HOLD";
  token: string;
  ticker: string;
  confidence: number;
  reason: string;
  timestamp: Date;
  volume24h?: number;
  rugRisk?: "Low" | "Medium" | "High";
  logo?: string;
  price?: number;
  change24h?: number;
}

export interface TrendingToken {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change1h: number;
  change24h: number;
  volume: number;
  socialMentions: number;
  hypeScore: number;
  launchTime: string;
  isNew: boolean;
  pumpFun?: boolean;
  logo?: string;
}

export interface PortfolioHistory {
  timestamp: Date;
  value: number;
}

export interface Toast {
  id: string;
  signal: Signal;
}
