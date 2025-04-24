import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export default function AddParticipantPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/participants">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Participant</h1>
          <p className="text-muted-foreground">Add a new participant to the assessment platform</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Participant Information</CardTitle>
            <CardDescription>Enter the basic information for the new participant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="participant@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position/Role</Label>
              <Input id="position" placeholder="e.g., Project Manager, Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="e.g., Engineering, Marketing" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any additional information about this participant" rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scenario Assignment</CardTitle>
            <CardDescription>Assign published scenarios to this participant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Available Published Scenarios</Label>
              <div className="max-h-[300px] overflow-y-auto pr-2 rounded-md border">
                {publishedScenarios.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-4 text-center">
                    No published scenarios available. Please publish scenarios first.
                  </div>
                ) : (
                  <div className="divide-y">
                    {publishedScenarios.map((scenario) => (
                      <div key={scenario.id} className="p-3 hover:bg-muted/50">
                        <div className="flex items-start">
                          <Checkbox id={`scenario-${scenario.id}`} className="mt-1" />
                          <div className="ml-3 flex-1">
                            <Label htmlFor={`scenario-${scenario.id}`} className="font-medium cursor-pointer">
                              {scenario.name}
                            </Label>
                            <div className="flex items-center mt-1 gap-2">
                              <Badge variant="outline" className="text-xs font-normal">
                                {scenario.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs font-normal">
                                {scenario.duration} min
                              </Badge>
                              <Badge variant="outline" className="text-xs font-normal">
                                {scenario.difficulty}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{scenario.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" />
            </div>

            <div className="space-y-2">
              <Label>Notification Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sendInvite" defaultChecked />
                  <Label htmlFor="sendInvite" className="font-normal">
                    Send invitation email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sendReminder" />
                  <Label htmlFor="sendReminder" className="font-normal">
                    Send reminder 2 days before due date
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/admin/participants">Cancel</Link>
        </Button>
        <div className="space-x-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>
            <Check className="mr-2 h-4 w-4" /> Add Participant
          </Button>
        </div>
      </div>
    </div>
  )
}

// Sample published scenarios data - in a real app, this would come from an API
const publishedScenarios = [
  {
    id: "1",
    name: "Technical Skills Assessment",
    type: "Technical Skills",
    description:
      "Evaluates core technical competencies through a series of practical challenges and problem-solving tasks.",
    duration: 45,
    difficulty: "Intermediate",
  },
  {
    id: "2",
    name: "Leadership Challenge",
    type: "Leadership",
    description: "Tests leadership abilities through team management scenarios and decision-making exercises.",
    duration: 60,
    difficulty: "Advanced",
  },
  {
    id: "3",
    name: "Project Management Simulation",
    type: "Project Management",
    description:
      "Simulates a complex project with resource constraints, timeline challenges, and stakeholder management.",
    duration: 90,
    difficulty: "Advanced",
  },
  {
    id: "4",
    name: "Customer Service Scenario",
    type: "Customer Service",
    description:
      "Evaluates customer service skills through realistic customer interaction scenarios and complaint handling.",
    duration: 30,
    difficulty: "Beginner",
  },
  {
    id: "5",
    name: "Communication Skills Evaluation",
    type: "Communication",
    description: "Assesses written and verbal communication skills through various business communication tasks.",
    duration: 40,
    difficulty: "Intermediate",
  },
  {
    id: "6",
    name: "Data Analysis Challenge",
    type: "Analytics",
    description: "Tests ability to analyze complex datasets and draw meaningful business insights.",
    duration: 50,
    difficulty: "Intermediate",
  },
  {
    id: "7",
    name: "Crisis Management Simulation",
    type: "Management",
    description: "Evaluates decision-making under pressure through simulated business crisis scenarios.",
    duration: 75,
    difficulty: "Expert",
  },
  {
    id: "8",
    name: "Sales Pitch Assessment",
    type: "Sales",
    description: "Assesses sales techniques and persuasion skills through realistic sales scenarios.",
    duration: 35,
    difficulty: "Intermediate",
  },
]
