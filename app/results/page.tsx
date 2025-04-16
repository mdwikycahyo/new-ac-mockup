import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp, Download, ExternalLink } from "lucide-react"

export default function ResultsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Assessment Results</h1>
        <p className="text-muted-foreground">Review your performance and development feedback</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="competencies">Competencies</TabsTrigger>
          <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
          <TabsTrigger value="development">Development Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Summary</CardTitle>
              <CardDescription>Your overall performance across all competency areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary/20">
                    <div className="text-center">
                      <div className="text-4xl font-bold">72</div>
                      <div className="text-sm text-muted-foreground">Overall Score</div>
                    </div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-primary"
                      style={{ clipPath: "polygon(0 0, 72% 0, 72% 100%, 0 100%)" }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <ScoreCard title="Communication" score={85} description="Excellent written and verbal skills" />
                  <ScoreCard title="Problem Solving" score={68} description="Good analytical thinking" />
                  <ScoreCard title="Collaboration" score={76} description="Effective team contribution" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
                <CardDescription>Areas where you demonstrated strong performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronUp className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">Clear Communication</p>
                      <p className="text-sm text-muted-foreground">
                        You effectively conveyed complex information in emails and presentations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronUp className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">Time Management</p>
                      <p className="text-sm text-muted-foreground">
                        You prioritized tasks effectively and met all deadlines.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronUp className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">Adaptability</p>
                      <p className="text-sm text-muted-foreground">
                        You adjusted well to changing requirements and unexpected challenges.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Development Areas</CardTitle>
                <CardDescription>Areas where you can focus for improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronDown className="mt-0.5 h-4 w-4 text-amber-500" />
                    <div>
                      <p className="font-medium">Data Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        Consider developing stronger skills in interpreting complex data sets.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronDown className="mt-0.5 h-4 w-4 text-amber-500" />
                    <div>
                      <p className="font-medium">Conflict Resolution</p>
                      <p className="text-sm text-muted-foreground">
                        Work on addressing disagreements more proactively in team settings.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronDown className="mt-0.5 h-4 w-4 text-amber-500" />
                    <div>
                      <p className="font-medium">Strategic Planning</p>
                      <p className="text-sm text-muted-foreground">
                        Focus on developing longer-term perspectives when approaching projects.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competency Profile</CardTitle>
              <CardDescription>Detailed breakdown of your performance across key competency areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {competencies.map((competency) => (
                  <div key={competency.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{competency.name}</h3>
                      <span className="text-sm font-medium">{competency.score}/100</span>
                    </div>
                    <Progress value={competency.score} className="h-2" />
                    <p className="text-sm text-muted-foreground">{competency.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Feedback</CardTitle>
              <CardDescription>Specific observations from your assessment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {feedbackItems.map((item) => (
                  <div key={item.id} className="space-y-2 rounded-lg border p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs font-medium text-muted-foreground">Related competency:</span>
                      <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">{item.competency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Development Recommendations</CardTitle>
              <CardDescription>Suggested actions to enhance your professional capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {developmentItems.map((item) => (
                  <div key={item.id} className="space-y-2 rounded-lg border p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.resources.map((resource, index) => (
                        <Button key={index} variant="outline" size="sm" asChild>
                          <a href="#" className="inline-flex items-center gap-1">
                            {resource} <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button>
              <Download className="mr-2 h-4 w-4" /> Download Full Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ScoreCardProps {
  title: string
  score: number
  description: string
}

function ScoreCard({ title, score, description }: ScoreCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="font-medium">{title}</h3>
          <div className="my-2 text-3xl font-bold">{score}</div>
          <Progress value={score} className="h-2" />
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

const competencies = [
  {
    name: "Communication",
    score: 85,
    description: "Ability to convey information clearly and effectively in written and verbal forms.",
  },
  {
    name: "Problem Solving",
    score: 68,
    description: "Capacity to analyze situations, identify issues, and develop effective solutions.",
  },
  {
    name: "Collaboration",
    score: 76,
    description: "Effectiveness in working with others to achieve common goals and objectives.",
  },
  {
    name: "Time Management",
    score: 82,
    description: "Ability to prioritize tasks, meet deadlines, and allocate time efficiently.",
  },
  {
    name: "Adaptability",
    score: 79,
    description: "Capacity to adjust to changing circumstances and requirements.",
  },
  {
    name: "Strategic Thinking",
    score: 65,
    description: "Ability to consider long-term implications and develop forward-looking plans.",
  },
  {
    name: "Data Analysis",
    score: 62,
    description: "Skill in interpreting data, identifying patterns, and drawing meaningful conclusions.",
  },
]

const feedbackItems = [
  {
    id: 1,
    title: "Email Communication",
    description:
      "Your emails were clear, concise, and effectively addressed the recipient's needs. You demonstrated strong written communication skills.",
    competency: "Communication",
  },
  {
    id: 2,
    title: "Project Planning",
    description:
      "You created a well-structured project timeline, but could have included more contingency planning for potential delays.",
    competency: "Strategic Thinking",
  },
  {
    id: 3,
    title: "Team Discussion",
    description:
      "You actively participated in the team discussion and showed good listening skills, but could have been more assertive when presenting your ideas.",
    competency: "Collaboration",
  },
  {
    id: 4,
    title: "Data Interpretation",
    description:
      "You identified basic trends in the data but missed some of the more complex patterns that could have informed better decision-making.",
    competency: "Data Analysis",
  },
]

const developmentItems = [
  {
    id: 1,
    title: "Enhance Data Analysis Skills",
    description:
      "Focus on developing stronger analytical capabilities to better interpret complex data sets and draw meaningful insights.",
    resources: ["Online Course: Data Analysis Fundamentals", "Book: Data-Driven Decision Making"],
  },
  {
    id: 2,
    title: "Improve Conflict Resolution",
    description:
      "Develop techniques for addressing disagreements constructively and facilitating productive discussions when opinions differ.",
    resources: ["Workshop: Constructive Conflict Resolution", "Article: Navigating Workplace Disagreements"],
  },
  {
    id: 3,
    title: "Strengthen Strategic Planning",
    description: "Work on developing a more long-term perspective when approaching projects and business challenges.",
    resources: ["Webinar: Strategic Thinking for Professionals", "Mentor Program: Strategy Development"],
  },
]
