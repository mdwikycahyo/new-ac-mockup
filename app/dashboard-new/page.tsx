"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Calendar, Clock, ChevronLeft, ChevronRight, MessageSquare, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useDemoMode } from "@/components/context/demo-mode-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

// Sample data for new Chats
const newMessages = [
  {
    id: 1,
    sender: "Project Manager",
    content: "Let's discuss the project timeline for the new initiative",
    time: "10:30 AM",
    unread: true,
    unreadCount: 2,
    avatar: "/project-management-overview.png",
  },
  {
    id: 2,
    sender: "Marketing Team",
    content: "The Q3 marketing campaign materials are ready for your review",
    time: "Yesterday",
    unread: true,
    unreadCount: 1,
    avatar: "/mountain-terrain.png",
  },
  {
    id: 3,
    sender: "HR Representative",
    content: "Following up on the Team Building event we discussed last week",
    time: "Monday",
    unread: false,
    unreadCount: 0,
    avatar: "/hr-team-meeting.png",
  },
  {
    id: 4,
    sender: "IT Support",
    content: "Your ticket regarding the shared drive access has been resolved",
    time: "Tuesday",
    unread: false,
    unreadCount: 0,
    avatar: "/it-support-team.png",
  },
]

// Sample data for new emails
const newEmails = [
  {
    id: "e1",
    sender: "Sarah Johnson",
    subject: "Quarterly Business Review Presentation",
    preview:
      "I'd like to discuss the quarterly business review presentation. Do you have the latest financial projections ready?",
    time: "9:30 AM",
    unread: true,
    priority: "high",
  },
  {
    id: "e2",
    sender: "Michael Chen",
    subject: "Technical Specifications Review",
    preview:
      "Have you reviewed the technical specifications for the new project? The client is expecting our feedback by the end of the week.",
    time: "Yesterday",
    unread: true,
    priority: "medium",
  },
  {
    id: "e3",
    sender: "Finance Director",
    subject: "Budget Approval Status",
    preview:
      "The budget approval for Project X is pending your final review. Please check the allocation for external consultants.",
    time: "Wednesday",
    unread: false,
    priority: "low",
  },
  {
    id: "e4",
    sender: "Client Representative",
    subject: "Project Feedback and Next Steps",
    preview:
      "We're very pleased with the progress on the project. Our CEO would like to schedule a review meeting next week.",
    time: "2 days ago",
    unread: true,
    priority: "high",
  },
]

