"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Email {
  id: string
  sender: string
  senderEmail: string
  recipients: string[]
  subject: string
  preview: string
  content: string
  time: string
  date: string
  read: boolean
  priority?: "high" | "medium" | "low"
  attachments?: Array<{
    id: number
    name: string
    size: string
    type: string
  }>
}

interface DraftEmail {
  id: string
  type: "new" | "reply" | "forward"
  recipients: string[]
  subject: string
  content: string
  time: string
  date: string
  originalEmailId?: string // For reply/forward drafts
  attachments?: Array<{
    id: number | string
    name: string
    size: string
    type: string
  }>
}

interface EmailContextType {
  inboxEmails: Email[]
  sentEmails: Email[]
  draftEmails: DraftEmail[]
  addSentEmail: (email: Email) => void
  markAsRead: (emailId: string) => void
  saveDraft: (draft: Omit<DraftEmail, "id" | "time" | "date">) => string
  updateDraft: (id: string, draft: Partial<Omit<DraftEmail, "id" | "time" | "date">>) => void
  deleteDraft: (id: string) => void
  getDraft: (id: string) => DraftEmail | undefined
}

const EmailContext = createContext<EmailContextType>({
  inboxEmails: [],
  sentEmails: [],
  draftEmails: [],
  addSentEmail: () => {},
  markAsRead: () => {},
  saveDraft: () => "",
  updateDraft: () => {},
  deleteDraft: () => {},
  getDraft: () => undefined,
})

export const useEmail = () => useContext(EmailContext)

