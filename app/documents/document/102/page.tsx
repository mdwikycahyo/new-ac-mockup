"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Printer, Share2 } from "lucide-react"
import Link from "next/link"

export default function DocumentPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/documents">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Viewer</h1>
          <p className="text-muted-foreground">View and manage your documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="border-b p-4">
              <div className="flex items-center justify-between">
                <CardTitle>Dokumen Referensi Kegiatan Engagement</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Printer className="h-4 w-4" />
                    <span className="sr-only">Print</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
              <CardDescription>Last updated: 2 weeks ago</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <h1 className="text-2xl font-bold mb-6">📄 Dokumen Referensi Kegiatan Engagement</h1>

                <div className="mb-8 p-4 border rounded-lg bg-background">
                  <h2 className="text-xl font-semibold mb-2">1. Internal Workshop: Time Management Hacks</h2>
                  <p className="mb-1">
                    <strong>Tujuan:</strong> Membantu tim meningkatkan efisiensi kerja sambil membangun rasa
                    kebersamaan.
                  </p>
                  <p className="mb-1">
                    <strong>Deskripsi:</strong> Sesi 1 jam dengan fasilitator internal membahas tips manajemen waktu.
                    Dapat dilakukan hybrid.
                  </p>
                  <p>
                    <strong>Kategori:</strong> 🟢 Low Effort, 🔵 Knowledge Sharing, 🟡 Quick Impact
                  </p>
                </div>

                <div className="mb-8 p-4 border rounded-lg bg-background">
                  <h2 className="text-xl font-semibold mb-2">2. Fun Games Interaktif: Kuis & Icebreaker</h2>
                  <p className="mb-1">
                    <strong>Tujuan:</strong> Meningkatkan suasana kerja yang menyenangkan dan mempererat tim.
                  </p>
                  <p className="mb-1">
                    <strong>Deskripsi:</strong> Permainan ringan yang bisa dilakukan di kantor, seperti trivia, tebak
                    gambar, atau "2 truths 1 lie".
                  </p>
                  <p>
                    <strong>Kategori:</strong> 🟢 Low Effort, 🟣 Team Bonding
                  </p>
                </div>

                <div className="mb-8 p-4 border rounded-lg bg-background">
                  <h2 className="text-xl font-semibold mb-2">3. Charity Box Bersama</h2>
                  <p className="mb-1">
                    <strong>Tujuan:</strong> Membangun empati dan solidaritas tim.
                  </p>
                  <p className="mb-1">
                    <strong>Deskripsi:</strong> Kolektif donasi barang/baju/paket sembako yang dikoordinasikan oleh GA.
                    Sederhana namun berdampak.
                  </p>
                  <p>
                    <strong>Kategori:</strong> 🟢 Low Effort, 🟡 Quick Impact, 🟤 Social Impact
                  </p>
                </div>

                <div className="mb-8 p-4 border rounded-lg bg-background">
                  <h2 className="text-xl font-semibold mb-2">4. Outing Hari Sabtu (1 Hari Penuh)</h2>
                  <p className="mb-1">
                    <strong>Tujuan:</strong> Membangun chemistry lintas unit dengan aktivitas luar kantor.
                  </p>
                  <p className="mb-1">
                    <strong>Deskripsi:</strong> Team building di luar kota/kantor dengan games kelompok, makan siang
                    bersama, dan sesi refleksi.
                  </p>
                  <p>
                    <strong>Kategori:</strong> 🔴 High Effort, 🟣 Team Bonding
                  </p>
                </div>

                <div className="mb-8 p-4 border rounded-lg bg-background">
                  <h2 className="text-xl font-semibold mb-2">5. Kolaborasi Proyek Mini Antar Subdivisi</h2>
                  <p className="mb-1">
                    <strong>Tujuan:</strong> Meningkatkan kolaborasi fungsional dan komunikasi tim.
                  </p>
                  <p className="mb-1">
                    <strong>Deskripsi:</strong> Tantangan kecil selama seminggu, misalnya membuat ide proses perbaikan,
                    dan dipresentasikan.
                  </p>
                  <p>
                    <strong>Kategori:</strong> 🟠 Medium Effort, 🔵 Knowledge Sharing, 🟣 Team Bonding
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Document Type</h3>
                  <p className="text-sm text-muted-foreground">Reference Document</p>
                </div>
                <div>
                  <h3 className="font-medium">Created By</h3>
                  <p className="text-sm text-muted-foreground">HR Department</p>
                </div>
                <div>
                  <h3 className="font-medium">Date Created</h3>
                  <p className="text-sm text-muted-foreground">January 15, 2023</p>
                </div>
                <div>
                  <h3 className="font-medium">Last Modified</h3>
                  <p className="text-sm text-muted-foreground">April 3, 2023</p>
                </div>
                <div>
                  <h3 className="font-medium">File Size</h3>
                  <p className="text-sm text-muted-foreground">245 KB</p>
                </div>
                <div>
                  <h3 className="font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      Team Building
                    </span>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      Engagement
                    </span>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      HR
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
