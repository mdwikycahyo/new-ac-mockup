"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, AlertCircle, Info, Calendar, Clock, Users } from "lucide-react"

export function ProjectImpactAnalysis({ isOpen, onClose, onConfirm, newProject, existingProjects }) {
  const [activeTab, setActiveTab] = useState("timeline")
  const [impactData, setImpactData] = useState({
    timeline: {
      conflictingProjects: [],
      overlapPercentage: 0,
      riskLevel: "Low",
    },
    resources: {
      overallocation: 0,
      peakAllocation: 0,
      riskLevel: "Medium",
    },
    workload: {
      additionalHours: 0,
      weeklyIncrease: 0,
      riskLevel: "High",
    },
  })

  useEffect(() => {
    if (newProject && existingProjects) {
      // Calculate timeline impact
      const overlappingProjects = calculateOverlappingProjects(newProject, existingProjects)
      const overlapPercentage = Math.round((overlappingProjects.length / existingProjects.length) * 100)

      // Calculate resource impact
      const currentAllocation = existingProjects
        .filter((p) => p.status !== "Completed" && p.status !== "On hold")
        .reduce((sum, p) => sum + p.resourceAllocation, 0)
      const newAllocation = currentAllocation + (newProject.resourceAllocation || 0.5)
      const overallocation = Math.max(0, newAllocation - 1) * 100

      // Calculate workload impact
      const activeProjects = existingProjects.filter((p) => p.status === "In progress" || p.status === "Not started")
      const currentWorkload = activeProjects.reduce((sum, p) => sum + p.estimatedHours, 0)
      const additionalHours = newProject.estimatedHours || 40
      const weeklyIncrease = Math.round((additionalHours / currentWorkload) * 100)

      // Determine risk levels
      const timelineRisk = overlapPercentage > 50 ? "High" : overlapPercentage > 25 ? "Medium" : "Low"
      const resourceRisk = overallocation > 30 ? "High" : overallocation > 10 ? "Medium" : "Low"
      const workloadRisk = weeklyIncrease > 25 ? "High" : weeklyIncrease > 10 ? "Medium" : "Low"

      setImpactData({
        timeline: {
          conflictingProjects: overlappingProjects,
          overlapPercentage,
          riskLevel: timelineRisk,
        },
        resources: {
          overallocation,
          peakAllocation: Math.round(newAllocation * 100),
          riskLevel: resourceRisk,
        },
        workload: {
          additionalHours,
          weeklyIncrease,
          riskLevel: workloadRisk,
        },
      })
    }
  }, [newProject, existingProjects])

  const calculateOverlappingProjects = (newProject, existingProjects) => {
    if (!newProject || !newProject.startDate || !newProject.endDate) return []

    const newStart = new Date(newProject.startDate)
    const newEnd = new Date(newProject.endDate)

    return existingProjects.filter((project) => {
      if (project.status === "Completed") return false

      const projectStart = new Date(project.startDate)
      const projectEnd = new Date(project.endDate)

      return (
        (newStart <= projectEnd && newStart >= projectStart) ||
        (newEnd <= projectEnd && newEnd >= projectStart) ||
        (newStart <= projectStart && newEnd >= projectEnd)
      )
    })
  }

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> High Risk
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Medium Risk
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <Info className="h-3 w-3" /> Low Risk
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (!newProject) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Project Impact Analysis</DialogTitle>
          <DialogDescription>
            Adding "{newProject.title}" will impact your existing projects and workload. Review the analysis below.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">
                <Calendar className="h-4 w-4 mr-2" />
                Timeline Impact
              </TabsTrigger>
              <TabsTrigger value="resources">
                <Users className="h-4 w-4 mr-2" />
                Resource Impact
              </TabsTrigger>
              <TabsTrigger value="workload">
                <Clock className="h-4 w-4 mr-2" />
                Workload Impact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Timeline Conflicts</CardTitle>
                    {getRiskBadge(impactData.timeline.riskLevel)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Overlapping Projects</span>
                      <span className="font-medium">{impactData.timeline.conflictingProjects.length} projects</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Overlap Percentage</span>
                      <span className="font-medium">{impactData.timeline.overlapPercentage}% of active projects</span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Timeline Visualization</h4>
                      <div className="relative h-20 bg-muted rounded-md overflow-hidden">
                        {/* Timeline visualization */}
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div className="absolute top-0 left-1/4 w-1/2 h-6 bg-blue-200 rounded-sm flex items-center justify-center text-xs">
                            New Project
                          </div>

                          {impactData.timeline.conflictingProjects.map((project, index) => (
                            <div
                              key={project.id}
                              className="absolute h-4 bg-yellow-200 rounded-sm flex items-center justify-center text-xs overflow-hidden"
                              style={{
                                top: `${(index + 1) * 6 + 8}px`,
                                left: `${10 + index * 5}%`,
                                width: `${40 - index * 3}%`,
                              }}
                            >
                              {project.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Potential Conflicts</h4>
                      {impactData.timeline.conflictingProjects.length > 0 ? (
                        <ul className="space-y-2">
                          {impactData.timeline.conflictingProjects.map((project) => (
                            <li key={project.id} className="text-sm flex items-center">
                              <AlertCircle className="h-3 w-3 text-yellow-500 mr-2" />
                              <span>
                                <span className="font-medium">{project.title}</span> ({project.startDate} -{" "}
                                {project.endDate})
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No timeline conflicts detected.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Resource Allocation</CardTitle>
                    {getRiskBadge(impactData.resources.riskLevel)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Resource Allocation</span>
                      <span className="font-medium">
                        {impactData.resources.peakAllocation - Math.round(newProject.resourceAllocation * 100)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">New Resource Allocation</span>
                      <span className="font-medium">{impactData.resources.peakAllocation}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Resource Overallocation</span>
                      <span className="font-medium text-red-600">
                        {impactData.resources.overallocation > 0 ? `+${impactData.resources.overallocation}%` : "0%"}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Resource Allocation Visualization</h4>
                      <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${impactData.resources.peakAllocation > 100 ? "bg-red-500" : "bg-blue-500"}`}
                          style={{ width: `${Math.min(impactData.resources.peakAllocation, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">0%</span>
                        <span className="text-xs text-muted-foreground">50%</span>
                        <span className="text-xs text-muted-foreground">100%</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Resource Impact Analysis</h4>
                      {impactData.resources.overallocation > 0 ? (
                        <div className="text-sm space-y-2">
                          <p className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                            <span>
                              Your team will be overallocated by {impactData.resources.overallocation}%. Consider
                              adjusting timelines or adding resources.
                            </span>
                          </p>
                          <p className="text-muted-foreground">
                            Overallocation may lead to decreased productivity, quality issues, and potential burnout.
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Your team has sufficient capacity to handle this new project.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workload" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Workload Impact</CardTitle>
                    {getRiskBadge(impactData.workload.riskLevel)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Additional Hours</span>
                      <span className="font-medium">{impactData.workload.additionalHours} hours</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Weekly Workload Increase</span>
                      <span className="font-medium">{impactData.workload.weeklyIncrease}%</span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Weekly Workload Distribution</h4>
                      <div className="grid grid-cols-5 gap-2">
                        {[...Array(5)].map((_, i) => {
                          const height = 30 + Math.random() * 40
                          const newHeight = height * (1 + impactData.workload.weeklyIncrease / 100)

                          return (
                            <div key={i} className="flex flex-col items-center">
                              <div className="relative w-full h-24 flex items-end">
                                <div
                                  className="absolute bottom-0 w-full bg-blue-200 rounded-t-sm"
                                  style={{ height: `${height}%` }}
                                ></div>
                                <div
                                  className="absolute bottom-0 w-full bg-red-300 rounded-t-sm"
                                  style={{ height: `${newHeight - height}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-muted-foreground mt-1">Week {i + 1}</span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <div className="w-3 h-3 bg-blue-200 mr-1"></div> Current
                        </span>
                        <span className="mx-2">|</span>
                        <span className="flex items-center">
                          <div className="w-3 h-3 bg-red-300 mr-1"></div> Additional
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Workload Impact Analysis</h4>
                      {impactData.workload.riskLevel === "High" ? (
                        <div className="text-sm space-y-2">
                          <p className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                            <span>
                              Adding this project will significantly increase workload by{" "}
                              {impactData.workload.weeklyIncrease}%.
                            </span>
                          </p>
                          <p className="text-muted-foreground">
                            Consider extending timelines, reducing scope, or adding resources to mitigate the impact.
                          </p>
                        </div>
                      ) : impactData.workload.riskLevel === "Medium" ? (
                        <div className="text-sm space-y-2">
                          <p className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
                            <span>
                              Adding this project will moderately increase workload by{" "}
                              {impactData.workload.weeklyIncrease}%.
                            </span>
                          </p>
                          <p className="text-muted-foreground">
                            Monitor team capacity closely and be prepared to adjust priorities if needed.
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          The additional workload from this project is manageable within current capacity.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() =>
                setActiveTab(
                  activeTab === "timeline" ? "resources" : activeTab === "resources" ? "workload" : "timeline",
                )
              }
            >
              View {activeTab === "timeline" ? "Resources" : activeTab === "resources" ? "Workload" : "Timeline"}
            </Button>
            <Button onClick={onConfirm}>Add Project Anyway</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
