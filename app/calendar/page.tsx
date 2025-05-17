"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Users, Check, X, Search, Trash2, AlertCircle, Edit2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDemoMode } from "@/components/context/demo-mode-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

// Define event type
interface Attendee {
  name: string
  role: string
  status: string
}

interface CalendarEvent {
  id: number | string
  title: string
  date: string
  startTime: string
  endTime: string
  description?: string
  category?: string
  attendees: Attendee[]
  color?: string
}

// Mock team members data for attendees selection
const teamMembers = [
  { id: "1", name: "Alex Johnson", role: "Product Manager", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "Sarah Williams", role: "UX Designer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Michael Brown", role: "Frontend Developer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "4", name: "Emily Davis", role: "Backend Developer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "5", name: "David Wilson", role: "QA Engineer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "6", name: "Jessica Taylor", role: "Project Manager", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "7", name: "Ryan Martinez", role: "DevOps Engineer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "8", name: "Olivia Anderson", role: "Data Analyst", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "9", name: "Daniel Thomas", role: "Marketing Specialist", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "10", name: "Sophia Garcia", role: "Content Writer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "11", name: "James Rodriguez", role: "Sales Manager", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "12", name: "Emma Martinez", role: "HR Specialist", avatar: "/placeholder.svg?height=32&width=32" },
]

// Array of colors for random assignment to events
const eventColors = [
  "bg-green-500",
  "bg-purple-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-amber-500",
]

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [isUnsavedChangesDialogOpen, setIsUnsavedChangesDialogOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [meetingTitle, setMeetingTitle] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isEditingTime, setIsEditingTime] = useState(false)
  const [editStartTime, setEditStartTime] = useState("")
  const [editEndTime, setEditEndTime] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const router = useRouter()
  const { demoMode } = useDemoMode()
  const modalCloseAttemptRef = useRef<() => void | null>(null)

  // Format the current date for display
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  // Update current date and load events on component mount
  useEffect(() => {
    setCurrentDate(new Date())

    // Initial default event
    const defaultEvent: CalendarEvent = {
      id: 3,
      title: "Earth Operation Regular Weekly Meeting",
      date: formattedDate,
      startTime: "10:00",
      endTime: "11:00",
      description:
        "Weekly meeting to discuss engagement activities and team building initiatives for Earth Operation division. This meeting will focus on planning and implementing new employee engagement strategies.",
      category: "client",
      attendees: [
        { name: "You (AVP of Earth Operation)", role: "You (Meeting Host)", status: "accepted" },
        { name: "GM of Earth Agriculture", role: "General Manager", status: "accepted" },
        { name: "GM of Earth Food Processing", role: "General Manager", status: "accepted" },
        { name: "GM of Earth Waste Management", role: "General Manager", status: "accepted" },
        { name: "Head of Finance & Accounting", role: "Department Head", status: "accepted" },
        { name: "Head of General Affairs", role: "Department Head", status: "accepted" },
        { name: "Head of Procurement & IT", role: "Department Head", status: "accepted" },
      ],
      color: eventColors[0], // Assign a default color
    }

    // Try to load events from localStorage
    const savedEvents = localStorage.getItem("calendarEvents")
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents)

        // Add colors to events if they don't have one
        const eventsWithColors = parsedEvents.map((event: CalendarEvent) => {
          if (!event.color) {
            return {
              ...event,
              color: getRandomColor(),
            }
          }
          return event
        })

        // Add the default event if it doesn't exist
        if (!eventsWithColors.some((e: CalendarEvent) => e.id === 3)) {
          setEvents([...eventsWithColors, defaultEvent])
        } else {
          setEvents(eventsWithColors)
        }
      } catch (e) {
        setEvents([defaultEvent])
      }
    } else {
      setEvents([defaultEvent])
    }
  }, [formattedDate])

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("calendarEvents", JSON.stringify(events))
    }
  }, [events])

  // Get a random color from the eventColors array
  const getRandomColor = () => {
    return eventColors[Math.floor(Math.random() * eventColors.length)]
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
    setIsEditingTime(false)
    setErrorMessage(null)
  }

  const handleAcceptMeeting = () => {
    setIsModalOpen(false)
    router.push("/conference")
  }

  const handleNewEvent = () => {
    setSelectedTimeSlot(null)
    setMeetingTitle("")
    setStartTime("09:00")
    setEndTime("10:00")
    setSelectedAttendees([])
    setSearchQuery("")
    setErrorMessage(null)
    setIsNewEventModalOpen(true)
  }

  const handleTimeSlotClick = (timeSlot: string) => {
    // Check if there's an event at this time slot
    const eventAtTimeSlot = events.find((event) => event.startTime === timeSlot)
    if (eventAtTimeSlot) {
      handleEventClick(eventAtTimeSlot)
      return
    }

    // Parse the time slot to set default start and end times
    const [hours] = timeSlot.split(":")
    const hourNum = Number.parseInt(hours, 10)

    // Set start time to the clicked time slot
    const formattedStartTime = `${hourNum.toString().padStart(2, "0")}:00`

    // Set end time to one hour after start time, unless that would be after 18:00
    const endHour = hourNum + 1 > 18 ? 18 : hourNum + 1
    const formattedEndTime = `${endHour.toString().padStart(2, "0")}:00`

    setSelectedTimeSlot(timeSlot)
    setStartTime(formattedStartTime)
    setEndTime(formattedEndTime)
    setMeetingTitle("")
    setSelectedAttendees([])
    setSearchQuery("")
    setErrorMessage(null)
    setIsNewEventModalOpen(true)
  }

  // Calculate the total hours of all events in the day, excluding a specific event if provided
  const calculateTotalEventHours = (excludeEventId?: number | string) => {
    let totalHours = 0

    events.forEach((event) => {
      // Skip the event being excluded (for edit validation)
      if (excludeEventId && event.id === excludeEventId) {
        return
      }

      const startHour = Number.parseInt(event.startTime?.split(":")?.[0] || "0", 10) || 0
      const endHour = Number.parseInt(event.endTime?.split(":")?.[0] || "0", 10) || 0

      if (!isNaN(startHour) && !isNaN(endHour)) {
        totalHours += endHour - startHour
      }
    })

    return totalHours
  }

  // Check if adding a new event would exceed the limit of 3 hours total per day
  const checkDailyHoursLimit = (newStartTime: string, newEndTime: string, excludeEventId?: number | string) => {
    const newStartHour = Number.parseInt(newStartTime.split(":")[0], 10)
    const newEndHour = Number.parseInt(newEndTime.split(":")[0], 10)

    if (isNaN(newStartHour) || isNaN(newEndHour)) {
      return { allowed: false, message: "Invalid time format" }
    }

    const newEventHours = newEndHour - newStartHour
    const currentTotalHours = calculateTotalEventHours(excludeEventId)

    if (currentTotalHours + newEventHours > 3) {
      return {
        allowed: false,
        message: `Cannot add event: Maximum of 3 hours of events allowed per day. You already have ${currentTotalHours} hour(s) scheduled.`,
      }
    }

    return { allowed: true }
  }

  // Check if adding a new event would exceed the limit of 2 overlapping events
  const checkOverlappingEventsLimit = (newStartTime: string, newEndTime: string, excludeEventId?: number | string) => {
    const newStartHour = Number.parseInt(newStartTime.split(":")[0], 10)
    const newEndHour = Number.parseInt(newEndTime.split(":")[0], 10)

    // Check each hour between start and end time
    for (let hour = newStartHour; hour < newEndHour; hour++) {
      const hourString = `${hour.toString().padStart(2, "0")}:00`

      // Count events that overlap with this hour
      const overlappingEvents = events.filter((event) => {
        // Skip the event being excluded (for edit validation)
        if (excludeEventId && event.id === excludeEventId) {
          return false
        }

        const eventStartHour = Number.parseInt(event.startTime.split(":")[0], 10)
        const eventEndHour = Number.parseInt(event.endTime.split(":")[0], 10)

        return eventStartHour <= hour && eventEndHour > hour
      })

      // If there are already 2 events at this hour, return false
      if (overlappingEvents.length >= 2) {
        return {
          allowed: false,
          hour: hourString,
        }
      }
    }

    return { allowed: true }
  }

  const handleCreateEvent = () => {
    if (meetingTitle.trim()) {
      // Check if adding this event would exceed the limit of 3 hours total per day
      const hoursLimitCheck = checkDailyHoursLimit(startTime, endTime)

      if (!hoursLimitCheck.allowed) {
        setErrorMessage(hoursLimitCheck.message)
        return
      }

      // Check if adding this event would exceed the limit of 2 overlapping events
      const overlapCheck = checkOverlappingEventsLimit(startTime, endTime)

      if (!overlapCheck.allowed) {
        setErrorMessage(`Cannot add event: Maximum of 2 overlapping events allowed at ${overlapCheck.hour}`)
        return
      }

      // Create new event object
      const newEvent: CalendarEvent = {
        id: Date.now(), // Use timestamp as unique ID
        title: meetingTitle,
        date: formattedDate,
        startTime,
        endTime,
        category: "meeting",
        color: getRandomColor(), // Assign a random color
        attendees: selectedAttendees.map((id) => {
          const member = teamMembers.find((m) => m.id === id)
          return {
            name: member?.name || "",
            role: member?.role || "",
            status: "accepted",
          }
        }),
      }

      // Add new event to events array
      setEvents((prev) => [...prev, newEvent])

      // Close modal
      setIsNewEventModalOpen(false)
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      // Remove the event from the events array
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id))

      // Close the confirmation dialog and the event modal
      setIsDeleteConfirmOpen(false)
      setIsModalOpen(false)

      // Force a refresh of the UI to ensure proper cleanup
      setTimeout(() => {
        setSelectedEvent(null)
      }, 100)
    }
  }

  const toggleAttendee = (id: string) => {
    setSelectedAttendees((prev) => (prev.includes(id) ? prev.filter((attendeeId) => attendeeId !== id) : [...prev, id]))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500"
      case "declined":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // Generate time slots from 07:00 to 19:00 (working hours) in 24-hour format
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 7
    return `${hour.toString().padStart(2, "0")}:00`
  })

  // Generate start time options from 07:00 to 18:00
  const startTimeOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 7
    return `${hour.toString().padStart(2, "0")}:00`
  })

  // Generate end time options from 08:00 to 19:00
  const endTimeOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8
    return `${hour.toString().padStart(2, "0")}:00`
  })

  // Handle start time change to ensure end time is always after start time
  const handleStartTimeChange = (newStartTime: string) => {
    setStartTime(newStartTime)

    // Parse the start time hour
    const startHour = Number.parseInt(newStartTime.split(":")[0], 10)

    // Parse the current end time hour
    const currentEndHour = Number.parseInt(endTime.split(":")[0], 10)

    // If end time is before or equal to start time, set it to start time + 1 hour
    if (currentEndHour <= startHour) {
      const newEndHour = startHour + 1 > 19 ? 19 : startHour + 1
      setEndTime(`${newEndHour.toString().padStart(2, "0")}:00`)
    }

    // Clear any previous error messages when changing times
    setErrorMessage(null)
  }

  // Handle end time change
  const handleEndTimeChange = (newEndTime: string) => {
    setEndTime(newEndTime)

    // Clear any previous error messages when changing times
    setErrorMessage(null)
  }

  // Handle edit start time change
  const handleEditStartTimeChange = (newStartTime: string) => {
    setEditStartTime(newStartTime)
    setHasUnsavedChanges(true)

    // Parse the start time hour
    const startHour = Number.parseInt(newStartTime.split(":")[0], 10)

    // Parse the current end time hour
    const currentEndHour = Number.parseInt(editEndTime.split(":")[0], 10)

    // If end time is before or equal to start time, set it to start time + 1 hour
    if (currentEndHour <= startHour) {
      const newEndHour = startHour + 1 > 19 ? 19 : startHour + 1
      setEditEndTime(`${newEndHour.toString().padStart(2, "0")}:00`)
    }

    // Clear any previous error messages when changing times
    setErrorMessage(null)
  }

  // Handle edit end time change
  const handleEditEndTimeChange = (newEndTime: string) => {
    setEditEndTime(newEndTime)
    setHasUnsavedChanges(true)

    // Clear any previous error messages when changing times
    setErrorMessage(null)
  }

  // Filter end time options based on selected start time
  const getFilteredEndTimeOptions = (selectedStartTime: string) => {
    if (!selectedStartTime) return endTimeOptions

    const startHour = Number.parseInt(selectedStartTime.split(":")[0], 10)
    return endTimeOptions.filter((time) => {
      const hour = Number.parseInt(time.split(":")[0], 10)
      return hour > startHour
    })
  }

  const filteredTeamMembers = teamMembers.filter((member) => {
    const searchTerm = searchQuery.toLowerCase()
    return member.name.toLowerCase().includes(searchTerm) || member.role.toLowerCase().includes(searchTerm)
  })

  // Start editing event time
  const handleStartEditingTime = () => {
    if (selectedEvent) {
      setEditStartTime(selectedEvent.startTime)
      setEditEndTime(selectedEvent.endTime)
      setIsEditingTime(true)
      setHasUnsavedChanges(false)
      setErrorMessage(null)
    }
  }

  // Cancel editing event time
  const handleCancelEditingTime = () => {
    if (hasUnsavedChanges) {
      // Show confirmation dialog if there are unsaved changes
      setIsUnsavedChangesDialogOpen(true)
    } else {
      // Just exit edit mode if no changes
      setIsEditingTime(false)
      setErrorMessage(null)
    }
  }

  // Discard changes and exit edit mode
  const handleDiscardChanges = () => {
    setIsUnsavedChangesDialogOpen(false)
    setIsEditingTime(false)
    setHasUnsavedChanges(false)
    setErrorMessage(null)
  }

  // Save edited event time
  const handleSaveEditedTime = () => {
    if (selectedEvent) {
      // Check if editing this event would exceed the limit of 3 hours total per day
      const hoursLimitCheck = checkDailyHoursLimit(editStartTime, editEndTime, selectedEvent.id)

      if (!hoursLimitCheck.allowed) {
        setErrorMessage(hoursLimitCheck.message)
        return
      }

      // Check if editing this event would exceed the limit of 2 overlapping events
      const overlapCheck = checkOverlappingEventsLimit(editStartTime, editEndTime, selectedEvent.id)

      if (!overlapCheck.allowed) {
        setErrorMessage(`Cannot update event: Maximum of 2 overlapping events allowed at ${overlapCheck.hour}`)
        return
      }

      // Update the event with new times
      setEvents((prev) =>
        prev.map((event) => {
          if (event.id === selectedEvent.id) {
            return {
              ...event,
              startTime: editStartTime,
              endTime: editEndTime,
            }
          }
          return event
        }),
      )

      // Update the selected event
      setSelectedEvent({
        ...selectedEvent,
        startTime: editStartTime,
        endTime: editEndTime,
      })

      // Exit edit mode
      setIsEditingTime(false)
      setHasUnsavedChanges(false)
      setErrorMessage(null)
    }
  }

  // Handle modal close attempt
  const handleModalCloseAttempt = (onClose: () => void) => {
    if (isEditingTime && hasUnsavedChanges) {
      // Store the close function to be called after confirmation
      modalCloseAttemptRef.current = onClose
      // Show confirmation dialog
      setIsUnsavedChangesDialogOpen(true)
      return false // Prevent immediate close
    }
    return true // Allow close
  }

  // Confirm modal close with unsaved changes
  const confirmModalClose = () => {
    setIsUnsavedChangesDialogOpen(false)
    setIsEditingTime(false)
    setHasUnsavedChanges(false)

    // Call the stored close function if it exists
    if (modalCloseAttemptRef.current) {
      modalCloseAttemptRef.current()
      modalCloseAttemptRef.current = null
    }
  }

  // Clean up pointer event issues when the modal closes
  useEffect(() => {
    if (!isModalOpen && !isDeleteConfirmOpen) {
      // Ensure no pointer-event issues when modals are closed
      document.body.style.pointerEvents = ""

      // Small delay to ensure DOM updates properly
      setTimeout(() => {
        setSelectedEvent(null)
      }, 100)
    }
  }, [isModalOpen, isDeleteConfirmOpen])

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleNewEvent}>
            <Plus className="mr-2 h-4 w-4" /> New Event
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{formattedDate}</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-[100px_1fr] border-b pb-2">
            <div className="font-medium">Time</div>
            <div className="font-medium">Events</div>
          </div>

          <div className="relative">
            {timeSlots.map((timeSlot, index) => (
              <div
                key={index}
                className="grid grid-cols-[100px_1fr] border-b py-0 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => handleTimeSlotClick(timeSlot)}
                style={{ height: "80px" }} // Fixed height for each time slot
              >
                <div className="text-muted-foreground">{timeSlot}</div>
                <div></div> {/* Empty div for the grid layout */}
              </div>
            ))}

            {/* Render events as absolutely positioned elements */}
            <div className="absolute top-0 left-[100px] right-0 bottom-0 pointer-events-none">
              {events.map((event) => {
                // Safely parse time values with fallbacks
                const startHour = Number.parseInt(event.startTime?.split(":")?.[0] || "0", 10) || 0
                const endHour = Number.parseInt(event.endTime?.split(":")?.[0] || "0", 10) || 0

                // Ensure we have valid numbers
                if (isNaN(startHour) || isNaN(endHour)) {
                  return null // Skip rendering this event if we can't calculate its position
                }

                // Calculate overlapping events
                const overlappingEvents = events.filter((e) => {
                  if (!e.startTime || !e.endTime) return false

                  const eStartHour = Number.parseInt(e.startTime.split(":")?.[0] || "0", 10) || 0
                  const eEndHour = Number.parseInt(e.endTime.split(":")?.[0] || "0", 10) || 0

                  if (isNaN(eStartHour) || isNaN(eEndHour)) return false

                  // Check if events overlap
                  return (
                    e.id !== event.id &&
                    ((eStartHour < endHour && eStartHour >= startHour) ||
                      (eEndHour > startHour && eEndHour <= endHour) ||
                      (eStartHour <= startHour && eEndHour >= endHour))
                  )
                })

                // Calculate column for this event (for overlapping events)
                const overlapGroup = [event, ...overlappingEvents].sort((a, b) => {
                  const aStart = Number.parseInt(a.startTime?.split(":")?.[0] || "0", 10) || 0
                  const bStart = Number.parseInt(b.startTime?.split(":")?.[0] || "0", 10) || 0

                  if (isNaN(aStart) || isNaN(bStart)) return 0

                  return aStart - bStart || String(a.id).localeCompare(String(b.id))
                })

                const columnIndex = overlapGroup.indexOf(event)
                const totalColumns = overlapGroup.length

                // Calculate top position (relative to the first time slot)
                const topOffset = (startHour - 7) * 80 // 7 is the first hour (07:00), 80px is the height of each slot

                // Calculate height based on duration
                const duration = endHour - startHour
                const height = duration * 80

                // Calculate width and left position for overlapping events
                const width = totalColumns > 1 ? `calc((100% - 16px) / ${totalColumns})` : "calc(100% - 16px)"
                const left = totalColumns > 1 ? `calc(${columnIndex} * (100% - 16px) / ${totalColumns})` : "0"

                return (
                  <div
                    key={event.id}
                    className={`absolute rounded-md ${event.color || "bg-blue-500"} px-3 py-1 text-white pointer-events-auto cursor-pointer`}
                    style={{
                      top: `${topOffset}px`,
                      height: `${height}px`,
                      width,
                      left,
                      overflow: "hidden",
                      marginLeft: "2px",
                      marginRight: "2px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEventClick(event)
                    }}
                  >
                    <div className="font-medium">{event.title || "Untitled Event"}</div>
                    <div className="text-sm">
                      {event.startTime || "--:--"} - {event.endTime || "--:--"}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{(event.attendees?.length || 0).toString()} attendees</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open && handleModalCloseAttempt(() => setIsModalOpen(false))) {
            setIsModalOpen(false)
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              <Badge variant="outline" className="mt-1">
                {selectedEvent?.category
                  ? selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)
                  : ""}              
              </Badge>
            </DialogDescription>
          </DialogHeader>

          {errorMessage && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Time</h3>
                    {!isEditingTime && (
                      <Button variant="outline" size="sm" onClick={handleStartEditingTime} className="h-8 gap-1">
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    )}
                  </div>

                  {isEditingTime ? (
                    <div className="mt-2 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-start-time">Start Time</Label>
                          <Select value={editStartTime} onValueChange={handleEditStartTimeChange}>
                            <SelectTrigger id="edit-start-time" className="border-primary">
                              <SelectValue placeholder="Select start time" />
                            </SelectTrigger>
                            <SelectContent>
                              {startTimeOptions.map((hour) => (
                                <SelectItem key={hour} value={hour}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-end-time">End Time</Label>
                          <Select value={editEndTime} onValueChange={handleEditEndTimeChange}>
                            <SelectTrigger id="edit-end-time" className="border-primary">
                              <SelectValue placeholder="Select end time" />
                            </SelectTrigger>
                            <SelectContent>
                              {getFilteredEndTimeOptions(editStartTime).map((hour) => (
                                <SelectItem key={hour} value={hour}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancelEditingTime}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveEditedTime} className="gap-1">
                          <Save className="h-3.5 w-3.5" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      {selectedEvent?.startTime} - {selectedEvent?.endTime}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {selectedEvent?.description && (
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-muted-foreground">{selectedEvent.description}</p>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Participants</h3>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {selectedEvent?.attendees.map((attendee: any, index: number) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback>
                          {attendee.name && typeof attendee.name === "string"
                            ? attendee.name
                                .split(" ")
                                .map((n: string) => n[0] || "")
                                .join("")
                            : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{attendee.name}</p>
                        <p className="text-xs text-muted-foreground">{attendee.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(attendee.status)}`} />
                      <span className="text-xs capitalize">{attendee.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="flex items-center justify-between border-t pt-4">
              <Button
                variant="destructive"
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="flex items-center gap-2"
                disabled={isEditingTime}
              >
                <Trash2 className="h-4 w-4" /> Cancel Event
              </Button>
              <Button onClick={handleAcceptMeeting} className="flex items-center gap-2" disabled={isEditingTime}>
                <Check className="h-4 w-4" /> Accept
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Event</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent} className="bg-destructive text-destructive-foreground">
              Yes, Cancel Event
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unsaved Changes Confirmation Dialog */}
      <AlertDialog open={isUnsavedChangesDialogOpen} onOpenChange={setIsUnsavedChangesDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes to the event time. Do you want to discard these changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsUnsavedChangesDialogOpen(false)}>No, Keep Editing</AlertDialogCancel>
            <AlertDialogAction onClick={confirmModalClose}>Yes, Discard Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* New Event Modal */}
      <Dialog open={isNewEventModalOpen} onOpenChange={setIsNewEventModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event to your calendar for {selectedTimeSlot ? selectedTimeSlot : formattedDate}.
            </DialogDescription>
          </DialogHeader>

          {errorMessage && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">
                Event Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="event-title"
                placeholder="Enter event title"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Select value={startTime} onValueChange={handleStartTimeChange}>
                  <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {startTimeOptions.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Select value={endTime} onValueChange={handleEndTimeChange}>
                  <SelectTrigger id="end-time">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredEndTimeOptions(startTime).map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Attendees</Label>
              <div className="rounded-md border p-4">
                <div className="mb-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search by name or role..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Team members grid with fixed height and scroll */}
                <div className="h-[calc(2*(3rem+0.9rem))] overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {filteredTeamMembers.map((member) => (
                      <label
                        key={member.id}
                        className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${
                          selectedAttendees.includes(member.id) ? "bg-primary/10 border-primary" : "hover:bg-accent"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedAttendees.includes(member.id)}
                          onChange={() => toggleAttendee(member.id)}
                        />
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.name && typeof member.name === "string"
                              ? member.name
                                  .split(" ")
                                  .map((n) => n[0] || "")
                                  .join("")
                              : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-medium truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                        </div>
                        {selectedAttendees.includes(member.id) && <Check className="h-4 w-4 text-primary" />}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedAttendees.length > 0 && (
                    <div className="w-full">
                      <p className="text-sm font-medium mb-2">Selected ({selectedAttendees.length}):</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAttendees.map((id) => {
                          const member = teamMembers.find((m) => m.id === id)
                          return (
                            member && (
                              <Badge key={id} variant="secondary" className="flex items-center gap-1">
                                {member.name}
                                <button
                                  type="button"
                                  onClick={() => toggleAttendee(id)}
                                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            )
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsNewEventModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEvent} disabled={!meetingTitle.trim()}>
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
