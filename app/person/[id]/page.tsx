import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPersonDetails } from "@/actions/people/get-person-details"
import { getPersonImages } from "@/actions/people/get-person-images"
import { getPersonMovies } from "@/actions/people/get-person-movies"
import { getPersonShows } from "@/actions/people/get-person-shows"
import { PosterShow } from "@/components/poster-show/poster-show"
import { ImagesPerson } from "@/components/images-person/images-person"
import { FiltersShowType } from "@/components/filters-show-type/filters-show-type"
import { Separator } from "@/components/ui/separator"
import { buildMetadata, buildPersonJsonLd } from "@/lib/seo"
import { formatDate } from "@/lib/format"
import { getTmdbImageUrl } from "@/lib/images"

type Params = { id: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { id } = await params
  try {
    const person = await getPersonDetails(Number(id))
    return buildMetadata({
      title: person.name,
      description: person.biography || `${person.name} filmography on MovieShelf.`,
      image: getTmdbImageUrl(person.profile_path, "h632"),
      type: "profile",
      url: `/person/${id}`,
    })
  } catch {
    return { title: "Person not found" }
  }
}

export default async function PersonPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = await params
  const personId = Number(id)
  if (!Number.isFinite(personId)) notFound()

  let person: Awaited<ReturnType<typeof getPersonDetails>>
  try {
    person = await getPersonDetails(personId)
  } catch {
    notFound()
  }

  const [images, movies, shows] = await Promise.all([
    getPersonImages(personId),
    getPersonMovies(personId),
    getPersonShows(personId),
  ])

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="grid gap-8 sm:grid-cols-[200px_1fr]">
        <div>
          <PosterShow path={person.profile_path} alt={person.name} priority />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {person.name}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {person.known_for_department}
          </p>
          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {person.birthday && (
              <div>
                <dt className="text-muted-foreground">Born</dt>
                <dd>
                  <time dateTime={person.birthday}>
                    {formatDate(person.birthday)}
                  </time>
                </dd>
              </div>
            )}
            {person.deathday && (
              <div>
                <dt className="text-muted-foreground">Died</dt>
                <dd>
                  <time dateTime={person.deathday}>
                    {formatDate(person.deathday)}
                  </time>
                </dd>
              </div>
            )}
            {person.place_of_birth && (
              <div>
                <dt className="text-muted-foreground">Place of birth</dt>
                <dd>{person.place_of_birth}</dd>
              </div>
            )}
          </dl>
          {person.biography && (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold">Biography</h2>
              <p className="max-w-3xl whitespace-pre-line text-sm leading-relaxed">
                {person.biography}
              </p>
            </div>
          )}
        </div>
      </article>

      {images.length > 0 && (
        <>
          <Separator className="my-10" />
          <section>
            <h2 className="mb-4 text-xl font-semibold">Photos</h2>
            <ImagesPerson images={images} personName={person.name} />
          </section>
        </>
      )}

      <Separator className="my-10" />
      <section>
        <h2 className="mb-4 text-xl font-semibold">Filmography</h2>
        <FiltersShowType movies={movies} shows={shows} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonJsonLd(person)) }}
      />
    </main>
  )
}
