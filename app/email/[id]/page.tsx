"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Reply, Forward, Trash, Archive, MoreHorizontal, Paperclip, Download, Send } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { RichTextEditor } from "@/components/rich-text-editor"

// Mock email data - in a real app, this would come from an API
const emailData = {
  "1": {
    id: 1,
    sender: "Project Manager",
    senderEmail: "pm@example.com",
    recipients: ["you@example.com"],
    subject: "Quarterly Report Review",
    content: `<p>Hello,</p>
    <p>Please review the attached quarterly report and provide feedback by EOD.</p>
    <p>The report includes:</p>
    <ul>
      <li>Financial summary</li>
      <li>Project milestones</li>
      <li>Team performance metrics</li>
      <li>Goals for next quarter</li>
    </ul>
    <p>Let me know if you have any questions or concerns.</p>
    <p>Best regards,<br>Project Manager</p>`,
    time: "10:30 AM",
    date: "April 15, 2025",
    read: true,
    starred: true,
    priority: "high",
    attachments: [
      { name: "Q1_Report_2025.pdf", size: "2.4 MB" },
      { name: "Financial_Summary.xlsx", size: "1.1 MB" },
    ],
  },
  "2": {
    id: 2,
    sender: "HR Department",
    senderEmail: "hr@example.com",
    recipients: ["you@example.com", "team@example.com"],
    subject: "Team Building Event",
    content: `<p>Dear Team,</p>
    <p>We're organizing a team building event next Friday. Please confirm your attendance by Wednesday.</p>
    <p>Event details:</p>
    <ul>
      <li>Date: April 22, 2025</li>
      <li>Time: 2:00 PM - 5:00 PM</li>
      <li>Location: Central Park Conference Center</li>
      <li>Activities: Team challenges, workshops, and social networking</li>
    </ul>
    <p>Looking forward to seeing everyone there!</p>
    <p>Best regards,<br>HR Department</p>`,
    time: "Yesterday",
    date: "April 14, 2025",
    read: false,
    starred: false,
    priority: "medium",
    attachments: [{ name: "Event_Details.pdf", size: "1.2 MB" }],
  },
}

export default function EmailDetailPage() {
  const params = useParams()
  const emailId = params.id as string
  const email = emailData[emailId] || emailData["1"] // Fallback to first email if not found

  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")

  const handleSendReply = () => {
    // In a real app, this would send the reply
    alert("Reply sent successfully!")
    setIsReplying(false)
    setReplyContent("")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/email">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email</h1>
          <p className="text-muted-foreground">View and respond to messages</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>
                {email.sender
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{email.subject}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{email.sender}</span>
                <span>&lt;{email.senderEmail}&gt;</span>
                <span>•</span>
                <span>{email.date}</span>
              </div>
              <div className="text-sm text-muted-foreground">To: {email.recipients.join(", ")}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Archive className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: email.content }} />
          </div>

          {email.attachments && email.attachments.length > 0 && (
            <div className="border-t p-4">
              <h3 className="mb-3 font-medium">Attachments ({email.attachments.length})</h3>
              <div className="space-y-2">
                {email.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-sm text-muted-foreground">{attachment.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t p-4">
            <div className="space-x-2">
              <Button onClick={() => setIsReplying(true)}>
                <Reply className="mr-2 h-4 w-4" /> Reply
              </Button>
              <Button variant="outline">
                <Forward className="mr-2 h-4 w-4" /> Forward
              </Button>
            </div>
          </div>

          {isReplying && (
            <div className="border-t p-4">
              <h3 className="mb-3 font-medium">Reply to {email.sender}</h3>
              <RichTextEditor
                value={replyContent}
                onChange={setReplyContent}
                placeholder="Write your reply here..."
                minHeight="150px"
              />
              <div className="flex justify-end space-x-2 mt-3">
                <Button variant="outline" onClick={() => setIsReplying(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendReply}>
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
