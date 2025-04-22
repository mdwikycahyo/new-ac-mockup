"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight, MessageSquare, Plus, Trash2, Upload, User } from "lucide-react"

// Mock data for personas
const personas = [
  {
    id: "p1",
    name: "Alex Johnson",
    role: "Marketing Director",
    image: "/placeholder.svg?height=100&width=100",
    traits: ["Analytical", "Direct", "Deadline-focused"],
    formality: 70,
    technical: 50,
    emotion: 30,
  },
  {
    id: "p2",
    name: "Sam Rivera",
    role: "Customer Support Lead",
    image: "/placeholder.svg?height=100&width=100",
    traits: ["Empathetic", "Patient", "Detail-oriented"],
    formality: 50,
    technical: 30,
    emotion: 80,
  },
]

// Mock data for personality traits
const personalityTraits = [
  "Analytical",
  "Creative",
  "Detail-oriented",
  "Big-picture thinker",
  "Direct",
  "Diplomatic",
  "Empathetic",
  "Logical",
  "Deadline-focused",
  "Flexible",
  "Patient",
  "Decisive",
  "Collaborative",
  "Independent",
]

export default function PersonaConfiguration() {
  const [selectedPersona, setSelectedPersona] = useState<string | null>("p1")
  const [formality, setFormality] = useState([70])
  const [technical, setTechnical] = useState([50])
  const [emotion, setEmotion] = useState([30])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Persona Configuration</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Step 3 of 5</span>
          <div className="flex h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div className="w-3/5 bg-primary"></div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Left - Persona Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">AI Personas</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Persona
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {personas.map((persona) => (
              <Card
                key={persona.id}
                className={`cursor-pointer transition-colors hover:border-primary ${
                  selectedPersona === persona.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedPersona(persona.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <img
                        src={persona.image || "/placeholder.svg"}
                        alt={persona.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{persona.name}</h3>
                      <p className="text-sm text-muted-foreground">{persona.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {persona.traits.map((trait) => (
                      <Badge key={trait} variant="outline">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="flex h-full cursor-pointer flex-col items-center justify-center border-dashed p-6 text-center text-muted-foreground hover:bg-accent hover:text-accent-foreground">
              <User className="mb-2 h-8 w-8" />
              <p className="font-medium">Add New Persona</p>
              <p className="text-xs">Create a new AI character</p>
            </Card>
          </div>
        </div>

        {/* Right - Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Persona Configuration</CardTitle>
            <CardDescription>Define how this AI persona will behave and communicate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedPersona ? (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Persona Name</label>
                    <Input defaultValue="Alex Johnson" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role/Title</label>
                    <Input defaultValue="Marketing Director" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Image</label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-full border">
                        <img
                          src="/placeholder.svg?height=100&width=100"
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Personality Traits</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Add personality trait" />
                      </SelectTrigger>
                      <SelectContent>
                        {personalityTraits.map((trait) => (
                          <SelectItem key={trait} value={trait}>
                            {trait}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Analytical
                        <button className="ml-1 rounded-full p-0.5 hover:bg-secondary-foreground/20">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Direct
                        <button className="ml-1 rounded-full p-0.5 hover:bg-secondary-foreground/20">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Deadline-focused
                        <button className="ml-1 rounded-full p-0.5 hover:bg-secondary-foreground/20">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-medium">Communication Style</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Formality Level</label>
                        <span className="text-sm">{formality[0]}%</span>
                      </div>
                      <Slider value={formality} min={0} max={100} step={5} onValueChange={setFormality} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Casual</span>
                        <span>Formal</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Technical Language</label>
                        <span className="text-sm">{technical[0]}%</span>
                      </div>
                      <Slider value={technical} min={0} max={100} step={5} onValueChange={setTechnical} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Simple</span>
                        <span>Technical</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Emotional Tone</label>
                        <span className="text-sm">{emotion[0]}%</span>
                      </div>
                      <Slider value={emotion} min={0} max={100} step={5} onValueChange={setEmotion} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Neutral</span>
                        <span>Emotional</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Response Patterns</h3>

                  <Tabs defaultValue="email">
                    <TabsList className="w-full">
                      <TabsTrigger value="email" className="flex-1">
                        Email
                      </TabsTrigger>
                      <TabsTrigger value="chat" className="flex-1">
                        Chat
                      </TabsTrigger>
                      <TabsTrigger value="meeting" className="flex-1">
                        Meeting
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Trigger Condition</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select trigger" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="received">When email is received</SelectItem>
                            <SelectItem value="question">When asked a question</SelectItem>
                            <SelectItem value="deadline">When deadline is mentioned</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Response Content</label>
                        <Textarea placeholder="Define how this persona should respond" rows={3} />
                      </div>
                    </TabsContent>
                    <TabsContent value="chat">
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        Configure chat response patterns
                      </div>
                    </TabsContent>
                    <TabsContent value="meeting">
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        Configure meeting response patterns
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                Select a persona to configure or create a new one
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Test Conversation
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/admin/scenarios2/create/builder">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Button asChild>
          <Link href="/admin/scenarios2/create/scoring">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
