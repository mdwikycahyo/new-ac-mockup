"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MessageSquare,
  Mail,
  Calendar,
  FileText,
  Video,
  Plus,
  Clock,
  ArrowLeft,
  ArrowRight,
  Link2,
  Trash2,
  User,
  Users,
  X,
  DotIcon as DragHandleDots2,
  UserPlus,
  ArrowDown,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useScenario } from "@/components/context/scenario-context"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Activity types with icons
const activityTypes = [
  { id: "chat", name: "Chat Interaction", icon: MessageSquare, color: "text-indigo-500" },
  { id: "email", name: "Email", icon: Mail, color: "text-blue-500" },
  { id: "calendar", name: "Calendar", icon: Calendar, color: "text-green-500" },
  { id: "document", name: "Document", icon: FileText, color: "text-orange-500" },
  { id: "conference", name: "Virtual Conference", icon: Video, color: "text-red-500" },
]

// Competencies data
const competencies = [
  { id: "problem-solving", name: "Problem Solving" },
  { id: "continuous-improvement", name: "Continuous Improvement" },
  { id: "customer-orientation", name: "Customer Orientation" },
  { id: "business-acumen", name: "Business Acumen" },
  { id: "disciplined-execution", name: "Disciplined Execution" },
  { id: "coaching-performance", name: "Coaching for Performance" },
  { id: "establish-collaboration", name: "Establish Collaboration" },
  { id: "technology-savvy", name: "Technology Savvy" },
]

// Default AI Personas
const defaultPersonas = [
  {
    id: "p1",
    name: "Alex Johnson",
    role: "Marketing Director",
    image: "/placeholder.svg?height=100&width=100",
    traits: ["Analytical", "Direct", "Deadline-focused"],
    initialMessage: "",
  },
  {
    id: "p2",
    name: "Sam Rivera",
    role: "Customer Support Lead",
    image: "/placeholder.svg?height=100&width=100",
    traits: ["Empathetic", "Patient", "Detail-oriented"],
    initialMessage: "",
  },
  {
    id: "p3",
    name: "Taylor Wong",
    role: "Project Manager",
    image: "/placeholder.svg?height=100&width=100",
    traits: ["Organized", "Collaborative", "Strategic"],
    initialMessage: "",
  },
]

