"use client"

import { useEffect, useState } from "react"
import { useDemoMode } from "@/components/context/demo-mode-context"
import { useNotification } from "@/components/context/notification-context"
import { MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

export function DemoScenarioManager() {
  const { demoMode, demoScenarioStep, setDemoScenarioStep } = useDemoMode()
  const { popupNotificationVisible, hidePopupNotification, showPopupNotification } = useNotification()
  const router = useRouter()
  const [currentNotification, setCurrentNotification] = useState(1)

  // Trigger the first notification after 3 seconds when entering demo mode
  useEffect(() => {
    if (demoMode && demoScenarioStep === 0) {
      const timer = setTimeout(() => {
        setCurrentNotification(1)
        showPopupNotification()
        setDemoScenarioStep(1)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [demoMode, demoScenarioStep, setDemoScenarioStep, showPopupNotification])

  // Trigger the second notification after viewing the document
  useEffect(() => {
    if (demoMode && demoScenarioStep === 2) {
      const timer = setTimeout(() => {
        setCurrentNotification(2)
        showPopupNotification()
        setDemoScenarioStep(3)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [demoMode, demoScenarioStep, setDemoScenarioStep, showPopupNotification])

  // Handle notification click
  const handleNotificationClick = () => {
    hidePopupNotification()
    router.push("/chat")
  }

  // Dismiss notification
  const dismissNotification = () => {
    hidePopupNotification()
  }

  // Add a function to handle completion modal redirection
  const handleCompletionRedirect = () => {
    hidePopupNotification()
    router.push("/dashboard-new")
  }

  if (!demoMode) return null

  // Different notification content based on which notification is being shown
  const notificationContent = {
    1: {
      title: "From: AVP of Human Resources",
      message:
        "Hai, selamat pagi! Saya ingin follow up diskusi kita sebelumnya soal inisiatif team building. Sudah ada gambaran aktivitas yang ingin anda jalankan?",
    },
    2: {
      title: "From: AVP of Human Resources",
      message:
        "Bagaimana, sudah ada ide untuk kegiatan engagement tim? Saya lihat Anda sudah membuka dokumen referensi.",
    },
    3: {
      title: "Assessment Completed",
      message:
        "Congratulations! You have successfully completed this assessment scenario. Click below to return to the dashboard.",
    },
  }

  return (
    <>
      {/* HR Chat Notification - Styled like the normal mode notification */}
      {popupNotificationVisible && (
        <div className="fixed top-4 right-4 z-50 w-[400px] animate-in fade-in slide-in-from-top-5 duration-300">
          <Card className="overflow-hidden border-2 shadow-lg w-full relative">
            <div className="flex items-center justify-between bg-black p-3 text-white">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">New Message</span>
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-600">
                    Chat Message
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>

              {/* Content with padding - with ellipsis */}
              <div className="px-6">
                <h4 className="mb-2 font-medium">{notificationContent[currentNotification].title}</h4>
                {/* <p className="mb-4 text-sm line-clamp-2">{notificationContent[currentNotification].message}</p> */}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={dismissNotification}>
                  Dismiss
                </Button>
                <Button
                  size="sm"
                  onClick={currentNotification === 3 ? handleCompletionRedirect : handleNotificationClick}
                >
                  {currentNotification === 3 ? "Go to Dashboard" : "View"}
                </Button>
              </div>
            </div>

            {/* Notification counter */}
            <div className="flex justify-center border-t bg-muted/20 p-2">
              <div className="flex gap-1">
                <button className="h-2 w-2 rounded-full bg-black" aria-label="View notification 1" />
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
