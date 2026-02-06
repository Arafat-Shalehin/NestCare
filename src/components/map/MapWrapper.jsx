"use client";

import dynamic from "next/dynamic";

// This wrapper is a Client Component. 
// Using dynamic import here with ssr: false is allowed and 
// effectively prevents Leaflet from trying to run on the server.
const CareMap = dynamic(() => import("./CareMap"), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full bg-linear-to-b from-(--color-bg-soft) to-(--color-bg-base) animate-pulse flex items-center justify-center rounded-2xl">
            <div className="text-center space-y-4">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-sm font-medium text-(--color-text-muted)">Loading Live Care Network...</p>
            </div>
        </div>
    ),
});

export default function MapWrapper() {
    return <CareMap />;
}
