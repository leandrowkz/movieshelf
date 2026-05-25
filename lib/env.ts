import { z } from "zod"

const envSchema = z.object({
  TMDB_API_ACCESS_TOKEN: z.string().min(1, "TMDB_API_ACCESS_TOKEN is required"),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
})

export const env = envSchema.parse({
  TMDB_API_ACCESS_TOKEN: process.env.TMDB_API_ACCESS_TOKEN,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
})
