"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CalendarIcon, X, Search, Check } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

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

export default function AddEventPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])

  // Filter team members based on search query
  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleAttendee = (id: string) => {
    setSelectedAttendees((prev) => (prev.includes(id) ? prev.filter((attendeeId) => attendeeId !== id) : [...prev, id]))
  }

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

  const handleSaveEvent = () => {
    if (title.trim()) {
      // Format the date for storage
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })

      // Create new event object
      const newEvent = {
        id: Date.now(), // Use timestamp as unique ID
        title,
        date: formattedDate,
        startTime,
        endTime,
        location,
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

      // Get existing events from localStorage
      const savedEvents = localStorage.getItem("calendarEvents")
      let events = []

      if (savedEvents) {
        try {
          events = JSON.parse(savedEvents)
        } catch (e) {
          events = []
        }
      }

      // Add new event and save back to localStorage
      events.push(newEvent)
      localStorage.setItem("calendarEvents", JSON.stringify(events))

      // Redirect to calendar
      window.location.href = "/calendar"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/calendar">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Event</h1>
          <p className="text-muted-foreground">Create a new calendar event</p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Event Title
              </label>
              <Input id="title" placeholder="Add title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
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
                <label className="text-sm font-medium">Time</label>
                <div className="flex items-center gap-2">
                  <Select value={startTime} onValueChange={handleStartTimeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {startTimeOptions.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>to</span>
                  <Select value={endTime} onValueChange={setEndTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="End time" />
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
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
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
                <div className="h-[calc(3*(3rem+0.75rem))] overflow-y-auto pr-1">
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

            <div className="flex justify-end space-x-2">
              <Button variant="outline" asChild>
                <Link href="/calendar">Cancel</Link>
              </Button>
              <Button onClick={handleSaveEvent} disabled={!title.trim()}>
                Save Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
