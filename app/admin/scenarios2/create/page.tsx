"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Save } from "lucide-react"
import { useScenario } from "@/components/context/scenario-context"

// Competencies data based on the provided list
const competencyClusters = [
  {
    name: "Business Management Skills",
    competencies: [
      {
        id: "problem-solving",
        name: "Problem Solving",
        description: "Identifying problems, preparing multiple solutions, implementing solutions",
      },
      {
        id: "continuous-improvement",
        name: "Continuous Improvement",
        description: "Recognizing opportunities, gathering information, targeting and implementing improvement ideas",
      },
      {
        id: "customer-orientation",
        name: "Customer Orientation",
        description: "Preserving customer dignity, engaging with customers, handling difficult situations",
      },
      {
        id: "business-acumen",
        name: "Business Acumen",
        description: "Analyzing business data, integrating information from multiple sources",
      },
    ],
  },
  {
    name: "Leadership Effectiveness",
    competencies: [
      {
        id: "disciplined-execution",
        name: "Disciplined Execution",
        description: "Building plans, assigning tasks, setting standards, monitoring progress, addressing barriers",
      },
      {
        id: "coaching-performance",
        name: "Coaching for Performance",
        description: "Identifying performance issues, encouraging learning, providing feedback",
      },
    ],
  },
  {
    name: "Interpersonal Effectiveness",
    competencies: [
      {
        id: "establish-collaboration",
        name: "Establish Collaboration",
        description: "Open communication, demonstrating engagement, facilitating agreement, showing respect",
      },
    ],
  },
  {
    name: "Technical Competency",
    competencies: [
      {
        id: "technology-savvy",
        name: "Technology Savvy",
        description: "Utilizing technology, sharing knowledge, developing expertise",
      },
    ],
  },
]

export default function CreateScenario() {
  const {
    selectedCompetencies,
    setSelectedCompetencies,
    scenarioName,
    setScenarioName,
    scenarioDescription,
    setScenarioDescription,
    industry,
    setIndustry,
    department,
    setDepartment,
    targetRole,
    setTargetRole,
    duration,
    setDuration,
  } = useScenario()

  const handleCompetencyChange = (id: string) => {
    setSelectedCompetencies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="container mx-auto space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Assessment Scenario</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Step 1 of 4</span>
          <div className="flex h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div className="w-1/4 bg-primary"></div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scenario Details</CardTitle>
          <CardDescription>Define the basic information about your assessment scenario</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Scenario Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              placeholder="Enter scenario name"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Scenario Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Describe the scenario and its objectives"
              rows={4}
              value={scenarioDescription}
              onChange={(e) => setScenarioDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Role</label>
              <Select value={targetRole} onValueChange={setTargetRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="specialist">Specialist</SelectItem>
                  <SelectItem value="coordinator">Coordinator</SelectItem>
                  <SelectItem value="analyst">Analyst</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Target Competencies</label>
              <span className="text-xs text-muted-foreground">Select competencies to assess in this scenario</span>
            </div>

            <div className="space-y-6">
              {competencyClusters.map((cluster) => (
                <div key={cluster.name} className="space-y-2">
                  <h3 className="font-medium">{cluster.name}</h3>
                  <div className="space-y-2">
                    {cluster.competencies.map((competency) => (
                      <div key={competency.id} className="flex items-center gap-2">
                        <Checkbox
                          id={competency.id}
                          checked={!!selectedCompetencies[competency.id]}
                          onCheckedChange={() => handleCompetencyChange(competency.id)}
                        />
                        <label htmlFor={competency.id} className="flex cursor-pointer items-center gap-1 text-sm">
                          {competency.name}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{competency.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Estimated Duration</label>
              <span className="text-sm">{duration[0]} minutes</span>
            </div>
            <Slider value={duration} min={15} max={120} step={5} onValueChange={setDuration} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>15 min</span>
              <span>120 min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline">
          <Save className="mr-2 h-4 w-4" />
          Save as Draft
        </Button>
        <Button asChild>
          <Link href="/admin/scenarios2/create/builder">Next</Link>
        </Button>
      </div>
    </div>
  )
}
