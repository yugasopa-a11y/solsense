import { Wallet, Signal, TrendingToken, Token, PortfolioHistory } from "./types";

const TOKEN_NAMES: Record<string, { name: string; logo: string }> = {
  BONK: { name: "Bonk", logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png" },
  WIF: { name: "dogwifhat", logo: "https://arweave.net/WYWP4u-40S0z6QfQ-7KG6t3qfyTN4X-gY47uvM1N" },
  POPCAT: { name: "Popcat", logo: "https://arweave.net/Popcat-logo.png" },
  MYRO: { name: "Myro", logo: "https://arweave.net/Myro-logo.png" },
  BODEN: { name: "Boden", logo: "https://arweave.net/Boden-logo.png" },
  AI: { name: "AIOZ", logo: "https://arweave.net/AIOZ-logo.png" },
  CHEX: { name: "Chex", logo: "https://arweave.net/Chex-logo.png" },
  JUP: { name: "Jupiter", logo: "https://arweave.net/JUP-logo.png" },
  DRAGON: { name: "Dragon", logo: "https://arweave.net/DRAGON-logo.png" },
  SLERF: { name: "Slerf", logo: "https://arweave.net/SLERF-logo.png" },
};

const INFLUENCERS = [
  "@CryptoWhale", "@Solanafloor", "@MarginDachang", "@MikaiaSol",
  "@ZonicApp", "@SolanaMemeCo", "@MemeCoinCryo", "@DegenRestorer"
];

const REASONS = {
  BUY: [
    "{influencer} mentioned {token} {time} ago with {impressions} impressions. Volume up {volume}% in 2h. {whales} whale wallets accumulated. Liquidity locked {lockDays} days.",
    "{token} broke resistance at ${price}. Social mentions up {mentions}% in 4h. {whales} new whale positions. DEX buys {buys}x vs sells.",
    "{influencer} called {token} 6h ago. {impressions} reached. 24h volume {volume}M. {whales} smart money positions opened."
  ],
  SELL: [
    "{token} showing weakness after {percent}% dump. {influencer} raised concerns. RSI oversold but momentum negative.",
    "Profit taking detected on {token}. {whales} wallets moved {percent}% of holdings. Volume diverging from price.",
    "{token} hitting structural resistance. {influencer} posted technical analysis showing bearish setup."
  ],
  HOLD: [
    "{token} consolidating in tight range. Awaiting breakout confirmation above ${price}. Low volume suggests continuation.",
    "No clear direction for {token}. Watch ${price} support. {influencers} monitoring. Volume compressed {percent}%.",
    "{token} showing mixed signals. {influencer} indecisive. Accumulation pattern but resistance at ${price}."
  ]
};

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateMockTokens(): Token[] {
  const numTokens = Math.floor(randomBetween(3, 8));
  const symbols = Object.keys(TOKEN_NAMES).sort(() => Math.random() - 0.5).slice(0, numTokens);

  return symbols.map(symbol => {
    const price = randomBetween(0.00001, 0.5);
    const amount = randomBetween(10000, 10000000);
    const change24h = randomBetween(-30, 80);

    return {
      symbol,
      name: TOKEN_NAMES[symbol].name,
      mint: `${symbol.toLowerCase()}${Date.now()}`,
      amount,
      value: price * amount,
      price,
      change24h,
      logo: TOKEN_NAMES[symbol].logo
    };
  });
}

export function generateMockWallet(address: string = "DemoWallet123"): Wallet {
  const solBalance = randomBetween(1, 100);
  const solPrice = 180;
  const solValue = solBalance * solPrice;
  const tokens = generateMockTokens();
  const tokensValue = tokens.reduce((sum, t) => sum + t.value, 0);

  return {
    address,
    solBalance,
    solValue,
    tokens,
    nfts: Array(Math.floor(randomBetween(0, 15))).fill(null).map((_, i) => ({
      name: `NFT #${i + 1}`,
      collection: randomChoice(["DeGods", "Solana Monkey Business", "Tensorians", "Footprint"]),
      image: `https://picsum.photos/seed/${i}/200`
    })),
    lpPositions: Array(Math.floor(randomBetween(0, 3))).fill(null).map((_, i) => ({
      pair: randomChoice(["SOL-USDC", "BONK-SOL", "WIF-SOL"]),
      liquidity: randomBetween(10000, 500000),
      value: randomBetween(500, 10000)
    })),
    totalValue: solValue + tokensValue
  };
}

export function generateSignal(tokens: Token[]): Signal {
  const type = Math.random() < 0.5 ? "BUY" : Math.random() < 0.67 ? "HOLD" : "SELL";
  const token = tokens.length > 0 ? randomChoice(tokens) : {
    symbol: randomChoice(Object.keys(TOKEN_NAMES)),
    name: "",
    value: 0,
    change24h: 0
  };

  const tokenData = TOKEN_NAMES[token.symbol] || { name: token.symbol };
  const influencer = randomChoice(INFLUENCERS);
  const reasonTemplate = randomChoice(REASONS[type]);

  const reason = reasonTemplate
    .replace("{influencer}", influencer)
    .replace("{token}", token.symbol)
    .replace("{time}", `${Math.floor(randomBetween(1, 12))}h`)
    .replace("{impressions}", `${Math.floor(randomBetween(10, 500))}K`)
    .replace("{volume}", `${Math.floor(randomBetween(50, 800))}`)
    .replace("{whales}", `${Math.floor(randomBetween(5, 25))}`)
    .replace("{lockDays}", `${Math.floor(randomBetween(30, 365))}`)
    .replace("{price}", `$${randomBetween(0.0001, 2).toFixed(5)}`)
    .replace("{mentions}", `${Math.floor(randomBetween(100, 2000))}`)
    .replace("{buys}", `${Math.floor(randomBetween(2, 15))}`)
    .replace("{percent}", `${Math.floor(randomBetween(5, 40))}`);

  return {
    id: `signal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    token: tokenData.name || token.symbol,
    ticker: token.symbol,
    confidence: Math.floor(randomBetween(65, 97)),
    reason,
    timestamp: new Date(),
    volume24h: randomBetween(100000, 10000000),
    rugRisk: randomChoice(["Low", "Low", "Low", "Medium"]),
    logo: TOKEN_NAMES[token.symbol]?.logo,
    price: token.price || randomBetween(0.0001, 1),
    change24h: token.change24h || randomBetween(-20, 60)
  };
}

export function generateTrendingTokens(): TrendingToken[] {
  const trendingTokens = [
    { ticker: "FWOG", name: "FWOG", pumpFun: true },
    { ticker: "MOTHER", name: "MOTHER", pumpFun: true },
    { ticker: "HIPPO", name: "Hippo", pumpFun: false },
    { ticker: "BOME", name: "BOOK OF MEME", pumpFun: false },
    { ticker: "MEW", name: "cat in a dogs world", pumpFun: false },
    { ticker: "PNUT", name: "Peanut", pumpFun: true },
    { ticker: "SCUM", name: "Scum", pumpFun: true },
    { ticker: "RENDER", name: "Render", pumpFun: false },
    { ticker: "BONK", name: "Bonk", pumpFun: false },
    { ticker: "WIF", name: "dogwifhat", pumpFun: false },
  ];

  return trendingTokens.map((t, i) => ({
    id: `trending-${t.ticker}`,
    name: t.name,
    ticker: t.ticker,
    price: randomBetween(0.00001, 0.05),
    change1h: randomBetween(-15, 25),
    change24h: randomBetween(-40, 300),
    volume: randomBetween(10000, 5000000),
    socialMentions: Math.floor(randomBetween(100, 50000)),
    hypeScore: Math.floor(randomBetween(20, 100)),
    launchTime: i < 3 ? "2h ago" : i < 5 ? "5h ago" : `${Math.floor(randomBetween(1, 30))}d ago`,
    isNew: i < 3,
    pumpFun: t.pumpFun,
    logo: TOKEN_NAMES[t.ticker]?.logo
  }));
}

export function generatePortfolioHistory(days: number = 30): PortfolioHistory[] {
  const history: PortfolioHistory[] = [];
  let value = randomBetween(8000, 15000);

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    value = value * (1 + randomBetween(-0.05, 0.08));
    history.push({ timestamp: date, value });
  }

  return history;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toFixed(2);
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}
