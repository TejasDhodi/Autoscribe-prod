"use client"

import { useState, useCallback, useEffect } from "react"
import type { LexicalEditor } from "lexical"
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Quote,
  ImageIcon,
  Sparkles,
} from "lucide-react"
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical"
import { $setBlocksType } from "@lexical/selection"
import {  $createHeadingNode, $createQuoteNode, type HeadingTagType } from "@lexical/rich-text"
import {$createParagraphNode} from 'lexical'
import { $createCodeNode } from "@lexical/code"
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { INSERT_IMAGE_COMMAND } from "./plugins/image-plugin"

interface EditorToolbarProps {
  editor: LexicalEditor
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
    }
  }, [])

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar()
      })
    })
  }, [editor, updateToolbar])

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize))
      }
    })
  }

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatCode = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        if (selection.isCollapsed()) {
          $setBlocksType(selection, () => $createCodeNode())
        } else {
          // Apply code format to the selected text
          selection.formatText("code")
        }
      }
    })
  }

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode())
      }
    })
  }

  const insertImage = () => {
    // This is a placeholder for image insertion
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, "placeholder")

    toast("Image placeholder inserted (dummy function)")
  }

  const handleAITools = () => {
    toast("AI tools menu triggered (dummy function)")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-1 rounded-md border border-border bg-background p-1"
    >
      <Button
        variant={isBold ? "secondary" : "ghost"}
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }}
        className="h-8 w-8"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={isItalic ? "secondary" : "ghost"}
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }}
        className="h-8 w-8"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={isUnderline ? "secondary" : "ghost"}
        size="icon"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }}
        className="h-8 w-8"
      >
        <Underline className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8">
            Heading
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => formatParagraph()}>
            <span className="text-sm">Normal</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => formatHeading("h1")}>
            <Heading1 className="mr-2 h-4 w-4" />
            <span className="text-sm">Heading 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => formatHeading("h2")}>
            <Heading2 className="mr-2 h-4 w-4" />
            <span className="text-sm">Heading 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => formatHeading("h3")}>
            <Heading3 className="mr-2 h-4 w-4" />
            <span className="text-sm">Heading 3</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }}
        className="h-8 w-8"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }}
        className="h-8 w-8"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon" onClick={formatCode} className="h-8 w-8">
        <Code className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={formatQuote} className="h-8 w-8">
        <Quote className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <Button variant="ghost" size="icon" onClick={insertImage} className="h-8 w-8">
        <ImageIcon className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon" onClick={handleAITools} className="h-8 w-8 text-purple-500">
        <Sparkles className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}
