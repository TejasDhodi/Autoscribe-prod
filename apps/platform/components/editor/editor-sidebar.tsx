"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Sparkles, ImageIcon, Wand2 } from "lucide-react";

interface EditorSidebarProps {
  onRewrite: () => void;
  onImageGeneration: () => void;
}

export function EditorSidebar({
  onRewrite,
  onImageGeneration,
}: EditorSidebarProps) {
  const sidebarItems = [
    {
      title: "AI Rewrite",
      description: "Rewrite your content with AI assistance",
      icon: <Wand2 className="h-5 w-5" />,
      onClick: onRewrite,
    },
    {
      title: "Generate Image",
      description: "Create AI-generated images for your blog",
      icon: <ImageIcon className="h-5 w-5" />,
      onClick: onImageGeneration,
    },
  ];

  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center gap-2 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600">
          <span className="text-sm font-bold text-white">A</span>
        </div>
        <h1 className="text-lg font-bold">AutoScribe AI</h1>
      </div>

      <Separator className="mb-4" />

      <h2 className="mb-4 flex items-center gap-2 font-medium">
        <Sparkles className="h-4 w-4 text-purple-500" /> AI Tools
      </h2>

      <div className="space-y-3">
        {sidebarItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className="flex h-auto w-full flex-col items-start gap-1 p-3 text-left"
              onClick={item.onClick}
            >
              <div className="flex w-full items-center gap-2">
                <div className="rounded-md bg-purple-100 p-1.5 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                  {item.icon}
                </div>
                <span className="font-medium">{item.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="rounded-md bg-muted p-3 text-sm">
          <p className="font-medium">Pro Tip</p>
          <p className="text-xs text-muted-foreground">
            Use slash commands (/) in the editor to quickly access AI tools and
            formatting options.
          </p>
        </div>
      </div>
    </div>
  );
}
