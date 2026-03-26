# APEX — AI Website Builder

## Concept & Vision
APEX is a browser-based AI website builder with a terminal/IDE aesthetic. It looks like VS Code meets a retro terminal — dark backgrounds, glowing syntax highlighting, monospace everything — but underneath it's a modern Next.js 14 app powered by AI. The user describes what they want in plain English, and APEX builds it in real-time with a live preview. The experience should feel like pair programming with an elite senior engineer who happens to be a world-class designer.

## Design Language

### Aesthetic Direction
"Terminal Brutalism meets Modern IDE" — inspired by VS Code's dark theme, Vercel's polish, and retro CRT terminal vibes. Not cosplay — elevated.

### Color Palette
- Background: `#0a0a0b` (near-black)
- Surface: `#111113` (elevated panels)
- Border: `#1e1e1e` (subtle dividers)
- Primary text: `#e4e4e7` (zinc-200)
- Secondary text: `#71717a` (zinc-500)
- Accent green: `#22c55e` (command success / cursor glow)
- Accent cyan: `#06b6d4` (links, highlights)
- Accent amber: `#f59e0b` (warnings, highlights)
- Accent red: `#ef4444` (errors)
- Accent purple: `#a855f7` (AI responses)
- Selection: `rgba(139, 92, 246, 0.3)`

### Typography
- Primary: **JetBrains Mono** (Google Fonts) — everything monospace
- Fallback: `Fira Code`, `Consolas`, `Monaco`, monospace
- Scale: 11px (small), 13px (body), 15px (headings), 24px (hero)
- Line height: 1.6 for readability in code

### Spatial System
- Base unit: 4px
- Panel padding: 16px
- Gap between elements: 8px / 12px / 16px
- Border radius: 6px (subtle, not rounded)
- Panel borders: 1px solid var(--border)

### Motion Philosophy
- Instant feedback for typing (no delay)
- 150ms ease-out for panel transitions
- 200ms for hover states
- Cursor blink: 530ms interval
- Typing animation for AI responses: 20ms per character
- Smooth scroll within preview iframe

### Visual Assets
- Lucide icons (consistent stroke width)
- Custom SVG favicon: "A" in a terminal window
- No stock photos — the UI IS the aesthetic
- Noise texture overlay at 2% opacity for depth
- Subtle scanline effect on header

## Layout & Structure

### Main Layout (3-panel IDE)
```
┌─────────────────────────────────────────────────────────┐
│ [≡ APEX]  ─────────────── [Build] [Preview] [Download]  │ ← TopBar
├─────────────┬───────────────────────┬───────────────────┤
│             │                       │                   │
│  EXPLORER  │    TERMINAL / CHAT     │   LIVE PREVIEW    │
│  (files)   │                       │                   │
│             │  > user input         │   [iframe]        │
│             │  AI response...       │                   │
│             │  Code blocks          │                   │
│             │                       │                   │
├─────────────┴───────────────────────┴───────────────────┤
│ [status bar: project name | file count | tokens]       │
└─────────────────────────────────────────────────────────┘
```

### Responsive Strategy
- Desktop (>1024px): Full 3-panel layout
- Tablet (768-1024px): 2-panel, preview toggles
- Mobile (<768px): Single panel with tab navigation

## Features & Interactions

### 1. Chat Terminal
- Terminal-style input with `>` prompt
- User types website description
- AI responds with typing animation
- Code blocks are syntax-highlighted and copyable
- Click any code block to copy — shows "Copied!" toast
- Scroll history preserved

### 2. File Explorer
- Shows generated project structure
- File tree with icons (folder, file types)
- Click file to preview its content in a modal
- Files: `page.tsx`, `layout.tsx`, `globals.css`, `components/`, etc.

### 3. Live Preview
- Sandboxed iframe showing the built website
- Refresh button to manually reload
- Device toggle: Desktop / Tablet / Mobile
- Opens in new tab option
- Loading skeleton while generating

### 4. Build Controls
- **Build**: Triggers AI to generate code
- **Preview**: Updates iframe
- **Download**: ZIPs all files and triggers download
- **Reset**: Clears session

### 5. AI Generation Flow
1. User describes website
2. APEX generates SPEC.md first
3. Then builds the full Next.js project
4. Files appear in explorer as they're created
5. Preview auto-refreshes
6. User can download when satisfied

### Edge Cases
- Empty state: Animated terminal with "Describe your dream website..."
- Error state: Red glow + error message in terminal
- Loading: Pulsing cursor in terminal
- Long output: Auto-scroll to bottom, pause if user scrolls up

## Component Inventory

### TopBar
- Logo with glitch hover effect
- Tab buttons: Build, Preview, Download (with icons)
- Subtle bottom border glow

### TerminalInput
- `>` prefix in accent green
- Input field with blinking cursor
- Submit on Enter
- Disabled during AI response

### AIMessage
- Purple left border (distinguishes from user)
- Markdown-rendered content
- Code blocks with filename header + copy button
- Typing animation on first render

### FileTree
- Indented tree structure
- Folder icons (open/closed)
- File icons by extension
- Hover highlight

### PreviewFrame
- Sandboxed iframe
- Device width simulation
- Loading overlay
- Refresh button

### StatusBar
- Fixed bottom
- Shows: project name, file count, last build time
- Click to see stats

### Toast
- Bottom-right positioning
- Auto-dismiss after 3s
- Success (green), Error (red), Info (cyan)

## Technical Approach

### Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Lucide React icons
- JSZip for downloads
- Blob API for file downloads

### Architecture
- Single-page app (no routing needed)
- All state in React Context
- Mock AI responses (simulated for demo)
- All generated code stored in state
- File tree derived from generated files object

### Key Implementation Details
- Iframe uses `srcdoc` for preview
- Syntax highlighting via CSS classes (no heavy library)
- Download creates Blob URLs
- All animations use Framer Motion
- CSS custom properties for theming
