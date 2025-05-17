"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Reply, Forward, Paperclip, Eye, Send, X, Save, Users, Check } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { RichTextEditor } from "@/components/rich-text-editor"
import { DocumentSelectorModal } from "@/components/document-selector-modal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

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
      { id: 1, name: "Q1_Report_2025.pdf", size: "2.4 MB", type: "doc" },
      { id: 2, name: "Financial_Summary.xlsx", size: "1.1 MB", type: "spreadsheet" },
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
    attachments: [{ id: 3, name: "Event_Details.pdf", size: "1.2 MB", type: "doc" }],
  },
}

interface Document {
  id: number
  title: string
  type: "doc" | "spreadsheet" | "presentation" | "report"
  lastModified: string
  owner: string
}

// Mock contacts data
const conferenceContacts = [
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@earthoperation.com",
    role: "CEO",
    avatar: "/confident-business-woman.png",
  },
  { name: "Michael Chen", email: "michael.chen@earthoperation.com", role: "CTO", avatar: "/businessman-glasses.png" },
  {
    name: "Aisha Patel",
    email: "aisha.patel@earthoperation.com",
    role: "CFO",
    avatar: "/professional-woman-diverse.png",
  },
]

const otherContacts = [
  {
    name: "James Wilson",
    email: "james.wilson@earthoperation.com",
    role: "Project Manager",
    avatar: "/confident-businessman.png",
  },
  {
    name: "Emma Rodriguez",
    email: "emma.rodriguez@earthoperation.com",
    role: "HR Director",
    avatar: "/business-woman-glasses.png",
  },
  { name: "David Kim", email: "david.kim@earthoperation.com", role: "Marketing Lead" },
  { name: "Olivia Martinez", email: "olivia.martinez@earthoperation.com", role: "Sales Director" },
]

