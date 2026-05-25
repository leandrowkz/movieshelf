import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-2 h-10 w-64" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[2/3] w-full rounded-md" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>
        ))}
      </div>
    </main>
  )
}
