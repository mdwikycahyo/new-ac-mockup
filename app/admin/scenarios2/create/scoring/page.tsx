"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ArrowRight, MessageSquare, Mail, Calendar, FileText, Video } from "lucide-react"

// Competencies data
const competencies = [
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Identifying problems, preparing multiple solutions, implementing solutions",
    indicators: [
      "Identifies key issues in complex situations",
      "Develops multiple viable solutions",
      "Implements solutions effectively",
    ],
  },
  {
    id: "customer-orientation",
    name: "Customer Orientation",
    description: "Preserving customer dignity, engaging with customers, handling difficult situations",
    indicators: [
      "Maintains professional demeanor with difficult customers",
      "Proactively addresses customer needs",
      "Resolves complaints effectively",
    ],
  },
  {
    id: "disciplined-execution",
    name: "Disciplined Execution",
    description: "Building plans, assigning tasks, setting standards, monitoring progress, addressing barriers",
    indicators: [
      "Creates clear action plans",
      "Delegates tasks appropriately",
      "Monitors progress and adjusts as needed",
    ],
  },
  {
    id: "establish-collaboration",
    name: "Establish Collaboration",
    description: "Open communication, demonstrating engagement, facilitating agreement, showing respect",
    indicators: [
      "Encourages input from all team members",
      "Builds consensus on difficult issues",
      "Shows respect for diverse perspectives",
    ],
  },
]

// Mock activities
const activities = [
  { id: "a1", name: "Welcome Email", type: "email", icon: Mail },
  { id: "a2", name: "Team Chat", type: "chat", icon: MessageSquare },
  { id: "a3", name: "Project Meeting", type: "conference", icon: Video },
  { id: "a4", name: "Status Report", type: "document", icon: FileText },
  { id: "a5", name: "Deadline Setting", type: "calendar", icon: Calendar },
]

