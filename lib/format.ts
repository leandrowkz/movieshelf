export function formatYear(date: string | null | undefined): string {
  if (!date) return ""
  return new Date(date).getUTCFullYear().toString()
}

export function formatDate(
  date: string | null | undefined,
  locale = "en-US",
): string {
  if (!date) return ""
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes || minutes <= 0) return ""
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}min`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}min`
}

export function formatVoteAverage(vote: number | null | undefined): string {
  if (vote === null || vote === undefined) return "—"
  return vote.toFixed(1)
}
