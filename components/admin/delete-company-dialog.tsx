"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface DeleteCompanyDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  companyId: string
  companyName: string
}

export function DeleteCompanyDialog({ isOpen, onOpenChange, companyId, companyName }: DeleteCompanyDialogProps) {
  const router = useRouter()
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // In a real app, this would be an API call to delete the company
      console.log(`Deleting company: ${companyId}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Company deleted",
        description: `${companyName} has been successfully deleted.`,
      })

      // Redirect to companies list
      router.push("/admin/companies")
    } catch (error) {
      console.error("Error deleting company:", error)
      toast({
        title: "Error",
        description: "There was a problem deleting the company. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      onOpenChange(false)
      setConfirmText("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Company</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the company and all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mb-1 h-4 w-4" />
            <p>Warning: This will remove all company data, including employees, assessments, and results.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-name">
              Type <strong>{companyName}</strong> to confirm
            </Label>
            <Input
              id="company-name"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={companyName}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={confirmText !== companyName || isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
