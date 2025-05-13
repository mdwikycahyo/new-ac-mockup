"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, Video, VideoOff, Phone, Users, FileText, FolderOpen } from "lucide-react"
import { useRouter } from "next/navigation"

// Define the conversation script
const conversationScript = [
  {
    speaker: "You (AVP of Earth Operation)",
    speakerId: 1,
    content:
      "Terima kasih semuanya sudah meluangkan waktu. Saya ingin membahas rencana Fun Games Interaktif sebagai bagian dari inisiatif engagement kita tahun ini. Saya tahu masing-masing dari kita punya tantangan dan prioritas berbeda, jadi saya sangat terbuka mendengar pandangan rekan-rekan semua.",
  },
  {
    speaker: "GM of Earth Agriculture",
    speakerId: 2,
    content:
      "Saya setuju banget. Anak-anak saya akhir-akhir ini kelihatan jenuh. Aktivitas seperti ini bisa bantu menghidupkan semangat tim lagi.",
  },
  {
    speaker: "You (AVP of Earth Operation)",
    speakerId: 1,
    content:
      "Terima kasih atas dukungannya, itu jadi masukan positif. Aktivitas ini memang kami harap bisa jadi ruang pemulihan energi tim lintas unit.",
  },
  {
    speaker: "GM of Earth Waste Management",
    speakerId: 4,
    content: "Saya agak skeptis. Target bulanan kami padat, dan kegiatan semacam ini bisa jadi distraksi.",
  },
  {
    speaker: "You (AVP of Earth Operation)",
    speakerId: 1,
    content:
      "Terima kasih sudah menyampaikan kekhawatiran itu. Saya sepenuhnya paham. Salah satu opsi yang sedang kami pertimbangkan adalah games interaktif yang bisa dibagi dalam sesi pendek dan tidak harus dilakukan dalam satu waktu. Dengan begitu, masing-masing tim bisa ikut tanpa mengganggu target kerja. Apakah pendekatan seperti ini memungkinkan untuk unit Anda?",
  },
  {
    speaker: "Head of Finance & Accounting",
    speakerId: 5,
    content: "Saya khawatir soal anggaran dan beban kerja yang sedang tinggi.",
  },
  {
    speaker: "You (AVP of Earth Operation)",
    speakerId: 1,
    content:
      "Poin yang sangat penting. Saya akan coba ajukan alternatif yang minim biaya, misalnya memakai aset internal dan fasilitator dari tim kita sendiri. Saya juga akan menyusun jadwal yang menghindari jam-jam sibuk, jadi tidak menambah tekanan kerja.",
  },
  {
    speaker: "Head of Procurement & IT",
    speakerId: 7,
    content: "Saya oke saja, selama koordinasinya jelas.",
  },
  {
    speaker: "You (AVP of Earth Operation)",
    speakerId: 1,
    content: "Noted, terima kasih. Saya akan pastikan alur koordinasi terstruktur supaya semua pihak merasa nyaman.",
  },
  {
    speaker: "Head of General Affairs",
    speakerId: 6,
    content:
      "Wah, idenya seru nih! Biar semuanya semakin jelas, mungkin kamu bisa bantu buatkan draft activity dan timeline singkat? Nanti kita bisa review bareng-bareng.",
  },
  {
    speaker: "You (AVP of Earth Operation)",
    speakerId: 1,
    content:
      "Siap, itu ide bagus! Saya akan buatkan draft activity dan timeline-nya, lalu kirim ke teman-teman agar semua bisa kasih masukan dan kita bisa finalize sama-sama. Terima kasih banyak atas masukannya!",
  },
]

