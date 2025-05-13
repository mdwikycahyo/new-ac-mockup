"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Users, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

// List of participants
const participants = [
  { name: "AVP of Earth Operation", role: "You", avatar: "/businessman-glasses.png" },
  { name: "AVP of Human Resources", role: "Meeting Host", avatar: "/professional-woman-diverse.png" },
  { name: "GM of Earth Agriculture", role: "General Manager", avatar: "/confident-businessman.png" },
  { name: "GM of Earth Food Processing", role: "General Manager", avatar: "/confident-business-woman.png" },
  { name: "GM of Earth Waste Management", role: "General Manager", avatar: "/confident-businessman.png" },
  { name: "Head of Finance & Accounting", role: "Department Head", avatar: "/confident-business-woman.png" },
  { name: "Head of General Affairs", role: "Department Head", avatar: "/confident-businessman.png" },
  { name: "Head of Procurement & IT", role: "Department Head", avatar: "/business-woman-glasses.png" },
]

export default function ConferenceRoom() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("transcript")
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [activeParticipants, setActiveParticipants] = useState(
    participants.map((p, i) => ({
      ...p,
      id: i + 1,
      speaking: false,
      video: true,
      muted: false,
      hand: false,
      isYou: p.role === "You",
    })),
  )
  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(null)
  const [pinnedParticipant, setPinnedParticipant] = useState<number | null>(1) // HR AVP pinned by default
  const [callDuration, setCallDuration] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Start timer when component mounts
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
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

  // Pin/unpin participant
  const handlePinParticipant = (participantId: number) => {
    if (pinnedParticipant === participantId) {
      setPinnedParticipant(null)
    } else {
      setPinnedParticipant(participantId)
    }
  }

  // Get pinned participant
  const getPinnedParticipant = () => {
    return activeParticipants.find((p) => p.id === pinnedParticipant)
  }

  // Get grid participants (exclude pinned participant)
  const getGridParticipants = () => {
    return activeParticipants.filter((p) => p.id !== pinnedParticipant)
  }

  // Handle end call
  const handleEndCall = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    router.push("/calendar")
  }

  return (
    <div className="flex h-[calc(100vh-1rem)] flex-col overflow-hidden bg-black p-2">
      {/* Header with back button and call timer */}
      <div className="flex items-center justify-between mb-2 px-4 py-2 bg-gray-900 rounded-lg">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 text-white hover:bg-gray-800"
            onClick={() => router.push("/calendar")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-white font-medium">Earth Operation Regular Weekly Meeting</h2>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-green-400 mr-4">
            <span className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm">Live • {formatTime(callDuration)}</span>
          </div>
        </div>
      </div>

      {/* Conference Main View */}
      <div className="flex flex-1 gap-2 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 overflow-hidden">
          {/* Pinned Participant (if any) */}
          {pinnedParticipant !== null && (
            <div className="mb-2 h-[60%] overflow-hidden rounded-lg bg-gray-900 p-1 relative">
              <div className="absolute top-2 right-2 z-10 flex gap-1">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  {getPinnedParticipant()?.speaking ? "Speaking" : "Not Speaking"}
                </Badge>
              </div>
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-800">
                {/* This would be a real video stream */}
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={getPinnedParticipant()?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {getPinnedParticipant()
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="mt-4 text-lg text-white">{getPinnedParticipant()?.name}</p>
                  <p className="text-sm text-gray-400">{getPinnedParticipant()?.role}</p>
                </div>
                {getPinnedParticipant()?.muted && (
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-red-500 text-white">
                      <MicOff className="h-3 w-3 mr-1" /> Muted
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Participant Grid */}
          <div className={`grid h-${pinnedParticipant !== null ? "[40%]" : "full"} grid-cols-3 gap-2`}>
            {getGridParticipants().map((participant) => (
              <div
                key={participant.id}
                className={`relative overflow-hidden rounded-lg ${
                  selectedParticipant === participant.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedParticipant(participant.id)}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-800">
                  {/* This would be a real video stream */}
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="mt-2 text-sm text-white">{participant.name}</p>
                    <p className="text-xs text-gray-400">{participant.role}</p>
                  </div>
                  {participant.muted && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-red-500 text-white">
                        <MicOff className="h-3 w-3 mr-1" /> Muted
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden w-80 overflow-hidden rounded-lg bg-gray-900 md:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transcript">
                <MessageSquare className="mr-2 h-4 w-4" /> Transcript
              </TabsTrigger>
              <TabsTrigger value="participants">
                <Users className="mr-2 h-4 w-4" /> Participants
              </TabsTrigger>
            </TabsList>

            <TabsContent value="participants" className="h-[calc(100%-40px)] p-0">
              <div className="flex h-full flex-col">
                <div className="border-b border-gray-800 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{participants.length} Participants</span>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-2">
                  {activeParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between rounded-md p-2 hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {participant.name}
                            {participant.isYou && " (You)"}
                          </p>
                          <p className="text-xs text-gray-400">{participant.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {participant.speaking && (
                          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                        )}
                        {participant.muted ? (
                          <MicOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Mic className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="transcript" className="h-[calc(100%-40px)] p-0">
              <div className="flex h-full flex-col">
                <div className="border-b border-gray-800 p-3">
                  <span className="text-sm font-medium text-white">Live Transcript</span>
                </div>
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <div className="w-16 text-xs text-gray-500 pt-1">00:01:15</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">Sarah Johnson (AVP HR)</div>
                        <div className="text-sm mt-1 text-gray-300">
                          Selamat pagi semua. Terima kasih sudah bergabung dalam rapat mingguan kita.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16 text-xs text-gray-500 pt-1">00:01:30</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">You (AVP Earth Operation)</div>
                        <div className="text-sm mt-1 text-gray-300">Pagi, Sarah. Senang bisa bergabung hari ini.</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16 text-xs text-gray-500 pt-1">00:02:00</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">Sarah Johnson (AVP HR)</div>
                        <div className="text-sm mt-1 text-gray-300">
                          Mari kita mulai dengan agenda pertama: program orientasi karyawan baru dan aktivitas
                          engagement.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16 text-xs text-gray-500 pt-1">00:02:30</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">You (AVP Earth Operation)</div>
                        <div className="text-sm mt-1 text-gray-300">
                          Saya sudah menyiapkan draf timeline untuk program tersebut. Berdasarkan diskusi kita minggu
                          lalu, saya memasukkan semua aktivitas engagement yang kita rencanakan.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16 text-xs text-gray-500 pt-1">00:03:00</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">Sarah Johnson (AVP HR)</div>
                        <div className="text-sm mt-1 text-gray-300">
                          Bagus sekali. Bisakah kamu membagikan draf itu dengan kami?
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16 text-xs text-gray-500 pt-1">00:03:15</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">You (AVP Earth Operation)</div>
                        <div className="text-sm mt-1 text-gray-300">
                          Tentu, saya akan mengirimkannya segera setelah rapat ini. Saya juga sudah menyiapkan beberapa
                          ide tambahan untuk aktivitas team building.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16 text-xs text-gray-500 pt-1">00:03:45</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-white">GM of Earth Food Processing</div>
                        <div className="text-sm mt-1 text-gray-300">
                          Saya pikir kita juga perlu mempertimbangkan aspek budaya dalam program orientasi ini,
                          mengingat kita memiliki karyawan dari berbagai latar belakang.
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="mt-2 flex items-center justify-center rounded-lg bg-gray-900 p-2">
        <div className="flex items-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="icon"
            className={`h-10 w-10 rounded-full ${!isMuted && "bg-gray-800 text-white hover:bg-gray-700"}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            variant={isVideoOn ? "outline" : "destructive"}
            size="icon"
            className={`h-10 w-10 rounded-full ${isVideoOn && "bg-gray-800 text-white hover:bg-gray-700"}`}
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          <Button variant="destructive" size="icon" className="h-10 w-10 rounded-full" onClick={handleEndCall}>
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
