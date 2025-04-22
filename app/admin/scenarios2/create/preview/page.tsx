"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input as InputComponent } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  FileText,
  Video,
  AlertTriangle,
  Eye,
  Save,
  Upload,
  Users,
  CheckCircle,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Competencies data
const competencies = [
  { id: "problem-solving", name: "Problem Solving" },
  { id: "customer-orientation", name: "Customer Orientation" },
  { id: "disciplined-execution", name: "Disciplined Execution" },
  { id: "establish-collaboration", name: "Establish Collaboration" },
]

export default function PreviewAndTesting() {
  const [activeView, setActiveView] = useState<"split" | "participant">("split")
  const [activeTab, setActiveTab] = useState("overview")
  const [publishTab, setPublishTab] = useState("metadata")

  return (
    <div className="container mx-auto space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Preview & Testing</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Step 4 of 4</span>
          <div className="flex h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div className="w-full bg-primary"></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Marketing Campaign Management</h2>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            Ready for Testing
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setActiveView("participant")}
            className={activeView === "participant" ? "bg-accent" : ""}
          >
            <Eye className="mr-2 h-4 w-4" />
            View as Participant
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveView("split")}
            className={activeView === "split" ? "bg-accent" : ""}
          >
            Split View
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="overview" className="flex-1">
            Overview
          </TabsTrigger>
          <TabsTrigger value="email" className="flex-1">
            Email Task
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex-1">
            Chat Task
          </TabsTrigger>
          <TabsTrigger value="document" className="flex-1">
            Document Task
          </TabsTrigger>
          <TabsTrigger value="publish" className="flex-1">
            Publish
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className={`grid gap-6 ${activeView === "split" ? "lg:grid-cols-[1fr_350px]" : ""}`}>
            {/* Participant View */}
            <Card className="min-h-[600px]">
              <CardHeader>
                <CardTitle>Scenario Overview</CardTitle>
                <CardDescription>Summary of the assessment scenario</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Marketing Campaign Management</h3>
                  <p className="text-muted-foreground">
                    In this assessment, you will take on the role of a Marketing Specialist at TechInnovate, a
                    technology company preparing to launch a new product. You will need to manage various aspects of the
                    marketing campaign, including team communication, document preparation, and meeting coordination.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Your Role</h4>
                  <p className="text-muted-foreground">
                    As the Marketing Specialist, you are responsible for coordinating with team members, responding to
                    emails, participating in team discussions, and preparing marketing materials for the product launch.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Assessment Tasks</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-md border p-3">
                      <Mail className="mt-0.5 h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Welcome Email</div>
                        <p className="text-sm text-muted-foreground">
                          Read and respond to the welcome email from the Marketing Director with your initial thoughts
                          on the campaign.
                        </p>
                      </div>
                      <Badge className="ml-auto">15 min</Badge>
                    </div>

                    <div className="flex items-start gap-3 rounded-md border p-3">
                      <MessageSquare className="mt-0.5 h-5 w-5 text-indigo-500" />
                      <div>
                        <div className="font-medium">Team Chat Discussion</div>
                        <p className="text-sm text-muted-foreground">
                          Participate in a team chat to discuss campaign ideas and address concerns from team members.
                        </p>
                      </div>
                      <Badge className="ml-auto">20 min</Badge>
                    </div>

                    <div className="flex items-start gap-3 rounded-md border p-3">
                      <FileText className="mt-0.5 h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-medium">Campaign Brief</div>
                        <p className="text-sm text-muted-foreground">
                          Create a marketing brief document outlining the key messages and channels for the campaign.
                        </p>
                      </div>
                      <Badge className="ml-auto">25 min</Badge>
                    </div>

                    <div className="flex items-start gap-3 rounded-md border p-3">
                      <Video className="mt-0.5 h-5 w-5 text-red-500" />
                      <div>
                        <div className="font-medium">Team Meeting</div>
                        <p className="text-sm text-muted-foreground">
                          Participate in a virtual team meeting to present your ideas and get feedback from
                          stakeholders.
                        </p>
                      </div>
                      <Badge className="ml-auto">15 min</Badge>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="font-medium">Competencies Assessed</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {competencies.map((comp) => (
                      <Badge key={comp.id} variant="outline">
                        {comp.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Tracking - Only shown in split view */}
            {activeView === "split" && (
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Details</CardTitle>
                  <CardDescription>Assessment configuration summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Duration</span>
                      <span>75 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Number of Tasks</span>
                      <span>4 tasks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Competencies</span>
                      <span>4 competencies</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">AI Personas</span>
                      <span>3 personas</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">Diagnostic Feedback</h3>
                    <div className="rounded-md border-l-4 border-l-green-500 bg-green-50 p-3 dark:bg-green-950/20">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium text-green-700 dark:text-green-400">
                            All Competencies Covered
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-300">
                            Each competency is assessed in at least 2 activities
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border-l-4 border-l-amber-500 bg-amber-50 p-3 dark:bg-amber-950/20">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                        <div>
                          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Timing Consideration</p>
                          <p className="text-xs text-amber-600 dark:text-amber-300">
                            Total estimated time (75 min) exceeds target duration (60 min)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Task Distribution</h3>
                    <div className="h-4 overflow-hidden rounded-full bg-muted">
                      <div className="flex h-full">
                        <div className="h-full w-1/5 bg-blue-500"></div>
                        <div className="h-full w-1/4 bg-indigo-500"></div>
                        <div className="h-full w-1/3 bg-orange-500"></div>
                        <div className="h-full w-1/5 bg-red-500"></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span>Email (20%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                        <span>Chat (25%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                        <span>Document (35%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span>Meeting (20%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Refine Scenario
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <div className={`grid gap-6 ${activeView === "split" ? "lg:grid-cols-[1fr_350px]" : ""}`}>
            <Card className="min-h-[600px]">
              <CardHeader>
                <CardTitle>Email Task Preview</CardTitle>
                <CardDescription>How the email task will appear to participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="border-b bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Alex Johnson</div>
                          <div className="text-xs text-muted-foreground">Marketing Director</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">10:32 AM</div>
                    </div>
                    <div className="mt-2">
                      <div className="font-medium">Welcome to the Product Launch Project</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-4">Dear Marketing Specialist,</p>
                    <p className="mb-4">
                      Welcome to the TechInnovate marketing team! I'm excited to have you on board for our upcoming
                      product launch. As you know, we're preparing to release our new AI-powered productivity tool next
                      month, and we need to create a comprehensive marketing campaign.
                    </p>
                    <p className="mb-4">Please review the attached product brief and share your initial thoughts on:</p>
                    <ul className="mb-4 ml-6 list-disc">
                      <li>Key target audiences we should focus on</li>
                      <li>Primary marketing channels you recommend</li>
                      <li>Potential messaging themes that would resonate with our audience</li>
                    </ul>
                    <p className="mb-4">
                      The team will be meeting later this week to discuss our approach, so please respond with your
                      ideas by tomorrow. Feel free to ask any questions you might have.
                    </p>
                    <p className="mb-4">Looking forward to your input!</p>
                    <p>
                      Best regards,
                      <br />
                      Alex Johnson
                      <br />
                      Marketing Director
                      <br />
                      TechInnovate
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                      >
                        <FileText className="mr-1 h-3 w-3" />
                        Product_Brief.pdf
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        Priority
                      </Badge>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <Textarea placeholder="Type your response here..." className="mb-4" rows={6} />
                    <div className="flex justify-end">
                      <Button>Send Response</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {activeView === "split" && (
              <Card>
                <CardHeader>
                  <CardTitle>Task Assessment</CardTitle>
                  <CardDescription>Competencies assessed in this task</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Assessed Competencies</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-sm font-medium">Problem Solving</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-sm font-medium">Customer Orientation</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Assessment Criteria</h3>
                    <div className="space-y-2 text-sm">
                      <p>This task assesses the participant's ability to:</p>
                      <ul className="ml-6 list-disc space-y-1">
                        <li>Identify key marketing challenges</li>
                        <li>Develop appropriate targeting strategies</li>
                        <li>Communicate ideas clearly and professionally</li>
                        <li>Demonstrate understanding of customer needs</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">AI Response Logic</h3>
                    <div className="rounded-md border p-3">
                      <p className="text-sm">If participant mentions:</p>
                      <ul className="ml-6 list-disc space-y-1 text-sm">
                        <li>Social media strategy → Respond with questions about specific platforms</li>
                        <li>Budget concerns → Provide additional context about available resources</li>
                        <li>Timeline questions → Clarify the launch schedule</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <div className={`grid gap-6 ${activeView === "split" ? "lg:grid-cols-[1fr_350px]" : ""}`}>
            <Card className="min-h-[600px]">
              <CardHeader>
                <CardTitle>Chat Task Preview</CardTitle>
                <CardDescription>How the team chat task will appear to participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[500px] flex-col rounded-md border">
                  <div className="border-b bg-muted/50 p-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Marketing Team Chat</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="mt-1 h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">
                          Good morning team! I've just sent an email about the new product launch campaign. Let's use
                          this chat for quick updates and brainstorming.
                        </p>
                        <span className="mt-1 text-xs text-muted-foreground">10:35 AM</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Avatar className="mt-1 h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sam" />
                        <AvatarFallback>SR</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">
                          I've been talking to some of our existing customers about what they'd want to see in our new
                          product. They're particularly interested in the AI features and how they can save time on
                          daily tasks.
                        </p>
                        <span className="mt-1 text-xs text-muted-foreground">10:38 AM</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Avatar className="mt-1 h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Taylor" />
                        <AvatarFallback>TW</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">
                          I'm concerned about our timeline. The development team just told me they might need an extra
                          week for final testing. Should we adjust our marketing schedule or keep the original launch
                          date?
                        </p>
                        <span className="mt-1 text-xs text-muted-foreground">10:42 AM</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Avatar className="mt-1 h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">
                          @Marketing Specialist What do you think? Should we adjust our timeline or proceed as planned?
                          Also, what channels do you think would be most effective for highlighting the AI features Sam
                          mentioned?
                        </p>
                        <span className="mt-1 text-xs text-muted-foreground">10:45 AM</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t p-3">
                    <div className="flex items-center gap-2">
                      <InputComponent className="flex-1" placeholder="Type your message..." />
                      <Button>Send</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {activeView === "split" && (
              <Card>
                <CardHeader>
                  <CardTitle>Task Assessment</CardTitle>
                  <CardDescription>Competencies assessed in this task</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Assessed Competencies</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-sm font-medium">Problem Solving</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-sm font-medium">Establish Collaboration</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-sm font-medium">Disciplined Execution</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">AI Personas</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">Alex Johnson</div>
                          <div className="text-xs text-muted-foreground">Marketing Director</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sam" />
                          <AvatarFallback>SR</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">Sam Rivera</div>
                          <div className="text-xs text-muted-foreground">Customer Support Lead</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Taylor" />
                          <AvatarFallback>TW</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">Taylor Wong</div>
                          <div className="text-xs text-muted-foreground">Project Manager</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Response Patterns</h3>
                    <div className="rounded-md border p-3">
                      <p className="text-sm">The AI personas will respond based on:</p>
                      <ul className="ml-6 list-disc space-y-1 text-sm">
                        <li>How the participant addresses timeline concerns</li>
                        <li>Whether the participant asks clarifying questions</li>
                        <li>If the participant suggests specific marketing channels</li>
                        <li>How well the participant balances different stakeholder needs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="document" className="space-y-6">
          <div className={`grid gap-6 ${activeView === "split" ? "lg:grid-cols-[1fr_350px]" : ""}`}>
            <Card className="min-h-[600px]">
              <CardHeader>
                <CardTitle>Document Task Preview</CardTitle>
                <CardDescription>How the document creation task will appear to participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[500px] flex-col rounded-md border">
                  <div className="border-b bg-muted/50 p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-orange-500" />
                        <span className="font-medium">Marketing Campaign Brief</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Save Draft
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 p-4">
                    <div className="mb-4 space-y-2">
                      <label className="text-sm font-medium">Document Title</label>
                      <InputComponent defaultValue="AI Productivity Tool - Marketing Campaign Brief" />
                    </div>

                    <div className="mb-4 space-y-2">
                      <label className="text-sm font-medium">Executive Summary</label>
                      <Textarea placeholder="Provide a brief overview of the marketing campaign..." rows={3} />
                    </div>

                    <div className="mb-4 space-y-2">
                      <label className="text-sm font-medium">Target Audience</label>
                      <Textarea placeholder="Describe the primary and secondary target audiences..." rows={3} />
                    </div>

                    <div className="mb-4 space-y-2">
                      <label className="text-sm font-medium">Key Messaging</label>
                      <Textarea placeholder="Outline the main messages and value propositions..." rows={3} />
                    </div>

                    <div className="mb-4 space-y-2">
                      <label className="text-sm font-medium">Marketing Channels</label>
                      <Textarea placeholder="List and justify the marketing channels to be used..." rows={3} />
                    </div>

                    <div className="mb-4 space-y-2">
                      <label className="text-sm font-medium">Timeline & Milestones</label>
                      <Textarea placeholder="Provide a timeline with key milestones..." rows={3} />
                    </div>
                  </div>

                  <div className="border-t p-3">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Submit Document</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {activeView === "split" && (
              <Card>
                <CardHeader>
                  <CardTitle>Task Assessment</CardTitle>
                  <CardDescription>Competencies assessed in this task</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Assessed Competencies</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-sm font-medium">Business Acumen</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-sm font-medium">Customer Orientation</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-sm font-medium">Disciplined Execution</span>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Assessment Criteria</h3>
                    <div className="space-y-2 text-sm">
                      <p>This task assesses the participant's ability to:</p>
                      <ul className="ml-6 list-disc space-y-1">
                        <li>Structure information in a clear, logical manner</li>
                        <li>Identify appropriate target audiences</li>
                        <li>Develop compelling messaging that addresses customer needs</li>
                        <li>Create realistic timelines and milestones</li>
                        <li>Select appropriate marketing channels for the product</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Scoring Rubric</h3>
                    <div className="rounded-md border p-3">
                      <p className="text-sm font-medium">5 - Excellent</p>
                      <p className="text-xs text-muted-foreground">
                        Comprehensive brief with clear audience segmentation, compelling messaging, appropriate channel
                        selection, and realistic timeline
                      </p>
                    </div>
                    <div className="rounded-md border p-3">
                      <p className="text-sm font-medium">3 - Satisfactory</p>
                      <p className="text-xs text-muted-foreground">
                        Basic brief with general audience description, standard messaging, common channels, and basic
                        timeline
                      </p>
                    </div>
                    <div className="rounded-md border p-3">
                      <p className="text-sm font-medium">1 - Needs Improvement</p>
                      <p className="text-xs text-muted-foreground">
                        Incomplete brief with vague audience, generic messaging, limited channel selection, and
                        unrealistic timeline
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="publish" className="space-y-6">
          <Tabs value={publishTab} onValueChange={setPublishTab} className="space-y-6">
            <TabsList className="w-full">
              <TabsTrigger value="metadata" className="flex-1">
                Scenario Metadata
              </TabsTrigger>
              <TabsTrigger value="participants" className="flex-1">
                Assign Participants
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1">
                Schedule
              </TabsTrigger>
              <TabsTrigger value="finalize" className="flex-1">
                Finalize
              </TabsTrigger>
            </TabsList>

            <TabsContent value="metadata" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Metadata</CardTitle>
                  <CardDescription>Add final details before publishing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Scenario Name</label>
                      <InputComponent defaultValue="Marketing Campaign Management" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Scenario ID</label>
                      <InputComponent defaultValue="MKT-2023-001" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      defaultValue="In this assessment, participants will take on the role of a Marketing Specialist at TechInnovate, managing various aspects of a product launch campaign."
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Difficulty Level</label>
                      <Select defaultValue="intermediate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Estimated Duration</label>
                      <Select defaultValue="75">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="75">75 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <InputComponent defaultValue="marketing, product launch, communication, teamwork" />
                    <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Thumbnail Image</label>
                    <div className="flex items-center gap-4">
                      <img
                        src="/placeholder.svg?height=100&width=200"
                        alt="Scenario thumbnail"
                        className="h-24 w-40 rounded-md border object-cover"
                      />
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participants" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assign Participants</CardTitle>
                  <CardDescription>Select who will take this assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <InputComponent placeholder="Search participants..." className="pl-10" />
                    </div>
                    <Button>
                      <User className="mr-2 h-4 w-4" />
                      Add Participants
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <div className="flex items-center justify-between border-b p-3">
                      <div className="flex items-center gap-2">
                        <Checkbox id="select-all" />
                        <label htmlFor="select-all" className="text-sm font-medium">
                          Select All
                        </label>
                      </div>
                      <span className="text-sm text-muted-foreground">3 participants selected</span>
                    </div>

                    <div className="divide-y">
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox id="user-1" checked />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">john.doe@example.com</div>
                          </div>
                        </div>
                        <Badge>Marketing Team</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox id="user-2" checked />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">Jane Smith</div>
                            <div className="text-xs text-muted-foreground">jane.smith@example.com</div>
                          </div>
                        </div>
                        <Badge>Marketing Team</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox id="user-3" checked />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>RJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">Robert Johnson</div>
                            <div className="text-xs text-muted-foreground">robert.j@example.com</div>
                          </div>
                        </div>
                        <Badge>Marketing Team</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox id="user-4" />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>EW</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">Emily Wilson</div>
                            <div className="text-xs text-muted-foreground">emily.w@example.com</div>
                          </div>
                        </div>
                        <Badge variant="outline">Sales Team</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <Checkbox id="user-5" />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                            <AvatarFallback>MB</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">Michael Brown</div>
                            <div className="text-xs text-muted-foreground">michael.b@example.com</div>
                          </div>
                        </div>
                        <Badge variant="outline">Product Team</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Assessment</CardTitle>
                  <CardDescription>Set timing for the assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <InputComponent type="date" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Date</label>
                      <InputComponent type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="send-notification" defaultChecked />
                      <label htmlFor="send-notification" className="text-sm">
                        Send email notification to participants
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notification Message</label>
                    <Textarea
                      rows={4}
                      defaultValue="You have been assigned to complete the Marketing Campaign Management assessment. Please complete this assessment between the specified dates. The assessment will take approximately 75 minutes to complete."
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="time-limit" />
                      <label htmlFor="time-limit" className="text-sm">
                        Enforce time limit
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      If enabled, participants must complete the assessment within the estimated duration once started
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finalize" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Finalize & Publish</CardTitle>
                  <CardDescription>Review and publish your assessment scenario</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md border bg-muted/30 p-4">
                    <h3 className="mb-2 font-medium">Marketing Campaign Management</h3>
                    <div className="mb-4 grid gap-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span>Intermediate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>75 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tasks:</span>
                        <span>4 tasks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Competencies:</span>
                        <span>4 competencies</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Participants:</span>
                        <span>3 assigned</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Schedule:</span>
                        <span>Not set</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">marketing</Badge>
                      <Badge variant="outline">product launch</Badge>
                      <Badge variant="outline">communication</Badge>
                      <Badge variant="outline">teamwork</Badge>
                    </div>
                  </div>

                  <div className="rounded-md border-l-4 border-l-amber-500 bg-amber-50 p-4 dark:bg-amber-950/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium text-amber-700 dark:text-amber-400">Pre-publish Checklist</p>
                        <ul className="mt-2 space-y-1 text-sm text-amber-600 dark:text-amber-300">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            All tasks have been configured
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            All competencies have assessment criteria
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Participants have been assigned
                          </li>
                          <li className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Assessment schedule has not been set
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="confirm-publish" />
                      <label htmlFor="confirm-publish" className="text-sm">
                        I confirm that this assessment scenario is ready to be published
                      </label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Save as Draft
                  </Button>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Publish Scenario
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/admin/scenarios2/create/scoring">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Publish Scenario
          </Button>
        </div>
      </div>
    </div>
  )
}

// These components are needed for the preview page
function Checkbox(props) {
  return (
    <div
      className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      {...props}
    >
      {props.checked && <CheckIcon className="h-3 w-3 text-current" />}
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Search(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
