"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Paperclip, X } from "lucide-react"
import { DocumentSelectorModal } from "@/components/document-selector-modal"

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [messageInput, setMessageInput] = useState("")
  const [chatMessages, setChatMessages] = useState(messages)
  const [documentSelectorOpen, setDocumentSelectorOpen] = useState(false)
  const [attachedDocuments, setAttachedDocuments] = useState<Document[]>([])

  const handleSendMessage = () => {
    if (messageInput.trim() === "" && attachedDocuments.length === 0) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
      attachments: attachedDocuments,
    }

    setChatMessages([...chatMessages, newMessage])
    setMessageInput("")
    setAttachedDocuments([])
  }

  const handleSelectDocument = (document: Document) => {
    setAttachedDocuments([...attachedDocuments, document])
    setDocumentSelectorOpen(false)
  }

  const handleRemoveAttachment = (documentId: number) => {
    setAttachedDocuments(attachedDocuments.filter((doc) => doc.id !== documentId))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Chat Interface</h1>
        <p className="text-muted-foreground">Communicate with your team members in real-time</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="p-4">
            <CardTitle>Contacts</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search contacts..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-1 p-2">
                {contacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    active={contact.id === selectedContact.id}
                    onClick={() => setSelectedContact(contact)}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="flex flex-col md:col-span-2">
          <CardHeader className="border-b p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>
                  {selectedContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedContact.name}</CardTitle>
                <CardDescription>
                  {selectedContact.status === "online"
                    ? "Online"
                    : selectedContact.status === "away"
                      ? "Away"
                      : "Offline"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100vh-350px)]">
              <div className="space-y-4 p-4">
                {chatMessages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="border-t p-4">
            {/* Attached documents preview */}
            {attachedDocuments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm">
                    <Paperclip className="h-3 w-3" />
                    <span>{doc.title}</span>
                    <button
                      className="ml-1 rounded-full hover:bg-accent-foreground/10"
                      onClick={() => handleRemoveAttachment(doc.id)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDocumentSelectorOpen(true)}
                title="Attach document"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                className="flex-1"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage()
                }}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <DocumentSelectorModal
        open={documentSelectorOpen}
        onClose={() => setDocumentSelectorOpen(false)}
        onSelect={handleSelectDocument}
      />
    </div>
  )
}

interface Contact {
  id: number
  name: string
  status: "online" | "offline" | "away"
  avatar?: string
  unread?: number
  lastMessage?: string
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Project Manager",
    status: "online",
    unread: 2,
    lastMessage: "Let's discuss the project timeline",
  },
  {
    id: 2,
    name: "Marketing Team",
    status: "online",
    lastMessage: "Campaign updates for Q3",
  },
  {
    id: 3,
    name: "HR Representative",
    status: "away",
    lastMessage: "About the team building event",
  },
  {
    id: 4,
    name: "IT Support",
    status: "offline",
    lastMessage: "Your ticket has been resolved",
  },
  {
    id: 5,
    name: "Finance Department",
    status: "online",
    lastMessage: "Budget approval status",
  },
]

function ContactItem({
  contact,
  active,
  onClick,
}: {
  contact: Contact
  active: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-md p-3 ${active ? "bg-accent" : "hover:bg-accent/50"}`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={contact.avatar || "/placeholder.svg?height=40&width=40"} />
          <AvatarFallback>
            {contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full border-2 border-background ${
            contact.status === "online" ? "bg-green-500" : contact.status === "away" ? "bg-yellow-500" : "bg-gray-500"
          }`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{contact.name}</p>
          {contact.unread && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {contact.unread}
            </span>
          )}
        </div>
        {contact.lastMessage && <p className="truncate text-sm text-muted-foreground">{contact.lastMessage}</p>}
      </div>
    </div>
  )
}

interface Document {
  id: number
  title: string
  type: "doc" | "spreadsheet" | "presentation" | "report"
  lastModified: string
  owner: string
}

interface Message {
  id: number
  sender: "user" | "other"
  content: string
  time: string
  read?: boolean
  attachments?: Document[]
}

const messages: Message[] = [
  {
    id: 1,
    sender: "other",
    content: "Hello! I wanted to discuss the project timeline with you. Do you have a few minutes?",
    time: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    sender: "user",
    content: "Hi there! Yes, I'm available now. What aspects of the timeline would you like to discuss?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "other",
    content:
      "Great! I'm concerned about the deadline for the first milestone. I think we might need to adjust it by a few days.",
    time: "10:33 AM",
    read: true,
  },
  {
    id: 4,
    sender: "user",
    content:
      "I understand your concern. What's causing the potential delay? Is there anything I can help with to keep us on track?",
    time: "10:35 AM",
  },
  {
    id: 5,
    sender: "other",
    content:
      "We're waiting on some feedback from the client. They promised to get back to us by tomorrow, but I want to build in some buffer time in case they're late.",
    time: "10:36 AM",
    read: true,
  },
  {
    id: 6,
    sender: "user",
    content: "That makes sense. Let's add a 2-day buffer to the timeline. I'll update the project plan accordingly.",
    time: "10:38 AM",
  },
  {
    id: 7,
    sender: "other",
    content: "Perfect! Thank you for understanding. I'll let the team know about the adjusted timeline.",
    time: "10:40 AM",
    read: false,
  },
]

function MessageItem({ message }: { message: Message }) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
      >
        <p>{message.content}</p>

        {/* Display attachments if any */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2 rounded bg-background/20 p-2 text-sm">
                <Paperclip className="h-3 w-3" />
                <span className="font-medium">{doc.title}</span>
              </div>
            ))}
          </div>
        )}

        <p className={`mt-1 text-right text-xs ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {message.time}
        </p>
      </div>
    </div>
  )
}
