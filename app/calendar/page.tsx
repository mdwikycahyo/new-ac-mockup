import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

export default function CalendarPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline">Today</Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button asChild>
            <Link href="/calendar/event">
              <Plus className="mr-2 h-4 w-4" /> New Event
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>April 15, 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center border-b pb-2">
              <div className="w-16 text-center text-sm font-medium">Time</div>
              <div className="flex-1 font-medium">Events</div>
            </div>

            {Array.from({ length: 12 }).map((_, i) => {
              const hour = i + 8 // Start from 8 AM
              const hourFormatted = hour > 12 ? hour - 12 : hour
              const ampm = hour >= 12 ? "PM" : "AM"

              return (
                <div key={i} className="flex min-h-16 items-start border-b pb-2">
                  <div className="w-16 pt-2 text-center text-sm text-muted-foreground">
                    {hourFormatted}:00 {ampm}
                  </div>
                  <div className="flex-1">
                    {hour === 10 && (
                      <Link href="/calendar/event/1" className="block">
                        <div className="mb-1 rounded-md bg-blue-500 p-2 text-white">
                          <div className="font-medium">Team Meeting</div>
                          <div className="text-sm">10:00 AM - 11:00 AM</div>
                          <div className="text-sm">Conference Room A</div>
                        </div>
                      </Link>
                    )}
                    {hour === 13 && (
                      <Link href="/calendar/event/2" className="block">
                        <div className="mb-1 rounded-md bg-red-500 p-2 text-white">
                          <div className="font-medium">Project Review</div>
                          <div className="text-sm">1:00 PM - 2:30 PM</div>
                          <div className="text-sm">Virtual Meeting</div>
                        </div>
                      </Link>
                    )}
                    {hour === 15 && (
                      <Link href="/calendar/event/3" className="block">
                        <div className="mb-1 rounded-md bg-purple-500 p-2 text-white">
                          <div className="font-medium">Client Call</div>
                          <div className="text-sm">3:00 PM - 3:30 PM</div>
                          <div className="text-sm">Phone</div>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold">Today's Events</h2>
        <div className="space-y-4">
          <Link href="/calendar/event/1" className="block">
            <EventCard title="Team Meeting" time="10:00 AM - 11:00 AM" location="Conference Room A" category="work" />
          </Link>
          <Link href="/calendar/event/2" className="block">
            <EventCard
              title="Project Review"
              time="1:00 PM - 2:30 PM"
              location="Virtual Meeting"
              category="important"
            />
          </Link>
          <Link href="/calendar/event/3" className="block">
            <EventCard title="Client Call" time="3:00 PM - 3:30 PM" location="Phone" category="client" />
          </Link>
        </div>
      </div>
    </div>
  )
}

interface EventCardProps {
  title: string
  time: string
  location: string
  category: "work" | "personal" | "important" | "client"
}

function EventCard({ title, time, location, category }: EventCardProps) {
  const categoryColors = {
    work: "bg-blue-500",
    personal: "bg-green-500",
    important: "bg-red-500",
    client: "bg-purple-500",
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`h-full w-1.5 rounded-full ${categoryColors[category]}`} />
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{time}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        <Button variant="outline" size="sm">
          Details
        </Button>
      </CardContent>
    </Card>
  )
}
