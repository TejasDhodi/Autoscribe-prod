"use client";

import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { EditorContainer } from "@/components/editor/editor";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { initialConfig } from "@/lib/editor-config";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogEditor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editorState, setEditorState] = useState<string | null>(null);

  // Load saved content from localStorage on initial render
  useEffect(() => {
    const savedContent = localStorage.getItem("autoscribe-blog-content");
    if (savedContent) {
      try {
        setEditorState(savedContent);
      } catch (error) {
        console.error("Failed to parse saved content:", error);
      }
    }
  }, []);

  const handleRewrite = () => {
    toast("Rewrite triggered (dummy function)");
  };

  const handleImageGeneration = () => {
    toast("Image generation triggered (dummy function)");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-r border-border bg-background"
          >
            <EditorSidebar
              onRewrite={handleRewrite}
              onImageGeneration={handleImageGeneration}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex-1 overflow-auto">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-4 z-10 rounded-full shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        <LexicalComposer initialConfig={initialConfig}>
          <EditorContent />
        </LexicalComposer>
      </div>
    </div>
  );
}

function EditorContent() {
  const [editor] = useLexicalComposerContext();

  // Dummy functions for slash commands
  const handleRewrite = () => {
    toast("Rewrite triggered (dummy function)");
  };

  const handleImageGeneration = () => {
    toast("Image generation triggered (dummy function)");
  };

  return (
    <div className="mx-auto max-w-4xl p-4 pt-16">
      <EditorContainer
        editor={editor}
        onRewrite={handleRewrite}
        onImageGeneration={handleImageGeneration}
      />
    </div>
  );
}
