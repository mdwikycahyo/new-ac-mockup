"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, CheckCircle2, Target, AlertTriangle, AlertCircle, CalendarDays, Users, Plus } from "lucide-react"

// This would typically come from an API or database
const projects = [
  {
    id: 1,
    title: "Website Redesign",
    status: "Planning",
    priority: "Medium",
    progress: 0,
    tasksCompleted: 0,
    totalTasks: 5,
    startDate: "May 20, 2024",
    endDate: "June 30, 2024",
    image: "/placeholder.svg?height=300&width=400",
    description: "A comprehensive redesign of our company website with improved UX/UI and modern design elements.",
    goals: [
      {
        title: "Create a user-friendly interface",
        description: "Design an intuitive interface that requires minimal onboarding for new users.",
        completed: false,
      },
      {
        title: "Improve mobile responsiveness",
        description: "Ensure the website works flawlessly across all device sizes.",
        completed: false,
      },
      {
        title: "Optimize page load speed",
        description: "Reduce load times and improve overall performance metrics.",
        completed: false,
      },
      {
        title: "Implement SEO best practices",
        description: "Improve search engine visibility and ranking.",
        completed: false,
      },
    ],
    tasks: [
      {
        id: 1,
        title: "User research and analysis",
        description: "Conduct user interviews and analyze current website analytics.",
        completed: false,
        dueDate: "May 30, 2024",
        status: "To Do",
        priority: "High",
        dependencies: [],
      },
      {
        id: 2,
        title: "Wireframing and prototyping",
        description: "Create wireframes and interactive prototypes for key pages.",
        completed: false,
        dueDate: "June 10, 2024",
        status: "To Do",
        priority: "High",
        dependencies: [1],
      },
      {
        id: 3,
        title: "Visual design",
        description: "Develop visual design system including colors, typography, and components.",
        completed: false,
        dueDate: "June 20, 2024",
        status: "To Do",
        priority: "Medium",
        dependencies: [2],
      },
      {
        id: 4,
        title: "Frontend development",
        description: "Implement designs using modern frontend technologies.",
        completed: false,
        dueDate: "June 25, 2024",
        status: "To Do",
        priority: "High",
        dependencies: [3],
      },
      {
        id: 5,
        title: "Testing and launch",
        description: "Conduct thorough testing and prepare for website launch.",
        completed: false,
        dueDate: "June 30, 2024",
        status: "To Do",
        priority: "High",
        dependencies: [4],
      },
    ],
    milestones: [
      { id: 1, title: "Research Phase Complete", date: "May 30, 2024", completed: false },
      { id: 2, title: "Design Approval", date: "June 20, 2024", completed: false },
      { id: 3, title: "Website Launch", date: "June 30, 2024", completed: false },
    ],
    team: [
      {
        id: 2,
        name: "Sam Wilson",
        role: "Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.4,
      },
      {
        id: 4,
        name: "Taylor Smith",
        role: "UX Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.3,
      },
      {
        id: 7,
        name: "Jordan Quinn",
        role: "Content Creator",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.2,
      },
    ],
  },
  {
    id: 2,
    title: "Mobile App Development",
    status: "Active",
    priority: "High",
    progress: 50,
    tasksCompleted: 4,
    totalTasks: 8,
    startDate: "April 15, 2024",
    endDate: "June 15, 2024",
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Development of a cross-platform mobile application for our customers with core functionality and integrations.",
    goals: [
      {
        title: "Create intuitive user experience",
        description: "Design a user-friendly interface that is easy to navigate.",
        completed: true,
      },
      {
        title: "Implement core features",
        description: "Develop the essential features required for MVP launch.",
        completed: true,
      },
      {
        title: "Ensure cross-platform compatibility",
        description: "Make the app work seamlessly on both iOS and Android platforms.",
        completed: false,
      },
      {
        title: "Optimize performance",
        description: "Ensure fast loading times and smooth interactions.",
        completed: false,
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Requirements gathering",
        description: "Define detailed requirements and user stories.",
        completed: true,
        dueDate: "April 20, 2024",
        status: "Done",
        priority: "High",
        dependencies: [],
      },
      {
        id: 2,
        title: "UI/UX design",
        description: "Create app screens and user flow designs.",
        completed: true,
        dueDate: "April 30, 2024",
        status: "Done",
        priority: "High",
        dependencies: [1],
      },
      {
        id: 3,
        title: "Frontend development",
        description: "Implement UI components and screens.",
        completed: true,
        dueDate: "May 15, 2024",
        status: "Done",
        priority: "High",
        dependencies: [2],
      },
      {
        id: 4,
        title: "Backend integration",
        description: "Connect app to backend services and APIs.",
        completed: true,
        dueDate: "May 25, 2024",
        status: "Done",
        priority: "High",
        dependencies: [3],
      },
      {
        id: 5,
        title: "Testing",
        description: "Conduct thorough testing across devices and platforms.",
        completed: false,
        dueDate: "June 5, 2024",
        status: "In Progress",
        priority: "High",
        dependencies: [4],
      },
      {
        id: 6,
        title: "Bug fixing",
        description: "Address issues identified during testing.",
        completed: false,
        dueDate: "June 10, 2024",
        status: "To Do",
        priority: "High",
        dependencies: [5],
      },
      {
        id: 7,
        title: "Performance optimization",
        description: "Optimize app performance and resource usage.",
        completed: false,
        dueDate: "June 12, 2024",
        status: "To Do",
        priority: "Medium",
        dependencies: [6],
      },
      {
        id: 8,
        title: "App store submission",
        description: "Prepare and submit app to app stores.",
        completed: false,
        dueDate: "June 15, 2024",
        status: "To Do",
        priority: "High",
        dependencies: [7],
      },
    ],
    milestones: [
      { id: 1, title: "Design Approval", date: "April 30, 2024", completed: true },
      { id: 2, title: "Core Features Complete", date: "May 25, 2024", completed: true },
      { id: 3, title: "App Store Submission", date: "June 15, 2024", completed: false },
    ],
    team: [
      {
        id: 1,
        name: "Alex Johnson",
        role: "Project Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.3,
      },
      {
        id: 3,
        name: "Jamie Lee",
        role: "Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.7,
      },
      {
        id: 5,
        name: "Morgan Chen",
        role: "Backend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.6,
      },
    ],
  },
  {
    id: 3,
    title: "Marketing Campaign",
    status: "Active",
    priority: "High",
    progress: 35,
    tasksCompleted: 3,
    totalTasks: 7,
    startDate: "May 1, 2024",
    endDate: "July 15, 2024",
    image: "/placeholder.svg?height=300&width=400",
    description: "A comprehensive digital marketing campaign for our new product launch across multiple channels.",
    goals: [
      {
        title: "Increase brand awareness",
        description: "Expand the reach of the brand to new potential customers.",
        completed: true,
      },
      {
        title: "Generate qualified leads",
        description: "Attract potential customers who are likely to convert.",
        completed: true,
      },
      {
        title: "Improve conversion rates",
        description: "Optimize marketing materials to increase conversion percentages.",
        completed: false,
      },
      {
        title: "Establish content strategy",
        description: "Create a sustainable plan for ongoing content creation and distribution.",
        completed: false,
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Market research",
        description: "Analyze target audience, competitors, and market trends.",
        completed: true,
        dueDate: "May 10, 2024",
        status: "Done",
        priority: "High",
        dependencies: [],
      },
      {
        id: 2,
        title: "Campaign strategy",
        description: "Develop comprehensive marketing strategy including channels and messaging.",
        completed: true,
        dueDate: "May 20, 2024",
        status: "Done",
        priority: "High",
        dependencies: [1],
      },
      {
        id: 3,
        title: "Content creation",
        description: "Create campaign assets including copy, graphics, and videos.",
        completed: true,
        dueDate: "June 5, 2024",
        status: "Done",
        priority: "Medium",
        dependencies: [2],
      },
      {
        id: 4,
        title: "Channel setup",
        description: "Configure marketing channels, tracking, and automation workflows.",
        completed: false,
        dueDate: "June 15, 2024",
        status: "In Progress",
        priority: "Medium",
        dependencies: [3],
      },
      {
        id: 5,
        title: "Campaign launch",
        description: "Execute campaign launch across all channels.",
        completed: false,
        dueDate: "June 20, 2024",
        status: "To Do",
        priority: "High",
        dependencies: [4],
      },
      {
        id: 6,
        title: "Performance monitoring",
        description: "Track campaign performance and make adjustments as needed.",
        completed: false,
        dueDate: "July 10, 2024",
        status: "To Do",
        priority: "Medium",
        dependencies: [5],
      },
      {
        id: 7,
        title: "Campaign analysis",
        description: "Analyze results and prepare final campaign report.",
        completed: false,
        dueDate: "July 15, 2024",
        status: "To Do",
        priority: "Medium",
        dependencies: [6],
      },
    ],
    milestones: [
      { id: 1, title: "Strategy Approval", date: "May 20, 2024", completed: true },
      { id: 2, title: "Campaign Launch", date: "June 20, 2024", completed: false },
      { id: 3, title: "Campaign Completion", date: "July 15, 2024", completed: false },
    ],
    team: [
      {
        id: 1,
        name: "Alex Johnson",
        role: "Project Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.4,
      },
      {
        id: 6,
        name: "Riley Park",
        role: "Marketing Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.6,
      },
      {
        id: 7,
        name: "Jordan Quinn",
        role: "Content Creator",
        avatar: "/placeholder.svg?height=40&width=40",
        workload: 0.4,
      },
    ],
  },
]

