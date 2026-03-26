import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APEX — AI Website Builder",
  description: "Build stunning websites with AI. Describe what you want and watch it come to life.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230a0a0b' width='100' height='100' rx='12'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='60' font-family='monospace' fill='%23a855f7'>A</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="noise scanlines">
        {children}
      </body>
    </html>
  );
}
