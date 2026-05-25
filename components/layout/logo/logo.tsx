import Link from "next/link"
import { Film } from "lucide-react"
import { cn } from "@/lib/cn"
import { SITE_NAME } from "@/lib/constants"

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={SITE_NAME}
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        className,
      )}
    >
      <Film className="size-5" aria-hidden />
      <span className="text-lg">{SITE_NAME}</span>
    </Link>
  )
}
