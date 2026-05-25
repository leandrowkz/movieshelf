import { Star } from "lucide-react"
import { cn } from "@/lib/cn"
import { formatVoteAverage } from "@/lib/format"

type RatingScoreProps = {
  value: number | null | undefined
  className?: string
  size?: "sm" | "md"
}

export function RatingScore({ value, className, size = "sm" }: RatingScoreProps) {
  if (!value) return null

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium",
        size === "sm" ? "text-xs" : "text-sm",
        className,
      )}
      aria-label={`Rating ${formatVoteAverage(value)} out of 10`}
    >
      <Star className={cn(size === "sm" ? "size-3" : "size-4", "fill-yellow-400 text-yellow-400")} />
      {formatVoteAverage(value)}
    </span>
  )
}