export default function DashboardNew() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const { demoMode, assessmentCompleted } = useDemoMode()
  const router = useRouter()

  // State for tracking read messages and emails
  const [readMessageIds, setReadMessageIds] = useState<number[]>([])
  const [readEmailIds, setReadEmailIds] = useState<string[]>([])

  // Load read status from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedReadMessages = localStorage.getItem("readMessageIds")
      const savedReadEmails = localStorage.getItem("readEmailIds")

      if (savedReadMessages) {
        setReadMessageIds(JSON.parse(savedReadMessages))
      }

      if (savedReadEmails) {
        setReadEmailIds(JSON.parse(savedReadEmails))
      }
    }
  }, [])

  // Filter messages and emails to only show unread items
  const unreadMessages = newMessages.filter((message) => message.unread && !readMessageIds.includes(message.id))

  const unreadEmails = newEmails.filter((email) => email.unread && !readEmailIds.includes(email.id))

  const messages = [
    {
      author: "Sarah Johnson",
      title: "Message from the President Director",
      role: "President Director",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-medium">Dear Participant,</p>
          <p>
            Kita tengah memasuki fase penting dalam perjalanan Amboja sebagai perusahaan teknologi yang berbasis pada
            keberlanjutan dan inovasi. Setelah bertahun-tahun berfokus pada perluasan pasar dan efisiensi operasional,
            kini saatnya kita memperkuat <em>fondasi manusia</em> di balik semua pencapaian itu.
          </p>
          <p>
            Saya percaya bahwa keberhasilan jangka panjang hanya bisa dicapai jika kita mampu membangun budaya kerja
            yang kolaboratif, sehat secara psikologis, dan menyenangkan. Keseimbangan antara target dan keterlibatan
            karyawan adalah kunci untuk menjaga performa tetap stabil di tengah tekanan.
          </p>
          <p>
            Karena itu, saya ingin mengajak seluruh pimpinan untuk memberikan ruang bagi inisiatif yang mampu memperkuat
            keterikatan dan kebersamaan tim. Kegiatan engagement internal bukan sekadar acara hiburan, melainkan
            investasi terhadap ketahanan organisasi kita di masa depan.
          </p>
          <p>Terima kasih atas dedikasi dan partisipasi Anda.</p>
          <p>Best regards,</p>
          <div className="pt-2">
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-sm text-muted-foreground">President Director</p>
          </div>
        </div>
      ),
      date: "May 12, 2025",
      duration: "Approximately 90 minutes",
    },
    {
      author: "Michael Chen",
      title: "Message from the VP of Solution",
      role: "VP of Solution",
      content: (
        <div className="space-y-4">
          <p className="text-lg font-medium">Dear Team,</p>
          <p>
            Sejalan dengan arahan President Director, saya ingin memastikan bahwa unit Earth Operation juga aktif
            memperkuat keterlibatan karyawan di tengah aktivitas operasional yang padat.
          </p>
          <p>Berikut beberapa hal yang perlu menjadi perhatian dalam kegiatan engagement:</p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Mendorong aktivitas engagement yang relevan dan ringan</li>
            <li>Melibatkan lintas fungsi dalam proses perencanaan</li>
            <li>Mengutamakan inklusivitas dan keseimbangan dengan beban kerja</li>
            <li>Menjadikan kegiatan ini sebagai sarana membangun komunikasi yang lebih terbuka</li>
          </ul>
          <p>
            Dengan semangat kolaborasi, saya yakin kita bisa menciptakan dampak positif yang berkelanjutan, tidak hanya
            untuk performa bisnis, tetapi juga untuk semangat tim Amboja.
          </p>
          <p>Sukses untuk pelaksanaan kegiatan ini!</p>
          <div className="pt-2">
            <p className="font-medium">Michael Chen</p>
            <p className="text-sm text-muted-foreground">VP of Solution</p>
          </div>
        </div>
      ),
      date: "May 12, 2025",
      duration: "Approximately 90 minutes",
    },
  ]

  // Function to navigate to previous message
  const goToPrevious = () => {
    setCurrentMessage((prev) => (prev === 0 ? messages.length - 1 : prev - 1))
  }

  // Function to navigate to next message
  const goToNext = () => {
    setCurrentMessage((prev) => (prev === messages.length - 1 ? 0 : prev + 1))
  }

  // Function to handle chat message click
  const handleChatClick = (contactId: number) => {
    // Mark message as read
    const updatedReadMessageIds = [...readMessageIds, contactId]
    setReadMessageIds(updatedReadMessageIds)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("readMessageIds", JSON.stringify(updatedReadMessageIds))
    }

    // Navigate to chat
    router.push(`/chat?contact=${contactId}`)
  }

  // Function to handle email click
  const handleEmailClick = (emailId: string) => {
    // Mark email as read
    const updatedReadEmailIds = [...readEmailIds, emailId]
    setReadEmailIds(updatedReadEmailIds)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("readEmailIds", JSON.stringify(updatedReadEmailIds))
    }

    // Navigate to email
    router.push(`/email/${emailId}`)
  }

  // Render the demo mode dashboard
  if (demoMode) {
    return (
      <div className="container mx-auto p-6">
        {/* Greeting Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {demoMode ? "Welcome, AVP of Earth Operation" : "Welcome, Participant"}
              </h1>
              <p className="text-muted-foreground">
                {demoMode
                  ? "Your workday begins now. We're looking forward to your leadership."
                  : "Your workplace assessment begins today. We're excited to see your skills in action."}
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
              <CardDescription>
                {demoMode && assessmentCompleted
                  ? "You have completed 1 of 1 assessment task"
                  : demoMode
                    ? "You have completed 0 of 1 assessment task"
                    : "You have completed 2 of 8 assessment tasks"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={demoMode && assessmentCompleted ? 100 : demoMode ? 0 : 25} className="h-2 w-full" />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>
                  {demoMode && assessmentCompleted ? "100% Complete" : demoMode ? "0% Complete" : "25% Complete"}
                </span>
                <span>
                  Estimated time remaining:{" "}
                  {demoMode && assessmentCompleted ? "0 minutes" : demoMode ? "60 minutes" : "45 minutes"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Executive Messages Section - Improved Carousel with more visible navigation */}
        <div className="mb-8 relative">
          {/* Message Counter Badge - More prominent */}
          <div className="absolute -top-4 right-0 z-10">
            <Badge variant="secondary" className="bg-black text-white px-3 py-1.5 text-sm font-medium shadow-md">
              Message {currentMessage + 1} of {messages.length}
            </Badge>
          </div>

          {/* Navigation Arrows - More visible, fixed absolute positioning outside the card */}
          <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-20">
            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full bg-primary text-white shadow-lg border-2 border-white hover:bg-primary/80 hover:scale-105 transition-all"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-20">
            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full bg-primary text-white shadow-lg border-2 border-white hover:bg-primary/80 hover:scale-105 transition-all"
              onClick={goToNext}
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

                {/* Carousel Indicator Dots - Made more visible */}
                <div className="flex gap-3">
                  {messages.map((_, index) => (
                    <button
                      key={index}
                      className={`h-4 w-4 rounded-full transition-all ${
                        index === currentMessage
                          ? "bg-primary scale-125 ring-2 ring-offset-2 ring-primary"
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
                <Button variant="default" size="sm" onClick={goToPrevious} className="gap-1">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>
                <Button variant="default" size="sm" onClick={goToNext} className="gap-1">
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
              <DialogDescription>
                Watch this tutorial to learn how to navigate the assessment platform.
              </DialogDescription>
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

  // Render the normal mode dashboard with two-column layout
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-10 gap-6">
        {/* Left Column (approximately 3/5 width) */}
        <div className="col-span-6 space-y-6">
          {/* Greeting Section */}
          <div>
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

          {/* Executive Messages Section */}
          <div className="relative">
            {/* Message Counter Badge */}
            <div className="absolute -top-4 right-0 z-10">
              <Badge variant="secondary" className="bg-black text-white px-3 py-1.5 text-sm font-medium shadow-md">
                Message {currentMessage + 1} of {messages.length}
              </Badge>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-20">
              <Button
                variant="default"
                size="icon"
                className="h-12 w-12 rounded-full bg-primary text-white shadow-lg border-2 border-white hover:bg-primary/80 hover:scale-105 transition-all"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 z-20">
              <Button
                variant="default"
                size="icon"
                className="h-12 w-12 rounded-full bg-primary text-white shadow-lg border-2 border-white hover:bg-primary/80 hover:scale-105 transition-all"
                onClick={goToNext}
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

                  {/* Carousel Indicator Dots */}
                  <div className="flex gap-3">
                    {messages.map((_, index) => (
                      <button
                        key={index}
                        className={`h-4 w-4 rounded-full transition-all ${
                          index === currentMessage
                            ? "bg-primary scale-125 ring-2 ring-offset-2 ring-primary"
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
                  <Button variant="default" size="sm" onClick={goToPrevious} className="gap-1">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                  <Button variant="default" size="sm" onClick={goToNext} className="gap-1">
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Right Column (approximately 2/5 width) */}
        <div className="col-span-4 space-y-6">
          {/* Assessment Progress */}
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

          {/* New Chats Section */}
          <Card>
            <CardHeader className="p-3 border-b bg-accent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle>New Chats</CardTitle>
                </div>
                {unreadMessages.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 hover:bg-white"
                    onClick={() => router.push("/chat")}
                  >
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[200px]">
                {unreadMessages.length > 0 ? (
                  <div className="divide-y">
                    {unreadMessages.map((message, index) => (
                      <div
                        key={message.id}
                        className="flex items-start gap-3 p-3 cursor-pointer hover:bg-accent"
                        onClick={() => handleChatClick(message.id)}
                      >
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {message.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold line-clamp-1">{message.sender}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-[#000000]">{message.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground line-clamp-1 mr-2 flex-1">{message.content}</p>
                            <p className="flex h-5 w-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#000000] text-[10px] font-medium text-white">
                              {message.unreadCount}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-center text-muted-foreground">
                    No new Chats
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* New Emails Section */}
          <Card>
            <CardHeader className="p-3 border-b bg-accent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <CardTitle>New Emails</CardTitle>
                </div>
                {unreadEmails.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 hover:bg-white"
                    onClick={() => router.push("/email")}
                  >
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[200px]">
                {unreadEmails.length > 0 ? (
                  <div className="divide-y">
                    {unreadEmails.map((email) => (
                      <div
                        key={email.id}
                        className="flex items-start gap-3 p-3 cursor-pointer hover:bg-accent"
                        onClick={() => handleEmailClick(email.id)}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold line-clamp-1">{email.sender}</p>
                            <div className="flex items-center gap-2">
                              <span className="h-3 w-3 rounded-full bg-[#000000]"></span>
                              <p className="text-xs font-bold text-[#000000]">{email.time}</p>
                            </div>
                          </div>
                          <p className="font-semibold line-clamp-1 text-[#000000]">{email.subject}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{email.preview}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-center text-muted-foreground">
                    No new emails
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
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
