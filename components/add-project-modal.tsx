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
import { Plus, Trash, Calendar, User, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"

// Define types for team members and props
interface TeamMember {
  id: number
  name: string
  role: string
  avatar?: string
}

interface ProjectData {
  title: string
  priority: string
  dueDate: string
  description: string
  team: { id: number; name: string; role: string; avatar?: string }[]
  targets: string[]
  tasks: {
    title: string
    description?: string
    status: string
    priority: string
    assignedTo?: number
    dueDate: string
  }[]
}

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onAddProject: (project: ProjectData) => void
  teamMembers: TeamMember[]
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Project title must be at least 2 characters.",
  }),
  priority: z.string({
    required_error: "Please select a priority.",
  }),
  dueDate: z.string({
    required_error: "Please select a due date.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  team: z.array(z.number()).min(1, {
    message: "Please select at least one team member.",
  }),
  targets: z
    .array(
      z.object({
        text: z.string().min(1, "Target text is required"),
      }),
    )
    .min(1, {
      message: "Please add at least one target.",
    }),
  tasks: z
    .array(
      z.object({
        title: z.string().min(1, "Task title is required"),
        description: z.string().optional(),
        status: z.string().default("To Do"),
        priority: z.string().default("Medium"),
        assignedTo: z.number().optional(),
        dueDate: z.string().min(1, "Due date is required"),
      }),
    )
    .min(1, {
      message: "Please add at least one task.",
    }),
})

type FormValues = z.infer<typeof formSchema>

export function AddProjectModal({ isOpen, onClose, onAddProject, teamMembers }: AddProjectModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      priority: "Medium",
      dueDate: "",
      description: "",
      team: [],
      targets: [{ text: "" }],
      tasks: [
        {
          title: "",
          description: "",
          status: "To Do",
          priority: "Medium",
          assignedTo: undefined,
          dueDate: "",
        },
      ],
    },
  })

  // Reset form when modal closes
  const handleClose = () => {
    form.reset()
    onClose()
  }

  function onSubmit(values: FormValues) {
    // Filter out empty targets and tasks
    const filteredTargets = values.targets.filter((target) => target.text.trim() !== "").map((target) => target.text)

    const filteredTasks = values.tasks.filter((task) => task.title.trim() !== "")

    // Get team members data
    const selectedTeam = values.team.map((memberId) => {
      const member = teamMembers.find((m) => m.id === memberId)
      return {
        id: member?.id || 0,
        name: member?.name || "",
        role: member?.role || "",
        avatar: member?.avatar,
      }
    })

    // Create a new project with the form values
    const newProject: ProjectData = {
      title: values.title,
      priority: values.priority,
      dueDate: values.dueDate,
      description: values.description,
      team: selectedTeam,
      targets: filteredTargets,
      tasks: filteredTasks,
    }

    // Add the new project
    onAddProject(newProject)

    // Close the dialog and reset state
    handleClose()
  }

  // Add a new target field
  const addTarget = () => {
    const currentTargets = form.getValues("targets") || []
    form.setValue("targets", [...currentTargets, { text: "" }])
  }

  // Remove a target field
  const removeTarget = (index: number) => {
    const currentTargets = form.getValues("targets") || []
    form.setValue(
      "targets",
      currentTargets.filter((_, i) => i !== index),
    )
  }

  // Add a new task field
  const addTask = () => {
    const currentTasks = form.getValues("tasks") || []
    form.setValue("tasks", [
      ...currentTasks,
      {
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        assignedTo: undefined,
        dueDate: "",
      },
    ])
  }

  // Remove a task field
  const removeTask = (index: number) => {
    const currentTasks = form.getValues("tasks") || []
    form.setValue(
      "tasks",
      currentTasks.filter((_, i) => i !== index),
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Fill in the details below to create a new project.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="targets">Targets</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
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

                  <FormField
                    control={form.control}
                    name="dueDate"
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

              <TabsContent value="team" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" /> Team Members
                      </FormLabel>
                      <FormMessage />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        {teamMembers.map((member) => (
                          <label
                            key={member.id}
                            className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                              field.value.includes(member.id) ? "bg-primary/10 border-primary" : "hover:bg-muted"
                            }`}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <FormControl>
                                <Checkbox
                                  checked={field.value.includes(member.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...field.value, member.id]);
                                    } else {
                                      field.onChange(field.value.filter((id) => id !== member.id));
                                    }
                                  }}
                                />
                              </FormControl>
                              <Avatar className="h-9 w-9 ml-2 mr-3">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-xs text-muted-foreground">{member.role}</div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {field.value.length === 0 && (
                        <p className="text-sm text-destructive mt-2">Please select at least one team member</p>
                      )}
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="targets" className="space-y-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Project Targets</h3>
                  <Button type="button" variant="outline" size="sm" onClick={addTarget}>
                    <Plus className="h-4 w-4 mr-1" /> Add Target
                  </Button>
                </div>

                {form.watch("targets")?.map((target, index) => (
                  <Card key={`target-${target.text}-${index}`} className="border">
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm">Target {index + 1}</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTarget(index)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          disabled={form.watch("targets").length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4">
                      <FormField
                        control={form.control}
                        name={`targets.${index}.text`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Description</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g., Increase user engagement by 30%" {...field} />
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

                {form.watch("tasks")?.map((task, index) => (
                  <Card key={`task-${task.title}-${index}`} className="border">
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
                          name={`tasks.${index}.status`}
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
                                  <SelectItem value="To Do">To Do</SelectItem>
                                  <SelectItem value="In Progress">In Progress</SelectItem>
                                  <SelectItem value="Done">Done</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`tasks.${index}.assignedTo`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center">
                                <User className="h-3.5 w-3.5 mr-1" /> Assigned To
                              </FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  if (value === "no-selection") {
                                    field.onChange(undefined)
                                  } else {
                                    field.onChange(Number.parseInt(value))
                                  }
                                }}
                                value={field.value?.toString() || "no-selection"}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select team member" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {form.watch("team").length > 0 ? (
                                    form.watch("team").map((memberId) => {
                                      const member = teamMembers.find((m) => m.id === memberId)
                                      if (!member) return null;
                                      return (
                                        <SelectItem key={member.id} value={member.id.toString()}>
                                          {member.name}
                                        </SelectItem>
                                      )
                                    })
                                  ) : (
                                    <SelectItem value="no-selection" disabled>
                                      Please select team members first
                                    </SelectItem>
                                  )}
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
                              <FormLabel className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" /> Due Date
                              </FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} className="mr-2">
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
