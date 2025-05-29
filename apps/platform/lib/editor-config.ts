import { CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"

export const initialConfig = {
  namespace: "AutoScribeEditor",
  theme: {
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
      code: "bg-muted rounded px-1.5 py-0.5 font-mono text-sm",
    },
    heading: {
      h1: "text-3xl font-bold mt-6 mb-3",
      h2: "text-2xl font-bold mt-5 mb-2",
      h3: "text-xl font-bold mt-4 mb-2",
    },
    list: {
      ul: "list-disc pl-5 my-2",
      ol: "list-decimal pl-5 my-2",
      listitem: "my-1",
    },
    quote: "border-l-4 border-muted pl-4 italic my-4",
    image: "max-w-full h-auto my-4",
  },
  onError: (error: Error) => {
    console.error(error)
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
}
