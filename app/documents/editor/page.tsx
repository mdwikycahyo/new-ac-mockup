"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  ImageIcon,
  Table,
  CheckSquare,
  ChevronDown,
  AlignLeft,
  Save,
  ArrowLeft,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"

export default function DocumentEditor() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "blank"
  const [title, setTitle] = useState("")
  const [blocks, setBlocks] = useState<Block[]>([{ id: "1", type: "paragraph", content: "" }])
  const [selectedBlockId, setSelectedBlockId] = useState("1")
  const editorRef = useRef<HTMLDivElement>(null)

  // Load template content based on templateId
  useEffect(() => {
    const template = getTemplateContent(templateId)
    setTitle(template.title)
    setBlocks(template.blocks)
  }, [templateId])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleBlockChange = (id: string, content: string) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === id) {
          return { ...block, content }
        }
        return block
      }),
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent, blockId: string) => {
    const blockIndex = blocks.findIndex((block) => block.id === blockId)

    // Enter key creates a new block
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const newBlock = { id: Date.now().toString(), type: "paragraph", content: "" }
      const updatedBlocks = [...blocks]
      updatedBlocks.splice(blockIndex + 1, 0, newBlock)
      setBlocks(updatedBlocks)
      setSelectedBlockId(newBlock.id)
    }

    // Backspace on empty block deletes it
    if (e.key === "Backspace" && blocks[blockIndex].content === "" && blocks.length > 1) {
      e.preventDefault()
      const updatedBlocks = blocks.filter((_, index) => index !== blockIndex)
      setBlocks(updatedBlocks)
      setSelectedBlockId(blocks[blockIndex - 1]?.id || blocks[blockIndex + 1]?.id)
    }
  }

  const addBlock = (type: BlockType) => {
    const blockIndex = blocks.findIndex((block) => block.id === selectedBlockId)
    const newBlock = { id: Date.now().toString(), type, content: "" }
    const updatedBlocks = [...blocks]
    updatedBlocks.splice(blockIndex + 1, 0, newBlock)
    setBlocks(updatedBlocks)
    setSelectedBlockId(newBlock.id)
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/documents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Untitled Document"
            className="max-w-md border-none text-xl font-bold focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="flex-1 p-0">
        <div className="border-b p-2">
          <div className="flex flex-wrap items-center gap-1">
            <Button variant="ghost" size="sm">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Underline className="h-4 w-4" />
            </Button>
            <div className="mx-1 h-4 w-px bg-border" />
            <Button variant="ghost" size="sm">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <div className="mx-1 h-4 w-px bg-border" />
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <CheckSquare className="h-4 w-4" />
            </Button>
            <div className="mx-1 h-4 w-px bg-border" />
            <Button variant="ghost" size="sm">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Table className="h-4 w-4" />
            </Button>
            <div className="mx-1 h-4 w-px bg-border" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  Text <ChevronDown className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0">
                <div className="p-1">
                  {blockTypes.map((blockType) => (
                    <Button
                      key={blockType.type}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => addBlock(blockType.type)}
                    >
                      <blockType.icon className="mr-2 h-4 w-4" />
                      {blockType.label}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mx-auto max-w-3xl p-8" ref={editorRef}>
          {blocks.map((block) => (
            <EditorBlock
              key={block.id}
              block={block}
              isSelected={selectedBlockId === block.id}
              onChange={(content) => handleBlockChange(block.id, content)}
              onSelect={() => setSelectedBlockId(block.id)}
              onKeyDown={(e) => handleKeyDown(e, block.id)}
            />
          ))}
        </div>
      </Card>

      <div className="fixed bottom-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>+ Add Block</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {blockTypes.map((blockType) => (
              <DropdownMenuItem key={blockType.type} onClick={() => addBlock(blockType.type)}>
                <blockType.icon className="mr-2 h-4 w-4" />
                {blockType.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "bulletList"
  | "numberedList"
  | "todo"
  | "image"
  | "table"

interface Block {
  id: string
  type: BlockType
  content: string
}

interface EditorBlockProps {
  block: Block
  isSelected: boolean
  onChange: (content: string) => void
  onSelect: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
}

function EditorBlock({ block, isSelected, onChange, onSelect, onKeyDown }: EditorBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSelected && blockRef.current) {
      blockRef.current.focus()
    }
  }, [isSelected])

  const renderBlock = () => {
    switch (block.type) {
      case "heading1":
        return (
          <div
            ref={blockRef}
            contentEditable
            className="mb-4 outline-none text-3xl font-bold"
            onInput={(e) => onChange(e.currentTarget.textContent || "")}
            onKeyDown={onKeyDown}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      case "heading2":
        return (
          <div
            ref={blockRef}
            contentEditable
            className="mb-3 outline-none text-2xl font-bold"
            onInput={(e) => onChange(e.currentTarget.textContent || "")}
            onKeyDown={onKeyDown}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      case "heading3":
        return (
          <div
            ref={blockRef}
            contentEditable
            className="mb-2 outline-none text-xl font-bold"
            onInput={(e) => onChange(e.currentTarget.textContent || "")}
            onKeyDown={onKeyDown}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      case "bulletList":
        return (
          <div className="flex">
            <div className="mr-2 mt-1.5">•</div>
            <div
              ref={blockRef}
              contentEditable
              className="flex-1 outline-none"
              onInput={(e) => onChange(e.currentTarget.textContent || "")}
              onKeyDown={onKeyDown}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        )
      case "numberedList":
        return (
          <div className="flex">
            <div className="mr-2 mt-1.5">1.</div>
            <div
              ref={blockRef}
              contentEditable
              className="flex-1 outline-none"
              onInput={(e) => onChange(e.currentTarget.textContent || "")}
              onKeyDown={onKeyDown}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        )
      case "todo":
        return (
          <div className="flex items-start">
            <input type="checkbox" className="mt-1.5 mr-2" />
            <div
              ref={blockRef}
              contentEditable
              className="flex-1 outline-none"
              onInput={(e) => onChange(e.currentTarget.textContent || "")}
              onKeyDown={onKeyDown}
              dangerouslySetInnerHTML={{ __html: block.content }}
            />
          </div>
        )
      case "image":
        return (
          <div className="my-4">
            <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div
              ref={blockRef}
              contentEditable
              className="mt-2 text-center text-sm text-muted-foreground outline-none"
              onInput={(e) => onChange(e.currentTarget.textContent || "")}
              onKeyDown={onKeyDown}
              dangerouslySetInnerHTML={{ __html: block.content || "Add caption..." }}
            />
          </div>
        )
      case "table":
        return (
          <div className="my-4">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border p-2">
                    <div
                      contentEditable
                      className="outline-none"
                      onInput={(e) => onChange(e.currentTarget.textContent || "")}
                    />
                  </td>
                  <td className="border p-2">
                    <div contentEditable className="outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <div contentEditable className="outline-none" />
                  </td>
                  <td className="border p-2">
                    <div contentEditable className="outline-none" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      default:
        return (
          <div
            ref={blockRef}
            contentEditable
            className="mb-3 outline-none"
            onInput={(e) => onChange(e.currentTarget.textContent || "")}
            onKeyDown={onKeyDown}
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
    }
  }

  return (
    <div
      className={`relative rounded-md p-1 transition-colors ${isSelected ? "bg-accent/30" : "hover:bg-accent/10"}`}
      onClick={onSelect}
    >
      {renderBlock()}
    </div>
  )
}

const blockTypes = [
  { type: "paragraph" as BlockType, label: "Text", icon: AlignLeft },
  { type: "heading1" as BlockType, label: "Heading 1", icon: Bold },
  { type: "heading2" as BlockType, label: "Heading 2", icon: Bold },
  { type: "heading3" as BlockType, label: "Heading 3", icon: Bold },
  { type: "bulletList" as BlockType, label: "Bullet List", icon: List },
  { type: "numberedList" as BlockType, label: "Numbered List", icon: ListOrdered },
  { type: "todo" as BlockType, label: "To-do List", icon: CheckSquare },
  { type: "image" as BlockType, label: "Image", icon: ImageIcon },
  { type: "table" as BlockType, label: "Table", icon: Table },
]

function getTemplateContent(templateId: string): { title: string; blocks: Block[] } {
  switch (templateId) {
    case "meeting-notes":
      return {
        title: "Meeting Notes",
        blocks: [
          { id: "1", type: "heading1", content: "Meeting Notes" },
          { id: "2", type: "heading3", content: "Date: April 15, 2025" },
          { id: "3", type: "heading3", content: "Participants:" },
          { id: "4", type: "bulletList", content: "John Doe" },
          { id: "5", type: "bulletList", content: "Jane Smith" },
          { id: "6", type: "heading2", content: "Agenda" },
          { id: "7", type: "bulletList", content: "Project updates" },
          { id: "8", type: "bulletList", content: "Timeline review" },
          { id: "9", type: "bulletList", content: "Action items" },
          { id: "10", type: "heading2", content: "Discussion" },
          { id: "11", type: "paragraph", content: "Type your notes here..." },
          { id: "12", type: "heading2", content: "Action Items" },
          { id: "13", type: "todo", content: "Follow up with client" },
          { id: "14", type: "todo", content: "Update project timeline" },
        ],
      }
    case "project-plan":
      return {
        title: "Project Plan",
        blocks: [
          { id: "1", type: "heading1", content: "Project Plan" },
          { id: "2", type: "heading2", content: "Project Overview" },
          { id: "3", type: "paragraph", content: "Describe the project here..." },
          { id: "4", type: "heading2", content: "Goals and Objectives" },
          { id: "5", type: "bulletList", content: "Goal 1" },
          { id: "6", type: "bulletList", content: "Goal 2" },
          { id: "7", type: "heading2", content: "Timeline" },
          { id: "8", type: "table", content: "" },
          { id: "9", type: "heading2", content: "Team Members" },
          { id: "10", type: "bulletList", content: "Team member 1 - Role" },
          { id: "11", type: "heading2", content: "Budget" },
          { id: "12", type: "paragraph", content: "Budget details here..." },
        ],
      }
    case "weekly-report":
      return {
        title: "Weekly Report",
        blocks: [
          { id: "1", type: "heading1", content: "Weekly Report" },
          { id: "2", type: "heading3", content: "Week of April 15, 2025" },
          { id: "3", type: "heading2", content: "Accomplishments" },
          { id: "4", type: "bulletList", content: "Accomplishment 1" },
          { id: "5", type: "bulletList", content: "Accomplishment 2" },
          { id: "6", type: "heading2", content: "Challenges" },
          { id: "7", type: "bulletList", content: "Challenge 1" },
          { id: "8", type: "heading2", content: "Next Week's Goals" },
          { id: "9", type: "todo", content: "Goal 1" },
          { id: "10", type: "todo", content: "Goal 2" },
          { id: "11", type: "heading2", content: "Key Metrics" },
          { id: "12", type: "image", content: "Metrics chart" },
        ],
      }
    case "team-directory":
      return {
        title: "Team Directory",
        blocks: [
          { id: "1", type: "heading1", content: "Team Directory" },
          { id: "2", type: "heading2", content: "Leadership" },
          { id: "3", type: "heading3", content: "John Doe - CEO" },
          { id: "4", type: "paragraph", content: "Contact: john@example.com" },
          { id: "5", type: "heading3", content: "Jane Smith - CTO" },
          { id: "6", type: "paragraph", content: "Contact: jane@example.com" },
          { id: "7", type: "heading2", content: "Engineering Team" },
          { id: "8", type: "heading3", content: "Alex Johnson - Lead Developer" },
          { id: "9", type: "paragraph", content: "Contact: alex@example.com" },
          { id: "10", type: "heading2", content: "Marketing Team" },
          { id: "11", type: "heading3", content: "Sarah Williams - Marketing Director" },
          { id: "12", type: "paragraph", content: "Contact: sarah@example.com" },
        ],
      }
    case "calendar-schedule":
      return {
        title: "Calendar Schedule",
        blocks: [
          { id: "1", type: "heading1", content: "Weekly Schedule" },
          { id: "2", type: "heading2", content: "Monday" },
          { id: "3", type: "paragraph", content: "9:00 AM - Team standup" },
          { id: "4", type: "paragraph", content: "1:00 PM - Client meeting" },
          { id: "5", type: "heading2", content: "Tuesday" },
          { id: "6", type: "paragraph", content: "10:00 AM - Project review" },
          { id: "7", type: "paragraph", content: "2:00 PM - Training session" },
          { id: "8", type: "heading2", content: "Wednesday" },
          { id: "9", type: "paragraph", content: "9:00 AM - Team standup" },
          { id: "10", type: "paragraph", content: "11:00 AM - Planning meeting" },
          { id: "11", type: "heading2", content: "Thursday" },
          { id: "12", type: "paragraph", content: "9:00 AM - Team standup" },
          { id: "13", type: "paragraph", content: "3:00 PM - Product demo" },
          { id: "14", type: "heading2", content: "Friday" },
          { id: "15", type: "paragraph", content: "9:00 AM - Team standup" },
          { id: "16", type: "paragraph", content: "4:00 PM - Weekly review" },
        ],
      }
    default:
      return {
        title: "Untitled Document",
        blocks: [{ id: "1", type: "paragraph", content: "" }],
      }
  }
}
