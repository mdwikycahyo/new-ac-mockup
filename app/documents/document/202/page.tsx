"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react"
import Link from "next/link"

export default function EngagementTimelinePage() {
  const [activeTab, setActiveTab] = useState("preview")

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/documents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">DRAFT AKTIVITAS & TIMELINE – FUN GAMES INTERAKTIF</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button size="sm" asChild>
            <Link href="/documents/editor?template=engagement-timeline">Edit Template</Link>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-center text-xl">DRAFT AKTIVITAS & TIMELINE – FUN GAMES INTERAKTIF</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                <section>
                  <div className="mb-6">
                    <p className="text-sm mb-2">Disusun oleh: [..................]</p>
                    <p className="text-sm">Tanggal: [..................]</p>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">1. Tujuan Kegiatan</h2>
                  <div className="border border-dashed border-gray-300 p-4 mb-4 rounded-md">
                    <p className="text-gray-500">[..................]</p>
                    <p className="text-gray-500">[..................]</p>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">2. Deskripsi Singkat Aktivitas</h2>
                  <div className="border border-dashed border-gray-300 p-4 mb-4 rounded-md">
                    <p className="text-gray-500">[..................]</p>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">3. Durasi & Waktu Pelaksanaan (Usulan)</h2>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border px-4 py-2 text-left">Kegiatan Utama</th>
                          <th className="border px-4 py-2 text-left">Durasi</th>
                          <th className="border px-4 py-2 text-left">Waktu yang Diusulkan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">4. Lokasi Kegiatan</h2>
                  <div className="border border-dashed border-gray-300 p-4 mb-4 rounded-md">
                    <p className="text-gray-500">[..................]</p>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">5. Anggaran Sementara</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border px-4 py-2 text-left">Kebutuhan</th>
                          <th className="border px-4 py-2 text-left">Estimasi Biaya</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                          <td className="border px-4 py-2 text-gray-500">[....................]</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Template Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                      <p>May 12, 2025</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Last Modified</h3>
                      <p>May 12, 2025</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                      <p>HR Templates</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Format</h3>
                      <p>Activity Planning Document</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Usage Instructions</h2>
                  <p className="text-muted-foreground mb-4">
                    This template is designed to help you plan interactive fun games and activities for employee
                    engagement. It provides a structured approach to organizing the event, including timeline, budget,
                    and logistics.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                    <li>Click the "Edit Template" button to customize this template for your specific needs.</li>
                    <li>Fill in all sections marked with [..................]</li>
                    <li>Add specific activities and their durations in the table.</li>
                    <li>Include all necessary budget items with estimated costs.</li>
                    <li>Save your completed document with a descriptive name.</li>
                    <li>Share with relevant stakeholders for feedback and approval.</li>
                  </ol>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Related Templates</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Event Planning Checklist</li>
                    <li>Team Building Activity Guide</li>
                    <li>Budget Request Form</li>
                    <li>Post-Event Evaluation Form</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
