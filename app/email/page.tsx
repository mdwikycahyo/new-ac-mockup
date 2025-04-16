import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Star, Inbox, Send, Archive, Trash, Tag } from "lucide-react"
import Link from "next/link"

export default function EmailPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Client</h1>
          <p className="text-muted-foreground">Manage your communications and respond to messages</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search emails..." className="w-full pl-8" />
          </div>
          <Button asChild>
            <Link href="/email/compose">
              <Plus className="mr-2 h-4 w-4" /> Compose
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Inbox className="mr-2 h-5 w-5" /> Inbox
                <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">2</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-2 h-5 w-5" /> Starred
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Send className="mr-2 h-5 w-5" /> Sent
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Archive className="mr-2 h-5 w-5" /> Archive
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Trash className="mr-2 h-5 w-5" /> Trash
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Tag className="mr-2 h-5 w-5" /> Labels
              </Button>
            </nav>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="p-4">
            <Tabs defaultValue="primary">
              <TabsList>
                <TabsTrigger value="primary">Primary</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="promotions">Promotions</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {emails.map((email) => (
                <EmailItem key={email.id} email={email} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface Email {
  id: number
  sender: string
  subject: string
  preview: string
  time: string
  read: boolean
  starred: boolean
  priority?: "high" | "medium" | "low"
}

const emails: Email[] = [
  {
    id: 1,
    sender: "Project Manager",
    subject: "Quarterly Report Review",
    preview: "Please review the attached quarterly report and provide feedback by EOD.",
    time: "10:30 AM",
    read: false,
    starred: true,
    priority: "high",
  },
  {
    id: 2,
    sender: "HR Department",
    subject: "Team Building Event",
    preview: "We're organizing a team building event next Friday. Please confirm your attendance.",
    time: "Yesterday",
    read: false,
    starred: false,
    priority: "medium",
  },
  {
    id: 3,
    sender: "IT Support",
    subject: "System Maintenance",
    preview: "The system will be down for maintenance this Saturday from 10 PM to 2 AM.",
    time: "2 days ago",
    read: true,
    starred: false,
  },
  {
    id: 4,
    sender: "Finance Team",
    subject: "Budget Approval",
    preview: "Your budget request has been approved. The funds will be available next week.",
    time: "3 days ago",
    read: true,
    starred: true,
  },
  {
    id: 5,
    sender: "Marketing Director",
    subject: "Campaign Strategy",
    preview: "Let's discuss the new marketing campaign strategy in our next meeting.",
    time: "1 week ago",
    read: true,
    starred: false,
  },
]

function EmailItem({ email }: { email: Email }) {
  return (
    <Link href={`/email/${email.id}`} className="block">
      <div
        className={`flex cursor-pointer items-center gap-4 p-4 hover:bg-accent ${!email.read ? "bg-accent/50" : ""}`}
      >
        <div className="flex-shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className={`h-5 w-5 ${email.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>
        </div>
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
