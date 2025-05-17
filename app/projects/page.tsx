"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Calendar,
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  Users,
  CheckSquare,
  Target,
} from "lucide-react"

export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Website Redesign",
      priority: "Medium",
      dueDate: "2024-06-30",
      description: "A comprehensive redesign of our company website with improved UX/UI and modern design elements.",
      team: [
        { id: 2, name: "Sam Wilson", role: "Designer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 4, name: "Taylor Smith", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 7, name: "Jordan Quinn", role: "Content Creator", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      tasks: [
        {
          id: 1,
          title: "User research and analysis",
          description: "Conduct user interviews and analyze current website analytics.",
          status: "To Do",
          priority: "High",
          assignedTo: 2,
          dueDate: "2024-05-30",
        },
        {
          id: 2,
          title: "Wireframing and prototyping",
          description: "Create wireframes and interactive prototypes for key pages.",
          status: "To Do",
          priority: "High",
          assignedTo: 4,
          dueDate: "2024-06-10",
        },
        {
          id: 3,
          title: "Content strategy",
          description: "Develop content strategy and create copy for main pages.",
          status: "To Do",
          priority: "Medium",
          assignedTo: 7,
          dueDate: "2024-06-15",
        },
      ],
      targets: ["Improve user engagement by 30%", "Reduce bounce rate by 15%", "Increase conversion rate by 10%"],
    },
    {
      id: 2,
      title: "Mobile App Development",
      priority: "High",
      dueDate: "2024-06-15",
      description:
        "Development of a cross-platform mobile application for our customers with core functionality and integrations.",
      team: [
        { id: 1, name: "Alex Johnson", role: "Project Manager", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 3, name: "Jamie Lee", role: "Developer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 5, name: "Morgan Chen", role: "Backend Developer", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      tasks: [
        {
          id: 1,
          title: "Testing",
          description: "Conduct thorough testing across devices and platforms.",
          status: "In Progress",
          priority: "High",
          assignedTo: 3,
          dueDate: "2024-06-05",
        },
        {
          id: 2,
          title: "Bug fixing",
          description: "Address issues identified during testing.",
          status: "To Do",
          priority: "High",
          assignedTo: 5,
          dueDate: "2024-06-10",
        },
        {
          id: 3,
          title: "App store submission",
          description: "Prepare and submit app to app stores.",
          status: "To Do",
          priority: "High",
          assignedTo: 1,
          dueDate: "2024-06-15",
        },
      ],
      targets: [
        "Achieve 10,000 downloads in first month",
        "Maintain 4.5+ star rating",
        "Achieve 30% user retention after 30 days",
      ],
    },
    {
      id: 3,
      title: "Marketing Campaign",
      priority: "High",
      dueDate: "2024-07-15",
      description: "A comprehensive digital marketing campaign for our new product launch across multiple channels.",
      team: [
        { id: 1, name: "Alex Johnson", role: "Project Manager", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 6, name: "Riley Park", role: "Marketing Manager", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 7, name: "Jordan Quinn", role: "Content Creator", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      tasks: [
        {
          id: 1,
          title: "Channel setup",
          description: "Configure marketing channels, tracking, and automation workflows.",
          status: "In Progress",
          priority: "Medium",
          assignedTo: 6,
          dueDate: "2024-06-15",
        },
        {
          id: 2,
          title: "Campaign launch",
          description: "Execute campaign launch across all channels.",
          status: "To Do",
          priority: "High",
          assignedTo: 6,
          dueDate: "2024-06-20",
        },
        {
          id: 3,
          title: "Performance monitoring",
          description: "Track campaign performance and make adjustments as needed.",
          status: "To Do",
          priority: "Medium",
          assignedTo: 1,
          dueDate: "2024-07-10",
        },
      ],
      targets: [
        "Generate 500 qualified leads",
        "Achieve 2.5% conversion rate",
        "Maintain cost per acquisition under $50",
      ],
    },
  ])

  // Load projects from localStorage on initial render
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects)
        // Merge with existing projects, avoiding duplicates by ID
        const existingIds = projects.map((p) => p.id)
        const newProjects = parsedProjects.filter((p) => !existingIds.includes(p.id))
        if (newProjects.length > 0) {
          setProjects([...projects, ...newProjects])
        }
      } catch (error) {
        console.error("Failed to parse stored projects:", error)
      }
    }
  }, [])

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track your projects</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => router.push("/projects/new")}>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? "Try a different search term" : "Create your first project to get started"}
          </p>
          {!searchQuery && (
            <Button onClick={() => router.push("/projects/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <Card
      className="transition-all hover:shadow-md flex flex-col h-full overflow-hidden border-l-4 hover:border-l-primary"
      style={{
        borderLeftColor:
          project.priority === "High" ? "#fecaca" : project.priority === "Medium" ? "#fef3c7" : "#dbeafe",
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <div className="flex items-center gap-2 mt-1">{getPriorityBadge(project.priority)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

        <div className="space-y-4">
          {/* Team members - Changed to show only total count */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4 text-primary" />
              <span>Team Members</span>
            </div>
            <div className="bg-muted/50 rounded-md p-2 text-sm">
              <span className="font-medium">{project.team.length}</span> team members assigned
            </div>
          </div>

          {/* Tasks */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckSquare className="h-4 w-4 text-primary" />
              <span>Tasks</span>
            </div>
            <div className="bg-muted/50 rounded-md p-2 text-sm">
              <span className="font-medium">{project.tasks.length}</span> tasks in total
            </div>
          </div>

          {/* Targets - Added bullet points */}
          {project.targets && project.targets.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Target className="h-4 w-4 text-primary" />
                <span>Targets</span>
              </div>
              <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                {project.targets.slice(0, 2).map((target, index) => (
                  <li key={index}>{target}</li>
                ))}
                {project.targets.length > 2 && <li className="text-primary">+{project.targets.length - 2} more</li>}
              </ul>
            </div>
          )}

          {/* Due date */}
          <div className="flex items-center gap-2 text-sm mt-2 bg-muted/30 p-2 rounded-md">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              Due: <span className="font-medium">{formatDate(project.dueDate)}</span>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 mt-auto">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/projects/${project.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
