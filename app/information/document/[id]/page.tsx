"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, Share, Star, BookOpen } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentChatbot } from "@/components/document-chatbot"

// Mock document data - in a real app, this would come from an API
const documentData = {
  "1": {
    id: 1,
    title: "Company Handbook",
    category: "HR Documents",
    lastUpdated: "January 15, 2025",
    author: "HR Department",
    content: `
      <h1>Company Handbook</h1>
      <p class="text-muted-foreground">Last updated: January 15, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Welcome to Our Company</h2>
      <p class="mt-2">This handbook contains important information about our company policies, procedures, and guidelines. It is designed to help you understand our company culture and expectations.</p>
      
      <h3 class="mt-4 text-xl font-bold">Our Mission</h3>
      <p class="mt-2">Our mission is to provide exceptional products and services while fostering a positive work environment for our employees. We strive to innovate, collaborate, and make a meaningful impact in our industry.</p>
      
      <h3 class="mt-4 text-xl font-bold">Core Values</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Integrity: We act with honesty and transparency in all our interactions.</li>
        <li>Excellence: We pursue the highest standards in our work.</li>
        <li>Collaboration: We believe in the power of teamwork and diverse perspectives.</li>
        <li>Innovation: We encourage creative thinking and continuous improvement.</li>
        <li>Respect: We treat everyone with dignity and value their contributions.</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Employment Policies</h2>
      <p class="mt-2">This section outlines our key employment policies and procedures.</p>
      
      <h3 class="mt-4 text-xl font-bold">Work Hours</h3>
      <p class="mt-2">Our standard work hours are from 9:00 AM to 5:00 PM, Monday through Friday. Flexible work arrangements may be available depending on your role and department needs.</p>
      
      <h3 class="mt-4 text-xl font-bold">Time Off</h3>
      <p class="mt-2">Full-time employees are eligible for paid time off, including vacation days, sick leave, and holidays. Please refer to the detailed Time Off Policy for specific information about accrual rates and requesting time off.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Code of Conduct</h2>
      <p class="mt-2">Our Code of Conduct establishes the expectations for behavior in the workplace. All employees are expected to adhere to these guidelines to maintain a positive and productive work environment.</p>
      
      <h3 class="mt-4 text-xl font-bold">Professional Behavior</h3>
      <p class="mt-2">Employees are expected to conduct themselves in a professional manner at all times. This includes treating colleagues with respect, communicating effectively, and representing the company positively both internally and externally.</p>
      
      <h3 class="mt-4 text-xl font-bold">Workplace Safety</h3>
      <p class="mt-2">Safety is a top priority. All employees must follow safety guidelines and report any hazards or incidents immediately to their supervisor or the Safety Officer.</p>
      
      <h2 class="mt-6 text-2xl font-bold">Benefits</h2>
      <p class="mt-2">We offer a comprehensive benefits package to eligible employees, including health insurance, retirement plans, and professional development opportunities.</p>
      
      <h3 class="mt-4 text-xl font-bold">Health Insurance</h3>
      <p class="mt-2">Full-time employees are eligible for health, dental, and vision insurance. Coverage begins on the first day of the month following your start date.</p>
      
      <h3 class="mt-4 text-xl font-bold">Retirement Plan</h3>
      <p class="mt-2">We offer a 401(k) retirement plan with company matching contributions up to 4% of your salary.</p>
    `,
  },
  "2": {
    id: 2,
    title: "Project Plan Template",
    category: "Project Management",
    lastUpdated: "March 10, 2025",
    author: "Project Management Office",
    content: `
      <h1>Project Plan Template</h1>
      <p class="text-muted-foreground">Last updated: March 10, 2025</p>
      
      <h2 class="mt-6 text-2xl font-bold">Project Overview</h2>
      <p class="mt-2">This section should provide a high-level summary of the project, including its purpose, goals, and expected outcomes.</p>
      
      <h3 class="mt-4 text-xl font-bold">Project Description</h3>
      <p class="mt-2">[Provide a brief description of the project, including what problem it solves or opportunity it addresses.]</p>
      
      <h3 class="mt-4 text-xl font-bold">Project Objectives</h3>
      <p class="mt-2">List the specific, measurable objectives that the project aims to achieve.</p>
      <ul class="mt-2 list-disc pl-6">
        <li>Objective 1</li>
        <li>Objective 2</li>
        <li>Objective 3</li>
      </ul>
      
      <h2 class="mt-6 text-2xl font-bold">Project Scope</h2>
      <p class="mt-2">Define what is included in and excluded from the project.</p>
      
      <h3 class="mt-4 text-xl font-bold">In Scope</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      
      <h3 class="mt-4 text-xl font-bold">Out of Scope</h3>
      <ul class="mt-2 list-disc pl-6">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
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
          <Link href="/information">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{document.title}</h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{document.category}</Badge>
            <p className="text-sm text-muted-foreground">Last updated: {document.lastUpdated}</p>
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
        </div>
      </div>

      <Card>
        <CardHeader className="border-b bg-muted/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{document.title}</span>
            </div>
            <span className="text-sm text-muted-foreground">Author: {document.author}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: document.content }} />
        </CardContent>
      </Card>

      {/* Keep the document chatbot visible */}
      <DocumentChatbot />
    </div>
  )
}
