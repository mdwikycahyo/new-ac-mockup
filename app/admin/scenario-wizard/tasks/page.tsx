"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  FileText,
  GripVertical,
  Info,
  Mail,
  MessageSquare,
  Search,
  Video,
  X,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSearchParams } from "next/navigation"

export default function TaskSelectionPage() {
  const searchParams = useSearchParams()
  const competency = searchParams.get("competency") || "problem-solving"
  const competencyName = getCompetencyName(competency)

  const [selectedTasks, setSelectedTasks] = useState<TaskTemplate[]>([
    {
      id: "1",
      title: "Customer Complaint Email",
      description: "Respond to a customer complaint about a product defect",
      type: "email",
      duration: 10,
      competencies: ["problem-solving", "customer-orientation"],
    },
    {
      id: "2",
      title: "Technical Support Chat",
      description: "Help a customer troubleshoot a technical issue through chat",
      type: "chat",
      duration: 15,
      competencies: ["problem-solving", "technology-savvy", "customer-orientation"],
    },
    {
      id: "3",
      title: "Process Improvement Document",
      description: "Review and suggest improvements to a business process document",
      type: "document",
      duration: 20,
      competencies: ["continuous-improvement", "business-acumen", "disciplined-execution"],
    },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [draggedTask, setDraggedTask] = useState<number | null>(null)
  const [dropTarget, setDropTarget] = useState<number | null>(null)
  const [sequenceChanged, setSequenceChanged] = useState(false)

  // Filter tasks based on type and search query
  const filteredTasks = taskTemplates.filter((task) => {
    // Filter by type if a specific tab is selected
    if (activeTab !== "all" && task.type !== activeTab) return false

    // Filter by search query
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const handleAddTask = (task: TaskTemplate) => {
    // Check if task is already selected
    if (selectedTasks.some((t) => t.id === task.id)) return

    setSelectedTasks([...selectedTasks, task])
  }

  const handleRemoveTask = (taskId: string) => {
    setSelectedTasks(selectedTasks.filter((task) => task.id !== taskId))
  }

  const handleDragStart = (index: number) => {
    setDraggedTask(index)
  }

  const handleDragOver = (index: number) => {
    if (draggedTask === null || draggedTask === index) return
    setDropTarget(index)
  }

  const handleDragEnd = () => {
    if (draggedTask !== null && dropTarget !== null && draggedTask !== dropTarget) {
      const newTasks = [...selectedTasks]
      const draggedItem = newTasks[draggedTask]
      newTasks.splice(draggedTask, 1)
      newTasks.splice(dropTarget, 0, draggedItem)
      setSelectedTasks(newTasks)
      setSequenceChanged(true)

      // Reset after a delay to allow the user to see the notification
      setTimeout(() => {
        setSequenceChanged(false)
      }, 3000)
    }
    setDraggedTask(null)
    setDropTarget(null)
  }

  const totalDuration = selectedTasks.reduce((sum, task) => sum + task.duration, 0)

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Assessment Scenario</h1>
        <p className="text-muted-foreground">
          Design a scenario to assess <span className="font-medium text-foreground">{competencyName}</span> through a
          series of micro-tasks
        </p>
      </div>

      <div className="mb-8">
        <WizardSteps currentStep={2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Task Library</CardTitle>
              <CardDescription>Select tasks for your scenario</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tasks..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 overflow-x-auto">
                  <TabsTrigger
                    value="all"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="email"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="chat"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="document"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Document
                  </TabsTrigger>
                  <TabsTrigger
                    value="calendar"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger
                    value="meeting"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Meeting
                  </TabsTrigger>
                  <TabsTrigger
                    value="call"
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Call
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="m-0">
                  <div className="space-y-1 p-2">
                    {filteredTasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onAdd={() => handleAddTask(task)}
                        isSelected={selectedTasks.some((t) => t.id === task.id)}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="email" className="m-0">
                  <div className="space-y-1 p-2">
                    {filteredTasks
                      .filter((task) => task.type === "email")
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onAdd={() => handleAddTask(task)}
                          isSelected={selectedTasks.some((t) => t.id === task.id)}
                        />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="chat" className="m-0">
                  <div className="space-y-1 p-2">
                    {filteredTasks
                      .filter((task) => task.type === "chat")
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onAdd={() => handleAddTask(task)}
                          isSelected={selectedTasks.some((t) => t.id === task.id)}
                        />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="document" className="m-0">
                  <div className="space-y-1 p-2">
                    {filteredTasks
                      .filter((task) => task.type === "document")
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onAdd={() => handleAddTask(task)}
                          isSelected={selectedTasks.some((t) => t.id === task.id)}
                        />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="calendar" className="m-0">
                  <div className="space-y-1 p-2">
                    {filteredTasks
                      .filter((task) => task.type === "calendar")
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onAdd={() => handleAddTask(task)}
                          isSelected={selectedTasks.some((t) => t.id === task.id)}
                        />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="meeting" className="m-0">
                  <div className="space-y-1 p-2">
                    {filteredTasks
                      .filter((task) => task.type === "meeting")
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onAdd={() => handleAddTask(task)}
                          isSelected={selectedTasks.some((t) => t.id === task.id)}
                        />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="call" className="m-0">
                  <div className="space-y-1 p-2">
                    {filteredTasks
                      .filter((task) => task.type === "call")
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onAdd={() => handleAddTask(task)}
                          isSelected={selectedTasks.some((t) => t.id === task.id)}
                        />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Selected Tasks</CardTitle>
              <CardDescription>Drag to reorder tasks in your scenario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sequenceChanged && (
                  <Alert className="bg-primary/10 border-primary/20">
                    <AlertDescription className="flex items-center">
                      Task sequence updated. The order of tasks affects the flow of the assessment scenario.
                    </AlertDescription>
                  </Alert>
                )}

                {selectedTasks.length > 0 ? (
                  <div className="rounded-md border p-1">
                    <div className="space-y-2">
                      {selectedTasks.map((task, index) => (
                        <SelectedTaskItem
                          key={task.id}
                          task={task}
                          index={index}
                          onRemove={() => handleRemoveTask(task.id)}
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={() => handleDragOver(index)}
                          onDragEnd={handleDragEnd}
                          isDragging={draggedTask === index}
                          isDropTarget={dropTarget === index}
                          totalTasks={selectedTasks.length}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">No tasks selected</p>
                      <p className="text-xs text-muted-foreground">
                        Select tasks from the library to add them to your scenario
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{selectedTasks.length}</span> tasks selected |{" "}
                    <span className="font-medium text-foreground">{totalDuration}</span> minutes total
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/admin/scenario-wizard?competency=${competency}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Link>
                    </Button>
                    <Button asChild disabled={selectedTasks.length === 0}>
                      <Link
                        href={
                          selectedTasks.length > 0 ? `/admin/scenario-wizard/configure?competency=${competency}` : "#"
                        }
                      >
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function WizardSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, name: "Select Competency" },
    { number: 2, name: "Choose Tasks" },
    { number: 3, name: "Configure Details" },
    { number: 4, name: "Preview & Publish" },
  ]

  return (
    <div className="relative mb-8">
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
      <ol className="relative z-10 flex justify-between">
        {steps.map((step) => (
          <li key={step.number} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                step.number === currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.number < currentStep
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`ml-2 hidden text-sm md:block ${
                step.number === currentStep ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function TaskItem({
  task,
  onAdd,
  isSelected,
}: {
  task: TaskTemplate
  onAdd: () => void
  isSelected: boolean
}) {
  const Icon = getTaskIcon(task.type)

  return (
    <div
      className={`flex items-center gap-3 rounded-md border p-3 transition-colors ${
        isSelected ? "border-primary/50 bg-primary/5" : "cursor-pointer hover:border-primary/50 hover:bg-muted/50"
      }`}
      onClick={isSelected ? undefined : onAdd}
    >
      <div className="rounded-md bg-primary/10 p-1.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{task.title}</p>
          <Badge variant="outline" className="text-xs">
            {task.duration} min
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">{getGeneralDescription(task.type)}</p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
              <Info className="h-4 w-4" />
              <span className="sr-only">Task details</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm">{task.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {task.duration} min
                </Badge>
                <Badge variant="outline" className="text-xs capitalize">
                  {task.type}
                </Badge>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

function SelectedTaskItem({
  task,
  index,
  onRemove,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging,
  isDropTarget,
  totalTasks,
}: {
  task: TaskTemplate
  index: number
  onRemove: () => void
  onDragStart: () => void
  onDragOver: () => void
  onDragEnd: () => void
  isDragging: boolean
  isDropTarget: boolean
  totalTasks: number
}) {
  const Icon = getTaskIcon(task.type)

  return (
    <div
      className={`flex items-center gap-3 rounded-md border p-3 transition-all ${
        isDragging ? "opacity-50 border-dashed" : ""
      } ${isDropTarget ? "border-primary bg-primary/5" : "bg-card"}`}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver()
      }}
    >
      <div className="cursor-grab" draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Step {index + 1} of {totalTasks}
          </Badge>
          <p className="font-medium">{task.title}</p>
          <Badge variant="outline" className="text-xs">
            {task.duration} min
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={onRemove}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function getTaskIcon(type: string) {
  switch (type) {
    case "email":
      return Mail
    case "chat":
      return MessageSquare
    case "document":
      return FileText
    case "calendar":
      return Calendar
    case "meeting":
      return Video
    case "video":
      return Video
    case "call":
      return Phone
    default:
      return FileText
  }
}

function getCompetencyName(id: string) {
  const competencyMap: Record<string, string> = {
    "problem-solving": "Problem Solving",
    "continuous-improvement": "Continuous Improvement",
    "customer-orientation": "Customer Orientation",
    "business-acumen": "Business Acumen",
    "disciplined-execution": "Disciplined Execution",
    "coaching-performance": "Coaching for Performance",
    collaboration: "Collaboration",
    "technology-savvy": "Technology Savvy",
  }
  return competencyMap[id] || "Unknown Competency"
}

function getGeneralDescription(type: string) {
  switch (type) {
    case "email":
      return "Compose or respond to emails in a professional context"
    case "chat":
      return "Engage in real-time text-based communication"
    case "document":
      return "Review, analyze, or create written documents"
    case "calendar":
      return "Manage schedules and prioritize time commitments"
    case "meeting":
      return "Facilitate or participate in group discussions"
    case "video":
      return "Communicate through video-based interactions"
    case "call":
      return "Handle phone conversations in a professional setting"
    default:
      return "Complete task-based assessment activity"
  }
}

interface TaskTemplate {
  id: string
  title: string
  description: string
  type: string
  duration: number
  competencies: string[]
}

const taskTemplates: TaskTemplate[] = [
  {
    id: "1",
    title: "Customer Complaint Email",
    description: "Respond to a customer complaint about a product defect",
    type: "email",
    duration: 10,
    competencies: ["problem-solving", "customer-orientation"],
  },
  {
    id: "2",
    title: "Technical Support Chat",
    description: "Help a customer troubleshoot a technical issue through chat",
    type: "chat",
    duration: 15,
    competencies: ["problem-solving", "technology-savvy", "customer-orientation"],
  },
  {
    id: "3",
    title: "Process Improvement Document",
    description: "Review and suggest improvements to a business process document",
    type: "document",
    duration: 20,
    competencies: ["continuous-improvement", "business-acumen", "disciplined-execution"],
  },
  {
    id: "4",
    title: "Team Meeting Simulation",
    description: "Lead a virtual team meeting to solve a business challenge",
    type: "meeting",
    duration: 25,
    competencies: ["collaboration", "coaching-performance", "problem-solving"],
  },
  {
    id: "5",
    title: "Project Schedule Review",
    description: "Review and optimize a project schedule with conflicting priorities",
    type: "calendar",
    duration: 15,
    competencies: ["disciplined-execution", "business-acumen"],
  },
  {
    id: "6",
    title: "Customer Feedback Analysis",
    description: "Analyze customer feedback data and recommend improvements",
    type: "document",
    duration: 20,
    competencies: ["customer-orientation", "continuous-improvement", "business-acumen"],
  },
  {
    id: "7",
    title: "Technical Documentation Review",
    description: "Review and improve technical documentation for clarity and accuracy",
    type: "document",
    duration: 15,
    competencies: ["technology-savvy", "continuous-improvement"],
  },
  {
    id: "8",
    title: "Cross-Department Collaboration Email",
    description: "Draft an email to coordinate a cross-functional project",
    type: "email",
    duration: 10,
    competencies: ["collaboration", "business-acumen"],
  },
  {
    id: "9",
    title: "Performance Feedback Chat",
    description: "Provide constructive feedback to a team member via chat",
    type: "chat",
    duration: 15,
    competencies: ["coaching-performance", "collaboration"],
  },
  {
    id: "10",
    title: "System Implementation Plan",
    description: "Review and improve a technology implementation plan",
    type: "document",
    duration: 20,
    competencies: ["technology-savvy", "disciplined-execution", "business-acumen"],
  },
  {
    id: "11",
    title: "Crisis Communication Email",
    description: "Draft an email addressing a company crisis situation",
    type: "email",
    duration: 15,
    competencies: ["problem-solving", "business-acumen", "customer-orientation"],
  },
  {
    id: "12",
    title: "Resource Allocation Decision",
    description: "Determine how to allocate limited resources across competing priorities",
    type: "document",
    duration: 20,
    competencies: ["disciplined-execution", "business-acumen", "problem-solving"],
  },
  {
    id: "13",
    title: "Team Conflict Resolution Chat",
    description: "Mediate a conflict between team members via chat",
    type: "chat",
    duration: 15,
    competencies: ["coaching-performance", "collaboration", "problem-solving"],
  },
  {
    id: "14",
    title: "Product Launch Planning",
    description: "Create a timeline and task list for a new product launch",
    type: "calendar",
    duration: 25,
    competencies: ["disciplined-execution", "business-acumen", "collaboration"],
  },
  {
    id: "15",
    title: "Customer Onboarding Improvement",
    description: "Analyze and improve the customer onboarding process",
    type: "document",
    duration: 20,
    competencies: ["customer-orientation", "continuous-improvement"],
  },
  {
    id: "16",
    title: "Conference Call with Stakeholders",
    description: "Lead a conference call with multiple stakeholders to discuss project status",
    type: "call",
    duration: 20,
    competencies: ["collaboration", "communication", "leadership"],
  },
  {
    id: "17",
    title: "Team Calendar Coordination",
    description: "Coordinate team schedules for an upcoming project deadline",
    type: "calendar",
    duration: 15,
    competencies: ["disciplined-execution", "collaboration"],
  },
  {
    id: "18",
    title: "Client Consultation Call",
    description: "Conduct a phone consultation with a client to understand their needs",
    type: "call",
    duration: 15,
    competencies: ["customer-orientation", "communication"],
  },
  {
    id: "19",
    title: "Department Meeting Facilitation",
    description: "Facilitate a department meeting to address operational challenges",
    type: "meeting",
    duration: 30,
    competencies: ["leadership", "collaboration", "problem-solving"],
  },
  {
    id: "20",
    title: "Project Status Update Meeting",
    description: "Lead a project status update meeting with team members",
    type: "meeting",
    duration: 20,
    competencies: ["disciplined-execution", "communication", "leadership"],
  },
]
