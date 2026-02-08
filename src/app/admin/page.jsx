import { getAdminStats } from "@/actions/server/admin";
import { FaWallet, FaBoxOpen, FaUsers, FaTools, FaArrowUp, FaHistory } from "react-icons/fa";

function StatCard({ label, value, icon, color, trend }) {
    return (
        <div className="bg-(--color-surface) p-6 rounded-3xl border border-(--color-border-subtle) shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${color} text-white text-xl shadow-lg ring-4 ring-opacity-10 ring-current`}>
                    {icon}
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-xs font-bold text-success-500 bg-success-100/50 px-2 py-1 rounded-full">
                        <FaArrowUp className="text-[10px]" /> {trend}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-xs font-black uppercase tracking-widest text-(--color-text-soft) mb-1">{label}</p>
                <h3 className="text-3xl font-black text-(--color-text-main) tracking-tighter">
                    {typeof value === 'number' && label.includes('Revenue') ? `৳${value.toLocaleString()}` : value}
                </h3>
            </div>
        </div>
    );
}

export default async function AdminOverview() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-8 animate-fade-up">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Revenue"
                    value={stats.totalRevenue}
                    icon={<FaWallet />}
                    color="bg-primary"
                    trend={12}
                />
                <StatCard
                    label="Active Bookings"
                    value={stats.totalBookings}
                    icon={<FaBoxOpen />}
                    color="bg-secondary"
                    trend={8}
                />
                <StatCard
                    label="Unified Users"
                    value={stats.totalUsers}
                    icon={<FaUsers />}
                    color="bg-accent"
                    trend={15}
                />
                <StatCard
                    label="Total Services"
                    value={stats.totalServices}
                    icon={<FaTools />}
                    color="bg-neutral"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity Mock */}
                <div className="lg:col-span-2 bg-(--color-surface) p-8 rounded-3xl border border-(--color-border-subtle) shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-(--color-text-main) flex items-center gap-2">
                            <FaHistory className="text-primary" /> System Health & Logs
                        </h3>
                        <button className="text-xs font-bold text-primary hover:underline">View All Logs</button>
                    </div>

                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="relative flex flex-col items-center">
                                    <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10 z-10" />
                                    <div className="w-0.5 grow bg-gray-100 my-1 group-last:hidden" />
                                </div>
                                <div className="pb-6">
                                    <p className="text-xs font-bold text-(--color-text-main)">New Service Request Verified</p>
                                    <p className="text-[11px] text-(--color-text-soft)">Booking #BK-00{i} was marked as confirmed by system auto-pilot.</p>
                                    <p className="text-[10px] text-primary font-medium mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 group hover:bg-primary/10 transition-colors">
                        <h4 className="font-bold text-primary mb-2">Need Help?</h4>
                        <p className="text-xs text-primary/70 leading-relaxed mb-4">You have supreme control over the platform. Monitor services and bookings meticulously.</p>
                        <button className="btn btn-sm btn-primary rounded-xl w-full">Go to Documentation</button>
                    </div>

                    <div className="bg-(--color-surface) p-8 rounded-3xl border border-(--color-border-subtle) shadow-sm">
                        <h4 className="font-bold text-(--color-text-main) mb-4">User Distribution</h4>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>Active Users</span>
                                    <span>75%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '75%' }} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span>Caregivers</span>
                                    <span>25%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-secondary" style={{ width: '25%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
