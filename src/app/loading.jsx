export default function RootLoading() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-lg text-(--color-primary-600)" />
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-(--color-text-main)">
            Getting NestCare ready for you…
          </p>
          <p className="text-xs text-(--color-text-muted)">
            Loading trusted care services and your personalized experience.
          </p>
        </div>
      </div>
    </section>
  );
}
