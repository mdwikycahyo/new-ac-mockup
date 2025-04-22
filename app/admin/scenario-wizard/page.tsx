import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Handshake,
  HeartHandshake,
  Puzzle,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function ScenarioWizardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Assessment Scenario</h1>
        <p className="text-muted-foreground">
          Design a scenario to assess a specific competency through a series of micro-tasks
        </p>
      </div>

      <div className="mb-8">
        <WizardSteps currentStep={1} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step 1: Select Competency</CardTitle>
          <CardDescription>Choose the competency this scenario will assess</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {competencies.map((competency) => (
              <CompetencyCard
                key={competency.id}
                competency={competency}
                href={`/admin/scenario-wizard/tasks?competency=${competency.id}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WizardSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    { number: 1, name: "Select Competency" },
    { number: 2, name: "Choose Tasks" },
    { number: 3, name: "Configure Details" },
    { number: 4, name: "Preview" },
    { number: 5, name: "Publish" },
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

function CompetencyCard({
  competency,
  href,
}: {
  competency: {
    id: string
    name: string
    description: string
    icon: React.ElementType
    scenarioCount: number
  }
  href: string
}) {
  const Icon = competency.icon

  return (
    <Link href={href} className="block">
      <Card className="h-full transition-all hover:border-primary/50 hover:shadow-sm">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-full bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">{competency.scenarioCount} scenarios</div>
          </div>
          <h3 className="mb-2 font-medium">{competency.name}</h3>
          <p className="mb-4 flex-1 text-sm text-muted-foreground">{competency.description}</p>
          <Button className="w-full justify-between">
            Select <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}

const competencies = [
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Ability to identify issues, analyze information, and implement solutions",
    icon: Puzzle,
    scenarioCount: 5,
  },
  {
    id: "continuous-improvement",
    name: "Continuous Improvement",
    description: "Commitment to ongoing enhancement of processes and outcomes",
    icon: Sparkles,
    scenarioCount: 3,
  },
  {
    id: "customer-orientation",
    name: "Customer Orientation",
    description: "Focus on understanding and meeting customer needs effectively",
    icon: HeartHandshake,
    scenarioCount: 4,
  },
  {
    id: "business-acumen",
    name: "Business Acumen",
    description: "Understanding of business operations, markets, and strategic objectives",
    icon: Briefcase,
    scenarioCount: 2,
  },
  {
    id: "disciplined-execution",
    name: "Disciplined Execution",
    description: "Ability to implement plans methodically and achieve consistent results",
    icon: CheckCircle,
    scenarioCount: 3,
  },
  {
    id: "coaching-performance",
    name: "Coaching for Performance",
    description: "Skill in developing others through guidance and feedback",
    icon: Users,
    scenarioCount: 1,
  },
  {
    id: "collaboration",
    name: "Collaboration",
    description: "Effectiveness in working with others to achieve shared goals",
    icon: Handshake,
    scenarioCount: 6,
  },
  {
    id: "technology-savvy",
    name: "Technology Savvy",
    description: "Proficiency in leveraging technology to improve processes and outcomes",
    icon: Rocket,
    scenarioCount: 4,
  },
]
