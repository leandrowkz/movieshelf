import type { PersonCast, PersonCrew, PersonItem } from "@leandrowkz/tmdb"
import { CardPerson } from "@/components/card-person/card-person"
import { cn } from "@/lib/cn"

type ListPeopleProps = {
  people: (PersonItem | PersonCast | PersonCrew)[]
  className?: string
  limit?: number
}

export function ListPeople({ people, className, limit }: ListPeopleProps) {
  const list = limit ? people.slice(0, limit) : people

  if (!list.length) return null

  return (
    <ul
      className={cn(
        "grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6",
        className,
      )}
    >
      {list.map((person, idx) => (
        <li key={`${person.id}-${idx}`}>
          <CardPerson person={person} />
        </li>
      ))}
    </ul>
  )
}
