"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Printer, Share, Star } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock document data - in a real app, this would come from an API
const documentData = {
  "1": {
    id: 1,
    title: "Quarterly Report Draft",
    type: "doc",
    lastModified: "Today, 10:30 AM",
    owner: "You",
    content: `
      <h1 class="text-2xl font-bold mb-4">Quarterly Report: Q1 2025</h1>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Executive Summary</h2>
      <p>This report provides an overview of our company's performance during the first quarter of 2025. Overall, we have seen positive growth across key metrics and are on track to meet our annual targets.</p>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Financial Highlights</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Revenue increased by 12% compared to Q1 2024</li>
        <li>Operating expenses reduced by 5%</li>
        <li>Profit margin improved to 18.5%</li>
        <li>Cash reserves at $4.2M</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Key Achievements</h2>
      <p>During Q1, we successfully:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Launched 2 new product features</li>
        <li>Expanded into 3 new markets</li>
        <li>Increased customer retention rate to 92%</li>
        <li>Reduced customer support response time by 15%</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Challenges</h2>
      <p>We faced several challenges during the quarter:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Supply chain disruptions affecting product delivery timelines</li>
        <li>Increased competition in our primary market</li>
        <li>Talent acquisition in specialized technical roles</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Outlook for Q2</h2>
      <p>Looking ahead to Q2, we plan to:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Complete the rollout of our new CRM system</li>
        <li>Launch our redesigned website</li>
        <li>Implement the first phase of our sustainability initiative</li>
        <li>Begin recruitment for our expansion team</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Conclusion</h2>
      <p>Q1 2025 has provided a strong foundation for the rest of the year. While we face some challenges, our strategic initiatives are yielding positive results, and we remain confident in achieving our annual objectives.</p>
    `,
  },
  "2": {
    id: 2,
    title: "Project Timeline",
    type: "spreadsheet",
    lastModified: "Yesterday, 3:45 PM",
    owner: "You",
    content: `
      <h1 class="text-2xl font-bold mb-4">Project Timeline</h1>
      
      <table class="min-w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2">Task</th>
            <th class="border border-gray-300 p-2">Owner</th>
            <th class="border border-gray-300 p-2">Start Date</th>
            <th class="border border-gray-300 p-2">End Date</th>
            <th class="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2">Project Kickoff</td>
            <td class="border border-gray-300 p-2">Project Manager</td>
            <td class="border border-gray-300 p-2">Apr 1, 2025</td>
            <td class="border border-gray-300 p-2">Apr 1, 2025</td>
            <td class="border border-gray-300 p-2">Completed</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Requirements Gathering</td>
            <td class="border border-gray-300 p-2">Business Analyst</td>
            <td class="border border-gray-300 p-2">Apr 2, 2025</td>
            <td class="border border-gray-300 p-2">Apr 10, 2025</td>
            <td class="border border-gray-300 p-2">In Progress</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Design Phase</td>
            <td class="border border-gray-300 p-2">UX Designer</td>
            <td class="border border-gray-300 p-2">Apr 11, 2025</td>
            <td class="border border-gray-300 p-2">Apr 25, 2025</td>
            <td class="border border-gray-300 p-2">Not Started</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Development</td>
            <td class="border border-gray-300 p-2">Development Team</td>
            <td class="border border-gray-300 p-2">Apr 26, 2025</td>
            <td class="border border-gray-300 p-2">May 20, 2025</td>
            <td class="border border-gray-300 p-2">Not Started</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Testing</td>
            <td class="border border-gray-300 p-2">QA Team</td>
            <td class="border border-gray-300 p-2">May 21, 2025</td>
            <td class="border border-gray-300 p-2">Jun 5, 2025</td>
            <td class="border border-gray-300 p-2">Not Started</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Deployment</td>
            <td class="border border-gray-300 p-2">DevOps</td>
            <td class="border border-gray-300 p-2">Jun 6, 2025</td>
            <td class="border border-gray-300 p-2">Jun 10, 2025</td>
            <td class="border border-gray-300 p-2">Not Started</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Key Milestones</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Requirements Sign-off: Apr 10, 2025</li>
        <li>Design Approval: Apr 25, 2025</li>
        <li>Alpha Release: May 10, 2025</li>
        <li>Beta Release: May 30, 2025</li>
        <li>Production Release: Jun 10, 2025</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Dependencies</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Third-party API integration availability</li>
        <li>Client approval of design mockups</li>
        <li>Infrastructure upgrade completion</li>
      </ul>
    `,
  },
}

export default function DocumentViewPage() {
  const params = useParams()
  const documentId = params.id as string
  const document = documentData[documentId] || documentData["1"] // Fallback to first document if not found

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/documents">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{document.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{document.type.toUpperCase()}</Badge>
            <p className="text-sm text-muted-foreground">Last modified: {document.lastModified}</p>
            <p className="text-sm text-muted-foreground">Owner: {document.owner}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <Tabs defaultValue="document">
          <TabsList>
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="history">Version History</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm">
            <Star className="mr-2 h-4 w-4" /> Favorite
          </Button>
          <Button size="sm" asChild>
            <Link href={`/documents/editor?document=${document.id}`}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{document.title}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: document.content }} />
        </CardContent>
      </Card>
    </div>
  )
}
