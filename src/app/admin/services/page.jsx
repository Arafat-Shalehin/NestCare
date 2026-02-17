"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/actions/server/services";
import { manageService } from "@/actions/server/admin";
import Swal from "sweetalert2";
import { FaPlus, FaEdit, FaTrash, FaRupeeSign, FaTag } from "react-icons/fa";

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        try {
            const data = await getServices();
            setServices(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // console.log(services);

    useEffect(() => {
        fetchServices();
    }, []);

    const handleEditService = async (service = null) => {
        const { value: formValues } = await Swal.fire({
            title: service ? 'Edit Service' : 'Add New Service',
            html:
                `<input id="swal-name" class="swal2-input" placeholder="Service Name" value="${service?.name || ''}">` +
                `<input id="swal-slug" class="swal2-input" placeholder="Slug (e.g. baby-care)" value="${service?.slug || ''}">` +
                `<input id="swal-price" type="number" class="swal2-input" placeholder="Price per Unit" value="${service?.pricePerUnit || ''}">` +
                `<select id="swal-unit" class="swal2-select" style="display:flex; width: 80%; margin: 1em auto;">
            <option value="hour" ${service?.unit === 'hour' ? 'selected' : ''}>Per Hour</option>
            <option value="day" ${service?.unit === 'day' ? 'selected' : ''}>Per Day</option>
         </select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save Service',
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-name').value,
                    slug: document.getElementById('swal-slug').value,
                    pricePerUnit: Number(document.getElementById('swal-price').value),
                    unit: document.getElementById('swal-unit').value,
                }
            }
        });

        if (formValues) {
            try {
                await manageService(service?._id, formValues);
                Swal.fire('Saved!', 'Service has been updated.', 'success');
                fetchServices();
            } catch (err) {
                Swal.fire('Error', 'Failed to save service', 'error');
            }
        }
    };

    if (loading) return <div className="flex justify-center p-20"><span className="loading loading-spinner text-primary"></span></div>;

    return (
        <div className="animate-fade-up space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-(--color-text-main)">Service Inventory</h3>
                <button
                    onClick={() => handleEditService()}
                    className="btn btn-primary rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                    <FaPlus /> Add New Service
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((s) => (
                    <div key={s._id} className="bg-(--color-surface) p-6 rounded-3xl border border-(--color-border-subtle) shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl">
                                <FaTag />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEditService(s)}
                                    className="p-2 hover:bg-primary/10 rounded-xl text-primary transition-colors"
                                >
                                    <FaEdit />
                                </button>
                                <button className="p-2 hover:bg-error/10 rounded-xl text-error transition-colors">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h4 className="font-bold text-(--color-text-main) text-lg">{s.name}</h4>
                            <p className="text-xs text-(--color-text-soft) font-mono">{s.slug}</p>
                        </div>

                        <div className="pt-4 border-t border-(--color-border-subtle) flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-(--color-text-soft)">Rate</p>
                                <p className="text-xl font-black text-primary">৳{s.pricing.baseRate}<span className="text-xs text-(--color-text-soft)">/{s.pricing.unit}</span></p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${s.status === 'active' ? 'bg-success-100 text-success-500' : 'bg-gray-100 text-gray-500'}`}>
                                {s.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
