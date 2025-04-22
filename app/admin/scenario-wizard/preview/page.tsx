"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function PreviewPublishPage() {
  const searchParams = useSearchParams()
  const competency = searchParams.get("competency") || "problem-solving"
  const competencyName = getCompetencyName(competency)

  const [activeTab, setActiveTab] = useState("overview")
  const [publishStep, setPublishStep] = useState(1)

  // In a real app, these would be fetched based on the selected tasks from the previous steps
  const selectedTasks = [
    {
      id: "1",
      title: "Customer Complaint Email",
      type: "email",
      duration: 10,
      description: "Respond to a customer complaint about a product defect",
    },
    {
      id: "2",
      title: "Technical Support Chat",
      type: "chat",
      duration: 15,
      description: "Help a customer troubleshoot a technical issue through chat",
    },
    {
      id: "3",
      title: "Process Improvement Document",
      type: "document",
      duration: 20,
      description: "Review and suggest improvements to a business process document",
    },
  ]

  const totalDuration = selectedTasks.reduce((sum, task) => sum + task.duration, 0)

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Assessment Scenario</h1>
        <p className="text-muted-foreground">
          Design a scenario to assess <span className="font-medium text-foreground">{competencyName}</span> through a
          series of micro-tasks
        </p>
      </div>

      <div className="mb-8">
        <WizardSteps currentStep={4} />
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {selectedTasks.map((task) => (
            <TabsTrigger key={task.id} value={task.id}>
              {task.title}
            </TabsTrigger>
          ))}
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Overview</CardTitle>
              <CardDescription>Review your assessment scenario before publishing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Scenario Details</h3>
                  <div className="rounded-md border p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Competency</p>
                        <p>{competencyName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Duration</p>
                        <p>{totalDuration} minutes</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Number of Tasks</p>
                        <p>{selectedTasks.length} tasks</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Difficulty</p>
                        <p>Medium</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Task Sequence</h3>
                  <div className="space-y-3">
                    {selectedTasks.map((task, index) => (
                      <div key={task.id} className="flex items-center gap-3 rounded-md border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                          <TaskIcon type={task.type} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Step {index + 1}
                            </Badge>
                            <p className="font-medium">{task.title}</p>
                            <Badge variant="outline" className="text-xs">
                              {task.duration} min
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Scenario Flow</h3>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center md:flex-row">
                        {selectedTasks.map((task, index) => (
                          <div key={task.id} className="flex flex-col items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                              <TaskIcon type={task.type} className="h-6 w-6 text-primary" />
                            </div>
                            <p className="mt-2 text-xs font-medium">{task.title}</p>
                            {index < selectedTasks.length - 1 && (
                              <ArrowRight className="mx-4 my-2 h-6 w-6 rotate-90 text-muted-foreground md:rotate-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {selectedTasks.map((task) => (
          <TabsContent key={task.id} value={task.id}>
            <Card>
              <CardHeader>
                <CardTitle>Task Preview: {task.title}</CardTitle>
                <CardDescription>Preview how this task will appear to participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-md border">
                    <div className="border-b bg-muted/50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TaskIcon type={task.type} className="h-5 w-5" />
                          <h3 className="font-medium">{task.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {task.duration} min
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Instructions</h4>
                          <p className="text-sm text-muted-foreground">
                            {task.type === "email" &&
                              "Respond to the customer complaint email. Address their concerns and provide a solution that balances customer satisfaction with company policy."}
                            {task.type === "chat" &&
                              "Provide technical support to a customer experiencing issues with their software. Diagnose the problem and guide them to a solution using clear, non-technical language."}
                            {task.type === "document" &&
                              "Review the attached business process document and identify at least three areas for improvement. For each area, provide specific recommendations that would increase efficiency, reduce costs, or improve quality."}
                          </p>
                        </div>

                        {task.type === "email" && <EmailTaskPreview />}
                        {task.type === "chat" && <ChatTaskPreview />}
                        {task.type === "document" && <DocumentTaskPreview />}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="publish">
          <Card>
            <CardHeader>
              <CardTitle>Publish Scenario</CardTitle>
              <CardDescription>Finalize and publish your assessment scenario</CardDescription>
            </CardHeader>
            <CardContent>
              {publishStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="scenario-title">Scenario Title</Label>
                      <Input
                        id="scenario-title"
                        defaultValue={`${competencyName} Assessment Scenario`}
                        placeholder="Enter a descriptive title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scenario-description">Scenario Description</Label>
                      <Textarea
                        id="scenario-description"
                        rows={3}
                        defaultValue={`This scenario assesses ${competencyName.toLowerCase()} through a series of practical tasks that simulate real workplace situations.`}
                        placeholder="Describe the purpose and content of this scenario"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="scenario-category">Category</Label>
                        <Select defaultValue={competency}>
                          <SelectTrigger id="scenario-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="problem-solving">Problem Solving</SelectItem>
                            <SelectItem value="customer-orientation">Customer Orientation</SelectItem>
                            <SelectItem value="business-acumen">Business Acumen</SelectItem>
                            <SelectItem value="leadership">Leadership</SelectItem>
                            <SelectItem value="communication">Communication</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scenario-difficulty">Overall Difficulty</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="scenario-difficulty">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scenario-tags">Tags</Label>
                      <Input
                        id="scenario-tags"
                        defaultValue={`${competencyName}, Assessment, Workplace Skills`}
                        placeholder="Enter comma-separated tags"
                      />
                      <p className="text-xs text-muted-foreground">
                        Add tags to help categorize and find this scenario later
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/admin/scenario-wizard/configure?competency=${competency}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Link>
                    </Button>
                    <Button onClick={() => setPublishStep(2)}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {publishStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Assign Participants</h3>
                      <p className="text-sm text-muted-foreground">
                        Select participants to assign this scenario to, or publish without assigning
                      </p>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="participant1" />
                          <Label htmlFor="participant1" className="font-normal">
                            Alex Johnson (alex.johnson@example.com)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="participant2" />
                          <Label htmlFor="participant2" className="font-normal">
                            Sarah Williams (sarah.williams@example.com)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="participant3" />
                          <Label htmlFor="participant3" className="font-normal">
                            Michael Brown (michael.brown@example.com)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="participant4" />
                          <Label htmlFor="participant4" className="font-normal">
                            Emily Davis (emily.davis@example.com)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="participant5" />
                          <Label htmlFor="participant5" className="font-normal">
                            James Wilson (james.wilson@example.com)
                          </Label>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Select All
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="due-date">Due Date (Optional)</Label>
                      <Input id="due-date" type="date" />
                      <p className="text-xs text-muted-foreground">
                        Set a deadline for participants to complete this scenario
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="send-notification" defaultChecked />
                        <Label htmlFor="send-notification" className="font-normal">
                          Send notification to participants
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="send-reminder" />
                        <Label htmlFor="send-reminder" className="font-normal">
                          Send reminder 2 days before due date
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setPublishStep(1)}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" asChild>
                        <Link href="/admin/scenarios">Save as Draft</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/admin/scenarios">
                          <Check className="mr-2 h-4 w-4" /> Publish Scenario
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function WizardSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, name: "Select Competency" },
    { number: 2, name: "Choose Tasks" },
    { number: 3, name: "Configure Details" },
    { number: 4, name: "Preview & Publish" },
  ]

  return (
    <div className="relative mb-8">
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
      <ol className="relative z-10 flex justify-between">
        {steps.map((step) => (
          <li key={step.number} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                step.number === currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.number < currentStep
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`ml-2 hidden text-sm md:block ${
                step.number === currentStep ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function TaskIcon({ type, className = "h-5 w-5 text-muted-foreground" }: { type: string; className?: string }) {
  switch (type) {
    case "email":
      return <Mail className={className} />
    case "chat":
      return <MessageSquare className={className} />
    case "document":
      return <FileText className={className} />
    case "calendar":
      return <Calendar className={className} />
    case "meeting":
      return <Users className={className} />
    case "call":
      return <Phone className={className} />
    default:
      return <FileText className={className} />
  }
}

function EmailTaskPreview() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border p-4">
        <div className="space-y-2">
          <div className="space-y-1">
            <p className="text-sm font-medium">From: Jamie Smith &lt;jamie.smith@example.com&gt;</p>
            <p className="text-sm font-medium">Subject: Defective Product Complaint</p>
          </div>
          <div className="space-y-2 text-sm">
            <p>Dear Customer Service,</p>
            <p>
              I purchased your XYZ product last week and it stopped working after just two days of normal use. This is
              completely unacceptable for a premium-priced item. I've already wasted hours trying to make it work.
            </p>
            <p>
              I demand a full refund plus compensation for my wasted time. If I don't hear back within 24 hours, I'll be
              posting negative reviews online and contacting consumer protection agencies.
            </p>
            <p>
              Disappointed customer,
              <br />
              Jamie Smith
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Your Response</h4>
        <Textarea rows={8} placeholder="Compose your response to the customer..." />
      </div>

      <div className="flex justify-end">
        <Button>Submit Response</Button>
      </div>
    </div>
  )
}

function ChatTaskPreview() {
  return (
    <div className="space-y-4">
      <div className="h-64 overflow-y-auto rounded-md border p-4">
        <div className="space-y-3">
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg bg-muted p-3">
              <p className="text-sm">
                Hi, I'm trying to install your software but keep getting an error code E-1234. I've tried restarting my
                computer but it's still not working. Can you help me?
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg bg-primary/10 p-3">
              <p className="text-sm">
                Hello! I'd be happy to help you with the installation issue. Could you please tell me which operating
                system you're using?
              </p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg bg-muted p-3">
              <p className="text-sm">I'm using Windows 11, the latest update.</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg bg-muted p-3">
              <p className="text-sm">
                The error happens right after I click "Install" and the progress bar gets to about 50%.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input placeholder="Type your response..." className="flex-1" />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  )
}

function DocumentTaskPreview() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="border-b bg-muted/50 p-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <p className="text-sm font-medium">Business Process Document.pdf</p>
          </div>
        </div>
        <div className="h-64 overflow-y-auto p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Customer Onboarding Process</h3>
            <p className="text-sm">
              This document outlines the current process for onboarding new customers to our enterprise software
              platform. The process consists of 7 steps that typically take 14 business days to complete.
            </p>
            <h4 className="text-base font-medium">Process Steps:</h4>
            <ol className="space-y-2 text-sm">
              <li>
                <strong>Initial Contact (Day 1):</strong> Sales team collects customer information and requirements.
                Information is manually entered into the CRM system.
              </li>
              <li>
                <strong>Contract Processing (Days 2-5):</strong> Legal team reviews and processes contract. Paper
                documents are sent via courier for signature.
              </li>
              <li>
                <strong>Account Setup (Days 6-7):</strong> Operations team creates customer account in three separate
                systems (billing, support, and product).
              </li>
              <li>
                <strong>Technical Configuration (Days 8-10):</strong> Engineering team configures the software according
                to customer specifications.
              </li>
              <li>
                <strong>Quality Assurance (Days 11-12):</strong> QA team verifies configuration and performs testing.
              </li>
              <li>
                <strong>Training Scheduling (Day 13):</strong> Training team contacts customer to schedule initial
                training session.
              </li>
              <li>
                <strong>Handover to Support (Day 14):</strong> Customer is introduced to their dedicated support
                contact.
              </li>
            </ol>
            <p className="text-sm">
              <strong>Known Issues:</strong> Customers frequently complain about the lengthy onboarding time. There have
              been instances of data entry errors when transferring information between systems. Training sessions are
              often delayed due to scheduling conflicts.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Improvement Recommendations</h4>
        <Textarea
          rows={8}
          placeholder="Identify at least three areas for improvement and provide specific recommendations..."
        />
      </div>

      <div className="flex justify-end">
        <Button>Submit Analysis</Button>
      </div>
    </div>
  )
}

function getCompetencyName(id: string) {
  const competencyMap: Record<string, string> = {
    "problem-solving": "Problem Solving",
    "continuous-improvement": "Continuous Improvement",
    "customer-orientation": "Customer Orientation",
    "business-acumen": "Business Acumen",
    "disciplined-execution": "Disciplined Execution",
    "coaching-performance": "Coaching for Performance",
    collaboration: "Collaboration",
    "technology-savvy": "Technology Savvy",
  }
  return competencyMap[id] || "Unknown Competency"
}
