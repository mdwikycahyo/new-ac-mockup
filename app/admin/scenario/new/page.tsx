import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ChevronRight, Clock, Save } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScenarioTemplates } from "@/components/admin/scenario-templates"

export default function NewScenarioPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Assessment</h1>
          <p className="text-muted-foreground">Design a new assessment scenario from scratch or template</p>
        </div>
      </div>

      <Tabs defaultValue="blank" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2">
          <TabsTrigger value="blank">Start from Scratch</TabsTrigger>
          <TabsTrigger value="template">Use a Template</TabsTrigger>
        </TabsList>
        <TabsContent value="blank">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Details</CardTitle>
                <CardDescription>Define the basic information for your assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Assessment Name</Label>
                  <Input id="name" placeholder="e.g., Project Management Assessment" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief description of the assessment purpose and scope"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="duration" type="number" defaultValue={60} min={5} max={240} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <select
                      id="difficulty"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Configuration</CardTitle>
                <CardDescription>Define how the assessment will be conducted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Assessment Type</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-4 hover:border-primary/50 hover:bg-muted/50 cursor-pointer">
                      <div className="font-medium">Fixed Sequence</div>
                      <p className="text-sm text-muted-foreground">Participants complete tasks in a predefined order</p>
                    </div>
                    <div className="rounded-md border p-4 hover:border-primary/50 hover:bg-muted/50 cursor-pointer">
                      <div className="font-medium">Adaptive</div>
                      <p className="text-sm text-muted-foreground">
                        Task sequence adapts based on participant performance
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Scoring Method</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-4 hover:border-primary/50 hover:bg-muted/50 cursor-pointer">
                      <div className="font-medium">Standard</div>
                      <p className="text-sm text-muted-foreground">Fixed scoring criteria for all participants</p>
                    </div>
                    <div className="rounded-md border p-4 hover:border-primary/50 hover:bg-muted/50 cursor-pointer">
                      <div className="font-medium">Comparative</div>
                      <p className="text-sm text-muted-foreground">
                        Scores based on comparison with other participants
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Results Visibility</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-4 hover:border-primary/50 hover:bg-muted/50 cursor-pointer">
                      <div className="font-medium">Immediate</div>
                      <p className="text-sm text-muted-foreground">Results shown immediately after completion</p>
                    </div>
                    <div className="rounded-md border p-4 hover:border-primary/50 hover:bg-muted/50 cursor-pointer">
                      <div className="font-medium">Delayed</div>
                      <p className="text-sm text-muted-foreground">Results released at a specified later time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/admin">Cancel</Link>
            </Button>
            <div className="space-x-2">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" /> Save Draft
              </Button>
              <Button asChild>
                <Link href="/admin/scenario/new/builder">
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="template">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Templates</CardTitle>
              <CardDescription>Choose a template as a starting point for your assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <ScenarioTemplates />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
