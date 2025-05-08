"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Mail,
  MessageSquare,
  Calendar,
  CheckSquare,
  Phone,
  FolderOpen,
  BarChart2,
  Home,
  HelpCircle,
  Menu,
  X,
  Users,
  Wifi,
  WifiOff,
  Check,
  UserCog, 
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for notifications
const notifications = {
  "/chat": 3,
  "/email": 2,
  "/tasks": 1,
}

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
    hasNotification: true,
  },
  {
    name: "Email",
    href: "/email",
    icon: Mail,
    hasNotification: true,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Call",
    href: "/conference",
    icon: Phone,
  },
  {
    name: "Resources",
    href: "/resources",
    icon: FolderOpen,
  },
  {
    name: "Project Management",
    href: "/tasks",
    icon: CheckSquare,
    hasNotification: true,
  },
  {
    name: "Results",
    href: "/results",
    icon: BarChart2,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const [isOpen, setIsOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isSaved, setIsSaved] = useState(true)

  // Simulate save status changes
  const toggleSaveStatus = () => {
    setIsSaved(false)
    setTimeout(() => setIsSaved(true), 2000)
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex flex-col border-b">
            <div className="px-6 py-2">
              <h1 className="text-xl font-bold">Assessment Participant</h1>
            </div>
            <div className="flex items-center gap-4 px-6 py-2">
              {isOnline ? (
                <div className="flex items-center gap-1 text-green-500" title="Online">
                  <Wifi className="h-4 w-4" />
                  <span className="text-xs">Online</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-500" title="Offline">
                  <WifiOff className="h-4 w-4" />
                  <span className="text-xs">Offline</span>
                </div>
              )}
              <div
                className={cn(
                  "flex items-center gap-1 transition-opacity",
                  isSaved ? "text-green-500" : "text-amber-500",
                )}
                title={isSaved ? "All changes saved" : "Saving..."}
              >
                {isSaved ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <div className="h-4 w-4 animate-pulse rounded-full bg-amber-500"></div>
                )}
                <span className="text-xs">{isSaved ? "Saved" : "Saving..."}</span>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground",
                    )}
                    onClick={() => {
                      setIsOpen(false)
                      if (item.hasNotification) toggleSaveStatus()
                    }}
                  >
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <item.icon className="h-5 w-5" />
                        {item.hasNotification && notifications[item.href] && (
                          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                            {notifications[item.href]}
                          </span>
                        )}
                      </div>
                      {item.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t p-4 space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/help">
                <HelpCircle className="mr-2 h-5 w-5" />
                Help & Support
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin">
                {isAdmin ? <User className="mr-2 h-5 w-5" /> : <UserCog className="mr-2 h-5 w-5" />}
                {isAdmin ? "Switch to Participant" : "Switch to Admin"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
