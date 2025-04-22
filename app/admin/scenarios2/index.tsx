"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  FileText,
  Filter,
  Plus,
  Search,
  Tag,
  Calendar,
  MessageSquare,
  Mail,
  Video,
  CheckCircle,
  Clock3,
} from "lucide-react"

// Mock data for scenarios
const scenarios = [
  {
    id: "s1",
    name: "Marketing Campaign Management",
    description: "Manage a product launch marketing campaign with team coordination and document creation",
    industry: "Technology",
    department: "Marketing",
    tasks: 4,
    duration: 75,
    status: "published",
    competencies: ["Problem Solving", "Customer Orientation", "Disciplined Execution", "Establish Collaboration"],
    lastUpdated: "2 days ago",
  },
  {
    id: "s2",
    name: "Customer Support Escalation",
    description: "Handle escalated customer issues requiring cross-departmental coordination",
    industry: "Retail",
    department: "Customer Service",
    tasks: 5,
    duration: 60,
    status: "draft",
    competencies: ["Problem Solving", "Customer Orientation", "Establish Collaboration"],
    lastUpdated: "1 week ago",
  },
  {
    id: "s3",
    name: "Project Management Crisis",
    description: "Manage a project that has fallen behind schedule with budget constraints",
    industry: "Construction",
    department: "Operations",
    tasks: 6,
    duration: 90,
    status: "published",
    competencies: ["Problem Solving", "Disciplined Execution", "Coaching for Performance"],
    lastUpdated: "3 days ago",
  },
  {
    id: "s4",
    name: "Team Performance Review",
    description: "Conduct performance reviews and provide feedback to team members",
    industry: "Healthcare",
    department: "Human Resources",
    tasks: 3,
    duration: 45,
    status: "published",
    competencies: ["Coaching for Performance", "Establish Collaboration"],
    lastUpdated: "5 days ago",
  },
  {
    id: "s5",
    name: "Supply Chain Disruption",
    description: "Respond to a major supply chain disruption affecting product delivery",
    industry: "Manufacturing",
    department: "Logistics",
    tasks: 7,
    duration: 120,
    status: "draft",
    competencies: ["Problem Solving", "Business Acumen", "Disciplined Execution"],
    lastUpdated: "2 weeks ago",
  },
  {
    id: "s6",
    name: "New System Implementation",
    description: "Manage the rollout of a new technology system to the organization",
    industry: "Finance",
    department: "IT",
    tasks: 5,
    duration: 60,
    status: "archived",
    competencies: ["Technology Savvy", "Continuous Improvement", "Disciplined Execution"],
    lastUpdated: "1 month ago",
  },
]

// Function to get status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "published":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle className="mr-1 h-3 w-3" />
          Published
        </Badge>
      )
    case "draft":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
          <Clock3 className="mr-1 h-3 w-3" />
          Draft
        </Badge>
      )
    case "archived":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          Archived
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function ScenariosLibrary() {
  const [activeTab, setActiveTab] = useState("all")

  // Filter scenarios based on active tab
  const filteredScenarios = scenarios.filter((scenario) => {
    if (activeTab === "all") return true
    if (activeTab === "published") return scenario.status === "published"
    if (activeTab === "drafts") return scenario.status === "draft"
    if (activeTab === "archived") return scenario.status === "archived"
    return true
  })

  return (
    <div className="container mx-auto space-y-6 px-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Assessment Scenarios</h1>
          <p className="text-muted-foreground">Create and manage assessment scenarios</p>
        </div>
        <Button asChild>
          <Link href="/admin/scenarios2/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Scenario
          </Link>
        </Button>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search scenarios..." className="pl-10" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Scenarios</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredScenarios.map((scenario) => (
              <Card key={scenario.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1">{scenario.name}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">{scenario.description}</CardDescription>
                    </div>
                    {getStatusBadge(scenario.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{scenario.tasks} Tasks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{scenario.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span>{scenario.industry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{scenario.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">Task Types</div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                        <Mail className="h-3 w-3" />
                        <span>Email</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400">
                        <MessageSquare className="h-3 w-3" />
                        <span>Chat</span>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                        <FileText className="h-3 w-3" />
                        <span>Document</span>
                      </div>
                      {scenario.tasks > 3 && (
                        <div className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
                          <Video className="h-3 w-3" />
                          <span>Conference</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3">
                  <div className="flex w-full justify-between">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/admin/scenarios2/${scenario.id}`}>Edit</Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
