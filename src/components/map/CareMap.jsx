"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

// --- Mock Data and Icons ---

const caregiverIcon = L.divIcon({
    html: `<div class="bg-(--color-primary-600) p-2 rounded-full border-2 border-white shadow-lg animate-pulse">
          <span class="text-xl">🧑‍⚕️</span>
        </div>`,
    className: "custom-div-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

// Area coordinates for Search FlyTo
const areaLocations = {
    "Banani": [23.7940, 90.4043],
    "Gulshan": [23.7925, 90.4078],
    "Dhanmondi": [23.7461, 90.3742],
    "Uttara": [23.8759, 90.3795],
    "Mirpur": [23.8223, 90.3654],
    "Bashundhara": [23.8164, 90.4300],
};

const initialCaregivers = [
    { id: 1, name: "Maria Khan", pos: [23.8103, 90.4125], type: "Elderly Care", area: "Gulshan" },
    { id: 2, name: "Rahim Ahmed", pos: [23.7949, 90.4043], type: "Baby Care", area: "Banani" },
    { id: 3, name: "Sumaiya Akhter", pos: [23.7509, 90.3935], type: "Sick Care", area: "Dhanmondi" },
    { id: 4, name: "Arif Hossain", pos: [23.8223, 90.4219], type: "Companion Care", area: "Bashundhara" },
    { id: 5, name: "Fatima Zohra", pos: [23.7709, 90.3635], type: "Post-surgery Care", area: "Mirpur" },
];

// --- Helper Components ---

function MapController({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 15, { duration: 2 });
        }
    }, [center, map]);
    return null;
}

// --- Main Component ---

export default function CareMap() {
    const [caregivers, setCaregivers] = useState(initialCaregivers);
    const [searchQuery, setSearchQuery] = useState("");
    const [mapCenter, setMapCenter] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionRef = useRef(null);

    // Live Movement Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setCaregivers((prev) =>
                prev.map((c) => ({
                    ...c,
                    pos: [
                        c.pos[0] + (Math.random() - 0.5) * 0.0005,
                        c.pos[1] + (Math.random() - 0.5) * 0.0005,
                    ],
                }))
            );
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Handle outside click for suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim().length > 0) {
            const filtered = Object.keys(areaLocations).filter(area =>
                area.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const performSearch = (query) => {
        const normalizedQuery = query.trim().charAt(0).toUpperCase() + query.trim().slice(1).toLowerCase();

        if (areaLocations[normalizedQuery]) {
            setMapCenter(areaLocations[normalizedQuery]);
            setShowSuggestions(false);

            // Premium Toast for Success
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: `Showing results for ${normalizedQuery}`,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                iconColor: 'var(--color-secondary-600)',
            });
        } else {
            // Premium Toast for Error
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Area not found',
                text: 'We are expanding soon! Try Banani, Gulshan, or Dhanmondi.',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                background: 'var(--color-surface)',
                color: 'var(--color-text-main)',
                iconColor: 'var(--color-error-500)',
            });
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        performSearch(searchQuery);
    };

    const handleSuggestionClick = (area) => {
        setSearchQuery(area);
        performSearch(area);
    };

    return (
        <div className="h-[650px] w-full rounded-3xl overflow-hidden border border-(--color-border-subtle) shadow-2xl relative z-10 group bg-white">
            {/* Search Overlay - Positioned Top Center */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-4 md:px-0">
                <div className="relative group/search" ref={suggestionRef}>
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search serviced areas..."
                            value={searchQuery}
                            onChange={handleInputChange}
                            onFocus={() => searchQuery && setShowSuggestions(true)}
                            className="w-full h-14 pl-14 pr-4 transition-all duration-300 bg-white/95 backdrop-blur-xl border-2 border-(--color-border-subtle) rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-4 focus:ring-(--color-primary-100) focus:border-(--color-primary-500) focus:bg-white text-base font-semibold text-(--color-text-main)"
                        />
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-(--color-text-soft) group-focus-within/search:text-(--color-primary-600) transition-colors">
                            📍
                        </div>
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-sm btn-primary rounded-xl px-5 hover:scale-105 transition-transform"
                        >
                            Search
                        </button>
                    </form>

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                        {showSuggestions && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-xl border border-(--color-border-subtle) rounded-2xl shadow-2xl overflow-hidden py-2"
                            >
                                <p className="px-4 py-2 text-[10px] font-bold text-(--color-text-soft) uppercase tracking-widest border-b border-gray-50">
                                    Available Areas
                                </p>
                                {suggestions.map((area) => (
                                    <button
                                        key={area}
                                        onClick={() => handleSuggestionClick(area)}
                                        className="w-full text-left px-5 py-3 hover:bg-(--color-primary-50) hover:text-(--color-primary-700) transition-colors flex items-center gap-3 group/item"
                                    >
                                        <span className="text-lg opacity-40 group-hover/item:opacity-100 transition-opacity">🏙️</span>
                                        <span className="font-semibold text-sm">{area}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Map Container */}
            <MapContainer
                center={[23.8103, 90.4125]}
                zoom={13}
                zoomControl={false} // Clean look
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Functional component to handle FlyTo */}
                <MapController center={mapCenter} />

                {caregivers.map((c) => (
                    <Marker key={c.id} position={c.pos} icon={caregiverIcon}>
                        <Popup className="custom-popup">
                            <div className="p-3 w-52 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-(--color-bg-soft) flex items-center justify-center text-3xl">👷</div>
                                    <div>
                                        <h3 className="font-bold text-sm text-(--color-text-main)">{c.name}</h3>
                                        <p className="text-[10px] font-bold text-(--color-primary-600) uppercase tracking-tight">{c.type}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-3 border-t border-gray-100">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-(--color-text-muted)">Location</span>
                                        <span className="font-bold text-(--color-text-main)">{c.area}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-(--color-text-muted)">Signal</span>
                                        <span className="flex items-center gap-1 font-bold text-(--color-success-600)">
                                            <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping" />
                                            Live Now
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full btn btn-sm btn-primary rounded-xl text-xs font-bold hover:scale-[1.02] transition-transform">
                                    Book This Agent
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Modern Map Legend */}
            <div className="absolute bottom-6 right-6 z-[1000] bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl border border-(--color-border-subtle) shadow-[0_10px_30px_rgba(0,0,0,0.1)] hidden md:block">
                <p className="text-[10px] font-black text-(--color-text-soft) uppercase tracking-[0.2em] mb-3">Live Network Status</p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-(--color-primary-600) shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
                        <span className="text-xs font-bold text-(--color-text-main)">Available Agents</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-(--color-secondary-600)" />
                        <span className="text-xs font-bold text-(--color-text-main)">Active Service Zones</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
