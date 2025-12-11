"use client";

import { StatCard } from '@/components/UI/stat-card';
import { dashboardStats } from "@/data/sampleData";



const DashboardPage : React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
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
        </div>
    )
}

export default DashboardPage;