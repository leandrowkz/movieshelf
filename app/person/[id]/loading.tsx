import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      <Skeleton className="aspect-[16/9] w-full sm:aspect-[21/9]" />
      <main className="container mx-auto -mt-32 px-4 pb-8 sm:-mt-48">
        <div className="sm:grid sm:grid-cols-[200px_1fr] sm:gap-8">
          <Skeleton className="mb-5 aspect-[2/3] w-32 sm:mb-0 sm:w-auto" />
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
    </>
  )
}
