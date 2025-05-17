"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Inbox, Send, FileText } from "lucide-react"
import Link from "next/link"
import { useEmail } from "@/components/context/email-context"
import { useRouter, useSearchParams } from "next/navigation"

export default function EmailPage() {
  const router = useRouter()
  const { inboxEmails, sentEmails, draftEmails } = useEmail()
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "inbox"

  // Filter emails based on search query
  const filteredInboxEmails = inboxEmails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredSentEmails = sentEmails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.recipients.some((recipient) => recipient.toLowerCase().includes(searchQuery.toLowerCase())) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDraftEmails = draftEmails.filter(
    (draft) =>
      draft.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      draft.recipients.some((recipient) => recipient.toLowerCase().includes(searchQuery.toLowerCase())) ||
      draft.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDraftClick = (draftId: string) => {
    const draft = draftEmails.find((d) => d.id === draftId)
    if (!draft) return

    if (draft.type === "new") {
      router.push(`/email-compose?draft=${draftId}`)
    } else if (draft.type === "reply" || draft.type === "forward") {
      router.push(`/email/${draft.originalEmailId}?draft=${draftId}`)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email</h1>
          <p className="text-muted-foreground">Manage your communications and respond to messages</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search emails..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link href="/email-compose">
              <Plus className="mr-2 h-4 w-4" /> Compose
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 h-[80vh]">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <nav className="space-y-1">
              <Link href="/email?tab=inbox" className="block">
                <Button variant={activeTab === "inbox" ? "secondary" : "ghost"} className="w-full justify-start">
                  <Inbox className="mr-2 h-5 w-5" /> Inbox
                  <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {inboxEmails.filter((email) => !email.read).length}
                  </span>
                </Button>
              </Link>
              <Link href="/email?tab=sent" className="block">
                <Button variant={activeTab === "sent" ? "secondary" : "ghost"} className="w-full justify-start">
                  <Send className="mr-2 h-5 w-5" /> Sent
                </Button>
              </Link>
              <Link href="/email?tab=drafts" className="block">
                <Button variant={activeTab === "drafts" ? "secondary" : "ghost"} className="w-full justify-start">
                  <FileText className="mr-2 h-5 w-5" /> Drafts
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {draftEmails.length}
                  </span>
                </Button>
              </Link>
            </nav>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          {activeTab === "inbox" && (
            <>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Inbox</h3>
                  <span className="text-sm text-muted-foreground">{filteredInboxEmails.length} messages</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredInboxEmails.map((email) => (
                    <EmailItem key={email.id} email={email} />
                  ))}
                  {filteredInboxEmails.length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">
                      {searchQuery ? "No emails match your search" : "Your inbox is empty"}
                    </div>
                  )}
                </div>
              </CardContent>
            </>
          )}

          {activeTab === "sent" && (
            <>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Sent</h3>
                  <span className="text-sm text-muted-foreground">{filteredSentEmails.length} messages</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredSentEmails.map((email) => (
                    <SentEmailItem key={email.id} email={email} />
                  ))}
                  {filteredSentEmails.length === 0 && (
                    <div className="py-8 text-center text-muted-foreground">
                      {searchQuery ? "No emails match your search" : "No sent emails"}
                    </div>
                  )}
                </div>
              </CardContent>
            </>
          )}

          {activeTab === "drafts" && (
            <>
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Drafts</h3>
                  <span className="text-sm text-muted-foreground">{filteredDraftEmails.length} drafts</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {filteredDraftEmails.length > 0 ? (
                  <div className="divide-y">
                    {filteredDraftEmails.map((draft) => (
                      <DraftItem key={draft.id} draft={draft} onClick={() => handleDraftClick(draft.id)} />
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    {searchQuery ? "No drafts match your search" : "You don't have any drafts"}
                  </div>
                )}
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

interface Email {
  id: string
  sender: string
  subject: string
  preview: string
  time: string
  read: boolean
  priority?: "high" | "medium" | "low"
}

function EmailItem({ email }: { email: Email }) {
  return (
    <Link href={`/email/${email.id}`} className="block">
      <div
        className={`flex cursor-pointer items-center gap-4 p-4 hover:bg-accent ${!email.read ? "bg-accent/50" : ""}`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className={`font-medium ${!email.read ? "font-semibold" : ""}`}>{email.sender}</p>
            <p className="text-sm text-muted-foreground">{email.time}</p>
          </div>
          <p className={`truncate ${!email.read ? "font-semibold" : ""}`}>{email.subject}</p>
          <p className="truncate text-sm text-muted-foreground">{email.preview}</p>
        </div>
        {email.priority && (
          <div className="flex-shrink-0">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                email.priority === "high"
                  ? "bg-red-500"
                  : email.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
            />
          </div>
        )}
      </div>
    </Link>
  )
}

function SentEmailItem({ email }: { email: Email & { recipients: string[] } }) {
  return (
    <Link href={`/email/${email.id}`} className="block">
      <div className="flex cursor-pointer items-center gap-4 p-4 hover:bg-accent">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">To: {email.recipients.join(", ")}</p>
            <p className="text-sm text-muted-foreground">{email.time}</p>
          </div>
          <p className="truncate">{email.subject}</p>
          <p className="truncate text-sm text-muted-foreground">{email.preview}</p>
        </div>
      </div>
    </Link>
  )
}

interface DraftItemProps {
  draft: {
    id: string
    type: "new" | "reply" | "forward"
    recipients: string[]
    subject: string
    content: string
    time: string
  }
  onClick: () => void
}

function DraftItem({ draft, onClick }: DraftItemProps) {
  // Extract a preview from the content (strip HTML tags)
  const preview = draft.content.replace(/<[^>]*>/g, "").substring(0, 100)

  // Get type label
  const typeLabel = draft.type === "new" ? "New Message" : draft.type === "reply" ? "Reply" : "Forward"

  return (
    <div onClick={onClick} className="flex cursor-pointer items-center gap-4 p-4 hover:bg-accent">
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded bg-muted px-2 py-1 text-xs font-medium">{typeLabel}</span>
            <p className="font-medium">
              {draft.recipients.length > 0 ? `To: ${draft.recipients.join(", ")}` : "No recipients"}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{draft.time}</p>
        </div>
        <p className="truncate">{draft.subject || "(No subject)"}</p>
        <p className="truncate text-sm text-muted-foreground">{preview || "(No content)"}</p>
      </div>
    </div>
  )
}
