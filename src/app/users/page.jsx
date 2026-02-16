"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "@/actions/server/admin";
import Swal from "sweetalert2";
import { FaUserShield, FaUserEdit, FaSearch, FaUser } from "react-icons/fa";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (user) => {
        const { value: role } = await Swal.fire({
            title: 'Update User Role',
            input: 'select',
            inputOptions: {
                'user': 'Regular User',
                'admin': 'Administrator',
                'caregiver': 'Caregiver'
            },
            inputValue: user.role || 'user',
            showCancelButton: true,
            confirmButtonColor: 'var(--color-primary-600)',
        });

        if (role) {
            try {
                await updateUserRole(user._id, role);
                Swal.fire('Updated!', `User has been promoted to ${role}.`, 'success');
                fetchUsers();
            } catch (err) {
                Swal.fire('Error', 'Failed to update role', 'error');
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex justify-center p-20"><span className="loading loading-spinner text-primary"></span></div>;

    return (
        <div className="animate-fade-up space-y-6">
            <div className="bg-(--color-surface) p-6 rounded-3xl border border-(--color-border-subtle) shadow-sm">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-text-soft)" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="input w-full pl-12 bg-(--color-bg-soft) border-none rounded-2xl text-sm focus:ring-2 ring-primary/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-(--color-surface) rounded-3xl border border-(--color-border-subtle) shadow-sm overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-(--color-bg-soft)">
                        <tr className="text-[11px] font-black uppercase tracking-widest text-(--color-text-soft)">
                            <th>User</th>
                            <th className="hidden md:table-cell">Joined</th>
                            <th>Role</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {filteredUsers.map((u) => (
                            <tr key={u._id} className="hover:bg-(--color-bg-soft) transition-colors">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-primary/10 text-primary rounded-xl w-10">
                                                {u.image ? <img src={u.image} alt={u.name} /> : <FaUser className="text-xs" />}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-(--color-text-main)">{u.name}</div>
                                            <div className="text-[11px] text-(--color-text-soft)">{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell text-(--color-text-muted)">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${u.role === 'admin' ? 'bg-primary text-white' :
                                            u.role === 'caregiver' ? 'bg-secondary/10 text-primary' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {u.role || 'user'}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleRoleChange(u)}
                                        className="btn btn-xs btn-ghost text-primary hover:bg-primary/10 gap-2 rounded-lg"
                                    >
                                        <FaUserShield /> Promote
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