export const EmailProvider = ({ children }: { children: React.ReactNode }) => {
  // Initial inbox emails
  const [inboxEmails, setInboxEmails] = useState<Email[]>([
    {
      id: "1",
      sender: "Project Manager",
      senderEmail: "pm@example.com",
      recipients: ["you@example.com"],
      subject: "Quarterly Report Review",
      preview: "Please review the attached quarterly report and provide feedback by EOD.",
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
      read: false,
      priority: "high",
      attachments: [
        { id: 1, name: "Q1_Report_2025.pdf", size: "2.4 MB", type: "doc" },
        { id: 2, name: "Financial_Summary.xlsx", size: "1.1 MB", type: "spreadsheet" },
      ],
    },
    {
      id: "2",
      sender: "HR Department",
      senderEmail: "hr@example.com",
      recipients: ["you@example.com", "team@example.com"],
      subject: "Team Building Event",
      preview: "We're organizing a team building event next Friday. Please confirm your attendance.",
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
      priority: "medium",
      attachments: [{ id: 3, name: "Event_Details.pdf", size: "1.2 MB", type: "doc" }],
    },
    {
      id: "3",
      sender: "IT Support",
      senderEmail: "it@example.com",
      recipients: ["you@example.com"],
      subject: "System Maintenance",
      preview: "The system will be down for maintenance this Saturday from 10 PM to 2 AM.",
      content: `<p>Hello,</p>
      <p>This is a reminder that our systems will be undergoing scheduled maintenance this Saturday from 10 PM to 2 AM.</p>
      <p>During this time, the following services will be unavailable:</p>
      <ul>
        <li>Email</li>
        <li>Intranet</li>
        <li>File sharing</li>
        <li>Project management tools</li>
      </ul>
      <p>Please save your work and log out before the maintenance window.</p>
      <p>Thank you for your cooperation.</p>
      <p>Best regards,<br>IT Support Team</p>`,
      time: "2 days ago",
      date: "April 13, 2025",
      read: true,
    },
    {
      id: "4",
      sender: "Finance Team",
      senderEmail: "finance@example.com",
      recipients: ["you@example.com"],
      subject: "Budget Approval",
      preview: "Your budget request has been approved. The funds will be available next week.",
      content: `<p>Hello,</p>
      <p>We're pleased to inform you that your budget request for the Q2 project has been approved.</p>
      <p>The requested funds ($25,000) will be available in your department's account by next Monday.</p>
      <p>Please submit all expenses through the usual channels and remember to keep detailed records for the quarterly audit.</p>
      <p>If you have any questions about the budget allocation or expense procedures, don't hesitate to reach out.</p>
      <p>Best regards,<br>Finance Team</p>`,
      time: "3 days ago",
      date: "April 12, 2025",
      read: true,
      priority: "high",
    },
    {
      id: "5",
      sender: "Marketing Director",
      senderEmail: "marketing@example.com",
      recipients: ["you@example.com"],
      subject: "Campaign Strategy",
      preview: "Let's discuss the new marketing campaign strategy in our next meeting.",
      content: `<p>Hello,</p>
      <p>I'd like to discuss the strategy for our upcoming product launch campaign in our next team meeting.</p>
      <p>Please come prepared with ideas on:</p>
      <ul>
        <li>Target audience refinement</li>
        <li>Channel selection and budget allocation</li>
        <li>Creative direction</li>
        <li>Success metrics and KPIs</li>
      </ul>
      <p>I've attached last quarter's campaign results for reference.</p>
      <p>Looking forward to your input!</p>
      <p>Best regards,<br>Marketing Director</p>`,
      time: "1 week ago",
      date: "April 8, 2025",
      read: true,
    },
  ])

  // Sent emails state
  const [sentEmails, setSentEmails] = useState<Email[]>([])

  // Draft emails state
  const [draftEmails, setDraftEmails] = useState<DraftEmail[]>([])

  // Load emails from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedInbox = localStorage.getItem("inboxEmails")
      const savedSent = localStorage.getItem("sentEmails")
      const savedDrafts = localStorage.getItem("draftEmails")

      if (savedInbox) {
        setInboxEmails(JSON.parse(savedInbox))
      }

      if (savedSent) {
        setSentEmails(JSON.parse(savedSent))
      }

      if (savedDrafts) {
        setDraftEmails(JSON.parse(savedDrafts))
      }
    }
  }, [])

  // Save emails to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("inboxEmails", JSON.stringify(inboxEmails))
      localStorage.setItem("sentEmails", JSON.stringify(sentEmails))
      localStorage.setItem("draftEmails", JSON.stringify(draftEmails))
    }
  }, [inboxEmails, sentEmails, draftEmails])

  // Add a new sent email
  const addSentEmail = (email: Email) => {
    setSentEmails((prev) => [email, ...prev])
  }

  // Mark an email as read
  const markAsRead = (emailId: string) => {
    setInboxEmails((prev) =>
      prev.map((email) => {
        if (email.id === emailId) {
          return { ...email, read: true }
        }
        return email
      }),
    )
  }

  // Save a draft email
  const saveDraft = (draft: Omit<DraftEmail, "id" | "time" | "date">) => {
    const now = new Date()
    const id = `draft-${now.getTime()}`
    const newDraft: DraftEmail = {
      ...draft,
      id,
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    }

    setDraftEmails((prev) => [newDraft, ...prev])
    return id
  }

  // Update a draft email
  const updateDraft = (id: string, draft: Partial<Omit<DraftEmail, "id" | "time" | "date">>) => {
    const now = new Date()
    setDraftEmails((prev) =>
      prev.map((draftEmail) => {
        if (draftEmail.id === id) {
          return {
            ...draftEmail,
            ...draft,
            time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          }
        }
        return draftEmail
      }),
    )
  }

  // Delete a draft email
  const deleteDraft = (id: string) => {
    setDraftEmails((prev) => prev.filter((draft) => draft.id !== id))
  }

  // Get a draft email by id
  const getDraft = (id: string) => {
    return draftEmails.find((draft) => draft.id === id)
  }

  return (
    <EmailContext.Provider
      value={{
        inboxEmails,
        sentEmails,
        draftEmails,
        addSentEmail,
        markAsRead,
        saveDraft,
        updateDraft,
        deleteDraft,
        getDraft,
      }}
    >
      {children}
    </EmailContext.Provider>
  )
}
