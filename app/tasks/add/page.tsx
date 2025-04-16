"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CalendarIcon, Plus, X } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

export default function AddTaskPage() {
  const [date, setDate] = useState<Date>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [progress, setProgress] = useState(0)
  const [subtasks, setSubtasks] = useState([""])

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""])
  }

  const handleRemoveSubtask = (index: number) => {
    const newSubtasks = [...subtasks]
    newSubtasks.splice(index, 1)
    setSubtasks(newSubtasks)
  }

  const handleSubtaskChange = (index: number, value: string) => {
    const newSubtasks = [...subtasks]
    newSubtasks[index] = value
    setSubtasks(newSubtasks)
  }

  const handleSaveTask = () => {
    // Validate required fields
    if (!title) {
      alert("Please enter a task title")
      return
    }

    if (!date) {
      alert("Please select a due date")
      return
    }

    // In a real app, this would save the task
    alert("Task saved successfully!")
    // Then redirect to tasks
    window.location.href = "/tasks"
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/tasks">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Task</h1>
          <p className="text-muted-foreground">Create a new task</p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Task Title
              </label>
              <Input id="title" placeholder="Add title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Due Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Progress</label>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Slider value={[progress]} min={0} max={100} step={5} onValueChange={(value) => setProgress(value[0])} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subtasks</label>
              <div className="space-y-2">
                {subtasks.map((subtask, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Subtask description"
                      value={subtask}
                      onChange={(e) => handleSubtaskChange(index, e.target.value)}
                    />
                    {index === 0 ? (
                      <Button type="button" variant="outline" size="icon" onClick={handleAddSubtask}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveSubtask(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" asChild>
                <Link href="/tasks">Cancel</Link>
              </Button>
              <Button onClick={handleSaveTask}>Save Task</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
