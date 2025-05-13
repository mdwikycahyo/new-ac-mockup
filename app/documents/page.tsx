"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, File, FileText, FileSpreadsheet, FilePieChart, Clock, FolderOpen } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { DocumentChatbot } from "@/components/document-chatbot"
import Link from "next/link"
import { TemplateSelectionModal } from "@/components/template-selection-modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useDemoMode } from "@/components/context/demo-mode-context"

export default function ResourcesPage() {
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [activeTab, setActiveTab] = useState("documents")
  const [highlightNewButton, setHighlightNewButton] = useState(false)
  const [savedDocuments, setSavedDocuments] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const newButtonRef = useRef<HTMLButtonElement>(null)
  const { demoMode } = useDemoMode()

  // Load saved documents from localStorage
  useEffect(() => {
    const loadDocuments = () => {
      if (typeof window !== "undefined") {
        try {
          const docs = JSON.parse(localStorage.getItem("documents") || "[]")
          setSavedDocuments(docs)
        } catch (error) {
          console.error("Error loading documents:", error)
          setSavedDocuments([])
        }
      }
    }

    // Load documents on mount
    loadDocuments()

    // Set up storage event listener to reload documents when localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "documents") {
        loadDocuments()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Poll for changes every second (as a fallback)
    const interval = setInterval(loadDocuments, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Check if we're coming from the conference call
  useEffect(() => {
    const referrer = document.referrer
    if (referrer.includes("/conference")) {
      setHighlightNewButton(true)

      // Scroll to the button and highlight it
      if (newButtonRef.current) {
        newButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" })

        // Add a small delay before starting the animation
        setTimeout(() => {
          if (newButtonRef.current) {
            newButtonRef.current.classList.add("animate-bounce")

            // Stop the animation after 5 seconds
            setTimeout(() => {
              if (newButtonRef.current) {
                newButtonRef.current.classList.remove("animate-bounce")
              }
            }, 5000)
          }
        }, 500)
      }
    }
  }, [])

  // Restore active tab from URL when returning from document view
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Filter documents based on search query
  const filteredUserDocuments = demoMode
    ? savedDocuments.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [
        ...recentDocuments,
        ...savedDocuments.filter((doc) => doc.title.toLowerCase().includes(searchQuery.toLowerCase())),
      ]

  // Add smooth transitions to tab content
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            View reference documents, manage existing files, and create new document.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setShowTemplateModal(true)}
            ref={newButtonRef}
            className={`${highlightNewButton ? "ring-2 ring-blue-500 shadow-lg" : ""} transition-all`}
          >
            <Plus className="mr-2 h-4 w-4" /> New Document
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          // Update URL with new tab value without full page reload
          router.push(`/documents?tab=${value}`, { scroll: false })
        }}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="reference">Reference Materials</TabsTrigger>
        </TabsList>

        <div className="transition-all duration-300 ease-in-out">
          <TabsContent value="documents" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUserDocuments.length > 0 ? (
                filteredUserDocuments.map((doc) => <DocumentCard key={doc.id} document={doc} activeTab={activeTab} />)
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">No documents found</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reference" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {referenceResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} activeTab={activeTab} />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <DocumentChatbot />
      {showTemplateModal && <TemplateSelectionModal onClose={() => setShowTemplateModal(false)} />}
    </div>
  )
}

interface Document {
  id: number | string
  title: string
  type: "doc" | "spreadsheet" | "presentation" | "report"
  lastModified: string
  owner: string
  starred?: boolean
  content?: any[]
}

// Update the document IDs to avoid conflicts
const recentDocuments: Document[] = [
  {
    id: 101, // Changed from 1 to 101 to avoid conflict with Assessment Overview
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

interface Resource {
  id: number
  title: string
  description: string
  category: string
  icon: React.ElementRef<typeof FileText>
  date: string
}

const referenceResources: Resource[] = [
  {
    id: 201,
    title: "Dokumen Referensi Kegiatan Engagement",
    description: "Panduan dan referensi untuk aktivitas team building dan engagement",
    category: "HR Documents",
    icon: FileText,
    date: "Updated Apr 2025",
  },
  {
    id: 6,
    title: "Company Handbook",
    description: "Guidelines, policies, and procedures for employees",
    category: "HR Documents",
    icon: FileText,
    date: "Updated Jan 2025",
  },
  {
    id: 11,
    title: "Project Plan Template",
    description: "Standard template for creating project plans",
    category: "Project Management",
    icon: FileText,
    date: "Updated Mar 2025",
  },
  {
    id: 7,
    title: "Brand Guidelines",
    description: "Official brand colors, logos, and usage rules",
    category: "Marketing",
    icon: FileText,
    date: "Updated Feb 2025",
  },
  {
    id: 102, // Changed from 8 to 102 to avoid conflict with Project Proposal Template
    title: "Research Database",
    description: "Access to industry research and reports",
    category: "Research",
    icon: FolderOpen,
    date: "Updated Weekly",
  },
]

function ResourceCard({ resource, activeTab }: { resource: Resource; activeTab: string }) {
  const ResourceIcon = resource.icon

  return (
    <Card className="transition-all hover:shadow-md flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-muted p-2">
            <ResourceIcon className="h-4 w-4" />
          </div>
          <CardTitle className="text-base">{resource.title}</CardTitle>
        </div>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{resource.category}</span>
          <span className="text-sm text-muted-foreground">{resource.date}</span>
        </div>
        <div className="mt-auto pt-4 flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/documents/document/${resource.id}?tab=${activeTab}`}>Preview</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentCard({ document, activeTab }: { document: Document; activeTab: string }) {
  const iconMap = {
    doc: FileText,
    spreadsheet: FileSpreadsheet,
    presentation: FilePieChart,
    report: File,
  }

  const DocIcon = iconMap[document.type]

  return (
    <Card className="transition-all hover:shadow-md h-full flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-md bg-muted p-2">
            <DocIcon className="h-4 w-4" />
          </div>
          <CardTitle className="text-base">{document.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {document.lastModified}
          </div>
          <span>{document.owner}</span>
        </div>
        <div className="mt-auto pt-4 flex justify-end space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/documents/document/${document.id}?tab=${activeTab}`}>View</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/documents/editor?document=${document.id}&tab=${activeTab}`}>Edit</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
