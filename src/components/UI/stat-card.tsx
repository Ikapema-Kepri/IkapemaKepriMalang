import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "./card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon | string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconColor?: string;
  iconBgColor?: string;
  valueColor?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  className,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-500/10",
  valueColor
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 border-0 border-t-4",
        valueColor,
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* Icon dengan background persegi transparan */}
        <div className={cn("rounded-lg p-3 w-fit transition-colors", iconBgColor)}>
          {typeof Icon === "string" ? (
            <span className="text-2xl leading-none">{Icon}</span>
          ) : (
            <Icon className="h-6 w-6 text-black" />
          )}
        </div>
        
        {/* Trend indicator */}
        {trend && (
          <div className={cn(
            "rounded-lg py-1 px-2 h-fit transition-colors",
            trend.isPositive ? "bg-green-500/10" : "bg-red-500/10"
          )}>
            <p className={cn(
              "text-sm font-medium",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              {trend.isPositive ? "+" : "-"}{trend.value}%
            </p>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {/* Value dan Title */}
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold text-black">{value}</p>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
        </div>
      </CardContent>
      
    </Card>
  );
}
