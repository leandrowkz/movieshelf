import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-muted-foreground text-sm tracking-wide uppercase">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
        Page not found
      </h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        The page you were looking for doesn’t exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  )
}
