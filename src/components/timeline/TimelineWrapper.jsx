"use client";

import { useState, useEffect, useRef } from "react";
import { getTimelineEvents, seedTimelineEvents } from "@/actions/server/timeline";
import CareTimeline from "./CareTimeline";
import AddEventForm from "./AddEventForm";
import { FaHistory, FaUserShield, FaUsers, FaTimes } from "react-icons/fa";

export default function TimelineWrapper({ bookingId, bookingName }) {
    const dialogRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("family"); // "family" or "caregiver"

    const fetchEvents = async () => {
        setLoading(true);
        try {
            // For demo: Seed events if empty
            await seedTimelineEvents(bookingId);
            const data = await getTimelineEvents(bookingId);
            setEvents(data);
        } catch (error) {
            console.error("Timeline load error:", error);
        } finally {
            setLoading(false);
        }
    };

    const open = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            fetchEvents();
        }
    };

    const close = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleEventAdded = (newEvent) => {
        setEvents((prev) => [newEvent, ...prev]);
    };

    return (
        <>
            <button
                onClick={open}
                className="btn btn-xs btn-outline btn-primary rounded-lg flex items-center gap-2 px-3 group"
            >
                <FaHistory className="text-[10px] group-hover:rotate-180 transition-transform duration-500" />
                <span>Timeline</span>
            </button>

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box max-w-2xl bg-(--color-bg-base) p-0 overflow-hidden border border-(--color-border-subtle) shadow-2xl rounded-3xl">
                    {/* Header */}
                    <div className="p-6 bg-(--color-surface) border-b border-(--color-border-subtle) flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-(--color-primary-600) mb-1">
                                Live Activity Feed
                            </p>
                            <h3 className="text-xl font-bold text-(--color-text-main)">
                                {bookingName || "Care Session"}
                            </h3>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Role Switcher (Simulation) */}
                            <div className="hidden sm:flex bg-(--color-bg-soft) p-1 rounded-xl border border-(--color-border-subtle)">
                                <button
                                    onClick={() => setRole("family")}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${role === "family" ? "bg-white text-primary shadow-sm" : "text-(--color-text-soft) hover:text-(--color-text-muted)"}`}
                                >
                                    <FaUsers /> Family
                                </button>
                                <button
                                    onClick={() => setRole("caregiver")}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${role === "caregiver" ? "bg-white text-primary shadow-sm" : "text-(--color-text-soft) hover:text-(--color-text-muted)"}`}
                                >
                                    <FaUserShield /> Caregiver
                                </button>
                            </div>

                            <button onClick={close} className="btn btn-sm btn-circle btn-ghost text-(--color-text-soft)">
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 h-[500px] overflow-y-auto custom-scrollbar space-y-8">
                        {role === "caregiver" && (
                            <div className="mb-10">
                                <AddEventForm bookingId={bookingId} onEventAdded={handleEventAdded} />
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="h-px grow bg-(--color-border-subtle)" />
                                    <span className="text-[10px] font-bold text-(--color-text-soft) uppercase tracking-widest">Recent Logs</span>
                                    <div className="h-px grow bg-(--color-border-subtle)" />
                                </div>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-40 space-y-4">
                                <span className="loading loading-spinner loading-lg text-primary"></span>
                                <p className="text-sm font-medium text-(--color-text-muted)">Fetching live logs...</p>
                            </div>
                        ) : (
                            <CareTimeline events={events} />
                        )}
                    </div>

                    <div className="p-4 bg-(--color-surface) border-t border-(--color-border-subtle) text-center">
                        <p className="text-[10px] font-medium text-(--color-text-soft)">
                            © NestCare Real-time Synchronization Enabled • Secured Connection
                        </p>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop bg-black/40 backdrop-blur-sm">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
