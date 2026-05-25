import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/movies", destination: "/movie", permanent: true },
      { source: "/movies/:id", destination: "/movie/:id", permanent: true },
      {
        source: "/movies/category/:id",
        destination: "/movie/genre/:id",
        permanent: true,
      },
      { source: "/tv", destination: "/show", permanent: true },
      { source: "/tv/:id", destination: "/show/:id", permanent: true },
      {
        source: "/tv/category/:id",
        destination: "/show/genre/:id",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
