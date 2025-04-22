import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText, Video, MessageSquare, HelpCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers and get assistance with the assessment platform</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search for help topics..." className="pl-10" />
        </div>
      </div>

      <Tabs defaultValue="documentation" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="documentation">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <HelpCard
              icon={<FileText className="h-8 w-8" />}
              title="Assessment Creation Guide"
              description="Learn how to create effective assessment scenarios"
              href="/admin/help/assessment-creation"
            />
            <HelpCard
              icon={<FileText className="h-8 w-8" />}
              title="Template Library Guide"
              description="How to use and customize assessment templates"
              href="/admin/help/templates"
            />
            <HelpCard
              icon={<FileText className="h-8 w-8" />}
              title="Participant Management"
              description="Managing participants and assignments"
              href="/admin/help/participants"
            />
            <HelpCard
              icon={<FileText className="h-8 w-8" />}
              title="Reporting & Analytics"
              description="Understanding assessment reports and metrics"
              href="/admin/help/reporting"
            />
            <HelpCard
              icon={<FileText className="h-8 w-8" />}
              title="Security Best Practices"
              description="Ensuring assessment security and integrity"
              href="/admin/help/security"
            />
            <HelpCard
              icon={<FileText className="h-8 w-8" />}
              title="Integration Guide"
              description="Connecting with HR and LMS systems"
              href="/admin/help/integrations"
            />
          </div>
        </TabsContent>

        <TabsContent value="tutorials">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <HelpCard
              icon={<Video className="h-8 w-8" />}
              title="Getting Started"
              description="A complete walkthrough of the platform"
              href="/admin/help/tutorial-getting-started"
            />
            <HelpCard
              icon={<Video className="h-8 w-8" />}
              title="Creating Your First Assessment"
              description="Step-by-step guide to assessment creation"
              href="/admin/help/tutorial-first-assessment"
            />
            <HelpCard
              icon={<Video className="h-8 w-8" />}
              title="Advanced Scoring Techniques"
              description="Configure complex scoring rubrics"
              href="/admin/help/tutorial-scoring"
            />
            <HelpCard
              icon={<Video className="h-8 w-8" />}
              title="Analyzing Results"
              description="How to interpret assessment data"
              href="/admin/help/tutorial-analysis"
            />
            <HelpCard
              icon={<Video className="h-8 w-8" />}
              title="Customizing Templates"
              description="Modify templates to fit your needs"
              href="/admin/help/tutorial-templates"
            />
            <HelpCard
              icon={<Video className="h-8 w-8" />}
              title="Bulk Participant Management"
              description="Efficiently manage large participant groups"
              href="/admin/help/tutorial-participants"
            />
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about the assessment platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FaqItem
                question="How do I reset a participant's assessment?"
                answer="Navigate to the Participants section, find the participant, click on the three dots menu, and select 'Reset Assessment'. This will allow the participant to retake the assessment from the beginning."
              />
              <FaqItem
                question="Can I export assessment results?"
                answer="Yes, you can export results in various formats including CSV, Excel, and PDF. Go to the Reports section, select the assessment, and click the Export button in the top right corner."
              />
              <FaqItem
                question="How do I create a branching assessment?"
                answer="When creating or editing an assessment, use the Scenario Builder to add conditional logic between tasks. Click on the connection between tasks to set conditions based on participant responses."
              />
              <FaqItem
                question="Can participants save their progress and continue later?"
                answer="Yes, assessments automatically save progress. Participants can close the browser and return later to continue from where they left off, as long as the assessment deadline hasn't passed."
              />
              <FaqItem
                question="How do I set time limits for specific sections?"
                answer="In the Scenario Builder, select a task or section and use the properties panel to set a specific time limit. You can set limits for individual tasks or for the entire assessment."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Please provide details about your issue or question" rows={5} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your Email</Label>
                  <Input id="email" type="email" placeholder="Where we should respond" />
                </div>
                <div className="pt-2">
                  <Button className="w-full">Submit Support Request</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Chat Support</CardTitle>
                  <CardDescription>Chat with a support representative</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Our support team is available Monday-Friday, 9am-5pm ET for live assistance.
                  </p>
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" /> Start Live Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Resources</CardTitle>
                  <CardDescription>Additional ways to get help</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Knowledge Base</h4>
                      <p className="text-sm text-muted-foreground">
                        Browse our extensive knowledge base for detailed articles
                      </p>
                      <Button variant="link" className="h-auto p-0" asChild>
                        <Link href="/admin/help/knowledge-base">
                          Visit Knowledge Base <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Video className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Video Library</h4>
                      <p className="text-sm text-muted-foreground">
                        Watch tutorial videos on specific platform features
                      </p>
                      <Button variant="link" className="h-auto p-0" asChild>
                        <Link href="/admin/help/video-library">
                          Browse Videos <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HelpCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Card className="hover:border-primary/50 hover:shadow-sm">
      <Link href={href}>
        <CardContent className="flex items-start gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-2">{icon}</div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

function Label({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
    >
      {children}
    </label>
  )
}

function Textarea({ id, placeholder, rows = 3 }: { id: string; placeholder?: string; rows?: number }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-medium">{question}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{answer}</p>
    </div>
  )
}

import { cn } from "@/lib/utils"
