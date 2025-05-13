"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default function NotFound() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6">Loading...</div>}>
      <div className="container mx-auto flex h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 md:p-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="mt-8" variant="default">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </Suspense>
  )
} 