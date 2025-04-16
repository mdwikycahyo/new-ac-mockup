import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, MessageSquare, FileText, ExternalLink } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to your questions and get assistance</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search for help topics..." className="pl-10 py-6 text-lg" />
        </div>
      </div>

      <Tabs defaultValue="faq">
        <TabsList className="mb-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about the assessment platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                  <AccordionItem key={item.id} value={`item-${item.id}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Guides</CardTitle>
              <CardDescription>Step-by-step instructions for using the assessment platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {guideItems.map((guide) => (
                  <Card key={guide.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <guide.icon className="h-5 w-5" />
                        <CardTitle className="text-base">{guide.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{guide.description}</CardDescription>
                      <Button className="mt-4 w-full" variant="outline" asChild>
                        <a href="#" className="inline-flex items-center justify-center gap-1">
                          View Guide <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team for assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Please describe your issue in detail"
                    ></textarea>
                  </div>
                  <Button className="w-full">Submit Request</Button>
                </div>
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-medium">Other Ways to Get Help</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-muted-foreground">
                          Chat with our support team in real-time during business hours.
                        </p>
                        <Button variant="link" className="h-auto p-0 text-primary">
                          Start Chat
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HelpCircle className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Knowledge Base</p>
                        <p className="text-sm text-muted-foreground">
                          Browse our comprehensive knowledge base for detailed articles.
                        </p>
                        <Button variant="link" className="h-auto p-0 text-primary">
                          Visit Knowledge Base
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Technical Documentation</p>
                        <p className="text-sm text-muted-foreground">
                          Access detailed technical documentation for the platform.
                        </p>
                        <Button variant="link" className="h-auto p-0 text-primary">
                          View Documentation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface FaqItem {
  id: number
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "How long does the assessment typically take to complete?",
    answer:
      "The assessment typically takes 60-90 minutes to complete, depending on your pace. You can save your progress and return later if needed.",
  },
  {
    id: 2,
    question: "Can I retake the assessment if I'm not satisfied with my results?",
    answer:
      "Assessment retakes are available after a 30-day waiting period. Please contact your administrator if you believe there were technical issues that affected your performance.",
  },
  {
    id: 3,
    question: "How are my assessment results used?",
    answer:
      "Your results are used to identify your strengths and development areas. They help create personalized development plans and may be used for training recommendations.",
  },
  {
    id: 4,
    question: "Is my assessment data kept confidential?",
    answer:
      "Yes, all assessment data is kept confidential and is only shared with authorized personnel in accordance with our privacy policy.",
  },
  {
    id: 5,
    question: "What if I encounter technical issues during the assessment?",
    answer:
      "If you encounter technical issues, please use the 'Contact Support' tab to report the problem. Our team will assist you promptly.",
  },
]

interface GuideItem {
  id: number
  title: string
  description: string
  icon: React.ElementRef<typeof FileText>
}

const guideItems: GuideItem[] = [
  {
    id: 1,
    title: "Getting Started",
    description: "Learn the basics of navigating the assessment platform and preparing for your assessment.",
    icon: FileText,
  },
  {
    id: 2,
    title: "Email Simulation Guide",
    description: "Instructions for effectively using the email simulation tool during your assessment.",
    icon: MessageSquare,
  },
  {
    id: 3,
    title: "Document Editor Tutorial",
    description: "Learn how to create and edit documents in the assessment environment.",
    icon: FileText,
  },
  {
    id: 4,
    title: "Conference Call Guide",
    description: "Tips for participating in virtual meetings during your assessment.",
    icon: HelpCircle,
  },
  {
    id: 5,
    title: "Task Management Guide",
    description: "How to organize and complete tasks efficiently in the assessment.",
    icon: FileText,
  },
  {
    id: 6,
    title: "Understanding Your Results",
    description: "A guide to interpreting your assessment results and feedback.",
    icon: HelpCircle,
  },
]
