"use client"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash, Calendar, User, Users, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Define types for team members
interface TeamMember {
  id: number
  name: string
  role: string
  avatar?: string
  skills?: string[]
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

// This would typically come from an API or database
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Management", "Planning", "Communication"],
  },
  {
    id: 2,
    name: "Sam Wilson",
    role: "Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["UI/UX", "Graphic Design", "Prototyping"],
  },
  {
    id: 3,
    name: "Jamie Lee",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Frontend", "React", "JavaScript"],
  },
  {
    id: 4,
    name: "Taylor Smith",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["User Research", "Wireframing", "Usability Testing"],
  },
  {
    id: 5,
    name: "Morgan Chen",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Node.js", "Databases", "API Design"],
  },
  {
    id: 6,
    name: "Riley Park",
    role: "Marketing Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Strategy", "Analytics", "Campaign Management"],
  },
  {
    id: 7,
    name: "Jordan Quinn",
    role: "Content Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Copywriting", "Social Media", "Content Strategy"],
  },
  {
    id: 8,
    name: "Casey Rivera",
    role: "QA Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Testing", "Automation", "Bug Tracking"],
  },
  {
    id: 9,
    name: "Robin Patel",
    role: "UI Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["UI Design", "Illustration", "Animation"],
  },
  {
    id: 10,
    name: "Avery Kim",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    id: 11,
    name: "Drew Garcia",
    role: "DevOps Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["CI/CD", "Docker", "Kubernetes"],
  },
  {
    id: 12,
    name: "Cameron Lee",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Product Strategy", "User Stories", "Roadmapping"],
  },
]

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [searchQuery, setSearchQuery] = useState("")
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [formValues, setFormValues] = useState<FormValues | null>(null)

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

  // Fetch project data from localStorage
  useEffect(() => {
    const fetchProject = () => {
      try {
        const storedProjects = localStorage.getItem("projects")
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects)
          const foundProject = parsedProjects.find((p) => p.id.toString() === projectId)
          if (foundProject) {
            setProject(foundProject)

            // Transform project data to match form schema
            const formData: FormValues = {
              title: foundProject.title,
              priority: foundProject.priority,
              dueDate: foundProject.dueDate,
              description: foundProject.description,
              team: foundProject.team.map((member) => member.id),
              targets: foundProject.targets.map((target) => {
                // Handle both string targets and object targets with description property
                return {
                  text: typeof target === "string" ? target : target.description,
                }
              }),
              tasks: foundProject.tasks.map((task) => ({
                title: task.title || task.name,
                description: task.description || "",
                status: task.status,
                priority: task.priority,
                assignedTo: task.assignedTo,
                dueDate: task.dueDate,
              })),
            }

            // Set form values
            form.reset(formData)
          }
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching project:", error)
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId, form])

  // Filter team members based on search query
  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    setFormValues(values)
    setShowConfirmDialog(true)
  }

  // Save changes after confirmation
  const saveChanges = () => {
    if (!formValues || !project) return

    // Filter out empty targets and tasks
    const filteredTargets = formValues.targets
      .filter((target) => target.text.trim() !== "")
      .map((target) => ({ description: target.text }))

    const filteredTasks = formValues.tasks.filter((task) => task.title.trim() !== "")

    // Get team members data
    const selectedTeam = formValues.team.map((memberId) => {
      const member = teamMembers.find((m) => m.id === memberId)
      return {
        id: member?.id || 0,
        name: member?.name || "",
        role: member?.role || "",
        avatar: member?.avatar,
      }
    })

    // Check if any team members were removed and update task assignments
    const previousTeamIds = project.team.map((member) => member.id)
    const newTeamIds = selectedTeam.map((member) => member.id)
    const removedTeamIds = previousTeamIds.filter((id) => !newTeamIds.includes(id))

    // Update tasks to remove assignments to removed team members
    const updatedTasks = filteredTasks.map((task) => {
      if (task.assignedTo && removedTeamIds.includes(task.assignedTo)) {
        return { ...task, assignedTo: undefined }
      }
      return task
    })

    // Check if project due date changed and update task due dates if needed
    const projectDueDate = new Date(formValues.dueDate)
    updatedTasks.forEach((task) => {
      const taskDueDate = new Date(task.dueDate)
      if (taskDueDate > projectDueDate) {
        task.dueDate = formValues.dueDate
      }
    })

    // Create updated project with the form values
    const updatedProject = {
      ...project,
      title: formValues.title,
      priority: formValues.priority,
      dueDate: formValues.dueDate,
      description: formValues.description,
      team: selectedTeam,
      targets: filteredTargets,
      tasks: updatedTasks,
      endDate: formValues.dueDate,
    }

    // Update project in localStorage
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects)
      const updatedProjects = parsedProjects.map((p) => (p.id.toString() === projectId ? updatedProject : p))
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    }

    // Close dialog and redirect
    setShowConfirmDialog(false)
    router.push("/projects")
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
        dueDate: form.getValues("dueDate"), // Default to project due date
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

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Loading project...</h1>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Project not found</h1>
        </div>
        <p>The project you're trying to edit could not be found.</p>
        <Button onClick={() => router.push("/projects")} className="mt-4">
          Back to Projects
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                        <Input
                          type="date"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)

                            // Update task due dates if they fall after the new project due date
                            const newDueDate = new Date(e.target.value)
                            const tasks = form.getValues("tasks")

                            const updatedTasks = tasks.map((task) => {
                              const taskDueDate = new Date(task.dueDate)
                              if (taskDueDate > newDueDate) {
                                return { ...task, dueDate: e.target.value }
                              }
                              return task
                            })

                            form.setValue("tasks", updatedTasks)
                          }}
                        />
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
            </CardContent>
          </Card>

          {/* Project Targets Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Project Targets</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addTarget}>
                <Plus className="h-4 w-4 mr-1" /> Add Target
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.watch("targets")?.map((target, index) => (
                <div key={`target-${index}`} className="flex items-start gap-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name={`targets.${index}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>Target Description</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Increase user engagement by 30%" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTarget(index)}
                    className={index === 0 ? "mt-8" : "mt-2"}
                    disabled={form.watch("targets").length <= 1}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Team Members Section */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5 mb-2">
                      <Users className="h-4 w-4" /> Select Team Members
                    </FormLabel>
                    <FormMessage />

                    {/* Search input for team members */}
                    <div className="relative mb-4">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search team members..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Team members grid with fixed height and scroll */}
                    <div className="h-[calc(3*(3rem+0.75rem))] overflow-y-auto pr-1">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {filteredTeamMembers.map((member) => (
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
                                      field.onChange([...field.value, member.id])
                                    } else {
                                      field.onChange(field.value.filter((id) => id !== member.id))
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
                    </div>

                    {filteredTeamMembers.length === 0 && (
                      <p className="text-sm text-muted-foreground mt-2">No team members found matching your search.</p>
                    )}

                    {field.value.length === 0 && (
                      <p className="text-sm text-destructive mt-2">Please select at least one team member</p>
                    )}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Project Tasks Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Project Tasks</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addTask}>
                <Plus className="h-4 w-4 mr-1" /> Add Task
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {form.watch("tasks")?.map((task, index) => (
                <div key={`task-${index}`} className="border rounded-lg p-4 relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTask(index)}
                    className="absolute right-2 top-2"
                    disabled={form.watch("tasks").length <= 1}
                  >
                    <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>

                  <h3 className="font-medium mb-3">Task {index + 1}</h3>
                  <div className="space-y-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`tasks.${index}.status`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
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
                            <Select onValueChange={field.onChange} value={field.value}>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    if (!member) return null
                                    return (
                                      <SelectItem key={member.id} value={member.id.toString()}>
                                        {`${member.name} - ${member.role}`}
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
                              <Input type="date" {...field} max={form.watch("dueDate")} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push(`/projects/${projectId}`)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Changes</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to save these changes to the project?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={saveChanges}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
