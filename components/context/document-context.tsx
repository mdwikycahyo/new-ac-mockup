"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Document {
  id: number | string
  title: string
  type: string
  lastModified: string
  owner: string
  content: string
}

interface DocumentContextType {
  documents: Document[]
  addDocument: (document: Document) => void
  updateDocument: (document: Document) => void
  deleteDocument: (id: string) => void
  getDocument: (id: number | string) => Document | undefined
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDocuments = localStorage.getItem("documents")
      if (storedDocuments) {
        setDocuments(JSON.parse(storedDocuments))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("documents", JSON.stringify(documents))
    }
  }, [documents])

  const addDocument = (document: Document) => {
    setDocuments((prevDocuments) => [document, ...prevDocuments])
  }

  const updateDocument = (document: Document) => {
    setDocuments((prevDocuments) => prevDocuments.map((doc) => (doc.id === document.id ? document : doc)))
  }

  const deleteDocument = (id: string) => {
    setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id))
  }

  const getDocument = (id: number | string) => {
    return documents.find((doc) => doc.id === id)
  }

  return (
    <DocumentContext.Provider value={{ documents, addDocument, updateDocument, deleteDocument, getDocument }}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocumentContext() {
  const context = useContext(DocumentContext)
  if (!context) {
    throw new Error("useDocumentContext must be used within a DocumentProvider")
  }
  return context
}
