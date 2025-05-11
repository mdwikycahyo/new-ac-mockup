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
  AlignLeft,
  AlignCenter,
  AlignRight,
  Save,
  ArrowLeft,
  MoreHorizontal,
  Link2,
  ChevronDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DocumentEditor() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "blank"
  const documentId = searchParams.get("document")
  const [title, setTitle] = useState("")
  const [blocks, setBlocks] = useState<Block[]>([{ id: "1", type: "paragraph", content: "" }])
  const [selectedBlockId, setSelectedBlockId] = useState("1")
  const editorRef = useRef<HTMLDivElement>(null)

  // Add state for active formats
  const [activeFormats, setActiveFormats] = useState<string[]>([])

  // Load template content based on templateId or documentId
  useEffect(() => {
    if (documentId) {
      // If editing an existing document
      const documentContent = getDocumentContent(documentId)
      setTitle(documentContent.title)
      setBlocks(documentContent.blocks)
    } else {
      // If creating from template
      const template = getTemplateContent(templateId)
      setTitle(template.title)
      setBlocks(template.blocks)
    }
  }, [templateId, documentId])

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

  // Update the formatBlock function to track active formats
  const formatBlock = (command: string, value = "") => {
    document.execCommand(command, false, value)

    // Update active formats
    const newFormats = [...activeFormats]
    const commandIndex = newFormats.indexOf(command)

    if (document.queryCommandState(command)) {
      if (commandIndex === -1) newFormats.push(command)
    } else {
      if (commandIndex !== -1) newFormats.splice(commandIndex, 1)
    }

    setActiveFormats(newFormats)

    // Focus back on the editor
    if (editorRef.current) {
      const blockElement = editorRef.current.querySelector(`[data-block-id="${selectedBlockId}"]`)
      if (blockElement) {
        const selection = window.getSelection()
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          if (blockElement.contains(range.commonAncestorContainer)) {
            // If the selection is within the block, preserve it
            // Otherwise, focus on the block
            blockElement.focus()
          }
        } else {
          blockElement.focus()
        }
      }
    }
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
        <TooltipProvider>
          <div className="border-b p-2">
            <div className="flex flex-wrap items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("bold")}
                    className={activeFormats.includes("bold") ? "bg-accent" : ""}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("italic")}
                    className={activeFormats.includes("italic") ? "bg-accent" : ""}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("underline")}
                    className={activeFormats.includes("underline") ? "bg-accent" : ""}
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Underline</TooltipContent>
              </Tooltip>

              <div className="mx-1 h-4 w-px bg-border" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("justifyLeft")}
                    className={activeFormats.includes("justifyLeft") ? "bg-accent" : ""}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Left</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("justifyCenter")}
                    className={activeFormats.includes("justifyCenter") ? "bg-accent" : ""}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Center</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("justifyRight")}
                    className={activeFormats.includes("justifyRight") ? "bg-accent" : ""}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Align Right</TooltipContent>
              </Tooltip>

              <div className="mx-1 h-4 w-px bg-border" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("insertUnorderedList")}
                    className={activeFormats.includes("insertUnorderedList") ? "bg-accent" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bullet List</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("insertOrderedList")}
                    className={activeFormats.includes("insertOrderedList") ? "bg-accent" : ""}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Numbered List</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatBlock("insertCheckbox")}
                    className={activeFormats.includes("insertCheckbox") ? "bg-accent" : ""}
                  >
                    <CheckSquare className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Checkbox</TooltipContent>
              </Tooltip>

              <div className="mx-1 h-4 w-px bg-border" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const url = prompt("Enter URL:")
                      if (url) formatBlock("createLink", url)
                    }}
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Insert Link</TooltipContent>
              </Tooltip>

              <div className="mx-1 h-4 w-px bg-border" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Add Block <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {blockTypes.map((blockType) => (
                        <DropdownMenuItem key={blockType.type} onClick={() => addBlock(blockType.type)}>
                          <blockType.icon className="mr-2 h-4 w-4" />
                          {blockType.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>Add Block</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>

        <div className="mx-auto max-w-3xl p-8" ref={editorRef}>
          {blocks.map((block) => (
            <EditorBlock
              key={block.id}
              block={block}
              isSelected={selectedBlockId === block.id}
              onChange={(content) => handleBlockChange(block.id, content)}
              onSelect={() => setSelectedBlockId(block.id)}
              onKeyDown={(e) => handleKeyDown(e, block.id)}
              formatBlock={formatBlock}
            />
          ))}
        </div>
      </Card>
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
  formatBlock: (command: string, value?: string) => void
}

// Replace the EditorBlock component with this improved version that properly maintains cursor position
function EditorBlock({ block, isSelected, onChange, onSelect, onKeyDown, formatBlock }: EditorBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSelected && blockRef.current) {
      blockRef.current.focus()
    }
  }, [isSelected])

  // This is the key improvement - we're not using dangerouslySetInnerHTML for active editing
  // Instead, we initialize the content once and then let the contentEditable handle updates
  useEffect(() => {
    if (blockRef.current && !blockRef.current.textContent) {
      blockRef.current.innerHTML = block.content
    }
  }, [block.id])

  const handleInput = () => {
    if (blockRef.current) {
      onChange(blockRef.current.innerHTML)
    }
  }

  const renderBlock = () => {
    switch (block.type) {
      case "heading1":
        return (
          <div
            ref={blockRef}
            contentEditable
            suppressContentEditableWarning
            data-block-id={block.id}
            className="mb-4 outline-none text-3xl font-bold"
            onInput={handleInput}
            onKeyDown={onKeyDown}
          />
        )
      case "heading2":
        return (
          <div
            ref={blockRef}
            contentEditable
            suppressContentEditableWarning
            data-block-id={block.id}
            className="mb-3 outline-none text-2xl font-bold"
            onInput={handleInput}
            onKeyDown={onKeyDown}
          />
        )
      case "heading3":
        return (
          <div
            ref={blockRef}
            contentEditable
            suppressContentEditableWarning
            data-block-id={block.id}
            className="mb-2 outline-none text-xl font-bold"
            onInput={handleInput}
            onKeyDown={onKeyDown}
          />
        )
      case "bulletList":
        return (
          <div className="flex">
            <div className="mr-2 mt-1.5">•</div>
            <div
              ref={blockRef}
              contentEditable
              suppressContentEditableWarning
              data-block-id={block.id}
              className="flex-1 outline-none"
              onInput={handleInput}
              onKeyDown={onKeyDown}
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
              suppressContentEditableWarning
              data-block-id={block.id}
              className="flex-1 outline-none"
              onInput={handleInput}
              onKeyDown={onKeyDown}
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
              suppressContentEditableWarning
              data-block-id={block.id}
              className="flex-1 outline-none"
              onInput={handleInput}
              onKeyDown={onKeyDown}
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
              suppressContentEditableWarning
              data-block-id={block.id}
              className="mt-2 text-center text-sm text-muted-foreground outline-none"
              onInput={handleInput}
              onKeyDown={onKeyDown}
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
                      suppressContentEditableWarning
                      className="outline-none"
                      onInput={handleInput}
                    />
                  </td>
                  <td className="border p-2">
                    <div contentEditable suppressContentEditableWarning className="outline-none" />
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">
                    <div contentEditable suppressContentEditableWarning className="outline-none" />
                  </td>
                  <td className="border p-2">
                    <div contentEditable suppressContentEditableWarning className="outline-none" />
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
            suppressContentEditableWarning
            data-block-id={block.id}
            className="mb-3 outline-none"
            onInput={handleInput}
            onKeyDown={onKeyDown}
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

function getDocumentContent(documentId: string): { title: string; blocks: Block[] } {
  // Mock document data for existing documents
  const documentData: Record<string, { title: string; blocks: Block[] }> = {
    "1": {
      title: "Quarterly Report Draft",
      blocks: [
        { id: "1", type: "heading1", content: "Quarterly Report: Q2 2025" },
        { id: "2", type: "heading2", content: "Executive Summary" },
        {
          id: "3",
          type: "paragraph",
          content:
            "This report summarizes our performance in Q2 2025, highlighting key achievements, challenges, and recommendations for the upcoming quarter.",
        },
        { id: "4", type: "heading2", content: "Financial Performance" },
        {
          id: "5",
          type: "paragraph",
          content: "Revenue increased by 15% compared to the previous quarter, exceeding our target by 5%.",
        },
        { id: "6", type: "heading2", content: "Key Achievements" },
        { id: "7", type: "bulletList", content: "Successfully launched Product X in 3 new markets" },
        { id: "8", type: "bulletList", content: "Reduced operational costs by 8%" },
        { id: "9", type: "bulletList", content: "Increased customer satisfaction score to 92%" },
        { id: "10", type: "heading2", content: "Challenges" },
        { id: "11", type: "bulletList", content: "Supply chain disruptions in Asia" },
        { id: "12", type: "bulletList", content: "Increased competition in European markets" },
        { id: "13", type: "heading2", content: "Recommendations" },
        { id: "14", type: "todo", content: "Diversify supplier network" },
        { id: "15", type: "todo", content: "Accelerate digital transformation initiatives" },
        { id: "16", type: "todo", content: "Increase marketing budget for European region" },
      ],
    },
    // Other document data...
  }

  return (
    documentData[documentId] || {
      title: "Untitled Document",
      blocks: [{ id: "1", type: "paragraph", content: "" }],
    }
  )
}
