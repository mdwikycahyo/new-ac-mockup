"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Search, Video, X } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export default function SelectContactsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])
  const [meetingTitle, setMeetingTitle] = useState("")

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleToggleContact = (contactId: number) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    } else {
      setSelectedContacts([...selectedContacts, contactId])
    }
  }

  const handleStartCall = () => {
    // Store selected contacts in sessionStorage
    sessionStorage.setItem("selectedContacts", JSON.stringify(selectedContacts))
    sessionStorage.setItem("meetingTitle", meetingTitle)

    // Navigate to the conference page
    router.push("/conference")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Start Conference Call</h1>
          <p className="text-muted-foreground">Select participants for your call</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Select Contacts</CardTitle>
                <div className="text-sm text-muted-foreground">{selectedContacts.length} selected</div>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[400px] overflow-y-auto">
                <div className="divide-y">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center gap-3 p-4 hover:bg-accent/50"
                      onClick={() => handleToggleContact(contact.id)}
                    >
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => handleToggleContact(contact.id)}
                      />
                      <Avatar>
                        <AvatarImage src={contact.avatar || "/placeholder.svg?height=40&width=40"} />
                        <AvatarFallback>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`block h-2 w-2 rounded-full ${
                            contact.status === "online"
                              ? "bg-green-500"
                              : contact.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                          }`}
                        />
                        <span className="text-xs text-muted-foreground capitalize">{contact.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Call Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Meeting Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    placeholder="Add title"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                  />
                  {meetingTitle.trim() === "" && <p className="text-xs text-red-500">Meeting title is required</p>}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">Selected Participants ({selectedContacts.length})</h3>
                  {selectedContacts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No participants selected</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedContacts.map((contactId) => {
                        const contact = contacts.find((c) => c.id === contactId)
                        if (!contact) return null

                        return (
                          <div key={contact.id} className="flex items-center justify-between rounded-md border p-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={contact.avatar || "/placeholder.svg?height=24&width=24"} />
                                <AvatarFallback>
                                  {contact.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{contact.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleContact(contact.id)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-4">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleStartCall}
                    disabled={selectedContacts.length === 0 || meetingTitle.trim() === ""}
                  >
                    <Video className="mr-2 h-4 w-4" /> Start Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface Contact {
  id: number
  name: string
  role: string
  status: "online" | "offline" | "away"
  avatar?: string
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "AVP of Human Resources",
    role: "Meeting Host",
    status: "online",
  },
  {
    id: 2,
    name: "General Manager - Production",
    role: "General Manager",
    status: "away",
  },
  {
    id: 3,
    name: "General Manager - Quality Control",
    role: "General Manager",
    status: "online",
  },
  {
    id: 4,
    name: "Head of Supply Chain",
    role: "Department Head",
    status: "offline",
  },
  {
    id: 5,
    name: "Head of Operations Planning",
    role: "Department Head",
    status: "online",
  },
]
