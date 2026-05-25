import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <Skeleton className="aspect-[4/5] w-full rounded-xl sm:aspect-[21/9]" />
      </div>
      <div className="mt-10 space-y-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <section key={i}>
            <div className="container mx-auto mb-3 px-4">
              <Skeleton className="h-7 w-48" />
            </div>
            <div className="flex gap-3 overflow-hidden pl-4 sm:gap-4 sm:pl-6 lg:pl-8">
              {Array.from({ length: 6 }).map((_, j) => (
                <div
                  key={j}
                  className="min-w-0 shrink-0 basis-[42%] sm:basis-[28%] md:basis-[22%] lg:basis-[16%] xl:basis-[13%]"
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
