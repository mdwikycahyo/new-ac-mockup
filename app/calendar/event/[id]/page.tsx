"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, CalendarIcon, Clock, MapPin, Users, Edit, Trash, Check, X } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// Mock event data - in a real app, this would come from an API
const eventData = {
  "1": {
    id: 1,
    title: "Team Meeting",
    date: "April 15, 2025",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    location: "Conference Room A",
    description:
      "Weekly team meeting to discuss project progress, challenges, and upcoming tasks. Please come prepared with your status updates.",
    category: "work",
    attendees: [
      { name: "John Doe", email: "john@example.com", status: "accepted" },
      { name: "Jane Smith", email: "jane@example.com", status: "accepted" },
      { name: "Alex Johnson", email: "alex@example.com", status: "pending" },
      { name: "Sarah Williams", email: "sarah@example.com", status: "declined" },
    ],
  },
  "2": {
    id: 2,
    title: "Project Review",
    date: "April 15, 2025",
    startTime: "1:00 PM",
    endTime: "2:30 PM",
    location: "Virtual Meeting",
    description:
      "Quarterly project review with stakeholders to discuss progress, budget, and timeline. Please prepare your presentation slides.",
    category: "important",
    attendees: [
      { name: "Project Manager", email: "pm@example.com", status: "accepted" },
      { name: "Client Representative", email: "client@example.com", status: "accepted" },
      { name: "Development Lead", email: "dev@example.com", status: "accepted" },
      { name: "Marketing Director", email: "marketing@example.com", status: "pending" },
    ],
  },
  "3": {
    id: 3,
    title: "Client Call",
    date: "April 15, 2025",
    startTime: "3:00 PM",
    endTime: "3:30 PM",
    location: "Phone",
    description: "Follow-up call with the client to discuss their requirements and address any questions.",
    category: "client",
    attendees: [
      { name: "You", email: "you@example.com", status: "accepted" },
      { name: "Client", email: "client@example.com", status: "accepted" },
    ],
  },
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const event = eventData[eventId] || eventData["1"] // Fallback to first event if not found

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-500"
      case "important":
        return "bg-red-500"
      case "client":
        return "bg-purple-500"
      case "personal":
        return "bg-green-500"
      default:
        return "bg-gray-500"
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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/calendar">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Details</h1>
          <p className="text-muted-foreground">View and manage calendar event</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${getCategoryColor(event.category)}`} />
              <CardTitle className="text-2xl">{event.title}</CardTitle>
            </div>
            <Badge variant="outline" className="mt-2">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/calendar/event/edit/${event.id}`}>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Date</h3>
                    <p>{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Time</h3>
                    <p>
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p>{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="font-medium">Attendees</h3>
                    <div className="mt-2 space-y-2">
                      {event.attendees.map((attendee, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md border p-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=24&width=24" />
                              <AvatarFallback>
                                {attendee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{attendee.name}</p>
                              <p className="text-xs text-muted-foreground">{attendee.email}</p>
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
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>

            <div className="flex items-center justify-center gap-4 border-t pt-6">
              <Button variant="outline" size="lg" className="w-40">
                <X className="mr-2 h-4 w-4" /> Decline
              </Button>
              <Button size="lg" className="w-40">
                <Check className="mr-2 h-4 w-4" /> Accept
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
