"use client"

import { Button } from "@/components/ui/button"

export default function ShowError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold">Couldn’t load this show</h1>
      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        {error.message || "Something went wrong while fetching this show."}
      </p>
      <Button onClick={() => reset()} className="mt-6">
        Try again
      </Button>
    </main>
  )
}
