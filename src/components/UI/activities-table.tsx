import { recentActivities, ActivityType } from "@/data/sampleData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { cn } from "@/lib/utils";

const dotColorMap: Record<ActivityType, string> = {
  tambah:     'bg-green-500',
  update:     'bg-blue-500',
  publish:    'bg-purple-500',
  verifikasi: 'bg-yellow-500',
  hapus:      'bg-red-500',
};

export function ActivitiesTable() {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Aktivitas Terbaru</h2>
      </div>
      <Table>
        <TableBody>
          {recentActivities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>
                <div className="flex items-start gap-3">
                  <span className={cn('mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0', dotColorMap[activity.type])} />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-foreground leading-snug">{activity.message}</p>
                    <span className="text-xs text-muted-foreground mt-0.5">{activity.time}</span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
