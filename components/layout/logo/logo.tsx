import Link from "next/link"
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
      <span className="text-xl leading-none" aria-hidden>
        🍿
      </span>
      <span className="text-lg">{SITE_NAME}</span>
    </Link>
  )
}
