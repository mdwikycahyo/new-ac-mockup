"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Clock, AlertCircle, Edit, Trash, CheckSquare } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

// Mock task data - in a real app, this would come from an API
const taskData = {
  "1": {
    id: 1,
    title: "Complete Quarterly Report",
    description:
      "Finalize the Q1 financial report with all department inputs. Include executive summary, financial statements, and departmental highlights.",
    dueDate: "Today, 5:00 PM",
    priority: "high",
    completed: false,
    progress: 75,
    subtasks: [
      { id: 1, title: "Gather department data", completed: true },
      { id: 2, title: "Create executive summary", completed: true },
      { id: 3, title: "Format financial tables", completed: false },
      { id: 4, title: "Review with finance team", completed: false },
    ],
    assignedTo: "You",
    createdAt: "April 10, 2025",
  },
  "2": {
    id: 2,
    title: "Prepare Client Presentation",
    description:
      "Create slides for the upcoming client meeting. Focus on project milestones, achievements, and next steps.",
    dueDate: "Tomorrow, 10:00 AM",
    priority: "high",
    completed: false,
    progress: 30,
    subtasks: [
      { id: 1, title: "Outline presentation structure", completed: true },
      { id: 2, title: "Create initial slides", completed: false },
      { id: 3, title: "Add project metrics", completed: false },
      { id: 4, title: "Prepare speaking notes", completed: false },
    ],
    assignedTo: "You",
    createdAt: "April 12, 2025",
  },
  "3": {
    id: 3,
    title: "Review Marketing Materials",
    description: "Check the new brochures and website content for accuracy and brand consistency.",
    dueDate: "Apr 17, 2025",
    priority: "medium",
    completed: false,
    progress: 50,
    subtasks: [
      { id: 1, title: "Review brochure copy", completed: true },
      { id: 2, title: "Check website updates", completed: true },
      { id: 3, title: "Verify brand guidelines compliance", completed: false },
      { id: 4, title: "Provide feedback to marketing team", completed: false },
    ],
    assignedTo: "Marketing Team",
    createdAt: "April 8, 2025",
  },
}

export default function TaskDetailPage() {
  const params = useParams()
  const taskId = params.id as string
  const task = taskData[taskId] || taskData["1"] // Fallback to first task if not found

  const [isCompleted, setIsCompleted] = useState(task.completed)
  const [subtasks, setSubtasks] = useState(task.subtasks)

  const handleToggleSubtask = (subtaskId: number) => {
    setSubtasks(
      subtasks.map((subtask) => (subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask)),
    )
  }

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return AlertCircle
      case "medium":
        return Clock
      case "low":
        return Calendar
      default:
        return Clock
    }
  }

  const PriorityIcon = getPriorityIcon(task.priority)
  const completedSubtasks = subtasks.filter((subtask) => subtask.completed).length
  const subtaskProgress = (completedSubtasks / subtasks.length) * 100

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/tasks">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Details</h1>
          <p className="text-muted-foreground">View and manage task</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between border-b pb-4">
          <div className="flex items-start gap-3">
            <Checkbox checked={isCompleted} onCheckedChange={handleToggleComplete} className="mt-1" />
            <div>
              <CardTitle className={`text-2xl ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  <PriorityIcon className="mr-1 h-3 w-3" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </Badge>
                <Badge variant="outline">Due: {task.dueDate}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/tasks/edit/${task.id}`}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-red-500">
              <Trash className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Progress</h3>
                <span className="text-sm text-muted-foreground">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">
                Subtasks ({completedSubtasks}/{subtasks.length})
              </h3>
              <Progress value={subtaskProgress} className="h-2" />
              <div className="space-y-2">
                {subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-start gap-2 rounded-md border p-3">
                    <Checkbox
                      checked={subtask.completed}
                      onCheckedChange={() => handleToggleSubtask(subtask.id)}
                      className="mt-0.5"
                    />
                    <span className={subtask.completed ? "line-through text-muted-foreground" : ""}>
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-md border p-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Assigned to</p>
                <p className="font-medium">{task.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created on</p>
                <p className="font-medium">{task.createdAt}</p>
              </div>
            </div>

            <div className="flex justify-center border-t pt-6">
              <Button size="lg" className="w-full" onClick={handleToggleComplete}>
                <CheckSquare className="mr-2 h-4 w-4" />
                {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
