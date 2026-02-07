"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaRunning, FaUtensils, FaUserMd, FaMoon, FaCommentAlt } from "react-icons/fa";

const eventIcons = {
    arrival: <FaRunning className="text-secondary" />,
    feeding: <FaUtensils className="text-orange-500" />,
    medication: <FaUserMd className="text-error" />,
    activity: <FaCheckCircle className="text-primary" />,
    departure: <FaMoon className="text-neutral" />,
    update: <FaCommentAlt className="text-info" />,
};

const typeColors = {
    arrival: "bg-secondary/10 border-secondary",
    feeding: "bg-orange-500/10 border-orange-500",
    medication: "bg-error/10 border-error",
    activity: "bg-primary/10 border-primary",
    departure: "bg-neutral/10 border-neutral",
    update: "bg-info/10 border-info",
};

export default function CareTimeline({ events = [] }) {
    if (events.length === 0) {
        return (
            <div className="text-center py-12 bg-(--color-bg-soft) rounded-2xl border-2 border-dashed border-(--color-border-subtle)">
                <p className="text-(--color-text-muted) font-medium italic">No activity logs recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-(--color-border-subtle) before:to-transparent">
            <AnimatePresence initial={false}>
                {events.map((event, index) => (
                    <motion.div
                        key={event._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                        {/* Icon Dot */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-(--color-border-subtle) bg-(--color-surface) shadow-sm text-sm group-hover:scale-110 transition-transform z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            {eventIcons[event.type] || eventIcons.update}
                        </div>

                        {/* Content Card */}
                        <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border-2 ${typeColors[event.type] || typeColors.update} shadow-sm backdrop-blur-xs transition-all hover:shadow-md`}>
                            <div className="flex items-center justify-between mb-1">
                                <time className="text-[10px] font-black uppercase tracking-widest text-(--color-text-soft)">
                                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </time>
                                <span className="text-[10px] font-bold text-(--color-text-muted) px-2 py-0.5 bg-white/50 rounded-full border border-gray-100 italic">
                                    By {event.addedBy}
                                </span>
                            </div>
                            <h4 className="font-bold text-(--color-text-main) text-sm mb-1">{event.title}</h4>
                            <p className="text-xs text-(--color-text-muted) leading-relaxed">
                                {event.note}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
