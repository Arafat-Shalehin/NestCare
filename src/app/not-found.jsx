import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-lg text-center space-y-6">
        <div className="inline-flex items-center justify-center rounded-full bg-(--color-bg-soft) px-4 py-1 text-xs font-medium text-(--color-text-muted) border border-(--color-border-subtle)">
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--color-error-100) text-(--color-error-500) text-sm font-semibold">
            404
          </span>
          Page not found
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-(--color-text-main)">
          We couldn’t find that page.
        </h1>

        <p className="text-sm md:text-base text-(--color-text-muted)">
          The page you’re looking for may have been moved, deleted, or never
          existed. Let’s get you back to a safe place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="btn btn-sm sm:btn-md border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
          >
            Go back home
          </Link>
          <Link
            href="/services"
            className="btn btn-sm sm:btn-md btn-ghost text-(--color-text-muted) hover:bg-(--color-bg-soft)"
          >
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
