"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  File,
  FileText,
  FileSpreadsheet,
  FilePieChart,
  Clock,
  Star,
  FolderOpen,
  BookOpen,
  BarChart2,
} from "lucide-react"
import { useState } from "react"
import { DocumentChatbot } from "@/components/document-chatbot"
import Link from "next/link"

export default function ResourcesPage() {
  const [showTemplateModal, setShowTemplateModal] = useState(false)

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">Access documents, reference materials, and assessment information</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search resources..." className="w-full pl-8" />
          </div>
          <Button onClick={() => setShowTemplateModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Document
          </Button>
        </div>
      </div>

      <Tabs defaultValue="assessment">
        <TabsList className="mb-4">
          <TabsTrigger value="assessment">Assessment Info</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="reference">Reference Materials</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-4">
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Assessment Instructions</CardTitle>
              <CardDescription>Important information about your assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Welcome to your assessment. This simulation is designed to evaluate your skills in a typical
                office environment. You will complete various tasks using email, documents, chat, and other workplace
                tools.
              </p>
              <p className="mb-4">
                <strong>Important:</strong> This assessment represents a single workday. All tasks should be completed
                within the simulated timeframe.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <Link href="/resources/document/1">
                    <BookOpen className="mr-2 h-4 w-4" /> Read Full Instructions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assessmentDocs.map((doc) => (
              <ResourceCard key={doc.id} resource={doc} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reference" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {referenceResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
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
        <h2 className="mb-4 text-xl font-semibold">Recently Viewed</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentlyViewed.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.viewedAt}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/resources/document/${item.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <DocumentChatbot />
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

interface Resource {
  id: number
  title: string
  description: string
  category: string
  icon: React.ElementRef<typeof FileText>
  date: string
}

const assessmentDocs: Resource[] = [
  {
    id: 1,
    title: "Assessment Overview",
    description: "Introduction to the assessment and objectives",
    category: "Assessment",
    icon: BookOpen,
    date: "Updated Apr 2025",
  },
  {
    id: 2,
    title: "Task Checklist",
    description: "List of all tasks to complete during the assessment",
    category: "Assessment",
    icon: FileText,
    date: "Updated Apr 2025",
  },
  {
    id: 3,
    title: "Evaluation Criteria",
    description: "How your performance will be evaluated",
    category: "Assessment",
    icon: BarChart2,
    date: "Updated Apr 2025",
  },
]

const referenceResources: Resource[] = [
  {
    id: 4,
    title: "Company Handbook",
    description: "Guidelines, policies, and procedures for employees",
    category: "HR Documents",
    icon: FileText,
    date: "Updated Jan 2025",
  },
  {
    id: 5,
    title: "Project Plan Template",
    description: "Standard template for creating project plans",
    category: "Project Management",
    icon: FileText,
    date: "Updated Mar 2025",
  },
  {
    id: 6,
    title: "Brand Guidelines",
    description: "Official brand colors, logos, and usage rules",
    category: "Marketing",
    icon: FileText,
    date: "Updated Feb 2025",
  },
  {
    id: 7,
    title: "Research Database",
    description: "Access to industry research and reports",
    category: "Research",
    icon: FolderOpen,
    date: "Updated Weekly",
  },
]

interface RecentlyViewedItem {
  id: number
  title: string
  category: string
  icon: React.ElementRef<typeof FileText>
  viewedAt: string
}

const recentlyViewed: RecentlyViewedItem[] = [
  {
    id: 1,
    title: "Assessment Overview",
    category: "Assessment",
    icon: BookOpen,
    viewedAt: "Today, 9:30 AM",
  },
  {
    id: 8,
    title: "Quarterly Report Draft",
    category: "Documents",
    icon: FileText,
    viewedAt: "Yesterday, 2:15 PM",
  },
  {
    id: 6,
    title: "Company Handbook",
    category: "HR",
    icon: BookOpen,
    viewedAt: "Apr 12, 2025",
  },
]

function ResourceCard({ resource }: { resource: Resource }) {
  const ResourceIcon = resource.icon

  return (
    <Card className="transition-all hover:shadow-md flex flex-col">
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
            <Link href={`/resources/document/${resource.id}`}>Preview</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

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
            <Link href={`/resources/document/${document.id}`}>View</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/resources/editor?document=${document.id}`}>Edit</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
