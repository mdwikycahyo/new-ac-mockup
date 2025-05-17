"use client"

import { useState, useEffect } from "react"
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
import { Plus, Clock, Users, Check, X, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDemoMode } from "@/components/context/demo-mode-context"

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

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [meetingTitle, setMeetingTitle] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const router = useRouter()
  const { demoMode } = useDemoMode()

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
    }

    // Try to load events from localStorage
    const savedEvents = localStorage.getItem("calendarEvents")
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents)
        // Add the default event if it doesn't exist
        if (!parsedEvents.some((e: CalendarEvent) => e.id === 3)) {
          setEvents([...parsedEvents, defaultEvent])
        } else {
          setEvents(parsedEvents)
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

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
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
    setIsNewEventModalOpen(true)
  }

  const handleCreateEvent = () => {
    if (meetingTitle.trim()) {
      // Create new event object
      const newEvent: CalendarEvent = {
        id: Date.now(), // Use timestamp as unique ID
        title: meetingTitle,
        date: formattedDate,
        startTime,
        endTime,
        category: "meeting",
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
  }

  // Filter end time options based on selected start time
  const getFilteredEndTimeOptions = () => {
    if (!startTime) return endTimeOptions

    const startHour = Number.parseInt(startTime.split(":")[0], 10)
    return endTimeOptions.filter((time) => {
      const hour = Number.parseInt(time.split(":")[0], 10)
      return hour > startHour
    })
  }

  const filteredTeamMembers = teamMembers.filter((member) => {
    const searchTerm = searchQuery.toLowerCase()
    return member.name.toLowerCase().includes(searchTerm) || member.role.toLowerCase().includes(searchTerm)
  })

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
        <CardContent>
          <div className="grid grid-cols-[100px_1fr] border-b pb-2">
            <div className="font-medium">Time</div>
            <div className="font-medium">Events</div>
          </div>

          {timeSlots.map((timeSlot, index) => {
            // Find events that start at this time slot
            const eventsAtTimeSlot = events.filter((event) => event.startTime === timeSlot)

            return (
              <div
                key={index}
                className="grid grid-cols-[100px_1fr] border-b py-4 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => handleTimeSlotClick(timeSlot)}
              >
                <div className="text-muted-foreground">{timeSlot}</div>
                <div>
                  {eventsAtTimeSlot.map((event) => (
                    <div key={event.id} className="rounded-md bg-blue-500 p-3 text-white mb-2 last:mb-0">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm">
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              <Badge variant="outline" className="mt-1">
                {selectedEvent?.category?.charAt(0).toUpperCase() + selectedEvent?.category?.slice(1)}
              </Badge>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Time</h3>
                  <p className="text-muted-foreground">
                    {selectedEvent?.startTime} - {selectedEvent?.endTime}
                  </p>
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
                          {attendee.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
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

            <DialogFooter className="flex items-center justify-center gap-4 border-t pt-4">
              <Button size="lg" className="w-40" onClick={handleAcceptMeeting}>
                <Check className="mr-2 h-4 w-4" /> Accept
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Event Modal */}
      <Dialog open={isNewEventModalOpen} onOpenChange={setIsNewEventModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event to your calendar for {selectedTimeSlot ? selectedTimeSlot : formattedDate}.
            </DialogDescription>
          </DialogHeader>

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
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger id="end-time">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredEndTimeOptions().map((hour) => (
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
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
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
