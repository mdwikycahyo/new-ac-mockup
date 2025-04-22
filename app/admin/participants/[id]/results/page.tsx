import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, BarChart3, PieChart } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ParticipantResultsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the participant data based on the ID
  const participant = participants.find((p) => p.id === params.id) || participants[0]

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/participants">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{participant.name}'s Results</h1>
          <p className="text-muted-foreground">Assessment results and performance analysis</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Results
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Overall Score</CardTitle>
            <CardDescription>Aggregate performance across all assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-5xl font-bold">{participant.overallScore}%</div>
              <div className="mt-2 text-sm text-muted-foreground">{getScoreRating(participant.overallScore)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Completion Time</CardTitle>
            <CardDescription>Time taken to complete assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-5xl font-bold">{participant.completionTime}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {participant.completionTime < 45 ? "Faster than average" : "Average completion time"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Assessments Completed</CardTitle>
            <CardDescription>Number of completed assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-5xl font-bold">
                {participant.completedAssessments}/{participant.totalAssessments}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {participant.completedAssessments === participant.totalAssessments
                  ? "All assessments completed"
                  : "Some assessments pending"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="mt-6">
        <TabsList className="mb-4 w-full grid grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Peer Comparison</TabsTrigger>
          <TabsTrigger value="details">Detailed Results</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Overview of performance across key areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {participant.skillScores.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm font-medium">{skill.score}%</div>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                    <div className="text-xs text-muted-foreground">{skill.feedback}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills Analysis</CardTitle>
              <CardDescription>Detailed breakdown of skills and competencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full flex items-center justify-center">
                <PieChart className="mr-2 h-5 w-5" />
                <span className="text-muted-foreground">Skills radar chart visualization</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Peer Comparison</CardTitle>
              <CardDescription>Performance relative to other participants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full flex items-center justify-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                <span className="text-muted-foreground">Comparative performance visualization</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
              <CardDescription>Detailed results for each completed assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {participant.assessmentDetails.map((assessment, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{assessment.name}</div>
                      <Badge variant="outline" className={getScoreBadgeClass(assessment.score)}>
                        {assessment.score}%
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{assessment.description}</div>
                    <div className="mt-4 space-y-2">
                      <div className="text-sm font-medium">Key Observations</div>
                      <ul className="ml-5 list-disc text-sm text-muted-foreground">
                        {assessment.observations.map((observation, i) => (
                          <li key={i}>{observation}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/assessments/${assessment.id}/details`}>
                          <FileText className="mr-2 h-4 w-4" /> View Full Report
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getScoreRating(score: number) {
  if (score >= 90) return "Excellent"
  if (score >= 80) return "Very Good"
  if (score >= 70) return "Good"
  if (score >= 60) return "Satisfactory"
  return "Needs Improvement"
}

function getScoreBadgeClass(score: number) {
  if (score >= 90) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  if (score >= 70) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  if (score >= 50) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
}

const participants = [
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    overallScore: 87,
    completionTime: "42 min",
    completedAssessments: 1,
    totalAssessments: 1,
    skillScores: [
      { name: "Technical Knowledge", score: 92, feedback: "Excellent understanding of technical concepts" },
      {
        name: "Problem Solving",
        score: 85,
        feedback: "Strong analytical skills with room for improvement in complex scenarios",
      },
      {
        name: "Communication",
        score: 78,
        feedback: "Good communication skills, could improve in technical explanations",
      },
      { name: "Time Management", score: 90, feedback: "Excellent time management throughout the assessment" },
      { name: "Attention to Detail", score: 88, feedback: "Very good attention to detail with minor oversights" },
    ],
    assessmentDetails: [
      {
        id: "tech-1",
        name: "Technical Skills Assessment",
        score: 87,
        description: "Evaluation of technical knowledge and problem-solving abilities",
        observations: [
          "Demonstrated strong understanding of core technical concepts",
          "Efficiently solved most technical challenges",
          "Showed creativity in approaching complex problems",
          "Could improve documentation practices",
        ],
      },
    ],
  },
  {
    id: "7",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    overallScore: 82,
    completionTime: "38 min",
    completedAssessments: 1,
    totalAssessments: 1,
    skillScores: [
      { name: "Technical Knowledge", score: 85, feedback: "Very good understanding of technical concepts" },
      {
        name: "Problem Solving",
        score: 88,
        feedback: "Excellent problem-solving skills, especially in complex scenarios",
      },
      { name: "Communication", score: 75, feedback: "Good communication, could be more concise" },
      { name: "Time Management", score: 80, feedback: "Good time management throughout the assessment" },
      { name: "Attention to Detail", score: 82, feedback: "Good attention to detail with some minor oversights" },
    ],
    assessmentDetails: [
      {
        id: "tech-2",
        name: "Technical Skills Assessment",
        score: 82,
        description: "Evaluation of technical knowledge and problem-solving abilities",
        observations: [
          "Strong analytical approach to technical problems",
          "Good understanding of system architecture concepts",
          "Effective at troubleshooting complex issues",
          "Could improve in explaining technical concepts to non-technical audience",
        ],
      },
    ],
  },
  {
    id: "9",
    name: "David Thomas",
    email: "david.thomas@example.com",
    overallScore: 91,
    completionTime: "45 min",
    completedAssessments: 1,
    totalAssessments: 1,
    skillScores: [
      { name: "Project Planning", score: 94, feedback: "Exceptional project planning skills" },
      { name: "Resource Allocation", score: 88, feedback: "Very good at allocating resources efficiently" },
      { name: "Risk Management", score: 92, feedback: "Excellent risk identification and mitigation strategies" },
      { name: "Team Coordination", score: 90, feedback: "Very effective team coordination approach" },
      { name: "Stakeholder Communication", score: 89, feedback: "Strong stakeholder communication skills" },
    ],
    assessmentDetails: [
      {
        id: "pm-1",
        name: "Project Management Assessment",
        score: 91,
        description: "Evaluation of project management skills and methodologies",
        observations: [
          "Demonstrated exceptional project planning abilities",
          "Effectively identified and mitigated potential risks",
          "Strong understanding of resource allocation principles",
          "Excellent stakeholder management approach",
        ],
      },
    ],
  },
]
