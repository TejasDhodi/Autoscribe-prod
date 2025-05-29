"use client";

import { useState } from "react";
import type { LexicalEditor } from "lexical";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { EditorToolbar } from "./editor-toolbar";
import { SlashCommandPlugin } from "./plugins/slash-command-plugin";
import { ImagePlugin } from "./plugins/image-plugin";
import { motion } from "framer-motion";

interface EditorContainerProps {
  editor: LexicalEditor;
  onRewrite: () => void;
  onImageGeneration: () => void;
}

export function EditorContainer({
  editor,
  onRewrite,
  onImageGeneration,
}: EditorContainerProps) {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onChange = (editorState: any) => {
    // Save to localStorage
    const json = editorState.toJSON();
    localStorage.setItem("autoscribe-blog-content", JSON.stringify(json));
  };

  return (
    <div className="relative min-h-[500px] rounded-lg border border-border bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <EditorToolbar editor={editor} />
      </motion.div>

      <div className="relative" ref={setFloatingAnchorElem}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[400px] outline-none focus:outline-none" />
          }
          placeholder={
            <div className="pointer-events-none absolute left-0 top-0 text-muted-foreground">
              Start writing your blog post...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>

      {/* Core plugins */}
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ListPlugin />
      <LinkPlugin />
      <ImagePlugin />
      <OnChangePlugin onChange={onChange} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

      {/* Custom plugins */}
      <SlashCommandPlugin
        anchorElem={floatingAnchorElem}
        onRewrite={onRewrite}
        onImageGeneration={onImageGeneration}
      />
    </div>
  );
}
