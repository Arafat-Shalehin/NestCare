"use client";

import { useState } from "react";
import { addTimelineEvent } from "@/actions/server/timeline";
import { FaPlus } from "react-icons/fa";

export default function AddEventForm({ bookingId, onEventAdded }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "update",
        title: "",
        note: "",
        addedBy: "Caregiver (Demo)"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title) return;

        setLoading(true);
        try {
            const newEvent = await addTimelineEvent(bookingId, formData);
            onEventAdded(newEvent);
            setFormData({ ...formData, title: "", note: "" }); // Reset title and note
        } catch (error) {
            console.error("Failed to add event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-(--color-surface) rounded-2xl border border-(--color-border-subtle) shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <FaPlus className="text-primary text-xs" />
                </div>
                <h3 className="font-bold text-sm text-(--color-text-main)">Log New Activity</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-(--color-text-soft) uppercase tracking-widest pl-1">Event Type</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="select select-sm select-ghost w-full bg-(--color-bg-soft) rounded-xl font-medium text-xs text-(--color-text-main) focus:bg-white"
                    >
                        <option value="arrival">🚶 Arrival</option>
                        <option value="feeding">🥣 Feeding</option>
                        <option value="medication">💊 Medication</option>
                        <option value="activity">🏃 Activity</option>
                        <option value="update">📝 General Update</option>
                        <option value="departure">🌙 Departure</option>
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-(--color-text-soft) uppercase tracking-widest pl-1">Role</label>
                    <input
                        type="text"
                        value={formData.addedBy}
                        onChange={(e) => setFormData({ ...formData, addedBy: e.target.value })}
                        className="input input-sm input-ghost w-full bg-(--color-bg-soft) rounded-xl font-medium text-xs text-(--color-text-main) focus:bg-white"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold text-(--color-text-soft) uppercase tracking-widest pl-1">Activity Title</label>
                <input
                    type="text"
                    placeholder="e.g., Morning Walk complete"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input input-sm input-ghost w-full bg-(--color-bg-soft) rounded-xl font-medium text-xs text-(--color-text-main) focus:bg-white"
                    required
                />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold text-(--color-text-soft) uppercase tracking-widest pl-1">Note (Optional)</label>
                <textarea
                    placeholder="Add more details here..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="textarea textarea-sm textarea-ghost w-full bg-(--color-bg-soft) rounded-xl font-medium text-xs text-(--color-text-main) focus:bg-white min-h-20"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="btn btn-sm btn-primary w-full rounded-xl font-bold uppercase tracking-wider h-11"
            >
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Save Activity Log"}
            </button>
        </form>
    );
}
