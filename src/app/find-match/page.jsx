import { getServices } from "@/actions/server/services";
import FindMatchWizard from "@/components/find-match/FindMatchWizard";

export const metadata = {
  title: "Find My Match – NestCare",
  description: "Answer a few questions and find the perfect care service for your loved ones.",
};

export default async function FindMatchPage() {
  const services = await getServices();

  return (
    <section className="min-h-screen bg-linear-to-b from-(--color-primary-50) to-(--color-bg-base)">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <FindMatchWizard services={services} />
      </div>
    </section>
  );
}
