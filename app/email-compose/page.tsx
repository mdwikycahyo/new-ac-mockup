"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Paperclip, Send, X, Save, Users, CheckCircle, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { DocumentSelectorModal } from "@/components/document-selector-modal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useRouter, useSearchParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RichTextEditor } from "@/components/rich-text-editor"
import { useDemoMode } from "@/components/context/demo-mode-context"
import { useEmail } from "@/components/context/email-context"

export default function ComposeEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const draftId = searchParams.get("draft")
  const { setAssessmentCompleted } = useDemoMode()
  const { addSentEmail, saveDraft, updateDraft, deleteDraft, getDraft } = useEmail()
  const [recipients, setRecipients] = useState<string[]>([])
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [recipientInput, setRecipientInput] = useState("")
  const [showContactPicker, setShowContactPicker] = useState(false)
  const [showDocumentSelector, setShowDocumentSelector] = useState(false)
  const [attachedDocuments, setAttachedDocuments] = useState<
    Array<{ id: number | string; title: string; type: string; content?: string; size?: string }>
  >([])
  const [savedDocuments, setSavedDocuments] = useState<any[]>([])
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null)

  // Warning dialog state
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")

  // Show warning dialog
  const showWarning = (message: string) => {
    setWarningMessage(message)
    setShowWarningDialog(true)
  }

  // Load saved documents from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const docs = JSON.parse(localStorage.getItem("documents") || "[]")
      setSavedDocuments(docs)
    }
  }, [])

  // Load draft if draftId is provided
  useEffect(() => {
    if (draftId) {
      const draft = getDraft(draftId)
      if (draft && draft.type === "new") {
        setRecipients(draft.recipients || [])
        setSubject(draft.subject || "")
        setContent(draft.content || "")
        setCurrentDraftId(draftId)

        if (draft.attachments) {
          setAttachedDocuments(
            draft.attachments.map((attachment) => ({
              id: attachment.id,
              title: attachment.name,
              type: attachment.type,
              size: attachment.size,
            })),
          )
        }
      }
    }
  }, [draftId, getDraft])

  // Animation for progress bar
  useEffect(() => {
    if (showCompletionDialog) {
      const timer = setTimeout(() => {
        setProgress(100)
        // Update assessment progress in context
        setAssessmentCompleted(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [showCompletionDialog, setAssessmentCompleted])

  const handleAddRecipient = (recipient: string) => {
    if (recipient && !recipients.includes(recipient)) {
      setRecipients([...recipients, recipient])
      setRecipientInput("")
    }
  }

  const handleRemoveRecipient = (recipient: string) => {
    setRecipients(recipients.filter((r) => r !== recipient))
  }

  const handleAttachDocument = (document: { id: number | string; title: string; type: string; content?: string }) => {
    setAttachedDocuments([...attachedDocuments, document])
    setShowDocumentSelector(false)
  }

  const handleRemoveAttachment = (documentId: number | string) => {
    setAttachedDocuments(attachedDocuments.filter((doc) => doc.id !== documentId))
  }

  const handleSend = () => {
    // Validate required fields
    if (recipients.length === 0) {
      showWarning("Please add at least one recipient")
      return
    }

    if (!subject) {
      showWarning("Please add a subject")
      return
    }

    // Create a new sent email
    const newSentEmail = {
      id: `sent-${Date.now()}`,
      sender: "You",
      senderEmail: "you@example.com",
      recipients: recipients,
      subject: subject,
      preview: content.replace(/<[^>]*>/g, "").substring(0, 100),
      content: content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      read: true,
      attachments:
        attachedDocuments.length > 0
          ? attachedDocuments.map((doc) => ({
              id: typeof doc.id === "number" ? doc.id : Number.parseInt(doc.id.toString()),
              name: doc.title,
              size: doc.size || "1.0 MB", // Placeholder size
              type: doc.type,
            }))
          : undefined,
    }

    // Add to sent emails
    addSentEmail(newSentEmail)

    // Delete draft if it exists
    if (currentDraftId) {
      deleteDraft(currentDraftId)
    }

    // Show completion dialog
    setShowCompletionDialog(true)
  }

  const handleSaveAsDraft = () => {
    // Don't save if there's nothing to save
    if (!recipients.length && !subject && !content && !attachedDocuments.length) {
      showWarning("Nothing to save as draft")
      return
    }

    const draftData = {
      type: "new" as const,
      recipients,
      subject,
      content,
      attachments:
        attachedDocuments.length > 0
          ? attachedDocuments.map((doc) => ({
              id: doc.id,
              name: doc.title,
              size: doc.size || "1.0 MB", // Placeholder size
              type: doc.type,
            }))
          : undefined,
    }

    if (currentDraftId) {
      // Update existing draft
      updateDraft(currentDraftId, draftData)
    } else {
      // Create new draft
      const newDraftId = saveDraft(draftData)
      setCurrentDraftId(newDraftId)
    }

    // Redirect to drafts tab
    router.push("/email?tab=drafts")
  }

  const isContactSelected = (email: string) => {
    return recipients.includes(email)
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
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

      <Card className="border shadow-sm">
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
                                  <AvatarFallback>
                                    {contact.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
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

          <div className="border-b p-4">
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border-none text-lg shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="min-h-[400px]">
            <div className="border-none">
              <RichTextEditor
                initialContent={content}
                onChange={handleContentChange}
                placeholder="Write your message here..."
                minHeight="400px"
              />
            </div>
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
        <DocumentSelectorModal
          open={showDocumentSelector}
          onClose={() => setShowDocumentSelector(false)}
          onSelect={handleAttachDocument}
          savedDocuments={savedDocuments}
        />
      )}

      {/* Warning Dialog */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="h-5 w-5" />
              Warning
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{warningMessage}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowWarningDialog(false)} className="w-full">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assessment Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Assessment Complete
            </DialogTitle>
            <DialogDescription>
              Congratulations! You have successfully completed the assessment scenario.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">100%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Please return to the dashboard to view your assessment progress.
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => router.push("/dashboard-new")} className="w-full">
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const conferenceContacts = [
  {
    name: "GM of Earth Agriculture",
    email: "agriculture@earthcorp.com",
    avatar: "/confident-businessman.png",
  },
  {
    name: "GM of Earth Food Processing",
    email: "food.processing@earthcorp.com",
    avatar: "/confident-business-woman.png",
  },
  {
    name: "GM of Earth Waste Management",
    email: "waste.management@earthcorp.com",
    avatar: "/businessman-glasses.png",
  },
  {
    name: "Head of Finance & Accounting",
    email: "finance@earthcorp.com",
    avatar: "/business-woman-glasses.png",
  },
  {
    name: "Head of General Affairs",
    email: "general.affairs@earthcorp.com",
    avatar: "/professional-woman-diverse.png",
  },
  {
    name: "Head of Procurement & IT",
    email: "procurement.it@earthcorp.com",
  },
]

const otherContacts = [
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
