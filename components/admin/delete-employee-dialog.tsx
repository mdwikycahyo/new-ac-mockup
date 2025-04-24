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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface DeleteEmployeeDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  employeeId: string
  employeeName: string
  redirectUrl: string
}

export function DeleteEmployeeDialog({
  isOpen,
  onOpenChange,
  employeeId,
  employeeName,
  redirectUrl,
}: DeleteEmployeeDialogProps) {
  const router = useRouter()
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // In a real app, this would be an API call to delete the employee
      console.log(`Deleting employee: ${employeeId}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Employee deleted",
        description: `${employeeName} has been successfully removed.`,
      })

      // Close dialog and reset state
      onOpenChange(false)
      setConfirmText("")

      // Redirect to the specified URL
      router.push(redirectUrl)
    } catch (error) {
      console.error("Error deleting employee:", error)
      toast({
        title: "Error",
        description: "There was a problem deleting the employee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete {employeeName} and all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mb-1 h-4 w-4" />
            <p>Warning: This will remove all employee data, including assessment results and history.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-delete">
              Type <strong>DELETE</strong> to confirm
            </Label>
            <Input
              id="confirm-delete"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={confirmText !== "DELETE" || isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Employee"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
