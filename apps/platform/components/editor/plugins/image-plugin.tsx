"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"
import { $getSelection, $isRangeSelection, createCommand } from "lexical"
import { $createParagraphNode, $createTextNode } from "lexical"

// Create a custom command for image insertion
export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE")

export function ImagePlugin() {
  const [editor] = useLexicalComposerContext()

  // This is a simplified image plugin implementation
  useEffect(() => {
    // Register a custom command for image insertion
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: string) => {
        editor.update(() => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            // In a real implementation, this would insert an actual image node
            // For now, we'll just insert a text placeholder
            const textNode = $createTextNode(`[Image: ${payload || "placeholder"}]`)
            const paragraphNode = $createParagraphNode()
            paragraphNode.append(textNode)

            selection.insertNodes([paragraphNode])
          }
        })
        return true
      },
      1,
    )
  }, [editor])

  return null
}
