import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, Plus, Trash } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateTemplatePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/templates">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Template</h1>
          <p className="text-muted-foreground">Create a new assessment template</p>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-4 w-full grid grid-cols-3">
          <TabsTrigger value="details">Template Details</TabsTrigger>
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Define the basic details for your template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input id="name" placeholder="e.g., Technical Skills Assessment" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a description of what this template is designed to assess"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="customer-service">Customer Service</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Enter tags separated by commas" />
                <p className="text-xs text-muted-foreground">Tags help with template discovery and organization</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/admin/templates">Cancel</Link>
            </Button>
            <Button>Continue to Structure</Button>
          </div>
        </TabsContent>

        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Template Structure</CardTitle>
              <CardDescription>Define the components and structure of your template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Components</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-3 w-3" /> Add Component
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <ComponentItem
                      title="Email Inbox Simulation"
                      description="Participant must respond to a series of emails with varying priorities"
                      type="Email"
                    />

                    <ComponentItem
                      title="Document Analysis"
                      description="Review and analyze a technical document for errors and improvements"
                      type="Document"
                    />

                    <ComponentItem
                      title="Problem-Solving Challenge"
                      description="Solve a complex technical problem with multiple possible solutions"
                      type="Challenge"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Component Order</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Order</SelectItem>
                      <SelectItem value="random">Randomized</SelectItem>
                      <SelectItem value="adaptive">Adaptive (based on performance)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-between">
            <Button variant="outline">Back to Details</Button>
            <Button>Continue to Settings</Button>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
              <CardDescription>Configure additional settings for your template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                  <Input id="timeLimit" type="number" defaultValue={60} min={5} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingScore">Passing Score (%)</Label>
                  <Input id="passingScore" type="number" defaultValue={70} min={0} max={100} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Scoring Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scoring method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Points-based</SelectItem>
                    <SelectItem value="percentage">Percentage-based</SelectItem>
                    <SelectItem value="rubric">Rubric-based</SelectItem>
                    <SelectItem value="custom">Custom Formula</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Results Visibility</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select when results are visible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediately after completion</SelectItem>
                    <SelectItem value="delayed">After a specified delay</SelectItem>
                    <SelectItem value="manual">After manual review</SelectItem>
                    <SelectItem value="never">Never (admin only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Access Control</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (all designers)</SelectItem>
                    <SelectItem value="restricted">Restricted (specific designers)</SelectItem>
                    <SelectItem value="private">Private (only you)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-between">
            <Button variant="outline">Back to Structure</Button>
            <div className="space-x-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>
                <Check className="mr-2 h-4 w-4" /> Create Template
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ComponentItem({ title, description, type }: { title: string; description: string; type: string }) {
  return (
    <div className="flex items-start justify-between rounded-md border p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// This component is used in the ComponentItem function but wasn't defined
// Let's define it here
function Badge({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) {
  const baseClass = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
  const variantClass =
    variant === "outline" ? "border border-input bg-background" : "bg-primary text-primary-foreground"

  return <span className={`${baseClass} ${variantClass} ${className || ""}`}>{children}</span>
}
