"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, File, FileText, FileSpreadsheet, FilePieChart, Clock, Star } from "lucide-react"
import { useState } from "react"
import { TemplateSelectionModal } from "@/components/template-selection-modal"
import Link from "next/link"

export default function DocumentsPage() {
  const [showTemplateModal, setShowTemplateModal] = useState(false)

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Editor</h1>
          <p className="text-muted-foreground">Create and edit business documents</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search documents..." className="w-full pl-8" />
          </div>
          <Button onClick={() => setShowTemplateModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Document
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared with me</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="shared" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sharedDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="starred" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {starredDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templateDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Document Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {activityItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {showTemplateModal && <TemplateSelectionModal onClose={() => setShowTemplateModal(false)} />}
    </div>
  )
}

interface Document {
  id: number
  title: string
  type: "doc" | "spreadsheet" | "presentation" | "report"
  lastModified: string
  owner: string
  starred?: boolean
}

const recentDocuments: Document[] = [
  {
    id: 1,
    title: "Quarterly Report Draft",
    type: "doc",
    lastModified: "Today, 10:30 AM",
    owner: "You",
    starred: true,
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

const sharedDocuments: Document[] = [
  {
    id: 6,
    title: "Team Objectives",
    type: "doc",
    lastModified: "Apr 14, 2025",
    owner: "Project Manager",
  },
  {
    id: 7,
    title: "Sales Forecast",
    type: "spreadsheet",
    lastModified: "Apr 13, 2025",
    owner: "Sales Team",
    starred: true,
  },
]

const starredDocuments: Document[] = [
  {
    id: 1,
    title: "Quarterly Report Draft",
    type: "doc",
    lastModified: "Today, 10:30 AM",
    owner: "You",
    starred: true,
  },
  {
    id: 7,
    title: "Sales Forecast",
    type: "spreadsheet",
    lastModified: "Apr 13, 2025",
    owner: "Sales Team",
    starred: true,
  },
]

const templateDocuments: Document[] = [
  {
    id: 8,
    title: "Project Proposal Template",
    type: "doc",
    lastModified: "Mar 20, 2025",
    owner: "Templates",
  },
  {
    id: 9,
    title: "Invoice Template",
    type: "spreadsheet",
    lastModified: "Mar 15, 2025",
    owner: "Templates",
  },
  {
    id: 10,
    title: "Monthly Report Template",
    type: "report",
    lastModified: "Mar 10, 2025",
    owner: "Templates",
  },
]

interface ActivityItem {
  id: number
  title: string
  description: string
  time: string
  icon: React.ElementRef<typeof File>
}

const activityItems: ActivityItem[] = [
  {
    id: 1,
    title: "Quarterly Report Draft",
    description: "You edited this document",
    time: "10:30 AM",
    icon: FileText,
  },
  {
    id: 2,
    title: "Project Timeline",
    description: "You created this spreadsheet",
    time: "Yesterday",
    icon: FileSpreadsheet,
  },
  {
    id: 3,
    title: "Marketing Presentation",
    description: "Marketing Team shared this with you",
    time: "Apr 12",
    icon: FilePieChart,
  },
]

function DocumentCard({ document }: { document: Document }) {
  const iconMap = {
    doc: FileText,
    spreadsheet: FileSpreadsheet,
    presentation: FilePieChart,
    report: File,
  }

  const DocIcon = iconMap[document.type]

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <div className="rounded-md bg-muted p-2">
            <DocIcon className="h-4 w-4" />
          </div>
          <CardTitle className="text-base">{document.title}</CardTitle>
        </div>
        {document.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {document.lastModified}
          </div>
          <span>{document.owner}</span>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/documents/view/${document.id}`}>View</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/documents/editor?document=${document.id}`}>Edit</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface TemplateSelectionModalProps {
  onClose: () => void
}
