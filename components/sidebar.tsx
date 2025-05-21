"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
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
  User,
  PlayCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDemoMode } from "@/components/context/demo-mode-context"
import { useNotification } from "@/components/context/notification-context"

// Mock data for notifications
const notifications = {
  "/chat": 3,
  "/email": 2,
}

const navItems = [
  {
    name: "Home",
    href: "/dashboard-new",
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
    href: "/conference/select",
    icon: Phone,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FolderOpen,
  },
  {
    name: "Project Management",
    href: "/projects",
    icon: CheckSquare,
    hasNotification: true,
  },
  {
    name: "Results",
    href: "/results",
    icon: BarChart2,
    hideInDemo: true,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const isAdmin = pathname.startsWith("/admin")
  const [isOpen, setIsOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [isSaved, setIsSaved] = useState(true)
  const { demoMode, toggleDemoMode, demoScenarioStep } = useDemoMode()
  const {
    chatNotificationVisible,
    hideChatNotification,
    hidePopupNotification,
    clearAllNotifications,
    activeItem,
    updateSidebarActiveItem,
  } = useNotification()

  // Show chat notification in demo mode by default
  useEffect(() => {
    if (demoMode && !chatNotificationVisible) {
      // We'll use the existing context but just make the UI show the notification
      // without triggering the popup
    }
  }, [demoMode, chatNotificationVisible])

  // Update active item based on pathname and notification context
  useEffect(() => {
    // Determine from pathname
    const matchingItem = navItems.find(
      (item) => pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href)),
    )

    if (matchingItem) {
      updateSidebarActiveItem(matchingItem.href)
    }
  }, [pathname, updateSidebarActiveItem])

  // Simulate save status changes
  const toggleSaveStatus = () => {
    setIsSaved(false)
    setTimeout(() => setIsSaved(true), 2000)
  }

  // Handle mode switching with scroll to top
  const handleToggleDemoMode = () => {
    window.scrollTo(0, 0)
    toggleDemoMode()
  }

  // Handle menu item click
  const handleMenuItemClick = (href: string, hasNotification = false) => {
    setIsOpen(false)
    updateSidebarActiveItem(href)

    if (hasNotification) {
      toggleSaveStatus()
      // Clear notification for this item when clicked
      if (href === "/chat" && chatNotificationVisible) {
        // Clear all notifications in the context
        clearAllNotifications()
        hideChatNotification()
      }
    }

    router.push(href)
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
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          demoMode ? "bg-blue-50" : "bg-background",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex flex-col border-b">
            <div className="px-6 py-2">
              <h1 className="text-xl font-bold">{demoMode ? "AVP of Earth Operation" : "Assessment Participant"}</h1>
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
              {navItems
                .filter((item) => !demoMode || !item.hideInDemo)
                .map((item) => (
                  <li key={item.name}>
                    <button
                      className={cn(
                        "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        activeItem === item.href
                          ? demoMode
                            ? "bg-blue-500 text-white"
                            : "bg-accent text-accent-foreground"
                          : "text-muted-foreground",
                        demoMode
                          ? "hover:bg-blue-400 hover:text-white"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                      onClick={() => handleMenuItemClick(item.href, item.hasNotification)}
                    >
                      <div className="flex items-center w-full">
                        <div className="relative mr-3">
                          <item.icon className="h-5 w-5" />
                          {/* Show notifications based on mode */}
                          {!demoMode && item.hasNotification && notifications[item.href] && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                              {notifications[item.href]}
                            </span>
                          )}
                          {/* Always show chat notification in demo mode */}
                          {demoMode && item.href === "/chat" && chatNotificationVisible && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-pulse">
                              1
                            </span>
                          )}
                        </div>
                        {item.name}
                      </div>
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="border-t p-4 space-y-2 mt-auto">
            <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/help")}>
              <HelpCircle className="mr-2 h-5 w-5" />
              Help & Support
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleToggleDemoMode}>
              <PlayCircle className="mr-2 h-5 w-5" />
              {demoMode ? "Normal Mode" : "Demo Mode"}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push(isAdmin ? "/" : "/admin")}
            >
              {isAdmin ? <User className="mr-2 h-5 w-5" /> : <UserCog className="mr-2 h-5 w-5" />}
              {isAdmin ? "Switch to Participant" : "Switch to Admin"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
