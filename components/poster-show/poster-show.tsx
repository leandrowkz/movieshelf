import Image from "next/image"
import { Film } from "lucide-react"
import { cn } from "@/lib/cn"
import { getTmdbImageUrl } from "@/lib/images"

type PosterShowProps = {
  path: string | null | undefined
  alt: string
  size?: "w185" | "w342" | "w500" | "w780"
  className?: string
  priority?: boolean
}

export function PosterShow({
  path,
  alt,
  size = "w342",
  className,
  priority = false,
}: PosterShowProps) {
  const src = getTmdbImageUrl(path, size)

  return (
    <div
      className={cn(
        "bg-muted relative aspect-[2/3] w-full overflow-hidden rounded-md",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="text-muted-foreground flex h-full w-full items-center justify-center">
          <Film className="size-8" aria-hidden />
        </div>
      )}
    </div>
  )
}
