"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something...",
  minHeight = "300px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [activeFormats, setActiveFormats] = useState<string[]>([])

  // Initialize editor with value
  useEffect(() => {
    if (editorRef.current && !editorRef.current.textContent && value) {
      editorRef.current.innerHTML = value
    }
  }, [])

  // Check for active formats when selection changes
  useEffect(() => {
    const checkFormats = () => {
      const formats = []
      if (document.queryCommandState("bold")) formats.push("bold")
      if (document.queryCommandState("italic")) formats.push("italic")
      if (document.queryCommandState("underline")) formats.push("underline")
      if (document.queryCommandState("justifyLeft")) formats.push("justifyLeft")
      if (document.queryCommandState("justifyCenter")) formats.push("justifyCenter")
      if (document.queryCommandState("justifyRight")) formats.push("justifyRight")
      if (document.queryCommandState("insertUnorderedList")) formats.push("insertUnorderedList")
      if (document.queryCommandState("insertOrderedList")) formats.push("insertOrderedList")
      setActiveFormats(formats)
    }

    document.addEventListener("selectionchange", checkFormats)
    return () => document.removeEventListener("selectionchange", checkFormats)
  }, [])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    handleInput()

    // Update active formats after command execution
    const formats = [...activeFormats]
    const commandIndex = formats.indexOf(command)

    if (document.queryCommandState(command)) {
      if (commandIndex === -1) formats.push(command)
    } else {
      if (commandIndex !== -1) formats.splice(commandIndex, 1)
    }

    setActiveFormats(formats)
    editorRef.current?.focus()
  }

  return (
    <div className={`border rounded-md ${isFocused ? "ring-2 ring-ring" : ""}`}>
      <div className="border-b p-2">
        <TooltipProvider>
          <div className="flex flex-wrap gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => execCommand("bold")}
                  type="button"
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
                  onClick={() => execCommand("italic")}
                  type="button"
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
                  onClick={() => execCommand("underline")}
                  type="button"
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
                  onClick={() => execCommand("justifyLeft")}
                  type="button"
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
                  onClick={() => execCommand("justifyCenter")}
                  type="button"
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
                  onClick={() => execCommand("justifyRight")}
                  type="button"
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
                  onClick={() => execCommand("insertUnorderedList")}
                  type="button"
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
                  onClick={() => execCommand("insertOrderedList")}
                  type="button"
                  className={activeFormats.includes("insertOrderedList") ? "bg-accent" : ""}
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip>

            <div className="mx-1 h-4 w-px bg-border" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const url = prompt("Enter URL:")
                    if (url) execCommand("createLink", url)
                  }}
                  type="button"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert Link</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="p-4 outline-none"
        style={{ minHeight }}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-placeholder={placeholder}
      />
    </div>
  )
}
