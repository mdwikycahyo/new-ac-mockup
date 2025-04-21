"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, X, Minimize, Maximize, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function DocumentChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your document assistant. How can I help you understand any provided documents better?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

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

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "This document outlines the company's quarterly financial performance.",
        "The key points in this document are related to project timelines and resource allocation.",
        "This report highlights the team's achievements and challenges from the past month.",
        "The document contains information about upcoming policy changes.",
        "I can help you find specific information in this document. What are you looking for?",
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

    if (lowerQuery.includes("summary") || lowerQuery.includes("summarize")) {
      return "This document provides a comprehensive overview of the company's quarterly performance, highlighting key achievements, challenges, and future goals."
    }

    if (lowerQuery.includes("find") || lowerQuery.includes("search") || lowerQuery.includes("where")) {
      return "I can help you find information. Could you specify what you're looking for? For example, you can ask about specific sections, dates, or topics."
    }

    if (lowerQuery.includes("explain") || lowerQuery.includes("what does") || lowerQuery.includes("mean")) {
      return "This term refers to a key performance indicator used to measure the efficiency of resource allocation within the project framework."
    }

    // Default to random response if no keywords match
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg">
        <MessageSquare className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Card
      className={cn(
        "fixed right-4 z-50 transition-all duration-200 shadow-lg",
        isMinimized ? "bottom-4 h-14 w-64" : "bottom-4 h-[500px] w-80",
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
          <CardContent className="flex-1 overflow-y-auto p-3">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                >
                  <div className="flex items-start gap-2 max-w-[80%]">
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "rounded-lg p-3",
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex w-full items-center gap-2">
              <Input
                placeholder="Ask about this document..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
