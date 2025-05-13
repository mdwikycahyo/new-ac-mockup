"use client"

import type React from "react"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, FileText, FileSpreadsheet, FilePieChart, File, Eye } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Document preview dialog
import {
  Dialog as PreviewDialog,
  DialogContent as PreviewDialogContent,
  DialogHeader as PreviewDialogHeader,
  DialogTitle as PreviewDialogTitle,
  DialogDescription as PreviewDialogDescription,
} from "@/components/ui/dialog"

// Default documents that don't change between renders
const defaultDocs = [
  {
    id: 101,
    title: "Quarterly Report Draft",
    type: "doc",
    lastModified: "Today, 10:30 AM",
    owner: "You",
    content: `<h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">Quarterly Report Draft</h1>
    <p>This document contains the quarterly report for Q1 2025.</p>
    <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Executive Summary</h2>
    <p>The first quarter of 2025 showed strong performance across all business units...</p>`,
  },
  {
    id: 2,
    title: "Project Timeline",
    type: "spreadsheet",
    lastModified: "Yesterday, 3:45 PM",
    owner: "You",
    content: `<h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">Project Timeline</h1>
    <p>This spreadsheet contains the timeline for our current project.</p>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left;">Task</th>
          <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left;">Start Date</th>
          <th style="border: 1px solid #d1d5db; padding: 8px 12px; text-align: left;">End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 8px 12px;">Planning</td>
          <td style="border: 1px solid #d1d5db; padding: 8px 12px;">Jan 1, 2025</td>
          <td style="border: 1px solid #d1d5db; padding: 8px 12px;">Jan 15, 2025</td>
        </tr>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 8px 12px;">Development</td>
          <td style="border: 1px solid #d1d5db; padding: 8px 12px;">Jan 16, 2025</td>
          <td style="border: 1px solid #d1d5db; padding: 8px 12px;">Mar 31, 2025</td>
        </tr>
      </tbody>
    </table>`,
  },
  {
    id: 3,
    title: "Marketing Presentation",
    type: "presentation",
    lastModified: "Apr 12, 2025",
    owner: "Marketing Team",
    content: `<h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">Marketing Presentation</h1>
    <p>This presentation outlines our marketing strategy for Q2 2025.</p>
    <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Key Objectives</h2>
    <ul style="margin-bottom: 16px; padding-left: 24px; list-style-type: disc;">
      <li style="margin-bottom: 8px;">Increase brand awareness by 15%</li>
      <li style="margin-bottom: 8px;">Launch new product line by June</li>
      <li style="margin-bottom: 8px;">Expand social media presence</li>
    </ul>`,
  },
]

interface Document {
  id: number | string
  title: string
  type: string
  lastModified?: string
  owner?: string
  content?: string
}

interface DocumentSelectorModalProps {
  open: boolean
  onClose: () => void
  onSelect: (document: Document) => void
  savedDocuments?: Document[]
}

export function DocumentSelectorModal({ open, onClose, onSelect, savedDocuments = [] }: DocumentSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("my-documents")
  const [storedDocuments, setStoredDocuments] = useState<Document[]>([])
  const [allDocuments, setAllDocuments] = useState<Document[]>([])
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  // Load documents from localStorage only when the modal is open
  useEffect(() => {
    if (open) {
      try {
        const storedDocs = localStorage.getItem("documents")
        if (storedDocs) {
          setStoredDocuments(JSON.parse(storedDocs))
        } else {
          setStoredDocuments([])
        }
      } catch (error) {
        console.error("Error loading documents from localStorage:", error)
        setStoredDocuments([])
      }
    }
  }, [open])

  // Combine documents from props and localStorage
  const combinedDocuments = useMemo(() => {
    // Format saved documents from props
    const formattedSavedDocs = savedDocuments.map((doc) => ({
      ...doc,
      id: String(doc.id),
    }))

    // Track IDs to avoid duplicates
    const addedIds = new Set(formattedSavedDocs.map((doc) => String(doc.id)))

    // Add localStorage documents that aren't already included
    const uniqueStoredDocs = storedDocuments.filter((doc) => !addedIds.has(String(doc.id)))

    // Add default documents if no documents exist
    if (formattedSavedDocs.length === 0 && uniqueStoredDocs.length === 0) {
      return defaultDocs
    }

    // Combine all documents
    return [...formattedSavedDocs, ...uniqueStoredDocs]
  }, [savedDocuments, storedDocuments])

  // Update allDocuments when combinedDocuments changes
  useEffect(() => {
    setAllDocuments(combinedDocuments)
  }, [combinedDocuments])

  // Filter documents based on search query
  const filteredDocuments = useMemo(() => {
    return allDocuments.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [allDocuments, searchQuery])

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  // Handle document selection
  const handleSelectDocument = useCallback(
    (document: Document) => {
      onSelect(document)
      onClose()
    },
    [onSelect, onClose],
  )

  // Handle document preview
  const handlePreviewDocument = useCallback((document: Document) => {
    setPreviewDocument(document)
    setShowPreview(true)
  }, [])

  // Icon mapping for document types
  const iconMap = useMemo(
    () => ({
      doc: FileText,
      spreadsheet: FileSpreadsheet,
      presentation: FilePieChart,
      report: File,
    }),
    [],
  )

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Document</DialogTitle>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => {
                const DocIcon = iconMap[doc.type as keyof typeof iconMap] || File
                return (
                  <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-md bg-muted p-2">
                            <DocIcon className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-base truncate">{doc.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm text-muted-foreground">
                        {doc.lastModified && <div>Last modified: {doc.lastModified}</div>}
                        {doc.owner && <div>Owner: {doc.owner}</div>}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePreviewDocument(doc)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" /> Preview
                      </Button>
                      <Button size="sm" onClick={() => handleSelectDocument(doc)}>
                        Select
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-2 text-center py-8 text-muted-foreground">
                No documents found. Try a different search term.
              </div>
            )}
          </div>
          
        </DialogContent>
      </Dialog>

      {/* Document Preview Dialog */}
      <PreviewDialog open={showPreview} onOpenChange={setShowPreview}>
        <PreviewDialogContent className="sm:max-w-[800px] max-h-[80vh]">
          <PreviewDialogHeader>
            <PreviewDialogTitle className="flex items-center gap-2">
              {previewDocument && (
                <>
                  {(() => {
                    const DocIcon = iconMap[previewDocument.type as keyof typeof iconMap] || File
                    return <DocIcon className="h-5 w-5" />
                  })()}
                  {previewDocument.title}
                </>
              )}
            </PreviewDialogTitle>
            <PreviewDialogDescription>
              {previewDocument?.lastModified && <span>Last modified: {previewDocument.lastModified}</span>}
              {previewDocument?.owner && <span> • Owner: {previewDocument.owner}</span>}
            </PreviewDialogDescription>
          </PreviewDialogHeader>
          <ScrollArea className="h-[500px] mt-4 border rounded-md p-4">
            {previewDocument?.content ? (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: previewDocument.content }}></div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No preview available for this document.</div>
            )}
          </ScrollArea>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                handleSelectDocument(previewDocument!)
                setShowPreview(false)
              }}
            >
              Select Document
            </Button>
          </div>
        </PreviewDialogContent>
      </PreviewDialog>
    </>
  )
}
