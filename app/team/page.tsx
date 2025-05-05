"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, AlertTriangle, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"

export default function TeamPage() {
  // Helper function to get workload classification
  const getWorkloadClassification = (utilization: number) => {
    if (utilization <= 30) return "Underload"
    if (utilization <= 70) return "Balanced"
    if (utilization <= 100) return "Full Load"
    if (utilization <= 120) return "Overload"
    if (utilization <= 150) return "Heavy Overload"
    return "Critical Overload"
  }

  // Helper function to get workload color
  const getWorkloadColor = (utilization: number) => {
    if (utilization <= 30) return "bg-blue-500"
    if (utilization <= 70) return "bg-green-500"
    if (utilization <= 100) return "bg-yellow-500"
    if (utilization <= 120) return "bg-orange-500"
    if (utilization <= 150) return "bg-red-500"
    return "bg-purple-600"
  }

  // Helper function to get badge variant
  const getWorkloadBadgeVariant = (utilization: number) => {
    if (utilization <= 30) return "secondary"
    if (utilization <= 70) return "success"
    if (utilization <= 100) return "warning"
    if (utilization <= 120) return "destructive"
    if (utilization <= 150) return "destructive"
    return "destructive"
  }

  // Helper function to get performance trend icon
  const getPerformanceTrendIcon = (trend: string) => {
    switch (trend) {
      case "Up":
        return <TrendingUp className="h-4 w-4" />
      case "Down":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  // Helper function to calculate the position on the workload bar
  const getWorkloadPosition = (utilization: number) => {
    // Map the utilization percentage to the position on the bar
    // The bar has markers at 0%, 30%, 70%, 100%, 150%
    // For values over 150%, cap at 100% of the bar width
    if (utilization > 150) return 100

    // For values between 0-150%, calculate the position proportionally
    // 0% -> 0% of bar width
    // 150% -> 100% of bar width
    return (utilization / 150) * 100
  }

  // Sample data for team members
  const teamMembers = [
    {
      id: "employee-a",
      name: "Employee A",
      role: "Senior Software Engineer",
      performanceTrend: "Up",
      workloadData: {
        assignedTasks: 5,
        capacity: 8,
        utilization: 62.5,
        impactDescription:
          "Optimal workload allows for focused work and quality output. Performance is trending upward as the employee has time to innovate and refine solutions.",
      },
      strengths: ["Prioritization", "Communicating Ideas"],
      performanceData: [
        { week: "Week 1", completion: 3.8, teamAvg: 4.0 },
        { week: "Week 2", completion: 3.5, teamAvg: 3.8 },
        { week: "Week 3", completion: 4.2, teamAvg: 3.9 },
        { week: "Week 4", completion: 4.0, teamAvg: 4.1 },
        { week: "Week 5", completion: 4.7, teamAvg: 4.0 },
        { week: "Week 6", completion: 5.3, teamAvg: 4.2 },
        { week: "Week 7", completion: 5.8, teamAvg: 4.3 },
      ],
      skillsData: [
        { skill: "Technical Knowledge", value: 80, industry: 70 },
        { skill: "Problem Solving", value: 90, industry: 75 },
        { skill: "Communication", value: 70, industry: 80 },
        { skill: "Teamwork", value: 85, industry: 85 },
        { skill: "Leadership", value: 60, industry: 65 },
      ],
      description:
        "A technical expert with strong problem-solving skills. Prefers to work independently but collaborates effectively when needed. Communicates clearly but concisely, focusing on technical accuracy rather than elaboration.",
      metrics: {
        adaptability: 75,
        growthMindset: 80,
        engagementLevel: 70,
        influenceLevel: 65,
      },
    },
    {
      id: "employee-b",
      name: "Employee B",
      role: "Junior Product Manager",
      performanceTrend: "Down",
      workloadData: {
        assignedTasks: 14,
        capacity: 8,
        utilization: 175,
        impactDescription:
          "Critical overload is negatively impacting performance. The excessive workload has led to missed deadlines, decreased quality, and signs of burnout.",
      },
      strengths: ["UX Research", "Technical Knowledge"],
      performanceData: [
        { week: "Week 1", completion: 5.2, teamAvg: 4.0 },
        { week: "Week 2", completion: 5.5, teamAvg: 3.8 },
        { week: "Week 3", completion: 4.8, teamAvg: 3.9 },
        { week: "Week 4", completion: 4.3, teamAvg: 4.1 },
        { week: "Week 5", completion: 3.7, teamAvg: 4.0 },
        { week: "Week 6", completion: 2.9, teamAvg: 4.2 },
        { week: "Week 7", completion: 2.4, teamAvg: 4.3 },
      ],
      skillsData: [
        { skill: "Technical Knowledge", value: 60, industry: 70 },
        { skill: "UX Research", value: 85, industry: 75 },
        { skill: "Communication", value: 90, industry: 80 },
        { skill: "Teamwork", value: 80, industry: 85 },
        { skill: "Data-driven Thinking", value: 65, industry: 75 },
      ],
      description:
        "Coming from marketing, he understands how people think and interact with products, making him strong in UX-driven decisions. Naturally collaborative, he navigates discussions with ease, aligning teams around user-first solutions. His communication is engaging, often focused on narrative and persuasion, but can lack depth in technical discussions.",
      metrics: {
        adaptability: 90,
        growthMindset: 60,
        engagementLevel: 85,
        influenceLevel: 40,
      },
    },
    {
      id: "employee-c",
      name: "Employee C",
      role: "Product Manager",
      performanceTrend: "Down",
      workloadData: {
        assignedTasks: 2,
        capacity: 8,
        utilization: 25,
        impactDescription:
          "Underload is leading to disengagement. With too few tasks, the employee lacks challenge and purpose, resulting in decreased motivation and performance.",
      },
      strengths: ["Communicating Ideas", "Technical Knowledge"],
      performanceData: [
        { week: "Week 1", completion: 4.5, teamAvg: 4.0 },
        { week: "Week 2", completion: 4.3, teamAvg: 3.8 },
        { week: "Week 3", completion: 4.0, teamAvg: 3.9 },
        { week: "Week 4", completion: 3.8, teamAvg: 4.1 },
        { week: "Week 5", completion: 3.2, teamAvg: 4.0 },
        { week: "Week 6", completion: 2.8, teamAvg: 4.2 },
        { week: "Week 7", completion: 2.5, teamAvg: 4.3 },
      ],
      skillsData: [
        { skill: "Technical Knowledge", value: 75, industry: 70 },
        { skill: "Strategic Planning", value: 90, industry: 80 },
        { skill: "Communication", value: 85, industry: 80 },
        { skill: "Teamwork", value: 70, industry: 85 },
        { skill: "Data-driven Thinking", value: 80, industry: 75 },
      ],
      description:
        "An experienced product manager with strong strategic vision. Excels at planning and roadmapping but has been showing signs of disengagement recently. Has deep product knowledge and communicates well with stakeholders, though team collaboration has been declining.",
      metrics: {
        adaptability: 65,
        growthMindset: 50,
        engagementLevel: 40,
        influenceLevel: 75,
      },
    },
    {
      id: "employee-d",
      name: "Employee D",
      role: "UX Designer",
      performanceTrend: "Neutral",
      workloadData: {
        assignedTasks: 8,
        capacity: 8,
        utilization: 100,
        impactDescription:
          "Full workload is maintaining steady performance. The employee is operating at capacity, which provides sufficient challenge without causing stress or burnout.",
      },
      strengths: ["Visual Design", "User Research"],
      performanceData: [
        { week: "Week 1", completion: 4.2, teamAvg: 4.0 },
        { week: "Week 2", completion: 3.9, teamAvg: 3.8 },
        { week: "Week 3", completion: 4.5, teamAvg: 3.9 },
        { week: "Week 4", completion: 4.0, teamAvg: 4.1 },
        { week: "Week 5", completion: 4.3, teamAvg: 4.0 },
        { week: "Week 6", completion: 3.8, teamAvg: 4.2 },
        { week: "Week 7", completion: 4.1, teamAvg: 4.3 },
      ],
      skillsData: [
        { skill: "Visual Design", value: 90, industry: 75 },
        { skill: "User Research", value: 85, industry: 70 },
        { skill: "Prototyping", value: 80, industry: 75 },
        { skill: "Communication", value: 75, industry: 80 },
        { skill: "Teamwork", value: 70, industry: 85 },
      ],
      description:
        "A talented designer with a strong eye for visual aesthetics and user experience. Consistently delivers high-quality designs that balance creativity with usability. Works well with product and engineering teams to implement designs effectively.",
      metrics: {
        adaptability: 70,
        growthMindset: 75,
        engagementLevel: 80,
        influenceLevel: 60,
      },
    },
  ]

  // State to track the selected team member
  const [selectedMemberId, setSelectedMemberId] = useState(teamMembers[1].id)

  // Get the selected member
  const selectedMember = teamMembers.find((member) => member.id === selectedMemberId) || teamMembers[0]

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left sidebar with team members list */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search Employee..." className="pl-8" />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`p-4 mb-4 border-b rounded-r-xl hover:bg-muted/90 cursor-pointer ${
                member.id === selectedMemberId ? "bg-muted/90" : ""
              }`}
              onClick={() => setSelectedMemberId(member.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance Trend</span>
                  <Badge
                    variant={
                      member.performanceTrend === "Up"
                        ? "success"
                        : member.performanceTrend === "Down"
                          ? "destructive"
                          : "secondary"
                    }
                    className="flex items-center gap-1"
                  >
                    {getPerformanceTrendIcon(member.performanceTrend)}
                    {member.performanceTrend}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Workload Balance</span>
                  <Badge variant={getWorkloadBadgeVariant(member.workloadData.utilization)}>
                    {getWorkloadClassification(member.workloadData.utilization)}
                  </Badge>
                </div>
                <div className="text-sm">
                  <span>Key Strengths & Growth Areas</span>
                  <div className="mt-1 space-y-1">
                    {member.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? "bg-green-500" : "bg-red-500"}`}></div>
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content area with selected member details */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 border-b flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {selectedMember.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{selectedMember.name}</h1>
            <p className="text-muted-foreground">{selectedMember.role}</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 gap-6">
          {/* Performance Chart */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Performance</h2>
                <Badge
                  className="flex items-center gap-1"
                  variant={
                    selectedMember.performanceTrend === "Up"
                      ? "success"
                      : selectedMember.performanceTrend === "Down"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {getPerformanceTrendIcon(selectedMember.performanceTrend)}
                  {selectedMember.performanceTrend}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Weekly task completion rate</p>

              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={selectedMember.performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 6]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completion"
                      name={`${selectedMember.name}`}
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="teamAvg" name="Team Average" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Workload Visualization */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Workload Balance</h2>
                <Badge variant={getWorkloadBadgeVariant(selectedMember.workloadData.utilization)}>
                  {getWorkloadClassification(selectedMember.workloadData.utilization)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Current workload distribution and capacity</p>

              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md h-[100px] mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getWorkloadColor(selectedMember.workloadData.utilization)}`}
                        style={{
                          width: `${getWorkloadPosition(selectedMember.workloadData.utilization)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-muted-foreground">
                    <span className="absolute left-0">0%</span>
                    <span className="absolute" style={{ left: "20%" }}>
                      30%
                    </span>
                    <span className="absolute" style={{ left: "46.7%" }}>
                      70%
                    </span>
                    <span className="absolute" style={{ left: "66.7%" }}>
                      100%
                    </span>
                    <span className="absolute right-0">150%+</span>
                  </div>
                  <div
                    className="absolute bottom-8"
                    style={{
                      left: `${getWorkloadPosition(selectedMember.workloadData.utilization)}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary mx-auto" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
                  <div className="p-4 bg-muted/20 rounded-lg text-center">
                    <h3 className="font-medium mb-1">Assigned Tasks</h3>
                    <p className="text-2xl font-bold">{selectedMember.workloadData.assignedTasks}</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg text-center">
                    <h3 className="font-medium mb-1">Capacity</h3>
                    <p className="text-2xl font-bold">{selectedMember.workloadData.capacity}</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg text-center">
                    <h3 className="font-medium mb-1">Utilization</h3>
                    <p className="text-2xl font-bold">{selectedMember.workloadData.utilization}%</p>
                  </div>
                </div>

                {/* Workload impact description */}
                <div className="w-full p-4 bg-muted/10 rounded-lg border border-muted">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        selectedMember.performanceTrend === "Down"
                          ? "bg-red-100"
                          : selectedMember.performanceTrend === "Up"
                            ? "bg-green-100"
                            : "bg-blue-100"
                      }`}
                    >
                      {selectedMember.performanceTrend === "Down" ? (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      ) : selectedMember.performanceTrend === "Up" ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <Minus className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">Workload Impact on Performance</h3>
                      <p className="text-sm text-muted-foreground">{selectedMember.workloadData.impactDescription}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Strengths & Growth Areas */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Strengths & Growth Areas</h2>
              <p className="text-sm text-muted-foreground mb-4">Core competencies and areas for improvements</p>

              <div className="flex flex-col">
                {/* Radar Chart - Full Width */}
                <div className="h-[400px] w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={selectedMember.skillsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={selectedMember.name}
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Industry Standard"
                        dataKey="industry"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0}
                        strokeWidth={2}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Who They Are Section - Below Radar Chart */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Who They Are at Work</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{selectedMember.description}</p>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Adaptability</span>
                        <span>{selectedMember.metrics.adaptability}%</span>
                      </div>
                      <Progress value={selectedMember.metrics.adaptability} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Growth Mindset</span>
                        <span>{selectedMember.metrics.growthMindset}%</span>
                      </div>
                      <Progress value={selectedMember.metrics.growthMindset} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Engagement Level</span>
                        <span>{selectedMember.metrics.engagementLevel}%</span>
                      </div>
                      <Progress value={selectedMember.metrics.engagementLevel} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Influence Level</span>
                        <span>{selectedMember.metrics.influenceLevel}%</span>
                      </div>
                      <Progress value={selectedMember.metrics.influenceLevel} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
