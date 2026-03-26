"use client";

import { AppProvider } from "@/context/AppContext";
import { TopBar } from "@/components/TopBar";
import { Terminal } from "@/components/Terminal";
import { FileExplorer } from "@/components/FileExplorer";
import { Preview } from "@/components/Preview";
import { StatusBar } from "@/components/StatusBar";
import { ToastContainer } from "@/components/Toast";

export default function Home() {
  return (
    <AppProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - File Explorer */}
          <div className="w-64 flex-shrink-0 relative">
            <FileExplorer />
          </div>

          {/* Center Panel - Terminal */}
          <div className="flex-1 min-w-0">
            <Terminal />
          </div>

          {/* Right Panel - Preview */}
          <div className="w-[45%] flex-shrink-0 hidden lg:block">
            <Preview />
          </div>
        </div>

        {/* Status Bar */}
        <StatusBar />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
