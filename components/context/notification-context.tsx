"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface NotificationContextType {
  chatNotificationVisible: boolean
  popupNotificationVisible: boolean
  showChatNotification: () => void
  hideChatNotification: () => void
  showPopupNotification: () => void
  hidePopupNotification: () => void
  clearAllNotifications: () => void
  updateSidebarActiveItem: (path: string) => void
  activeItem: string | null
  hasUnreadNotifications: boolean
}

export const NotificationContext = createContext<NotificationContextType>({
  chatNotificationVisible: false,
  popupNotificationVisible: false,
  showChatNotification: () => {},
  hideChatNotification: () => {},
  showPopupNotification: () => {},
  hidePopupNotification: () => {},
  clearAllNotifications: () => {},
  updateSidebarActiveItem: () => {},
  activeItem: null,
  hasUnreadNotifications: false,
})

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [chatNotificationVisible, setChatNotificationVisible] = useState(false)
  const [popupNotificationVisible, setPopupNotificationVisible] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)

  // Update hasUnreadNotifications whenever notification states change
  useEffect(() => {
    setHasUnreadNotifications(chatNotificationVisible || popupNotificationVisible)
  }, [chatNotificationVisible, popupNotificationVisible])

  const showChatNotification = () => {
    setChatNotificationVisible(true)
    // Trigger browser notification if supported
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("New Chat Message", {
        body: "You have a new message in chat",
        icon: "/favicon.ico",
      })
    }
  }

  const hideChatNotification = () => setChatNotificationVisible(false)

  const showPopupNotification = () => {
    setPopupNotificationVisible(true)

    // Auto-hide after 8 seconds if not interacted with
    setTimeout(() => {
      setPopupNotificationVisible(false)
    }, 8000)
  }
  const hidePopupNotification = () => setPopupNotificationVisible(false)

  const clearAllNotifications = () => {
    setChatNotificationVisible(false)
    setPopupNotificationVisible(false)
  }

  const updateSidebarActiveItem = (path: string) => {
    setActiveItem(path)
    // If navigating to chat, clear chat notifications
    if (path === "/chat") {
      hideChatNotification()
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        chatNotificationVisible,
        popupNotificationVisible,
        showChatNotification,
        hideChatNotification,
        showPopupNotification,
        hidePopupNotification,
        clearAllNotifications,
        updateSidebarActiveItem,
        activeItem,
        hasUnreadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
