import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Clock, AlertCircle, Calendar } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function TasksPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">Track and manage your assigned tasks</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search tasks..." className="w-full pl-8" />
          </div>
          <Button asChild>
            <Link href="/tasks/add">
              <Plus className="mr-2 h-4 w-4" /> New Task
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <TaskGroup title="High Priority" tasks={highPriorityTasks} />
          <TaskGroup title="In Progress" tasks={inProgressTasks} />
          <TaskGroup title="Upcoming" tasks={upcomingTasks} />
        </TabsContent>
        <TabsContent value="today" className="space-y-4">
          <TaskGroup title="Today's Tasks" tasks={todayTasks} />
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <TaskGroup title="Upcoming Tasks" tasks={upcomingTasks} />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <TaskGroup title="Completed Tasks" tasks={completedTasks} />
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Task Overview</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tasks Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">4/12</div>
                <Progress value={33} className="h-2 w-24" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">33% of tasks completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="mt-2 text-sm text-muted-foreground">Tasks due in the next 48 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Overdue Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">2</div>
              <p className="mt-2 text-sm text-muted-foreground">Tasks that need immediate attention</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface Task {
  id: number
  title: string
  description?: string
  dueDate: string
  priority: "high" | "medium" | "low"
  completed: boolean
  progress?: number
}

const highPriorityTasks: Task[] = [
  {
    id: 1,
    title: "Complete Quarterly Report",
    description: "Finalize the Q1 financial report with all department inputs",
    dueDate: "Today, 5:00 PM",
    priority: "high",
    completed: false,
    progress: 75,
  },
  {
    id: 2,
    title: "Prepare Client Presentation",
    description: "Create slides for the upcoming client meeting",
    dueDate: "Tomorrow, 10:00 AM",
    priority: "high",
    completed: false,
    progress: 30,
  },
]

const inProgressTasks: Task[] = [
  {
    id: 3,
    title: "Review Marketing Materials",
    description: "Check the new brochures and website content",
    dueDate: "Apr 17, 2025",
    priority: "medium",
    completed: false,
    progress: 50,
  },
  {
    id: 4,
    title: "Update Project Timeline",
    description: "Adjust the project schedule based on recent changes",
    dueDate: "Apr 18, 2025",
    priority: "medium",
    completed: false,
    progress: 60,
  },
]

const upcomingTasks: Task[] = [
  {
    id: 5,
    title: "Schedule Team Meeting",
    description: "Arrange a meeting to discuss project progress",
    dueDate: "Apr 20, 2025",
    priority: "low",
    completed: false,
  },
  {
    id: 6,
    title: "Research New Tools",
    description: "Evaluate new project management software options",
    dueDate: "Apr 25, 2025",
    priority: "low",
    completed: false,
  },
]

const todayTasks: Task[] = [
  {
    id: 1,
    title: "Complete Quarterly Report",
    description: "Finalize the Q1 financial report with all department inputs",
    dueDate: "Today, 5:00 PM",
    priority: "high",
    completed: false,
    progress: 75,
  },
  {
    id: 7,
    title: "Send Follow-up Emails",
    description: "Contact clients about pending decisions",
    dueDate: "Today, 3:00 PM",
    priority: "medium",
    completed: false,
  },
]

const completedTasks: Task[] = [
  {
    id: 8,
    title: "Submit Budget Request",
    description: "Send the department budget proposal to finance",
    dueDate: "Apr 10, 2025",
    priority: "high",
    completed: true,
  },
  {
    id: 9,
    title: "Update Team Documentation",
    description: "Revise the onboarding materials for new team members",
    dueDate: "Apr 8, 2025",
    priority: "medium",
    completed: true,
  },
]

interface TaskGroupProps {
  title: string
  tasks: Task[]
}

function TaskGroup({ title, tasks }: TaskGroupProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TaskItem({ task }: { task: Task }) {
  const priorityColors = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-green-500",
  }

  const priorityIcons = {
    high: AlertCircle,
    medium: Clock,
    low: Calendar,
  }

  const PriorityIcon = priorityIcons[task.priority]

  return (
    <div className="flex items-start gap-4 rounded-md border p-4 transition-colors hover:bg-accent/50">
      <Checkbox checked={task.completed} />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>{task.title}</h3>
          <div className={`flex items-center gap-1 text-sm ${priorityColors[task.priority]}`}>
            <PriorityIcon className="h-3 w-3" />
            <span>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
          </div>
        </div>
        {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{task.dueDate}</span>
          {task.progress !== undefined && (
            <div className="flex items-center gap-2">
              <Progress value={task.progress} className="h-1.5 w-24" />
              <span className="text-xs text-muted-foreground">{task.progress}%</span>
            </div>
          )}
        </div>
      </div>
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/tasks/${task.id}`}>Details</Link>
      </Button>
    </div>
  )
}
