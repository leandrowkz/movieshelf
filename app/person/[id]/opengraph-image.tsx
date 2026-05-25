import { ImageResponse } from "next/og"
import { getPersonDetails } from "@/actions/people/get-person-details"
import { getTmdbImageUrl } from "@/lib/images"
import { SITE_NAME } from "@/lib/constants"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Person profile"

export default async function PersonOgImage({
  params,
}: {
  params: { id: string }
}) {
  let name = "Person"
  let dept = ""
  let portrait: string | null = null

  try {
    const person = await getPersonDetails(Number(params.id))
    name = person.name
    dept = person.known_for_department ?? ""
    portrait = getTmdbImageUrl(person.profile_path, "h632")
  } catch {
    // fall through
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            width: 420,
            height: "100%",
            background: "#1a1a1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {portrait && (
            <img
              src={portrait}
              alt=""
              width={420}
              height={630}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
        <div
          style={{
            flex: 1,
            padding: 64,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 24, opacity: 0.7, letterSpacing: 3 }}>
            {SITE_NAME.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              marginTop: 16,
              lineHeight: 1.05,
            }}
          >
            {name}
          </div>
          {dept && (
            <div style={{ fontSize: 28, marginTop: 16, opacity: 0.85 }}>
              {dept}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  )
}
