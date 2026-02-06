import MapWrapper from "@/components/map/MapWrapper";

export const metadata = {
    title: "Live Care Map – NestCare",
    description: "See our available caregivers moving in real-time across your area.",
};

export default function LiveMapPage() {
    return (
        <section className="min-h-screen bg-(--color-bg-base) py-16">
            <div className="max-w-7xl mx-auto px-4 space-y-12">
                <div className="text-center space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-(--color-primary-600)">
                        Live Network
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-(--color-text-main) tracking-tight">
                        See our impact in real-time.
                    </h1>
                    <p className="text-sm md:text-base text-(--color-text-muted) max-w-2xl mx-auto">
                        Our caregivers are active across the city, providing trusted support
                        to families just like yours. This map shows current active caregivers
                        available for immediate booking.
                    </p>
                </div>

                {/* Use the wrapper which handles the client-side only dynamic loading */}
                <MapWrapper />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                    <div className="p-6 rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) space-y-2">
                        <h3 className="text-3xl font-bold text-(--color-primary-600)">500+</h3>
                        <p className="text-sm font-medium text-(--color-text-main)">Active Caregivers</p>
                        <p className="text-xs text-(--color-text-muted)">Verified and ready to support your family.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) space-y-2">
                        <h3 className="text-3xl font-bold text-(--color-secondary-600)">12k</h3>
                        <p className="text-sm font-medium text-(--color-text-main)">Completed Bookings</p>
                        <p className="text-xs text-(--color-text-muted)">Trusted by thousands of happy families.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-(--color-surface) border border-(--color-border-subtle) space-y-2">
                        <h3 className="text-3xl font-bold text-(--color-accent-50)">4.9/5</h3>
                        <p className="text-sm font-medium text-(--color-text-main)">Average Rating</p>
                        <p className="text-xs text-(--color-text-muted)">Highest safety and satisfaction standards.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
