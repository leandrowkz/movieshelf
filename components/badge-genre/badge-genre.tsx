import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { ShowType } from "@/types/show-type"

type BadgeGenreProps = {
  id: number
  name: string
  showType: ShowType
}

export function BadgeGenre({ id, name, showType }: BadgeGenreProps) {
  const base = showType === "movie" ? "/movie" : "/show"
  return (
    <Link href={`${base}/genre/${id}`}>
      <Badge variant="secondary" className="hover:bg-accent">
        {name}
      </Badge>
    </Link>
  )
}
