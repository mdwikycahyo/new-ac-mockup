"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Download, Share } from "lucide-react"
import { useDocumentContext } from "@/components/context/document-context"
import { format } from "date-fns"

export default function DocumentViewPage() {
  const params = useParams()
  const router = useRouter()
  const { documents } = useDocumentContext()
  const [document, setDocument] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const documentId = Array.isArray(params.id) ? params.id[0] : params.id

  useEffect(() => {
    // First try to load from localStorage for user-created documents
    if (typeof window !== "undefined" && documentId) {
      const localDocs = JSON.parse(localStorage.getItem("documents") || "[]")
      const localDoc = localDocs.find((doc: any) => doc.id.toString() === documentId.toString())

      if (localDoc) {
        setDocument(localDoc)
        setLoading(false)
        return
      }
    }

    // If not found in localStorage, check the context
    if (documents && documentId) {
      const foundDoc = documents.find((doc) => doc.id.toString() === documentId.toString())

      if (foundDoc) {
        setDocument(foundDoc)
        setLoading(false)
        return
      }
    }

    // If still not found, check reference resources
    const referenceId = Number.parseInt(documentId.toString(), 10)
    if (referenceId === 201) {
      // Handle the specific reference document with ID 201
      setDocument({
        id: 201,
        title: "Dokumen Referensi Kegiatan Engagement",
        category: "HR Documents",
        author: "HR Department",
        createdAt: "2025-04-01",
        content: `
          <h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">Dokumen Referensi Kegiatan Engagement</h1>
          <p style="margin-bottom: 16px;">Panduan komprehensif untuk aktivitas engagement dan team building yang efektif.</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Pendahuluan</h2>
          <p style="margin-bottom: 16px;">Dokumen ini berisi kompilasi kegiatan engagement yang telah terbukti efektif dalam meningkatkan kolaborasi, komunikasi, dan semangat tim. Kegiatan-kegiatan ini dapat diadaptasi sesuai dengan kebutuhan spesifik tim dan sumber daya yang tersedia.</p>
          <p style="margin-bottom: 16px;">Setiap kegiatan diberi kategori untuk memudahkan pemilihan berdasarkan tingkat usaha yang dibutuhkan, jenis manfaat, dan dampak yang diharapkan.</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Kegiatan Low Effort</h2>
          
          <h3 style="font-size: 18px; margin-top: 20px; margin-bottom: 10px; color: #555; font-weight: bold;">1. Internal Workshop: Time Management Hacks</h3>
          <p style="margin-bottom: 8px;"><strong>Tujuan:</strong> Membantu tim meningkatkan efisiensi kerja sambil membangun rasa kebersamaan.</p>
          <p style="margin-bottom: 8px;"><strong>Deskripsi:</strong> Sesi 1 jam dengan fasilitator internal membahas tips manajemen waktu. Dapat dilakukan hybrid.</p>
          <p style="margin-bottom: 16px;"><strong>Kategori:</strong> 🟢 Low Effort, 🔵 Knowledge Sharing, 🟡 Quick Impact</p>
          
          <h3 style="font-size: 18px; margin-top: 20px; margin-bottom: 10px; color: #555; font-weight: bold;">2. Fun Games Interaktif: Kuis & Icebreaker</h3>
          <p style="margin-bottom: 8px;"><strong>Tujuan:</strong> Meningkatkan suasana kerja yang menyenangkan dan mempererat tim.</p>
          <p style="margin-bottom: 8px;"><strong>Deskripsi:</strong> Permainan ringan yang bisa dilakukan di kantor, seperti trivia, tebak gambar, atau "2 truths 1 lie".</p>
          <p style="margin-bottom: 16px;"><strong>Kategori:</strong> 🟢 Low Effort, 🟣 Team Bonding</p>
          
          <h3 style="font-size: 18px; margin-top: 20px; margin-bottom: 10px; color: #555; font-weight: bold;">3. Charity Box Bersama</h3>
          <p style="margin-bottom: 8px;"><strong>Tujuan:</strong> Membangun empati dan solidaritas tim.</p>
          <p style="margin-bottom: 8px;"><strong>Deskripsi:</strong> Kolektif donasi barang/baju/paket sembako yang dikoordinasikan oleh GA. Sederhana namun berdampak.</p>
          <p style="margin-bottom: 16px;"><strong>Kategori:</strong> 🟢 Low Effort, 🟡 Quick Impact, 🟤 Social Impact</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Kegiatan Medium Effort</h2>
          
          <h3 style="font-size: 18px; margin-top: 20px; margin-bottom: 10px; color: #555; font-weight: bold;">1. Kolaborasi Proyek Mini Antar Subdivisi</h3>
          <p style="margin-bottom: 8px;"><strong>Tujuan:</strong> Meningkatkan kolaborasi fungsional dan komunikasi tim.</p>
          <p style="margin-bottom: 8px;"><strong>Deskripsi:</strong> Tantangan kecil selama seminggu, misalnya membuat ide proses perbaikan, dan dipresentasikan.</p>
          <p style="margin-bottom: 16px;"><strong>Kategori:</strong> 🟠 Medium Effort, 🔵 Knowledge Sharing, 🟣 Team Bonding</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Kegiatan High Effort</h2>
          
          <h3 style="font-size: 18px; margin-top: 20px; margin-bottom: 10px; color: #555; font-weight: bold;">1. Outing Hari Sabtu (1 Hari Penuh)</h3>
          <p style="margin-bottom: 8px;"><strong>Tujuan:</strong> Membangun chemistry lintas unit dengan aktivitas luar kantor.</p>
          <p style="margin-bottom: 8px;"><strong>Deskripsi:</strong> Team building di luar kota/kantor dengan games kelompok, makan siang bersama, dan sesi refleksi.</p>
          <p style="margin-bottom: 16px;"><strong>Kategori:</strong> 🔴 High Effort, 🟣 Team Bonding</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Panduan Pemilihan Kegiatan</h2>
          <ul style="margin-bottom: 16px; padding-left: 24px; list-style-type: disc;">
            <li style="margin-bottom: 8px;">Sesuaikan pemilihan kegiatan dengan kebutuhan spesifik tim dan tantangan yang sedang dihadapi.</li>
            <li style="margin-bottom: 8px;">Pertimbangkan level kegiatan (Low, Medium, High Effort) sesuai dengan waktu dan sumber daya yang tersedia.</li>
            <li style="margin-bottom: 8px;">Untuk hasil maksimal, kombinasikan kegiatan dengan kategori berbeda dalam program engagement jangka panjang.</li>
            <li style="margin-bottom: 8px;">Evaluasi efektivitas setiap kegiatan dan lakukan penyesuaian untuk sesi berikutnya.</li>
            <li style="margin-bottom: 8px;">Pastikan semua anggota tim dapat berpartisipasi dengan nyaman, termasuk yang bekerja secara remote atau hybrid.</li>
          </ul>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Keterangan Kategori</h2>
          <p style="margin-bottom: 8px;"><span style="font-weight: bold;">🟢 Low Effort:</span> Kegiatan yang mudah diimplementasikan dengan sumber daya minimal</p>
          <p style="margin-bottom: 8px;"><span style="font-weight: bold;">🟠 Medium Effort:</span> Kegiatan yang membutuhkan perencanaan dan persiapan moderat</p>
          <p style="margin-bottom: 8px;"><span style="font-weight: bold;">🔴 High Effort:</span> Kegiatan yang membutuhkan perencanaan ekstensif dan sumber daya besar</p>
          <p style="margin-bottom: 8px;"><span style="font-weight: bold;">🔵 Knowledge Sharing:</span> Berfokus pada pertukaran informasi dan pembelajaran</p>
          <p style="margin-bottom: 8px;"><span style="font-weight: bold;">🟣 Team Bonding:</span> Berfokus pada membangun hubungan dan kekompakan tim</p>
          <p style="margin-bottom: 8px;"><span style="font-weight: bold;">🟡 Quick Impact:</span> Memberikan hasil yang cepat terlihat dan dirasakan</p>
          <p style="margin-bottom: 8px;"><span style="font-weight: bold;">🟤 Social Impact:</span> Memberikan dampak positif pada masyarakat</p>
        `
      })
    } else if (referenceId === 6) {
      // Handle Company Handbook
      setDocument({
        id: 6,
        title: "Company Handbook",
        category: "HR Documents",
        author: "HR Department",
        createdAt: "2025-01-15",
        content: `
        <h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">Company Handbook</h1>
        <p style="margin-bottom: 16px;">Guidelines, policies, and procedures for employees.</p>
        
        <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Company Overview</h2>
        <p style="margin-bottom: 16px;">Our company is dedicated to creating innovative solutions...</p>
        
        <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Policies and Procedures</h2>
        <p style="margin-bottom: 16px;">This section outlines the key policies and procedures...</p>
      `,
      })
    } else {
      // Handle other reference documents with generic content
      const referenceResources = [
        {
          id: 201,
          title: "Dokumen Referensi Kegiatan Engagement",
          category: "HR Documents",
          author: "HR Department",
        },
        {
          id: 6,
          title: "Company Handbook",
          category: "HR Documents",
          author: "HR Department",
        },
        {
          id: 11,
          title: "Project Plan Template",
          category: "Project Management",
          author: "PMO",
        },
        {
          id: 7,
          title: "Brand Guidelines",
          category: "Marketing",
          author: "Marketing Team",
        },
        {
          id: 102,
          title: "Research Database",
          category: "Research",
          author: "Research Department",
        },
      ]

      const refDoc = referenceResources.find((doc) => doc.id === referenceId)

      if (refDoc) {
        setDocument({
          ...refDoc,
          createdAt: "2025-03-15",
          content: `
          <h1 style="font-size: 28px; margin-bottom: 16px; color: #333; font-weight: bold;">${refDoc.title}</h1>
          <p style="margin-bottom: 16px;">This is a reference document for ${refDoc.category}.</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Document Purpose</h2>
          <p style="margin-bottom: 16px;">This document provides guidance and reference materials related to ${refDoc.category}.</p>
          
          <h2 style="font-size: 22px; margin-top: 24px; margin-bottom: 12px; color: #444; font-weight: bold;">Content Overview</h2>
          <p style="margin-bottom: 16px;">The main sections of this document include guidelines, best practices, and examples.</p>
        `,
        })
      } else {
        console.error(`Document with ID ${documentId} not found`)
      }
    }

    setLoading(false)
  }, [documents, documentId])

  const handleBack = () => {
    router.back()
  }

  const handleEdit = () => {
    router.push(`/documents/editor?id=${documentId}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-muted rounded mb-6"></div>
          <div className="h-4 w-1/4 bg-muted rounded mb-10"></div>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="container mx-auto py-6">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Document Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The document you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/documents")}>Go to Documents</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      {/* Header section styled like the image */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Button variant="ghost" onClick={handleBack} className="mr-2 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">{document.title}</h1>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="font-medium mr-2">{document.category || "Project Management"}</span>
          <span>
            Last updated: {document.createdAt ? format(new Date(document.createdAt), "MMMM d, yyyy") : "April 12, 2025"}
          </span>
        </div>
      </div>

      {/* Document content card */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        {/* Document header with icon and author */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center">
            <span className="mr-3 text-muted-foreground">📄</span>
            <span className="font-medium">{document.title}</span>
          </div>
          <div className="text-sm text-muted-foreground">Author: {document.author || "Project Manager"}</div>
        </div>

        {/* Document content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{document.title}</h2>
          <p className="text-muted-foreground mb-6">
            Last updated: {document.createdAt ? format(new Date(document.createdAt), "MMMM d, yyyy") : "April 12, 2025"}
          </p>

          <h3 className="text-xl font-bold mb-4">Project Overview</h3>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: document.content }} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Share className="mr-2 h-4 w-4" />
        </Button>
        <Button size="sm" onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
