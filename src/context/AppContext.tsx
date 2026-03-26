"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
}

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  files?: Record<string, string>;
}

export interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface AppState {
  messages: Message[];
  files: Record<string, string>;
  fileTree: FileNode[];
  previewUrl: string | null;
  isGenerating: boolean;
  activePanel: "build" | "preview" | "download";
  previewDevice: "desktop" | "tablet" | "mobile";
  toasts: Toast[];
}

interface AppContextType extends AppState {
  addMessage: (role: "user" | "ai", content: string, files?: Record<string, string>) => void;
  setFiles: (files: Record<string, string>) => void;
  setPreviewUrl: (url: string | null) => void;
  setIsGenerating: (value: boolean) => void;
  setActivePanel: (panel: "build" | "preview" | "download") => void;
  setPreviewDevice: (device: "desktop" | "tablet" | "mobile") => void;
  addToast: (type: Toast["type"], message: string) => void;
  removeToast: (id: string) => void;
  reset: () => void;
}

const initialState: AppState = {
  messages: [],
  files: {},
  fileTree: [],
  previewUrl: null,
  isGenerating: false,
  activePanel: "build",
  previewDevice: "desktop",
  toasts: [],
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const addMessage = useCallback((role: "user" | "ai", content: string, files?: Record<string, string>) => {
    const message: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      files,
    };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
      files: files ? { ...prev.files, ...files } : prev.files,
    }));
  }, []);

  const setFiles = useCallback((files: Record<string, string>) => {
    setState(prev => ({
      ...prev,
      files,
      fileTree: buildFileTree(files),
    }));
  }, []);

  const setPreviewUrl = useCallback((url: string | null) => {
    setState(prev => ({ ...prev, previewUrl: url }));
  }, []);

  const setIsGenerating = useCallback((value: boolean) => {
    setState(prev => ({ ...prev, isGenerating: value }));
  }, []);

  const setActivePanel = useCallback((panel: "build" | "preview" | "download") => {
    setState(prev => ({ ...prev, activePanel: panel }));
  }, []);

  const setPreviewDevice = useCallback((device: "desktop" | "tablet" | "mobile") => {
    setState(prev => ({ ...prev, previewDevice: device }));
  }, []);

  const addToast = useCallback((type: Toast["type"], message: string) => {
    const toast: Toast = {
      id: `toast-${Date.now()}`,
      type,
      message,
    };
    setState(prev => ({ ...prev, toasts: [...prev.toasts, toast] }));
    setTimeout(() => removeToast(toast.id), 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setState(prev => ({ ...prev, toasts: prev.toasts.filter(t => t.id !== id) }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        addMessage,
        setFiles,
        setPreviewUrl,
        setIsGenerating,
        setActivePanel,
        setPreviewDevice,
        addToast,
        removeToast,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

function buildFileTree(files: Record<string, string>): FileNode[] {
  const tree: FileNode[] = [];
  const sortedKeys = Object.keys(files).sort();

  for (const path of sortedKeys) {
    const parts = path.split("/");
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const existing = current.find(n => n.name === part);

      if (existing) {
        if (!isFile) {
          current = existing.children || [];
        }
      } else {
        const node: FileNode = isFile
          ? { name: part, type: "file", content: files[path] }
          : { name: part, type: "folder", children: [] };

        current.push(node);
        if (!isFile) {
          current = node.children!;
        }
      }
    }
  }

  return tree;
}
