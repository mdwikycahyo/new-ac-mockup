"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Target,
  Calendar,
  Users,
  ClipboardList,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  ListTodo,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Dummy projects data that matches the structure from the projects list
const dummyProjects = [
  {
    id: "1",
    title: "Website Redesign",
    status: "In Progress",
    priority: "Medium",
    startDate: "2024-05-20",
    dueDate: "2024-06-30",
    description: "A comprehensive redesign of our company website with improved UX/UI and modern design elements.",
    targets: [
      { description: "Improve user engagement by 30%" },
      { description: "Reduce bounce rate by 15%" },
      { description: "Increase conversion rate by 10%" },
      { description: "Improve mobile responsiveness across all devices" },
    ],
    team: [
      { id: 2, name: "Sam Wilson", role: "Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 4, name: "Taylor Smith", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 7, name: "Jordan Quinn", role: "Content Creator", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    tasks: [
      {
        id: 1,
        name: "User research and analysis",
        description: "Conduct user interviews and analyze current website analytics.",
        status: "Done",
        priority: "High",
        assignedTo: "Sam Wilson",
        dueDate: "2024-05-30",
      },
      {
        id: 2,
        name: "Wireframing and prototyping",
        description: "Create wireframes and interactive prototypes for key pages.",
        status: "In Progress",
        priority: "High",
        assignedTo: "Taylor Smith",
        dueDate: "2024-06-10",
      },
      {
        id: 3,
        name: "Content strategy",
        description: "Develop content strategy and create copy for main pages.",
        status: "To Do",
        priority: "Medium",
        assignedTo: "Jordan Quinn",
        dueDate: "2024-06-15",
      },
      {
        id: 4,
        name: "Visual design",
        description: "Create visual design system including colors, typography, and components.",
        status: "To Do",
        priority: "Medium",
        assignedTo: "Sam Wilson",
        dueDate: "2024-06-20",
      },
      {
        id: 5,
        name: "Frontend development",
        description: "Implement designs using modern frontend technologies.",
        status: "To Do",
        priority: "High",
        assignedTo: "Taylor Smith",
        dueDate: "2024-06-25",
      },
    ],
  },
  {
    id: "2",
    title: "Mobile App Development",
    status: "In Progress",
    priority: "High",
    startDate: "2024-04-15",
    dueDate: "2024-06-15",
    description:
      "Development of a cross-platform mobile application for our customers with core functionality and integrations.",
    targets: [
      { description: "Achieve 10,000 downloads in first month" },
      { description: "Maintain 4.5+ star rating" },
      { description: "Achieve 30% user retention after 30 days" },
      { description: "Keep app size under 50MB" },
    ],
    team: [
      { id: 1, name: "Alex Johnson", role: "Project Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 3, name: "Jamie Lee", role: "Developer", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 5, name: "Morgan Chen", role: "Backend Developer", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    tasks: [
      {
        id: 1,
        name: "Requirements gathering",
        description: "Define detailed requirements and user stories.",
        status: "Done",
        priority: "High",
        assignedTo: "Alex Johnson",
        dueDate: "2024-04-20",
      },
      {
        id: 2,
        name: "UI/UX design",
        description: "Create app screens and user flow designs.",
        status: "Done",
        priority: "High",
        assignedTo: "Jamie Lee",
        dueDate: "2024-04-30",
      },
      {
        id: 3,
        name: "Frontend development",
        description: "Implement UI components and screens.",
        status: "Done",
        priority: "High",
        assignedTo: "Jamie Lee",
        dueDate: "2024-05-15",
      },
      {
        id: 4,
        name: "Backend integration",
        description: "Connect app to backend services and APIs.",
        status: "In Progress",
        priority: "High",
        assignedTo: "Morgan Chen",
        dueDate: "2024-05-25",
      },
      {
        id: 5,
        name: "Testing",
        description: "Conduct thorough testing across devices and platforms.",
        status: "To Do",
        priority: "High",
        assignedTo: "Jamie Lee",
        dueDate: "2024-06-05",
      },
    ],
  },
  {
    id: "3",
    title: "Marketing Campaign",
    status: "Planning",
    priority: "High",
    startDate: "2024-05-01",
    dueDate: "2024-07-15",
    description: "A comprehensive digital marketing campaign for our new product launch across multiple channels.",
    targets: [
      { description: "Generate 500 qualified leads" },
      { description: "Achieve 2.5% conversion rate" },
      { description: "Maintain cost per acquisition under $50" },
      { description: "Increase social media engagement by 40%" },
    ],
    team: [
      { id: 1, name: "Alex Johnson", role: "Project Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 6, name: "Riley Park", role: "Marketing Manager", avatar: "/placeholder.svg?height=40&width=40" },
      { id: 7, name: "Jordan Quinn", role: "Content Creator", avatar: "/placeholder.svg?height=40&width=40" },
    ],
    tasks: [
      {
        id: 1,
        name: "Market research",
        description: "Analyze target audience, competitors, and market trends.",
        status: "Done",
        priority: "High",
        assignedTo: "Riley Park",
        dueDate: "2024-05-10",
      },
      {
        id: 2,
        name: "Campaign strategy",
        description: "Develop comprehensive marketing strategy including channels and messaging.",
        status: "In Progress",
        priority: "High",
        assignedTo: "Alex Johnson",
        dueDate: "2024-05-20",
      },
      {
        id: 3,
        name: "Content creation",
        description: "Create campaign assets including copy, graphics, and videos.",
        status: "To Do",
        priority: "Medium",
        assignedTo: "Jordan Quinn",
        dueDate: "2024-06-05",
      },
      {
        id: 4,
        name: "Channel setup",
        description: "Configure marketing channels, tracking, and automation workflows.",
        status: "To Do",
        priority: "Medium",
        assignedTo: "Riley Park",
        dueDate: "2024-06-15",
      },
    ],
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch project data from localStorage or use dummy data
  useEffect(() => {
    const fetchProject = () => {
      try {
        // First try to get from localStorage
        const storedProjects = localStorage.getItem("projects")
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects)
          const foundProject = parsedProjects.find((p) => p.id === projectId)
          if (foundProject) {
            setProject(foundProject)
            setLoading(false)
            return
          }
        }

        // If not found in localStorage, check dummy data
        const dummyProject = dummyProjects.find((p) => p.id === projectId)
        if (dummyProject) {
          setProject(dummyProject)
        } else {
          setProject(null)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching project:", error)
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-64 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
          <div className="md:col-span-3 h-64 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="text-muted-foreground mt-2">The project you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/projects")} className="mt-4">
            Go to Projects
          </Button>
        </div>
      </div>
    )
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Medium":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "Low":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "To Do":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 flex items-center gap-1">
            <ListTodo className="h-3 w-3" /> To Do
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1">
            <Clock className="h-3 w-3" /> In Progress
          </Badge>
        )
      case "Done":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Done
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            {status}
          </Badge>
        )
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  // Count tasks by status
  const taskCounts = {
    total: project.tasks ? project.tasks.length : 0,
    todo: project.tasks ? project.tasks.filter((t) => t.status === "To Do").length : 0,
    inProgress: project.tasks ? project.tasks.filter((t) => t.status === "In Progress").length : 0,
    done: project.tasks ? project.tasks.filter((t) => t.status === "Done").length : 0,
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <div className="flex items-center gap-2 mt-1">{getPriorityBadge(project.priority)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Overview Card */}
        <Card className="md:col-span-2 border-t-4 border-t-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-md mr-2">
                <Target className="h-5 w-5 text-primary" />
              </span>
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg border border-muted">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Due Date:</span>
                  <span className="ml-2">{formatDate(project.dueDate)}</span>
                </div>
              </div>

              {/* Project Targets */}
              {project.targets && project.targets.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <span className="bg-primary/10 p-1.5 rounded-md mr-2">
                      <Target className="h-5 w-5 text-primary" />
                    </span>
                    Project Targets
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 bg-muted/10 p-4 rounded-lg">
                    {project.targets.map((target, index) => (
                      <li key={index} className="text-muted-foreground">
                        <span className="text-foreground">{target.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Team Assignment Card */}
        <Card className="border-t-4 border-t-indigo-200">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <span className="bg-indigo-100 p-1.5 rounded-md mr-2">
                  <Users className="h-5 w-5 text-indigo-600" />
                </span>
                Team Members
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.team && project.team.length > 0 ? (
                project.team.map((member, index) => (
                  <div key={index} className="flex flex-col p-3 border rounded-md hover:bg-muted/10 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3 border-2 border-background">
                          <AvatarImage src={member.avatar || "/placeholder.svg?height=40&width=40"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-sm font-medium">No team members assigned</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    No team members have been assigned to this project
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <Card className="md:col-span-3 border-t-4 border-t-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="bg-green-100 p-1.5 rounded-md mr-2">
                <ClipboardList className="h-5 w-5 text-green-600" />
              </span>
              Project Tasks
            </CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span>
                <span>To Do: {taskCounts.todo}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-400"></span>
                <span>In Progress: {taskCounts.inProgress}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
                <span>Done: {taskCounts.done}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {project.tasks && project.tasks.length > 0 ? (
              <div className="space-y-4">
                {project.tasks.map((task, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 last:mb-0 hover:bg-muted/5 transition-colors"
                    style={{
                      borderLeftWidth: "4px",
                      borderLeftColor:
                        task.status === "Done" ? "#10b981" : task.status === "In Progress" ? "#3b82f6" : "#d1d5db",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <p className="font-medium">{task.name}</p>
                            {getStatusBadge(task.status)}
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getPriorityIcon(task.priority)}
                              <span className="ml-1">{task.priority}</span>
                            </Badge>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                            {task.assignedTo && (
                              <div className="flex items-center text-sm">
                                <span className="text-muted-foreground mr-1">Assigned to:</span>
                                <span className="font-medium">{task.assignedTo}</span>
                              </div>
                            )}
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Due: <span className="font-medium ml-1">{formatDate(task.dueDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-sm font-medium">No tasks created</h3>
                <p className="text-xs text-muted-foreground mt-1">No tasks have been created for this project</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
