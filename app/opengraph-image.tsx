import { ImageResponse } from "next/og"
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = SITE_NAME

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.7, letterSpacing: 4 }}>
          {SITE_NAME.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            marginTop: 20,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          Discover movies & TV shows
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 30,
            opacity: 0.85,
            maxWidth: 900,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size },
  )
}
