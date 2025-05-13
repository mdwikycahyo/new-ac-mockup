"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, ChevronLeft, Star, Clock, FileText, User } from "lucide-react"
import Link from "next/link"

export default function DocumentViewPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/documents">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Document View</h1>
        </div>
        <p className="text-muted-foreground">Viewing document details</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="border-b">
              <div className="flex justify-between">
                <div>
                  <CardTitle>Dokumen Referensi Kegiatan Engagement</CardTitle>
                  <CardDescription>Reference Material</CardDescription>
                </div>
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="p-6">
                  <h2 className="mb-6 text-2xl font-bold text-center">Referensi Kegiatan Engagement</h2>

                  <section className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold border-b pb-2">Pendahuluan</h3>
                    <p className="mb-4">
                      Dokumen ini berisi kompilasi kegiatan engagement yang telah terbukti efektif
                      dalam meningkatkan kolaborasi, komunikasi, dan semangat tim. Kegiatan-kegiatan ini dapat diadaptasi 
                      sesuai dengan kebutuhan spesifik tim dan sumber daya yang tersedia.
                    </p>
                    <p>
                      Setiap kegiatan diberi kategori untuk memudahkan pemilihan berdasarkan tingkat usaha yang dibutuhkan,
                      jenis manfaat, dan dampak yang diharapkan.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold border-b pb-2">Kegiatan Low Effort</h3>

                    <div className="mb-6">
                      <h4 className="font-medium text-lg mb-2">1. Internal Workshop: Time Management Hacks</h4>
                      <p className="mb-2">
                        <strong>Tujuan:</strong> Membantu tim meningkatkan efisiensi kerja sambil membangun rasa kebersamaan.
                      </p>
                      <p className="mb-2">
                        <strong>Deskripsi:</strong> Sesi 1 jam dengan fasilitator internal membahas tips manajemen waktu. Dapat dilakukan hybrid.
                      </p>
                      <p>
                        <strong>Kategori:</strong> 🟢 Low Effort, 🔵 Knowledge Sharing, 🟡 Quick Impact
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-lg mb-2">2. Fun Games Interaktif: Kuis & Icebreaker</h4>
                      <p className="mb-2">
                        <strong>Tujuan:</strong> Meningkatkan suasana kerja yang menyenangkan dan mempererat tim.
                      </p>
                      <p className="mb-2">
                        <strong>Deskripsi:</strong> Permainan ringan yang bisa dilakukan di kantor, seperti trivia, tebak gambar, atau "2 truths 1 lie".
                      </p>
                      <p>
                        <strong>Kategori:</strong> 🟢 Low Effort, 🟣 Team Bonding
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-lg mb-2">3. Charity Box Bersama</h4>
                      <p className="mb-2">
                        <strong>Tujuan:</strong> Membangun empati dan solidaritas tim.
                      </p>
                      <p className="mb-2">
                        <strong>Deskripsi:</strong> Kolektif donasi barang/baju/paket sembako yang dikoordinasikan oleh GA. Sederhana namun berdampak.
                      </p>
                      <p>
                        <strong>Kategori:</strong> 🟢 Low Effort, 🟡 Quick Impact, 🟤 Social Impact
                      </p>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold border-b pb-2">Kegiatan Medium Effort</h3>

                    <div className="mb-6">
                      <h4 className="font-medium text-lg mb-2">1. Kolaborasi Proyek Mini Antar Subdivisi</h4>
                      <p className="mb-2">
                        <strong>Tujuan:</strong> Meningkatkan kolaborasi fungsional dan komunikasi tim.
                      </p>
                      <p className="mb-2">
                        <strong>Deskripsi:</strong> Tantangan kecil selama seminggu, misalnya membuat ide proses perbaikan, dan dipresentasikan.
                      </p>
                      <p>
                        <strong>Kategori:</strong> 🟠 Medium Effort, 🔵 Knowledge Sharing, 🟣 Team Bonding
                      </p>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold border-b pb-2">Kegiatan High Effort</h3>

                    <div className="mb-6">
                      <h4 className="font-medium text-lg mb-2">1. Outing Hari Sabtu (1 Hari Penuh)</h4>
                      <p className="mb-2">
                        <strong>Tujuan:</strong> Membangun chemistry lintas unit dengan aktivitas luar kantor.
                      </p>
                      <p className="mb-2">
                        <strong>Deskripsi:</strong> Team building di luar kota/kantor dengan games kelompok, makan siang bersama, dan sesi refleksi.
                      </p>
                      <p>
                        <strong>Kategori:</strong> 🔴 High Effort, 🟣 Team Bonding
                      </p>
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="mb-4 text-xl font-semibold border-b pb-2">Panduan Pemilihan Kegiatan</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li>
                        Sesuaikan pemilihan kegiatan dengan kebutuhan spesifik tim dan tantangan yang sedang dihadapi.
                      </li>
                      <li>
                        Pertimbangkan level kegiatan (Low, Medium, High Effort) sesuai dengan waktu dan sumber daya yang tersedia.
                      </li>
                      <li>
                        Untuk hasil maksimal, kombinasikan kegiatan dengan kategori berbeda dalam program engagement jangka panjang.
                      </li>
                      <li>
                        Evaluasi efektivitas setiap kegiatan dan lakukan penyesuaian untuk sesi berikutnya.
                      </li>
                      <li>
                        Pastikan semua anggota tim dapat berpartisipasi dengan nyaman, termasuk yang bekerja secara remote atau hybrid.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="mb-4 text-xl font-semibold border-b pb-2">Keterangan Kategori</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="mb-1"><span className="font-medium">🟢 Low Effort:</span> Kegiatan yang mudah diimplementasikan dengan sumber daya minimal</p>
                        <p className="mb-1"><span className="font-medium">🟠 Medium Effort:</span> Kegiatan yang membutuhkan perencanaan dan persiapan moderat</p>
                        <p className="mb-1"><span className="font-medium">🔴 High Effort:</span> Kegiatan yang membutuhkan perencanaan ekstensif dan sumber daya besar</p>
                      </div>
                      <div>
                        <p className="mb-1"><span className="font-medium">🔵 Knowledge Sharing:</span> Berfokus pada pertukaran informasi dan pembelajaran</p>
                        <p className="mb-1"><span className="font-medium">🟣 Team Bonding:</span> Berfokus pada membangun hubungan dan kekompakan tim</p>
                        <p className="mb-1"><span className="font-medium">🟡 Quick Impact:</span> Memberikan hasil yang cepat terlihat dan dirasakan</p>
                        <p className="mb-1"><span className="font-medium">🟤 Social Impact:</span> Memberikan dampak positif pada masyarakat</p>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">File Type</p>
                  <p className="text-sm text-muted-foreground">PDF Document</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Owner</p>
                  <p className="text-sm text-muted-foreground">HR Department</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">May 10, 2025</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Classification</p>
                  <p className="text-sm text-muted-foreground">Internal Use Only</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" className="w-full gap-1">
                <Download className="h-4 w-4" /> Download
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
