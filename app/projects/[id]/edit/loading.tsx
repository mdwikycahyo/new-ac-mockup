import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditProjectLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" disabled className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>

      <div className="space-y-8">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  )
}
