import Link from "next/link"
import type { PersonItem, PersonCast, PersonCrew } from "@leandrowkz/tmdb"
import { PosterShow } from "@/components/poster-show/poster-show"
import { cn } from "@/lib/cn"

type CardPersonProps = {
  person: PersonItem | PersonCast | PersonCrew
  subtitle?: string
  className?: string
}

export function CardPerson({ person, subtitle, className }: CardPersonProps) {
  const sub =
    subtitle ??
    ("character" in person && person.character
      ? person.character
      : "job" in person && person.job
        ? person.job
        : undefined)

  return (
    <article className={cn("group", className)}>
      <Link href={`/person/${person.id}`} className="block">
        <PosterShow path={person.profile_path} alt={person.name} size="w185" />
        <div className="mt-2">
          <h3 className="line-clamp-2 text-sm font-medium leading-tight">
            {person.name}
          </h3>
          {sub && (
            <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
              {sub}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
