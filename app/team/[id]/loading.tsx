import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-8 w-48" />
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        <Skeleton className="w-full md:w-80 h-[500px] rounded-xl" />
        <Skeleton className="flex-1 h-[500px] rounded-xl" />
      </div>
    </div>
  )
}
