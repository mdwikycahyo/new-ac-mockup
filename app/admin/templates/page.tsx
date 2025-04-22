import type React from "react"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoleSwitcher } from "@/components/role-switcher"
import {
  Clock,
  Copy,
  FileText,
  Filter,
  FolderOpen,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Star,
  Trash,
  Users,
  Video,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Assessment Templates",
  description: "Browse and manage assessment templates",
}

export default function TemplatesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
            <RoleSwitcher />
          </div>
          <p className="text-muted-foreground">Browse and manage assessment templates and components</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-10 p-0">
            <Filter className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search templates..." className="w-full pl-8" />
          </div>
          <Button asChild>
            <Link href="/admin/templates/new">
              <Plus className="mr-2 h-4 w-4" /> Create Template
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="mb-4 w-full grid grid-cols-3">
          <TabsTrigger value="scenarios">
            <FolderOpen className="mr-2 h-4 w-4" /> Scenario Templates
          </TabsTrigger>
          <TabsTrigger value="tasks">
            <FileText className="mr-2 h-4 w-4" /> Task Templates
          </TabsTrigger>
          <TabsTrigger value="components">
            <MessageSquare className="mr-2 h-4 w-4" /> Components
          </TabsTrigger>
        </TabsList>
        <TabsContent value="scenarios">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenarioTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tasks">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {taskTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="components">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {componentTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Template {
  id: string
  name: string
  description: string
  category: string
  icon: React.ElementType
  rating?: number
  lastModified: string
  features: string[]
}

function TemplateCard({ template }: { template: Template }) {
  const Icon = template.icon

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="px-2 py-0.5 text-xs">
            {template.category}
          </Badge>
          {template.rating && (
            <div className="flex items-center text-muted-foreground">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{template.rating}</span>
            </div>
          )}
        </div>
        <CardTitle className="mt-2 flex items-center gap-2">
          <div className="rounded-md bg-muted p-1">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <span>{template.name}</span>
        </CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Includes:</span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            {template.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <div className="mr-2 h-1 w-1 rounded-full bg-muted-foreground"></div>
                {feature}
              </div>
            ))}
          </div>
          <div className="pt-2 text-xs text-muted-foreground">Last modified: {template.lastModified}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <Trash className="mr-1 h-3.5 w-3.5" /> Delete
        </Button>
        <div className="space-x-2">
          <Button variant="ghost" size="sm">
            <Copy className="mr-1 h-3.5 w-3.5" /> Duplicate
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/templates/${template.id}`}>Edit</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const scenarioTemplates: Template[] = [
  {
    id: "1",
    name: "Project Management Assessment",
    description: "Evaluate project management skills through realistic simulations",
    category: "Management",
    icon: FolderOpen,
    rating: 4.8,
    lastModified: "2 days ago",
    features: [
      "Email inbox simulation",
      "Task prioritization challenges",
      "Virtual team meeting",
      "Document organization tasks",
    ],
  },
  {
    id: "2",
    name: "Customer Service Evaluation",
    description: "Assess customer service capabilities across multiple channels",
    category: "Customer Service",
    icon: FolderOpen,
    rating: 4.6,
    lastModified: "5 days ago",
    features: [
      "Service chat simulation",
      "Email response tasks",
      "Difficult customer scenarios",
      "Knowledge base search challenges",
    ],
  },
  {
    id: "3",
    name: "Leadership Assessment",
    description: "Evaluate leadership skills and decision-making abilities",
    category: "Leadership",
    icon: FolderOpen,
    rating: 4.9,
    lastModified: "1 week ago",
    features: [
      "Team meeting facilitation",
      "Critical decision scenarios",
      "Performance review simulation",
      "Resource allocation tasks",
    ],
  },
]

const taskTemplates: Template[] = [
  {
    id: "4",
    name: "Email Response Task",
    description: "Task template for email response evaluation",
    category: "Communication",
    icon: Mail,
    lastModified: "3 days ago",
    features: [
      "Configurable sender profiles",
      "Multiple email threads",
      "Timed response settings",
      "Scoring rubric customization",
    ],
  },
  {
    id: "5",
    name: "Document Analysis",
    description: "Template for document review and analysis tasks",
    category: "Analysis",
    icon: FileText,
    lastModified: "1 week ago",
    features: [
      "Uploadable document templates",
      "Error identification sections",
      "Annotation capabilities",
      "Summarization tasks",
    ],
  },
  {
    id: "6",
    name: "Priority Management",
    description: "Task for assessing time and priority management",
    category: "Organization",
    icon: Clock,
    lastModified: "2 weeks ago",
    features: [
      "Customizable task list",
      "Resource constraints simulation",
      "Time pressure factors",
      "Decision tracking",
    ],
  },
]

const componentTemplates: Template[] = [
  {
    id: "7",
    name: "Video Conference Component",
    description: "Simulated video conferencing interaction",
    category: "Communication",
    icon: Video,
    lastModified: "4 days ago",
    features: [
      "Pre-recorded participant video",
      "Branching dialogue options",
      "Non-verbal cue assessment",
      "Recording capabilities",
    ],
  },
  {
    id: "8",
    name: "Chat Simulation",
    description: "Interactive chat bot simulation component",
    category: "Customer Service",
    icon: MessageSquare,
    lastModified: "1 week ago",
    features: [
      "AI-powered chat responses",
      "Multiple conversation paths",
      "Response time tracking",
      "Sentiment analysis",
    ],
  },
  {
    id: "9",
    name: "Team Collaboration Tool",
    description: "Simulated team workspace component",
    category: "Collaboration",
    icon: Users,
    lastModified: "2 weeks ago",
    features: [
      "Multi-user simulation",
      "Role-based permissions",
      "Task assignment features",
      "Real-time collaboration tracking",
    ],
  },
]