export default function EmailDetailPage() {
  const params = useParams()
  const emailId = params.id as string
  const email = emailData[emailId] || emailData["1"] // Fallback to first email if not found

  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [documentSelectorOpen, setDocumentSelectorOpen] = useState(false)
  const [attachedDocuments, setAttachedDocuments] = useState<Document[]>([])
  const [previewAttachment, setPreviewAttachment] = useState<any>(null)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)

  const [isForwarding, setIsForwarding] = useState(false)
  const [forwardContent, setForwardContent] = useState("")
  const [forwardAttachments, setForwardAttachments] = useState<any[]>([])

  // Email recipient state
  const [recipients, setRecipients] = useState<string[]>([])
  const [recipientInput, setRecipientInput] = useState("")
  const [showContactPicker, setShowContactPicker] = useState(false)

  const handleAddRecipient = (email: string) => {
    if (email && !recipients.includes(email)) {
      setRecipients([...recipients, email])
      setRecipientInput("")
    }
  }

  const handleRemoveRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email))
  }

  const isContactSelected = (email: string) => {
    return recipients.includes(email)
  }

  const handleSendReply = () => {
    // In a real app, this would send the reply
    alert("Reply sent successfully!")
    setIsReplying(false)
    setReplyContent("")
    setAttachedDocuments([])
  }

  const handleSendForward = () => {
    // In a real app, this would send the forwarded email
    if (recipients.length === 0) {
      alert("Please add at least one recipient")
      return
    }
    alert(`Email forwarded to ${recipients.join(", ")}`)
    setIsForwarding(false)
    setForwardContent("")
    setForwardAttachments([])
    setRecipients([])
  }

  const handleSaveAsDraft = () => {
    // In a real app, this would save the reply as a draft
    alert("Reply saved as draft!")
    setIsReplying(false)
    setReplyContent("")
    setAttachedDocuments([])
  }

  const handleSelectDocument = (document: Document) => {
    setAttachedDocuments([...attachedDocuments, document])
    setDocumentSelectorOpen(false)
  }

  const handleRemoveAttachment = (documentId: number) => {
    setAttachedDocuments(attachedDocuments.filter((doc) => doc.id !== documentId))
  }

  const prepareForwardContent = () => {
    const subject = email.subject.startsWith("Fwd:") ? email.subject : `Fwd: ${email.subject}`
    const forwardHeader = `
    <p>---------- Forwarded message ---------</p>
    <p>From: ${email.sender} &lt;${email.senderEmail}&gt;</p>
    <p>Date: ${email.date}</p>
    <p>Subject: ${email.subject}</p>
    <p>To: ${email.recipients.join(", ")}</p>
    <p>-----------------------------------------</p>
    <br/>
  `
    setForwardContent(forwardHeader + email.content)
    if (email.attachments) {
      setForwardAttachments([...email.attachments])
    }
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
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: email.content }} />
          </div>

          {email.attachments && email.attachments.length > 0 && (
            <div className="border-t p-4">
              <h3 className="mb-3 font-medium">Attachments ({email.attachments.length})</h3>
              <div className="space-y-2">
                {email.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-sm text-muted-foreground">{attachment.size}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPreviewAttachment(attachment)
                        setShowPreviewDialog(true)
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between border-t p-4">
            <div className="space-x-2">
              <Button
                onClick={() => {
                  setIsForwarding(false)
                  setIsReplying(true)
                }}
              >
                <Reply className="mr-2 h-4 w-4" /> Reply
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsReplying(false)
                  setIsForwarding(true)
                  prepareForwardContent()
                }}
              >
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

              {/* Attached documents preview */}
              {attachedDocuments.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-sm font-medium">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {attachedDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-2 rounded-md bg-accent p-2 text-sm">
                        <Paperclip className="h-4 w-4" />
                        <span>{doc.title}</span>
                        <button
                          className="ml-1 rounded-full hover:bg-accent-foreground/10"
                          onClick={() => handleRemoveAttachment(doc.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between space-x-2 mt-3">
                <Button variant="outline" onClick={() => setDocumentSelectorOpen(true)} className="gap-2">
                  <Paperclip className="h-4 w-4" /> Attach File
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsReplying(false)}>
                    Cancel
                  </Button>
                  <Button variant="outline" onClick={handleSaveAsDraft}>
                    <Save className="mr-2 h-4 w-4" /> Save as Draft
                  </Button>
                  <Button onClick={handleSendReply}>
                    <Send className="mr-2 h-4 w-4" /> Send
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isForwarding && (
            <div className="border-t p-4">
              <h3 className="mb-3 font-medium">Forward Email</h3>
              <div className="mb-4">
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
                      <Button variant="outline" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Contacts</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[350px]" align="end">
                      <Command>
                        <CommandInput placeholder="Search contacts..." />
                        <CommandList>
                          <CommandEmpty>No contacts found.</CommandEmpty>
                          <ScrollArea className="h-[300px]">
                            <CommandGroup heading="Earth Operation Executives">
                              {conferenceContacts.map((contact) => (
                                <CommandItem
                                  key={contact.email}
                                  onSelect={() => {
                                    handleAddRecipient(contact.email)
                                    // Don't close the popover after selection
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center">
                                    <Avatar className="mr-2 h-8 w-8">
                                      {contact.avatar ? (
                                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                      ) : (
                                        <AvatarFallback>
                                          {contact.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      )}
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{contact.name}</div>
                                      <div className="text-xs text-muted-foreground">{contact.email}</div>
                                    </div>
                                  </div>
                                  {isContactSelected(contact.email) && (
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                      <Check className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                  )}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                            <CommandGroup heading="Other Contacts">
                              {otherContacts.map((contact) => (
                                <CommandItem
                                  key={contact.email}
                                  onSelect={() => {
                                    handleAddRecipient(contact.email)
                                    // Don't close the popover after selection
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center">
                                    <Avatar className="mr-2 h-8 w-8">
                                      {contact.avatar ? (
                                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                      ) : (
                                        <AvatarFallback>
                                          {contact.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      )}
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{contact.name}</div>
                                      <div className="text-xs text-muted-foreground">{contact.email}</div>
                                    </div>
                                  </div>
                                  {isContactSelected(contact.email) && (
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                      <Check className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                  )}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </ScrollArea>
                        </CommandList>
                        <div className="border-t p-2">
                          <Button variant="outline" className="w-full" onClick={() => setShowContactPicker(false)}>
                            Done
                          </Button>
                        </div>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <RichTextEditor
                value={forwardContent}
                onChange={setForwardContent}
                placeholder="Add a message..."
                minHeight="200px"
              />

              {/* Forwarded attachments */}
              {forwardAttachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-sm font-medium">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {forwardAttachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center gap-2 rounded-md bg-accent p-2 text-sm">
                        <Paperclip className="h-4 w-4" />
                        <span>{attachment.name}</span>
                        <button
                          className="ml-1 rounded-full hover:bg-accent-foreground/10"
                          onClick={() =>
                            setForwardAttachments(forwardAttachments.filter((a) => a.id !== attachment.id))
                          }
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between space-x-2 mt-3">
                <Button variant="outline" onClick={() => setDocumentSelectorOpen(true)} className="gap-2">
                  <Paperclip className="h-4 w-4" /> Attach File
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsForwarding(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      alert("Draft saved!")
                      setIsForwarding(false)
                    }}
                  >
                    <Save className="mr-2 h-4 w-4" /> Save as Draft
                  </Button>
                  <Button onClick={handleSendForward}>
                    <Send className="mr-2 h-4 w-4" /> Send
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewAttachment && (
                <>
                  <Paperclip className="h-5 w-5" />
                  {previewAttachment.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription>{previewAttachment && <span>Size: {previewAttachment.size}</span>}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] mt-4 border rounded-md p-4 overflow-auto">
            {previewAttachment?.type === "doc" && (
              <div className="prose max-w-none">
                <h1>Document Preview</h1>
                <p>This is a preview of the document: {previewAttachment?.name}</p>
                <h2>Document Content</h2>
                <p>The content of this document would be displayed here in a real application.</p>
                <ul>
                  <li>Section 1: Introduction</li>
                  <li>Section 2: Methodology</li>
                  <li>Section 3: Results</li>
                  <li>Section 4: Conclusion</li>
                </ul>
              </div>
            )}
            {previewAttachment?.type === "spreadsheet" && (
              <div className="prose max-w-none">
                <h1>Spreadsheet Preview</h1>
                <p>This is a preview of the spreadsheet: {previewAttachment?.name}</p>
                <table className="border-collapse w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2">Column A</th>
                      <th className="border p-2">Column B</th>
                      <th className="border p-2">Column C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Data 1A</td>
                      <td className="border p-2">Data 1B</td>
                      <td className="border p-2">Data 1C</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Data 2A</td>
                      <td className="border p-2">Data 2B</td>
                      <td className="border p-2">Data 2C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {(!previewAttachment || !previewAttachment.type) && (
              <div className="text-center py-8 text-muted-foreground">No preview available for this document.</div>
            )}
          </ScrollArea>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DocumentSelectorModal
        open={documentSelectorOpen}
        onClose={() => setDocumentSelectorOpen(false)}
        onSelect={handleSelectDocument}
      />
    </div>
  )
}
