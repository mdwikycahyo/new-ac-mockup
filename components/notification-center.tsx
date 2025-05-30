"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { RoleSwitcherButton } from "@/components/role-switcher-button"
import { usePathname } from "next/navigation"

// Participant notifications
const participantNotifications = [
  {
    id: 1,
    title: "New Email Task",
    description: "You have a new email task to complete",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Meeting Scheduled",
    description: "Virtual meeting scheduled in 15 minutes",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 3,
    title: "Document Review",
    description: "Please review the quarterly report",
    time: "30 minutes ago",
    read: true,
  },
  {
    id: 4,
    title: "Task Deadline",
    description: "Task 'Data Analysis' is due in 1 hour",
    time: "45 minutes ago",
    read: true,
  },
]

// Admin notifications
const adminNotifications = [
  {
    id: 1,
    title: "New Template Created",
    description: "Customer Service Assessment template created",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Participant Completed Assessment",
    description: "Sarah Williams completed Technical Skills Assessment",
    time: "25 minutes ago",
    read: false,
  },
  {
    id: 3,
    title: "New Participants Added",
    description: "12 participants added to Project Management Assessment",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "Assessment Published",
    description: "Leadership Skills Assessment is now live",
    time: "2 hours ago",
    read: true,
  },
]

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Determine if we're in admin mode based on the URL path
  const isAdmin = pathname?.startsWith("/admin")

  // Select the appropriate notifications based on the current mode
  const notifications = isAdmin ? adminNotifications : participantNotifications

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex items-center gap-2">
      <RoleSwitcherButton />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="flex items-center justify-between p-4">
            <h4 className="font-medium">Notifications</h4>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
              Mark all as read
            </Button>
          </div>
          <Separator />
          <ScrollArea className="h-[300px]">
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`rounded-md p-3 transition-colors ${
                    notification.read ? "text-muted-foreground" : "bg-accent text-accent-foreground"
                  }`}
                >
                  <div className="flex justify-between">
                    <h5 className="font-medium">{notification.title}</h5>
                    <span className="text-xs">{notification.time}</span>
                  </div>
                  <p className="text-sm">{notification.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <div className="p-2">
            <Button variant="outline" size="sm" className="w-full">
              View all notifications
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
