"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Paperclip, AtSign, Send, X, Save } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { RichTextEditor } from "@/components/rich-text-editor"

export default function ComposeEmailPage() {
  const [recipients, setRecipients] = useState<string[]>([])
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [recipientInput, setRecipientInput] = useState("")
  const [showContactPicker, setShowContactPicker] = useState(false)
  const [showDocumentSelector, setShowDocumentSelector] = useState(false)
  const [attachedDocuments, setAttachedDocuments] = useState<Array<{ id: number; title: string; type: string }>>([])

  const handleAddRecipient = (recipient: string) => {
    if (recipient && !recipients.includes(recipient)) {
      setRecipients([...recipients, recipient])
      setRecipientInput("")
    }
  }

  const handleRemoveRecipient = (recipient: string) => {
    setRecipients(recipients.filter((r) => r !== recipient))
  }

  const handleAttachDocument = (document: { id: number; title: string; type: string }) => {
    setAttachedDocuments([...attachedDocuments, document])
    setShowDocumentSelector(false)
  }

  const handleRemoveAttachment = (documentId: number) => {
    setAttachedDocuments(attachedDocuments.filter((doc) => doc.id !== documentId))
  }

  const handleSend = () => {
    // Validate required fields
    if (recipients.length === 0) {
      alert("Please add at least one recipient")
      return
    }

    if (!subject) {
      alert("Please add a subject")
      return
    }

    // In a real app, this would send the email
    alert("Email sent successfully!")
    // Then redirect to inbox
    window.location.href = "/email"
  }

  const handleSaveAsDraft = () => {
    // In a real app, this would save the email as a draft
    alert("Email saved as draft!")
    // Then redirect to inbox
    window.location.href = "/email"
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
          <h1 className="text-3xl font-bold tracking-tight">Compose Email</h1>
          <p className="text-muted-foreground">Create and send a new message</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="border-b p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-medium">To:</div>
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {recipients.map((recipient) => (
                  <div key={recipient} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm">
                    <span>{recipient}</span>
                    <button
                      onClick={() => handleRemoveRecipient(recipient)}
                      className="ml-1 rounded-full p-1 hover:bg-muted-foreground/20"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="flex-1">
                  <Input
                    value={recipientInput}
                    onChange={(e) => setRecipientInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && recipientInput) {
                        e.preventDefault()
                        handleAddRecipient(recipientInput)
                      }
                    }}
                    placeholder="Type email address or name"
                    className="border-none shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
              <Popover open={showContactPicker} onOpenChange={setShowContactPicker}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <AtSign className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                  <Command>
                    <CommandInput placeholder="Search contacts..." />
                    <CommandList>
                      <CommandEmpty>No contacts found.</CommandEmpty>
                      <CommandGroup>
                        {contacts.map((contact) => (
                          <CommandItem
                            key={contact.email}
                            onSelect={() => {
                              handleAddRecipient(contact.email)
                              setShowContactPicker(false)
                            }}
                          >
                            <Avatar className="mr-2 h-6 w-6">
                              <AvatarFallback>
                                {contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{contact.name}</span>
                            <span className="ml-2 text-sm text-muted-foreground">{contact.email}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="border-b p-4">
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border-none text-lg shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="min-h-[300px]">
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Write your message here..."
              minHeight="300px"
            />
          </div>

          {attachedDocuments.length > 0 && (
            <div className="border-t p-4">
              <h3 className="text-sm font-medium mb-2">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {attachedDocuments.map((doc) => (
                  <Badge key={doc.id} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                    {doc.title}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0"
                      onClick={() => handleRemoveAttachment(doc.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setShowDocumentSelector(true)}>
                <Paperclip className="mr-2 h-4 w-4" /> Attach Files
              </Button>
            </div>

            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link href="/email">Cancel</Link>
              </Button>
              <Button variant="outline" onClick={handleSaveAsDraft}>
                <Save className="mr-2 h-4 w-4" /> Save as Draft
              </Button>
              <Button onClick={handleSend}>
                <Send className="mr-2 h-4 w-4" /> Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showDocumentSelector && (
        <DocumentSelectorModal onClose={() => setShowDocumentSelector(false)} onSelect={handleAttachDocument} />
      )}
    </div>
  )
}

const contacts = [
  {
    name: "Project Manager",
    email: "pm@example.com",
  },
  {
    name: "Marketing Team",
    email: "marketing@example.com",
  },
  {
    name: "HR Representative",
    email: "hr@example.com",
  },
  {
    name: "IT Support",
    email: "it@example.com",
  },
  {
    name: "Finance Department",
    email: "finance@example.com",
  },
]

interface DocumentSelectorModalProps {
  onClose: () => void
  onSelect: (document: { id: number; title: string; type: string }) => void
}

function DocumentSelectorModal({ onClose, onSelect }: DocumentSelectorModalProps) {
  const documents = [
    { id: 1, title: "Quarterly Report Draft", type: "doc" },
    { id: 2, title: "Project Timeline", type: "spreadsheet" },
    { id: 3, title: "Marketing Presentation", type: "presentation" },
    { id: 4, title: "Budget Analysis", type: "spreadsheet" },
    { id: 5, title: "Meeting Notes", type: "doc" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-background p-6">
        <h2 className="mb-4 text-xl font-bold">Select Document to Attach</h2>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-accent"
                onClick={() => onSelect(doc)}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-muted p-2">
                    {doc.type === "doc" && <FileIcon className="h-4 w-4" />}
                    {doc.type === "spreadsheet" && <SpreadsheetIcon className="h-4 w-4" />}
                    {doc.type === "presentation" && <PresentationIcon className="h-4 w-4" />}
                  </div>
                  <span>{doc.title}</span>
                </div>
                <Button variant="ghost" size="sm">
                  Select
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function SpreadsheetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
      <line x1="8" y1="9" x2="10" y2="9" />
    </svg>
  )
}

function PresentationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9.5 12.5l.5 .5 2 -1.5" />
      <path d="M9.5 17.5l.5 .5 2 -1.5" />
    </svg>
  )
}
