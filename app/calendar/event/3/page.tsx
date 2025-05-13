import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function EventDetailPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/calendar">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Details</h1>
          <p className="text-muted-foreground">View and manage your event</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Earth Operation Regular Weekly Meeting</CardTitle>
                  <CardDescription>Weekly coordination meeting for Earth Operation division</CardDescription>
                </div>
                <Badge className="bg-purple-500 hover:bg-purple-600">Important</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">April 15, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-muted-foreground">10:00 PM - 11:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Conference Room B</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Organizer</p>
                    <p className="text-muted-foreground">AVP of Earth Operation</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Description</h3>
                <p className="text-muted-foreground">
                  Regular weekly coordination meeting to discuss operational updates, challenges, and initiatives across
                  all Earth Operation units. This week's agenda includes team building activity planning and workload
                  distribution review.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-medium">Attendees</h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "GM of Earth Agriculture",
                      role: "General Manager",
                      avatar: "/abstract-geometric-shapes.png",
                    },
                    {
                      name: "GM of Earth Food Processing",
                      role: "General Manager",
                      avatar: "/number-two-graphic.png",
                    },
                    {
                      name: "GM of Earth Waste Management",
                      role: "General Manager",
                      avatar: "/abstract-geometric-shapes.png",
                    },
                    {
                      name: "Head of Finance & Accounting",
                      role: "Department Head",
                      avatar: "/abstract-geometric-shapes.png",
                    },
                    {
                      name: "Head of General Affairs",
                      role: "Department Head",
                      avatar: "/abstract-geometric-composition-5.png",
                    },
                    {
                      name: "Head of Procurement & IT",
                      role: "Department Head",
                      avatar: "/abstract-geometric-shapes.png",
                    },
                  ].map((attendee, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {attendee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{attendee.name}</p>
                        <p className="text-sm text-muted-foreground">{attendee.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Agenda</h3>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Review of previous week's action items (15 min)</li>
                  <li>Operational updates from each unit (30 min)</li>
                  <li>Discussion on team building activity planning (20 min)</li>
                  <li>Workload distribution review (15 min)</li>
                  <li>AOB and action items for next week (10 min)</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/conference/meeting-room">
                  <Users className="mr-2 h-4 w-4" /> Accept and Join Meeting
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit className="mr-2 h-4 w-4" /> Edit Event
              </Button>
              <Button className="w-full justify-start text-destructive" variant="outline">
                <Trash2 className="mr-2 h-4 w-4" /> Cancel Event
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meeting Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded border p-3">
                <p className="font-medium">Previous Meeting Minutes</p>
                <p className="text-sm text-muted-foreground">PDF, 245 KB</p>
              </div>
              <div className="rounded border p-3">
                <p className="font-medium">Operational KPI Dashboard</p>
                <p className="text-sm text-muted-foreground">XLSX, 1.2 MB</p>
              </div>
              <div className="rounded border p-3">
                <p className="font-medium">Team Building Options</p>
                <p className="text-sm text-muted-foreground">PPTX, 3.5 MB</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