export default function SimulationBuilder() {
  const [activities, setActivities] = useState<any[]>([])
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [showPersonaDialog, setShowPersonaDialog] = useState(false)
  const [showAddPersonaDialog, setShowAddPersonaDialog] = useState(false)
  const [showDependencyDialog, setShowDependencyDialog] = useState(false)
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([])
  const [initialMessagePersona, setInitialMessagePersona] = useState<string>("")
  const [personas, setPersonas] = useState<any[]>(defaultPersonas)
  const [personaInitialMessages, setPersonaInitialMessages] = useState<Record<string, string>>({})
  const [conversationType, setConversationType] = useState<string>("personal")
  const [newPersona, setNewPersona] = useState({
    name: "",
    role: "",
    traits: ["", "", ""],
    instructions: "",
    initialMessage: "",
  })
  const [dependencies, setDependencies] = useState<any[]>([])
  const [selectedDependency, setSelectedDependency] = useState<{
    sourceId: string
    targetId: string
    type: string
    condition: string
  }>({
    sourceId: "",
    targetId: "",
    type: "completion",
    condition: "",
  })

  const dragItem = useRef<any>(null)
  const dragOverItem = useRef<any>(null)

  const { selectedCompetencies } = useScenario()

  // Filter competencies based on what was selected in step 1
  const filteredCompetencies = competencies.filter((comp) => selectedCompetencies[comp.id])

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, type: any) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(type))
    e.dataTransfer.effectAllowed = "copy"
  }

  // Handle activity drag start
  const handleActivityDragStart = (e: React.DragEvent, index: number) => {
    dragItem.current = index
    e.dataTransfer.setData("text/plain", "activity-reorder")
    e.dataTransfer.effectAllowed = "move"
  }

  // Handle drop on canvas
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    try {
      const data = e.dataTransfer.getData("text/plain")
      if (!data) {
        console.error("No data received in drop event")
        return
      }

      // Check if this is an activity reordering
      if (data === "activity-reorder") {
        handleSort()
        return
      }

      const activityType = JSON.parse(data)

      // Create a new activity with a unique ID
      const newActivity = {
        id: `activity-${Date.now()}`,
        type: activityType.id,
        name: `New ${activityType.name}`,
        icon: activityType.id,
        estimatedTime: 15,
        competencies: [],
        personas: [],
        content: {},
        conversationType: activityType.id === "chat" || activityType.id === "conference" ? "personal" : "",
        initialMessagePersona: "",
        personaInitialMessages: {},
      }

      setActivities([...activities, newActivity])
      setSelectedActivity(newActivity)
    } catch (error) {
      console.error("Error processing drop:", error)
    }
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.getData("text/plain") === "activity-reorder") {
      e.dataTransfer.dropEffect = "move"
    } else {
      e.dataTransfer.dropEffect = "copy"
    }
  }

  // Handle activity selection
  const handleActivitySelect = (activity: any) => {
    setSelectedActivity(activity)
    if (activity.personas && activity.personas.length > 0) {
      setSelectedPersonas(activity.personas)
      setInitialMessagePersona(activity.initialMessagePersona || activity.personas[0])
      setConversationType(activity.conversationType || "personal")
      setPersonaInitialMessages(activity.personaInitialMessages || {})
    } else {
      setSelectedPersonas([])
      setInitialMessagePersona("")
      setConversationType("personal")
      setPersonaInitialMessages({})
    }
  }

  // Handle activity deletion
  const handleDeleteActivity = (id: string) => {
    // Remove any dependencies involving this activity
    setDependencies(dependencies.filter((dep) => dep.sourceId !== id && dep.targetId !== id))

    // Remove the activity
    setActivities(activities.filter((activity) => activity.id !== id))
    if (selectedActivity && selectedActivity.id === id) {
      setSelectedActivity(null)
    }
  }

  // Handle activity reordering
  const handleSort = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const itemsCopy = [...activities]
      const draggedItemContent = itemsCopy[dragItem.current]
      itemsCopy.splice(dragItem.current, 1)
      itemsCopy.splice(dragOverItem.current, 0, draggedItemContent)
      dragItem.current = null
      dragOverItem.current = null
      setActivities(itemsCopy)
    }
  }

  // Handle competency selection
  const handleCompetencyChange = (id: string) => {
    if (!selectedActivity) return

    const updatedActivity = { ...selectedActivity }
    const index = updatedActivity.competencies.indexOf(id)

    if (index === -1) {
      updatedActivity.competencies.push(id)
    } else {
      updatedActivity.competencies.splice(index, 1)
    }

    setSelectedActivity(updatedActivity)
    setActivities(activities.map((activity) => (activity.id === selectedActivity.id ? updatedActivity : activity)))
  }

  // Handle persona selection
  const handlePersonaSelect = (id: string) => {
    if (selectedPersonas.includes(id)) {
      setSelectedPersonas(selectedPersonas.filter((p) => p !== id))
      if (initialMessagePersona === id) {
        setInitialMessagePersona(selectedPersonas.filter((p) => p !== id)[0] || "")
      }
    } else {
      const newSelectedPersonas = [...selectedPersonas, id]
      setSelectedPersonas(newSelectedPersonas)
      if (!initialMessagePersona && conversationType === "group") {
        setInitialMessagePersona(id)
      }
    }
  }

  // Update persona initial message
  const handlePersonaInitialMessageChange = (personaId: string, message: string) => {
    setPersonaInitialMessages({
      ...personaInitialMessages,
      [personaId]: message,
    })
  }

  // Apply selected personas to activity
  const applyPersonas = () => {
    if (!selectedActivity) return

    const updatedActivity = {
      ...selectedActivity,
      personas: selectedPersonas,
      conversationType: conversationType,
      initialMessagePersona:
        conversationType === "group"
          ? initialMessagePersona || (selectedPersonas.length > 0 ? selectedPersonas[0] : "")
          : "",
      personaInitialMessages: personaInitialMessages,
    }
    setSelectedActivity(updatedActivity)
    setActivities(activities.map((activity) => (activity.id === selectedActivity.id ? updatedActivity : activity)))
    setShowPersonaDialog(false)
  }

  // Add new persona
  const handleAddPersona = () => {
    if (!newPersona.name || !newPersona.role) return

    const filteredTraits = newPersona.traits.filter((trait) => trait.trim() !== "")

    const persona = {
      id: `custom-${Date.now()}`,
      name: newPersona.name,
      role: newPersona.role,
      image: "/placeholder.svg?height=100&width=100",
      traits: filteredTraits.length > 0 ? filteredTraits : ["Professional"],
      instructions: newPersona.instructions,
      initialMessage: newPersona.initialMessage,
    }

    setPersonas([...personas, persona])
    setNewPersona({
      name: "",
      role: "",
      traits: ["", "", ""],
      instructions: "",
      initialMessage: "",
    })
    setShowAddPersonaDialog(false)
  }

  // Delete persona
  const handleDeletePersona = (id: string) => {
    // Remove persona from any activities that use it
    const updatedActivities = activities.map((activity) => {
      if (activity.personas && activity.personas.includes(id)) {
        return {
          ...activity,
          personas: activity.personas.filter((personaId: string) => personaId !== id),
          initialMessagePersona:
            activity.initialMessagePersona === id
              ? activity.personas.filter((personaId: string) => personaId !== id)[0] || ""
              : activity.initialMessagePersona,
        }
      }
      return activity
    })

    setActivities(updatedActivities)

    // If the persona is selected in the current dialog, deselect it
    if (selectedPersonas.includes(id)) {
      setSelectedPersonas(selectedPersonas.filter((p) => p !== id))
      if (initialMessagePersona === id) {
        setInitialMessagePersona(selectedPersonas.filter((p) => p !== id)[0] || "")
      }
    }

    // Remove the persona from the list
    setPersonas(personas.filter((p) => p.id !== id))
  }

  // Add dependency between activities
  const handleAddDependency = () => {
    if (!selectedDependency.sourceId || !selectedDependency.targetId) return

    // Check if this dependency already exists
    const existingDep = dependencies.find(
      (dep) => dep.sourceId === selectedDependency.sourceId && dep.targetId === selectedDependency.targetId,
    )

    if (existingDep) {
      // Update existing dependency
      setDependencies(
        dependencies.map((dep) =>
          dep.sourceId === selectedDependency.sourceId && dep.targetId === selectedDependency.targetId
            ? selectedDependency
            : dep,
        ),
      )
    } else {
      // Add new dependency
      setDependencies([...dependencies, selectedDependency])
    }

    setShowDependencyDialog(false)
    setSelectedDependency({
      sourceId: "",
      targetId: "",
      type: "completion",
      condition: "",
    })
  }

  // Remove dependency
  const handleRemoveDependency = (sourceId: string, targetId: string) => {
    setDependencies(dependencies.filter((dep) => !(dep.sourceId === sourceId && dep.targetId === targetId)))
  }

  // Get icon component for activity
  const getActivityIcon = (type: string) => {
    const activity = activityTypes.find((a) => a.id === type)
    if (!activity) return MessageSquare
    return activity.icon
  }

  // Get color for activity
  const getActivityColor = (type: string) => {
    const activity = activityTypes.find((a) => a.id === type)
    if (!activity) return "text-gray-500"
    return activity.color
  }

  // Get activity name by ID
  const getActivityNameById = (id: string) => {
    const activity = activities.find((a) => a.id === id)
    return activity ? activity.name : "Unknown Activity"
  }

  // Get persona name by ID
  const getPersonaNameById = (id: string) => {
    const persona = personas.find((p) => p.id === id)
    return persona ? persona.name : "Unknown Persona"
  }

  // Update trait at specific index
  const updateTrait = (index: number, value: string) => {
    const updatedTraits = [...newPersona.traits]
    updatedTraits[index] = value
    setNewPersona({ ...newPersona, traits: updatedTraits })
  }

  // Reset selected dependency when dialog opens
  useEffect(() => {
    if (showDependencyDialog) {
      setSelectedDependency({
        sourceId: activities.length > 0 ? activities[0].id : "",
        targetId: activities.length > 1 ? activities[1].id : "",
        type: "completion",
        condition: "",
      })
    }
  }, [showDependencyDialog, activities])

  // Initialize persona dialog state when opened
  useEffect(() => {
    if (showPersonaDialog && selectedActivity) {
      setConversationType(selectedActivity.conversationType || "personal")
      setSelectedPersonas(selectedActivity.personas || [])
      setInitialMessagePersona(selectedActivity.initialMessagePersona || "")
      setPersonaInitialMessages(selectedActivity.personaInitialMessages || {})
    }
  }, [showPersonaDialog, selectedActivity])

  return (
    <div className="container mx-auto space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Simulation Activity Builder</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Step 2 of 4</span>
          <div className="flex h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div className="w-2/4 bg-primary"></div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[250px_1fr_350px]">
        {/* Left Panel - Activity Types */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Types</CardTitle>
            <CardDescription>Drag activities to the canvas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activityTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex cursor-grab items-center gap-3 rounded-md border p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                  draggable
                  onDragStart={(e) => handleDragStart(e, type)}
                >
                  <type.icon className={`h-5 w-5 ${type.color}`} />
                  <span>{type.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Center - Canvas Area */}
        <Card className="min-h-[600px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Assessment Flow</CardTitle>
              <CardDescription>Arrange and connect activities to create your assessment flow</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDependencyDialog(true)}
              disabled={activities.length < 2}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Add Dependency
            </Button>
          </CardHeader>
          <CardContent>
            <div
              className="flex min-h-[500px] flex-col items-center rounded-md border-2 border-dashed p-6"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {activities.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="text-muted-foreground">
                    <p>Drag activities from the left panel to add them to your assessment</p>
                    <p className="text-sm">Connect activities to create a flow</p>
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  {activities.map((activity, index) => {
                    const Icon = getActivityIcon(activity.type)
                    const colorClass = getActivityColor(activity.type)

                    // Find dependencies where this activity is the target
                    const incomingDependencies = dependencies.filter((dep) => dep.targetId === activity.id)

                    return (
                      <div key={activity.id}>
                        {/* Show incoming dependencies */}
                        {incomingDependencies.length > 0 && (
                          <div className="mb-2 rounded-md border border-dashed border-muted-foreground bg-muted/20 p-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <ArrowDown className="h-3 w-3" />
                              <span>Depends on: </span>
                              {incomingDependencies.map((dep, i) => (
                                <span key={i} className="flex items-center">
                                  {i > 0 && ", "}
                                  <Badge variant="outline" className="ml-1 text-xs font-normal">
                                    {getActivityNameById(dep.sourceId)}
                                    {dep.type === "score" && ` (Score ${dep.condition})`}
                                  </Badge>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0 ml-1"
                                    onClick={() => handleRemoveDependency(dep.sourceId, dep.targetId)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div
                          className={`flex items-center justify-between rounded-md border bg-background p-4 shadow-sm transition-colors ${
                            selectedActivity?.id === activity.id ? "border-primary ring-1 ring-primary" : ""
                          }`}
                          onClick={() => handleActivitySelect(activity)}
                          draggable
                          onDragStart={(e) => handleActivityDragStart(e, index)}
                          onDragEnter={() => (dragOverItem.current = index)}
                          onDragEnd={handleSort}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <div className="flex items-center gap-3">
                            <DragHandleDots2 className="h-5 w-5 cursor-grab text-muted-foreground" />
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full bg-opacity-20 ${colorClass.replace("text-", "bg-")}`}
                            >
                              <Icon className={`h-5 w-5 ${colorClass}`} />
                            </div>
                            <div>
                              <div className="font-medium">{activity.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {activity.estimatedTime} min
                                {activity.personas.length > 0 && ` • ${activity.personas.length} AI personas`}
                                {activity.initialMessagePersona &&
                                  ` • Started by ${getPersonaNameById(activity.initialMessagePersona)}`}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {activity.competencies.length > 0 && (
                              <Badge variant="outline" className="mr-2">
                                {activity.competencies.length} competencies
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteActivity(activity.id)
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Configure the selected activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedActivity ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Activity Name</label>
                  <Input
                    placeholder="Enter activity name"
                    value={selectedActivity.name}
                    onChange={(e) => {
                      const updatedActivity = { ...selectedActivity, name: e.target.value }
                      setSelectedActivity(updatedActivity)
                      setActivities(
                        activities.map((activity) =>
                          activity.id === selectedActivity.id ? updatedActivity : activity,
                        ),
                      )
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4" />
                    Estimated Time (minutes)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={selectedActivity.estimatedTime}
                    onChange={(e) => {
                      const updatedActivity = {
                        ...selectedActivity,
                        estimatedTime: Number.parseInt(e.target.value) || 1,
                      }
                      setSelectedActivity(updatedActivity)
                      setActivities(
                        activities.map((activity) =>
                          activity.id === selectedActivity.id ? updatedActivity : activity,
                        ),
                      )
                    }}
                  />
                </div>

                {/* AI Personas Section - Only for chat and conference */}
                {(selectedActivity.type === "chat" || selectedActivity.type === "conference") && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">AI Personas</label>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => setShowAddPersonaDialog(true)}>
                          <UserPlus className="mr-1 h-3 w-3" />
                          Create
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPersonas(selectedActivity.personas || [])
                            setInitialMessagePersona(selectedActivity.initialMessagePersona || "")
                            setConversationType(selectedActivity.conversationType || "personal")
                            setPersonaInitialMessages(selectedActivity.personaInitialMessages || {})
                            setShowPersonaDialog(true)
                          }}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add
                        </Button>
                      </div>
                    </div>

                    {selectedActivity.personas && selectedActivity.personas.length > 0 ? (
                      <div className="space-y-2">
                        {selectedActivity.personas.map((personaId: string) => {
                          const persona = personas.find((p) => p.id === personaId)
                          if (!persona) return null

                          return (
                            <div key={persona.id} className="flex items-center justify-between rounded-md border p-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={persona.image || "/placeholder.svg"} alt={persona.name} />
                                  <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">{persona.name}</div>
                                  <div className="text-xs text-muted-foreground">{persona.role}</div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {selectedActivity.conversationType === "group" &&
                                  selectedActivity.initialMessagePersona === persona.id && (
                                    <Badge variant="outline" className="mr-2 text-xs">
                                      Starts conversation
                                    </Badge>
                                  )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    const updatedPersonas = selectedActivity.personas.filter(
                                      (id: string) => id !== persona.id,
                                    )

                                    let updatedInitialMessagePersona = selectedActivity.initialMessagePersona
                                    if (updatedInitialMessagePersona === persona.id) {
                                      updatedInitialMessagePersona =
                                        updatedPersonas.length > 0 ? updatedPersonas[0] : ""
                                    }

                                    const updatedActivity = {
                                      ...selectedActivity,
                                      personas: updatedPersonas,
                                      initialMessagePersona: updatedInitialMessagePersona,
                                    }

                                    setSelectedActivity(updatedActivity)
                                    setActivities(
                                      activities.map((activity) =>
                                        activity.id === selectedActivity.id ? updatedActivity : activity,
                                      ),
                                    )
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                        No AI personas added yet
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Assessed Competencies</label>
                  {filteredCompetencies.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {filteredCompetencies.map((competency) => (
                        <div key={competency.id} className="flex items-center gap-2">
                          <Checkbox
                            id={`comp-${competency.id}`}
                            checked={selectedActivity.competencies.includes(competency.id)}
                            onCheckedChange={() => handleCompetencyChange(competency.id)}
                          />
                          <label htmlFor={`comp-${competency.id}`} className="text-sm">
                            {competency.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                      No competencies were selected in the previous step
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Activity Instructions</label>
                  <Textarea
                    placeholder="Instructions for participant"
                    value={selectedActivity.content?.instructions || ""}
                    onChange={(e) => {
                      const updatedContent = { ...selectedActivity.content, instructions: e.target.value }
                      const updatedActivity = { ...selectedActivity, content: updatedContent }
                      setSelectedActivity(updatedActivity)
                      setActivities(
                        activities.map((activity) =>
                          activity.id === selectedActivity.id ? updatedActivity : activity,
                        ),
                      )
                    }}
                  />
                </div>

                {/* Email specific fields */}
                {selectedActivity.type === "email" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Subject</label>
                      <Input
                        placeholder="Enter email subject"
                        value={selectedActivity.content?.subject || ""}
                        onChange={(e) => {
                          const updatedContent = { ...selectedActivity.content, subject: e.target.value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">From</label>
                      <Input
                        placeholder="Sender name"
                        value={selectedActivity.content?.sender || ""}
                        onChange={(e) => {
                          const updatedContent = { ...selectedActivity.content, sender: e.target.value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Body</label>
                      <Textarea
                        placeholder="Email content"
                        rows={4}
                        value={selectedActivity.content?.body || ""}
                        onChange={(e) => {
                          const updatedContent = { ...selectedActivity.content, body: e.target.value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Document specific fields */}
                {selectedActivity.type === "document" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Document Type</label>
                      <Select
                        value={selectedActivity.content?.documentType || ""}
                        onValueChange={(value) => {
                          const updatedContent = { ...selectedActivity.content, documentType: value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="report">Report</SelectItem>
                          <SelectItem value="proposal">Proposal</SelectItem>
                          <SelectItem value="analysis">Analysis</SelectItem>
                          <SelectItem value="memo">Memo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Document Template</label>
                      <Select
                        value={selectedActivity.content?.template || ""}
                        onValueChange={(value) => {
                          const updatedContent = { ...selectedActivity.content, template: value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blank">Blank</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {/* Calendar specific fields */}
                {selectedActivity.type === "calendar" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Type</label>
                      <Select
                        value={selectedActivity.content?.eventType || ""}
                        onValueChange={(value) => {
                          const updatedContent = { ...selectedActivity.content, eventType: value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="deadline">Deadline</SelectItem>
                          <SelectItem value="appointment">Appointment</SelectItem>
                          <SelectItem value="reminder">Reminder</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Title</label>
                      <Input
                        placeholder="Enter event title"
                        value={selectedActivity.content?.eventTitle || ""}
                        onChange={(e) => {
                          const updatedContent = { ...selectedActivity.content, eventTitle: e.target.value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Description</label>
                      <Textarea
                        placeholder="Event details"
                        value={selectedActivity.content?.eventDescription || ""}
                        onChange={(e) => {
                          const updatedContent = { ...selectedActivity.content, eventDescription: e.target.value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Conference specific fields */}
                {selectedActivity.type === "conference" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Meeting Topic</label>
                      <Input
                        placeholder="Enter meeting topic"
                        value={selectedActivity.content?.meetingTopic || ""}
                        onChange={(e) => {
                          const updatedContent = { ...selectedActivity.content, meetingTopic: e.target.value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Meeting Type</label>
                      <Select
                        value={selectedActivity.content?.meetingType || ""}
                        onValueChange={(value) => {
                          const updatedContent = { ...selectedActivity.content, meetingType: value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select meeting type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-on-one">One-on-One</SelectItem>
                          <SelectItem value="team">Team Meeting</SelectItem>
                          <SelectItem value="presentation">Presentation</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Agenda</label>
                      <Textarea
                        placeholder="Meeting agenda"
                        value={selectedActivity.content?.agenda || ""}
                        onChange={(e) => {
                          const updatedContent = { ...selectedActivity.content, agenda: e.target.value }
                          const updatedActivity = { ...selectedActivity, content: updatedContent }
                          setSelectedActivity(updatedActivity)
                          setActivities(
                            activities.map((activity) =>
                              activity.id === selectedActivity.id ? updatedActivity : activity,
                            ),
                          )
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="py-8 text-center text-muted-foreground">Select an activity to configure</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/admin/scenarios2/create">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href="/admin/scenarios2/create/scoring">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* AI Persona Selection Dialog */}
      <Dialog open={showPersonaDialog} onOpenChange={setShowPersonaDialog}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure AI Personas</DialogTitle>
            <DialogDescription>Select and configure the AI personas for this interaction</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Conversation Type</Label>
              <Select value={conversationType} onValueChange={setConversationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">One-on-One</SelectItem>
                  <SelectItem value="group">Group Conversation</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {conversationType === "personal"
                  ? "Participant will have a one-on-one conversation with a single AI persona"
                  : "Participant will engage in a group conversation with multiple AI personas"}
              </p>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium">Select Personas</h3>
              <span className="text-xs text-muted-foreground">{selectedPersonas.length} selected</span>
            </div>

            {personas.map((persona) => (
              <div
                key={persona.id}
                className={`flex cursor-pointer items-center gap-4 rounded-md border p-3 transition-colors hover:bg-accent ${
                  selectedPersonas.includes(persona.id) ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handlePersonaSelect(persona.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={persona.image || "/placeholder.svg"} alt={persona.name} />
                  <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{persona.name}</h4>
                  <p className="text-sm text-muted-foreground">{persona.role}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {persona.traits.map((trait, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Checkbox
                  checked={selectedPersonas.includes(persona.id)}
                  onCheckedChange={() => handlePersonaSelect(persona.id)}
                  className="h-5 w-5"
                />
              </div>
            ))}
          </div>

          {selectedPersonas.length > 0 && (
            <div className="space-y-4 border-t pt-4">
              {conversationType === "group" ? (
                <>
                  <h3 className="font-medium">Conversation Starter</h3>
                  <p className="text-sm text-muted-foreground">Select which persona will start the conversation</p>

                  <RadioGroup
                    value={initialMessagePersona || selectedPersonas[0]}
                    onValueChange={setInitialMessagePersona}
                  >
                    {selectedPersonas.map((personaId) => {
                      const persona = personas.find((p) => p.id === personaId)
                      if (!persona) return null

                      return (
                        <div key={persona.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={persona.id} id={`starter-${persona.id}`} />
                          <Label htmlFor={`starter-${persona.id}`}>
                            {persona.name} ({persona.role})
                          </Label>
                        </div>
                      )
                    })}
                  </RadioGroup>

                  {initialMessagePersona && (
                    <div className="space-y-2 mt-4 border-t pt-4">
                      <Label htmlFor={`starter-message`}>Initial Message for Conversation Starter</Label>
                      <Textarea
                        id={`starter-message`}
                        placeholder={`Enter initial message for the conversation starter...`}
                        value={personaInitialMessages[initialMessagePersona] || ""}
                        onChange={(e) => handlePersonaInitialMessageChange(initialMessagePersona, e.target.value)}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        This message will be sent by {getPersonaNameById(initialMessagePersona)} to start the group
                        conversation
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-medium">Initial Messages</h3>
                  <p className="text-sm text-muted-foreground">Set the initial message for each persona</p>

                  {selectedPersonas.map((personaId) => {
                    const persona = personas.find((p) => p.id === personaId)
                    if (!persona) return null

                    return (
                      <div key={persona.id} className="space-y-2">
                        <Label htmlFor={`initial-message-${persona.id}`}>{persona.name}'s Initial Message</Label>
                        <Textarea
                          id={`initial-message-${persona.id}`}
                          placeholder={`Enter initial message for ${persona.name}...`}
                          value={personaInitialMessages[persona.id] || ""}
                          onChange={(e) => handlePersonaInitialMessageChange(persona.id, e.target.value)}
                          rows={2}
                        />
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPersonaDialog(false)}>
              Cancel
            </Button>
            <Button onClick={applyPersonas}>
              {selectedActivity?.type === "conference" ? (
                <Users className="mr-2 h-4 w-4" />
              ) : (
                <User className="mr-2 h-4 w-4" />
              )}
              Apply Personas
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Persona Dialog */}
      <Dialog open={showAddPersonaDialog} onOpenChange={setShowAddPersonaDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New AI Persona</DialogTitle>
            <DialogDescription>Define a new AI persona for your assessment activities</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="persona-name">Name</Label>
                <Input
                  id="persona-name"
                  placeholder="Enter name"
                  value={newPersona.name}
                  onChange={(e) => setNewPersona({ ...newPersona, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="persona-role">Role</Label>
                <Input
                  id="persona-role"
                  placeholder="Enter job role"
                  value={newPersona.role}
                  onChange={(e) => setNewPersona({ ...newPersona, role: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Personality Traits</Label>
              <div className="grid grid-cols-3 gap-2">
                {newPersona.traits.map((trait, index) => (
                  <Input
                    key={index}
                    placeholder={`Trait ${index + 1}`}
                    value={trait}
                    onChange={(e) => updateTrait(index, e.target.value)}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Enter up to 3 personality traits that define this persona</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="persona-instructions">Behavior Instructions</Label>
              <Textarea
                id="persona-instructions"
                placeholder="Describe how this persona should behave in conversations..."
                rows={3}
                value={newPersona.instructions}
                onChange={(e) => setNewPersona({ ...newPersona, instructions: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Example: "This persona should be skeptical of new ideas and frequently challenge the participant's
                assumptions."
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="persona-initial-message">Default Initial Message</Label>
              <Textarea
                id="persona-initial-message"
                placeholder="Enter a default initial message for this persona..."
                rows={2}
                value={newPersona.initialMessage}
                onChange={(e) => setNewPersona({ ...newPersona, initialMessage: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                This will be used as the default initial message when this persona starts a conversation
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPersonaDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPersona} disabled={!newPersona.name || !newPersona.role}>
              <UserPlus className="mr-2 h-4 w-4" />
              Create Persona
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dependency Dialog */}
      <Dialog open={showDependencyDialog} onOpenChange={setShowDependencyDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Activity Dependency</DialogTitle>
            <DialogDescription>
              Create dependencies between activities to control the flow of the assessment
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="source-activity">Source Activity</Label>
              <Select
                value={selectedDependency.sourceId}
                onValueChange={(value) => setSelectedDependency({ ...selectedDependency, sourceId: value })}
              >
                <SelectTrigger id="source-activity">
                  <SelectValue placeholder="Select source activity" />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((activity) => (
                    <SelectItem key={activity.id} value={activity.id}>
                      {activity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">The activity that must be completed first</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-activity">Target Activity</Label>
              <Select
                value={selectedDependency.targetId}
                onValueChange={(value) => setSelectedDependency({ ...selectedDependency, targetId: value })}
              >
                <SelectTrigger id="target-activity">
                  <SelectValue placeholder="Select target activity" />
                </SelectTrigger>
                <SelectContent>
                  {activities
                    .filter((activity) => activity.id !== selectedDependency.sourceId)
                    .map((activity) => (
                      <SelectItem key={activity.id} value={activity.id}>
                        {activity.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">The activity that depends on the source activity</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dependency-type">Dependency Type</Label>
              <Select
                value={selectedDependency.type}
                onValueChange={(value) =>
                  setSelectedDependency({
                    ...selectedDependency,
                    type: value,
                    condition: value === "score" ? "≥ 70%" : "",
                  })
                }
              >
                <SelectTrigger id="dependency-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completion">Completion (Must Complete)</SelectItem>
                  <SelectItem value="score">Score-based (Must Achieve Score)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedDependency.type === "score" && (
              <div className="space-y-2">
                <Label htmlFor="score-condition">Score Condition</Label>
                <Select
                  value={selectedDependency.condition}
                  onValueChange={(value) => setSelectedDependency({ ...selectedDependency, condition: value })}
                >
                  <SelectTrigger id="score-condition">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="≥ 50%">≥ 50%</SelectItem>
                    <SelectItem value="≥ 60%">≥ 60%</SelectItem>
                    <SelectItem value="≥ 70%">≥ 70%</SelectItem>
                    <SelectItem value="≥ 80%">≥ 80%</SelectItem>
                    <SelectItem value="≥ 90%">≥ 90%</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The target activity will only be available if the participant achieves this score on the source
                  activity
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDependencyDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddDependency}
              disabled={
                !selectedDependency.sourceId ||
                !selectedDependency.targetId ||
                selectedDependency.sourceId === selectedDependency.targetId
              }
            >
              <Link2 className="mr-2 h-4 w-4" />
              Add Dependency
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
