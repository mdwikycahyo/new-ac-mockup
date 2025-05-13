"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  ImageIcon,
  Table,
  Heading1,
  Heading2,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DocumentSelectorModal } from "@/components/document-selector-modal"

interface RichTextEditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  placeholder?: string
  minHeight?: string
  readOnly?: boolean
}

export function RichTextEditor({
  initialContent = "",
  onChange,
  placeholder = "Start typing...",
  minHeight = "200px",
  readOnly = false,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [isDocumentSelectorOpen, setIsDocumentSelectorOpen] = useState(false)
  const [editorStyles, setEditorStyles] = useState<string>("")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [activeAlignment, setActiveAlignment] = useState("left")
  const [activeHeading, setActiveHeading] = useState("")
  const [isInitialized, setIsInitialized] = useState(false)

  // Apply custom styles for the editor
  useEffect(() => {
    const styles = `
      .editor-content h1 {
        font-size: 1.875rem;
        line-height: 2.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      .editor-content h2 {
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      .editor-content ul {
        list-style-type: disc;
        margin-left: 1.5rem;
      }
      
      .editor-content ol {
        list-style-type: decimal;
        margin-left: 1.5rem;
      }
      
      .editor-content table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 1rem;
      }
      
      .editor-content table td {
        border: 1px solid #e2e8f0;
        padding: 0.5rem;
        min-height: 40px;
        height: 40px;
      }
      
      .editor-content a {
        color: #3b82f6;
        text-decoration: underline;
      }
    `
    setEditorStyles(styles)
  }, [])

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      if (initialContent) {
        editorRef.current.innerHTML = initialContent
      } else {
        editorRef.current.innerHTML = placeholder
        if (!readOnly) {
          // Select all placeholder text when editor gets focus
          const handleFocus = () => {
            if (editorRef.current && editorRef.current.innerHTML === placeholder) {
              editorRef.current.innerHTML = ""
            }
          }
          editorRef.current.addEventListener("focus", handleFocus)
          return () => {
            editorRef.current?.removeEventListener("focus", handleFocus)
          }
        }
      }
      setIsInitialized(true)
    }
  }, [initialContent, placeholder, readOnly, isInitialized])

  // Handle content changes
  const handleContentChange = () => {
    if (onChange && editorRef.current) {
      // Only call onChange if the content is different from the placeholder
      if (editorRef.current.innerHTML !== placeholder) {
        onChange(editorRef.current.innerHTML)
      } else {
        onChange("")
      }
    }
  }

  // Execute commands with proper selection handling
  const execCommand = (command: string, value = "") => {
    if (readOnly) return

    // Focus the editor first
    editorRef.current?.focus()

    // Execute the command
    document.execCommand(command, false, value)

    // Update active formats and notify about content change
    updateActiveFormats()
    handleContentChange()
  }

  // Update active formatting states
  const updateActiveFormats = () => {
    if (!editorRef.current) return

    // Check if selection has bold formatting
    setIsBold(document.queryCommandState("bold"))

    // Check if selection has italic formatting
    setIsItalic(document.queryCommandState("italic"))

    // Check if selection has underline formatting
    setIsUnderline(document.queryCommandState("underline"))

    // Check alignment
    if (document.queryCommandState("justifyLeft")) {
      setActiveAlignment("left")
    } else if (document.queryCommandState("justifyCenter")) {
      setActiveAlignment("center")
    } else if (document.queryCommandState("justifyRight")) {
      setActiveAlignment("right")
    }

    // Check heading (this is more complex and might not be fully accurate)
    const parentElement = window.getSelection()?.anchorNode?.parentElement
    if (parentElement) {
      if (parentElement.closest("h1")) {
        setActiveHeading("h1")
      } else if (parentElement.closest("h2")) {
        setActiveHeading("h2")
      } else {
        setActiveHeading("")
      }
    }
  }

  // Format handlers
  const handleFormat = (format: string) => {
    execCommand(format)
  }

  const handleAlign = (align: string) => {
    execCommand("justify" + align)
  }

  const handleList = (listType: string) => {
    execCommand("insert" + listType)
  }

  const handleLink = () => {
    if (!linkUrl) return

    if (linkText) {
      execCommand("insertHTML", `<a href="${linkUrl}" target="_blank">${linkText}</a>`)
    } else {
      execCommand("createLink", linkUrl)
    }

    setIsLinkPopoverOpen(false)
    setLinkUrl("")
    setLinkText("")
  }

  const handleHeading = (level: string) => {
    execCommand("formatBlock", `<${level}>`)
  }

  const handleTable = () => {
    const table = `
      <table>
        <tr>
          <td style="min-height: 40px; height: 40px;"></td>
          <td style="min-height: 40px; height: 40px;"></td>
          <td style="min-height: 40px; height: 40px;"></td>
        </tr>
        <tr>
          <td style="min-height: 40px; height: 40px;"></td>
          <td style="min-height: 40px; height: 40px;"></td>
          <td style="min-height: 40px; height: 40px;"></td>
        </tr>
        <tr>
          <td style="min-height: 40px; height: 40px;"></td>
          <td style="min-height: 40px; height: 40px;"></td>
          <td style="min-height: 40px; height: 40px;"></td>
        </tr>
      </table>
    `
    execCommand("insertHTML", table)
  }

  const handleDocumentSelect = (document: any) => {
    execCommand("insertHTML", `<p><a href="/documents/view/${document.id}">${document.title}</a></p>`)
    setIsDocumentSelectorOpen(false)
  }

  // Set up event listeners for selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveFormats()
    }

    document.addEventListener("selectionchange", handleSelectionChange)

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [])

  return (
    <div className="border rounded-md">
      <style>{editorStyles}</style>

      {!readOnly && (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b">
          <Button
            type="button"
            size="icon"
            variant={isBold ? "default" : "ghost"}
            onClick={() => handleFormat("bold")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={isItalic ? "default" : "ghost"}
            onClick={() => handleFormat("italic")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={isUnderline ? "default" : "ghost"}
            onClick={() => handleFormat("underline")}
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            size="icon"
            variant={activeAlignment === "left" ? "default" : "ghost"}
            onClick={() => handleAlign("Left")}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={activeAlignment === "center" ? "default" : "ghost"}
            onClick={() => handleAlign("Center")}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={activeAlignment === "right" ? "default" : "ghost"}
            onClick={() => handleAlign("Right")}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => handleList("UnorderedList")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => handleList("OrderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
            <PopoverTrigger asChild>
              <Button type="button" size="icon" variant="ghost" title="Insert Link">
                <Link className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="link-text">Link Text</Label>
                  <Input
                    id="link-text"
                    placeholder="Text to display"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />
                </div>
                <Button type="button" onClick={handleLink} className="w-full">
                  Insert Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => setIsDocumentSelectorOpen(true)}
            title="Insert Document"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>

          <Button type="button" size="icon" variant="ghost" onClick={handleTable} title="Insert Table">
            <Table className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button
            type="button"
            size="icon"
            variant={activeHeading === "h1" ? "default" : "ghost"}
            onClick={() => handleHeading("h1")}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={activeHeading === "h2" ? "default" : "ghost"}
            onClick={() => handleHeading("h2")}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div
        ref={editorRef}
        className={`editor-content p-3 outline-none ${readOnly ? "" : "min-h-[200px]"}`}
        style={{ minHeight: readOnly ? "auto" : minHeight }}
        contentEditable={!readOnly}
        onInput={handleContentChange}
        onKeyUp={updateActiveFormats}
        onClick={updateActiveFormats}
      />

      <DocumentSelectorModal
        open={isDocumentSelectorOpen}
        onClose={() => setIsDocumentSelectorOpen(false)}
        onSelect={handleDocumentSelect}
      />
    </div>
  )
}
