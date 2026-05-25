import Image from "next/image"
import { cn } from "@/lib/cn"
import { getTmdbImageUrl } from "@/lib/images"

type BackdropShowProps = {
  path: string | null | undefined
  alt: string
  className?: string
}

export function BackdropShow({ path, alt, className }: BackdropShowProps) {
  const src = getTmdbImageUrl(path, "w1280")

  return (
    <div
      className={cn(
        "bg-muted relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]",
        className,
      )}
    >
      {src && (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        </>
      )}
    </div>
  )
}
