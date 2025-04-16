import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, FolderOpen, BookOpen, BarChart2 } from "lucide-react"
import { DocumentChatbot } from "@/components/document-chatbot"
import Link from "next/link"

export default function InformationPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Information Portal</h1>
          <p className="text-muted-foreground">Access resources and information needed for your tasks</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search resources..." className="w-full pl-8" />
        </div>
      </div>

      <Tabs defaultValue="documents">
        <TabsList className="mb-4">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <ResourceCard key={doc.id} resource={doc} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="guides" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <ResourceCard key={guide.id} resource={guide} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="data" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <ResourceCard key={item.id} resource={item} />
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
                    <Link href={`/information/document/${item.id}`}>View</Link>
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

interface Resource {
  id: number
  title: string
  description: string
  category: string
  icon: React.ElementRef<typeof FileText>
  date: string
}

const documents: Resource[] = [
  {
    id: 1,
    title: "Company Handbook",
    description: "Guidelines, policies, and procedures for employees",
    category: "HR Documents",
    icon: FileText,
    date: "Updated Jan 2025",
  },
  {
    id: 2,
    title: "Project Plan Template",
    description: "Standard template for creating project plans",
    category: "Project Management",
    icon: FileText,
    date: "Updated Mar 2025",
  },
  {
    id: 3,
    title: "Brand Guidelines",
    description: "Official brand colors, logos, and usage rules",
    category: "Marketing",
    icon: FileText,
    date: "Updated Feb 2025",
  },
]

const resources: Resource[] = [
  {
    id: 4,
    title: "Research Database",
    description: "Access to industry research and reports",
    category: "Research",
    icon: FolderOpen,
    date: "Updated Weekly",
  },
  {
    id: 5,
    title: "Training Materials",
    description: "Resources for professional development",
    category: "Learning",
    icon: FolderOpen,
    date: "Updated Monthly",
  },
]

const guides: Resource[] = [
  {
    id: 6,
    title: "New Employee Onboarding",
    description: "Step-by-step guide for new team members",
    category: "HR",
    icon: BookOpen,
    date: "Updated Mar 2025",
  },
  {
    id: 7,
    title: "Software User Manual",
    description: "Instructions for using company software",
    category: "IT",
    icon: BookOpen,
    date: "Updated Apr 2025",
  },
]

const data: Resource[] = [
  {
    id: 8,
    title: "Quarterly Sales Report",
    description: "Sales performance data for Q1 2025",
    category: "Sales",
    icon: BarChart2,
    date: "Apr 2025",
  },
  {
    id: 9,
    title: "Market Analysis",
    description: "Competitive landscape and market trends",
    category: "Marketing",
    icon: BarChart2,
    date: "Mar 2025",
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
    title: "Company Handbook",
    category: "HR Documents",
    icon: FileText,
    viewedAt: "Today, 9:30 AM",
  },
  {
    id: 8,
    title: "Quarterly Sales Report",
    category: "Sales",
    icon: BarChart2,
    viewedAt: "Yesterday, 2:15 PM",
  },
  {
    id: 6,
    title: "New Employee Onboarding",
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
            <Link href={`/information/document/${resource.id}`}>Preview</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
