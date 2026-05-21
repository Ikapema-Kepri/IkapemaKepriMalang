"use client";

import { useKomposisiMember } from "@/hooks/useKomposisiMember";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/UI/table";
import { Loader2 } from "lucide-react";

export function MemberComposition() {
  const { composition, loading } = useKomposisiMember();

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Komposisi Anggota</h2>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-10 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin text-[#00A3CC]" />
          <span className="ml-2 text-sm font-medium">Memuat data...</span>
        </div>
      ) : (
        <Table>
          <TableBody>
            {composition.map((row) => (
              <TableRow key={row.angkatan}>
                <TableCell className="font-medium text-foreground">
                  {row.angkatan === "Lainnya" ? "Lainnya" : `Angkatan ${row.angkatan}`}
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center justify-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground">
                    {row.jumlah}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