export default function ScoringScreen() {
  const [autoGenerateFeedback, setAutoGenerateFeedback] = useState(true)
  const [selectedCompetency, setSelectedCompetency] = useState("problem-solving")

  const competency = competencies.find((c) => c.id === selectedCompetency) || competencies[0]

  return (
    <div className="container mx-auto space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Assessment Logic & Scoring</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Step 3 of 4</span>
          <div className="flex h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div className="w-3/4 bg-primary"></div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="competencies" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="competencies" className="flex-1">
            Competency Scoring
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex-1">
            Feedback Templates
          </TabsTrigger>
          <TabsTrigger value="coverage" className="flex-1">
            Competency Coverage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="competencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competency Indicators & Scoring</CardTitle>
              <CardDescription>Define how each competency will be assessed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
                {/* Left sidebar - competency list */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Competency</label>
                  {competencies.map((comp) => (
                    <div
                      key={comp.id}
                      className={`cursor-pointer rounded-md border p-3 transition-colors hover:bg-accent ${
                        selectedCompetency === comp.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedCompetency(comp.id)}
                    >
                      <div className="font-medium">{comp.name}</div>
                      <div className="text-xs text-muted-foreground">{comp.indicators.length} indicators</div>
                    </div>
                  ))}
                </div>

                {/* Right content - scoring matrix */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">{competency.name}</h3>
                    <p className="text-sm text-muted-foreground">{competency.description}</p>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Indicator</TableHead>
                        <TableHead>Activities</TableHead>
                        <TableHead className="w-[150px]">Scoring Criteria</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {competency.indicators.map((indicator, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{indicator}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              {activities.map((activity) => {
                                // Randomly assign some activities to indicators for demo
                                const isAssigned = Math.random() > 0.5
                                if (!isAssigned) return null

                                return (
                                  <div
                                    key={activity.id}
                                    className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs"
                                  >
                                    <activity.icon className="h-3 w-3" />
                                    {activity.name}
                                  </div>
                                )
                              })}
                              <Button variant="outline" size="sm" className="h-6 rounded-full text-xs">
                                + Add
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select defaultValue="rubric">
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rubric">5-point Rubric</SelectItem>
                                <SelectItem value="binary">Yes/No</SelectItem>
                                <SelectItem value="scale">Scale (1-10)</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="space-y-4">
                    <h4 className="font-medium">Scoring Rubric</h4>
                    <div className="space-y-2">
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-medium">Score 5 (Excellent)</label>
                          <Textarea
                            placeholder="Description of excellent performance"
                            className="h-20 text-sm"
                            defaultValue="Demonstrates exceptional ability to identify complex problems, develop innovative solutions, and implement them effectively with minimal guidance."
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium">Score 4 (Good)</label>
                          <Textarea
                            placeholder="Description of good performance"
                            className="h-20 text-sm"
                            defaultValue="Consistently identifies problems accurately, develops multiple viable solutions, and implements them effectively with some guidance."
                          />
                        </div>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-medium">Score 3 (Satisfactory)</label>
                          <Textarea
                            placeholder="Description of satisfactory performance"
                            className="h-20 text-sm"
                            defaultValue="Usually identifies straightforward problems, develops workable solutions, and implements them with guidance."
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium">Score 2 (Needs Improvement)</label>
                          <Textarea
                            placeholder="Description of performance needing improvement"
                            className="h-20 text-sm"
                            defaultValue="Sometimes struggles to identify problems, may develop incomplete solutions, and needs significant guidance for implementation."
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium">Score 1 (Unsatisfactory)</label>
                        <Textarea
                          placeholder="Description of unsatisfactory performance"
                          className="h-20 text-sm"
                          defaultValue="Consistently fails to identify problems, develops inadequate solutions, or fails to implement solutions effectively even with guidance."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Templates</CardTitle>
              <CardDescription>Configure automated feedback for participants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Auto-generate Feedback</label>
                  <p className="text-xs text-muted-foreground">
                    Use AI to automatically generate personalized feedback based on performance
                  </p>
                </div>
                <Switch checked={autoGenerateFeedback} onCheckedChange={setAutoGenerateFeedback} />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Feedback Template</h3>
                <Textarea
                  rows={8}
                  className="font-mono text-sm"
                  defaultValue={`Based on your assessment performance, you demonstrated {{competency_level}} in {{competency_name}}. 

Your strengths include:
{{strengths}}

Areas for improvement:
{{areas_for_improvement}}

Recommended development actions:
{{development_actions}}`}
                />
                <p className="text-xs text-muted-foreground">
                  Use variables in double curly braces to insert dynamic content into the feedback template.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Competency-Specific Feedback</h3>
                <Tabs defaultValue="problem-solving">
                  <TabsList className="w-full">
                    {competencies.map((comp) => (
                      <TabsTrigger key={comp.id} value={comp.id} className="flex-1">
                        {comp.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {competencies.map((comp) => (
                    <TabsContent key={comp.id} value={comp.id} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">High Performance Feedback</label>
                        <Textarea
                          rows={3}
                          className="text-sm"
                          defaultValue={`You demonstrated excellent ${comp.name.toLowerCase()} skills. You effectively ${comp.indicators[0].toLowerCase()} and showed strong ability to ${comp.indicators[1].toLowerCase()}.`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Medium Performance Feedback</label>
                        <Textarea
                          rows={3}
                          className="text-sm"
                          defaultValue={`You showed satisfactory ${comp.name.toLowerCase()} skills. You were able to ${comp.indicators[0].toLowerCase()}, but could improve in how you ${comp.indicators[1].toLowerCase()}.`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Low Performance Feedback</label>
                        <Textarea
                          rows={3}
                          className="text-sm"
                          defaultValue={`You need to develop your ${comp.name.toLowerCase()} skills. Focus on improving how you ${comp.indicators[0].toLowerCase()} and practice ${comp.indicators[1].toLowerCase()}.`}
                        />
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competency Coverage</CardTitle>
              <CardDescription>Visualize how thoroughly each competency is assessed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competencies.map((comp) => {
                  // Random coverage percentage for demo
                  const coverage = Math.floor(Math.random() * 60) + 40
                  const activityCount = Math.floor(Math.random() * 3) + 1

                  return (
                    <div key={comp.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{comp.name}</span>
                        <span className="text-sm">
                          {coverage}% coverage ({activityCount} activities)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${coverage}%` }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {coverage < 50
                          ? "Consider adding more activities to assess this competency more thoroughly."
                          : "This competency has good coverage across multiple activities."}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/admin/scenarios2/create/builder">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href="/admin/scenarios2/create/preview">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
