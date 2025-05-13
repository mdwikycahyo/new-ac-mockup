"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Send, Paperclip, X } from "lucide-react"
import { DocumentSelectorModal } from "@/components/document-selector-modal"
import { useDemoMode } from "@/components/context/demo-mode-context"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [messageInput, setMessageInput] = useState("")
  const [chatMessages, setChatMessages] = useState(messages)
  const [documentSelectorOpen, setDocumentSelectorOpen] = useState(false)
  const [attachedDocuments, setAttachedDocuments] = useState<Document[]>([])
  const { demoMode, demoScenarioStep, setDemoScenarioStep } = useDemoMode()
  const [showResponseOptions, setShowResponseOptions] = useState(false)
  const [conversationStep, setConversationStep] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [showNormalInput, setShowNormalInput] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const responseOptionsRef = useRef<HTMLDivElement>(null)
  const [responseOptionsHeight, setResponseOptionsHeight] = useState(0)
  const router = useRouter()
  const [waitingForUserInput, setWaitingForUserInput] = useState(false)
  const [currentConversation, setCurrentConversation] = useState<string | null>(null)
  const [conversationIndex, setConversationIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [chatNotificationVisible, setChatNotificationVisible] = useState(false)

  // Dummy functions for notification handling
  const hideChatNotification = () => {
    console.log("hideChatNotification called")
  }

  const clearAllNotifications = () => {
    console.log("clearAllNotifications called")
  }

  // Predefined conversation scripts
  const concreteIdeaConversation = [
    {
      sender: "user",
      content:
        "Saya kepikiran bikin Fun Games Interaktif di kantor. Sederhana aja sih, tapi tujuannya biar tim bisa recharge bareng dan suasana kerja jadi lebih hangat.",
    },
    {
      sender: "avp",
      content: "Wah, kedengarannya menarik! Apa kamu sudah kepikiran seperti apa bentuk atau tema fun games-nya?",
    },
    {
      sender: "user",
      content: "Saya bayanginnya mungkin beberapa permainan teamwork ringan, kayak games fisik atau tebak gaya tim.",
    },
    {
      sender: "avp",
      content:
        "Menarik! Kalau kamu membayangkan fun games itu untuk semua anggota tim Earth Operation, apa ada tantangan yang menurutmu perlu dipikirkan dari sisi keterlibatan semua fungsi?",
    },
    {
      sender: "user",
      content: "Iya, saya agak khawatir soal partisipasi. Beberapa tim mungkin sibuk banget.",
    },
    {
      sender: "avp",
      content:
        "Bagus, kamu sudah antisipatif. Coba angkat dulu idenya di Earth Operation Weekly Meeting—siapa tahu mereka bisa bantu pertajam. Jadwalnya bisa kamu cek langsung di Fitur Calendar.",
      hasCalendarLink: true,
    },
  ]

  const severalOptionsConversation = [
    {
      sender: "user",
      content:
        "Saya lagi mempertimbangkan dua opsi nih: outing outdoor sehari penuh, atau fun games interaktif di kantor. Tapi masih belum yakin mana yang paling cocok. Kira-kira, dari perspektif HR, mana yang lebih pas saat ini?",
    },
    {
      sender: "avp",
      content:
        "Menarik dua-duanya! Masing-masing punya kelebihan. Boleh tahu apa yang jadi pertimbangan kamu sejauh ini?",
    },
    {
      sender: "user",
      content:
        "Kalau outing, suasananya bisa lebih seru dan bonding-nya kerasa. Tapi logistiknya agak berat. Kalau fun games di kantor, lebih fleksibel, tapi takut kurang impactful.",
    },
    {
      sender: "avp",
      content:
        "Valid banget pertimbangannya. Kalau kamu lihat kondisi tim sekarang, terutama dari sisi workload dan ketersediaan waktu, mana yang lebih feasible?",
    },
    {
      sender: "user",
      content: "Kayaknya fun games di kantor lebih realistis sih, soalnya beberapa tim lagi padat kerjaannya.",
    },
    {
      sender: "avp",
      content:
        "Makes sense. Nah, coba aja angkat ini di Earth Operation Weekly Meeting. Pandangan dari para GM dan Head bisa bantu kamu memastikan pilihan ini pas. Jadwal meeting-nya bisa langsung kamu cek di Fitur Calendar.",
      hasCalendarLink: true,
    },
  ]

  const getResponseOptions = () => {
    if (conversationStep === 1) {
      return [
        {
          id: 1,
          text: "Sudah punya ide konkret",
          fullText:
            "Saya kepikiran bikin Fun Games Interaktif di kantor. Sederhana aja sih, tapi tujuannya biar tim bisa recharge bareng dan suasana kerja jadi lebih hangat.",
          description: "Sudah memiliki ide konkret untuk kegiatan Team Building",
        },
        {
          id: 2,
          text: "Punya beberapa opsi",
          fullText:
            "Saya lagi mempertimbangkan dua opsi nih: outing outdoor sehari penuh, atau fun games interaktif di kantor. Tapi masih belum yakin mana yang paling cocok. Kira-kira, dari perspektif HR, mana yang lebih pas saat ini?",
          description: "Memiliki beberapa ide tapi butuh masukan",
        },
        {
          id: 3,
          text: "Belum punya ide",
          fullText: "Belum, saya masih belum punya ide yang konkret.",
          description: "Belum memiliki ide dan membutuhkan referensi",
        },
      ]
    } else if (conversationStep === 2) {
      return [
        {
          id: 1,
          text: "Akan diskusikan dengan tim",
          fullText:
            "Saya akan melakukan diskusi dengan para GM dan Head di Divisi Earth Operation untuk memastikan kegiatan ini tidak mengganggu target operasional tim.",
          description: "Akan mendiskusikan dengan tim manajemen",
        },
      ]
    }
    return []
  }

  // Measure response options height
  useEffect(() => {
    if (responseOptionsRef.current && showResponseOptions) {
      const height = responseOptionsRef.current.offsetHeight
      setResponseOptionsHeight(height)
    } else {
      setResponseOptionsHeight(0)
    }
  }, [showResponseOptions, getResponseOptions])

  // Update messages when in demo mode
  useEffect(() => {
    if (demoMode && demoScenarioStep >= 1) {
      // Reset messages for demo mode
      setChatMessages([])

      const hrContact = {
        id: 99,
        name: "AVP of Human Resources",
        status: "online",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage:
          "Hai, selamat pagi! Saya ingin follow up diskusi kita sebelumnya soal kegiatan Team Building. Sudah ada gambaran aktivitas yang ingin anda jalankan?",
      }

      // Set contacts to only show HR in demo mode
      contacts.length = 0
      contacts.push(hrContact)

      // Set HR as selected contact
      setSelectedContact(hrContact)

      // Add HR message if not already in the list
      if (!chatMessages.some((msg) => msg.id === 999)) {
        const hrMessage = {
          id: 999,
          sender: "other",
          content:
            "Hai, selamat pagi! Saya ingin follow up diskusi kita sebelumnya soal kegiatan Team Building. Sudah ada gambaran aktivitas yang ingin anda jalankan?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        }

        setChatMessages([hrMessage])
        setShowResponseOptions(true)
        setConversationStep(1)
      }
    }
  }, [demoMode, demoScenarioStep])

  // Check if we should continue the engagement conversation after returning from document
  useEffect(() => {
    if (typeof window !== "undefined" && demoMode) {
      const shouldContinueChat = localStorage.getItem("continueEngagementChat")
      const showNoIdeaHistory = localStorage.getItem("showNoIdeaHistory")
      const useMultipleOptionsFlow = localStorage.getItem("useMultipleOptionsFlow")

      if (shouldContinueChat === "true") {
        // Clear the flags
        localStorage.removeItem("continueEngagementChat")
        localStorage.removeItem("showNoIdeaHistory")
        localStorage.removeItem("useMultipleOptionsFlow")

        // If we should show the "no idea" history first
        if (showNoIdeaHistory === "true") {
          // Add the "no idea" conversation history
          const noIdeaConversation = [
            {
              id: 1001,
              sender: "other",
              content:
                "Hai, selamat pagi! Saya ingin follow up diskusi kita sebelumnya soal kegiatan Team Building. Sudah ada gambaran aktivitas yang ingin anda jalankan?",
              time: new Date(Date.now() - 600000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              read: true,
            },
            {
              id: 1002,
              sender: "user",
              content: "Belum, saya masih belum punya ide yang konkret.",
              time: new Date(Date.now() - 540000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              read: true,
            },
            {
              id: 1003,
              sender: "other",
              content:
                "Tidak masalah! Saya sarankan Anda melihat Dokumen Referensi Kegiatan Engagement yang berisi berbagai referensi aktivitas Team Building yang telah berhasil dilakukan. Dokumen tersebut tersedia di sistem dan bisa menjadi inspirasi yang bagus.",
              time: new Date(Date.now() - 480000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              read: true,
            },
            {
              id: 1004,
              sender: "other",
              content: "Silakan buka dokumen ini untuk referensi:",
              time: new Date(Date.now() - 420000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              read: true,
            },
            {
              id: 1005,
              sender: "other",
              content: "Dokumen Referensi Kegiatan Engagement",
              time: new Date(Date.now() - 360000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              read: true,
              isDocument: true,
              documentId: "201",
            },
          ]

          setChatMessages(noIdeaConversation)
        }

        // Add AVP HR message asking about ideas
        setTimeout(() => {
          const hrMessage = {
            id: chatMessages.length + 1000,
            sender: "other",
            content:
              "Bagaimana, sudah ada ide untuk kegiatan engagement tim? Saya lihat Anda sudah membuka dokumen referensi.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            read: false,
          }

          setChatMessages((prev) => [...prev, hrMessage])

          // Pre-fill the input based on which flow to use
          if (useMultipleOptionsFlow === "true") {
            setMessageInput(
              "Saya lagi mempertimbangkan dua opsi nih: outing outdoor sehari penuh, atau fun games interaktif di kantor. Tapi masih belum yakin mana yang paling cocok. Kira-kira, dari perspektif HR, mana yang lebih pas saat ini?",
            )
          } else {
            setMessageInput(
              "Saya kepikiran bikin Fun Games Interaktif di kantor. Sederhana aja sih, tapi tujuannya biar tim bisa recharge bareng dan suasana kerja jadi lebih hangat.",
            )
          }

          setShowNormalInput(true)
          setShowResponseOptions(false)
        }, 1000)
      }
    }
  }, [demoMode, chatMessages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [chatMessages, isTyping])

  // Handle the scripted conversation flow
  useEffect(() => {
    if (!currentConversation || !waitingForUserInput) return

    const conversation = currentConversation === "concreteIdea" ? concreteIdeaConversation : severalOptionsConversation

    if (conversationIndex >= conversation.length) return

    const currentMessage = conversation[conversationIndex]

    if (currentMessage.sender === "user" && waitingForUserInput) {
      // Wait for user input - this will be handled by the handleSendMessage function
      return
    }

    if (currentMessage.sender === "avp") {
      setIsTyping(true)

      // Simulate typing delay based on message length
      const typingDelay = Math.min(1000 + currentMessage.content.length * 10, 3000)

      setTimeout(() => {
        setIsTyping(false)

        // Add AVP message
        const avpMessage = {
          id: chatMessages.length + 1,
          sender: "other",
          content: currentMessage.content,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
          hasCalendarLink: currentMessage.hasCalendarLink,
        }

        setChatMessages((prev) => [...prev, avpMessage])

        // Move to next message in conversation
        setConversationIndex((prevIndex) => prevIndex + 1)

        // If next message is from user, wait for input
        if (conversationIndex + 1 < conversation.length && conversation[conversationIndex + 1].sender === "user") {
          setWaitingForUserInput(true)
          setMessageInput(conversation[conversationIndex + 1].content)
        } else {
          setWaitingForUserInput(false)
        }
      }, typingDelay)
    }
  }, [currentConversation, conversationIndex, waitingForUserInput, chatMessages])

  // Auto-resize textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px" // Reset height
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px` // Set new height with max of 120px
    }
  }, [messageInput])

  const handleSelectResponse = (option: number) => {
    setShowResponseOptions(false)
    setShowNormalInput(true)

    // Clear chat notification when user selects a response
    if (chatNotificationVisible) {
      hideChatNotification()
      clearAllNotifications()
    }

    // First response - Have multiple options
    if (conversationStep === 1 && option === 2) {
      const userResponse = {
        id: chatMessages.length + 1,
        sender: "user",
        content:
          "Saya lagi mempertimbangkan dua opsi nih: outing outdoor sehari penuh, atau fun games interaktif di kantor. Tapi masih belum yakin mana yang paling cocok. Kira-kira, dari perspektif HR, mana yang lebih pas saat ini?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: true,
      }

      setChatMessages((prev) => [...prev, userResponse])
      setIsTyping(true)

      // HR response after a delay
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content:
            "Menarik dua-duanya! Masing-masing punya kelebihan. Boleh tahu apa yang jadi pertimbangan kamu sejauh ini?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        }

        setChatMessages((prev) => [...prev, hrResponse])

        // Pre-fill the input with the next user message
        setMessageInput(
          "Kalau outing, suasananya bisa lebih seru dan bonding-nya kerasa. Tapi logistiknya agak berat. Kalau fun games di kantor, lebih fleksibel, tapi takut kurang impactful.",
        )
      }, 1500)
    }
    // First response - Have an idea
    else if (conversationStep === 1 && option === 1) {
      const userResponse = {
        id: chatMessages.length + 1,
        sender: "user",
        content:
          "Saya kepikiran bikin Fun Games Interaktif di kantor. Sederhana aja sih, tapi tujuannya biar tim bisa recharge bareng dan suasana kerja jadi lebih hangat.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: true,
      }

      setChatMessages((prev) => [...prev, userResponse])
      setIsTyping(true)

      // HR first response after a delay
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content: "Wah, kedengarannya menarik! Apa kamu sudah kepikiran seperti apa bentuk atau tema fun games-nya?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        }

        setChatMessages((prev) => [...prev, hrResponse])

        // Pre-fill the input with the next user message
        setMessageInput(
          "Saya bayanginnya mungkin beberapa permainan teamwork ringan, kayak games fisik atau tebak gaya tim.",
        )
      }, 1500)
    }

    // No idea option
    else if (conversationStep === 1 && option === 3) {
      const userResponse = {
        id: chatMessages.length + 1,
        sender: "user",
        content: getResponseOptions().find((o) => o.id === 3)?.fullText || "",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: true,
      }

      setChatMessages((prev) => [...prev, userResponse])
      setIsTyping(true)

      // HR response after a delay
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content:
            "Tidak masalah! Saya sarankan Anda melihat Dokumen Referensi Kegiatan Engagement yang berisi berbagai referensi aktivitas Team Building yang telah berhasil dilakukan. Dokumen tersebut tersedia di sistem dan bisa menjadi inspirasi yang bagus.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        }

        setChatMessages((prev) => [...prev, hrResponse])
        setIsTyping(true)

        // Send document link as a separate message
        setTimeout(() => {
          setIsTyping(false)
          const linkMessage = {
            id: chatMessages.length + 3,
            sender: "other",
            content: "Silakan buka dokumen ini untuk referensi:",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            read: false,
          }
          setChatMessages((prev) => [...prev, linkMessage])

          // Add document reference as a separate message with action button
          setTimeout(() => {
            const documentMessage = {
              id: chatMessages.length + 4,
              sender: "other",
              content: "Dokumen Referensi Kegiatan Engagement",
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              read: false,
              isDocument: true,
              documentId: "201",
            }
            setChatMessages((prev) => [...prev, documentMessage])
            setConversationStep(3)
            setShowNormalInput(true)
          }, 800)
        }, 1500)
      }, 1500)
    }
  }

  const handleSendMessage = () => {
    if (messageInput.trim() === "" && attachedDocuments.length === 0) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
      attachments: attachedDocuments,
    }

    setChatMessages([...chatMessages, newMessage])
    setMessageInput("")
    setAttachedDocuments([])

    // Check if this is part of the "Have an idea" conversation
    if (
      chatMessages.length >= 2 &&
      chatMessages[chatMessages.length - 1].content ===
        "Wah, kedengarannya menarik! Apa kamu sudah kepikiran seperti apa bentuk atau tema fun games-nya?" &&
      newMessage.content ===
        "Saya bayanginnya mungkin beberapa permainan teamwork ringan, kayak games fisik atau tebak gaya tim."
    ) {
      setIsTyping(true)

      // AVP HR response
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content:
            "Menarik! Kalau kamu membayangkan fun games itu untuk semua anggota tim Earth Operation, apa ada tantangan yang menurutmu perlu dipikirkan dari sisi keterlibatan semua fungsi?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        }

        setChatMessages((prev) => [...prev, hrResponse])

        // Pre-fill the input with the next user message
        setMessageInput("Iya, saya agak khawatir soal partisipasi. Beberapa tim mungkin sibuk banget.")
      }, 1500)
    }
    // Check if this is the second part of the "Have an idea" conversation
    else if (
      chatMessages.length >= 3 &&
      chatMessages[chatMessages.length - 1].content ===
        "Menarik! Kalau kamu membayangkan fun games itu untuk semua anggota tim Earth Operation, apa ada tantangan yang menurutmu perlu dipikirkan dari sisi keterlibatan semua fungsi?" &&
      newMessage.content === "Iya, saya agak khawatir soal partisipasi. Beberapa tim mungkin sibuk banget."
    ) {
      setIsTyping(true)

      // Final AVP HR response
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content:
            "Bagus, kamu sudah antisipatif. Coba angkat dulu idenya di Earth Operation Weekly Meeting—siapa tahu mereka bisa bantu pertajam. Jadwalnya bisa kamu cek langsung di Fitur Calendar.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
          hasCalendarLink: true,
        }

        setChatMessages((prev) => [...prev, hrResponse])
      }, 1500)
    }
    // Check if this is part of the "Have several options" conversation
    else if (
      chatMessages.length >= 2 &&
      chatMessages[chatMessages.length - 1].content ===
        "Menarik dua-duanya! Masing-masing punya kelebihan. Boleh tahu apa yang jadi pertimbangan kamu sejauh ini?" &&
      newMessage.content ===
        "Kalau outing, suasananya bisa lebih seru dan bonding-nya kerasa. Tapi logistiknya agak berat. Kalau fun games di kantor, lebih fleksibel, tapi takut kurang impactful."
    ) {
      setIsTyping(true)

      // AVP HR response
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content:
            "Valid banget pertimbangannya. Kalau kamu lihat kondisi tim sekarang, terutama dari sisi workload dan ketersediaan waktu, mana yang lebih feasible?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        }

        setChatMessages((prev) => [...prev, hrResponse])

        // Pre-fill the input with the next user message
        setMessageInput("Kayaknya fun games di kantor lebih realistis sih, soalnya beberapa tim lagi padat kerjaannya.")
      }, 1500)
    }
    // Check if this is the second part of the "Have several options" conversation
    else if (
      chatMessages.length >= 3 &&
      chatMessages[chatMessages.length - 1].content ===
        "Valid banget pertimbangannya. Kalau kamu lihat kondisi tim sekarang, terutama dari sisi workload dan ketersediaan waktu, mana yang lebih feasible?" &&
      newMessage.content ===
        "Kayaknya fun games di kantor lebih realistis sih, soalnya beberapa tim lagi padat kerjaannya."
    ) {
      setIsTyping(true)

      // Final AVP HR response
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content:
            "Makes sense. Nah, coba aja angkat ini di Earth Operation Weekly Meeting. Pandangan dari para GM dan Head bisa bantu kamu memastikan pilihan ini pas. Jadwal meeting-nya bisa kamu cek langsung di Fitur Calendar.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
          hasCalendarLink: true,
        }

        setChatMessages((prev) => [...prev, hrResponse])
      }, 1500)
    }
    // Check if this is the continuation from document chatbot
    else if (
      chatMessages.length > 0 &&
      chatMessages[chatMessages.length - 1].content ===
        "Bagaimana, sudah ada ide untuk kegiatan engagement tim? Saya lihat Anda sudah membuka dokumen referensi." &&
      newMessage.content ===
        "Saya kepikiran bikin Fun Games Interaktif di kantor. Sederhana aja sih, tapi tujuannya biar tim bisa recharge bareng dan suasana kerja jadi lebih hangat."
    ) {
      setIsTyping(true)

      // HR first response after a delay
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content: "Wah, kedengarannya menarik! Apa kamu sudah kepikiran seperti apa bentuk atau tema fun games-nya?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        }

        setChatMessages((prev) => [...prev, hrResponse])

        // Pre-fill the input with the next user message
        setMessageInput(
          "Saya bayanginnya mungkin beberapa permainan teamwork ringan, kayak games fisik atau tebak gaya tim.",
        )
      }, 1500)
    }
    // Check if this is the continuation from document chatbot
    else if (
      chatMessages.length > 0 &&
      chatMessages[chatMessages.length - 1].content ===
        "Bagaimana, sudah ada ide untuk kegiatan engagement tim? Saya lihat Anda sudah membuka dokumen referensi." &&
      newMessage.content ===
        "Saya lagi mempertimbangkan dua opsi nih: outing outdoor sehari penuh, atau fun games interaktif di kantor. Tapi masih belum yakin mana yang paling cocok. Kira-kira, dari perspektif HR, mana yang lebih pas saat ini?"
    ) {
      setIsTyping(true)

      // HR first response after a delay
      setTimeout(() => {
        setIsTyping(false)
        const hrResponse = {
          id: chatMessages.length + 2,
          sender: "other",
          content:
            "Menarik dua-duanya! Masing-masing punya kelebihan. Boleh tahu apa yang jadi pertimbangan kamu sejauh ini?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          read: false,
        }

        setChatMessages((prev) => [...prev, hrResponse])

        // Pre-fill the input with the next user message
        setMessageInput(
          "Kalau outing, suasananya bisa lebih seru dan bonding-nya kerasa. Tapi logistiknya agak berat. Kalau fun games di kantor, lebih fleksibel, tapi takut kurang impactful.",
        )
      }, 1500)
    }
  }

  const handleSelectDocument = (document: Document) => {
    setAttachedDocuments([...attachedDocuments, document])
    setDocumentSelectorOpen(false)
  }

  const handleRemoveAttachment = (documentId: number) => {
    setAttachedDocuments(attachedDocuments.filter((doc) => doc.id !== documentId))
  }

  const handleViewDocument = (documentId: string) => {
    router.push(`/documents/document/${documentId}`)
  }

  // Determine which contacts to show based on mode
  const displayContacts = demoMode ? contacts.filter((c) => c.id === 99) : contacts

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Chat Interface</h1>
        <p className="text-muted-foreground">Communicate with your team members in real-time</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="p-4">
            <CardTitle>Contacts</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search contacts..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-1 p-2">
                {displayContacts.map((contact) => (
                  <ContactItem
                    key={contact.id}
                    contact={contact}
                    active={contact.id === selectedContact.id}
                    onClick={() => setSelectedContact(contact)}
                  />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="flex flex-col md:col-span-2 h-[calc(100vh-200px)]">
          <CardHeader className="border-b p-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedContact.avatar || "/placeholder.svg?height=40&width=40"} />
                <AvatarFallback>
                  {selectedContact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedContact.name}</CardTitle>
                <CardDescription>
                  {selectedContact.status === "online"
                    ? "Online"
                    : selectedContact.status === "away"
                      ? "Away"
                      : "Offline"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="space-y-4 p-4">
                {chatMessages.map((message) => (
                  <MessageItem key={message.id} message={message} onViewDocument={handleViewDocument} />
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-accent text-accent-foreground">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Chat input area - Show response options in Demo Mode, normal input in Normal Mode */}
            <div className="border-t p-4 bg-background flex-shrink-0">
              {demoMode && showResponseOptions ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto" ref={responseOptionsRef}>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Select your response:</p>
                  {getResponseOptions().map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3 px-4"
                      onClick={() => handleSelectResponse(option.id)}
                    >
                      <div>
                        <p className="font-medium">{option.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <>
                  {/* Normal chat input for non-demo mode or after selecting a response */}
                  {(!demoMode || (demoMode && showNormalInput)) && (
                    <>
                      {/* Attached documents preview */}
                      {attachedDocuments.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {attachedDocuments.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm"
                            >
                              <Paperclip className="h-3 w-3" />
                              <span>{doc.title}</span>
                              <button
                                className="ml-1 rounded-full hover:bg-accent-foreground/10"
                                onClick={() => handleRemoveAttachment(doc.id)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDocumentSelectorOpen(true)}
                          title="Attach document"
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Textarea
                          ref={textareaRef}
                          placeholder="Type your message..."
                          className="flex-1 min-h-[40px] max-h-[120px] resize-none py-2 px-3"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                          rows={1}
                        />
                        <Button size="icon" onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <DocumentSelectorModal
        open={documentSelectorOpen}
        onClose={() => setDocumentSelectorOpen(false)}
        onSelect={handleSelectDocument}
      />
    </div>
  )
}

interface Contact {
  id: number
  name: string
  status: "online" | "offline" | "away"
  avatar?: string
  unread?: number
  lastMessage?: string
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Project Manager",
    status: "online",
    unread: 2,
    lastMessage: "Let's discuss the project timeline",
  },
  {
    id: 2,
    name: "Marketing Team",
    status: "online",
    lastMessage: "Campaign updates for Q3",
  },
  {
    id: 3,
    name: "HR Representative",
    status: "away",
    lastMessage: "About the Team Building event",
  },
  {
    id: 4,
    name: "IT Support",
    status: "offline",
    lastMessage: "Your ticket has been resolved",
  },
  {
    id: 5,
    name: "Finance Department",
    status: "online",
    lastMessage: "Budget approval status",
  },
]

function ContactItem({
  contact,
  active,
  onClick,
}: {
  contact: Contact
  active: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-md p-3 ${active ? "bg-accent" : "hover:bg-accent/50"}`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={contact.avatar || "/placeholder.svg?height=40&width=40"} />
          <AvatarFallback>
            {contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span
          className={`absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full border-2 border-background ${
            contact.status === "online" ? "bg-green-500" : contact.status === "away" ? "bg-yellow-500" : "bg-gray-500"
          }`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{contact.name}</p>
          {contact.unread && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {contact.unread}
            </span>
          )}
        </div>
        {contact.lastMessage && (
          <p className="truncate text-sm text-muted-foreground max-w-[250px]">{contact.lastMessage}</p>
        )}
      </div>
    </div>
  )
}

interface Document {
  id: number
  title: string
  type: "doc" | "spreadsheet" | "presentation" | "report"
  lastModified: string
  owner: string
}

interface Message {
  id: number
  sender: "user" | "other"
  content: string
  time: string
  read?: boolean
  attachments?: Document[]
  isHtml?: boolean
  isDocument?: boolean
  documentId?: string
  isCalendarLink?: boolean
  hasCalendarLink?: boolean
}

const messages: Message[] = [
  {
    id: 1,
    sender: "other",
    content: "Hello! I wanted to discuss the project timeline with you. Do you have a few minutes?",
    time: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    sender: "user",
    content: "Hi there! Yes, I'm available now. What aspects of the timeline would you like to discuss?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "other",
    content:
      "Great! I'm concerned about the deadline for the first milestone. I think we might need to adjust it by a few days.",
    time: "10:33 AM",
    read: true,
  },
  {
    id: 4,
    sender: "user",
    content:
      "I understand your concern. What's causing the potential delay? Is there anything I can help with to keep us on track?",
    time: "10:35 AM",
  },
  {
    id: 5,
    sender: "other",
    content:
      "We're waiting on some feedback from the client. They promised to get back to us by tomorrow, but I want to build in some buffer time in case they're late.",
    time: "10:36 AM",
    read: true,
  },
  {
    id: 6,
    sender: "user",
    content: "That makes sense. Let's add a 2-day buffer to the timeline. I'll update the project plan accordingly.",
    time: "10:38 AM",
  },
  {
    id: 7,
    sender: "other",
    content: "Perfect! Thank you for understanding. I'll let the team know about the adjusted timeline.",
    time: "10:40 AM",
    read: false,
  },
]

function MessageItem({ message, onViewDocument }: { message: Message; onViewDocument: (id: string) => void }) {
  const isUser = message.sender === "user"
  const router = useRouter()

  const handleCalendarClick = () => {
    router.push("/calendar")
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
        }`}
      >
        {message.isHtml ? (
          <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
        ) : message.isDocument ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Paperclip className="h-4 w-4" />
              <span className="font-medium">{message.content}</span>
            </div>
            <Button
              size="sm"
              className="self-start"
              onClick={() => message.documentId && onViewDocument(message.documentId)}
            >
              View Document
            </Button>
          </div>
        ) : message.isCalendarLink ? (
          <Button
            variant="link"
            className="p-0 h-auto text-blue-600 underline font-medium"
            onClick={handleCalendarClick}
          >
            {message.content}
          </Button>
        ) : message.hasCalendarLink ? (
          <p>
            {message.content.replace("Fitur Calendar.", "")}
            <Button
              variant="link"
              className="p-0 h-auto text-blue-600 underline font-medium"
              onClick={handleCalendarClick}
            >
              Fitur Calendar.
            </Button>
            {message.content.split("Fitur Calendar.")[1] || ""}
          </p>
        ) : (
          <p>{message.content}</p>
        )}

        {/* Display attachments if any */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2 rounded bg-background/20 p-2 text-sm">
                <Paperclip className="h-3 w-3" />
                <span className="font-medium">{doc.title}</span>
              </div>
            ))}
          </div>
        )}

        <p className={`mt-1 text-right text-xs ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {message.time}
        </p>
      </div>
    </div>
  )
}
