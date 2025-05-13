"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function DebugLocalStorage() {
  const [isOpen, setIsOpen] = useState(false)
  const [storageItems, setStorageItems] = useState<Record<string, any>>({})

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const items: Record<string, any> = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          try {
            items[key] = JSON.parse(localStorage.getItem(key) || "null")
          } catch (e) {
            items[key] = localStorage.getItem(key)
          }
        }
      }
      setStorageItems(items)
    }
  }, [isOpen])

  const clearItem = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key)
      const items = { ...storageItems }
      delete items[key]
      setStorageItems(items)
    }
  }

  const clearAll = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      setStorageItems({})
    }
  }

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-background"
        onClick={() => setIsOpen(true)}
      >
        Debug Storage
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>LocalStorage Debug</DialogTitle>
          </DialogHeader>

          {Object.keys(storageItems).length === 0 ? (
            <div className="py-4 text-center text-muted-foreground">No items in localStorage</div>
          ) : (
            <div className="space-y-4">
              {Object.entries(storageItems).map(([key, value]) => (
                <Card key={key}>
                  <CardHeader className="py-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">{key}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => clearItem(key)}>
                        Clear
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <pre className="text-xs overflow-auto max-h-40 p-2 bg-muted rounded-md">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <DialogFooter>
            <Button variant="destructive" onClick={clearAll}>
              Clear All
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
