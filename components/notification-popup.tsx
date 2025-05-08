"use client"

import { useState, useEffect } from "react"
import { X, Bell, Mail, MessageSquare, CheckSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

type NotificationType = "email" | "chat" | "task"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string
  link: string
  read: boolean
  viewed: boolean
}

// Mock notifications for demonstration
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "email",
    title: "New Email from Sarah Johnson",
    message: "Project update: Q2 Planning",
    time: "Just now",
    link: "/email/123",
    read: false,
    viewed: false,
  },
  {
    id: "2",
    type: "chat",
    title: "New Message from Michael Chen",
    message: "Can we discuss the presentation?",
    time: "2 minutes ago",
    link: "/chat",
    read: false,
    viewed: false,
  },
  {
    id: "3",
    type: "task",
    title: "New Task Assigned",
    message: "Complete Q2 budget review",
    time: "5 minutes ago",
    link: "/tasks",
    read: false,
    viewed: false,
  },
]

export function NotificationPopup() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [visible, setVisible] = useState(false)
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0)

  // Simulate receiving new notifications
  useEffect(() => {
    // Initial notification after 10 seconds
    const timer = setTimeout(() => {
      setNotifications([mockNotifications[0]])
      setVisible(true)

      // Auto-hide after 5 seconds if not interacted with
      const hideTimer = setTimeout(() => {
        if (visible) setVisible(false)
      }, 5000)

      return () => clearTimeout(hideTimer)
    }, 10000)

    // Add more notifications periodically
    const intervalTimer = setInterval(() => {
      setNotifications((prev) => {
        if (prev.length < mockNotifications.length) {
          const newNotification = mockNotifications[prev.length]
          setVisible(true)
          setCurrentNotificationIndex(prev.length)

          // Auto-hide after 5 seconds
          setTimeout(() => {
            if (visible) setVisible(false)
          }, 5000)

          return [...prev, newNotification]
        }
        return prev
      })
    }, 30000) // Every 30 seconds

    return () => {
      clearTimeout(timer)
      clearInterval(intervalTimer)
    }
  }, [])

  const dismissNotification = () => {
    setVisible(false)
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      // Mark the notification as viewed
      const updatedNotifications = prev.map((notif) =>
        notif.id === id ? { ...notif, read: true, viewed: true } : notif,
      )

      // Filter out viewed notifications for the carousel
      const activeNotifications = updatedNotifications.filter((n) => !n.viewed)

      // If there are no more active notifications, hide the popup
      if (activeNotifications.length === 0) {
        setVisible(false)
        return updatedNotifications
      }

      // Set the index to the first active notification
      const firstActiveIndex = updatedNotifications.findIndex((n) => !n.viewed)
      if (firstActiveIndex !== -1) {
        setCurrentNotificationIndex(firstActiveIndex)
      }

      return updatedNotifications
    })

    setVisible(false)
  }

  // Get only unviewed notifications for the carousel
  const activeNotifications = notifications.filter((n) => !n.viewed)

  // If no active notifications or not visible, don't render
  if (!visible || activeNotifications.length === 0) return null

  const currentNotification = activeNotifications[Math.min(currentNotificationIndex, activeNotifications.length - 1)]

  // Navigate to previous notification
  const prevNotification = () => {
    setCurrentNotificationIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }

  // Navigate to next notification
  const nextNotification = () => {
    setCurrentNotificationIndex((prev) =>
      prev < activeNotifications.length - 1 ? prev + 1 : activeNotifications.length - 1,
    )
  }

  // Get icon based on notification type
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "email":
        return <Mail className="h-5 w-5" />
      case "chat":
        return <MessageSquare className="h-5 w-5" />
      case "task":
        return <CheckSquare className="h-5 w-5" />
    }
  }

  // Get label based on notification type
  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case "email":
        return "Email"
      case "chat":
        return "Chat Message"
      case "task":
        return "Task"
    }
  }

  // Get color based on notification type
  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case "email":
        return "bg-blue-100 text-blue-600"
      case "chat":
        return "bg-green-100 text-green-600"
      case "task":
        return "bg-amber-100 text-amber-600"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-[400px] animate-in fade-in slide-in-from-top-5 duration-300">
      <Card className="overflow-hidden border-2 shadow-lg w-full relative">
        <div className="flex items-center justify-between bg-black p-3 text-white">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span className="font-medium">New Notification</span>
            {activeNotifications.length > 1 && (
              <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-black">
                {currentNotificationIndex + 1} of {activeNotifications.length}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/20"
            onClick={dismissNotification}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          {/* Type indicator and icon in one row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  getTypeColor(currentNotification.type),
                )}
              >
                {getIcon(currentNotification.type)}
              </div>
              <span
                className={cn(
                  "inline-block rounded-full px-2 py-1 text-xs font-medium",
                  getTypeColor(currentNotification.type),
                )}
              >
                {getTypeLabel(currentNotification.type)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{currentNotification.time}</p>
          </div>

          {/* Content with padding to avoid navigation buttons */}
          <div className="px-6">
            <h4 className="mb-2 font-medium">{currentNotification.title}</h4>
            <p className="mb-4 text-sm">{currentNotification.message}</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={dismissNotification}>
              Dismiss
            </Button>
            <Button size="sm" onClick={() => markAsRead(currentNotification.id)} asChild>
              <Link href={currentNotification.link}>View</Link>
            </Button>
          </div>
        </div>

        {/* Navigation buttons */}
        {activeNotifications.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-r-full border-l-0 bg-background/80 shadow-sm backdrop-blur-sm"
              onClick={prevNotification}
              disabled={currentNotificationIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous notification</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-l-full border-r-0 bg-background/80 shadow-sm backdrop-blur-sm"
              onClick={nextNotification}
              disabled={currentNotificationIndex === activeNotifications.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next notification</span>
            </Button>
          </>
        )}

        {/* Notification counter if multiple */}
        {activeNotifications.length > 1 && (
          <div className="flex justify-center border-t bg-muted/20 p-2">
            <div className="flex gap-1">
              {activeNotifications.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentNotificationIndex ? "bg-black" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentNotificationIndex(index)}
                  aria-label={`View notification ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