// Team members database with current workload information
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Management", "Planning", "Communication"],
    currentWorkload: 70, // Percentage of total capacity
    projects: ["Mobile App Development", "Marketing Campaign"],
  },
  {
    id: 2,
    name: "Sam Wilson",
    role: "Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["UI/UX", "Graphic Design", "Prototyping"],
    currentWorkload: 40, // Percentage of total capacity
    projects: ["Website Redesign"],
  },
  {
    id: 3,
    name: "Jamie Lee",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Frontend", "React", "JavaScript"],
    currentWorkload: 70, // Percentage of total capacity
    projects: ["Mobile App Development"],
  },
  {
    id: 4,
    name: "Taylor Smith",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["User Research", "Wireframing", "Usability Testing"],
    currentWorkload: 30, // Percentage of total capacity
    projects: ["Website Redesign"],
  },
  {
    id: 5,
    name: "Morgan Chen",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Node.js", "Databases", "API Design"],
    currentWorkload: 60, // Percentage of total capacity
    projects: ["Mobile App Development"],
  },
  {
    id: 6,
    name: "Riley Park",
    role: "Marketing Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Strategy", "Analytics", "Campaign Management"],
    currentWorkload: 60, // Percentage of total capacity
    projects: ["Marketing Campaign"],
  },
  {
    id: 7,
    name: "Jordan Quinn",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Copywriting", "Social Media", "Content Strategy"],
    currentWorkload: 60, // Percentage of total capacity
    projects: ["Website Redesign", "Marketing Campaign"],
  },
  {
    id: 8,
    name: "Casey Rivera",
    role: "QA Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Testing", "Automation", "Bug Tracking"],
    currentWorkload: 20, // Percentage of total capacity
    projects: [],
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = Number(params.id)

  // Find the project in our data
  const projectIndex = projects.findIndex((p) => p.id === projectId)

  // Use state to manage the project data so we can update it
  const [project, setProject] = useState(projectIndex !== -1 ? projects[projectIndex] : null)
  const [showAddTeamMember, setShowAddTeamMember] = useState(false)
  const [availableTeamMembers, setAvailableTeamMembers] = useState([])
  const [isEditable, setIsEditable] = useState(false)
  const [resourceProjection, setResourceProjection] = useState(0)

  // Determine if project is editable (only Planning projects are editable)
  useEffect(() => {
    if (project) {
      setIsEditable(project.status === "Planning")
    }
  }, [project])

  // Calculate available team members (those not already assigned to this project)
  useEffect(() => {
    if (project) {
      const assignedIds = project.team.map((member) => member.id)
      setAvailableTeamMembers(teamMembers.filter((member) => !assignedIds.includes(member.id)))
    }
  }, [project])

  // Calculate resource allocation projection
  useEffect(() => {
    if (project && project.team.length > 0) {
      const totalWorkload = project.team.reduce((sum, member) => sum + member.workload, 0)
      const averageWorkload = (totalWorkload / project.team.length) * 100
      setResourceProjection(averageWorkload)
    } else {
      setResourceProjection(0)
    }
  }, [project])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800"
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Done":
        return "bg-green-100 text-green-800"
      case "To Do":
        return "bg-gray-100 text-gray-800"
      case "On hold":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
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

  const getPriorityBadge = (priority: string) => {
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

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: number) => {
    if (!isEditable) return // Only allow changes if project is in Planning status

    const updatedTasks = project.tasks.map((task) => {
      if (task.id === taskId) {
        const completed = !task.completed
        return {
          ...task,
          completed,
          status: completed ? "Done" : task.status === "Done" ? "To Do" : task.status,
        }
      }
      return task
    })

    const tasksCompleted = updatedTasks.filter((task) => task.completed).length
    const progress = Math.round((tasksCompleted / project.totalTasks) * 100)

    // Also update milestone completion based on related tasks
    const updatedMilestones = project.milestones.map((milestone) => {
      // Simple logic: if all tasks due before or on the milestone date are complete, mark milestone as complete
      const milestoneDateObj = new Date(milestone.date)
      const relatedTasks = updatedTasks.filter((task) => {
        const taskDateObj = new Date(task.dueDate)
        return taskDateObj <= milestoneDateObj
      })

      const allRelatedTasksComplete = relatedTasks.length > 0 && relatedTasks.every((task) => task.completed)

      return {
        ...milestone,
        completed: allRelatedTasksComplete,
      }
    })

    // Update goals completion based on overall progress
    const updatedGoals = project.goals.map((goal, index) => {
      // Simple logic: goals are completed sequentially as progress increases
      const goalThreshold = ((index + 1) / project.goals.length) * 100
      return {
        ...goal,
        completed: progress >= goalThreshold,
      }
    })

    setProject({
      ...project,
      tasks: updatedTasks,
      milestones: updatedMilestones,
      goals: updatedGoals,
      tasksCompleted,
      progress,
      status: progress === 100 ? "Completed" : progress > 0 ? "Active" : "Planning",
    })
  }

  // Calculate projected workload for a team member if added to this project
  const calculateProjectedWorkload = (memberId, defaultWorkload = 0.5) => {
    const member = teamMembers.find((m) => m.id === memberId)
    if (!member) return { current: 0, projected: 0 }

    return {
      current: member.currentWorkload,
      projected: member.currentWorkload + defaultWorkload * 100,
    }
  }

  // Add team member to project
  const addTeamMember = (memberId, workload = 0.5) => {
    if (!isEditable) return // Only allow changes if project is in Planning status

    const memberToAdd = teamMembers.find((m) => m.id === memberId)
    if (!memberToAdd) return

    const updatedTeam = [
      ...project.team,
      {
        ...memberToAdd,
        workload: workload, // Default workload
      },
    ]

    setProject({
      ...project,
      team: updatedTeam,
    })

    setShowAddTeamMember(false)
  }

  // Update team member workload
  const updateTeamMemberWorkload = (memberId, workload) => {
    if (!isEditable) return // Only allow changes if project is in Planning status

    const updatedTeam = project.team.map((member) => {
      if (member.id === memberId) {
        return {
          ...member,
          workload: Number.parseFloat(workload),
        }
      }
      return member
    })

    setProject({
      ...project,
      team: updatedTeam,
    })
  }

  // Remove team member from project
  const removeTeamMember = (memberId) => {
    if (!isEditable) return // Only allow changes if project is in Planning status

    const updatedTeam = project.team.filter((member) => member.id !== memberId)

    setProject({
      ...project,
      team: updatedTeam,
    })
  }

  // Calculate days remaining
  const calculateDaysRemaining = () => {
    const today = new Date()
    const endDate = new Date(project.endDate)
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const daysRemaining = calculateDaysRemaining()

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  // Get workload color based on percentage
  const getWorkloadColor = (workload) => {
    if (workload >= 90) return "text-red-500"
    if (workload >= 70) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}
            >
              {project.status}
            </span>
            {getPriorityBadge(project.priority)}
            {isEditable && (
              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                Editable
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Overview Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-muted-foreground">{project.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Timeline</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Start Date:</span>
                      <span>{formatDate(project.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">End Date:</span>
                      <span>{formatDate(project.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>
                        {Math.ceil(
                          (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Progress</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Tasks:</span>
                      <span>
                        {project.tasksCompleted} of {project.totalTasks} completed
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Completion:</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Goals */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Project Goals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.goals?.map((goal, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${goal.completed ? "bg-green-50 border-green-200" : "bg-white"}`}
                    >
                      <div className="flex items-start">
                        <div
                          className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${goal.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                        >
                          {goal.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h4 className={`font-medium ${goal.completed ? "text-green-700" : ""}`}>{goal.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Assignment Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Team
              </CardTitle>
              {isEditable && (
                <Button variant="outline" size="sm" onClick={() => setShowAddTeamMember(!showAddTeamMember)}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              )}
            </div>
            {isEditable && (
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">Resource allocation: </span>
                {project.team.length > 0 ? (
                  <>
                    <span className={getWorkloadColor(70)}>70%</span>
                    <span className="mx-1">→</span>
                    <span className={getWorkloadColor(resourceProjection)}>{resourceProjection.toFixed(0)}%</span>
                  </>
                ) : (
                  <span className={getWorkloadColor(0)}>0%</span>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {isEditable && showAddTeamMember && (
              <div className="mb-4 p-3 border rounded-md bg-slate-50">
                <h4 className="text-sm font-medium mb-2">Add Team Member</h4>
                <div className="space-y-2">
                  {availableTeamMembers.length > 0 ? (
                    availableTeamMembers.map((member) => {
                      const { current, projected } = calculateProjectedWorkload(member.id)
                      return (
                        <div key={member.id} className="flex items-center justify-between p-2 bg-white rounded border">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs">
                              <span className={getWorkloadColor(current)}>{current}%</span>
                              <span className="mx-1">→</span>
                              <span className={getWorkloadColor(projected)}>{projected}%</span>
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => addTeamMember(member.id)}>
                              Add
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      All team members are already assigned to this project.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3">
              {project.team.length > 0 ? (
                project.team.map((member) => {
                  const fullMember = teamMembers.find((m) => m.id === member.id)
                  return (
                    <div key={member.id} className="flex flex-col p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                          </div>
                        </div>
                        {isEditable && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => removeTeamMember(member.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-x"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </Button>
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Workload</span>
                          <span className={getWorkloadColor(fullMember.currentWorkload)}>
                            {fullMember.currentWorkload}%
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {fullMember.projects.length > 0 ? (
                            <>Assigned to: {fullMember.projects.join(", ")}</>
                          ) : (
                            <>No other project assignments</>
                          )}
                        </div>
                        {isEditable && (
                          <div className="text-xs mt-1">
                            <span className="text-muted-foreground">Project allocation: </span>
                            <span className="font-medium">{(member.workload * 100).toFixed(0)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-6">
                  <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-sm font-medium">No team members assigned</h3>
                  <p className="text-xs text-muted-foreground mt-1">Add team members to this project</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Project Tasks</CardTitle>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {project.tasksCompleted} of {project.totalTasks} tasks completed
              </div>
              <div className="w-32">
                <Progress value={project.progress} className="h-2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.tasks
                ?.filter((task) => task.status !== "In Progress")
                .map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 last:mb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          disabled={!isEditable}
                          className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 mt-1 ${
                            task.completed ? "bg-green-100 border-green-500 text-green-500" : "border-gray-300"
                          } ${!isEditable ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                        >
                          {task.completed && <CheckCircle2 className="h-4 w-4" />}
                        </button>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                              {task.title}
                            </p>
                            <Badge variant="secondary" className={getTaskStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getPriorityIcon(task.priority)}
                              <span className="ml-1">{task.priority}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CalendarDays className="h-3 w-3 mr-1" />
                              Due: {task.dueDate}
                            </div>
                            {task.dependencies.length > 0 && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>Depends on: {task.dependencies.join(", ")}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
