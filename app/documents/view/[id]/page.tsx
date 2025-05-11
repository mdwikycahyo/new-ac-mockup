"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"

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
  "3": {
    id: 3,
    title: "Marketing Presentation",
    type: "presentation",
    lastModified: "Apr 12, 2025",
    owner: "Marketing Team",
    content: `
      <h1 class="text-2xl font-bold mb-4">Marketing Strategy Presentation</h1>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Q2 Marketing Campaign</h2>
      <p>Our Q2 marketing campaign will focus on expanding our market reach and increasing brand awareness through targeted digital marketing initiatives.</p>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Target Audience</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Small to medium-sized businesses</li>
        <li>Tech-savvy professionals aged 25-45</li>
        <li>Decision-makers in the finance and healthcare sectors</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Campaign Channels</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Social media (LinkedIn, Twitter, Instagram)</li>
        <li>Email marketing campaigns</li>
        <li>Industry webinars and virtual events</li>
        <li>Content marketing (blog posts, whitepapers)</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Budget Allocation</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Digital advertising: 40%</li>
        <li>Content creation: 30%</li>
        <li>Events and webinars: 20%</li>
        <li>Analytics and tools: 10%</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Expected Outcomes</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>15% increase in website traffic</li>
        <li>20% growth in qualified leads</li>
        <li>10% improvement in conversion rates</li>
        <li>25% increase in social media engagement</li>
      </ul>
    `,
  },
  "4": {
    id: 4,
    title: "Budget Analysis",
    type: "spreadsheet",
    lastModified: "Apr 10, 2025",
    owner: "Finance Department",
    content: `
      <h1 class="text-2xl font-bold mb-4">Q1 2025 Budget Analysis</h1>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Budget Overview</h2>
      <table class="min-w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2">Department</th>
            <th class="border border-gray-300 p-2">Allocated Budget</th>
            <th class="border border-gray-300 p-2">Actual Spend</th>
            <th class="border border-gray-300 p-2">Variance</th>
            <th class="border border-gray-300 p-2">Variance %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 p-2">Marketing</td>
            <td class="border border-gray-300 p-2">$250,000</td>
            <td class="border border-gray-300 p-2">$235,000</td>
            <td class="border border-gray-300 p-2">$15,000</td>
            <td class="border border-gray-300 p-2">6%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Sales</td>
            <td class="border border-gray-300 p-2">$350,000</td>
            <td class="border border-gray-300 p-2">$365,000</td>
            <td class="border border-gray-300 p-2">-$15,000</td>
            <td class="border border-gray-300 p-2">-4.3%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">R&D</td>
            <td class="border border-gray-300 p-2">$500,000</td>
            <td class="border border-gray-300 p-2">$475,000</td>
            <td class="border border-gray-300 p-2">$25,000</td>
            <td class="border border-gray-300 p-2">5%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">Operations</td>
            <td class="border border-gray-300 p-2">$200,000</td>
            <td class="border border-gray-300 p-2">$210,000</td>
            <td class="border border-gray-300 p-2">-$10,000</td>
            <td class="border border-gray-300 p-2">-5%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2">HR</td>
            <td class="border border-gray-300 p-2">$150,000</td>
            <td class="border border-gray-300 p-2">$145,000</td>
            <td class="border border-gray-300 p-2">$5,000</td>
            <td class="border border-gray-300 p-2">3.3%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 p-2 font-bold">Total</td>
            <td class="border border-gray-300 p-2 font-bold">$1,450,000</td>
            <td class="border border-gray-300 p-2 font-bold">$1,430,000</td>
            <td class="border border-gray-300 p-2 font-bold">$20,000</td>
            <td class="border border-gray-300 p-2 font-bold">1.4%</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Key Observations</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Overall, we are under budget by 1.4% ($20,000)</li>
        <li>Sales and Operations departments exceeded their allocated budgets</li>
        <li>Marketing, R&D, and HR departments were under budget</li>
        <li>R&D had the largest absolute savings at $25,000</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Recommendations</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Review Sales department spending to identify areas for optimization</li>
        <li>Analyze Operations budget allocation for Q2</li>
        <li>Consider reallocating some of the surplus from R&D to support Sales initiatives</li>
        <li>Maintain current budget controls for Marketing and HR</li>
      </ul>
    `,
  },
  "5": {
    id: 5,
    title: "Meeting Notes",
    type: "doc",
    lastModified: "Apr 8, 2025",
    owner: "You",
    content: `
      <h1 class="text-2xl font-bold mb-4">Team Meeting Notes</h1>
      <p class="text-muted-foreground">Date: April 8, 2025</p>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Attendees</h2>
      <ul class="list-disc pl-6 mb-4">
        <li>Project Manager (Chair)</li>
        <li>Development Team Lead</li>
        <li>UX Designer</li>
        <li>QA Lead</li>
        <li>Marketing Representative</li>
        <li>You (Note-taker)</li>
      </ul>
      
      <h2 class="text-xl font-bold mt-6 mb-2">Agenda Items</h2>
      
      <h3 class="text-lg font-bold mt-4 mb-2">1. Project Status Update</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>Development is currently on track for the Q2 release</li>
        <li>All critical path items are progressing as scheduled</li>
        <li>Backend integration is 85% complete</li>
        <li>Frontend implementation is 70% complete</li>
      </ul>
      
      <h3 class="text-lg font-bold mt-4 mb-2">2. Issues and Blockers</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>Third-party API integration delayed due to vendor response time</li>
        <li>Resource constraint in the QA team may impact testing timeline</li>
        <li>Design changes requested by the client need to be evaluated for scope impact</li>
      </ul>
      
      <h3 class="text-lg font-bold mt-4 mb-2">3. Action Items</h3>
      <ul class="list-disc pl-6 mb-4">
        <li>Project Manager to follow up with the vendor regarding API integration</li>
        <li>Development Lead to assess impact of design changes by April 10</li>
        <li>QA Lead to propose resource allocation plan by April 12</li>
        <li>Marketing to prepare communication plan for the release by April 15</li>
        <li>All team members to update task status in the project management tool by EOD</li>
      </ul>
      
      <h3 class="text-lg font-bold mt-4 mb-2">4. Next Meeting</h3>
      <p>April 15, 2025 at 10:00 AM</p>
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
        <h2 className="text-xl font-medium">Document Preview</h2>
        <Button size="sm" asChild>
          <Link href={`/documents/editor?document=${document.id}`}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Link>
        </Button>
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
