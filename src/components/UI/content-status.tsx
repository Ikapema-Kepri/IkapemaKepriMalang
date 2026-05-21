"use client";

import useStatusKonten from "@/hooks/useStatusKonten";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/UI/table";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const statusConfig = [
  {
    label: 'Berita Draft',
    status: 'Draft' as const,
    dotColor: 'bg-yellow-500',
    badgeColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    label: 'Berita Terpublikasi',
    status: 'Published' as const,
    dotColor: 'bg-green-500',
    badgeColor: 'bg-green-100 text-green-700',
  },
];

export function ContentStatus() {
  const { statusKonten, loading } = useStatusKonten();

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Status Konten</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin text-[#00A3CC]" />
          <span className="ml-2 text-sm font-medium">Memuat status...</span>
        </div>
      ) : (
        <Table>
          <TableBody>
            {statusConfig.map((item) => {
              const countItem = statusKonten.find((c) => c.status === item.status);
              const count = countItem ? countItem.count : 0;

              return (
                <TableRow key={item.status}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={cn('h-2.5 w-2.5 rounded-full flex-shrink-0', item.dotColor)} />
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn('inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold', item.badgeColor)}>
                      {count}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
