"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Paperclip,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Smile,
  AtSign,
  Clock,
  ChevronDown,
  Send,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

export default function ComposeEmailPage() {
  const [recipients, setRecipients] = useState<string[]>([])
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [recipientInput, setRecipientInput] = useState("")
  const [showContactPicker, setShowContactPicker] = useState(false)

  const handleAddRecipient = (recipient: string) => {
    if (recipient && !recipients.includes(recipient)) {
      setRecipients([...recipients, recipient])
      setRecipientInput("")
    }
  }

  const handleRemoveRecipient = (recipient: string) => {
    setRecipients(recipients.filter((r) => r !== recipient))
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
        <CardHeader className="border-b p-4">
          <CardTitle>New Message</CardTitle>
        </CardHeader>
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
                              <AvatarImage src="/placeholder.svg?height=24&width=24" />
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

          <div className="border-b p-2">
            <Tabs defaultValue="compose">
              <TabsList>
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="format">Format</TabsTrigger>
                <TabsTrigger value="insert">Insert</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-wrap gap-1 border-b p-2">
            <Button variant="ghost" size="sm">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Underline className="h-4 w-4" />
            </Button>
            <div className="mx-1 h-4 w-px bg-border" />
            <Button variant="ghost" size="sm">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignRight className="h-4 w-4" />
            </Button>
            <div className="mx-1 h-4 w-px bg-border" />
            <Button variant="ghost" size="sm">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="mx-1 h-4 w-px bg-border" />
            <Button variant="ghost" size="sm">
              <Link2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
            <div className="ml-auto flex items-center gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Normal</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-40 p-0">
                  <div className="p-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <span className="text-xs">Normal</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <span className="text-xs">Heading 1</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <span className="text-xs">Heading 2</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <span className="text-xs">Heading 3</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="min-h-[300px] p-4">
            <div
              contentEditable
              className="min-h-[300px] outline-none"
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          <div className="flex items-center justify-between border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Paperclip className="mr-2 h-4 w-4" /> Attach Files
              </Button>
            </div>

            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link href="/email">Cancel</Link>
              </Button>
              <Button variant="outline">Save Draft</Button>
              <Button onClick={handleSend}>
                <Send className="mr-2 h-4 w-4" /> Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
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
