"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Calendar, FileText, Mail, MessageSquare, Phone, Users } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ConfigureTasksPage() {
  const searchParams = useSearchParams()
  const competency = searchParams.get("competency") || "problem-solving"
  const competencyName = getCompetencyName(competency)

  // In a real app, these would be fetched based on the selected tasks from the previous step
  const selectedTasks = [
    {
      id: "1",
      title: "Customer Complaint Email",
      type: "email",
      duration: 10,
    },
    {
      id: "2",
      title: "Technical Support Chat",
      type: "chat",
      duration: 15,
    },
    {
      id: "3",
      title: "Process Improvement Document",
      type: "document",
      duration: 20,
    },
  ]

  const [activeTab, setActiveTab] = useState(selectedTasks[0].id)

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
        <WizardSteps currentStep={3} />
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="mb-4">
            {selectedTasks.map((task) => (
              <TabsTrigger key={task.id} value={task.id}>
                {task.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Configure <span className="font-medium text-foreground">{selectedTasks.length}</span> tasks
          </div>
        </div>

        {selectedTasks.map((task) => (
          <TabsContent key={task.id} value={task.id}>
            <TaskConfigurationCard task={task} />
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/admin/scenario-wizard/tasks?competency=${competency}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/scenario-wizard/preview?competency=${competency}`}>
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function TaskConfigurationCard({ task }: { task: { id: string; title: string; type: string; duration: number } }) {
  const Icon = getTaskIcon(task.type)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{getTaskTypeLabel(task.type)} task</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {task.type === "email" && <EmailTaskConfiguration />}
        {task.type === "chat" && <ChatTaskConfiguration />}
        {task.type === "document" && <DocumentTaskConfiguration />}
        {task.type === "calendar" && <CalendarTaskConfiguration />}
        {task.type === "meeting" && <MeetingTaskConfiguration />}
        {task.type === "call" && <CallTaskConfiguration />}
      </CardContent>
    </Card>
  )
}

function EmailTaskConfiguration() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="task-title">Task Title</Label>
          <Input id="task-title" defaultValue="Customer Complaint Email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="task-instructions">Instructions for Participant</Label>
          <Textarea
            id="task-instructions"
            rows={4}
            defaultValue="Respond to the customer complaint email. Address their concerns and provide a solution that balances customer satisfaction with company policy."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time-limit">Time Limit (minutes)</Label>
            <Input id="time-limit" type="number" defaultValue={10} min={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="difficulty">
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
          <Label htmlFor="scoring-criteria">Scoring Criteria</Label>
          <Textarea
            id="scoring-criteria"
            rows={3}
            defaultValue="- Professionalism (25%)
- Problem resolution (25%)
- Customer empathy (25%)
- Policy adherence (25%)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email-subject">Email Subject</Label>
          <Input id="email-subject" defaultValue="Defective Product Complaint" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email-content">Email Content</Label>
          <Textarea
            id="email-content"
            rows={6}
            defaultValue="Dear Customer Service,

I purchased your XYZ product last week and it stopped working after just two days of normal use. This is completely unacceptable for a premium-priced item. I've already wasted hours trying to make it work.

I demand a full refund plus compensation for my wasted time. If I don't hear back within 24 hours, I'll be posting negative reviews online and contacting consumer protection agencies.

Disappointed customer,
Jamie Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expected-behaviors">Expected Behaviors</Label>
          <Textarea
            id="expected-behaviors"
            rows={4}
            defaultValue="- Acknowledges customer's frustration
- Offers a clear solution (replacement or refund)
- Maintains professional tone despite customer's anger
- Follows company policy while prioritizing customer satisfaction
- Provides clear next steps"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hints">Hints (Optional)</Label>
          <Textarea id="hints" rows={2} placeholder="Add hints that can be shown to participants if needed" />
        </div>
      </div>
    </div>
  )
}

function ChatTaskConfiguration() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="chat-title">Task Title</Label>
          <Input id="chat-title" defaultValue="Technical Support Chat" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chat-instructions">Instructions for Participant</Label>
          <Textarea
            id="chat-instructions"
            rows={4}
            defaultValue="Provide technical support to a customer experiencing issues with their software. Diagnose the problem and guide them to a solution using clear, non-technical language."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="chat-time-limit">Time Limit (minutes)</Label>
            <Input id="chat-time-limit" type="number" defaultValue={15} min={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="chat-difficulty">Difficulty Level</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="chat-difficulty">
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
          <Label htmlFor="chat-scenario">Chat Scenario</Label>
          <Select defaultValue="software-issue">
            <SelectTrigger id="chat-scenario">
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software-issue">Software Installation Issue</SelectItem>
              <SelectItem value="account-access">Account Access Problem</SelectItem>
              <SelectItem value="data-recovery">Data Recovery Request</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="chat-scoring">Scoring Criteria</Label>
          <Textarea
            id="chat-scoring"
            rows={3}
            defaultValue="- Technical accuracy (30%)
- Communication clarity (30%)
- Customer service (20%)
- Efficiency of resolution (20%)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="chat-initial-message">Initial Customer Message</Label>
          <Textarea
            id="chat-initial-message"
            rows={3}
            defaultValue="Hi, I'm trying to install your software but keep getting an error code E-1234. I've tried restarting my computer but it's still not working. Can you help me?"
          />
        </div>

        <div className="space-y-2">
          <Label>Chat Simulation Options</Label>
          <div className="space-y-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="delayed-responses">Simulate Delayed Responses</Label>
                <p className="text-xs text-muted-foreground">Add realistic delays between customer messages</p>
              </div>
              <Switch id="delayed-responses" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="typing-indicators">Show Typing Indicators</Label>
                <p className="text-xs text-muted-foreground">Display when the customer is typing</p>
              </div>
              <Switch id="typing-indicators" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="follow-up-questions">Include Follow-up Questions</Label>
                <p className="text-xs text-muted-foreground">
                  Customer will ask additional questions based on responses
                </p>
              </div>
              <Switch id="follow-up-questions" defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="chat-expected-behaviors">Expected Behaviors</Label>
          <Textarea
            id="chat-expected-behaviors"
            rows={4}
            defaultValue="- Greets customer professionally
- Asks clarifying questions about the error
- Provides step-by-step troubleshooting instructions
- Confirms resolution before ending chat
- Offers additional assistance"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="chat-hints">Hints (Optional)</Label>
          <Textarea id="chat-hints" rows={2} placeholder="Add hints that can be shown to participants if needed" />
        </div>
      </div>
    </div>
  )
}

function DocumentTaskConfiguration() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-title">Task Title</Label>
          <Input id="document-title" defaultValue="Process Improvement Document" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-instructions">Instructions for Participant</Label>
          <Textarea
            id="document-instructions"
            rows={4}
            defaultValue="Review the attached business process document and identify at least three areas for improvement. For each area, provide specific recommendations that would increase efficiency, reduce costs, or improve quality."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="document-time-limit">Time Limit (minutes)</Label>
            <Input id="document-time-limit" type="number" defaultValue={20} min={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="document-difficulty">Difficulty Level</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="document-difficulty">
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
          <Label htmlFor="document-type">Document Type</Label>
          <Select defaultValue="process-flow">
            <SelectTrigger id="document-type">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="process-flow">Process Flow</SelectItem>
              <SelectItem value="policy">Policy Document</SelectItem>
              <SelectItem value="report">Analysis Report</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-scoring">Scoring Criteria</Label>
          <Textarea
            id="document-scoring"
            rows={3}
            defaultValue="- Problem identification (25%)
- Quality of recommendations (25%)
- Business impact analysis (25%)
- Implementation feasibility (25%)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="document-upload">Document File</Label>
          <div className="flex items-center gap-2">
            <Input id="document-upload" type="file" className="flex-1" />
            <Button variant="outline">Upload</Button>
          </div>
          <p className="text-xs text-muted-foreground">Upload a PDF, Word, or text document (max 5MB)</p>
        </div>

        <div className="space-y-2">
          <Label>Document Interaction Options</Label>
          <div className="space-y-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-annotations">Allow Annotations</Label>
                <p className="text-xs text-muted-foreground">
                  Participants can highlight and add notes to the document
                </p>
              </div>
              <Switch id="allow-annotations" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="track-changes">Track Changes</Label>
                <p className="text-xs text-muted-foreground">Record all edits made to the document</p>
              </div>
              <Switch id="track-changes" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reference-materials">Include Reference Materials</Label>
                <p className="text-xs text-muted-foreground">Provide additional context documents</p>
              </div>
              <Switch id="reference-materials" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-response-format">Response Format</Label>
          <RadioGroup defaultValue="inline-comments" id="document-response-format">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inline-comments" id="inline-comments" />
              <Label htmlFor="inline-comments">Inline Comments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="separate-document" id="separate-document" />
              <Label htmlFor="separate-document">Separate Document</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="structured-form" id="structured-form" />
              <Label htmlFor="structured-form">Structured Form</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="document-expected-behaviors">Expected Behaviors</Label>
          <Textarea
            id="document-expected-behaviors"
            rows={4}
            defaultValue="- Identifies key inefficiencies in the process
- Provides specific, actionable recommendations
- Considers business constraints and feasibility
- Prioritizes improvements by impact
- Supports recommendations with clear rationale"
          />
        </div>
      </div>
    </div>
  )
}

function CalendarTaskConfiguration() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="calendar-title">Task Title</Label>
          <Input id="calendar-title" defaultValue="Project Schedule Review" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="calendar-instructions">Instructions for Participant</Label>
          <Textarea
            id="calendar-instructions"
            rows={4}
            defaultValue="Review the project calendar with multiple conflicting priorities. Reschedule meetings and deadlines to optimize the project timeline while ensuring all critical milestones are met."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calendar-time-limit">Time Limit (minutes)</Label>
            <Input id="calendar-time-limit" type="number" defaultValue={15} min={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calendar-difficulty">Difficulty Level</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="calendar-difficulty">
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
          <Label htmlFor="calendar-scenario">Calendar Scenario</Label>
          <Select defaultValue="project-deadline">
            <SelectTrigger id="calendar-scenario">
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-deadline">Project Deadline Conflicts</SelectItem>
              <SelectItem value="resource-allocation">Resource Allocation</SelectItem>
              <SelectItem value="stakeholder-meetings">Stakeholder Meeting Coordination</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calendar-scoring">Scoring Criteria</Label>
          <Textarea
            id="calendar-scoring"
            rows={3}
            defaultValue="- Priority management (30%)
- Resource optimization (25%)
- Conflict resolution (25%)
- Communication of changes (20%)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Calendar Constraints</Label>
          <div className="space-y-4 rounded-md border p-4">
            <div className="space-y-2">
              <Label htmlFor="fixed-events">Fixed Events</Label>
              <Textarea
                id="fixed-events"
                rows={3}
                defaultValue="- Board Meeting (May 15, 10:00-12:00)
- Client Demo (May 17, 14:00-15:30)
- Quarterly Review (May 20, 09:00-11:00)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="movable-events">Movable Events</Label>
              <Textarea
                id="movable-events"
                rows={3}
                defaultValue="- Team Planning Session (4 hours)
- Developer Sync (1 hour)
- QA Review (2 hours)
- Design Review (1.5 hours)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadlines">Deadlines</Label>
              <Textarea
                id="deadlines"
                rows={2}
                defaultValue="- Feature Freeze: May 18
- Final Delivery: May 22"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Calendar Interaction Options</Label>
          <div className="space-y-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="drag-drop">Enable Drag and Drop</Label>
                <p className="text-xs text-muted-foreground">Allow events to be moved via drag and drop</p>
              </div>
              <Switch id="drag-drop" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="conflict-warnings">Show Conflict Warnings</Label>
                <p className="text-xs text-muted-foreground">Display warnings when events conflict</p>
              </div>
              <Switch id="conflict-warnings" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="resource-view">Show Resource Allocation</Label>
                <p className="text-xs text-muted-foreground">Display team member availability</p>
              </div>
              <Switch id="resource-view" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="calendar-expected-behaviors">Expected Behaviors</Label>
          <Textarea
            id="calendar-expected-behaviors"
            rows={4}
            defaultValue="- Prioritizes events based on business impact
- Resolves scheduling conflicts efficiently
- Ensures adequate preparation time between related events
- Communicates schedule changes clearly
- Maintains critical path for project completion"
          />
        </div>
      </div>
    </div>
  )
}

function MeetingTaskConfiguration() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="meeting-title">Task Title</Label>
          <Input id="meeting-title" defaultValue="Team Meeting Simulation" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meeting-instructions">Instructions for Participant</Label>
          <Textarea
            id="meeting-instructions"
            rows={4}
            defaultValue="Lead a virtual team meeting to address a business challenge. Facilitate discussion, manage different personalities, and guide the team to a consensus on next steps."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="meeting-time-limit">Time Limit (minutes)</Label>
            <Input id="meeting-time-limit" type="number" defaultValue={25} min={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meeting-difficulty">Difficulty Level</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="meeting-difficulty">
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
          <Label htmlFor="meeting-scenario">Meeting Scenario</Label>
          <Select defaultValue="project-challenge">
            <SelectTrigger id="meeting-scenario">
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-challenge">Project Challenge Discussion</SelectItem>
              <SelectItem value="team-conflict">Team Conflict Resolution</SelectItem>
              <SelectItem value="strategy-planning">Strategy Planning Session</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meeting-scoring">Scoring Criteria</Label>
          <Textarea
            id="meeting-scoring"
            rows={3}
            defaultValue="- Meeting facilitation (25%)
- Stakeholder management (25%)
- Problem-solving approach (25%)
- Decision quality and consensus (25%)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Meeting Participants</Label>
          <div className="space-y-4 rounded-md border p-4">
            <div className="space-y-2">
              <Label htmlFor="participant-roles">Participant Roles</Label>
              <Textarea
                id="participant-roles"
                rows={4}
                defaultValue="- Technical Lead (detail-oriented, resistant to change)
- Project Manager (deadline-focused, interrupts others)
- UX Designer (creative, tends to go off-topic)
- Business Analyst (analytical, asks challenging questions)
- Junior Developer (quiet, needs encouragement to contribute)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting-agenda">Meeting Agenda</Label>
              <Textarea
                id="meeting-agenda"
                rows={3}
                defaultValue="1. Project status update (5 min)
2. Discussion of current challenges (10 min)
3. Solution brainstorming (10 min)
4. Action item assignment (5 min)"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Meeting Simulation Options</Label>
          <div className="space-y-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="interruptions">Include Interruptions</Label>
                <p className="text-xs text-muted-foreground">Simulate realistic meeting interruptions</p>
              </div>
              <Switch id="interruptions" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="time-pressure">Add Time Pressure</Label>
                <p className="text-xs text-muted-foreground">Introduce unexpected time constraints</p>
              </div>
              <Switch id="time-pressure" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="technical-issues">Simulate Technical Issues</Label>
                <p className="text-xs text-muted-foreground">Include common virtual meeting technical problems</p>
              </div>
              <Switch id="technical-issues" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meeting-expected-behaviors">Expected Behaviors</Label>
          <Textarea
            id="meeting-expected-behaviors"
            rows={4}
            defaultValue="- Sets clear meeting objectives
- Manages time effectively
- Ensures all participants contribute
- Handles difficult personalities diplomatically
- Summarizes key points and action items
- Maintains focus on agenda and objectives"
          />
        </div>
      </div>
    </div>
  )
}

function CallTaskConfiguration() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="call-title">Task Title</Label>
          <Input id="call-title" defaultValue="Conference Call with Stakeholders" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="call-instructions">Instructions for Participant</Label>
          <Textarea
            id="call-instructions"
            rows={4}
            defaultValue="Lead a conference call with multiple stakeholders to discuss project status. Address concerns, manage expectations, and ensure all key updates are communicated effectively."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="call-time-limit">Time Limit (minutes)</Label>
            <Input id="call-time-limit" type="number" defaultValue={20} min={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="call-difficulty">Difficulty Level</Label>
            <Select defaultValue="medium">
              <SelectTrigger id="call-difficulty">
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
          <Label htmlFor="call-scenario">Call Scenario</Label>
          <Select defaultValue="project-update">
            <SelectTrigger id="call-scenario">
              <SelectValue placeholder="Select scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-update">Project Status Update</SelectItem>
              <SelectItem value="client-consultation">Client Consultation</SelectItem>
              <SelectItem value="crisis-management">Crisis Management</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="call-scoring">Scoring Criteria</Label>
          <Textarea
            id="call-scoring"
            rows={3}
            defaultValue="- Communication clarity (30%)
- Stakeholder management (25%)
- Problem resolution (25%)
- Time management (20%)"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Call Participants</Label>
          <div className="space-y-4 rounded-md border p-4">
            <div className="space-y-2">
              <Label htmlFor="call-participants">Participant Profiles</Label>
              <Textarea
                id="call-participants"
                rows={4}
                defaultValue="- Client Executive (concerned about timeline)
- Finance Director (focused on budget constraints)
- Technical Manager (worried about scope creep)
- Marketing Lead (eager to announce features)
- External Vendor (limited availability)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="call-agenda">Call Agenda</Label>
              <Textarea
                id="call-agenda"
                rows={3}
                defaultValue="1. Project status overview (5 min)
2. Budget and timeline update (5 min)
3. Risk assessment and mitigation (5 min)
4. Next steps and action items (5 min)"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Call Simulation Options</Label>
          <div className="space-y-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="background-noise">Include Background Noise</Label>
                <p className="text-xs text-muted-foreground">Simulate realistic call environment</p>
              </div>
              <Switch id="background-noise" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="connection-issues">Simulate Connection Issues</Label>
                <p className="text-xs text-muted-foreground">Include occasional audio quality problems</p>
              </div>
              <Switch id="connection-issues" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="unexpected-questions">Include Unexpected Questions</Label>
                <p className="text-xs text-muted-foreground">Participants will ask challenging unplanned questions</p>
              </div>
              <Switch id="unexpected-questions" defaultChecked />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="call-expected-behaviors">Expected Behaviors</Label>
          <Textarea
            id="call-expected-behaviors"
            rows={4}
            defaultValue="- Introduces all participants and establishes context
- Presents information clearly and concisely
- Manages different stakeholder concerns diplomatically
- Handles interruptions and questions effectively
- Summarizes key points and action items
- Ends call with clear next steps"
          />
        </div>
      </div>
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

function getTaskIcon(type: string) {
  switch (type) {
    case "email":
      return Mail
    case "chat":
      return MessageSquare
    case "document":
      return FileText
    case "calendar":
      return Calendar
    case "meeting":
      return Users
    case "call":
      return Phone
    default:
      return FileText
  }
}

function getTaskTypeLabel(type: string) {
  switch (type) {
    case "email":
      return "Email response"
    case "chat":
      return "Chat interaction"
    case "document":
      return "Document review"
    case "calendar":
      return "Calendar management"
    case "meeting":
      return "Meeting facilitation"
    case "call":
      return "Conference call"
    default:
      return type
  }
}
