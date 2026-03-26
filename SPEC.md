# SolSense - Solana Portfolio Intelligence Platform

## Project Overview
- **Project Name**: SolSense
- **Type**: Next.js 14+ Web Application
- **Core Functionality**: AI-powered trading signal hub for Solana ecosystem featuring real-time wallet intelligence, social media signal crawling, and on-chain analytics
- **Target Users**: Solana traders, meme coin investors, and DeFi enthusiasts

## Visual & Rendering Specification

### Color Palette
- Page Background: `#0a0a0f`
- Card Background: `#0d0d14`
- Default Borders: `rgba(255,255,255,0.06)`
- Highlighted Borders: `rgba(99,102,241,0.4)`
- BUY Signal: `#10b981` (emerald-500)
- SELL Signal: `#ef4444` (red-500)
- HOLD Signal: `#f59e0b` (amber-500)
- Primary Accent: `#6366f1` (indigo-500)
- Secondary Accent: `#8b5cf6` (purple-500)
- Neon Pink (NEW badges): `#ff6b9d`

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold, white
- Body: Regular, neutral-400
- Monospace numbers: tabular-nums class

### UI Components

#### 1. Navbar
- Logo "SolSense" on left with gradient text
- Nav links center: Dashboard, Signals, Trending, Watchlist, Alerts
- Live SOL price ticker on right
- Connect Wallet button using MovingBorderButton component

#### 2. Hero Section
- Spotlight animated background
- TypewriterEffect headline
- Wallet input field with border-neutral-800
- MovingBorder "Start Analyzing" button

#### 3. Dashboard (Post-Connection)
- Row 1: 3 StatCards (Portfolio Value, Today's P&L, Active Signals)
- Row 2: BentoGrid - Signal Feed (2 cols) + Wallet Assets (1 col)
- Row 3: BentoGrid - Portfolio Chart (2 cols) + Trending Memecoins (1 col)

#### 4. Signal Cards
- Hover effect with AnimatePresence
- Color-coded borders per signal type
- Token logo, ticker, signal type badge, confidence score

#### 5. Toast Notifications
- Fixed bottom-right position
- Animated with framer-motion
- Pulsing indicator dot
- Dismissible with X button

#### 6. Modals
- Glassmorphism background
- Blur backdrop
- Gradient top border
- Signal detail with AI reasoning

### Animations
- Spotlight hero: 2s ease 0.75s 1 forwards
- Signal cards: opacity 0→1, y 20→0, staggered
- Toast: spring physics (stiffness 300, damping 30)
- MovingBorder: continuous 2000ms loop

## Simulation Specification

### Mock Data Engine
Since real API integration requires API keys, implement comprehensive mock data:

#### Wallet Simulation
- Generate realistic SOL balance ($500-$50,000 range)
- SPL tokens: 3-8 tokens with realistic tickers (BONK, WIF, POPCAT, etc.)
- NFT count: 0-15
- LP positions: 0-3

#### Signal Generation
- Random signal types: BUY (50%), SELL (20%), HOLD (30%)
- Confidence: 65%-97%
- AI reasoning: Template-based with dynamic values

#### Trending Tokens
- 8-12 trending memecoins
- Social mentions: 100-50,000
- Volume: $10K-$5M
- Hype score: 1-100 bar
- Time since launch: 1h-30d

### Real-time Updates
- Simulated WebSocket-style updates every 10-30 seconds
- Random P&L fluctuations
- New signals appearing periodically

## Interaction Specification

### User Controls
- Wallet address input field
- Connect Wallet button (simulated)
- Signal card hover/click interactions
- Modal open/close
- Toast dismiss
- Mobile menu toggle

### Responsive Breakpoints
- Mobile: < 768px (stack all columns)
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Technical Stack
- Next.js 14+
- Tailwind CSS
- Framer Motion
- Aceternity UI components
- Lucide React icons
- shadcn/ui components
- TradingView Lightweight Charts

## Acceptance Criteria
1. Hero section displays with spotlight animation and typewriter effect
2. Wallet input accepts SOL address and triggers dashboard view
3. StatCards show realistic mock data with P&L changes
4. BentoGrid layout renders all 4 sections correctly
5. Signal cards animate on hover with color-coded borders
6. Toast notifications appear in bottom-right with pulsing indicators
7. Modal opens on signal click with full details
8. Trending memecoins show with hype bars and NEW badges
9. Mobile responsive: all columns stack vertically
10. All animations run at 60fps without jank
