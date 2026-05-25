import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>
      <Skeleton className="aspect-[16/9] w-full sm:aspect-[21/9]" />
      <div className="container mx-auto -mt-32 px-4 sm:-mt-48">
        <div className="sm:grid sm:grid-cols-[200px_1fr] sm:gap-8">
          <Skeleton className="mb-5 aspect-[2/3] w-32 sm:mb-0 sm:w-auto" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-24 w-full max-w-3xl" />
          </div>
        </div>
      </div>
    </>
  )
}
