"use client";

import { useEffect, useState } from "react";
import { getAllBookings, updateBookingStatus } from "@/actions/server/admin";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaInbox } from "react-icons/fa";

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const data = await getAllBookings();
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // console.log(bookings);

    const handleStatusChange = async (id, newStatus) => {
        const result = await Swal.fire({
            title: 'Update Status?',
            text: `Are you sure you want to change this booking to ${newStatus}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-primary-600)',
            confirmButtonText: 'Yes, update it!'
        });

        if (result.isConfirmed) {
            try {
                await updateBookingStatus(id, newStatus);
                Swal.fire('Updated!', 'The status has been changed.', 'success');
                fetchBookings();
            } catch (err) {
                Swal.fire('Error', 'Failed to update status', 'error');
            }
        }
    };

    if (loading) return <div className="flex justify-center p-20"><span className="loading loading-spinner text-primary"></span></div>;

    return (
        <div className="animate-fade-up">
            <div className="bg-(--color-surface) rounded-3xl border border-(--color-border-subtle) shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-(--color-bg-soft)">
                            <tr className="text-[11px] font-black uppercase tracking-widest text-(--color-text-soft)">
                                <th>Booking ID</th>
                                <th>Service / User</th>
                                <th>Total Cost</th>
                                <th>Status</th>
                                <th className="text-right">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {bookings.map((b) => (
                                <tr key={b._id} className="hover:bg-(--color-bg-soft) transition-colors">
                                    <td className="font-mono text-[10px] text-(--color-text-soft)">{b._id.slice(-8)}...</td>
                                    <td>
                                        <div className="font-bold text-(--color-text-main)">{b.serviceName}</div>
                                        <div className="text-[10px] text-primary/70 font-mono mb-1">{b.serviceSlug}</div>
                                        <div className="flex flex-col gap-0.5 p-2 bg-(--color-bg-soft) rounded-xl border border-(--color-border-subtle)">
                                            <div className="text-[11px] font-bold text-(--color-text-main)">{b.customer?.name || "N/A"}</div>
                                            <div className="text-[10px] text-(--color-text-soft)">{b.customer?.email}</div>
                                            <div className="text-[10px] font-medium text-primary">{b.customer?.phone || "No Phone"}</div>
                                        </div>
                                    </td>
                                    <td className="font-bold text-primary">৳{b.totalCost?.toLocaleString()}</td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${b.status === 'CONFIRMED' ? 'bg-primary/10 text-primary' :
                                            b.status === 'COMPLETED' ? 'bg-success-100 text-success-500' :
                                                b.status === 'CANCELLED' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning-500'
                                            }`}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleStatusChange(b._id, 'CONFIRMED')}
                                                disabled={b.status === 'CONFIRMED' || b.status === 'COMPLETED'}
                                                className="btn btn-xs btn-circle btn-primary shadow-sm disabled:opacity-30"
                                            >
                                                <FaCheck className="text-[10px]" />
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(b._id, 'CANCELLED')}
                                                disabled={b.status === 'CANCELLED' || b.status === 'COMPLETED'}
                                                className="btn btn-xs btn-circle btn-ghost text-error shadow-sm disabled:opacity-30"
                                            >
                                                <FaTimes className="text-[10px]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {bookings.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-20 gap-4 opacity-40">
                            <FaInbox className="text-6xl" />
                            <p className="font-bold">No bookings found in the database.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