export default function ConferencePage() {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [transcriptMessages, setTranscriptMessages] = useState<Array<{ id: number; speaker: string; content: string }>>(
    [],
  )
  const [conversationEnded, setConversationEnded] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)

  // Start timer when component mounts
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (typingTimerRef.current) clearInterval(typingTimerRef.current)
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current)
    }
  }, [])

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":")
  }

  // Earth Operation meeting participants
  const participants = [
    {
      id: 1,
      name: "AVP of Earth Operation",
      role: "You (Meeting Host)",
      avatar: "/businessman-glasses.png",
      isYou: true,
      muted: isMuted,
      videoOff: isVideoOff,
      speaking: currentSpeakerIndex === 0,
    },
    {
      id: 2,
      name: "GM of Earth Agriculture",
      role: "General Manager",
      avatar: "/confident-businessman.png",
      isYou: false,
      muted: false,
      videoOff: false,
      speaking: currentSpeakerIndex === 1,
    },
    {
      id: 3,
      name: "GM of Earth Food Processing",
      role: "General Manager",
      avatar: "/confident-business-woman.png",
      isYou: false,
      muted: false,
      videoOff: false,
      speaking: currentSpeakerIndex === 2,
    },
    {
      id: 4,
      name: "GM of Earth Waste Management",
      role: "General Manager",
      avatar: "/confident-businessman.png",
      isYou: false,
      muted: false,
      videoOff: false,
      speaking: currentSpeakerIndex === 3,
    },
    {
      id: 5,
      name: "Head of Finance & Accounting",
      role: "Department Head",
      avatar: "/confident-business-woman.png",
      isYou: false,
      muted: false,
      videoOff: false,
      speaking: currentSpeakerIndex === 4,
    },
    {
      id: 6,
      name: "Head of General Affairs",
      role: "Department Head",
      avatar: "/confident-businessman.png",
      isYou: false,
      muted: false,
      videoOff: false,
      speaking: currentSpeakerIndex === 5,
    },
    {
      id: 7,
      name: "Head of Procurement & IT",
      role: "Department Head",
      avatar: "/business-woman-glasses.png",
      isYou: false,
      muted: false,
      videoOff: false,
      speaking: currentSpeakerIndex === 6,
    },
  ]

  // Start conversation immediately
  useEffect(() => {
    // Start the first message immediately
    startTypingMessage(0)
  }, [])

  // Handle typing effect
  useEffect(() => {
    if (isTyping && currentMessageIndex < conversationScript.length) {
      const currentMessage = conversationScript[currentMessageIndex]
      const fullText = currentMessage.content

      if (typedText.length < fullText.length) {
        // Type the next character - faster typing speed (15ms)
        typingTimerRef.current = setTimeout(() => {
          setTypedText(fullText.substring(0, typedText.length + 1))
        }, 15) // Faster typing speed
      } else {
        // Finished typing this message
        setIsTyping(false)

        // Add the complete message to transcript
        setTranscriptMessages((prev) => [
          ...prev,
          {
            id: currentMessageIndex + 1,
            speaker: currentMessage.speaker,
            content: currentMessage.content,
          },
        ])

        // Wait before starting the next message
        messageTimerRef.current = setTimeout(() => {
          if (currentMessageIndex < conversationScript.length - 1) {
            startTypingMessage(currentMessageIndex + 1)
          } else {
            // Conversation has ended
            setConversationEnded(true)
          }
        }, 1000) // Pause between messages
      }
    }
  }, [typedText, isTyping, currentMessageIndex])

  // Scroll to bottom of transcript when new messages are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [transcriptMessages, typedText])

  // Start typing a specific message
  const startTypingMessage = (messageIndex: number) => {
    if (messageIndex < conversationScript.length) {
      // Find the participant index based on the speaker ID
      const speakerId = conversationScript[messageIndex].speakerId
      const participantIndex = participants.findIndex((p) => p.id === speakerId)

      setCurrentSpeakerIndex(participantIndex)
      setCurrentMessageIndex(messageIndex)
      setTypedText("")
      setIsTyping(true)
    }
  }

  // Handle end call
  const handleEndCall = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (typingTimerRef.current) clearInterval(typingTimerRef.current)
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current)
    router.push("/documents")
  }

  // Get container heights for scrollable areas
  useEffect(() => {
    const updateHeight = () => {
      if (mainContainerRef.current && videoContainerRef.current) {
        // Get the main container height
        const mainHeight = mainContainerRef.current.offsetHeight
        // Set a minimum height for the scroll areas (80vh or the video container height)
        const minHeight = Math.max(videoContainerRef.current.offsetHeight, window.innerHeight * 0.7)
        document.documentElement.style.setProperty("--scroll-area-height", `${minHeight}px`)
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => {
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  return (
    <div className="container mx-auto p-6" ref={mainContainerRef}>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Earth Operation Regular Weekly Meeting</h1>
            <p className="text-muted-foreground">Conference call with team members</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Live • {formatTime(callDuration)}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-muted p-4">
              <div className="flex items-center gap-2">
                <CardTitle>Earth Operation Regular Weekly Meeting</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0" ref={videoContainerRef}>
              <div className="aspect-video bg-black p-2">
                <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
                  {participants.map((participant, index) => (
                    <div
                      key={participant.id}
                      className={`relative rounded-lg ${
                        participant.speaking ? "ring-2 ring-green-500" : ""
                      } bg-muted overflow-hidden`}
                    >
                      <div className="absolute bottom-1 left-1 z-10 rounded-md bg-background/80 px-1.5 py-0.5 text-xs font-medium">
                        {participant.name} {participant.isYou && "(You)"}
                        {participant.speaking && (
                          <span className="ml-1 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        )}
                        {participant.muted && <MicOff className="ml-1 inline-block h-3 w-3 text-red-500" />}
                      </div>
                      <div className="flex h-full items-center justify-center">
                        {participant.videoOff ? (
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback>
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-full w-full bg-gray-700 flex items-center justify-center">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                              <AvatarFallback>
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 border-t p-4">
                <Button variant={isMuted ? "destructive" : "outline"} size="icon" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>

                <Button
                  variant={isVideoOff ? "destructive" : "outline"}
                  size="icon"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleEndCall}
                  className={conversationEnded ? "animate-pulse ring-2 ring-red-500 relative" : ""}
                >
                  <Phone className="h-4 w-4" />
                  {conversationEnded && (
                    <span className="absolute -top-8 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded">
                      End call and check documents
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full">
            <Tabs defaultValue="transcript">
              <CardHeader className="border-b p-4">
                <div className="flex items-center justify-between">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="transcript">
                      <FileText className="mr-2 h-4 w-4" /> Transcript
                    </TabsTrigger>
                    <TabsTrigger value="participants">
                      <Users className="mr-2 h-4 w-4" /> Participants
                    </TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <TabsContent value="transcript" className="mt-0">
                  <div className="h-[var(--scroll-area-height,60vh)] overflow-auto p-4" ref={scrollRef}>
                    <div className="space-y-4">
                      {transcriptMessages.map((message) => (
                        <div key={message.id} className="border-b pb-2">
                          <div className="flex items-center">
                            <span className="font-medium">{message.speaker}</span>
                          </div>
                          <p className="mt-1 text-sm">{message.content}</p>
                        </div>
                      ))}

                      {/* Currently typing message */}
                      {isTyping && currentMessageIndex < conversationScript.length && (
                        <div className="border-b pb-2">
                          <div className="flex items-center">
                            <span className="font-medium">{conversationScript[currentMessageIndex].speaker}</span>
                          </div>
                          <p className="mt-1 text-sm">
                            {typedText}
                            <span className="inline-block h-4 w-1 bg-black ml-1 animate-pulse"></span>
                          </p>
                        </div>
                      )}

                      {/* End of conversation guidance */}
                      {conversationEnded && (
                        <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-200">
                          <p className="text-sm font-medium text-blue-800">Meeting is complete!</p>
                          <div className="mt-2 flex items-center text-sm text-blue-700">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>Click the red phone button to end the call</span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-blue-700">
                            <FolderOpen className="h-4 w-4 mr-2" />
                            <span>Then check the Documents section for reference materials</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="participants" className="mt-0">
                  <div className="h-[var(--scroll-area-height,70vh)] overflow-auto">
                    <div className="divide-y">
                      {participants.map((participant) => (
                        <div
                          key={participant.id}
                          className={`flex items-center gap-3 p-3 ${participant.speaking ? "bg-green-50" : ""}`}
                        >
                          <Avatar>
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback>
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">
                              {participant.name}{" "}
                              {participant.role === "You (Meeting Host)" && (
                                <span className="text-xs text-muted-foreground">(Host)</span>
                              )}
                              {participant.isYou && <span className="text-xs text-muted-foreground">(You)</span>}
                              {participant.speaking && (
                                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                              )}
                            </p>
                            <div className="flex items-center gap-2">
                              {participant.muted ? (
                                <MicOff className="h-3 w-3 text-muted-foreground" />
                              ) : (
                                <Mic className="h-3 w-3 text-green-500" />
                              )}
                              {participant.videoOff ? (
                                <VideoOff className="h-3 w-3 text-muted-foreground" />
                              ) : (
                                <Video className="h-3 w-3 text-green-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .chatbot-button {
          display: none !important;
        }
      `}</style>
    </div>
  )
}
