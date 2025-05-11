"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Project title must be at least 2 characters.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  priority: z.string({
    required_error: "Please select a priority.",
  }),
  startDate: z.string({
    required_error: "Please select a start date.",
  }),
  endDate: z.string({
    required_error: "Please select an end date.",
  }),
  description: z.string().optional(),
  estimatedHours: z.string().transform((val) => Number.parseInt(val, 10)),
  goals: z
    .array(
      z.object({
        title: z.string().min(1, "Goal title is required"),
        description: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
  tasks: z
    .array(
      z.object({
        title: z.string().min(1, "Task title is required"),
        description: z.string().optional(),
        priority: z.string().default("Medium"),
        dueDate: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
  milestones: z
    .array(
      z.object({
        title: z.string().min(1, "Milestone title is required"),
        date: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
})

export function AddProjectModal({ isOpen, onClose, onAddProject }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "Planning",
      priority: "Medium",
      startDate: "",
      endDate: "",
      description: "",
      estimatedHours: "40",
      goals: [{ title: "", description: "" }],
      tasks: [{ title: "", description: "", priority: "Medium", dueDate: "" }],
      milestones: [{ title: "", date: "" }],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Filter out empty goals, tasks, and milestones
    const filteredGoals = values.goals.filter((goal) => goal.title.trim() !== "")
    const filteredTasks = values.tasks.filter((task) => task.title.trim() !== "")
    const filteredMilestones = values.milestones.filter((milestone) => milestone.title.trim() !== "")

    // Create a new project with the form values
    const newProject = {
      title: values.title,
      status: values.status,
      priority: values.priority,
      progress: 0,
      tasksCompleted: 0,
      totalTasks: filteredTasks.length,
      startDate: values.startDate,
      endDate: values.endDate,
      estimatedHours: values.estimatedHours,
      description: values.description,
      goals: filteredGoals.map((goal) => ({ ...goal, completed: false })),
      tasks: filteredTasks.map((task, index) => ({
        id: index + 1,
        ...task,
        completed: false,
        status: "To Do",
        dependencies: [],
      })),
      milestones: filteredMilestones.map((milestone, index) => ({
        id: index + 1,
        ...milestone,
        completed: false,
      })),
      resourceAllocation: getResourceAllocation(values.priority),
      image: "/placeholder.svg?height=300&width=400",
      team: [],
    }

    // Add the new project
    onAddProject(newProject)

    // Close the dialog
    onClose()

    // Reset the form
    form.reset()
  }

  const getResourceAllocation = (priority: string) => {
    switch (priority) {
      case "High":
        return 0.8
      case "Medium":
        return 0.5
      case "Low":
        return 0.3
      default:
        return 0.5
    }
  }

  // Add a new goal field
  const addGoal = () => {
    const currentGoals = form.getValues("goals") || []
    form.setValue("goals", [...currentGoals, { title: "", description: "" }])
  }

  // Remove a goal field
  const removeGoal = (index: number) => {
    const currentGoals = form.getValues("goals") || []
    form.setValue(
      "goals",
      currentGoals.filter((_, i) => i !== index),
    )
  }

  // Add a new task field
  const addTask = () => {
    const currentTasks = form.getValues("tasks") || []
    form.setValue("tasks", [...currentTasks, { title: "", description: "", priority: "Medium", dueDate: "" }])
  }

  // Remove a task field
  const removeTask = (index: number) => {
    const currentTasks = form.getValues("tasks") || []
    form.setValue(
      "tasks",
      currentTasks.filter((_, i) => i !== index),
    )
  }

  // Add a new milestone field
  const addMilestone = () => {
    const currentMilestones = form.getValues("milestones") || []
    form.setValue("milestones", [...currentMilestones, { title: "", date: "" }])
  }

  // Remove a milestone field
  const removeMilestone = (index: number) => {
    const currentMilestones = form.getValues("milestones") || []
    form.setValue(
      "milestones",
      currentMilestones.filter((_, i) => i !== index),
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new project. You can add team members later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Planning">Planning</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="On hold">On hold</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="estimatedHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Hours</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="goals" className="space-y-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Project Goals</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addGoal}>
                    <Plus className="h-4 w-4 mr-1" /> Add Goal
                  </Button>
                </div>

                {form.watch("goals")?.map((_, index) => (
                  <Card key={index} className="border">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">Goal {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeGoal(index)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          disabled={form.watch("goals").length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4 space-y-3">
                      <FormField
                        control={form.control}
                        name={`goals.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goal Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter goal title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`goals.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter goal description" className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Project Tasks</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addTask}>
                    <Plus className="h-4 w-4 mr-1" /> Add Task
                  </Button>
                </div>

                {form.watch("tasks")?.map((_, index) => (
                  <Card key={index} className="border">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">Task {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTask(index)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          disabled={form.watch("tasks").length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4 space-y-3">
                      <FormField
                        control={form.control}
                        name={`tasks.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Task Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter task title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`tasks.${index}.priority`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Priority</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="High">High</SelectItem>
                                  <SelectItem value="Medium">Medium</SelectItem>
                                  <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`tasks.${index}.dueDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`tasks.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter task description" className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="milestones" className="space-y-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Project Milestones</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                    <Plus className="h-4 w-4 mr-1" /> Add Milestone
                  </Button>
                </div>

                {form.watch("milestones")?.map((_, index) => (
                  <Card key={index} className="border">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">Milestone {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMilestone(index)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          disabled={form.watch("milestones").length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4 space-y-3">
                      <FormField
                        control={form.control}
                        name={`milestones.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Milestone Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter milestone title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`milestones.${index}.date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} className="mr-2">
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
