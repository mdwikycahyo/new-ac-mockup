"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share,
  MessageSquare,
  MoreVertical,
  Phone,
  Plus,
  Settings,
  Users,
  Layout,
  Hand,
  PanelRight,
  PanelLeft,
  Maximize,
  Minimize,
} from "lucide-react"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function ConferencePage() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isRaising, setIsRaising] = useState(false)
  const [layout, setLayout] = useState<"grid" | "speaker">("grid")
  const [message, setMessage] = useState("")

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`)
      })
      setIsFullScreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullScreen(false)
      }
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage("")
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conference Call</h1>
          <p className="text-muted-foreground">Virtual meeting with team members</p>
        </div>
        <Button asChild>
          <Link href="/conference/select">
            <Plus className="mr-2 h-4 w-4" /> New Call
          </Link>
        </Button>
      </div>

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className={`${showChat || showParticipants ? "lg:col-span-3" : "lg:col-span-4"}`}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-muted p-4">
              <div className="flex items-center gap-2">
                <CardTitle>Project Status Meeting</CardTitle>
                <Badge variant="destructive" className="ml-2">
                  Recording
                </Badge>
                <Badge variant="outline" className="ml-2">
                  00:45:23
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setLayout(layout === "grid" ? "speaker" : "grid")}>
                  <Layout className="mr-2 h-4 w-4" />
                  {layout === "grid" ? "Speaker View" : "Grid View"}
                </Button>
                <Button variant="outline" size="sm" onClick={toggleFullScreen}>
                  {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-black p-4">
                {layout === "grid" ? (
                  <div className="grid h-full grid-cols-2 gap-4">
                    <div className="relative rounded-lg bg-muted">
                      <div className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-1 text-xs font-medium">
                        Project Manager
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                      </div>
                      <div className="flex h-full items-center justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback>PM</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <div className="relative rounded-lg bg-muted">
                      <div className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-1 text-xs font-medium">
                        You
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                      </div>
                      <div className="flex h-full items-center justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback>YO</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <div className="relative rounded-lg bg-muted">
                      <div className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-1 text-xs font-medium">
                        Marketing Lead
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-yellow-500"></span>
                      </div>
                      <div className="flex h-full items-center justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback>ML</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <div className="relative rounded-lg bg-muted">
                      <div className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-1 text-xs font-medium">
                        Developer
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-gray-500"></span>
                      </div>
                      <div className="flex h-full items-center justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarFallback>DE</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col">
                    <div className="relative flex-1 rounded-lg bg-muted">
                      <div className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-1 text-xs font-medium">
                        Project Manager (Speaking)
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                      </div>
                      <div className="flex h-full items-center justify-center">
                        <Avatar className="h-40 w-40">
                          <AvatarFallback>PM</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <div className="relative flex-1 rounded-lg bg-muted p-2">
                        <div className="flex items-center justify-center">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>YO</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-1 text-center text-xs">You</div>
                      </div>
                      <div className="relative flex-1 rounded-lg bg-muted p-2">
                        <div className="flex items-center justify-center">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>ML</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-1 text-center text-xs">Marketing</div>
                      </div>
                      <div className="relative flex-1 rounded-lg bg-muted p-2">
                        <div className="flex items-center justify-center">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>DE</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="mt-1 text-center text-xs">Developer</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 border-t p-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={isMuted ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="center">
                    <div className="space-y-4">
                      <h4 className="font-medium">Audio Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="mic-volume">Microphone Volume</Label>
                          <span className="text-sm">80%</span>
                        </div>
                        <Slider id="mic-volume" defaultValue={[80]} max={100} step={1} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mic-select">Microphone</Label>
                        <select id="mic-select" className="w-full rounded-md border p-2">
                          <option>Default Microphone</option>
                          <option>Headset Microphone</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="noise-cancellation" defaultChecked />
                        <Label htmlFor="noise-cancellation">Noise Cancellation</Label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={isVideoOff ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="center">
                    <div className="space-y-4">
                      <h4 className="font-medium">Video Settings</h4>
                      <div className="space-y-2">
                        <Label htmlFor="camera-select">Camera</Label>
                        <select id="camera-select" className="w-full rounded-md border p-2">
                          <option>Default Camera</option>
                          <option>External Webcam</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="hd-video" defaultChecked />
                        <Label htmlFor="hd-video">HD Video</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="virtual-background" />
                        <Label htmlFor="virtual-background">Virtual Background</Label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant={isSharing ? "destructive" : "outline"} onClick={() => setIsSharing(!isSharing)}>
                  <Share className="mr-2 h-4 w-4" /> {isSharing ? "Stop Sharing" : "Share Screen"}
                </Button>

                <Button variant={isRaising ? "destructive" : "outline"} onClick={() => setIsRaising(!isRaising)}>
                  <Hand className="mr-2 h-4 w-4" /> {isRaising ? "Lower Hand" : "Raise Hand"}
                </Button>

                <Button
                  variant={showChat ? "default" : "outline"}
                  onClick={() => {
                    setShowChat(!showChat)
                    if (showParticipants && !showChat) setShowParticipants(false)
                  }}
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> Chat
                </Button>

                <Button
                  variant={showParticipants ? "default" : "outline"}
                  onClick={() => {
                    setShowParticipants(!showParticipants)
                    if (showChat && !showParticipants) setShowChat(false)
                  }}
                >
                  <Users className="mr-2 h-4 w-4" /> Participants
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <h4 className="font-medium">Meeting Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="record-meeting" defaultChecked />
                          <Label htmlFor="record-meeting">Record Meeting</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="mute-entry" />
                          <Label htmlFor="mute-entry">Mute on Entry</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="waiting-room" />
                          <Label htmlFor="waiting-room">Enable Waiting Room</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="chat-enabled" defaultChecked />
                          <Label htmlFor="chat-enabled">Enable Chat</Label>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="destructive" size="icon">
                  <Link href="/conference/select">
                    <Phone className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {(showChat || showParticipants) && (
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="border-b p-4">
                <div className="flex items-center justify-between">
                  <CardTitle>{showChat ? "Chat" : "Participants (4)"}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => (showChat ? setShowChat(false) : setShowParticipants(false))}
                  >
                    {showChat ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {showChat ? (
                  <div className="flex h-[500px] flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((message, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{message.sender}</span>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="ml-8 text-sm">{message.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          className="flex-1"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <Button onClick={handleSendMessage}>Send</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y">
                    {participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-3 p-3">
                        <Avatar>
                          {participant.avatar && <AvatarImage src={participant.avatar || "/placeholder.svg"} />}
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
                            {participant.isHost && <span className="text-xs text-muted-foreground">(Host)</span>}
                          </p>
                          <div className="flex items-center gap-2">
                            {participant.micMuted ? (
                              <MicOff className="h-3 w-3 text-muted-foreground" />
                            ) : (
                              <Mic className="h-3 w-3 text-green-500" />
                            )}
                            {participant.videoOff ? (
                              <VideoOff className="h-3 w-3 text-muted-foreground" />
                            ) : (
                              <Video className="h-3 w-3 text-green-500" />
                            )}
                            {participant.isRaisingHand && <Hand className="h-3 w-3 text-yellow-500" />}
                          </div>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="end" className="w-40">
                            <div className="space-y-1">
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                {participant.micMuted ? "Unmute" : "Mute"}
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                Pin Video
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start">
                                Private Chat
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start text-red-500">
                                Remove
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

interface Participant {
  id: number
  name: string
  avatar?: string
  isHost?: boolean
  micMuted: boolean
  videoOff: boolean
  isRaisingHand?: boolean
}

const participants: Participant[] = [
  {
    id: 1,
    name: "Project Manager",
    isHost: true,
    micMuted: false,
    videoOff: false,
    isRaisingHand: false,
  },
  {
    id: 2,
    name: "You",
    micMuted: false,
    videoOff: false,
    isRaisingHand: false,
  },
  {
    id: 3,
    name: "Marketing Lead",
    micMuted: true,
    videoOff: false,
    isRaisingHand: true,
  },
  {
    id: 4,
    name: "Developer",
    micMuted: false,
    videoOff: true,
    isRaisingHand: false,
  },
]

interface ChatMessage {
  sender: string
  content: string
  time: string
}

const chatMessages: ChatMessage[] = [
  {
    sender: "Project Manager",
    content: "Welcome everyone to our project status meeting.",
    time: "10:01 AM",
  },
  {
    sender: "Marketing Lead",
    content: "Thanks for organizing this. I have some updates on the campaign.",
    time: "10:02 AM",
  },
  {
    sender: "You",
    content: "I've completed the first milestone tasks ahead of schedule.",
    time: "10:03 AM",
  },
  {
    sender: "Developer",
    content: "I'm still working on the backend integration. Should be done by tomorrow.",
    time: "10:04 AM",
  },
  {
    sender: "Project Manager",
    content: "Great progress everyone! Let's go through each component in detail.",
    time: "10:05 AM",
  },
]
