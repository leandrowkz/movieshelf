import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 sm:grid-cols-[200px_1fr]">
        <Skeleton className="aspect-[2/3] w-full" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full max-w-3xl" />
          </div>
        </div>
      </div>
    </main>
  )
}
