// AI Website Generation Engine
// Simulates AI-powered website generation with realistic responses

interface GenerationResult {
  description: string;
  files: Record<string, string>;
}

const TEMPLATES = {
  startup: {
    description: `🚀 **Website Generated Successfully!**

I've created a stunning startup landing page with:

- **Hero Section** with animated gradient background and particle effects
- **Features Bento Grid** showcasing your key offerings
- **Social Proof** section with animated stats counters
- **Call-to-Action** with magnetic button hover effect
- **Responsive Design** that looks great on all devices

The site uses a modern dark aesthetic with purple/cyan accents and smooth scroll animations.`,
    files: {
      "src/app/page.tsx": `"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { title: "Lightning Fast", desc: "Built for speed with modern tech stack", icon: "⚡" },
    { title: "Secure by Default", desc: "Enterprise-grade security included", icon: "🔒" },
    { title: "AI Powered", desc: "Intelligent automation out of the box", icon: "🤖" },
    { title: "Beautiful UI", desc: "Designed to impress your users", icon: "✨" },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "50ms", label: "Avg Response" },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-400">Launching Q2 2026</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build the future with
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> AI </span>
            powered software
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Transform your ideas into production-ready software in minutes, not months.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-all hover:scale-105">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-semibold transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-900/10 to-cyan-900/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-gray-400 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch?</h2>
          <p className="text-gray-400 mb-8">Join thousands of teams shipping faster with AI.</p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Start Building Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-500">
          <span>© 2026 APEX Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}`,
      "src/app/layout.tsx": `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Startup - AI Powered",
  description: "Build the future with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}`,
      "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #030712;
}
`,
      "src/app/page.module.css": `.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}`,
      "package.json": `{
  "name": "startup-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1"
  }
}`,
      "tailwind.config.js": `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`,
    },
  },

  portfolio: {
    description: `✨ **Portfolio Website Created!**

I've built an impressive portfolio with:

- **Animated Hero** with floating gradient orbs
- **Project Showcase** with hover reveal effects
- **About Section** with skills visualization
- **Contact Form** with validation
- **Smooth Page Transitions** throughout`,
    files: {
      "src/app/page.tsx": `"use client";

import { useState } from "react";

const projects = [
  { title: "Nebula Dashboard", category: "SaaS", color: "from-purple-500 to-pink-500" },
  { title: "Quantum Finance", category: "Fintech", color: "from-cyan-500 to-blue-500" },
  { title: "Vertex AI", category: "AI/ML", color: "from-orange-500 to-red-500" },
];

const skills = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-8 py-24 relative z-10">
          <p className="text-cyan-400 mb-4">Hello, I'm</p>
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Alex<br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Chen
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mb-8">
            Full-stack developer crafting beautiful digital experiences that make people say wow.
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition">
              View Work
            </a>
            <a href="#contact" className="px-6 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition">
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">Selected Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveProject(i)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className={\`absolute inset-0 bg-gradient-to-br \${project.color} opacity-20\`} />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-lg font-semibold">{project.title}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs uppercase tracking-wider text-gray-400">{project.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 px-8 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-6 py-3 rounded-full border border-white/20 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Talk</h2>
          <p className="text-gray-400 mb-8">Have a project in mind? I'd love to hear about it.</p>
          <a
            href="mailto:alex@example.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold hover:opacity-90 transition"
          >
            alex@example.com
          </a>
        </div>
      </section>
    </main>
  );
}`,
      "src/app/layout.tsx": `export const metadata = { title: "Alex Chen - Developer", description: "Portfolio" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="bg-gray-950 text-white">{children}</body></html>;
}`,
      "src/app/globals.css": `@tailwind base; @tailwind components; @tailwind utilities;`,
      "package.json": `{
  "name": "portfolio",
  "version": "0.1.0",
  "scripts": { "dev": "next dev", "build": "next build" },
  "dependencies": { "next": "14.2.0", "react": "^18.2.0", "react-dom": "^18.2.0" },
  "devDependencies": { "tailwindcss": "^3.4.1", "autoprefixer": "^10.4.18", "postcss": "^8.4.35" }
}`,
    },
  },

  ecommerce: {
    description: `🛒 **E-Commerce Store Generated!**

Your store includes:

- **Product Grid** with quick-view hover effects
- **Shopping Cart** with smooth add/remove animations
- **Category Filters** with animated transitions
- **Product Detail** modal with gallery
- **Dark Mode** aesthetic with neon accents`,
    files: {
      "src/app/page.tsx": `"use client";

import { useState } from "react";

const products = [
  { id: 1, name: "Wireless Headphones", price: 199, category: "Audio", color: "bg-purple-500" },
  { id: 2, name: "Smart Watch Pro", price: 349, category: "Wearables", color: "bg-cyan-500" },
  { id: 3, name: "Laptop Stand", price: 79, category: "Accessories", color: "bg-pink-500" },
  { id: 4, name: "Mechanical Keyboard", price: 159, category: "Accessories", color: "bg-orange-500" },
  { id: 5, name: "USB-C Hub", price: 89, category: "Accessories", color: "bg-green-500" },
  { id: 6, name: "Monitor Light", price: 69, category: "Accessories", color: "bg-yellow-500" },
];

export default function Store() {
  const [cart, setCart] = useState<number[]>([]);
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? products : products.filter(p => p.category === category);
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const addToCart = (id: number) => setCart([...cart, id]);
  const removeFromCart = (id: number) => {
    const idx = cart.indexOf(id);
    if (idx > -1) setCart(cart.filter((_, i) => i !== idx));
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            TECHSTORE
          </h1>
          <button className="relative p-2">
            <span className="text-2xl">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Tech Gear</h2>
        <p className="text-gray-400 max-w-xl mx-auto">Curated selection of the best gadgets and accessories.</p>
      </section>

      {/* Filters */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={\`px-4 py-2 rounded-full text-sm transition-all \${
                category === cat
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div
              key={product.id}
              className="group bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all"
            >
              <div className={\`h-48 \${product.color} opacity-80\`} />
              <div className="p-6">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-semibold mt-1 mb-2">{product.name}</h3>
                <p className="text-2xl font-bold">${product.price}</p>
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-full mt-4 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}`,
      "src/app/layout.tsx": `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="bg-gray-950 text-white">{children}</body></html>;
}`,
      "src/app/globals.css": `@tailwind base; @tailwind components; @tailwind utilities;`,
      "package.json": `{
  "name": "techstore",
  "dependencies": { "next": "14.2.0", "react": "^18.2.0" },
  "devDependencies": { "tailwindcss": "^3.4.1" }
}`,
    },
  },
};

export async function generateWebsite(prompt: string): Promise<GenerationResult> {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Store the prompt globally so TopBar can access it
  if (typeof window !== "undefined") {
    (window as any).__apexLastPrompt = prompt;
  }

  const lowerPrompt = prompt.toLowerCase();

  // Determine template based on prompt keywords
  if (lowerPrompt.includes("portfolio") || lowerPrompt.includes("personal") || lowerPrompt.includes("about")) {
    return TEMPLATES.portfolio;
  } else if (lowerPrompt.includes("shop") || lowerPrompt.includes("store") || lowerPrompt.includes("ecommerce") || lowerPrompt.includes("product")) {
    return TEMPLATES.ecommerce;
  } else if (lowerPrompt.includes("startup") || lowerPrompt.includes("saas") || lowerPrompt.includes("tech") || lowerPrompt.includes("app")) {
    return TEMPLATES.startup;
  }

  // Default to startup template
  return TEMPLATES.startup;
}
