"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import {
  Folder,
  FolderOpen,
  File,
  FileCode,
  FileJson,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";

export function FileExplorer() {
  const { files } = useApp();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src", "src/app"]));
  const [selectedFile, setSelectedFile] = useState<{ name: string; content: string } | null>(null);

  const fileTree = buildTree(files);

  const toggleFolder = (path: string) => {
    const next = new Set(expandedFolders);
    if (next.has(path)) {
      next.delete(path);
    } else {
      next.add(path);
    }
    setExpandedFolders(next);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "var(--bg)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b text-xs font-medium uppercase tracking-wider"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-secondary)",
        }}
      >
        <Folder className="w-3.5 h-3.5" />
        EXPLORER
        <span
          className="ml-auto px-1.5 py-0.5 rounded text-[10px]"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {Object.keys(files).length}
        </span>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto p-2">
        {Object.keys(files).length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-full text-center p-4"
            style={{ color: "var(--text-secondary)" }}
          >
            <File className="w-8 h-8 mb-3 opacity-30" />
            <p className="text-xs">No files yet</p>
            <p className="text-[10px] mt-1">
              Describe a website to generate files
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {renderTree(fileTree, "", expandedFolders, toggleFolder, (name, content) =>
              setSelectedFile({ name, content })
            )}
          </div>
        )}
      </div>

      {/* File preview modal */}
      {selectedFile && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center p-8"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[80vh] rounded-lg overflow-hidden flex flex-col"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <span className="text-sm font-medium" style={{ color: "var(--accent-amber)" }}>
                {selectedFile.name}
              </span>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <pre
              className="flex-1 overflow-auto p-4 text-xs"
              style={{
                color: "var(--text-secondary)",
                background: "#0a0a0b",
              }}
            >
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

interface TreeNode {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: TreeNode[];
  content?: string;
}

function buildTree(files: Record<string, string>): TreeNode[] {
  const root: TreeNode[] = [];

  for (const filePath of Object.keys(files)) {
    const parts = filePath.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const currentPath = parts.slice(0, i + 1).join("/");

      let node = current.find((n) => n.name === part);

      if (!node) {
        node = {
          name: part,
          path: currentPath,
          type: isFile ? "file" : "folder",
          children: isFile ? undefined : [],
          content: isFile ? files[filePath] : undefined,
        };
        current.push(node);
      }

      if (!isFile) {
        current = node.children!;
      }
    }
  }

  return sortTree(root);
}

function sortTree(nodes: TreeNode[]): TreeNode[] {
  return nodes
    .map((node) => ({
      ...node,
      children: node.children ? sortTree(node.children) : undefined,
    }))
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

function renderTree(
  nodes: TreeNode[],
  parentPath: string,
  expandedFolders: Set<string>,
  toggleFolder: (path: string) => void,
  onFileClick: (name: string, content: string) => void
): React.ReactNode {
  return nodes.map((node) => {
    const fullPath = node.path;
    const isExpanded = expandedFolders.has(fullPath);
    const isFolder = node.type === "folder";

    return (
      <div key={fullPath}>
        <button
          onClick={() => (isFolder ? toggleFolder(fullPath) : onFileClick(node.name, node.content!))}
          className="flex items-center gap-1.5 w-full px-2 py-1 rounded text-xs hover:bg-white/5 transition-colors text-left"
          style={{ color: "var(--text-primary)" }}
        >
          {isFolder && (
            <span className="w-3 h-3 flex items-center justify-center">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </span>
          )}
          {isFolder ? (
            isExpanded ? (
              <FolderOpen className="w-3.5 h-3.5" style={{ color: "var(--accent-amber)" }} />
            ) : (
              <Folder className="w-3.5 h-3.5" style={{ color: "var(--accent-amber)" }} />
            )
          ) : (
            <FileCode className="w-3.5 h-3.5" style={{ color: "var(--accent-cyan)" }} />
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {isFolder && isExpanded && node.children && (
          <div className="ml-4">{renderTree(node.children, fullPath, expandedFolders, toggleFolder, onFileClick)}</div>
        )}
      </div>
    );
  });
}
