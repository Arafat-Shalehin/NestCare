"use client";

import Link from "next/link";

export default function GlobalError({ error, reset }) {
  // console.error(error);

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-lg text-center space-y-6">
        <div className="inline-flex items-center justify-center rounded-full bg-(--color-error-100) px-4 py-1 text-xs font-medium text-(--color-error-500)">
          Something went wrong
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-(--color-text-main)">
          We’re having trouble loading this page.
        </h1>

        <p className="text-sm md:text-base text-(--color-text-muted)">
          An unexpected error occurred. You can try again, or go back to the
          homepage while we work on fixing this.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-sm sm:btn-md border-none bg-(--color-primary-600) text-(--color-text-invert) hover:bg-(--color-primary-700) shadow-sm"
          >
            Try again
          </button>

          <Link
            href="/"
            className="btn btn-sm sm:btn-md btn-ghost text-(--color-text-muted) hover:bg-(--color-bg-soft)"
          >
            Go to homepage
          </Link>
        </div>

        <p className="text-[11px] text-(--color-text-soft)">
          If this keeps happening, please contact support and mention the time
          this error occurred.
        </p>
      </div>
    </section>
  );
}
