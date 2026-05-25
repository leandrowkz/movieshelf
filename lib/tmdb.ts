import "server-only"
import { TMDB } from "@leandrowkz/tmdb"
import { env } from "@/lib/env"

export const tmdb = new TMDB({ apiKey: env.TMDB_API_ACCESS_TOKEN })
