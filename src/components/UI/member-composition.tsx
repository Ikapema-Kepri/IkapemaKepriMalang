import { members } from "@/data/sampleData";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/UI/table";

export function MemberComposition() {
  // Hitung jumlah anggota per angkatan
  const compositionMap = members.reduce<Record<number, number>>((acc, m) => {
    acc[m.angkatan] = (acc[m.angkatan] ?? 0) + 1;
    return acc;
  }, {});

  const rows = Object.entries(compositionMap)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([angkatan, jumlah]) => ({ angkatan: Number(angkatan), jumlah }));


  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Komposisi Anggota</h2>
      </div>
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.angkatan}>
              <TableCell className="font-medium">Angkatan {row.angkatan}</TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center justify-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                  {row.jumlah}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
