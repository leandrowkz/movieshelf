import { ImageResponse } from "next/og"
import { getMovieDetails } from "@/actions/movies/get-movie-details"
import { getTmdbImageUrl } from "@/lib/images"
import { SITE_NAME } from "@/lib/constants"
import { formatYear } from "@/lib/format"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Movie cover"

export default async function MovieOgImage({
  params,
}: {
  params: { id: string }
}) {
  let title = "Movie"
  let year = ""
  let backdrop: string | null = null
  let rating = ""

  try {
    const movie = await getMovieDetails(Number(params.id))
    title = movie.title
    year = formatYear(movie.release_date)
    backdrop = getTmdbImageUrl(movie.backdrop_path, "w1280")
    rating = movie.vote_average ? movie.vote_average.toFixed(1) : ""
  } catch {
    // fall through to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0a0a",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        {backdrop && (
          <img
            src={backdrop}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              objectFit: "cover",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 64,
            width: "100%",
          }}
        >
          <div style={{ fontSize: 24, opacity: 0.7, letterSpacing: 3 }}>
            {SITE_NAME.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              marginTop: 16,
              lineHeight: 1.05,
              maxWidth: 1050,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              marginTop: 16,
              display: "flex",
              gap: 24,
              opacity: 0.9,
            }}
          >
            {year && <span>{year}</span>}
            {rating && <span>★ {rating}</span>}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
