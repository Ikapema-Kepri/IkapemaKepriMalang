"use client";

import { StatCard } from '@/components/UI/stat-card';
import { ActivitiesTable } from '@/components/UI/activities-table';
import { MemberComposition } from '@/components/UI/member-composition';
import { ContentStatus } from '@/components/UI/content-status';
import { dashboardStats } from "@/data/sampleData";

const DashboardPage: React.FC = () => {
    return (
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
                        trend={stat.trend}
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
    );
};

export default DashboardPage;
