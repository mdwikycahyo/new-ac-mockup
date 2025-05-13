"use client"

import type React from "react"

import { useState, useRef, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, X, Minimize, Maximize, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useNotification } from "@/components/context/notification-context"
import { useDemoMode } from "@/components/context/demo-mode-context"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isHtml?: boolean
}

export function DocumentChatbot() {
  return (
    <Suspense fallback={null}>
      <DocumentChatbotContent />
    </Suspense>
  )
}

function DocumentChatbotContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Halo! Ada yang bisa saya bantu untuk memahami dokumen yang tersedia?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showNotification, setShowNotification] = useState(false)
  const [pulseButton, setPulseButton] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [hasEngagementConversation, setHasEngagementConversation] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { showChatNotification, showPopupNotification } = useNotification()
  const searchParams = useSearchParams()
  const documentId = searchParams.get("id")
  const [isViewingDocument, setIsViewingDocument] = useState(false)
  const { demoMode, demoScenarioStep, setDemoScenarioStep } = useDemoMode()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Auto-resize textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px" // Reset height
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px` // Set new height with max of 120px
    }
  }, [inputValue])

  // Check if we're on the reference document page and show notification
  useEffect(() => {
    if (pathname === "/documents/document/201") {
      // Wait 3 seconds before showing notification
      const timer = setTimeout(() => {
        setPulseButton(true)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setPulseButton(false)
    }
  }, [pathname])

  useEffect(() => {
    if (documentId) {
      setIsViewingDocument(true)

      // Update demo scenario step when viewing a document in demo mode
      if (demoMode && demoScenarioStep === 1) {
        setDemoScenarioStep(2)
      }
    } else {
      setIsViewingDocument(false)
    }
  }, [documentId, demoMode, demoScenarioStep, setDemoScenarioStep])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Check if this is the engagement question
    if (
      inputValue.trim() ===
        "Saya belum kepikiran ide untuk kegiatan engagement. Ada saran aktivitas yang cocok untuk kondisi tim saat ini?" ||
      (pathname === "/documents/document/201" && !hasEngagementConversation)
    ) {
      setHasEngagementConversation(true)

      // Simulate bot response with typing delay
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: `Tentu! Berdasarkan dokumen Referensi Kegiatan Engagement, ada beberapa opsi yang bisa kamu pertimbangkan:<br/><br/><strong>1. Outing Outdoor Sehari Penuh</strong><br/>Kegiatan ini sangat efektif untuk membangun kekompakan tim melalui aktivitas di luar ruangan. Cocok untuk tim yang membutuhkan penyegaran dan penguatan hubungan antar anggota.<br/><br/><strong>2. Fun Games Interaktif di Kantor</strong><br/>Solusi yang lebih praktis dan hemat biaya. Bisa dilakukan dalam waktu setengah hari dan tetap memberikan dampak positif pada semangat tim.<br/><br/><strong>3. Workshop Kreativitas</strong><br/>Fokus pada pengembangan soft skill dan kreativitas tim melalui aktivitas seperti seni, musik, atau memasak bersama.<br/><br/>Pilih yang paling sesuai dengan kondisi dan kebutuhan tim kamu saat ini!`,
          sender: "bot",
          timestamp: new Date(),
          isHtml: true,
        }
        setMessages((prev) => [...prev, botMessage])

        // Trigger notification from AVP HR after 2 seconds
        setTimeout(() => {
          // Show notification for new message in chat AND show popup notification with improved content
          showChatNotification()
          showPopupNotification({
            title: "Pesan Baru dari AVP HR",
            message:
              "Saya melihat Anda sedang mencari ide untuk kegiatan engagement tim. Saya punya beberapa masukan tambahan berdasarkan pengalaman sebelumnya. Mari kita diskusikan di chat.",
            type: "info",
          })

          // Store in localStorage that we've seen the document and should continue the conversation
          // Also store that we should show the "no idea" history and follow the "multiple options" path
          if (typeof window !== "undefined") {
            localStorage.setItem("continueEngagementChat", "true")
            localStorage.setItem("showNoIdeaHistory", "true")
            localStorage.setItem("useMultipleOptionsFlow", "true")
          }
        }, 2000)
      }, 1500)

      return
    }

    // Regular bot responses
    setTimeout(() => {
      const botResponses = [
        "Dokumen ini menjelaskan tentang kinerja keuangan perusahaan per kuartal.",
        "Poin-poin utama dalam dokumen ini terkait dengan timeline proyek dan alokasi sumber daya.",
        "Laporan ini menyoroti pencapaian dan tantangan tim dari bulan lalu.",
        "Dokumen ini berisi informasi tentang perubahan kebijakan yang akan datang.",
        "Saya dapat membantu Anda menemukan informasi spesifik dalam dokumen ini. Apa yang Anda cari?",
      ]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: getBotResponse(inputValue, botResponses),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (query: string, responses: string[]): string => {
    // Simple keyword matching for demo purposes
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("ringkasan") || lowerQuery.includes("summary")) {
      return "Dokumen ini memberikan gambaran komprehensif tentang kinerja kuartalan perusahaan, menyoroti pencapaian utama, tantangan, dan tujuan masa depan."
    }

    if (lowerQuery.includes("cari") || lowerQuery.includes("temukan") || lowerQuery.includes("dimana")) {
      return "Saya dapat membantu Anda menemukan informasi. Bisakah Anda menentukan apa yang Anda cari? Misalnya, Anda dapat bertanya tentang bagian tertentu, tanggal, atau topik."
    }

    if (lowerQuery.includes("jelaskan") || lowerQuery.includes("apa artinya") || lowerQuery.includes("maksud")) {
      return "Istilah ini mengacu pada indikator kinerja utama yang digunakan untuk mengukur efisiensi alokasi sumber daya dalam kerangka proyek."
    }

    // Default to random response if no keywords match
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault() // Prevent new line on Enter without Shift
      handleSendMessage()
    }
  }

  const handleChatbotOpen = () => {
    setIsOpen(true)
    setPulseButton(false)

    // If we're on the reference document page and haven't had the engagement conversation yet
    if (pathname === "/documents/document/201" && !hasEngagementConversation) {
      setInputValue(
        "Saya belum kepikiran ide untuk kegiatan engagement. Ada saran aktivitas yang cocok untuk kondisi tim saat ini?",
      )
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={handleChatbotOpen}
        className={cn(
          "fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg transition-all duration-300 z-50",
          pulseButton && "animate-pulse ring-4 ring-primary ring-opacity-50",
        )}
      >
        <MessageSquare className="h-5 w-5" />
        {pulseButton && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            1
          </span>
        )}
      </Button>
    )
  }

  return (
    <Card
      className={cn(
        "fixed right-4 z-50 transition-all duration-200 shadow-lg",
        isMinimized ? "bottom-4 h-14 w-64" : "bottom-4 h-[500px] w-96",
      )}
    >
      <CardHeader className="border-b p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-sm font-medium">Document Assistant</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            {isMinimized ? (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(false)}>
                <Maximize className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(true)}>
                <Minimize className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-hidden p-0 flex flex-col h-[calc(500px-80px)]">
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                  >
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "rounded-lg p-3 whitespace-pre-wrap break-words",
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                        )}
                      >
                        {message.isHtml ? (
                          <div className="text-sm" dangerouslySetInnerHTML={{ __html: message.content }} />
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                        <p className="mt-1 text-right text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-3 sticky bottom-0 bg-background">
            <div className="flex w-full items-end gap-2">
              <Textarea
                ref={textareaRef}
                placeholder="Ask about this document..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-h-[40px] resize-none py-2 px-3"
                rows={1}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()} className="h-10 w-10">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
