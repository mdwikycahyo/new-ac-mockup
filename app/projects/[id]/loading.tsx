import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProjectDetailLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-20" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <Skeleton className="h-8 w-48" />
                  <div className="flex items-center gap-2 mt-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </div>

                <div className="h-px w-full bg-gray-100" />

                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Skeleton className="h-6 w-6 rounded-full mr-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex items-start">
                      <Skeleton className="h-6 w-6 rounded-full mr-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex items-start">
                      <Skeleton className="h-6 w-6 rounded-full mr-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-gray-100" />

                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-12 w-28" />
                    <Skeleton className="h-2 w-12" />
                    <Skeleton className="h-12 w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-2 w-32" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <Skeleton className="h-5 w-5 rounded-full mr-3" />
                        <div>
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24 mt-1" />
                        </div>
                      </div>
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Skeleton className="h-9 w-9 rounded-full mr-3" />
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24 mt-1" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24" />
                  <div className="flex items-center justify-between mt-1">
                    <Skeleton className="h-2 w-full mr-4" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-muted rounded-lg p-3">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-6 w-12 mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
