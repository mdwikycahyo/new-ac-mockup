"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function DashboardNew() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const messages = [
    {
      author: "Sarah Johnson",
      title: "Message from the President Director",
      role: "President Director",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-medium">Dear Participant,</p>
          <p>
            Welcome to our Workplace Assessment Platform. This assessment is designed to evaluate your skills in a
            simulated work environment that mirrors the challenges and tasks you might encounter in a real workplace
            setting as an AVP of Operations.
          </p>
          <p>
            <strong>Our objectives for this assessment are:</strong>
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>To provide you with an opportunity to demonstrate your operational leadership skills</li>
            <li>
              To observe how you approach problem-solving, resource allocation, and team management in a professional
              context
            </li>
            <li>To evaluate your ability to make strategic decisions under time constraints</li>
          </ul>
          <p>
            Remember, this is not just an evaluation but also a learning experience. We encourage you to approach each
            task thoughtfully and to utilize the resources available to you throughout the assessment.
          </p>
          <p>
            The platform simulates one workday at our company. You'll have access to email, chat, calendar, and other
            workplace tools. Complete the assigned tasks to the best of your ability within the given timeframe.
          </p>
          <p className="font-medium">
            We value your participation and look forward to seeing your unique approach to the challenges ahead.
          </p>
          <p>Best regards,</p>
          <div className="pt-2">
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-sm text-muted-foreground">President Director</p>
          </div>
        </div>
      ),
      date: "May 8, 2025",
      duration: "Approximately 90 minutes",
    },
    {
      author: "Michael Chen",
      title: "Message from the VP of Solution",
      role: "VP of Solution",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-medium">Dear Future AVP of Operations,</p>
          <p>
            As the VP of Solution, I'm excited to see how you'll handle the operational challenges we've prepared for
            you in this assessment.
          </p>
          <p>
            <strong>Your specific responsibilities in this scenario will include:</strong>
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Analyzing operational bottlenecks and proposing efficiency improvements</li>
            <li>Coordinating cross-functional teams to resolve a time-sensitive production issue</li>
            <li>Developing a resource allocation plan for an upcoming project launch</li>
            <li>Communicating operational updates to various stakeholders</li>
          </ul>
          <p>
            Throughout this assessment, you'll need to balance immediate operational needs with long-term strategic
            goals. You'll have access to various data points, team member profiles, and communication channels to help
            you make informed decisions.
          </p>
          <p>
            <strong>Key success factors we'll be evaluating:</strong>
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Analytical thinking and problem-solving approach</li>
            <li>Resource optimization and prioritization skills</li>
            <li>Communication clarity and stakeholder management</li>
            <li>Adaptability when facing unexpected challenges</li>
          </ul>
          <p>
            I encourage you to leverage your operational expertise while remaining open to the unique aspects of our
            company's processes.
          </p>
          <p>Looking forward to reviewing your performance,</p>
          <div className="pt-2">
            <p className="font-medium">Michael Chen</p>
            <p className="text-sm text-muted-foreground">VP of Solution</p>
          </div>
        </div>
      ),
      date: "May 8, 2025",
      duration: "Approximately 90 minutes",
    },
  ]

  return (
    <div className="container mx-auto p-6">
      {/* Greeting Section */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, Participant</h1>
            <p className="text-muted-foreground">
              Your workplace assessment begins today. We're excited to see your skills in action.
            </p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setVideoModalOpen(true)}>
            <Play className="h-5 w-5" /> Rewatch Tutorial Video
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Assessment Progress</CardTitle>
            <CardDescription>You have completed 2 of 8 assessment tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={25} className="h-2 w-full" />
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>25% Complete</span>
              <span>Estimated time remaining: 45 minutes</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Executive Messages Section - Improved Carousel */}
      <div className="mb-8 relative">
        {/* Message Counter Badge - More prominent */}
        <div className="absolute -top-4 right-0 z-10">
          <Badge variant="secondary" className="bg-black text-white px-3 py-1.5 text-sm font-medium shadow-md">
            Message {currentMessage + 1} of {messages.length}
          </Badge>
        </div>

        {/* Navigation Arrows - Moved further out */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-background shadow-lg border-2"
            onClick={() => setCurrentMessage((prev) => (prev === 0 ? messages.length - 1 : prev - 1))}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full bg-background shadow-lg border-2"
            onClick={() => setCurrentMessage((prev) => (prev === messages.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-md dark:from-slate-900 dark:to-slate-800">
          <div className="absolute right-0 top-0 h-32 w-32 opacity-10">
            <Image
              src="/placeholder.svg?height=128&width=128"
              width={128}
              height={128}
              alt="Company logo"
              className="h-full w-full"
            />
          </div>

          {/* Message Header with Visual Indicator */}
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    width={48}
                    height={48}
                    alt={`${messages[currentMessage].author} portrait`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-xl">{messages[currentMessage].title}</CardTitle>
                  <CardDescription>
                    {messages[currentMessage].author}, {messages[currentMessage].role}
                  </CardDescription>
                </div>
              </div>

              {/* Carousel Indicator Dots - Even More Prominent */}
              <div className="flex gap-4">
                {messages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-4 w-4 rounded-full transition-all ${
                      index === currentMessage
                        ? "bg-black scale-125 ring-2 ring-offset-2 ring-black"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => setCurrentMessage(index)}
                    aria-label={`View message ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">{messages[currentMessage].content}</CardContent>

          <CardFooter className="flex flex-col border-t bg-slate-50 dark:bg-slate-800/50">
            <div className="flex w-full flex-col gap-2 pt-2 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Assessment Date: {messages[currentMessage].date}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Duration: {messages[currentMessage].duration}</span>
              </div>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="mt-4 flex w-full items-center justify-between md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMessage((prev) => (prev === 0 ? messages.length - 1 : prev - 1))}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMessage((prev) => (prev === messages.length - 1 ? 0 : prev + 1))}
                className="gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Video Tutorial Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Platform Tutorial Video</DialogTitle>
            <DialogDescription>Watch this tutorial to learn how to navigate the assessment platform.</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-md bg-slate-100">
            {/* This would be a real video in production */}
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Play className="h-16 w-16 text-slate-400" />
              <p className="mt-4 text-center text-sm text-slate-500">
                Tutorial video would play here. <br />
                In a real implementation, this would be an embedded video player.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setVideoModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
