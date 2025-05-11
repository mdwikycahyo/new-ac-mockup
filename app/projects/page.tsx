"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Plus,
  Calendar,
  Clock,
  ArrowRight,
  AlertTriangle,
  AlertCircle,
  Users,
  BarChart2,
  LayoutGrid,
  CalendarDays,
} from "lucide-react"
import { AddProjectModal } from "@/components/add-project-modal"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [viewMode, setViewMode] = useState("timeline") // 'cards' or 'timeline'
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Website Redesign",
      status: "Planning",
      priority: "Medium",
      progress: 0,
      tasksCompleted: 0,
      totalTasks: 5,
      startDate: "2024-05-20",
      endDate: "2024-06-30",
      resourceAllocation: 0.5,
      image: "/placeholder.svg?height=300&width=400",
      color: "#3b82f6", // Blue for Planning
      team: [
        { id: 2, workload: 0.4 },
        { id: 4, workload: 0.3 },
        { id: 7, workload: 0.2 },
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
      startDate: "2024-04-15",
      endDate: "2024-06-15",
      resourceAllocation: 0.8,
      image: "/placeholder.svg?height=300&width=400",
      color: "#22c55e", // Green for Active
      team: [
        { id: 1, workload: 0.3 },
        { id: 3, workload: 0.7 },
        { id: 5, workload: 0.6 },
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
      startDate: "2024-05-01",
      endDate: "2024-07-15",
      resourceAllocation: 0.7,
      image: "/placeholder.svg?height=300&width=400",
      color: "#22c55e", // Green for Active
      team: [
        { id: 1, workload: 0.4 },
        { id: 6, workload: 0.6 },
        { id: 7, workload: 0.4 },
      ],
    },
  ])

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

  // Calculate impact metrics for all projects
  const [projectsWithImpact, setProjectsWithImpact] = useState([])

  useEffect(() => {
    // Calculate impact for each project
    const calculateImpact = () => {
      return projects.map((project) => {
        // Skip completed projects
        if (project.status === "Completed") {
          return {
            ...project,
            timelineImpact: 0,
            resourceImpact: 0,
            overallImpact: 0,
          }
        }

        // Calculate how many other projects this project overlaps with
        const projectStart = new Date(project.startDate)
        const projectEnd = new Date(project.endDate)

        // Timeline impact: percentage of active projects this overlaps with
        const overlappingProjects = projects.filter((p) => {
          if (p.id === project.id || p.status === "Completed") return false
          const pStart = new Date(p.startDate)
          const pEnd = new Date(p.endDate)
          return projectStart <= pEnd && projectEnd >= pStart
        })

        const timelineImpact = projects.length > 1 ? (overlappingProjects.length / (projects.length - 1)) * 100 : 0

        // Resource impact: how much of available resources this project consumes
        const totalResources = projects
          .filter((p) => p.status !== "Completed" && p.id !== project.id)
          .reduce((sum, p) => sum + p.resourceAllocation, 0)

        const resourceImpact =
          totalResources > 0
            ? (project.resourceAllocation / (totalResources + project.resourceAllocation)) * 100
            : project.resourceAllocation * 100

        // Overall impact (weighted average)
        const overallImpact = timelineImpact * 0.5 + resourceImpact * 0.5

        return {
          ...project,
          timelineImpact,
          resourceImpact,
          overallImpact,
          overlappingProjects: overlappingProjects.map((p) => p.id),
        }
      })
    }

    setProjectsWithImpact(calculateImpact())
  }, [projects])

  const handleAddProject = (newProject) => {
    // New projects are always in Planning status
    setProjects([
      ...projects,
      {
        ...newProject,
        id: projects.length + 1,
        status: "Planning",
        color: "#3b82f6", // Blue for Planning
        team: [],
      },
    ])
  }

  const filteredProjects = projectsWithImpact.filter(
    (project) =>
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.priority.toLowerCase().includes(searchQuery.toLowerCase())) &&
      project.status !== "Completed", // Filter out completed projects
  )

  // Filter active and planning projects
  const activeProjects = filteredProjects.filter((project) => project.status === "Active")
  const planningProjects = filteredProjects.filter((project) => project.status === "Planning")

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100"
      case "Medium":
        return "bg-yellow-100"
      case "Low":
        return "bg-blue-100"
      default:
        return "bg-gray-100"
    }
  }

  const getImpactColor = (impact) => {
    if (impact >= 70) return "text-red-500"
    if (impact >= 40) return "text-yellow-500"
    return "text-green-500"
  }

  // Calculate average team workload for active projects
  const calculateAverageTeamWorkload = () => {
    const activeProjectsData = projects.filter((p) => p.status === "Active")
    if (activeProjectsData.length === 0) return 0

    // Get all team members from active projects
    const allTeamMembers = activeProjectsData.flatMap((project) =>
      project.team.map((member) => ({
        id: member.id,
        workload: member.workload,
      })),
    )

    // Calculate average workload
    if (allTeamMembers.length === 0) return 0
    const totalWorkload = allTeamMembers.reduce((sum, member) => sum + member.workload, 0)
    return (totalWorkload / allTeamMembers.length) * 100
  }

  const averageTeamWorkload = calculateAverageTeamWorkload()

  // Calculate timeline overlap
  const calculateTimelineOverlap = () => {
    const activeProjs = projects.filter((p) => p.status === "Active")
    if (activeProjs.length <= 1) return 0

    let totalOverlaps = 0
    for (let i = 0; i < activeProjs.length; i++) {
      const project = activeProjs[i]
      const projectStart = new Date(project.startDate)
      const projectEnd = new Date(project.endDate)

      for (let j = i + 1; j < activeProjs.length; j++) {
        const otherProject = activeProjs[j]
        const otherStart = new Date(otherProject.startDate)
        const otherEnd = new Date(otherProject.endDate)

        if (projectStart <= otherEnd && projectEnd >= otherStart) {
          totalOverlaps++
        }
      }
    }

    return totalOverlaps
  }

  const timelineOverlaps = calculateTimelineOverlap()

  // Get week number
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }

  // Generate weeks for the timeline view (monthly basis)
  const generateTimelineWeeks = () => {
    // Get all active and planning projects
    const projectsToShow = filteredProjects

    // Find the earliest and latest dates
    const allDates = projectsToShow.flatMap((p) => [new Date(p.startDate), new Date(p.endDate)])
    if (allDates.length === 0) return { weeks: [], startDate: new Date(), endDate: new Date() }

    const earliestDate = new Date(Math.min(...allDates.map((d) => d.getTime())))
    const latestDate = new Date(Math.max(...allDates.map((d) => d.getTime())))

    // Adjust to start at the beginning of the week
    const startDate = new Date(earliestDate)
    startDate.setDate(startDate.getDate() - startDate.getDay()) // Go to previous Sunday

    // Ensure we show at least 4 weeks
    const minEndDate = new Date(startDate)
    minEndDate.setDate(minEndDate.getDate() + 28) // 4 weeks
    const endDate = latestDate > minEndDate ? latestDate : minEndDate

    // Generate array of weeks to display
    const weeks = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const weekStart = new Date(currentDate)
      const weekEnd = new Date(currentDate)
      weekEnd.setDate(weekEnd.getDate() + 6) // End of week (Saturday)

      weeks.push({
        start: new Date(weekStart),
        end: new Date(weekEnd),
        weekNumber: getWeekNumber(weekStart),
      })

      // Move to next week
      currentDate.setDate(currentDate.getDate() + 7)
    }

    return { weeks, startDate, endDate }
  }

  const { weeks, startDate, endDate } = generateTimelineWeeks()

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Format week range
  const formatWeekRange = (week) => {
    return `${formatDate(week.start)} - ${formatDate(week.end)}`
  }

  // Check if week contains today
  const isCurrentWeek = (week) => {
    const today = new Date()
    return today >= week.start && today <= week.end
  }

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleDateString("en-US", { month: "long" })
  }

  // Get month range
  const getMonthRange = () => {
    if (weeks.length === 0) return ""
    const firstMonth = getMonthName(weeks[0].start)
    const lastMonth = getMonthName(weeks[weeks.length - 1].end)
    return firstMonth === lastMonth ? firstMonth : `${firstMonth} - ${lastMonth}`
  }

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
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      {/* Impact Summary */}
      <Card className="mb-6 bg-slate-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-muted-foreground" />
            Project Portfolio Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="font-medium">Timeline Overlap</h3>
                </div>
                <span className="text-lg font-semibold">{timelineOverlaps} overlapping active projects</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Projects with overlapping timelines may create scheduling conflicts
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-indigo-500" />
                  <h3 className="font-medium">Resource Allocation</h3>
                </div>
                <span
                  className={`text-lg font-semibold ${averageTeamWorkload > 80 ? "text-red-500" : averageTeamWorkload > 60 ? "text-yellow-500" : "text-green-500"}`}
                >
                  {averageTeamWorkload.toFixed(0)}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Average team workload allocation from active projects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
            Active Projects: {activeProjects.length}
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-1.5"></span>
            Planning Projects: {planningProjects.length}
          </Badge>
        </div>

        <div className="flex border rounded-md shadow-sm overflow-hidden">
          <Button
            variant={viewMode === "timeline" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("timeline")}
            className={`px-3 py-2 h-9 flex items-center gap-1.5 rounded-none ${viewMode === "timeline" ? "bg-primary text-primary-foreground" : "bg-background hover:text-primary hover:bg-accent"}`}
          >
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </Button>
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className={`px-3 py-2 h-9 flex items-center gap-1.5 rounded-none ${viewMode === "cards" ? "bg-primary text-primary-foreground" : "bg-background hover:text-primary hover:bg-accent"}`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Cards</span>
          </Button>
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <ProjectTimelineView
          projects={filteredProjects}
          weeks={weeks}
          formatWeekRange={formatWeekRange}
          isCurrentWeek={isCurrentWeek}
          getMonthRange={getMonthRange}
          formatDate={formatDate}
        />
      )}

      <AddProjectModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAddProject={handleAddProject} />
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800"
      case "Active":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityBadge = (priority: string) => {
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

  return (
    <Card className="transition-all hover:shadow-md flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(project.status)}`}
              >
                {project.status}
              </span>
              {getPriorityBadge(project.priority)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {project.tasksCompleted} of {project.totalTasks} tasks completed
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

function ProjectTimelineView({ projects, weeks, formatWeekRange, isCurrentWeek, getMonthRange, formatDate }) {
  if (weeks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No projects to display</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or add new projects</p>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Timeline</CardTitle>
            <Badge variant="outline" className="ml-2">
              {getMonthRange()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header with weeks */}
            <div className="grid grid-cols-[200px_1fr] border-b">
              <div className="p-3 font-medium text-sm border-r flex items-center justify-center">Projects</div>
              <div className="grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(150px, 1fr))` }}>
                {weeks.map((week, i) => (
                  <div
                    key={i}
                    className={`p-3 text-center border-r last:border-r-0 ${isCurrentWeek(week) ? "bg-blue-50" : ""}`}
                  >
                    <div className="font-medium text-sm">Week {week.weekNumber}</div>
                    <div
                      className={`text-xs ${isCurrentWeek(week) ? "text-blue-600 font-medium" : "text-muted-foreground"}`}
                    >
                      {formatWeekRange(week)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project rows */}
            <div>
              {projects.map((project) => {
                const projectStart = new Date(project.startDate)
                const projectEnd = new Date(project.endDate)

                return (
                  <div key={project.id} className="grid grid-cols-[200px_1fr] border-b hover:bg-slate-50 group">
                    <div className="p-3 border-r">
                      <Link href={`/projects/${project.id}`} className="hover:underline">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                          <span className="font-medium">{project.title}</span>
                        </div>
                      </Link>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            project.status === "Planning" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                          }`}
                        >
                          {project.status}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            project.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : project.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {project.priority}
                        </span>
                      </div>
                    </div>

                    <div
                      className="grid relative"
                      style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(150px, 1fr))` }}
                    >
                      {/* Hover highlight for entire row */}
                      <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-10 bg-slate-400 pointer-events-none z-10"></div>

                      {/* Timeline bar - Replace tooltip with inline information */}
                      <Link href={`/projects/${project.id}`}>
                        <div
                          className="absolute h-auto min-h-[60px] rounded-md border hover:shadow-md transition-shadow cursor-pointer flex flex-col px-2 py-1.5 z-20"
                          style={{
                            backgroundColor: `${project.color}20`, // 20% opacity
                            borderColor: project.color,
                            left: calculatePosition(projectStart, weeks) + "%",
                            width: calculateWidth(projectStart, projectEnd, weeks) + "%",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <div
                            className="absolute left-0 top-0 h-full rounded-md"
                            style={{
                              backgroundColor: project.color,
                              width: `${project.progress}%`,
                              opacity: 0.3,
                            }}
                          ></div>
                          <div className="flex items-center gap-1 z-10 mb-1">
                            <span
                              className="inline-flex items-center justify-center h-5 w-5 rounded-full text-xs font-medium"
                              style={{ backgroundColor: project.color, color: "white" }}
                            >
                              {project.progress}%
                            </span>
                            <span className="text-xs font-medium truncate">{project.title}</span>
                          </div>
                          <div className="text-xs z-10 space-y-0.5">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Status:</span> {project.status}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Priority:</span> {project.priority}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Date:</span> {formatDate(new Date(project.startDate))} -{" "}
                              {formatDate(new Date(project.endDate))}
                            </div>
                            {project.overlappingProjects?.length > 0 && (
                              <div className="text-amber-700">
                                Overlaps with {project.overlappingProjects.length} project(s)
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>

                      {/* Grid cells - Make borders visible when scrolling */}
                      {weeks.map((week, i) => (
                        <div
                          key={i}
                          className={`border-r last:border-r-0 h-[120px] ${isCurrentWeek(week) ? "bg-blue-50" : ""}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to calculate position percentage for weekly view
function calculatePosition(startDate, weeks) {
  if (weeks.length === 0) return 0

  const firstWeekStart = weeks[0].start
  const lastWeekEnd = weeks[weeks.length - 1].end
  const totalRange = lastWeekEnd.getTime() - firstWeekStart.getTime()

  // If start date is before the first week
  if (startDate < firstWeekStart) return 0

  // If start date is after the last week
  if (startDate > lastWeekEnd) return 100

  // Calculate position as percentage
  return ((startDate.getTime() - firstWeekStart.getTime()) / totalRange) * 100
}

// Helper function to calculate width percentage for weekly view
function calculateWidth(startDate, endDate, weeks) {
  if (weeks.length === 0) return 0

  const firstWeekStart = weeks[0].start
  const lastWeekEnd = weeks[weeks.length - 1].end
  const totalRange = lastWeekEnd.getTime() - firstWeekStart.getTime()

  // Adjust start date if it's before our range
  const adjustedStart = startDate < firstWeekStart ? firstWeekStart : startDate

  // Adjust end date if it's after our range
  const adjustedEnd = endDate > lastWeekEnd ? lastWeekEnd : endDate

  // Calculate width as percentage
  return ((adjustedEnd.getTime() - adjustedStart.getTime()) / totalRange) * 100
}
