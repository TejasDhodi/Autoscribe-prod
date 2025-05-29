"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, TextNode, KEY_DOWN_COMMAND } from "lexical"
import { mergeRegister } from "@lexical/utils"
import { $createParagraphNode } from "lexical"
import { $getRoot } from "lexical"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, ImageIcon } from "lucide-react"
import { INSERT_IMAGE_COMMAND } from "./image-plugin"

interface SlashCommandPluginProps {
  anchorElem: HTMLDivElement | null
  onRewrite: () => void
  onImageGeneration: () => void
}

export function SlashCommandPlugin({ anchorElem, onRewrite, onImageGeneration }: SlashCommandPluginProps) {
  const [editor] = useLexicalComposerContext()
  const [slashMenuOpen, setSlashMenuOpen] = useState(false)
  const [slashQuery, setSlashQuery] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)

  const slashCommands = useMemo(
    () => [
      {
        name: "Rewrite with AI",
        description: "Rewrite selected text with AI assistance",
        icon: <Wand2 className="h-4 w-4" />,
        action: () => {
          onRewrite()
          setSlashMenuOpen(false)
        },
      },
      {
        name: "Generate Image",
        description: "Insert an AI-generated image",
        icon: <ImageIcon className="h-4 w-4" />,
        action: () => {
          editor.dispatchCommand(INSERT_IMAGE_COMMAND, "AI Generated")
          onImageGeneration()
          setSlashMenuOpen(false)
        },
      },
    ],
    [onRewrite, onImageGeneration, editor],
  )

  const filteredCommands = useMemo(() => {
    if (!slashQuery) return slashCommands
    return slashCommands.filter((cmd) => cmd.name.toLowerCase().includes(slashQuery.toLowerCase()))
  }, [slashCommands, slashQuery])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!slashMenuOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
          break
        case "Enter":
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action()
          }
          break
        case "Escape":
          e.preventDefault()
          setSlashMenuOpen(false)
          break
      }
    },
    [slashMenuOpen, filteredCommands, selectedIndex],
  )

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [onKeyDown])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection()
          if (!$isRangeSelection(selection)) {
            setSlashMenuOpen(false)
            return
          }

          const node = selection.anchor.getNode()
          if (!(node instanceof TextNode)) {
            setSlashMenuOpen(false)
            return
          }

          const textContent = node.getTextContent()
          const textBeforeCursor = textContent.slice(0, selection.anchor.offset)

          // Check if the last character typed is a slash
          if (textBeforeCursor.endsWith("/")) {
            const domSelection = window.getSelection()
            if (domSelection && domSelection.rangeCount > 0) {
              const range = domSelection.getRangeAt(0)
              const rect = range.getBoundingClientRect()
              if (anchorElem) {
                const anchorRect = anchorElem.getBoundingClientRect()
                setPosition({
                  x: rect.left - anchorRect.left,
                  y: rect.bottom - anchorRect.top,
                })
                setSlashMenuOpen(true)
                setSlashQuery("")
                setSelectedIndex(0)
              }
            }
          } else if (slashMenuOpen) {
            // Extract query after the slash
            const match = textBeforeCursor.match(/\/([^/]*)$/)
            if (match) {
              setSlashQuery(match[1] as string)
            } else {
              setSlashMenuOpen(false)
            }
          }
        })
      }),

      editor.registerCommand(
        KEY_DOWN_COMMAND,
        (e: KeyboardEvent) => {
          if (e.key === "Escape" && slashMenuOpen) {
            setSlashMenuOpen(false)
            return true
          }
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor, slashMenuOpen, anchorElem])

  const handleCommandClick = (command: (typeof slashCommands)[0]) => {
    command.action()

    // Remove the slash command text
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const node = selection.anchor.getNode()
        if (node instanceof TextNode) {
          const textContent = node.getTextContent()
          const slashIndex = textContent.lastIndexOf("/")
          if (slashIndex !== -1) {
            // Delete from slash to cursor position
            const textBeforeSlash = textContent.slice(0, slashIndex)
            node.setTextContent(textBeforeSlash)

            // If the node is now empty, replace it with a paragraph
            if (!textBeforeSlash) {
              node.remove()
              const paragraph = $createParagraphNode()
              $getRoot().append(paragraph)
            }
          }
        }
      }
    })
  }

  if (!anchorElem || !slashMenuOpen) {
    return null
  }

  return (
    <AnimatePresence>
      {slashMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            zIndex: 100,
          }}
          className="w-64 overflow-hidden rounded-md border border-border bg-background shadow-md"
        >
          <div className="p-2 text-xs font-medium text-muted-foreground">
            {slashQuery ? "Search results" : "Commands"}
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => (
                <motion.div
                  key={command.name}
                  whileHover={{ backgroundColor: "rgba(var(--muted), 0.5)" }}
                  className={`flex cursor-pointer items-center gap-2 rounded-sm p-2 text-sm ${
                    selectedIndex === index ? "bg-muted" : ""
                  }`}
                  onClick={() => handleCommandClick(command)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
                    {command.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{command.name}</div>
                    <div className="text-xs text-muted-foreground">{command.description}</div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground">No commands found</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
