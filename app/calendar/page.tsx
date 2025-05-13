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
import { Plus, Clock, Users, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDemoMode } from "@/components/context/demo-mode-context"

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [meetingTitle, setMeetingTitle] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const router = useRouter()
  const { demoMode } = useDemoMode()

  // Format the current date for display
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  // Update current date on component mount
  useEffect(() => {
    setCurrentDate(new Date())
  }, [])

  // Mock event data
  const event = {
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

  const handleEventClick = () => {
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
    setStartTime("")
    setEndTime("")
    setIsNewEventModalOpen(true)
  }

  const handleTimeSlotClick = (timeSlot: string) => {
    // Don't open new event modal if clicking on an existing event
    if (timeSlot === "10:00") {
      handleEventClick()
      return
    }

    // Parse the time slot to set default start and end times
    const [hours] = timeSlot.split(":")

    // Format times for the input fields
    const hourNum = Number.parseInt(hours, 10)
    const formattedStartTime = `${hourNum.toString().padStart(2, "0")}:00`
    const formattedEndTime = `${(hourNum + 1).toString().padStart(2, "0")}:00`

    setSelectedTimeSlot(timeSlot)
    setStartTime(formattedStartTime)
    setEndTime(formattedEndTime)
    setMeetingTitle("")
    setIsNewEventModalOpen(true)
  }

  const handleCreateEvent = () => {
    if (meetingTitle.trim()) {
      // In a real app, this would create the event in a database
      // For demo purposes, just show a success message and close the modal
      alert(`Event "${meetingTitle}" created successfully at ${startTime}`)
      setIsNewEventModalOpen(false)
    }
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

  // Generate time slots from 07:00 to 19:00 (working hours +/- 2 hours) in 24-hour format
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 7
    return `${hour.toString().padStart(2, "0")}:00`
  })

  // Generate hour options for select
  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i
    return `${hour.toString().padStart(2, "0")}:00`
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

          {timeSlots.map((timeSlot, index) => (
            <div
              key={index}
              className="grid grid-cols-[100px_1fr] border-b py-4 hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => handleTimeSlotClick(timeSlot)}
            >
              <div className="text-muted-foreground">{timeSlot}</div>
              <div>
                {timeSlot === "10:00" && (
                  <div className="rounded-md bg-blue-500 p-3 text-white">
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
                )}
              </div>
            </div>
          ))}
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

            <div>
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{selectedEvent?.description}</p>
            </div>

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
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger id="start-time">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {hourOptions.map((hour) => (
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
                    {hourOptions.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-type">Event Type</Label>
              <Select defaultValue="meeting">
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="appointment">Appointment</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter event description" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendees">Attendees</Label>
              <Input id="attendees" placeholder="Enter email addresses separated by commas" />
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
