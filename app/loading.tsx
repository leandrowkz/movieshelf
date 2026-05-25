import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-6 sm:py-8">
      <Skeleton className="aspect-[16/8] w-full rounded-xl sm:aspect-[21/9]" />
      <div className="mt-10 space-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <section key={i}>
            <Skeleton className="mb-3 h-7 w-48" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((_, j) => (
                <div
                  key={j}
                  className="min-w-0 shrink-0 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <Skeleton className="aspect-[2/3] w-full rounded-md" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                  <Skeleton className="mt-1 h-3 w-1/2" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
