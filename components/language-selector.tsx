"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface LanguageContextProps {
  language: string
  setLanguage: (language: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")

  const translations = {
    en: {
      attach_files: "Attach Files",
      search: "Search",
      my_documents: "My Documents",
      document_preview: "Document Preview",
      add_block: "Add Block",
      save: "Save",
    },
    fr: {
      attach_files: "Joindre des fichiers",
      search: "Rechercher",
      my_documents: "Mes documents",
      document_preview: "Aperçu du document",
      add_block: "Ajouter un bloc",
      save: "Enregistrer",
    },
    es: {
      attach_files: "Adjuntar archivos",
      search: "Buscar",
      my_documents: "Mis documentos",
      document_preview: "Vista previa del documento",
      add_block: "Añadir bloque",
      save: "Guardar",
    },
  }

  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
