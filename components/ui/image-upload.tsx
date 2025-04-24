"use client"

import * as React from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value?: string
  onChange: (value: string | null) => void
  className?: string
  aspectRatio?: "square" | "horizontal"
  placeholder?: string
}

export function ImageUpload({
  value,
  onChange,
  className,
  aspectRatio = "square",
  placeholder = "Upload an image",
}: ImageUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [preview, setPreview] = React.useState<string | null>(value || null)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setPreview(result)
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setPreview(result)
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const containerClasses = cn(
    "relative flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 text-center transition-colors",
    isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 bg-muted hover:bg-muted/80",
    aspectRatio === "square" ? "h-32 w-32" : "h-32 w-full",
    className,
  )

  return (
    <div
      className={containerClasses}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

      {preview ? (
        <div className="relative flex h-full w-full items-center justify-center">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">{placeholder}</p>
          <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 2MB)</p>
        </>
      )}
    </div>
  )
}
