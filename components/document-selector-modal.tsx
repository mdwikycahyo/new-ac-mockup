"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, FileSpreadsheet, FilePieChart, File } from "lucide-react"
import { useLanguage } from "@/components/language-selector"

interface Document {
  id: number
  title: string
  type: "doc" | "spreadsheet" | "presentation" | "report"
  lastModified: string
  owner: string
}

interface DocumentSelectorModalProps {
  open: boolean
  onClose: () => void
  onSelect: (document: Document) => void
}

export function DocumentSelectorModal({ open, onClose, onSelect }: DocumentSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLanguage()

  const documents = [
    {
      id: 1,
      title: "Quarterly Report Draft",
      type: "doc",
      lastModified: "Today, 10:30 AM",
      owner: "You",
    },
    {
      id: 2,
      title: "Project Timeline",
      type: "spreadsheet",
      lastModified: "Yesterday, 3:45 PM",
      owner: "You",
    },
    {
      id: 3,
      title: "Marketing Presentation",
      type: "presentation",
      lastModified: "Apr 12, 2025",
      owner: "Marketing Team",
    },
    {
      id: 4,
      title: "Budget Analysis",
      type: "spreadsheet",
      lastModified: "Apr 10, 2025",
      owner: "Finance Department",
    },
    {
      id: 5,
      title: "Meeting Notes",
      type: "doc",
      lastModified: "Apr 8, 2025",
      owner: "You",
    },
  ]

  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const iconMap = {
    doc: FileText,
    spreadsheet: FileSpreadsheet,
    presentation: FilePieChart,
    report: File,
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("attach_files")}</DialogTitle>
          <DialogDescription>Select a document from your files to attach</DialogDescription>
        </DialogHeader>

        <div className="relative my-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t("search")} ${t("my_documents").toLowerCase()}...`}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {filteredDocuments.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No documents found</p>
          ) : (
            <div className="space-y-2">
              {filteredDocuments.map((doc) => {
                const DocIcon = iconMap[doc.type]
                return (
                  <div
                    key={doc.id}
                    className="flex items-center p-3 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => onSelect(doc)}
                  >
                    <div className="rounded-md bg-muted p-2 mr-3">
                      <DocIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.lastModified} • {doc.owner}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelect(doc)
                      }}
                    >
                      Select
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
