"use client";

import { StatCard } from '@/components/UI/stat-card';
import { ActivitiesTable } from '@/components/UI/activities-table';
import { MemberComposition } from '@/components/UI/member-composition';
import { ContentStatus } from '@/components/UI/content-status';
import { useStatCard } from '@/hooks/useStatCard';
import ProtectedRoute from '@/components/UI/protected-route';

const DashboardPage: React.FC = () => {
    const { stats, loading } = useStatCard();

    const dashboardStats = [
        {
            title: 'Total Anggota',
            value: loading ? '...' : (stats?.totalAnggota ?? 0),
            icon: '👥',
            iconBgColor: 'bg-bg-success',
            valueColor: 'border-success',
            iconColor: 'text-success',
        },
        {
            title: 'Anggota Aktif',
            value: loading ? '...' : (stats?.totalAnggotaAktif ?? 0),
            icon: '📈',
            iconBgColor: 'bg-bg-notice',
            valueColor: 'border-notice',
            iconColor: 'text-notice',
        },
        {
            title: 'Total Alumni',
            value: loading ? '...' : (stats?.totalAlumni ?? 0),
            icon: '🎓',
            iconBgColor: 'bg-bg-warning',
            valueColor: 'border-warning',
            iconColor: 'text-warning',
        },
        {
            title: 'Berita Terpublikasi',
            value: loading ? '...' : (stats?.totalBeritaPublished ?? 0),
            icon: '📰',
            iconBgColor: 'bg-bg-info',
            valueColor: 'border-info',
            iconColor: 'text-info',
        },
    ];

    return (
        <ProtectedRoute>
            <div className="space-y-6 animate-fade-in">
            {/* Stat Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                        iconBgColor={stat.iconBgColor}
                        valueColor={stat.valueColor}
                    />
                ))}
            </div>

            {/* Bottom row: Activities | Composition + Content Status */}
            <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ActivitiesTable />
                </div>
                <div className="flex flex-col gap-4">
                    <MemberComposition />
                    <ContentStatus />
                </div>
            </div>

            </div> 
        </ProtectedRoute>
    );
};

export default DashboardPage;
